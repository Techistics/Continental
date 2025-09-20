"use client";
import { useState, useEffect } from "react";
import { qrCode } from "../../utils/qrcode";
import Image from "next/image";

export default function Qrpage() {
  const [qr, setQr] = useState<string | null>(null);

  useEffect(() => {
    qrCode("http://localhost:3000/menu").then(setQr);
  }, []);
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Scan to View Menu</h1>
        {qr && <Image src={qr} alt="QR Code" fill/>}
      </div>
    </div>
  );
};

