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
    q: "Can I save and share my configuration?",
    a: "Yes! Use the Share Link button to generate a URL that encodes all your configuration parameters. Anyone with the link will see the same workload setup and comparison results."
  },
  {
    q: "Why do some providers show $0 for certain categories?",
    a: "Some providers include resources in their base pricing (like free bandwidth) or don't charge separately for certain categories. A $0 means that category is either included or not applicable for that provider."
  },
  {
    q: "Are reserved instance discounts included?",
    a: "Currently, the calculator uses on-demand pricing. Reserved instances (1-3 year commitments) can reduce costs by 30-70% with major cloud providers. Contact each provider for specific reserved pricing."
  },
  {
    q: "How often is the pricing data updated?",
    a: "We strive to keep pricing data current. Cloud providers update their pricing periodically, and our data reflects the most recent publicly available rates at the time of the last update."
  }
];

export default function FAQSection() {
  return (
    <section className="mt-16 mb-20">
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