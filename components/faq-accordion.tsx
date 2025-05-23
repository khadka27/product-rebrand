"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface FAQAccordionProps {
  darkMode?: boolean
}

const faqs = [
  {
    question: "How Does BurnJaro Work?",
    answer:
      "BurnJaro works through a unique triple-action formula that boosts metabolism, reduces appetite, and increases fat burning. Our proprietary blend of natural ingredients targets stubborn fat while providing energy and supporting overall wellness.",
  },
  {
    question: "How Long Does It Take to See Results?",
    answer:
      "Many customers report feeling increased energy and reduced appetite within the first week. For weight loss results, most users begin to see noticeable changes within 2-4 weeks of consistent use, with optimal results typically seen after 2-3 months.",
  },
  {
    question: "Is BurnJaro Safe to Use?",
    answer:
      "BurnJaro is made with 100% natural ingredients in an FDA-approved, GMP-certified facility. It contains no artificial additives, stimulants, or harmful chemicals. However, as with any supplement, we recommend consulting with your healthcare provider before starting, especially if you have any medical conditions or are taking medications.",
  },
  {
    question: "How Do I Take BurnJaro?",
    answer:
      "For optimal results, take two capsules daily with a glass of water, preferably 20-30 minutes before a meal. Consistency is key for best results.",
  },
  {
    question: "What If BurnJaro Doesn't Work for Me?",
    answer:
      "We stand behind our product with a 60-day, 100% money-back guarantee. If you're not completely satisfied with your results, simply contact our customer service team within 60 days of purchase for a full refund, no questions asked.",
  },
  {
    question: "Is There a Subscription or Recurring Charges?",
    answer:
      "No. BurnJaro is available as a one-time purchase only. There are no hidden fees, subscriptions, or recurring charges.",
  },
  {
    question: "How Long Will Shipping Take?",
    answer:
      "Orders are typically processed within 24-48 hours. Domestic (US) shipping takes 3-5 business days, while international shipping may take 7-14 business days depending on the destination.",
  },
  {
    question: "Can I Take BurnJaro With Other Medications?",
    answer:
      "While BurnJaro is made with natural ingredients, we always recommend consulting with your healthcare provider before combining it with medications, especially if you have existing health conditions or are taking prescription drugs.",
  },
  {
    question: "Is BurnJaro Suitable for Vegetarians or Vegans?",
    answer:
      "Yes, BurnJaro is formulated to be vegetarian-friendly. All our capsules are made with plant-based ingredients and do not contain any animal products or by-products.",
  },
  {
    question: "Will BurnJaro Interfere With My Sleep or Cause Jitters?",
    answer:
      "No, BurnJaro is formulated to provide clean energy without the jitters or crashes associated with high-stimulant weight loss products. Most users report improved sleep quality as their overall health improves.",
  },
  {
    question: "Can I Take BurnJaro While Pregnant or Breastfeeding?",
    answer:
      "We do not recommend taking BurnJaro during pregnancy or while breastfeeding. Always consult with your healthcare provider regarding any supplements during these important times.",
  },
  {
    question: "Are There Any Age Restrictions for Taking BurnJaro?",
    answer:
      "BurnJaro is formulated for adults 18 years and older. It is not recommended for children or adolescents under 18 years of age.",
  },
  {
    question: "How Is BurnJaro Different From Other Weight Loss Supplements?",
    answer:
      "BurnJaro stands out with its triple-action formula that not only helps burn fat but also suppresses appetite and boosts metabolism naturally. Unlike many supplements that rely on excessive stimulants, BurnJaro works by optimizing your body's natural fat-burning systems while providing sustainable energy and supporting overall wellness.",
  },
]

export default function FAQAccordion({ darkMode = false }: FAQAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`} className="border-b border-green-700/20">
          <AccordionTrigger className="text-left font-semibold text-green-700 hover:text-green-700/80 font-heading text-xl py-4 normal-case">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 font-body text-lg md:text-xl py-4">{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
