"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function TrackOrderPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const router = useRouter();

  const [products, setProducts] = useState<{ id: number; name: string }[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // fetch products from DB
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/menu");
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    }
    fetchProducts();
  }, []);

  async function handleReviewSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedProduct) {
      setMessage("❌ Please select a product to review");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: selectedProduct,
          rating,
          comment,
        }),
      });

      if (res.ok) {
        setMessage("✅ Review submitted successfully!");
        setComment("");
        setRating(5);
        setSelectedProduct(null);
      } else {
        const err = await res.json();
        setMessage(`❌ Error: ${err.error || "Something went wrong"}`);
      }
    } catch (error) {
      setMessage("❌ Failed to submit review.");
    } finally {
      setLoading(false);
    }
  }

  const [timeLeft, setTimeLeft] = useState(1 * 60);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 10);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format mm:ss
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Track Your Order</h1>
      <p className="text-gray-700 mb-2">Session ID: {sessionId}</p>

      {timeLeft > 0 ? (
        <p className="text-xl font-mono text-blue-600">
          Estimated Delivery Time: {minutes}:
          {seconds.toString().padStart(2, "0")}
        </p>
      ) : (
        <div className="text-xl font-bold text-green-600">
          ✅ Order Delivered!
          <form onSubmit={handleReviewSubmit} className="max-w-md mx-auto">
            {/* Product Dropdown */}
            <label className="block mb-2 font-semibold">Select Product:</label>
            <select
              value={selectedProduct ?? ""}
              onChange={(e) => setSelectedProduct(Number(e.target.value))}
              className="border rounded p-2 w-full mb-4"
            >
              <option value="">-- Choose a product --</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            {/* Rating Dropdown */}
            <label className="block mb-2 font-semibold">
              Rate this product:
            </label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="border rounded p-2 w-full mb-4"
            >
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>
                  {r} Star{r > 1 && "s"}
                </option>
              ))}
            </select>

            {/* Comment */}
            <textarea
              placeholder="Write your review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border rounded p-2 w-full mb-4"
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </form>
          {message && <p className="mt-4">{message}</p>}
        </div>
      )}
    </div>
  );
}
