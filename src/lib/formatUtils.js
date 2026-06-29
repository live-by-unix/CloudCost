import { currencies } from './providerData';

export function formatCurrency(amount, currencyCode = "USD") {
  const curr = currencies.find(c => c.code === currencyCode) || currencies[0];
  const converted = amount * curr.rate;
  
  if (currencyCode === "JPY" || currencyCode === "KRW") {
    return `${curr.symbol}${Math.round(converted).toLocaleString()}`;
  }
  
  if (converted >= 1000000) {
    return `${curr.symbol}${(converted / 1000000).toFixed(2)}M`;
  }
  if (converted >= 10000) {
    return `${curr.symbol}${(converted / 1000).toFixed(1)}K`;
  }
  
  return `${curr.symbol}${converted.toFixed(2)}`;
}

export function formatNumber(num) {
  if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toLocaleString();
}

export function generateShareURL(config, currency) {
  const params = new URLSearchParams();
  Object.entries(config).forEach(([key, value]) => {
    params.set(key, String(value));
  });
  params.set("currency", currency);
  return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}

export function parseShareURL() {
  const params = new URLSearchParams(window.location.search);
  if (params.size === 0) return null;
  
  const config = {};
  const numericKeys = ["vcpu", "ram", "gpu", "ssdStorage", "objectStorage", "bandwidth", "dbStorage", "requests", "users", "environments"];
  
  numericKeys.forEach(key => {
    const val = params.get(key);
    if (val) config[key] = parseFloat(val);
  });
  
  const region = params.get("region");
  if (region) config.region = region;

  const reservedTier = params.get("reservedTier");
  if (reservedTier) config.reservedTier = reservedTier;
  
  const currency = params.get("currency") || "USD";
  
  return { config, currency };
}

export function generateCSV(results, currency) {
  const headers = ["Provider", "Monthly Cost", "Yearly Cost", "Compute", "GPU", "Storage", "Bandwidth", "Database", "Platform Fee", "Free Tier"];
  const rows = results.map(r => [
    r.provider.name,
    formatCurrency(r.costs.monthly, currency),
    formatCurrency(r.costs.yearly, currency),
    formatCurrency(r.costs.compute, currency),
    formatCurrency(r.costs.gpu, currency),
    formatCurrency(r.costs.storage, currency),
    formatCurrency(r.costs.bandwidth, currency),
    formatCurrency(r.costs.database, currency),
    formatCurrency(r.costs.platformFee, currency),
    `"${r.provider.freeTier}"`
  ]);
  
  const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "cloudcost-compare.csv";
  a.click();
  URL.revokeObjectURL(url);
}