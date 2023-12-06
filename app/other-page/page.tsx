"use client";

import { useRouter } from "next/navigation";

export default function OtherPage() {
  const router = useRouter();

  return (
    <>
      <p>other page, please go back</p>
      <button
        onClick={() => {
          router.back();
        }}
      >
        router.back()
      </button>
    </>
  );
}
