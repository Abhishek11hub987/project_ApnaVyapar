import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { storeId, customerInfo, cartItems, totalAmount } = body;

    if (!storeId || !customerInfo || !cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Get the store to find the merchant's user_id
    const { data: storeData, error: storeError } = await supabaseAdmin
      .from('store_settings')
      .select('user_id')
      .eq('id', storeId)
      .single();

    if (storeError || !storeData) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 });
    }

    const merchantId = storeData.user_id;

    // 2. Find or create the customer for this merchant
    // Try to find existing customer by email
    let customerId;
    
    const { data: existingCustomer } = await supabaseAdmin
      .from('customers')
      .select('id, total_orders, total_spent')
      .eq('user_id', merchantId)
      .eq('email', customerInfo.email)
      .single();

    if (existingCustomer) {
      customerId = existingCustomer.id;
      // Update stats
      await supabaseAdmin
        .from('customers')
        .update({
          total_orders: existingCustomer.total_orders + 1,
          total_spent: existingCustomer.total_spent + totalAmount,
          phone: customerInfo.phone // Update phone just in case
        })
        .eq('id', customerId);
    } else {
      // Create new customer
      const { data: newCustomer, error: customerError } = await supabaseAdmin
        .from('customers')
        .insert({
          user_id: merchantId,
          name: customerInfo.name,
          email: customerInfo.email,
          phone: customerInfo.phone,
          total_orders: 1,
          total_spent: totalAmount
        })
        .select()
        .single();

      if (customerError) throw customerError;
      customerId = newCustomer.id;
    }

    // 3. Create the order
    const { data: orderData, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({
        store_id: storeId,
        customer_id: customerId,
        total_amount: totalAmount,
        status: 'pending',
        shipping_address: customerInfo.address,
        items: cartItems
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // 4. Update product stock
    for (const item of cartItems) {
      const { data: product } = await supabaseAdmin
        .from('products')
        .select('stock_quantity')
        .eq('id', item.product.id)
        .single();
        
      if (product && product.stock_quantity > 0) {
        await supabaseAdmin
          .from('products')
          .update({
            stock_quantity: Math.max(0, product.stock_quantity - item.quantity)
          })
          .eq('id', item.product.id);
      }
    }

    return NextResponse.json({ success: true, orderId: orderData.id });

  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
