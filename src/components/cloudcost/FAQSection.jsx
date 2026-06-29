import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    q: "How accurate are the pricing estimates?",
    a: "Our estimates are based on publicly available pricing from each cloud provider. Actual costs may vary based on region, reserved instances, volume discounts, and specific service configurations. Always verify with the provider's official pricing page."
  },
  {
    q: "Which cloud provider is best for startups?",
    a: "For startups, we typically recommend DigitalOcean, Render, or Railway for their simple pricing and developer-friendly platforms. As you scale, AWS, GCP, or Azure offer more comprehensive services."
  },
  {
    q: "Do the estimates include free tier savings?",
    a: "Yes, providers with free tiers (like free bandwidth or request quotas) have those factored into the calculations. The free tier column in the comparison table shows which providers offer free resources."
  },
  {
    q: "How does the What-If analysis work?",
    a: "The What-If analysis multiplies your bandwidth, requests, and user counts by the selected factor. This simulates traffic growth while keeping compute and storage constant, showing how costs scale with usage."
  },
  {
    q: "What is the TCO (Total Cost of Ownership) chart?",
    a: "The TCO chart projects your cumulative costs over 1–5 years for the top 5 cheapest providers, assuming a 5% annual price increase. It helps you evaluate long-term commitments and compare lifetime costs, not just monthly rates."
  },
  {
    q: "How do reserved instance discounts work?",
    a: "Major cloud providers (AWS, GCP, Azure, Oracle, IBM) offer discounts for committing to 1-year or 3-year terms. Toggle between On-Demand, 1-Year Reserved, and 3-Year Reserved in the Pricing Model section to see how your costs change. Savings can reach up to 55% for 3-year commitments."
  },
  {
    q: "Do prices change by region?",
    a: "Yes! Cloud providers charge different rates depending on the data center region. Selecting a region like Asia Pacific (Tokyo) or South America (São Paulo) will typically cost more than US East. The region selector shows the percentage difference, and all costs (storage, bandwidth, databases, requests) are adjusted accordingly."
  },
  {
    q: "Can I compare GPU pricing?",
    a: "Yes! Set the GPU count in the workload configurator. Providers that offer GPU instances (AWS, GCP, Azure, Fly.io, Vultr, Hetzner, Scaleway, IBM, Oracle, DigitalOcean, Linode) will include GPU costs in their estimates. GPU costs are also eligible for reserved instance discounts where supported."
  },
  {
    q: "Can I save and share my configuration?",
    a: "Yes! Use the Share Link button to generate a URL that encodes all your configuration parameters. Anyone with the link will see the same workload setup and comparison results."
  },
  {
    q: "Why do some providers show $0 for certain categories?",
    a: "Some providers include resources in their base pricing (like free bandwidth) or don't charge separately for certain categories. A $0 means that category is either included or not applicable for that provider."
  },
  {
    q: "How do I use the Side-by-Side Comparison?",
    a: "Scroll to the Side-by-Side Comparison section and select up to 4 providers from the dropdowns. You'll see a detailed table comparing costs, metadata (SLA, data centers, founding year), free tier availability, and direct website links — all in one view."
  },
  {
    q: "What are the Cost Insights recommendations?",
    a: "The Cost Insights panel analyzes your workload and automatically generates personalized savings tips — including potential savings from switching providers, bandwidth optimization opportunities, reserved instance discounts, free tier utilization, and best GPU value."
  },
  {
    q: "How do provider categories work?",
    a: "Providers are grouped into: Hyperscalers (AWS, GCP, Azure, Oracle, IBM), Managed PaaS (Heroku, Vercel, Render, Railway), Budget/Value (Hetzner, DigitalOcean, Linode, Vultr, etc.), and Edge Computing (Cloudflare, Fly.io). Use the category filter bar above the comparison table to focus on a specific type."
  },
  {
    q: "Can I favorite or bookmark providers?",
    a: "Yes! Click the star icon next to any provider in the comparison table to pin it to the top. Your favorites stay pinned even when sorting or filtering changes."
  },
  {
    q: "What export formats are available?",
    a: "You can export your comparison in three formats: a formatted text report (Export Report), a CSV spreadsheet (Export CSV), and a JSON file for developers and API integration (Export JSON). You can also share a URL that encodes your entire configuration."
  },
  {
    q: "How often is the pricing data updated?",
    a: "We strive to keep pricing data current. Cloud providers update their pricing periodically, and our data reflects the most recent publicly available rates as of 2025–2026."
  }
];

export default function FAQSection() {
  return (
    <section className="mt-16 mb-20" id="faq">
      <h2 className="text-2xl md:text-3xl font-bold font-heading mb-2">Frequently Asked Questions</h2>
      <p className="text-muted-foreground mb-6">Common questions about cloud cost comparison</p>
      
      <Accordion type="single" collapsible className="w-full max-w-3xl">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger className="text-left font-medium text-sm md:text-base">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}