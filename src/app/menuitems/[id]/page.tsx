"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../context/cartContext";

type MenuItem = {
  id: number;
  restaurant_id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image_url: string;
};

export default function MenuItemPage() {
  const { id } = useParams();
  const [item, setItem] = useState<MenuItem | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      fetch(`/api/menuitems/${id}`)
        .then((res) => res.json())
        .then((data) => setItem(data));
    }
  }, [id]);

  if (!item) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gray-50">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-6">
        <div className="relative w-full h-72 rounded-lg overflow-hidden">
          <Image
            src={item.image_url || "/next.svg"}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="mt-6">
          <h1 className="text-3xl font-bold text-gray-800">{item.name}</h1>
          <p className="text-lg text-green-600 font-semibold mt-2">
            ${item.price}
          </p>
          <p className="text-gray-600 mt-4">{item.description}</p>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={() =>
              addToCart({
                id: item.id,
                name: item.name,
                price: parseFloat(item.price as unknown as string),
                quantity: 1,
              })
            }
            className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
          >
            Add to Cart
          </button>

          <Link
            href="/menu"
            className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition text-center"
          >
            Back to Menu
          </Link>
        </div>
      </div>
    </div>
  );
}