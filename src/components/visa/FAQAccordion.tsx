'use client';
import { useState } from 'react';
import type { FAQItem } from '@/types/visa-info';

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-2.5">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className={`bg-white rounded-xl border-[1.5px] overflow-hidden shadow-sm transition-shadow ${
              isOpen ? 'border-teal-200 shadow-md' : 'border-gray-100 hover:shadow-md'
            }`}
          >
            <button
              className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="text-sm font-bold text-gray-800">{item.question}</span>
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0 transition-all ${
                  isOpen
                    ? 'bg-teal-600 text-white rotate-45'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                +
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-4 border-t border-gray-100">
                <p className="text-sm text-gray-600 leading-relaxed pt-3">{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
