"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold text-green-600">Payment Successful 🎉</h1>
      {sessionId && (
        <p className="mt-4 text-gray-700">Session ID: {sessionId}</p>
      )}
      <p className="mt-2 text-gray-600">Thank you for your order!</p>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="text-center p-6">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
