import { ArrowRightIcon } from 'lucide-react';
import { PrimaryButton } from './Buttons';
import { Link } from 'react-router-dom';

export default function CTA() {
  return (
    <section className="py-20 2xl:pb-40 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="premium-card !rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-zinc-50 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-6xl font-bold mb-8 tracking-tight text-zinc-900">
              Ready to go viral?
            </h2>
            <p className="text-xl text-zinc-600 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              Join thousands of brands using our AI to generate high-converting ads in minutes. Start creating your first ad studio session today.
            </p>
            <div className="flex justify-center">
              <Link to="/generate">
                <PrimaryButton className="px-12 py-5 text-lg shadow-xl shadow-indigo-100">
                  Start Creating Now
                  <ArrowRightIcon className="size-6 group-hover:translate-x-1 transition-transform" />
                </PrimaryButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};