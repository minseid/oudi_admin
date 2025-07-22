"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ModifyFAQPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [id, setId] = useState<string>("");

  // params를 비동기로 처리
  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    };
    getParams();
  }, [params]);

  // FAQ 데이터 불러오기 (API)
  useEffect(() => {
    if (!id) return; // id가 없으면 실행하지 않음

    type FAQ = { id: number; question: string; answer: string };
    const fetchFAQ = async () => {
      const res = await fetch('/api/FAQ');
      const data: FAQ[] = await res.json();
      const faq = data.find((item) => String(item.id) === id);
      if (faq) {
        setTitle(faq.question);
        setContent(faq.answer);
      }
    };
    fetchFAQ();
  }, [id]);

  const handleCancel = () => {
    router.back();
  };

  // FAQ 수정 (API)
  const handleSubmit = async () => {
    if (!id) return;
    
    await fetch('/api/FAQ', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: Number(id), question: title, answer: content }),
    });
    router.push('/FAQ');
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