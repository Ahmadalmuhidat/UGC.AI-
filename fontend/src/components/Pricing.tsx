import Title from './Title';
import { PricingTable } from '@clerk/clerk-react';

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-zinc-50/50 border-y border-zinc-100">
      <div className="max-w-6xl mx-auto px-4">

        <Title
          title="Pricing"
          heading="Simple, transparent pricing"
          description="Choose a plan that fits your production needs. From solo creators to high-volume ad agencies."
        />

        <div className="flex flex-wrap items-center justify-center max-w-5xl mx-auto">
          <PricingTable
            appearance={{
              variables: {
                colorPrimary: '#4f46e5',
                colorText: '#09090b',
                colorBackground: '#ffffff',
                borderRadius: '1.5rem',
              },
              elements: {
                pricingTableCard: 'border border-zinc-200 shadow-sm transition-shadow hover:shadow-md',
                pricingTableCardHeader: 'bg-zinc-50 border-b border-zinc-100 p-8',
                pricingTableButton: 'bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all',
                pricingTableCardBody: 'p-8',
              }
            }}
          />
        </div>
      </div>
    </section>
  );
};