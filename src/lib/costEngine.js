export function calculateCost(provider, config) {
  const p = provider.pricing;
  const hours = 730; // avg hours per month

  const computeCost = Math.max(0,
    (p.compute.base * hours) +
    (config.vcpu * p.compute.perVCPU * hours) +
    (config.ram * p.compute.perGB_RAM * hours)
  );

  const storageCost = Math.max(0,
    (config.ssdStorage * p.storage.ssd) +
    (config.objectStorage * p.storage.object)
  );

  const bandwidthUsed = Math.max(0, config.bandwidth - p.bandwidth.free);
  const bandwidthCost = bandwidthUsed * p.bandwidth.perGB;

  const dbCost = config.dbStorage * p.database.perGB;

  const requestsUsed = Math.max(0, config.requests - p.requests.free);
  const requestsCost = (requestsUsed / 1000000) * p.requests.perMillion;

  const platformFee = p.platformFee || 0;

  const monthly = computeCost + storageCost + bandwidthCost + dbCost + requestsCost + platformFee;
  const yearly = monthly * 12;
  const costPerUser = config.users > 0 ? monthly / config.users : 0;
  const costPerRequest = config.requests > 0 ? monthly / config.requests : 0;

  return {
    compute: computeCost,
    storage: storageCost,
    bandwidth: bandwidthCost,
    database: dbCost,
    requests: requestsCost,
    platformFee,
    monthly,
    yearly,
    costPerUser,
    costPerRequest,
    breakdown: {
      compute: { value: computeCost, pct: monthly > 0 ? (computeCost / monthly) * 100 : 0 },
      storage: { value: storageCost, pct: monthly > 0 ? (storageCost / monthly) * 100 : 0 },
      bandwidth: { value: bandwidthCost, pct: monthly > 0 ? (bandwidthCost / monthly) * 100 : 0 },
      database: { value: dbCost, pct: monthly > 0 ? (dbCost / monthly) * 100 : 0 },
      requests: { value: requestsCost, pct: monthly > 0 ? (requestsCost / monthly) * 100 : 0 },
      platformFee: { value: platformFee, pct: monthly > 0 ? (platformFee / monthly) * 100 : 0 }
    }
  };
}

export function calculateAllProviders(providers, config) {
  return providers.map(provider => ({
    provider,
    costs: calculateCost(provider, config)
  })).sort((a, b) => a.costs.monthly - b.costs.monthly);
}

export function assignBadges(results) {
  if (results.length === 0) return results;

  const sorted = [...results].sort((a, b) => a.costs.monthly - b.costs.monthly);
  const badges = {};

  // Cheapest Overall
  if (sorted[0]) badges[sorted[0].provider.id] = [...(badges[sorted[0].provider.id] || []), { emoji: "🏆", label: "Cheapest Overall" }];

  // Best Startup Choice - good balance of cost and features
  const startupPicks = ["digitalocean", "render", "railway", "flyio"];
  const bestStartup = sorted.find(r => startupPicks.includes(r.provider.id));
  if (bestStartup) badges[bestStartup.provider.id] = [...(badges[bestStartup.provider.id] || []), { emoji: "🚀", label: "Best Startup Choice" }];

  // Best Value - 2nd or 3rd cheapest
  if (sorted[1]) badges[sorted[1].provider.id] = [...(badges[sorted[1].provider.id] || []), { emoji: "💰", label: "Best Value" }];

  // Fastest Growth Option
  const scalePicks = ["aws", "gcp", "azure"];
  const bestScale = sorted.find(r => scalePicks.includes(r.provider.id));
  if (bestScale) badges[bestScale.provider.id] = [...(badges[bestScale.provider.id] || []), { emoji: "⚡", label: "Fastest Growth Option" }];

  // Enterprise Ready
  const enterprisePicks = ["aws", "azure", "gcp", "oracle"];
  const bestEnterprise = sorted.find(r => enterprisePicks.includes(r.provider.id));
  if (bestEnterprise) badges[bestEnterprise.provider.id] = [...(badges[bestEnterprise.provider.id] || []), { emoji: "🛡️", label: "Enterprise Ready" }];

  // Best Managed Platform
  const managedPicks = ["heroku", "vercel", "render", "railway"];
  const bestManaged = sorted.find(r => managedPicks.includes(r.provider.id));
  if (bestManaged) badges[bestManaged.provider.id] = [...(badges[bestManaged.provider.id] || []), { emoji: "☁️", label: "Best Managed Platform" }];

  // Most Popular
  badges["aws"] = [...(badges["aws"] || []), { emoji: "🔥", label: "Most Popular" }];

  // Best Scaling
  const bestBandwidth = [...sorted].sort((a, b) => a.costs.bandwidth - b.costs.bandwidth)[0];
  if (bestBandwidth) badges[bestBandwidth.provider.id] = [...(badges[bestBandwidth.provider.id] || []), { emoji: "📈", label: "Best Scaling" }];

  return results.map(r => ({
    ...r,
    badges: badges[r.provider.id] || []
  }));
}

export function simulateTrafficMultiplier(config, multiplier) {
  return {
    ...config,
    bandwidth: config.bandwidth * multiplier,
    requests: config.requests * multiplier,
    users: Math.round(config.users * multiplier)
  };
}