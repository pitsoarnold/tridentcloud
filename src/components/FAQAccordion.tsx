import { useState } from "react";
import { Plus } from "lucide-react";

export type FAQItem = {
  q: string;
  a: string;
};

type Props = {
  faqs: FAQItem[];
  allowMultiple?: boolean;
};

export function FAQAccordion({ faqs, allowMultiple = false }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [openSet, setOpenSet] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    if (allowMultiple) {
      const next = new Set(openSet);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      setOpenSet(next);
    } else {
      setOpenIndex(openIndex === i ? null : i);
    }
  };

  const isOpen = (i: number) =>
    allowMultiple ? openSet.has(i) : openIndex === i;

  return (
    <div className="faq-list">
      {faqs.map((faq, i) => (
        <div key={faq.q} className={`faq-item ${isOpen(i) ? "open" : ""}`}>
          <button
            type="button"
            className="faq-summary"
            onClick={() => toggle(i)}
            aria-expanded={isOpen(i)}
          >
            <span className="faq-question">{faq.q}</span>
            <span className="faq-icon" aria-hidden="true">
              <Plus />
            </span>
          </button>
          <div className="faq-body">
            <p>{faq.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}