import { ChevronDownIcon } from 'lucide-react';
import Title from './Title';
import { faqData } from '../assets/dummy-data';
export default function Faq() {
  return (
    <section id="faq" className="py-20 2xl:py-32">
      <div className="max-w-3xl mx-auto px-4">

        <Title
          title="FAQ"
          heading="Frequently asked questions"
          description="Find answers to common questions about our AI generation technology and commercial usage."
        />

        <div className="space-y-4">
          {faqData.map((faq, i) => (
            <details
              key={i}
              className="group premium-card rounded-3xl select-none overflow-hidden border-zinc-100 shadow-sm"
            >
              <summary className="flex items-center justify-between p-8 cursor-pointer hover:bg-zinc-50 transition-colors">
                <h4 className="font-bold text-xl text-zinc-900">{faq.question}</h4>
                <div className="size-10 rounded-full bg-zinc-100 flex items-center justify-center group-open:bg-indigo-50 transition-colors">
                  <ChevronDownIcon className="size-6 text-zinc-500 group-open:text-indigo-600 group-open:rotate-180 transition-transform" />
                </div>
              </summary>
              <div className="px-8 pb-8 text-lg text-zinc-600 leading-relaxed font-medium">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};