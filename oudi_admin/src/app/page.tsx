"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // 홈 페이지 접속 시 FAQ 페이지로 리다이렉트
    router.replace('/FAQ');
  }, [router]);

  return null; // 리다이렉트 중에는 아무것도 렌더링하지 않음
}