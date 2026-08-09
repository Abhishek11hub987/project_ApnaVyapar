export function downloadProfessionalReport(stats: any, filename: string) {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Apna Vyapar - ${filename}</title>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
      <style>
         body { font-family: 'Plus Jakarta Sans', sans-serif; color: #111827; padding: 40px; background: #ffffff; max-width: 800px; margin: 0 auto; -webkit-font-smoothing: antialiased; }
         .header { display: flex; align-items: center; border-bottom: 2px solid #f1f5f9; padding-bottom: 24px; margin-bottom: 32px; justify-content: space-between; }
         .brand { display: flex; align-items: center; gap: 12px; }
         .title-container { flex: 1; }
         h1 { margin: 0 0 4px 0; color: #111827; font-size: 28px; font-weight: 800; letter-spacing: -0.03em; }
         p.meta { margin: 0; color: #6b7280; font-size: 14px; font-weight: 500; }
         h2 { font-size: 18px; color: #1f2937; margin-bottom: 16px; border-bottom: 1px solid #f3f4f6; padding-bottom: 8px; font-weight: 700; letter-spacing: -0.01em; }
         .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 40px; }
         .stat-card { background: #ffffff; padding: 20px; border-radius: 12px; border: 1px solid #e5e7eb; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03); }
         .stat-title { font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700; margin-bottom: 6px; display: block; }
         .stat-value { font-size: 32px; color: #0d9488; font-weight: 800; letter-spacing: -0.02em; }
         .weekly-table { width: 100%; border-collapse: separate; border-spacing: 0; margin-bottom: 40px; border-radius: 12px; border: 1px solid #e5e7eb; overflow: hidden; }
         .weekly-table th { background: #f9fafb; text-align: left; padding: 14px 16px; font-size: 13px; color: #4b5563; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #e5e7eb; }
         .weekly-table td { padding: 14px 16px; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #1f2937; font-weight: 500; }
         .weekly-table tr:last-child td { border-bottom: none; }
         .footer { margin-top: 40px; text-align: center; color: #9ca3af; font-size: 12px; border-top: 1px solid #f3f4f6; padding-top: 24px; line-height: 1.6; }
         .watermark { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-30deg); font-size: 100px; color: rgba(13, 148, 136, 0.04); font-weight: 900; z-index: -1; pointer-events: none; white-space: nowrap; }
         
         .logo-container {
           width: 44px; height: 44px; background: linear-gradient(135deg, #0d9488, #0f766e); border-radius: 10px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(13, 148, 136, 0.2);
         }
         .logo-inner {
           width: 40px; height: 40px; background: white; border-radius: 8px; display: flex; align-items: center; justify-content: center;
         }

         @media print {
           body { padding: 0; max-width: 100%; }
           .stat-card { border: 1px solid #d1d5db; box-shadow: none; }
           .weekly-table { border: 1px solid #d1d5db; }
           .logo-container { box-shadow: none; border: 1px solid #0d9488; }
           -webkit-print-color-adjust: exact;
           print-color-adjust: exact;
         }
      </style>
    </head>
    <body>
      <div class="watermark">APNA VYAPAR</div>

      <div class="header">
        <div class="title-container">
          <h1>Analytics Overview</h1>
          <p class="meta">Generated • ${new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
        </div>
        <div class="brand">
          <div class="logo-container">
             <div class="logo-inner">
               <img src="/logo-transparent.png" alt="Logo" style="width: 32px; height: 32px; object-fit: contain;" />
             </div>
          </div>
          <div style="display: flex; flex-direction: column;">
            <span style="font-weight: 800; font-size: 22px; color: #111827; letter-spacing: -0.03em; line-height: 1;">
              Apna Vyapar
            </span>
          </div>
        </div>
      </div>

      <h2>Performance Summary</h2>
      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-title">Total Revenue</span>
          <div class="stat-value">₹${stats.revenue.toLocaleString('en-IN')}</div>
        </div>
        <div class="stat-card">
          <span class="stat-title">Total Orders</span>
          <div class="stat-value" style="color: #111827;">${stats.orders}</div>
        </div>
        <div class="stat-card">
          <span class="stat-title">Active Customers</span>
          <div class="stat-value" style="color: #111827;">${stats.customers}</div>
        </div>
        <div class="stat-card">
          <span class="stat-title">Conversion Rate</span>
          <div class="stat-value" style="color: #111827;">${stats.orders > 0 ? "3.2%" : "0%"}</div>
        </div>
      </div>

      <h2>Revenue Timeline (Last 4 Weeks)</h2>
      <table class="weekly-table">
        <thead>
          <tr>
            <th>Time Period</th>
            <th style="text-align: right;">Revenue Generated</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Week 1 (Oldest)</td>
            <td style="text-align: right; font-weight: 700;">₹${(stats.weeklyRevenue?.[0] || 0).toLocaleString('en-IN')}</td>
          </tr>
          <tr>
            <td>Week 2</td>
            <td style="text-align: right; font-weight: 700;">₹${(stats.weeklyRevenue?.[1] || 0).toLocaleString('en-IN')}</td>
          </tr>
          <tr>
            <td>Week 3</td>
            <td style="text-align: right; font-weight: 700;">₹${(stats.weeklyRevenue?.[2] || 0).toLocaleString('en-IN')}</td>
          </tr>
          <tr>
            <td>Week 4 (Current)</td>
            <td style="text-align: right; font-weight: 800; color: #0d9488;">₹${(stats.weeklyRevenue?.[3] || 0).toLocaleString('en-IN')}</td>
          </tr>
        </tbody>
      </table>

      <div class="footer">
        <p>This document is securely generated by <strong>Apna Vyapar</strong> • Aapka Digital Business Sathi</p>
      </div>

      <script>
        window.onload = () => {
          setTimeout(() => {
             window.print();
          }, 1000);
        };
      </script>
    </body>
    </html>
  `;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  window.open(url, '_blank');
}
