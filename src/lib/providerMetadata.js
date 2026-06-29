export const providerMeta = {
  aws:         { category: "hyperscaler", sla: "99.99%", datacenters: 108, founded: 2006, website: "https://aws.amazon.com" },
  gcp:         { category: "hyperscaler", sla: "99.95%", datacenters: 40,  founded: 2008, website: "https://cloud.google.com" },
  azure:       { category: "hyperscaler", sla: "99.99%", datacenters: 60,  founded: 2010, website: "https://azure.microsoft.com" },
  ibm:         { category: "hyperscaler", sla: "99.99%", datacenters: 60,  founded: 2013, website: "https://www.ibm.com/cloud" },
  oracle:      { category: "hyperscaler", sla: "99.99%", datacenters: 40,  founded: 2015, website: "https://www.oracle.com/cloud" },
  heroku:      { category: "paas",        sla: "99.95%", datacenters: 4,   founded: 2007, website: "https://www.heroku.com" },
  vercel:      { category: "paas",        sla: "99.99%", datacenters: 18,  founded: 2015, website: "https://vercel.com" },
  render:      { category: "paas",        sla: "99.9%",  datacenters: 4,   founded: 2018, website: "https://render.com" },
  railway:     { category: "paas",        sla: "99.9%",  datacenters: 3,   founded: 2020, website: "https://railway.app" },
  digitalocean:{ category: "value",       sla: "99.99%", datacenters: 14,  founded: 2011, website: "https://www.digitalocean.com" },
  linode:      { category: "value",       sla: "99.99%", datacenters: 23,  founded: 2003, website: "https://www.linode.com" },
  vultr:       { category: "value",       sla: "99.99%", datacenters: 32,  founded: 2014, website: "https://www.vultr.com" },
  hetzner:     { category: "value",       sla: "99.9%",  datacenters: 6,   founded: 1997, website: "https://www.hetzner.com" },
  scaleway:    { category: "value",       sla: "99.9%",  datacenters: 8,   founded: 1999, website: "https://www.scaleway.com" },
  kamatero:    { category: "value",       sla: "99.95%", datacenters: 13,  founded: 2005, website: "https://www.kamatera.com" },
  upcloud:     { category: "value",       sla: "100%",   datacenters: 12,  founded: 2011, website: "https://upcloud.com" },
  cloudflare:  { category: "edge",        sla: "100%",   datacenters: 320, founded: 2009, website: "https://www.cloudflare.com" },
  flyio:       { category: "edge",        sla: "99.9%",  datacenters: 35,  founded: 2017, website: "https://fly.io" }
};

export const categories = [
  { id: "all",         name: "All Providers",  icon: "🌐", description: "Every provider" },
  { id: "hyperscaler", name: "Hyperscalers",   icon: "🏢", description: "AWS · GCP · Azure · Oracle · IBM" },
  { id: "paas",        name: "Managed PaaS",   icon: "☁️", description: "Heroku · Vercel · Render · Railway" },
  { id: "value",       name: "Budget / Value", icon: "💰", description: "Hetzner · DO · Linode · Vultr · …" },
  { id: "edge",        name: "Edge Computing", icon: "⚡", description: "Cloudflare · Fly.io" }
];

export function getProviderMeta(id) {
  return providerMeta[id] || { category: "other", sla: "—", datacenters: 0, founded: 0, website: "#" };
}

export function getProviderCategory(id) {
  return providerMeta[id]?.category || "other";
}

export function getCategoryLabel(categoryId) {
  const cat = categories.find(c => c.id === categoryId);
  return cat ? cat.name : categoryId;
}