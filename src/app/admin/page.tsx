import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="text-red-700 text-2xl flex justify-center items-center p-20 font-semibold underline">
        This is Admin Panel
      </div>
      <ul>
        <Link href='/admin/sales'><li>Sales Chart</li></Link>
        <Link href='/admin/products'><li>Products Management</li></Link>
      </ul>
    </div>
  );
};

export default page;
