"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
  inventoryId: string;
  product: string;
  warehouse: string;
  available: number;
  reserved: number;
  total: number;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(console.error);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-8">
        Allo Inventory System
      </h1>

      <div className="grid gap-6">
        {products.map((item) => (
          <div
            key={item.inventoryId}
            className="border border-gray-700 rounded-xl p-6 bg-zinc-900"
          >
            <h2 className="text-2xl font-semibold">
              {item.product}
            </h2>

            <p className="text-gray-400 mt-2">
              Warehouse: {item.warehouse}
            </p>

            <div className="mt-4 space-y-1">
              <p>Available: {item.available}</p>
              <p>Reserved: {item.reserved}</p>
              <p>Total: {item.total}</p>
            </div>

            <button
  onClick={async () => {
    const response = await fetch("/api/reserve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inventoryId: item.inventoryId,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error);
      return;
    }

    router.push(
      `/checkout/${data.reservation.id}`
    );
  }}
  className="mt-5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500"
>
  Reserve Now
</button></div>
        ))}
      </div>
    </main>
  );
}