export const providers = [
  {
    id: "aws",
    name: "AWS",
    slug: "aws-cost-calculator",
    color: "#FF9900",
    description: "Amazon Web Services — the largest cloud platform with 200+ services. Industry-leading IaaS with global infrastructure spanning 33 regions and 105 Availability Zones.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
    pros: ["Largest service catalog (200+)", "Global infrastructure (33 regions)", "Mature ecosystem", "Enterprise support", "Advanced AI/ML (SageMaker, Bedrock)"],
    cons: ["Complex pricing", "Steep learning curve", "Vendor lock-in risk", "High egress fees"],
    bestFor: ["Enterprise applications", "Big data & analytics", "Machine learning", "Government/regulated industries"],
    freeTier: "12 months free tier: 750 hrs t2.micro, 5GB S3, 750 hrs RDS, 1M Lambda requests/mo",
    pricing: {
      compute: { base: 0.0123, perVCPU: 0.052, perGB_RAM: 0.0065 },
      gpu: { perGPU: 560 },
      storage: { ssd: 0.10, object: 0.023 },
      bandwidth: { free: 1, perGB: 0.09 },
      database: { perGB: 0.115 },
      requests: { free: 1000000, perMillion: 0.20 },
      reserved: { "1yr": 0.32, "3yr": 0.53 },
      platformFee: 0
    }
  },
  {
    id: "gcp",
    name: "Google Cloud",
    slug: "google-cloud-cost-calculator",
    color: "#4285F4",
    description: "Google Cloud Platform — powered by Google's global network. Known for data analytics (BigQuery), Kubernetes (GKE), and AI/ML (Vertex AI, Gemini) capabilities.",
    logo: "https://www.gstatic.com/devrel-devsite/prod/v0e0f589edd85502a40d78d7d0825db8ea5ef3b99ab4070381ee86977c9168730/cloud/images/favicons/onecloud/super_cloud.png",
    pros: ["Best networking", "Leading in AI/ML (Gemini)", "Sustained use discounts", "Strong Kubernetes (GKE)", "BigQuery analytics"],
    cons: ["Smaller service catalog than AWS", "Fewer regions (40+)", "Less enterprise adoption"],
    bestFor: ["Data analytics", "Machine learning", "Kubernetes workloads", "Big data processing"],
    freeTier: "$300 credit for 90 days, always free: 1 e2-micro VM, 5GB Cloud Storage, 1GB Firestore, 1M Cloud Run requests/mo",
    pricing: {
      compute: { base: 0.0111, perVCPU: 0.048, perGB_RAM: 0.006 },
      gpu: { perGPU: 510 },
      storage: { ssd: 0.085, object: 0.020 },
      bandwidth: { free: 1, perGB: 0.085 },
      database: { perGB: 0.10 },
      requests: { free: 2000000, perMillion: 0.15 },
      reserved: { "1yr": 0.30, "3yr": 0.50 },
      platformFee: 0
    }
  },
  {
    id: "azure",
    name: "Microsoft Azure",
    slug: "azure-cost-calculator",
    color: "#0078D4",
    description: "Microsoft Azure — deep integration with Microsoft ecosystem. Enterprise-focused with hybrid cloud capabilities, 60+ regions, and strong OpenAI partnership.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg",
    pros: ["Microsoft ecosystem integration", "Hybrid cloud (Arc)", "Enterprise compliance", "60+ regions", "Azure OpenAI Service"],
    cons: ["Complex pricing", "Portal can be slow", "Inconsistent UX across services"],
    bestFor: ["Microsoft shops", "Enterprise workloads", "Hybrid deployments", ".NET applications"],
    freeTier: "12 months free: 750 hrs B1s VM, 5GB Blob Storage, 250GB SQL Database, $200 credit for 30 days",
    pricing: {
      compute: { base: 0.0138, perVCPU: 0.050, perGB_RAM: 0.0063 },
      gpu: { perGPU: 540 },
      storage: { ssd: 0.095, object: 0.021 },
      bandwidth: { free: 5, perGB: 0.087 },
      database: { perGB: 0.12 },
      requests: { free: 1000000, perMillion: 0.18 },
      reserved: { "1yr": 0.33, "3yr": 0.55 },
      platformFee: 0
    }
  },
  {
    id: "digitalocean",
    name: "DigitalOcean",
    slug: "digitalocean-cost-calculator",
    color: "#0080FF",
    description: "DigitalOcean — simple, predictable cloud for developers. Known for droplets, managed databases, App Platform, and developer-friendly UX. 14 data centers globally.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/ff/DigitalOcean_logo.svg",
    pros: ["Simple predictable pricing", "Developer friendly", "Great documentation", "Fast provisioning", "Generous free egress (1TB+)"],
    cons: ["Fewer managed services", "Limited enterprise features", "No reserved discounts", "GPU only on premium"],
    bestFor: ["Startups", "Small businesses", "Developer projects", "Simple web apps"],
    freeTier: "$200 credit for 60 days, no always-free compute tier",
    pricing: {
      compute: { base: 0.0094, perVCPU: 0.038, perGB_RAM: 0.0055 },
      gpu: { perGPU: 620 },
      storage: { ssd: 0.10, object: 0.020 },
      bandwidth: { free: 1000, perGB: 0.01 },
      database: { perGB: 0.10 },
      requests: { free: 0, perMillion: 0 },
      reserved: { "1yr": 0, "3yr": 0 },
      platformFee: 0
    }
  },
  {
    id: "heroku",
    name: "Heroku",
    slug: "heroku-cost-calculator",
    color: "#430098",
    description: "Heroku — the original PaaS. Simplified deployment with git push, add-ons marketplace, and managed runtime. Now part of Salesforce.",
    logo: "https://brand.heroku.com/static/media/heroku-logotype-vertical.81c49462.svg",
    pros: ["Easiest deployment", "Add-ons marketplace", "Git push deploys", "Managed platform", "Great for prototypes"],
    cons: ["Expensive at scale", "No free tier since 2022", "Limited customization", "Fewer regions"],
    bestFor: ["Prototypes", "MVPs", "Small teams", "Hackathons"],
    freeTier: "Eco dynos from $5/mo, no free tier since Nov 2022",
    pricing: {
      compute: { base: 0.037, perVCPU: 0.075, perGB_RAM: 0.015 },
      gpu: { perGPU: 0 },
      storage: { ssd: 0, object: 0 },
      bandwidth: { free: 2000, perGB: 0 },
      database: { perGB: 0.20 },
      requests: { free: 0, perMillion: 0 },
      reserved: { "1yr": 0, "3yr": 0 },
      platformFee: 5
    }
  },
  {
    id: "cloudflare",
    name: "Cloudflare",
    slug: "cloudflare-cost-calculator",
    color: "#F6821F",
    description: "Cloudflare — edge computing and CDN leader. Workers, Pages, R2 storage with ZERO egress fees, and global edge network spanning 320+ cities.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/94/Cloudflare_Logo.png",
    pros: ["Zero egress fees (R2)", "Global edge network (320+ cities)", "Workers platform", "Free CDN", "Built-in DDoS protection"],
    cons: ["Edge-focused (not traditional VMs)", "Worker execution limits", "Vendor-specific APIs"],
    bestFor: ["Static sites", "Edge computing", "API gateways", "CDN workloads"],
    freeTier: "Free: 100K Workers requests/day, 10GB R2, unlimited Pages sites, free CDN, Workers AI 10K requests/day",
    pricing: {
      compute: { base: 0, perVCPU: 0.02, perGB_RAM: 0.003 },
      gpu: { perGPU: 0 },
      storage: { ssd: 0, object: 0.015 },
      bandwidth: { free: 999999, perGB: 0 },
      database: { perGB: 0.05 },
      requests: { free: 10000000, perMillion: 0.50 },
      reserved: { "1yr": 0, "3yr": 0 },
      platformFee: 5
    }
  },
  {
    id: "vercel",
    name: "Vercel",
    slug: "vercel-cost-calculator",
    color: "#000000",
    description: "Vercel — the platform for frontend developers. Optimized for Next.js with edge functions, analytics, v0 AI, and instant deploys.",
    logo: "https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png",
    pros: ["Best for Next.js", "Instant deploys", "Edge functions", "Great DX", "Preview deployments"],
    cons: ["Expensive at scale", "Frontend focused", "Vendor lock-in with Next.js", "Build time limits"],
    bestFor: ["Next.js apps", "Jamstack sites", "Frontend projects", "Marketing sites"],
    freeTier: "Free: 100GB bandwidth, 100K serverless invocations, unlimited deploys for personal, v0 AI (limited)",
    pricing: {
      compute: { base: 0, perVCPU: 0.03, perGB_RAM: 0.005 },
      gpu: { perGPU: 0 },
      storage: { ssd: 0, object: 0.03 },
      bandwidth: { free: 100, perGB: 0.15 },
      database: { perGB: 0.15 },
      requests: { free: 1000000, perMillion: 2.0 },
      reserved: { "1yr": 0, "3yr": 0 },
      platformFee: 20
    }
  },
  {
    id: "render",
    name: "Render",
    slug: "render-cost-calculator",
    color: "#46E3B7",
    description: "Render — modern cloud for developers. Auto-deploys from Git, managed databases, Blueprints, and simple pricing without complexity.",
    logo: "https://cdn.sanity.io/images/hvk0tap5/production/f1a8ecef74e06ad918cf9e1e0f58c2b8cff02140-200x200.png",
    pros: ["Simple pricing", "Auto-deploy from Git", "Free SSL", "Blueprints (IaC)", "Generous free tier"],
    cons: ["Fewer regions", "Limited enterprise features", "Newer platform", "Cold starts on free tier"],
    bestFor: ["Startups", "Side projects", "Full-stack apps", "Heroku alternatives"],
    freeTier: "Free: 750 hrs/mo web services, 90 days for databases, static sites unlimited, 100GB bandwidth",
    pricing: {
      compute: { base: 0.011, perVCPU: 0.037, perGB_RAM: 0.0055 },
      gpu: { perGPU: 0 },
      storage: { ssd: 0.10, object: 0.025 },
      bandwidth: { free: 100, perGB: 0.10 },
      database: { perGB: 0.12 },
      requests: { free: 0, perMillion: 0 },
      reserved: { "1yr": 0, "3yr": 0 },
      platformFee: 0
    }
  },
  {
    id: "flyio",
    name: "Fly.io",
    slug: "flyio-cost-calculator",
    color: "#8B5CF6",
    description: "Fly.io — run apps close to users worldwide. Micro-VMs (Firecracker) on edge locations with built-in Anycast networking.",
    logo: "https://fly.io/static/images/brand/logo-landscape.svg",
    pros: ["Global edge deployment", "Micro-VMs (Firecracker)", "Built-in Anycast", "Docker-native", "GPU support"],
    cons: ["Smaller ecosystem", "Steeper learning curve", "Less documentation", "Newer platform"],
    bestFor: ["Globally distributed apps", "Low-latency APIs", "Edge computing", "Real-time apps"],
    freeTier: "Free: 3 shared-cpu-1x VMs, 3GB persistent storage, 160GB outbound bandwidth",
    pricing: {
      compute: { base: 0.0076, perVCPU: 0.033, perGB_RAM: 0.0045 },
      gpu: { perGPU: 480 },
      storage: { ssd: 0.15, object: 0.02 },
      bandwidth: { free: 160, perGB: 0.02 },
      database: { perGB: 0.10 },
      requests: { free: 0, perMillion: 0 },
      reserved: { "1yr": 0, "3yr": 0 },
      platformFee: 0
    }
  },
  {
    id: "linode",
    name: "Linode (Akamai)",
    slug: "linode-cost-calculator",
    color: "#00A95C",
    description: "Linode (Akamai Cloud Computing) — simple, affordable cloud with predictable pricing, great support, and 23+ global data centers.",
    logo: "https://www.linode.com/wp-content/uploads/2021/01/Linode-Logo-Black.svg",
    pros: ["Predictable pricing", "Great support", "Simple UX", "Good value", "Free bandwidth included (1TB+)"],
    cons: ["Fewer managed services", "Smaller ecosystem", "Limited enterprise features"],
    bestFor: ["Budget hosting", "Developer projects", "Small businesses", "Linux workloads"],
    freeTier: "$100 credit for 60 days, no always-free tier",
    pricing: {
      compute: { base: 0.0080, perVCPU: 0.032, perGB_RAM: 0.005 },
      gpu: { perGPU: 580 },
      storage: { ssd: 0.10, object: 0.02 },
      bandwidth: { free: 1000, perGB: 0.01 },
      database: { perGB: 0.10 },
      requests: { free: 0, perMillion: 0 },
      reserved: { "1yr": 0, "3yr": 0 },
      platformFee: 0
    }
  },
  {
    id: "vultr",
    name: "Vultr",
    slug: "vultr-cost-calculator",
    color: "#007BFC",
    description: "Vultr — high performance cloud compute. Bare metal, cloud compute, GPU, and object storage across 32+ global locations.",
    logo: "https://www.vultr.com/media/logo_onwhite.svg",
    pros: ["High performance", "Bare metal options", "GPU instances", "32+ locations", "Hourly billing"],
    cons: ["Basic managed services", "Limited documentation", "Smaller community"],
    bestFor: ["High-performance workloads", "Game servers", "Bare metal needs", "Budget GPU compute"],
    freeTier: "$250 credit for 30 days, no always-free tier",
    pricing: {
      compute: { base: 0.0079, perVCPU: 0.032, perGB_RAM: 0.0045 },
      gpu: { perGPU: 460 },
      storage: { ssd: 0.10, object: 0.02 },
      bandwidth: { free: 1000, perGB: 0.01 },
      database: { perGB: 0.10 },
      requests: { free: 0, perMillion: 0 },
      reserved: { "1yr": 0, "3yr": 0 },
      platformFee: 0
    }
  },
  {
    id: "oracle",
    name: "Oracle Cloud",
    slug: "oracle-cloud-cost-calculator",
    color: "#C74634",
    description: "Oracle Cloud Infrastructure — aggressive pricing with the most generous always-free tier. Strong database services, ARM instances, and 40+ regions.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
    pros: ["Most generous free tier", "Competitive pricing", "Strong databases (Autonomous DB)", "ARM Ampere instances", "10TB free bandwidth"],
    cons: ["Smaller ecosystem", "Less community support", "Complex console", "Enterprise-focused UX"],
    bestFor: ["Database workloads", "Budget hosting", "Oracle shops", "ARM compute"],
    freeTier: "Always free: 2 AMD VMs, 4 ARM Ampere cores (24GB RAM), 200GB block storage, 10TB bandwidth, 2 Autonomous DBs",
    pricing: {
      compute: { base: 0.0070, perVCPU: 0.027, perGB_RAM: 0.0035 },
      gpu: { perGPU: 530 },
      storage: { ssd: 0.085, object: 0.0255 },
      bandwidth: { free: 10000, perGB: 0.0085 },
      database: { perGB: 0.085 },
      requests: { free: 0, perMillion: 0 },
      reserved: { "1yr": 0.28, "3yr": 0.48 },
      platformFee: 0
    }
  },
  {
    id: "railway",
    name: "Railway",
    slug: "railway-cost-calculator",
    color: "#0B0D0E",
    description: "Railway — instant infrastructure for developers. Deploy from GitHub, built-in databases, volume mounts, and usage-based pricing.",
    logo: "https://railway.app/brand/logotype-light.svg",
    pros: ["Instant deploys", "Usage-based pricing", "Built-in databases", "Great DX", "Simple scaling"],
    cons: ["Limited regions", "Newer platform", "Limited enterprise features", "Build time limits"],
    bestFor: ["Side projects", "Startups", "Full-stack apps", "Rapid prototyping"],
    freeTier: "Free trial: $5/mo credit, 500 hrs execution, 100GB bandwidth",
    pricing: {
      compute: { base: 0, perVCPU: 0.037, perGB_RAM: 0.0055 },
      gpu: { perGPU: 0 },
      storage: { ssd: 0.10, object: 0.025 },
      bandwidth: { free: 100, perGB: 0.10 },
      database: { perGB: 0.12 },
      requests: { free: 0, perMillion: 0 },
      reserved: { "1yr": 0, "3yr": 0 },
      platformFee: 5
    }
  },
  {
    id: "hetzner",
    name: "Hetzner",
    slug: "hetzner-cost-calculator",
    color: "#D50C2D",
    description: "Hetzner Cloud — best price-performance ratio in Europe. Bare metal, cloud servers, and dedicated GPUs at unbeatable prices.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f4/Hetzner_Logo.svg",
    pros: ["Best price/performance", "Dedicated GPU servers", "Bare metal options", "20TB free bandwidth", "European data centers"],
    cons: ["Limited regions (DE, FI, US)", "No managed databases", "Less enterprise features", "Not for managed PaaS"],
    bestFor: ["Budget compute", "European hosting", "Self-managed infrastructure", "Dedicated servers"],
    freeTier: "No always-free tier, €20 credit for new accounts",
    pricing: {
      compute: { base: 0.0050, perVCPU: 0.020, perGB_RAM: 0.0030 },
      gpu: { perGPU: 280 },
      storage: { ssd: 0.056, object: 0.013 },
      bandwidth: { free: 20000, perGB: 0.0014 },
      database: { perGB: 0.08 },
      requests: { free: 0, perMillion: 0 },
      reserved: { "1yr": 0, "3yr": 0 },
      platformFee: 0
    }
  },
  {
    id: "scaleway",
    name: "Scaleway",
    slug: "scaleway-cost-calculator",
    color: "#4F0599",
    description: "Scaleway — European cloud leader. Cloud instances, bare metal, Kubernetes Kapsule, and serverless functions with strong privacy and data sovereignty.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Scaleway_logo.svg",
    pros: ["European data sovereignty", "Competitive pricing", "Bare metal options", "Serverless functions", "Free bandwidth (75GB+)"],
    cons: ["Limited regions (EU focus)", "Smaller ecosystem", "Documentation gaps"],
    bestFor: ["European hosting", "GDPR compliance", "Budget compute", "Data sovereignty needs"],
    freeTier: "No always-free tier, €100 credit for new accounts",
    pricing: {
      compute: { base: 0.0060, perVCPU: 0.024, perGB_RAM: 0.0035 },
      gpu: { perGPU: 350 },
      storage: { ssd: 0.08, object: 0.015 },
      bandwidth: { free: 75, perGB: 0.005 },
      database: { perGB: 0.09 },
      requests: { free: 0, perMillion: 0 },
      reserved: { "1yr": 0, "3yr": 0 },
      platformFee: 0
    }
  },
  {
    id: "kamatero",
    name: "Kamatero",
    slug: "kamatero-cost-calculator",
    color: "#1E73BE",
    description: "Kamatera — fully customizable cloud servers with per-hour billing. 13 global data centers, instant scaling, and 30-day free trial.",
    logo: "https://www.kamatera.com/assets/images/logo.svg",
    pros: ["Fully customizable servers", "13 global data centers", "Per-hour billing", "Instant scaling", "30-day free trial"],
    cons: ["Self-managed only", "Limited PaaS features", "Smaller community"],
    bestFor: ["Custom configurations", "Budget hosting", "Global presence", "Test environments"],
    freeTier: "30-day free trial with up to $100 credit",
    pricing: {
      compute: { base: 0.0065, perVCPU: 0.026, perGB_RAM: 0.0040 },
      gpu: { perGPU: 0 },
      storage: { ssd: 0.08, object: 0.018 },
      bandwidth: { free: 5000, perGB: 0.005 },
      database: { perGB: 0.10 },
      requests: { free: 0, perMillion: 0 },
      reserved: { "1yr": 0, "3yr": 0 },
      platformFee: 0
    }
  },
  {
    id: "upcloud",
    name: "UpCloud",
    slug: "upcloud-cost-calculator",
    color: "#7B16FF",
    description: "UpCloud — high-performance cloud with fastest SSDs. MaxIOPS block storage, global locations, and 100% uptime SLA.",
    logo: "https://assets.upcloud.com/images/logo.svg",
    pros: ["Fastest SSDs (MaxIOPS)", "100% uptime SLA", "Competitive pricing", "Global locations", "Free bandwidth included"],
    cons: ["Smaller ecosystem", "Limited managed services", "Less well-known"],
    bestFor: ["High-performance compute", "Database workloads", "Low-latency apps", "European hosting"],
    freeTier: "3-day free trial, no always-free tier",
    pricing: {
      compute: { base: 0.0072, perVCPU: 0.028, perGB_RAM: 0.0042 },
      gpu: { perGPU: 0 },
      storage: { ssd: 0.09, object: 0.018 },
      bandwidth: { free: 1000, perGB: 0.008 },
      database: { perGB: 0.10 },
      requests: { free: 0, perMillion: 0 },
      reserved: { "1yr": 0, "3yr": 0 },
      platformFee: 0
    }
  },
  {
    id: "ibm",
    name: "IBM Cloud",
    slug: "ibm-cloud-cost-calculator",
    color: "#0F62FE",
    description: "IBM Cloud — enterprise cloud with Red Hat OpenShift, AI (watsonx), quantum computing access, and hybrid cloud capabilities.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    pros: ["Red Hat OpenShift", "watsonx AI platform", "Quantum computing access", "Hybrid cloud", "Enterprise compliance"],
    cons: ["Complex pricing", "Less developer-friendly", "Fewer managed services", "Steeper learning curve"],
    bestFor: ["Enterprise workloads", "AI/ML (watsonx)", "OpenShift/Kubernetes", "Regulated industries"],
    freeTier: "Lite account: 200+ free tier services including Cloud Functions, 5GB Cloud Object Storage, Code Engine",
    pricing: {
      compute: { base: 0.0115, perVCPU: 0.045, perGB_RAM: 0.0058 },
      gpu: { perGPU: 590 },
      storage: { ssd: 0.10, object: 0.022 },
      bandwidth: { free: 5, perGB: 0.085 },
      database: { perGB: 0.115 },
      requests: { free: 1000000, perMillion: 0.17 },
      reserved: { "1yr": 0.30, "3yr": 0.52 },
      platformFee: 0
    }
  }
];

export const presets = [
  {
    id: "personal-blog",
    name: "Personal Blog",
    icon: "📝",
    description: "Static blog with occasional traffic",
    config: { vcpu: 1, ram: 0.5, gpu: 0, ssdStorage: 10, objectStorage: 5, bandwidth: 50, dbStorage: 1, requests: 100000, users: 500, environments: 1, region: "us-east", reservedTier: "on-demand" }
  },
  {
    id: "portfolio",
    name: "Portfolio Website",
    icon: "🎨",
    description: "Personal portfolio with media assets",
    config: { vcpu: 1, ram: 1, gpu: 0, ssdStorage: 20, objectStorage: 10, bandwidth: 100, dbStorage: 2, requests: 200000, users: 1000, environments: 2, region: "us-east", reservedTier: "on-demand" }
  },
  {
    id: "saas-mvp",
    name: "SaaS MVP",
    icon: "🚀",
    description: "Early-stage SaaS with growing userbase",
    config: { vcpu: 2, ram: 4, gpu: 0, ssdStorage: 50, objectStorage: 25, bandwidth: 500, dbStorage: 20, requests: 2000000, users: 5000, environments: 3, region: "us-east", reservedTier: "on-demand" }
  },
  {
    id: "startup-app",
    name: "Startup App",
    icon: "💡",
    description: "Series A startup with scaling needs",
    config: { vcpu: 4, ram: 8, gpu: 0, ssdStorage: 100, objectStorage: 100, bandwidth: 2000, dbStorage: 50, requests: 10000000, users: 25000, environments: 4, region: "us-east", reservedTier: "1yr" }
  },
  {
    id: "ecommerce",
    name: "Ecommerce Store",
    icon: "🛒",
    description: "Online store with product catalog",
    config: { vcpu: 4, ram: 8, gpu: 0, ssdStorage: 100, objectStorage: 200, bandwidth: 3000, dbStorage: 100, requests: 15000000, users: 50000, environments: 3, region: "us-east", reservedTier: "1yr" }
  },
  {
    id: "rest-api",
    name: "REST API",
    icon: "⚡",
    description: "API service handling many requests",
    config: { vcpu: 2, ram: 4, gpu: 0, ssdStorage: 20, objectStorage: 10, bandwidth: 1000, dbStorage: 30, requests: 50000000, users: 10000, environments: 3, region: "us-east", reservedTier: "on-demand" }
  },
  {
    id: "enterprise",
    name: "Enterprise Application",
    icon: "🏢",
    description: "Large-scale enterprise workload",
    config: { vcpu: 16, ram: 64, gpu: 0, ssdStorage: 500, objectStorage: 1000, bandwidth: 10000, dbStorage: 500, requests: 100000000, users: 100000, environments: 6, region: "us-east", reservedTier: "3yr" }
  },
  {
    id: "ai-app",
    name: "AI Application",
    icon: "🤖",
    description: "ML/AI workload with GPU needs",
    config: { vcpu: 8, ram: 32, gpu: 2, ssdStorage: 200, objectStorage: 500, bandwidth: 5000, dbStorage: 200, requests: 20000000, users: 10000, environments: 3, region: "us-east", reservedTier: "1yr" }
  },
  {
    id: "high-traffic",
    name: "High Traffic Website",
    icon: "📈",
    description: "Content site with millions of visitors",
    config: { vcpu: 8, ram: 16, gpu: 0, ssdStorage: 200, objectStorage: 500, bandwidth: 20000, dbStorage: 100, requests: 200000000, users: 500000, environments: 4, region: "us-east", reservedTier: "on-demand" }
  },
  {
    id: "streaming",
    name: "Streaming Platform",
    icon: "🎬",
    description: "Video/audio streaming service",
    config: { vcpu: 16, ram: 32, gpu: 0, ssdStorage: 500, objectStorage: 5000, bandwidth: 50000, dbStorage: 200, requests: 100000000, users: 200000, environments: 5, region: "us-east", reservedTier: "1yr" }
  },
  {
    id: "microservices",
    name: "Microservices",
    icon: "🔧",
    description: "Containerized microservice architecture",
    config: { vcpu: 8, ram: 16, gpu: 0, ssdStorage: 200, objectStorage: 50, bandwidth: 2000, dbStorage: 100, requests: 30000000, users: 20000, environments: 4, region: "us-east", reservedTier: "on-demand" }
  },
  {
    id: "gaming",
    name: "Game Server",
    icon: "🎮",
    description: "Multiplayer game server backend",
    config: { vcpu: 8, ram: 16, gpu: 1, ssdStorage: 100, objectStorage: 10, bandwidth: 5000, dbStorage: 50, requests: 50000000, users: 10000, environments: 2, region: "us-east", reservedTier: "on-demand" }
  },
  {
    id: "cicd",
    name: "CI/CD Pipeline",
    icon: "🔄",
    description: "Build & deploy automation",
    config: { vcpu: 4, ram: 8, gpu: 0, ssdStorage: 200, objectStorage: 100, bandwidth: 500, dbStorage: 20, requests: 5000000, users: 50, environments: 3, region: "us-east", reservedTier: "on-demand" }
  },
  {
    id: "data-warehouse",
    name: "Data Warehouse",
    icon: "📊",
    description: "Analytics & big data processing",
    config: { vcpu: 32, ram: 128, gpu: 2, ssdStorage: 2000, objectStorage: 10000, bandwidth: 10000, dbStorage: 1000, requests: 5000000, users: 500, environments: 2, region: "us-east", reservedTier: "3yr" }
  },
  {
    id: "iot",
    name: "IoT Platform",
    icon: "📡",
    description: "Internet of Things data ingestion",
    config: { vcpu: 4, ram: 8, gpu: 0, ssdStorage: 100, objectStorage: 500, bandwidth: 3000, dbStorage: 200, requests: 200000000, users: 1000, environments: 3, region: "us-east", reservedTier: "1yr" }
  }
];

export const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar", rate: 1 },
  { code: "EUR", symbol: "€", name: "Euro", rate: 0.92 },
  { code: "GBP", symbol: "£", name: "British Pound", rate: 0.79 },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar", rate: 1.36 },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", rate: 1.53 },
  { code: "INR", symbol: "₹", name: "Indian Rupee", rate: 83.12 },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", rate: 149.50 },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan", rate: 7.24 },
  { code: "BRL", symbol: "R$", name: "Brazilian Real", rate: 5.05 },
  { code: "KRW", symbol: "₩", name: "South Korean Won", rate: 1330.0 },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar", rate: 1.35 }
];

export const regions = [
  { id: "us-east", name: "US East (Virginia)", multiplier: 1.0 },
  { id: "us-west", name: "US West (Oregon)", multiplier: 1.05 },
  { id: "eu-west", name: "EU West (Ireland)", multiplier: 1.10 },
  { id: "eu-central", name: "EU Central (Frankfurt)", multiplier: 1.12 },
  { id: "ap-southeast", name: "Asia Pacific (Singapore)", multiplier: 1.15 },
  { id: "ap-northeast", name: "Asia Pacific (Tokyo)", multiplier: 1.20 },
  { id: "sa-east", name: "South America (São Paulo)", multiplier: 1.25 },
  { id: "me-central", name: "Middle East (UAE)", multiplier: 1.22 }
];

export const reservedTiers = [
  { id: "on-demand", name: "On-Demand", description: "Pay as you go, no commitment" },
  { id: "1yr", name: "1-Year Reserved", description: "Commit for 1 year, save up to 35%" },
  { id: "3yr", name: "3-Year Reserved", description: "Commit for 3 years, save up to 55%" }
];

export const defaultConfig = {
  vcpu: 2,
  ram: 4,
  gpu: 0,
  ssdStorage: 50,
  objectStorage: 25,
  bandwidth: 500,
  dbStorage: 20,
  requests: 2000000,
  users: 5000,
  environments: 3,
  region: "us-east",
  reservedTier: "on-demand"
};