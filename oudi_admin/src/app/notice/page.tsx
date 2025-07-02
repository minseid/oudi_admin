"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Notice {
  id: number;
  title: string;
  content: string;
  date: string;
}

export default function NoticeListPage() {
  const [openId, setOpenId] = useState<number | null>(null);
  const [notices, setNotices] = useState<Notice[]>([]);
  const router = useRouter();

  useEffect(() => {
    // localStorage에서 공지사항 가져오기
    const storedNotices = JSON.parse(localStorage.getItem('notices') || '[]');
    if (storedNotices.length === 0) {
      // 초기 데이터가 없으면 기본 데이터 설정
      const initialNotices: Notice[] = [
        { id: 1, title: '[이벤트] <신규가입 이벤트> 당첨자 발표', content: `안녕하세요.\n어디 서비스 운영자입니다.\n\n2024년 신규가입 이벤트 당첨자를 발표합니다.\n\n<당첨자 발표>\n- 박불멍님\n- 이호창님\n- 김기범님\n\n축하드립니다!\n앱을 사용하시면서 불편하신 사항이 있으시다면 어디 앱 메뉴에서 [1:1문의]를 이용해주세요.\n감사합니다.`, date: '2025-06-01' },
        { id: 2, title: '두 번째 공지', content: '두 번째 공지 내용입니다.', date: '2024-06-02' },
      ];
      localStorage.setItem('notices', JSON.stringify(initialNotices));
      setNotices(initialNotices);
    } else {
      setNotices(storedNotices);
    }
  }, []);

  const handleToggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const handleDelete = (id: number) => {
    if (confirm('정말로 이 공지사항을 삭제하시겠습니까?')) {
      const updatedNotices = notices.filter(notice => notice.id !== id);
      localStorage.setItem('notices', JSON.stringify(updatedNotices));
      setNotices(updatedNotices);
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
                <td style={{ textAlign: 'center' ,color: '#000' }}>{notice.date}</td>
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
                    {openId === notice.id && notice.content}
                    {openId === notice.id && (
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
                    )}
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