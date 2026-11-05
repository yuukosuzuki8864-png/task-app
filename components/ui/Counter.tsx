// components/Counter.tsx
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="border p-4 rounded">
      <p className="text-2xl font-bold">{count}</p>
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => setCount(count - 1)}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          -1
        </button>
        <button
          onClick={() => setCount(count + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          +1
        </button>
      </div>
    </div>
  );
}