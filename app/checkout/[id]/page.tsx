"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const [seconds, setSeconds] = useState(600);
  const [expired, setExpired] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
  clearInterval(timer);

  fetch("/api/release", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      reservationId: window.location.pathname.split("/").pop(),
    }),
  });

  setExpired(true);

  return 0;
}

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const handleConfirm = () => {
    alert("Purchase Confirmed!");
    router.push("/");
  };

  const handleCancel = () => {
    alert("Reservation Cancelled");
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-black text-white p-10 flex items-center justify-center">
      <div className="bg-zinc-900 p-8 rounded-xl border border-zinc-700 w-full max-w-xl">
        <h1 className="text-4xl font-bold mb-6">
          Checkout Reservation
        </h1>

        {!expired ? (
          <>
            <p className="text-lg mb-4">
              Your reservation is active.
            </p>

            <div className="text-6xl font-bold text-green-400 mb-8">
              {minutes}:{remainingSeconds
                .toString()
                .padStart(2, "0")}
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleConfirm}
                className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500"
              >
                Confirm Purchase
              </button>

              <button
                onClick={handleCancel}
                className="px-6 py-3 rounded-lg bg-red-600 hover:bg-red-500"
              >
                Cancel Reservation
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-3xl font-bold text-red-500 mb-4">
              Reservation Expired
            </div>

            <button
              onClick={() => router.push("/")}
              className="px-6 py-3 rounded-lg bg-gray-700 hover:bg-gray-600"
            >
              Back to Inventory
            </button>
          </>
        )}
      </div>
    </main>
  );
}