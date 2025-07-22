"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Notice {
  id: number;
  title: string;
  description: string;
  createAt: string;
}

export default function NoticeModifyPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [notice, setNotice] = useState<Notice | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [id, setId] = useState<string>("");

  // 포커스 상태 관리
  const [titleFocused, setTitleFocused] = useState(false);
  const [contentFocused, setContentFocused] = useState(false);

  // params를 비동기로 처리
  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    };
    getParams();
  }, [params]);

  useEffect(() => {
    if (!id) return; // id가 없으면 실행하지 않음

    // API에서 공지사항 불러오기
    const fetchNotice = async () => {
      const res = await fetch('/api/notice');
      const data: Notice[] = await res.json();
      const foundNotice = data.find(n => n.id === Number(id));
      if (foundNotice) {
        setNotice(foundNotice);
        setTitle(foundNotice.title);
        setContent(foundNotice.description);
      }
    };
    fetchNotice();
  }, [id]);

  if (!notice && id) return <div>공지사항을 찾을 수 없습니다.</div>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notice) return;

    await fetch('/api/notice', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: notice.id, title, description: content }),
    });
    router.push('/notice');
  };

  return (
    <div style={{ padding: 32 }}>
      <h1 style={{color: '#000', fontSize: '24px',fontWeight: 'bold'}}>수정하기</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 , color: '#000'}}>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            type="button"
            onClick={() => router.push('/notice')}
            style={{
              background: '#e9ecef',
              color: '#111',
              border: 'none',
              borderRadius: 8,
              padding: '8px 20px',
              fontSize: 15,
              fontWeight: 500,
              cursor: 'pointer',
              marginLeft: 'auto'
            }}
          >취소</button>
          <button
            type="submit"
            style={{
              background: '#4f46e5',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '8px 20px',
              fontSize: 15,
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >저장</button>
        </div>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          style={{
            padding: 8,
            fontSize: 16,
            border: `1.5px solid ${titleFocused ? '#111' : '#e9ecef'}`,
            borderRadius: 6,
            outline: 'none',
            transition: 'border-color 0.2s',
            background: '#fff',
            color: '#000',
          }}
          onFocus={() => setTitleFocused(true)}
          onBlur={() => setTitleFocused(false)}
          placeholder="제목을 입력하세요"
        />
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          required
          style={{
            padding: 8,
            fontSize: 16,
            border: `1.5px solid ${contentFocused ? '#111' : '#e9ecef'}`,
            borderRadius: 6,
            outline: 'none',
            transition: 'border-color 0.2s',
            background: '#fff',
            color: '#000',
            minHeight: 120,
          }}
          onFocus={() => setContentFocused(true)}
          onBlur={() => setContentFocused(false)}
          placeholder="내용을 입력하세요"
        />
      </form>
    </div>
  );
}