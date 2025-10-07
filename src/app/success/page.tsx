"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const router = useRouter();

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold text-green-600">Payment successful</h1>
      <p className="mt-4">Session ID: {sessionId}</p>
      <p className="mt-2 mb-6">Thanks Your Order Has Been Placed 🎉</p>
      <p className="font-bold text-3xl text-green-600">Track You Order</p>
      <button
        onClick={() => router.push(`/track-order?session_id=${sessionId}`)}
        className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
      >
        Track Order
      </button>

      
    </div>
  );
}
