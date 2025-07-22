"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Notice {
  id: number;
  title: string;
  content: string;
  date: string;
}

const initialNotices: Notice[] = [
  { id: 1, title: '[이벤트] <신규가입 이벤트> 당첨자 발표', content: `안녕하세요.\n어디 서비스 운영자입니다.\n\n2024년 신규가입 이벤트 당첨자를 발표합니다.\n\n<당첨자 발표>\n- 박불멍님\n- 이호창님\n- 김기범님\n\n축하드립니다!\n앱을 사용하시면서 불편하신 사항이 있으시다면 어디 앱 메뉴에서 [1:1문의]를 이용해주세요.\n감사합니다.`, date: '2025-06-01' },
];

export default function NoticeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [id, setId] = useState<string>("");
  const [notice, setNotice] = useState<Notice | null>(null);

  // params를 비동기로 처리
  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    };
    getParams();
  }, [params]);

  // id가 설정된 후 notice 찾기
  useEffect(() => {
    if (id) {
      const foundNotice = initialNotices.find(n => n.id === Number(id));
      setNotice(foundNotice || null);
    }
  }, [id]);

  if (!notice && id) return <div>공지사항을 찾을 수 없습니다.</div>;
  if (!notice) return <div>로딩중...</div>;

  const handleDelete = () => {
    alert('삭제 기능은 프론트에서만 구현되어 있습니다.');
    router.push('/notice');
  };

  return (
    <div style={{ padding: 32 }}>
      {/* 상단 테이블 스타일 */}
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#FAFBFC', borderRadius: 8, marginBottom: 0 }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', color: '#888', fontWeight: 400, fontSize: 14, padding: '12px 16px' }}>번호</th>
            <th style={{ textAlign: 'left', color: '#888', fontWeight: 400, fontSize: 14, padding: '12px 16px' }}>제목</th>
            <th style={{ textAlign: 'right', color: '#888', fontWeight: 400, fontSize: 14, padding: '12px 16px' }}>등록일</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ background: '#FAFBFC' }}>
            <td style={{ color: '#000', fontWeight: 500, padding: '12px 16px', width: 60 }}>{notice.id}</td>
            <td style={{ color: '#000', fontWeight: 500, padding: '12px 16px' }}>{notice.title}</td>
            <td style={{ color: '#000', textAlign: 'right', padding: '12px 16px', width: 120 }}>{notice.date}</td>
          </tr>
        </tbody>
      </table>
      {/* 본문 */}
      <div style={{ padding: '32px 16px 48px 16px', background: '#fff', minHeight: 200, borderBottom: '1px solid #eee', whiteSpace: 'pre-line', fontSize: 16, color: '#000' }}>
        {notice.content}
      </div>
      {/* 버튼 영역 */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, margin: '24px 0 32px 0' }}>
        <button
          onClick={() => router.push(`/notice/modify/${notice.id}`)}
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
          onClick={handleDelete}
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
  );
}