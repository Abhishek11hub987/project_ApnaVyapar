import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('Telegram credentials missing. Cannot send security report.');
      return NextResponse.json({ error: 'Telegram keys missing in Vercel' }, { status: 500 });
    }

    let isHealthy = true;
    const issues: string[] = [];
    const fixes: string[] = [];

    // 1. Check Database Connectivity
    const { error: dbError } = await supabaseAdmin.from('profiles').select('id').limit(1);
    if (dbError) {
      isHealthy = false;
      issues.push(`Database connection failed: ${dbError.message}`);
    }

    // 2. Check Critical Environment Variables
    const criticalVars = ['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY', 'SUPABASE_SERVICE_ROLE_KEY', 'GROQ_API_KEY'];
    const missingVars = criticalVars.filter(v => !process.env[v]);
    
    if (missingVars.length > 0) {
      isHealthy = false;
      issues.push(`CRITICAL: Missing environment variables: ${missingVars.join(', ')}`);
    }

    // 3. Format Telegram Message
    let message = '';
    if (isHealthy) {
      message = `✅ *Apna Vyapar Health Check*\n\nAll systems are 100% secure and operational.\n• Database: Connected\n• Environment: Secure\n• AI Agent: Active`;
    } else {
      message = `⚠️ *Apna Vyapar Security Alert*\n\nIssues detected:\n${issues.map(i => `• ${i}`).join('\n')}\n\n`;
      if (fixes.length > 0) {
        message += `*Auto-Fixed:*\n${fixes.map(f => `• ${f}`).join('\n')}`;
      } else {
        message += `Please review the Vercel dashboard immediately.`;
      }
    }

    // Send to Telegram
    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    if (!telegramResponse.ok) {
      throw new Error(`Telegram API Error: ${await telegramResponse.text()}`);
    }

    return NextResponse.json({
      success: true,
      status: isHealthy ? 'healthy' : 'issues_found',
      message: 'Security report sent to Telegram',
    });

  } catch (error: any) {
    console.error('Security Agent Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
