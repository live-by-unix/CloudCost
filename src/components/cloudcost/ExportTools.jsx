import React, { useState } from 'react';
import { Download, Link2, Check, FileText, Table2, Code } from 'lucide-react';
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
    `GPU: ${config.gpu || 0} units`,
    `SSD Storage: ${config.ssdStorage} GB`,
    `Object Storage: ${config.objectStorage} GB`,
    `Bandwidth: ${config.bandwidth} GB/mo`,
    `Database: ${config.dbStorage} GB`,
    `Requests: ${config.requests.toLocaleString()}/mo`,
    `Users: ${config.users.toLocaleString()}`,
    `Environments: ${config.environments}`,
    `Region: ${config.region}`,
    `Pricing Model: ${config.reservedTier || "on-demand"}`,
    "",
    "PROVIDER COMPARISON",
    "-".repeat(30),
    "",
    ...results.map((r, i) => [
      `${i + 1}. ${r.provider.name}`,
      `   Monthly: ${formatCurrency(r.costs.monthly, currency)}`,
      `   Yearly: ${formatCurrency(r.costs.yearly, currency)}`,
      `   Compute: ${formatCurrency(r.costs.compute, currency)}`,
      `   GPU: ${formatCurrency(r.costs.gpu, currency)}`,
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

  function generateJSON(results, config, currency) {
    const data = {
      generatedAt: new Date().toISOString(),
      currency,
      config,
      results: results.map(r => ({
        provider: r.provider.name,
        category: r.provider.id,
        monthly: r.costs.monthly,
        yearly: r.costs.yearly,
        compute: r.costs.compute,
        gpu: r.costs.gpu,
        storage: r.costs.storage,
        bandwidth: r.costs.bandwidth,
        database: r.costs.database,
        platformFee: r.costs.platformFee,
        costPerUser: r.costs.costPerUser,
        freeTier: r.provider.freeTier,
        badges: r.badges?.map(b => b.label) || []
      }))
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cloudcost-compare.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl md:text-3xl font-bold font-heading mb-2">Export & Share</h2>
      <p className="text-muted-foreground mb-6">Download reports or share your configuration</p>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Button
          onClick={() => generatePDFContent(results, config, currency)}
          variant="outline"
          className="h-auto py-3 md:py-4 flex flex-col items-center gap-2 hover:border-primary/30"
        >
          <FileText className="w-5 h-5 md:w-6 md:h-6 text-primary" />
          <span className="font-semibold text-sm md:text-base">Export Report</span>
          <span className="text-xs text-muted-foreground">Full comparison report</span>
        </Button>
        
        <Button
          onClick={() => generateCSV(results, currency)}
          variant="outline"
          className="h-auto py-3 md:py-4 flex flex-col items-center gap-2 hover:border-primary/30"
        >
          <Table2 className="w-5 h-5 md:w-6 md:h-6 text-chart-2" />
          <span className="font-semibold text-sm md:text-base">Export CSV</span>
          <span className="text-xs text-muted-foreground">Spreadsheet data</span>
        </Button>

        <Button
          onClick={() => generateJSON(results, config, currency)}
          variant="outline"
          className="h-auto py-3 md:py-4 flex flex-col items-center gap-2 hover:border-primary/30"
        >
          <Code className="w-5 h-5 md:w-6 md:h-6 text-chart-4" />
          <span className="font-semibold text-sm md:text-base">Export JSON</span>
          <span className="text-xs text-muted-foreground">Developer API data</span>
        </Button>
        
        <Button
          onClick={handleCopyLink}
          variant="outline"
          className="h-auto py-3 md:py-4 flex flex-col items-center gap-2 hover:border-primary/30"
        >
          {copied ? (
            <Check className="w-5 h-5 md:w-6 md:h-6 text-chart-2" />
          ) : (
            <Link2 className="w-5 h-5 md:w-6 md:h-6 text-chart-5" />
          )}
          <span className="font-semibold text-sm md:text-base">{copied ? "Copied!" : "Share Link"}</span>
          <span className="text-xs text-muted-foreground">Copy shareable URL</span>
        </Button>
      </div>
    </section>
  );
}