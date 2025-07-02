"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<Array<{question: string, answer: string}>>([]);
  const router = useRouter();


  useEffect(() => {
    const storedFaqs = JSON.parse(localStorage.getItem('faqs') || '[]');
    setFaqs(storedFaqs);
  }, []);

  const handleDelete = (index: number) => {
    const updatedFaqs = faqs.filter((_, idx) => idx !== index);
    localStorage.setItem('faqs', JSON.stringify(updatedFaqs));
    setFaqs(updatedFaqs);
    setOpenIndex(null);
  };

  return (
    <div className="flex flex-col max-w-6xl mx-auto py-10 px-4" style={{padding: 32}}>
        <h1 style={{color: '#000', fontSize: '24px', marginBottom: '10px' ,fontWeight: 'bold'}}>FAQ</h1>
        <button
        style={{
          display: 'flex',
          alignItems: 'center',
          background: '#4F46E5',
          color: '#fff',
          border: 'none',
          borderRadius: 12,
          padding: '15px 32px',
          fontSize: 14,
          fontWeight: 500,
          cursor: 'pointer',
          gap: 8,
          marginLeft: 'auto',
          marginBottom: '30px'
        }}
        onClick={() => router.push('/FAQ/add')}
      >
        <Image src="/pencil.svg" alt="작성" width={24} height={24} style={{marginRight: 8}} />
        작성하기
      </button>
      <div>
        {faqs.map((faq, idx) => (
          <div key={idx} className={idx < faqs.length - 1 ? "border-b" : ""}>
            <button
              className="w-full flex items-center justify-between text-left px-10 py-7 focus:outline-none hover:bg-gray-50 transition"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              <span className="font-medium text-indigo-700">Q. {faq.question}</span>
              <svg
                className={`w-5 h-5 text-gray-400 transform transition-transform ${openIndex === idx ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === idx && (
              <div className="px-10 pb-7 text-gray-700 whitespace-pre-line">
                {faq.answer}
                <div className="flex gap-4 mt-4 justify-end">
                  <Link
                    href={`/FAQ/modify/${idx}`}
                    className="text-sm font-semibold px-5 py-1.5 border-2 border-indigo-500 text-indigo-600 rounded-full hover:bg-indigo-50 transition"
                  >
                    수정
                  </Link>
                  <button 
                    onClick={() => handleDelete(idx)}
                    className="text-sm font-semibold px-5 py-1.5 border-2 border-indigo-500 text-indigo-600 rounded-full hover:bg-indigo-50 transition"
                  >
                    삭제
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
