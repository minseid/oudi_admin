"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ModifyFAQPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    // localStorage에서 FAQ 목록 가져오기
    const faqs = JSON.parse(localStorage.getItem('faqs') || '[]');
    const faqIndex = parseInt(params.id);
    
    if (faqs[faqIndex]) {
      setTitle(faqs[faqIndex].question);
      setContent(faqs[faqIndex].answer);
    }
  }, [params.id]);

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = () => {
    const faqs = JSON.parse(localStorage.getItem('faqs') || '[]');
    const faqIndex = parseInt(params.id);

    // FAQ 수정
    faqs[faqIndex] = {
      question: title,
      answer: content
    };
    
    // localStorage에 저장
    localStorage.setItem('faqs', JSON.stringify(faqs));

    router.back();
    router.refresh();
  };

  return (
    <div className="flex flex-col max-w-6xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-black">FAQ 수정</h1>
        <div className="flex gap-2">
          <button 
            onClick={handleCancel}
            className="px-5 py-2 rounded-lg font-medium border-2 border-gray-200 hover:bg-gray-50 transition"
          >
            취소
          </button>
          <button 
            onClick={handleSubmit}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
            disabled={!title || !content ? true : undefined}
          >
            저장
          </button>
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            제목을 입력해주세요.
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black"
            placeholder="제목을 입력해주세요."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            내용을 입력해주세요.
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-black"
            placeholder="내용을 입력해주세요."
          />
        </div>
      </div>
    </div>
  );
}
