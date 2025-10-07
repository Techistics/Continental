import React from "react";
import Image from "next/image";

const Scan = () => {
  return (
    <div className="bg-[#F47200] text-white flex items-center gap-6 p-4">
      {/* Text */}
      <h1 className="text-2xl font-bold whitespace-nowrap">Get UPTO</h1>

      {/* QR Image */}
      <Image
        src="/qr.svg"
        alt="QR Code"
        width={80}
        height={80}
        className="drop-shadow-lg"
      />
    </div>
  );
};

export default Scan;
