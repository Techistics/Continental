import pool from "../../../db";
import Image from "next/image";

export default async function MenuPage() {
  type MenuItem = {
    id: number;
    restaurant_id: number;
    name: string;
    price: number;
    description: string;
    category: string;
    image_url: string;
  };

  const { rows: items } = await pool.query("SELECT * FROM MenuItems");

  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Restaurant Menu</h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item: MenuItem) => (
          <div key={item.id} className="p-4 border rounded-xl shadow">
            <Image
              src={item.image_url}
              alt={item.name}
              className="w-full h-40 object-cover rounded"
              fill
            />
            <h2 className="text-xl font-semibold mt-2">{item.name}</h2>
            <p className="text-gray-600">{item.description}</p>
            <p className="font-bold">${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
