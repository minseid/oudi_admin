"use client";
import React, { useState, useEffect } from 'react';

interface Question {
  id: number;
  question: string;
  answer?: string;
  createAt: string;
}

export default function QuestionListPage() {
  const [openId, setOpenId] = useState<number | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answerInput, setAnswerInput] = useState<string>('');
  const [editModeId, setEditModeId] = useState<number | null>(null);

  // 목록 불러오기
  useEffect(() => {
    fetch('/api/question')
      .then(res => res.json())
      .then(data => setQuestions(data));
  }, []);

  const handleToggle = (id: number) => {
    setOpenId(openId === id ? null : id);
    setAnswerInput('');
    setEditModeId(null);
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswerInput(e.target.value);
  };

  // 답변 저장
  const handleAnswerSave = async (id: number) => {
    await fetch('/api/inquiry', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, answer: answerInput }),
    });
    setQuestions(questions.map(q =>
      q.id === id ? { ...q, answer: answerInput } : q
    ));
    setAnswerInput('');
    setEditModeId(null);
  };

  const handleEditClick = (question: Question) => {
    setEditModeId(question.id);
    setAnswerInput(question.answer || '');
  };

  return (
    <div style={{ padding: 32 }}>
      <h1 style={{color: '#000', fontSize: '24px', marginBottom: '32px' ,fontWeight: 'bold'}}>1대1문의</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '1px solid #000', textAlign: 'left', color: '#000' }}>번호</th>
            <th style={{ borderBottom: '1px solid #000', textAlign: 'left', color: '#000' }}>질문</th>
            <th style={{ borderBottom: '1px solid #000', color: '#000' }}>작성일</th>
            <th style={{ borderBottom: '1px solid #000', color: '#000' }}>답변</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <React.Fragment key={question.id}>
              <tr
                style={{ cursor: 'pointer', background: openId === question.id ? '#FAFBFC' : '#fff' }}
                onClick={() => handleToggle(question.id)}
              >
                <td style={{ padding: '8px 0' ,color: '#000' }}>{question.id}</td>
                <td style={{ padding: '8px 0' ,color: '#000' }}>{question.question}</td>
                <td style={{ textAlign: 'center' ,color: '#000' }}>{question.createAt?.slice(0,10)}</td>
                <td style={{ textAlign: 'center', color: question.answer ? '#4F46E5' : '#A0A0A0', fontWeight: 500 }}>
                  {question.answer ? '답변완료' : '미답변'}
                </td>
              </tr>
              <tr>
                <td colSpan={4} style={{ padding: 0, background: '#FAFBFC', borderBottom: openId === question.id ? '1px solid #eee' : 'none' }}>
                  <div
                    style={{
                      maxHeight: openId === question.id ? 500 : 0,
                      overflow: 'hidden',
                      transition: 'max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                      background: '#fff',
                      padding: openId === question.id ? '32px 16px 24px 16px' : '0 16px',
                      fontSize: 16,
                      color: '#000',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {openId === question.id && question.question}
                    {openId === question.id && (
                      <div style={{ marginTop: 24 }}>
                        {question.answer && editModeId !== question.id ? (
                          <div style={{
                            background: '#F5F6FA',
                            borderRadius: 8,
                            padding: '16px',
                            marginBottom: 16,
                            color: '#222',
                          }}>
                            <b>답변</b><br />
                            {question.answer}
                            <button
                              onClick={() => handleEditClick(question)}
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
                              onClick={() => handleAnswerSave(question.id)}
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