import React, { useState } from 'react';
import { Download, Link2, Check, FileText, Table2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateShareURL, generateCSV, formatCurrency } from '@/lib/formatUtils';
import { toast } from 'sonner';

function generatePDFContent(results, config, currency) {
  const lines = [
    "CLOUDCOST COMPARE - REPORT",
    "=" .repeat(50),
    "",
    "WORKLOAD CONFIGURATION",
    "-".repeat(30),
    `vCPU: ${config.vcpu} cores`,
    `RAM: ${config.ram} GB`,
    `SSD Storage: ${config.ssdStorage} GB`,
    `Object Storage: ${config.objectStorage} GB`,
    `Bandwidth: ${config.bandwidth} GB/mo`,
    `Database: ${config.dbStorage} GB`,
    `Requests: ${config.requests.toLocaleString()}/mo`,
    `Users: ${config.users.toLocaleString()}`,
    `Environments: ${config.environments}`,
    `Region: ${config.region}`,
    "",
    "PROVIDER COMPARISON",
    "-".repeat(30),
    "",
    ...results.map((r, i) => [
      `${i + 1}. ${r.provider.name}`,
      `   Monthly: ${formatCurrency(r.costs.monthly, currency)}`,
      `   Yearly: ${formatCurrency(r.costs.yearly, currency)}`,
      `   Compute: ${formatCurrency(r.costs.compute, currency)}`,
      `   Storage: ${formatCurrency(r.costs.storage, currency)}`,
      `   Bandwidth: ${formatCurrency(r.costs.bandwidth, currency)}`,
      `   Database: ${formatCurrency(r.costs.database, currency)}`,
      r.badges?.length ? `   Badges: ${r.badges.map(b => b.label).join(", ")}` : "",
      ""
    ].filter(Boolean)).flat(),
    "",
    "RECOMMENDATIONS",
    "-".repeat(30),
    ...results.filter(r => r.badges?.length > 0).map(r =>
      `${r.provider.name}: ${r.badges.map(b => `${b.emoji} ${b.label}`).join(", ")}`
    ),
    "",
    `Generated: ${new Date().toISOString()}`,
    "Powered by CloudCost Compare"
  ];

  const content = lines.join("\n");
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "cloudcost-compare-report.txt";
  a.click();
  URL.revokeObjectURL(url);
}

export default function ExportTools({ results, config, currency }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const url = generateShareURL(config, currency);
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("Share link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="mt-12">
      <h2 className="text-2xl md:text-3xl font-bold font-heading mb-2">Export & Share</h2>
      <p className="text-muted-foreground mb-6">Download reports or share your configuration</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Button
          onClick={() => generatePDFContent(results, config, currency)}
          variant="outline"
          className="h-auto py-4 flex flex-col items-center gap-2 hover:border-primary/30"
        >
          <FileText className="w-6 h-6 text-primary" />
          <span className="font-semibold">Export Report</span>
          <span className="text-xs text-muted-foreground">Full comparison report</span>
        </Button>
        
        <Button
          onClick={() => generateCSV(results, currency)}
          variant="outline"
          className="h-auto py-4 flex flex-col items-center gap-2 hover:border-primary/30"
        >
          <Table2 className="w-6 h-6 text-chart-2" />
          <span className="font-semibold">Export CSV</span>
          <span className="text-xs text-muted-foreground">Spreadsheet data</span>
        </Button>
        
        <Button
          onClick={handleCopyLink}
          variant="outline"
          className="h-auto py-4 flex flex-col items-center gap-2 hover:border-primary/30"
        >
          {copied ? (
            <Check className="w-6 h-6 text-chart-2" />
          ) : (
            <Link2 className="w-6 h-6 text-chart-5" />
          )}
          <span className="font-semibold">{copied ? "Copied!" : "Share Link"}</span>
          <span className="text-xs text-muted-foreground">Copy shareable URL</span>
        </Button>
      </div>
    </section>
  );
}