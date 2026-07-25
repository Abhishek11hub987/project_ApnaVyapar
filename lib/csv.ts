export function downloadCSV(data: any[], filename: string) {
  if (data.length === 0) {
    alert("No data available to export");
    return;
  }

  // Get headers from first object
  const headers = Object.keys(data[0]);
  
  // Professional Header Block
  const dateStr = new Date().toLocaleString('en-IN', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  const professionalHeader = [
    '"============================================================"',
    '"APNA VYAPAR - PROFESSIONAL DATA EXPORT"',
    '"============================================================"',
    `"Report Generated On:","${dateStr}"`,
    '"Platform:","Apna Vyapar - Your Business, Digitally Transformed"',
    `"Data Type:","${filename.replace(/_/g, ' ').toUpperCase()}"`,
    '"Notice:","CONFIDENTIAL DOCUMENT"',
    '""',
    '"------------------------------------------------------------"',
    '""'
  ].join('\n');

  // Create CSV string
  const csvContent = professionalHeader + '\n' + [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        let cell = '';
        if (row[header] !== null && row[header] !== undefined) {
          if (typeof row[header] === 'object') {
            cell = JSON.stringify(row[header]);
          } else {
            cell = row[header].toString();
          }
        }
        // Escape quotes and wrap in quotes if contains comma
        return `"${cell.replace(/"/g, '""')}"`;
      }).join(',')
    )
  ].join('\n');

  // Create Blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  
  link.click();
  
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
