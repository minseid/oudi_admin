"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Notice {
  id: number;
  title: string;
  content: string;
  date: string;
}

export default function NoticeModifyPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [notice, setNotice] = useState<Notice | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // 포커스 상태 관리
  const [titleFocused, setTitleFocused] = useState(false);
  const [contentFocused, setContentFocused] = useState(false);

  useEffect(() => {
    // localStorage에서 공지사항 가져오기
    const storedNotices: Notice[] = JSON.parse(localStorage.getItem('notices') || '[]');
    const foundNotice = storedNotices.find(n => n.id === Number(params.id));
    
    if (foundNotice) {
      setNotice(foundNotice);
      setTitle(foundNotice.title);
      setContent(foundNotice.content);
    }
  }, [params.id]);

  if (!notice) return <div>공지사항을 찾을 수 없습니다.</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // localStorage에서 기존 공지사항 가져오기
    const storedNotices: Notice[] = JSON.parse(localStorage.getItem('notices') || '[]');
    
    // 해당 공지사항 업데이트
    const updatedNotices = storedNotices.map(n => 
      n.id === Number(params.id) 
        ? { ...n, title, content }
        : n
    );
    
    // localStorage에 저장
    localStorage.setItem('notices', JSON.stringify(updatedNotices));
    
    alert('공지사항이 수정되었습니다.');
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
          rows={8}
          style={{
            padding: 8,
            fontSize: 16,
            border: `1.5px solid ${contentFocused ? '#111' : '#e9ecef'}`,
            borderRadius: 6,
            outline: 'none',
            transition: 'border-color 0.2s',
            background: '#fff',
            color: '#000',
          }}
          onFocus={() => setContentFocused(true)}
          onBlur={() => setContentFocused(false)}
          placeholder="내용을 입력하세요"
        />
      </form>
    </div>
  );
}
