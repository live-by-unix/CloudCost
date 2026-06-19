import React from 'react';

const FALLBACK_LOGOS = {
  aws: "AWS",
  gcp: "GCP",
  azure: "Azure",
  digitalocean: "DO",
  heroku: "H",
  cloudflare: "CF",
  vercel: "▲",
  render: "R",
  flyio: "Fly",
  linode: "LN",
  vultr: "VT",
  oracle: "OC",
  railway: "RW"
};

export default function ProviderLogo({ provider, size = "md" }) {
  const sizes = {
    sm: "w-6 h-6 text-xs",
    md: "w-8 h-8 text-sm",
    lg: "w-12 h-12 text-lg"
  };

  return (
    <div
      className={`${sizes[size]} rounded-lg flex items-center justify-center font-bold text-white shrink-0`}
      style={{ backgroundColor: provider.color }}
      title={provider.name}
    >
      {FALLBACK_LOGOS[provider.id] || provider.name[0]}
    </div>
  );
}