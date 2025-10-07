"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/cartContext";

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

  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Restaurant Menu</h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/menuitems/${item.id}`}
            className="p-4 border rounded-xl shadow"
          >
            <div className="relative w-full h-40">
              <Image
                src="/next.svg"
                alt={item.name}
                fill
                className="object-cover rounded"
              />
            </div>
            <Link href={`/menu/${item.id}`}><h2 className="text-xl font-semibold mt-2">{item.name}</h2></Link>
            <p className="text-gray-600">{item.description}</p>
            <p className="font-bold">${item.price}</p>
            <button
              onClick={() =>
                addToCart({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  quantity: 1,
                })
              }
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
            >
              Add to Cart
            </button>
          </Link>
        ))}
      </div>
      <Link
        href="/cart"
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Go to Cart
      </Link>
    </div>
  );
}
