"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiMessageCircle, FiBell } from "react-icons/fi";

// Heroicons (outline)
const LogoutIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const menus = [
  { name: "FAQ", href: "/FAQ", icon: FiMessageCircle  },
  { name: "1:1 문의", href: "/question", icon: FiMessageCircle  },
  { name: "공지사항", href: "/notice", icon: FiBell  },
];

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [adminInfo, setAdminInfo] = useState<{email: string, name: string} | null>(null);

  useEffect(() => {
    // 로그인된 관리자 정보 가져오기
    const currentAdmin = localStorage.getItem('currentAdmin');
    if (currentAdmin) {
      setAdminInfo(JSON.parse(currentAdmin));
    }
  }, []);

  const handleLogout = () => {
    if (confirm('로그아웃하시겠습니까?')) {
      localStorage.removeItem('currentAdmin');
      router.push('/login');
    }
  };

  // 이메일을 기반으로 역할 결정
  const getRoleLabel = (email: string) => {
    if (email.includes('admin')) return '관리자';
    if (email.includes('test')) return '테스트관리자';
    if (email.includes('manager')) return '매니저';
    return '관리자';
  };

  return (
    <nav className="flex flex-col w-64 h-screen border-r bg-white justify-between fixed">
      <div>
        <div className="flex flex-col items-start gap-2 px-6 py-8">
          <div className="flex items-center gap-2">
            <Image src="/Group 7.svg" alt="logo" width={40} height={40} />
            <span className="bg-indigo-100 text-indigo-600 text-xs font-semibold px-2 py-0.5 rounded ml-1">
              {adminInfo ? getRoleLabel(adminInfo.email) : '관리자'}
            </span>
          </div>
          <span className="text-sm text-gray-500 mt-2">{adminInfo?.email || 'admin@ddd.dd.dd'}</span>
        </div>
        <hr />
        <ul className="mt-2">
          {menus.map((menu) => {
            const active = pathname === menu.href;
            const Icon = menu.icon;
            return (
              <li key={menu.name}>
                <Link
                  href={menu.href}
                  className={`flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg transition-colors
                    ${active ? "bg-indigo-50 text-indigo-600" : "text-gray-700 hover:bg-gray-50"}`}
                >
                  <Icon />
                  {menu.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="p-4">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 border rounded-lg text-indigo-600 font-medium hover:bg-indigo-50"
        >
          <LogoutIcon />
          로그아웃
        </button>
      </div>
    </nav>
  );
}
