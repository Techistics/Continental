"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/cartContext";
import toast, { Toaster } from "react-hot-toast";

type MenuItem = {
  id: number;
  restaurant_id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image_url: string;
};

export default function MenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);
  console.log(items)

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement>,
    item: MenuItem
  ) => {
    e.stopPropagation(); // prevent link navigation
    e.preventDefault(); // prevent default link behavior

    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
    });

    toast.success(`${item.name} added to cart`, {
      position: "top-right",
      duration: 2500,
      style: {
        background: "#16a34a",
        color: "#fff",
      },
      iconTheme: {
        primary: "#fff",
        secondary: "#16a34a",
      },
    });
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center min-h-screen p-6">
        <h1 className="text-3xl font-bold mb-6">Restaurant Menu</h1>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {items?.map((item) => (
            <div
              key={item?.id}
              className="p-4 border rounded-xl shadow hover:shadow-lg transition"
            >
              <Link href={`/menu/${item?.id}`}>
                <div className="relative w-full h-40">
                  <Image
                    src={item?.image_url}
                    alt={item?.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <h2 className="text-xl font-semibold mt-2">{item?.name}</h2>
                <p className="text-gray-600">{item?.description}</p>
                <p className="font-bold">${item?.price}</p>
              </Link>

              <button
                onClick={(e) => handleAddToCart(e, item)}
                className="mt-3 w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        <Link
          href="/cart"
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Go to Cart
        </Link>
      </div>
    </>
  );
}
