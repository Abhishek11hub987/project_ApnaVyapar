import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { z } from 'zod';

const CartItemSchema = z.object({
  product: z.object({
    id: z.union([z.string(), z.number()]),
    name: z.string().min(1),
    price: z.number().positive(),
    stock_quantity: z.number().int().nonnegative(),
  }),
  quantity: z.number().int().positive(),
});

const CustomerInfoSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(3, 'Phone number is too short').max(20).optional(),
  address: z.string().min(1, 'Shipping address is required').max(2000),
});

const CheckoutSchema = z.object({
  storeId: z.union([z.string(), z.number()]),
  customerInfo: CustomerInfoSchema,
  cartItems: z.array(CartItemSchema).min(1, 'Cart cannot be empty'),
  totalAmount: z.number().positive('Total must be positive'),
  idempotencyKey: z.string().min(1).max(128).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = CheckoutSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.errors[0];
      return NextResponse.json({ error: firstError.message }, { status: 400 });
    }

    const { storeId, customerInfo, cartItems, totalAmount, idempotencyKey } = parsed.data;

    const computedTotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    if (Math.abs(computedTotal - totalAmount) > 1) {
      return NextResponse.json({ error: 'Total amount mismatch' }, { status: 400 });
    }

    const { data: storeData, error: storeError } = await supabaseAdmin
      .from('store_settings')
      .select('user_id')
      .eq('id', storeId)
      .single();

    if (storeError || !storeData) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 });
    }

    const merchantId = storeData.user_id;

    // Find or create customer
    let customerId: string;
    const { data: existingCustomer } = await supabaseAdmin
      .from('customers')
      .select('id, total_orders, total_spent, phone')
      .eq('user_id', merchantId)
      .eq('email', customerInfo.email)
      .single();

    if (existingCustomer) {
      customerId = existingCustomer.id;
      await supabaseAdmin
        .from('customers')
        .update({
          total_orders: existingCustomer.total_orders + 1,
          total_spent: existingCustomer.total_spent + totalAmount,
          phone: customerInfo.phone || existingCustomer.phone,
        })
        .eq('id', customerId);
    } else {
      const { data: newCustomer, error: customerError } = await supabaseAdmin
        .from('customers')
        .insert({
          user_id: merchantId,
          name: customerInfo.name,
          email: customerInfo.email,
          phone: customerInfo.phone || null,
          total_orders: 1,
          total_spent: totalAmount,
        })
        .select()
        .single();

      if (customerError) throw customerError;
      customerId = newCustomer.id;
    }

    // Use RPC for atomic stock deduction + order creation
    const { data: orderResult, error: rpcError } = await supabaseAdmin.rpc('process_checkout', {
      p_store_id: storeId,
      p_customer_id: customerId,
      p_total_amount: totalAmount,
      p_shipping_address: customerInfo.address,
      p_items: JSON.parse(JSON.stringify(cartItems)),
      p_idempotency_key: idempotencyKey || `manual-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    });

    if (rpcError) throw rpcError;

    if (orderResult?.error) {
      return NextResponse.json({ error: orderResult.error }, { status: 409 });
    }

    return NextResponse.json({
      success: true,
      orderId: orderResult.order_id,
      duplicate: orderResult.duplicate || false,
    });

  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
