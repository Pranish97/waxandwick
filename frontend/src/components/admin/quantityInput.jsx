import { Plus, Minus } from "lucide-react";
import { useEffect, useState } from "react";

export function QuantityInput({ value, onChange }) {
  console.log(value, "value")
  const [qty, setQty] = useState(value);

  const updateQty = (newQty) => {
    const validQty = newQty < 0 ? 0 : newQty;
    setQty(validQty);
    onChange && onChange(validQty);
  };

 


  return (
    <div className="flex items-center border rounded-lg overflow-hidden w-32">
      <button
        type="button"
        className="px-3 py-2 bg-gray-100 hover:bg-gray-200"
        onClick={() => updateQty(qty - 1)}
      >
        <Minus size={16} />
      </button>
      <input
        type="text"
        value={qty}
        onChange={(e) => updateQty(Number(e.target.value))}
        className="w-full text-center outline-none border-2 rounded-sm font-semibold border-pink-500"
      />
      <button
        type="button"
        className="px-3 py-2 bg-gray-100 hover:bg-gray-200"
        onClick={() => updateQty(qty + 1)}
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
