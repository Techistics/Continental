import React from "react";
import Image from "next/image";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

const Navbar = () => {
  return (
    <div className="absolute top-0 left-0 w-full flex items-center px-6 py-1 bg-transparent z-20">
      {/* Left side - Logo */}
      <div className="flex items-center gap-2 px-0">
        
        <span className="font-bold text-lg px-0">Burger</span>
      </div>

      {/* Center - Nav Links */}
      <div className="flex-1 flex justify-center gap-6 text-base">
        <div>Home</div>
        <div>Our Outlet</div>
        <div>Order</div>
        <div>Contact</div>
      </div>

      {/* Right side - Auth buttons */}
      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
