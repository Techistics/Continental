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

type Review = {
  id: number;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
};

export default function MenuItemPage() {
  const { id } = useParams();
  const [item, setItem] = useState<MenuItem | null>(null);
  const { addToCart } = useCart();
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (id) {
      fetch(`/api/menu/${id}`)
        .then((res) => res.json())
        .then((data) => setItem(data));

      //Reviews
      fetch(`/api/reviews?product_id=${id}`)
        .then((res) => res.json())
        .then((data) => setReviews(data));
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
        {/* Reviews Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet.</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="border border-gray-200 rounded-lg p-4 shadow-sm"
                >
                  <p className="font-semibold text-yellow-600">
                    ⭐ {review.rating}/5
                  </p>
                  {review.comment && (
                    <p className="text-gray-700 mt-1">{review.comment}</p>
                  )}
                  <p className="text-sm text-gray-400 mt-2">
                    {new Date(review.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
