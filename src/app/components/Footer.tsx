import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#FF6947] text-white px-10 py-12">
      <div className=" grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Column 1: Logo + Info */}
        <div>
          <div className="flex items-start gap-3 mb-4 ">
            <Image src="/icon.png" alt="logo" width={60} height={60} />
            <h2 className="text-lg font-bold leading-tight">BURGER</h2>
          </div>
          <p className="text-sm mb-4">
            LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT, SED DO
            EIUSMOD TEMPOR INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA
          </p>
          <div className="pt-4">
            <p className="text-sm mb-1">+92 370 464 0009</p>
            <p className="text-sm mb-1">Business@devclyst.com</p>
            <p className="text-sm">xyz, anyware rode, sectore F</p>
          </div>
        </div>

        {/* Column 2: Services */}
        <div className="pl-20">
          <h3 className="text-lg font-semibold mb-3">Service</h3>
          <ul className="space-y-2 text-sm cursor-pointer">
            <li>Burger</li>
            <li>Menu</li>
            <li>Hot Items</li>
            <li>About</li>
            <li>Services</li>
          </ul>
        </div>

        {/* Column 3: Follow Us */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <ul className="space-y-2 text-sm cursor-pointer">
            <li>Facebook</li>
            <li>Instagram</li>
            <li>LinkedIn</li>
            <li>Twitter</li>
            <li>Whatsapp</li>
          </ul>
        </div>

        {/* Column 4: Subscribe */}
        <div>
          <h3 className="text-lg font-semibold mb-3">
            Subscribe For New Update
          </h3>
          <div className="flex bg-white rounded overflow-hidden">
            <input
              type="email"
              placeholder="Enter Email..."
              className="px-4 py-2 text-[#FF6947] font-bold flex-1 outline-none"
            />
            <button className=" px-4 text-[#FF6947] font-extrabold cursor-pointer">
              →
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex justify-end pr-20 mt-2 pt-2">
        <div className="w-[4%] border-t-2 border-white "></div>
      </div>
      <div className="text-end text-sm font-bold mt-4">
        Burger.Com © All Right Reserve
      </div>
    </footer>
  );
};

export default Footer;
