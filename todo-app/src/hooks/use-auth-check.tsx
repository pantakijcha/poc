"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function useAuthCheck() {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage?.getItem("token");
    if (!token) {
      router.push("/");
    }
  }, []);
}
