"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Notice {
  id: number;
  title: string;
  description: string;
  createAt: string;
}

export default function NoticeListPage() {
  const [openId, setOpenId] = useState<number | null>(null);
  const [notices, setNotices] = useState<Notice[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/notice')
      .then(res => res.json())
      .then(data => setNotices(data));
  }, []);

  const handleToggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const handleDelete = async (id: number) => {
    if (confirm('정말로 이 공지사항을 삭제하시겠습니까?')) {
      await fetch('/api/notice', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      setNotices(notices.filter(notice => notice.id !== id));
      setOpenId(null);
    }
  };

  return (
    <div style={{ padding: 32 }}>
      <h1 style={{color: '#000', fontSize: '24px', marginBottom: '10px' ,fontWeight: 'bold'}}>공지사항</h1>
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
        onClick={() => router.push('/notice/add')}
      >
        <Image src="/pencil.svg" alt="작성" width={24} height={24} style={{marginRight: 8}} />
        작성하기
      </button>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '1px solid #000', textAlign: 'left', marginLeft: '10px' ,color: '#000' }}>번호</th>
            <th style={{ borderBottom: '1px solid #000', textAlign: 'left', color: '#000' }}>제목</th>
            <th style={{ borderBottom: '1px solid #000' ,color: '#000' }}>작성일</th>
          </tr>
        </thead>
        <tbody>
          {notices.map((notice) => (
            <React.Fragment key={notice.id}>
              <tr
                style={{ cursor: 'pointer', background: openId === notice.id ? '#FAFBFC' : '#fff' }}
                onClick={() => handleToggle(notice.id)}
              >
                <td style={{ padding: '8px 0' ,color: '#000' }}>{notice.id}</td>
                <td style={{ padding: '8px 0' ,color: '#000' }}>{notice.title}</td>
                <td style={{ textAlign: 'center' ,color: '#000' }}>{notice.createAt?.slice(0,10)}</td>
              </tr>
              <tr>
                <td colSpan={3} style={{ padding: 0, background: '#FAFBFC', borderBottom: openId === notice.id ? '1px solid #eee' : 'none' }}>
                  <div
                    style={{
                      maxHeight: openId === notice.id ? 500 : 0,
                      overflow: 'hidden',
                      transition: 'max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                      background: '#fff',
                      padding: openId === notice.id ? '32px 16px 24px 16px' : '0 16px',
                      fontSize: 16,
                      color: '#000',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {openId === notice.id && notice.description}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, margin: '16px 0 0 0' }}>
                      <button
                        onClick={(e) => { e.stopPropagation(); router.push(`/notice/modify/${notice.id}`); }}
                        style={{
                          border: '1.5px solid #4F46E5',
                          color: '#4F46E5',
                          background: '#fff',
                          borderRadius: 20,
                          padding: '6px 20px',
                          fontSize: 15,
                          fontWeight: 500,
                          cursor: 'pointer',
                          outline: 'none',
                          transition: 'background 0.2s',
                        }}
                      >수정</button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(notice.id); }}
                        style={{
                          border: '1.5px solid #4F46E5',
                          color: '#4F46E5',
                          background: '#fff',
                          borderRadius: 20,
                          padding: '6px 20px',
                          fontSize: 15,
                          fontWeight: 500,
                          cursor: 'pointer',
                          outline: 'none',
                          transition: 'background 0.2s',
                        }}
                      >삭제</button>
                    </div>
                  </div>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}