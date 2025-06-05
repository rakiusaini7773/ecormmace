import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqData = [
  {
    question: "Why is moisturizer important for skin?",
    answer:
      "A good moisturizer puts a sturdy lock on your skin’s hydration. It elevates barrier health to prevent inflammation, redness, dryness, and acne on the skin.",
  },
  {
    question: "What is the best moisturizer for dry skin?",
    answer: "Choose a moisturizer rich in hyaluronic acid and ceramides for dry skin.",
  },
  {
    question: "Which moisturizer is best for acne-prone skin?",
    answer: "Look for non-comedogenic, oil-free moisturizers with ingredients like salicylic acid.",
  },
  {
    question: "How to apply moisturizer on face?",
    answer: "Gently apply moisturizer to clean, slightly damp skin using upward strokes.",
  },
  {
    question: "Can I use moisturizer to remove dark spots?",
    answer: "Some moisturizers with ingredients like niacinamide can help reduce dark spots.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">FAQs</h2>
      <div className="space-y-2">
        {faqData.map((faq, index) => (
          <div key={index} className="bg-gray-50 rounded">
            <div
              className="flex justify-between items-center p-4 cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <p className="font-medium text-sm sm:text-base">
                {index + 1}. {faq.question}
              </p>
              <button
                className="bg-black text-white p-2 text-xs  w-9 h-8 flex items-center justify-center
                transition-transform duration-300 ease-in-out"
                aria-expanded={activeIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span
                  className={`transform transition-transform duration-300 ease-in-out ${
                    activeIndex === index ? "rotate-180 scale-110" : "rotate-0 scale-100"
                  }`}
                >
                  {activeIndex === index ? <FaMinus /> : <FaPlus />}
                </span>
              </button>
            </div>
            {activeIndex === index && (
              <div
                id={`faq-answer-${index}`}
                className="px-4 pb-4 text-sm text-gray-700"
              >
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
