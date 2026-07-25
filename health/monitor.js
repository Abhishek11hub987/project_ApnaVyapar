const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const LOG_FILE = path.join(__dirname, 'health-report.log');
const ENV_FILE = path.join(__dirname, '..', '.env.local');

// Helper to load simple env vars
if (fs.existsSync(ENV_FILE)) {
  const envContent = fs.readFileSync(ENV_FILE, 'utf8');
  envContent.split('\n').forEach(line => {
    line = line.trim();
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      process.env[match[1].trim()] = match[2].trim();
    }
  });
}

function logResult(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  fs.appendFileSync(LOG_FILE, logMessage);
  console.log(logMessage.trim());
}

function runCommand(command, name) {
  return new Promise((resolve) => {
    logResult(`Starting check: ${name}`);
    exec(command, (error, stdout, stderr) => {
      if (error) {
        logResult(`❌ FAILED: ${name}`);
        logResult(`Error details:\n${stdout || stderr}`);
        resolve({ name, passed: false, error: 'Command failed' });
      } else {
        logResult(`✅ PASSED: ${name}`);
        resolve({ name, passed: true });
      }
    });
  });
}

async function checkSupabase() {
  logResult(`Starting check: Supabase Connectivity`);
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!url || !key) {
    logResult(`❌ FAILED: Supabase Connectivity - Missing NEXT_PUBLIC_SUPABASE_URL or ANON_KEY in .env.local`);
    return { name: 'Supabase Connectivity', passed: false, error: 'Missing credentials' };
  }

  try {
    const supabase = createClient(url, key);
    const { data, error } = await supabase.from('business_ideas').select('id').limit(1);
    
    if (error) {
      logResult(`❌ FAILED: Supabase Connectivity - DB Error: ${error.message}`);
      return { name: 'Supabase Connectivity', passed: false, error: error.message };
    }
    logResult(`✅ PASSED: Supabase Connectivity`);
    return { name: 'Supabase Connectivity', passed: true };
  } catch (err) {
    logResult(`❌ FAILED: Supabase Connectivity - Client Error: ${err.message}`);
    return { name: 'Supabase Connectivity', passed: false, error: err.message };
  }
}

async function checkLiveDeployment() {
  logResult(`Starting check: Live Deployment Ping`);
  const targetUrl = process.env.PRODUCTION_URL || 'http://localhost:3000';
  
  try {
    const response = await fetch(targetUrl);
    if (response.ok) {
      logResult(`✅ PASSED: Live Deployment Ping (${targetUrl} returned ${response.status})`);
      return { name: 'Live Deployment Ping', passed: true };
    } else {
      logResult(`❌ FAILED: Live Deployment Ping (${targetUrl} returned ${response.status})`);
      return { name: 'Live Deployment Ping', passed: false, error: `HTTP ${response.status}` };
    }
  } catch (err) {
    logResult(`❌ FAILED: Live Deployment Ping - Cannot reach ${targetUrl}. Error: ${err.message}`);
    return { name: 'Live Deployment Ping', passed: false, error: 'Unreachable' };
  }
}

async function sendTelegramNotification(results, allPassed) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  
  if (!token || !chatId) {
    logResult('ℹ️ Telegram notifications skipped (missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID in .env.local)');
    return;
  }

  const statusEmoji = allPassed ? '🌟' : '⚠️';
  let message = `${statusEmoji} *Apna Vyapar Health Report*\n\n`;
  
  results.forEach(res => {
    message += `${res.passed ? '✅' : '❌'} ${res.name}\n`;
  });
  
  message += `\nStatus: ${allPassed ? 'All Systems Go' : 'Issues Detected'}`;

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown'
      })
    });
    
    if (response.ok) {
      logResult('✅ Telegram notification sent successfully.');
    } else {
      logResult(`❌ Failed to send Telegram notification: ${response.statusText}`);
    }
  } catch (err) {
    logResult(`❌ Error sending Telegram notification: ${err.message}`);
  }
}

async function runHealthChecks() {
  logResult('=== RUNNING SCHEDULED HEALTH CHECKS ===');
  const results = [];
  
  // 1. Check critical files exist
  const criticalFiles = ['package.json', 'tsconfig.json', 'next.config.js'];
  let filesExist = true;
  for (const file of criticalFiles) {
    if (!fs.existsSync(path.join(__dirname, '..', file))) {
      logResult(`❌ FAILED: Missing critical file: ${file}`);
      filesExist = false;
    }
  }
  if (filesExist) {
    logResult('✅ PASSED: Critical files check');
    results.push({ name: 'Critical Files', passed: true });
  } else {
    results.push({ name: 'Critical Files', passed: false, error: 'Missing files' });
  }

  // 2. Run TypeScript type checking
  results.push(await runCommand('npx tsc --noEmit', 'TypeScript Compilation'));

  // 3. Run ESLint
  results.push(await runCommand('npm run lint', 'Code Linting'));

  // 4. Supabase Backend Check
  results.push(await checkSupabase());

  // 5. Live Deployment Check
  results.push(await checkLiveDeployment());

  // Overall Status
  const allPassed = results.every(r => r.passed);
  if (allPassed) {
    logResult('🌟 ALL HEALTH CHECKS PASSED SUCCESSFULLY');
  } else {
    logResult('⚠️ SOME HEALTH CHECKS FAILED - Check logs for details');
  }
  
  // Telegram Notification
  await sendTelegramNotification(results, allPassed);
  
  logResult('==========================================\n');
}

runHealthChecks();
