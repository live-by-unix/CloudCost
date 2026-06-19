const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

export const providers = [
  {
    id: "aws",
    name: "AWS",
    slug: "aws-cost-calculator",
    color: "#FF9900",
    description: "Amazon Web Services — the largest cloud platform with 200+ services. Industry-leading IaaS with global infrastructure spanning 30+ regions.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
    pros: ["Largest service catalog", "Global infrastructure", "Mature ecosystem", "Enterprise support", "Advanced AI/ML services"],
    cons: ["Complex pricing", "Steep learning curve", "Vendor lock-in risk", "Egress fees"],
    bestFor: ["Enterprise applications", "Big data & analytics", "Machine learning", "Government/regulated industries"],
    freeTier: "12 months free tier: 750 hrs t2.micro, 5GB S3, 750 hrs RDS db.t2.micro, 1M Lambda requests/mo",
    pricing: {
      compute: { base: 0.0116, perVCPU: 0.048, perGB_RAM: 0.006 },
      storage: { ssd: 0.10, object: 0.023 },
      bandwidth: { free: 1, perGB: 0.09 },
      database: { perGB: 0.115 },
      requests: { free: 1000000, perMillion: 0.20 },
      platformFee: 0
    }
  },
  {
    id: "gcp",
    name: "Google Cloud",
    slug: "google-cloud-cost-calculator",
    color: "#4285F4",
    description: "Google Cloud Platform — powered by Google's global network. Known for data analytics, Kubernetes, and AI/ML capabilities.",
    logo: "https://www.gstatic.com/devrel-devsite/prod/v0e0f589edd85502a40d78d7d0825db8ea5ef3b99ab4070381ee86977c9168730/cloud/images/favicons/onecloud/super_cloud.png",
    pros: ["Best networking", "Leading in AI/ML", "Sustained use discounts", "Strong Kubernetes", "Competitive pricing"],
    cons: ["Smaller service catalog than AWS", "Fewer regions", "Less enterprise adoption"],
    bestFor: ["Data analytics", "Machine learning", "Kubernetes workloads", "Big data processing"],
    freeTier: "$300 credit for 90 days, always free: 1 f1-micro VM, 5GB Cloud Storage, 1GB Firestore",
    pricing: {
      compute: { base: 0.0104, perVCPU: 0.044, perGB_RAM: 0.0055 },
      storage: { ssd: 0.08, object: 0.020 },
      bandwidth: { free: 1, perGB: 0.085 },
      database: { perGB: 0.10 },
      requests: { free: 2000000, perMillion: 0.15 },
      platformFee: 0
    }
  },
  {
    id: "azure",
    name: "Microsoft Azure",
    slug: "azure-cost-calculator",
    color: "#0078D4",
    description: "Microsoft Azure — deep integration with Microsoft ecosystem. Enterprise-focused with hybrid cloud capabilities and 60+ regions.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg",
    pros: ["Microsoft integration", "Hybrid cloud", "Enterprise compliance", "60+ regions", "Active Directory"],
    cons: ["Complex pricing", "Portal can be slow", "Inconsistent UX across services"],
    bestFor: ["Microsoft shops", "Enterprise workloads", "Hybrid deployments", ".NET applications"],
    freeTier: "12 months free: 750 hrs B1s VM, 5GB Blob Storage, 250GB SQL Database, $200 credit",
    pricing: {
      compute: { base: 0.0130, perVCPU: 0.046, perGB_RAM: 0.0058 },
      storage: { ssd: 0.095, object: 0.021 },
      bandwidth: { free: 5, perGB: 0.087 },
      database: { perGB: 0.12 },
      requests: { free: 1000000, perMillion: 0.18 },
      platformFee: 0
    }
  },
  {
    id: "digitalocean",
    name: "DigitalOcean",
    slug: "digitalocean-cost-calculator",
    color: "#0080FF",
    description: "DigitalOcean — simple, predictable cloud for developers. Known for droplets, managed databases, and developer-friendly UX.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/ff/DigitalOcean_logo.svg",
    pros: ["Simple pricing", "Developer friendly", "Great documentation", "Predictable costs", "Fast provisioning"],
    cons: ["Fewer services", "Limited enterprise features", "Fewer regions", "No free tier compute"],
    bestFor: ["Startups", "Small businesses", "Developer projects", "Simple web apps"],
    freeTier: "$200 credit for 60 days, no always-free compute tier",
    pricing: {
      compute: { base: 0.0089, perVCPU: 0.036, perGB_RAM: 0.005 },
      storage: { ssd: 0.10, object: 0.020 },
      bandwidth: { free: 1000, perGB: 0.01 },
      database: { perGB: 0.10 },
      requests: { free: 0, perMillion: 0 },
      platformFee: 0
    }
  },
  {
    id: "heroku",
    name: "Heroku",
    slug: "heroku-cost-calculator",
    color: "#430098",
    description: "Heroku — the original PaaS. Simplified deployment with git push, add-ons marketplace, and managed runtime.",
    logo: "https://brand.heroku.com/static/media/heroku-logotype-vertical.81c49462.svg",
    pros: ["Easiest deployment", "Add-ons marketplace", "Git push deploys", "Managed platform", "Great for prototypes"],
    cons: ["Expensive at scale", "Cold starts on free tier", "Limited customization", "Fewer regions"],
    bestFor: ["Prototypes", "MVPs", "Small teams", "Hackathons"],
    freeTier: "Eco dynos from $5/mo, no free tier since Nov 2022",
    pricing: {
      compute: { base: 0.035, perVCPU: 0.07, perGB_RAM: 0.014 },
      storage: { ssd: 0, object: 0 },
      bandwidth: { free: 2000, perGB: 0 },
      database: { perGB: 0.20 },
      requests: { free: 0, perMillion: 0 },
      platformFee: 5
    }
  },
  {
    id: "cloudflare",
    name: "Cloudflare",
    slug: "cloudflare-cost-calculator",
    color: "#F6821F",
    description: "Cloudflare — edge computing and CDN leader. Workers, Pages, R2 storage with zero egress fees and global edge network.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/94/Cloudflare_Logo.png",
    pros: ["Zero egress fees", "Global edge network", "Workers platform", "Free CDN", "DDoS protection"],
    cons: ["Edge-focused (not traditional VMs)", "Worker limitations", "Vendor-specific APIs"],
    bestFor: ["Static sites", "Edge computing", "API gateways", "CDN workloads"],
    freeTier: "Free: 100K Workers requests/day, 10GB R2, unlimited Pages sites, free CDN",
    pricing: {
      compute: { base: 0, perVCPU: 0.02, perGB_RAM: 0.003 },
      storage: { ssd: 0, object: 0.015 },
      bandwidth: { free: 999999, perGB: 0 },
      database: { perGB: 0.05 },
      requests: { free: 10000000, perMillion: 0.50 },
      platformFee: 5
    }
  },
  {
    id: "vercel",
    name: "Vercel",
    slug: "vercel-cost-calculator",
    color: "#000000",
    description: "Vercel — the platform for frontend developers. Optimized for Next.js with edge functions, analytics, and instant deploys.",
    logo: "https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png",
    pros: ["Best for Next.js", "Instant deploys", "Edge functions", "Great DX", "Preview deployments"],
    cons: ["Expensive at scale", "Frontend focused", "Vendor lock-in with Next.js", "Build time limits"],
    bestFor: ["Next.js apps", "Jamstack sites", "Frontend projects", "Marketing sites"],
    freeTier: "Free: 100GB bandwidth, 100K serverless invocations, unlimited deploys for personal",
    pricing: {
      compute: { base: 0, perVCPU: 0.03, perGB_RAM: 0.005 },
      storage: { ssd: 0, object: 0.03 },
      bandwidth: { free: 100, perGB: 0.15 },
      database: { perGB: 0.15 },
      requests: { free: 1000000, perMillion: 2.0 },
      platformFee: 20
    }
  },
  {
    id: "render",
    name: "Render",
    slug: "render-cost-calculator",
    color: "#46E3B7",
    description: "Render — modern cloud for developers. Auto-deploys from Git, managed databases, and simple pricing without complexity.",
    logo: "https://cdn.sanity.io/images/hvk0tap5/production/f1a8ecef74e06ad918cf9e1e0f58c2b8cff02140-200x200.png",
    pros: ["Simple pricing", "Auto-deploy from Git", "Free SSL", "Managed everything", "Great free tier"],
    cons: ["Fewer regions", "Limited enterprise features", "Newer platform", "Cold starts on free tier"],
    bestFor: ["Startups", "Side projects", "Full-stack apps", "Heroku alternatives"],
    freeTier: "Free: 750 hrs/mo web services, 90 days for databases, static sites unlimited",
    pricing: {
      compute: { base: 0.010, perVCPU: 0.035, perGB_RAM: 0.005 },
      storage: { ssd: 0.10, object: 0.025 },
      bandwidth: { free: 100, perGB: 0.10 },
      database: { perGB: 0.12 },
      requests: { free: 0, perMillion: 0 },
      platformFee: 0
    }
  },
  {
    id: "flyio",
    name: "Fly.io",
    slug: "flyio-cost-calculator",
    color: "#8B5CF6",
    description: "Fly.io — run apps close to users worldwide. Micro-VMs on edge locations with built-in Anycast networking.",
    logo: "https://fly.io/static/images/brand/logo-landscape.svg",
    pros: ["Global edge deployment", "Micro-VMs", "Built-in Anycast", "Great for distributed apps", "Docker-native"],
    cons: ["Smaller ecosystem", "Steeper learning curve", "Less documentation", "Newer platform"],
    bestFor: ["Globally distributed apps", "Low-latency APIs", "Edge computing", "Real-time apps"],
    freeTier: "Free: 3 shared-cpu-1x VMs, 3GB persistent storage, 160GB outbound bandwidth",
    pricing: {
      compute: { base: 0.0071, perVCPU: 0.031, perGB_RAM: 0.004 },
      storage: { ssd: 0.15, object: 0.02 },
      bandwidth: { free: 160, perGB: 0.02 },
      database: { perGB: 0.10 },
      requests: { free: 0, perMillion: 0 },
      platformFee: 0
    }
  },
  {
    id: "linode",
    name: "Linode (Akamai)",
    slug: "linode-cost-calculator",
    color: "#00A95C",
    description: "Linode — now part of Akamai. Simple, affordable cloud with predictable pricing, great support, and global data centers.",
    logo: "https://www.linode.com/wp-content/uploads/2021/01/Linode-Logo-Black.svg",
    pros: ["Predictable pricing", "Great support", "Simple UX", "Good value", "Free bandwidth included"],
    cons: ["Fewer managed services", "Smaller ecosystem", "Limited enterprise features"],
    bestFor: ["Budget hosting", "Developer projects", "Small businesses", "Linux workloads"],
    freeTier: "$100 credit for 60 days, no always-free tier",
    pricing: {
      compute: { base: 0.0075, perVCPU: 0.030, perGB_RAM: 0.0045 },
      storage: { ssd: 0.10, object: 0.02 },
      bandwidth: { free: 1000, perGB: 0.01 },
      database: { perGB: 0.10 },
      requests: { free: 0, perMillion: 0 },
      platformFee: 0
    }
  },
  {
    id: "vultr",
    name: "Vultr",
    slug: "vultr-cost-calculator",
    color: "#007BFC",
    description: "Vultr — high performance cloud compute. Bare metal, cloud compute, and object storage across 25+ global locations.",
    logo: "https://www.vultr.com/media/logo_onwhite.svg",
    pros: ["High performance", "Bare metal options", "25+ locations", "Competitive pricing", "Hourly billing"],
    cons: ["Basic managed services", "Limited documentation", "Smaller community"],
    bestFor: ["High-performance workloads", "Game servers", "Bare metal needs", "Budget compute"],
    freeTier: "$250 credit for 30 days (with conditions), no always-free tier",
    pricing: {
      compute: { base: 0.0074, perVCPU: 0.030, perGB_RAM: 0.004 },
      storage: { ssd: 0.10, object: 0.02 },
      bandwidth: { free: 1000, perGB: 0.01 },
      database: { perGB: 0.10 },
      requests: { free: 0, perMillion: 0 },
      platformFee: 0
    }
  },
  {
    id: "oracle",
    name: "Oracle Cloud",
    slug: "oracle-cloud-cost-calculator",
    color: "#C74634",
    description: "Oracle Cloud Infrastructure — aggressive pricing with always-free tier. Strong database services and enterprise capabilities.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
    pros: ["Generous free tier", "Competitive pricing", "Strong databases", "ARM instances", "Free bandwidth"],
    cons: ["Smaller ecosystem", "Less community support", "Complex console", "Enterprise-focused UX"],
    bestFor: ["Database workloads", "Budget hosting", "Oracle shops", "ARM compute"],
    freeTier: "Always free: 2 AMD VMs, 4 ARM Ampere cores, 200GB block storage, 10TB bandwidth, ATP database",
    pricing: {
      compute: { base: 0.0065, perVCPU: 0.025, perGB_RAM: 0.003 },
      storage: { ssd: 0.085, object: 0.0255 },
      bandwidth: { free: 10000, perGB: 0.0085 },
      database: { perGB: 0.085 },
      requests: { free: 0, perMillion: 0 },
      platformFee: 0
    }
  },
  {
    id: "railway",
    name: "Railway",
    slug: "railway-cost-calculator",
    color: "#0B0D0E",
    description: "Railway — instant infrastructure for developers. Deploy from GitHub, built-in databases, and usage-based pricing.",
    logo: "https://railway.app/brand/logotype-light.svg",
    pros: ["Instant deploys", "Usage-based pricing", "Built-in databases", "Great DX", "Simple scaling"],
    cons: ["Limited regions", "Newer platform", "Limited enterprise features", "Build time limits"],
    bestFor: ["Side projects", "Startups", "Full-stack apps", "Rapid prototyping"],
    freeTier: "Free trial: $5/mo credit, 500 hrs execution, 100GB bandwidth",
    pricing: {
      compute: { base: 0, perVCPU: 0.035, perGB_RAM: 0.005 },
      storage: { ssd: 0.10, object: 0.025 },
      bandwidth: { free: 100, perGB: 0.10 },
      database: { perGB: 0.12 },
      requests: { free: 0, perMillion: 0 },
      platformFee: 5
    }
  }
];

export const presets = [
  {
    id: "personal-blog",
    name: "Personal Blog",
    icon: "📝",
    description: "Static blog with occasional traffic",
    config: { vcpu: 1, ram: 0.5, ssdStorage: 10, objectStorage: 5, bandwidth: 50, dbStorage: 1, requests: 100000, users: 500, environments: 1, region: "us-east" }
  },
  {
    id: "portfolio",
    name: "Portfolio Website",
    icon: "🎨",
    description: "Personal portfolio with media assets",
    config: { vcpu: 1, ram: 1, ssdStorage: 20, objectStorage: 10, bandwidth: 100, dbStorage: 2, requests: 200000, users: 1000, environments: 2, region: "us-east" }
  },
  {
    id: "saas-mvp",
    name: "SaaS MVP",
    icon: "🚀",
    description: "Early-stage SaaS with growing userbase",
    config: { vcpu: 2, ram: 4, ssdStorage: 50, objectStorage: 25, bandwidth: 500, dbStorage: 20, requests: 2000000, users: 5000, environments: 3, region: "us-east" }
  },
  {
    id: "startup-app",
    name: "Startup App",
    icon: "💡",
    description: "Series A startup with scaling needs",
    config: { vcpu: 4, ram: 8, ssdStorage: 100, objectStorage: 100, bandwidth: 2000, dbStorage: 50, requests: 10000000, users: 25000, environments: 4, region: "us-east" }
  },
  {
    id: "ecommerce",
    name: "Ecommerce Store",
    icon: "🛒",
    description: "Online store with product catalog",
    config: { vcpu: 4, ram: 8, ssdStorage: 100, objectStorage: 200, bandwidth: 3000, dbStorage: 100, requests: 15000000, users: 50000, environments: 3, region: "us-east" }
  },
  {
    id: "rest-api",
    name: "REST API",
    icon: "⚡",
    description: "API service handling many requests",
    config: { vcpu: 2, ram: 4, ssdStorage: 20, objectStorage: 10, bandwidth: 1000, dbStorage: 30, requests: 50000000, users: 10000, environments: 3, region: "us-east" }
  },
  {
    id: "enterprise",
    name: "Enterprise Application",
    icon: "🏢",
    description: "Large-scale enterprise workload",
    config: { vcpu: 16, ram: 64, ssdStorage: 500, objectStorage: 1000, bandwidth: 10000, dbStorage: 500, requests: 100000000, users: 100000, environments: 6, region: "us-east" }
  },
  {
    id: "ai-app",
    name: "AI Application",
    icon: "🤖",
    description: "ML/AI workload with GPU needs",
    config: { vcpu: 8, ram: 32, ssdStorage: 200, objectStorage: 500, bandwidth: 5000, dbStorage: 200, requests: 20000000, users: 10000, environments: 3, region: "us-east" }
  },
  {
    id: "high-traffic",
    name: "High Traffic Website",
    icon: "📈",
    description: "Content site with millions of visitors",
    config: { vcpu: 8, ram: 16, ssdStorage: 200, objectStorage: 500, bandwidth: 20000, dbStorage: 100, requests: 200000000, users: 500000, environments: 4, region: "us-east" }
  },
  {
    id: "streaming",
    name: "Streaming Platform",
    icon: "🎬",
    description: "Video/audio streaming service",
    config: { vcpu: 16, ram: 32, ssdStorage: 500, objectStorage: 5000, bandwidth: 50000, dbStorage: 200, requests: 100000000, users: 200000, environments: 5, region: "us-east" }
  }
];

export const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar", rate: 1 },
  { code: "EUR", symbol: "€", name: "Euro", rate: 0.92 },
  { code: "GBP", symbol: "£", name: "British Pound", rate: 0.79 },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar", rate: 1.36 },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", rate: 1.53 },
  { code: "INR", symbol: "₹", name: "Indian Rupee", rate: 83.12 },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", rate: 149.50 }
];

export const regions = [
  { id: "us-east", name: "US East (Virginia)" },
  { id: "us-west", name: "US West (Oregon)" },
  { id: "eu-west", name: "EU West (Ireland)" },
  { id: "eu-central", name: "EU Central (Frankfurt)" },
  { id: "ap-southeast", name: "Asia Pacific (Singapore)" },
  { id: "ap-northeast", name: "Asia Pacific (Tokyo)" }
];

export const defaultConfig = {
  vcpu: 2,
  ram: 4,
  ssdStorage: 50,
  objectStorage: 25,
  bandwidth: 500,
  dbStorage: 20,
  requests: 2000000,
  users: 5000,
  environments: 3,
  region: "us-east"
};