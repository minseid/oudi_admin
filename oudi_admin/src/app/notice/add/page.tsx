"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Notice {
  id: number;
  title: string;
  content: string;
  date: string;
}

export default function NoticeAddPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 기존 공지사항 가져오기
    const existingNotices: Notice[] = JSON.parse(localStorage.getItem('notices') || '[]');
    
    // 새 공지사항 생성
    const newNotice: Notice = {
      id: existingNotices.length > 0 ? Math.max(...existingNotices.map(n => n.id)) + 1 : 1,
      title: title,
      content: content,
      date: new Date().toISOString().split('T')[0] // YYYY-MM-DD 형식
    };
    
    // localStorage에 저장
    const updatedNotices = [...existingNotices, newNotice];
    localStorage.setItem('notices', JSON.stringify(updatedNotices));
    
    alert('공지사항이 저장되었습니다.');
    router.push('/notice');
  };

  return (
    <div style={{ padding: 32 }}>
      <h1 style={{color: '#000', fontSize: '24px', marginBottom: '10px' ,fontWeight: 'bold'}}>작성하기</h1>
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
          placeholder="제목을 입력하세요"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          style={{
            padding: 8,
            fontSize: 16,
            border: '1.5px solid #e9ecef',
            borderRadius: 6,
            outline: 'none',
            transition: 'border-color 0.2s',
            background: '#fff',
            color: '#000',
          }}
          onFocus={e => (e.currentTarget.style.borderColor = '#111')}
          onBlur={e => (e.currentTarget.style.borderColor = '#e9ecef')}
        />
        <textarea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
          rows={8}
          style={{
            padding: 8,
            fontSize: 16,
            border: '1.5px solid #e9ecef',
            borderRadius: 6,
            outline: 'none',
            transition: 'border-color 0.2s',
            background: '#fff',
            color: '#000',
          }}
          onFocus={e => (e.currentTarget.style.borderColor = '#111')}
          onBlur={e => (e.currentTarget.style.borderColor = '#e9ecef')}
        />
      </form>
    </div>
  );
}
