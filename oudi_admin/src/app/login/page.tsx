"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface AdminUser {
  email: string;
  password: string;
  name: string;
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // 테스트 관리자 계정 초기화
    const existingAdmins = JSON.parse(localStorage.getItem('adminUsers') || '[]');
    if (existingAdmins.length === 0) {
      const testAdmins: AdminUser[] = [
        { email: "admin@test.com", password: "admin123", name: "관리자" },
        { email: "test@example.com", password: "test123", name: "테스트관리자" },
        { email: "manager@company.com", password: "manager123", name: "매니저" }
      ];
      localStorage.setItem('adminUsers', JSON.stringify(testAdmins));
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 관리자 계정 확인
    const adminUsers: AdminUser[] = JSON.parse(localStorage.getItem('adminUsers') || '[]');
    const admin = adminUsers.find(user => user.email === email && user.password === password);

    if (admin) {
      // 로그인 성공 - 세션 정보 저장
      localStorage.setItem('currentAdmin', JSON.stringify({
        email: admin.email,
        name: admin.name,
        loginTime: new Date().toISOString()
      }));
      
      alert(`${admin.name}님 환영합니다!`);
      router.push("/");
    } else {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-xs text-center">
        <div className="mb-8">
          <Image src="/Group 7.svg" alt="logo" width={200} height={200} className="ml-15" />
        </div>
        <p className="mb-8 text-gray-600">관리자 로그인을 해주세요</p>
        {error && (
          <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md ">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-6" style={{color: '#000'}}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-left text-gray-700"
            >
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일 주소를 입력해주세요."
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-left text-gray-700"
            >
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요."
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}