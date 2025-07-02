"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Notice {
  id: number;
  title: string;
  content: string;
  date: string;
  answer: boolean;
  answerContent?: string;
}

const initialNotices: Notice[] = [
  { id: 1, title: '[이벤트] <신규가입 이벤트> 당첨자 발표', content: `안녕하세요.\n어디 서비스 운영자입니다.\n\n2024년 신규가입 이벤트 당첨자를 발표합니다.\n\n<당첨자 발표>\n- 박불멍님\n- 이호창님\n- 김기범님\n\n축하드립니다!\n앱을 사용하시면서 불편하신 사항이 있으시다면 어디 앱 메뉴에서 [1:1문의]를 이용해주세요.\n감사합니다.`, date: '2025-06-01', answer: true, answerContent: '축하드립니다! 문의사항은 언제든 남겨주세요.' },
  { id: 2, title: '두 번째 공지', content: '두 번째 공지 내용입니다.', date: '2024-06-02', answer: false },
];

export default function NoticeListPage() {
  const [openId, setOpenId] = useState<number | null>(null);
  const [notices, setNotices] = useState<Notice[]>(initialNotices);
  const [answerInput, setAnswerInput] = useState<string>('');
  const [editModeId, setEditModeId] = useState<number | null>(null);
  const router = useRouter();

  const handleToggle = (id: number) => {
    setOpenId(openId === id ? null : id);
    setAnswerInput('');
    setEditModeId(null);
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswerInput(e.target.value);
  };

  const handleAnswerSave = (id: number) => {
    setNotices((prev) => prev.map((notice) =>
      notice.id === id
        ? { ...notice, answer: true, answerContent: answerInput }
        : notice
    ));
    setAnswerInput('');
    setEditModeId(null);
  };

  const handleEditClick = (notice: Notice) => {
    setEditModeId(notice.id);
    setAnswerInput(notice.answerContent || '');
  };

  return (
    <div style={{ padding: 32 }}>
      <h1 style={{color: '#000', fontSize: '24px', marginBottom: '93px' ,fontWeight: 'bold'}}>1대1문의</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '1px solid #000', textAlign: 'left', marginLeft: '10px' ,color: '#000' }}>번호</th>
            <th style={{ borderBottom: '1px solid #000', textAlign: 'left', color: '#000' }}>제목</th>
            <th style={{ borderBottom: '1px solid #000' ,color: '#000' }}>작성일</th>
            <th style={{ borderBottom: '1px solid #000' ,color: '#000' }}>답변여부</th>
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
                <td style={{ textAlign: 'center', color: notice.answer ? '#4F46E5' : '#A0A0A0', fontWeight: 500 }}>
                  {notice.answer ? '답변완료' : '미답변'}
                </td>
              </tr>
              <tr>
                <td colSpan={4} style={{ padding: 0, background: '#FAFBFC', borderBottom: openId === notice.id ? '1px solid #eee' : 'none' }}>
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
                      <div style={{ marginTop: 24 }}>
                        {notice.answer && notice.answerContent && editModeId !== notice.id ? (
                          <div style={{
                            background: '#F5F6FA',
                            borderRadius: 8,
                            padding: '16px',
                            marginBottom: 16,
                            color: '#222',
                          }}>
                            <b>답변</b><br />
                            {notice.answerContent}
                            <button
                              onClick={() => handleEditClick(notice)}
                              style={{ marginLeft: 16, background: '#fff', color: '#4F46E5', border: '1px solid #4F46E5', borderRadius: 6, padding: '4px 14px', fontWeight: 500, fontSize: 14, cursor: 'pointer' }}
                            >수정</button>
                          </div>
                        ) : (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <input
                              type="text"
                              value={answerInput}
                              onChange={handleAnswerChange}
                              placeholder="답변을 입력해주세요."
                              style={{ flex: 1, padding: '10px', borderRadius: 6, border: '1px solid #ddd', fontSize: 15 }}
                            />
                            <button
                              onClick={() => handleAnswerSave(notice.id)}
                              style={{ background: '#4F46E5', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 20px', fontWeight: 500, fontSize: 15, cursor: 'pointer' }}
                            >저장</button>
                          </div>
                        )}
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