"use client";

import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image_url: string;
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image_url: "",
  });

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newProduct,
        price: parseFloat(newProduct.price),
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setProducts((prev) => [...prev, data]);
      setNewProduct({
        name: "",
        price: "",
        description: "",
        category: "",
        image_url: "",
      });
    } else {
      alert(data.error || "Failed to add product");
    }
  };

  useEffect(() => {
    fetch("/api/admin/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin – Products</h1>
      <form
        onSubmit={handleAddProduct}
        className="mb-6 bg-blue-800 p-4 rounded-lg flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) =>
            setNewProduct({ ...newProduct, category: e.target.value })
          }
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={newProduct.image_url}
          onChange={(e) =>
            setNewProduct({ ...newProduct, image_url: e.target.value })
          }
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded mt-2 hover:bg-green-700"
        >
          Add Product
        </button>
      </form>
      {editingProduct && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const res = await fetch("/api/products", {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(editingProduct),
            });
            const data = await res.json();
            if (res.ok) {
              setProducts((prev) =>
                prev.map((p) => (p.id === data.id ? data : p))
              );
              setEditingProduct(null);
            } else {
              alert(data.error || "Failed to update product");
            }
          }}
          className="mb-6 bg-gray-200 p-4 rounded flex flex-col gap-2"
        >
          <input
            type="text"
            value={editingProduct.name}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, name: e.target.value })
            }
            required
          />
          <input
            type="text"
            value={editingProduct.price}
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                price: parseFloat(e.target.value),
              })
            }
            required
          />
          <input
            type="text"
            value={editingProduct.category}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, category: e.target.value })
            }
            required
          />
          <input
            type="text"
            value={editingProduct.description}
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                description: e.target.value,
              })
            }
            required
          />
          <input
            type="text"
            value={editingProduct.image_url || ""}
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                image_url: e.target.value,
              })
            }
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update Product
          </button>
          <button
            type="button"
            onClick={() => setEditingProduct(null)}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 mt-2"
          >
            Cancel
          </button>
        </form>
      )}

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td className="border px-4 py-2">{p.id}</td>
              <td className="border px-4 py-2">{p.name}</td>
              <td className="border px-4 py-2">${p.price}</td>
              <td className="border px-4 py-2">{p.category}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={async () => {
                    if (
                      !confirm("Are you sure you want to delete this product?")
                    )
                      return;

                    const res = await fetch(`/api/products?id=${p.id}`, {
                      method: "DELETE",
                    });

                    const data = await res.json();
                    if (res.ok) {
                      setProducts((prev) =>
                        prev.filter((p) => p.id !== p.id)
                      );
                    } else {
                      alert(data.error || "Failed to delete product");
                    }
                  }}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>

                <button
                  onClick={() => setEditingProduct(p)}
                  className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
