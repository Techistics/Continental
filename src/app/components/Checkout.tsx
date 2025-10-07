

type CheckoutButtonProps = {
  items: { id: number; name: string; price: number; quantity: number }[];
};

export default function CheckoutButton({ items }: CheckoutButtonProps) {
  const handleCheckout = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url; // redirect to Stripe Checkout
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg"
    >
      Checkout
    </button>
  );
}
