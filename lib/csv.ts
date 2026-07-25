export function downloadCSV(data: any[], filename: string) {
  if (data.length === 0) {
    alert("No data available to export");
    return;
  }

  // Get headers from first object
  const headers = Object.keys(data[0]);
  
  // Create CSV string
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const cell = row[header] === null || row[header] === undefined ? '' : row[header].toString();
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
