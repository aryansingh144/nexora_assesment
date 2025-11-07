import { useState } from "react";

export default function CheckoutForm({ onSubmit,loading }) {


  const [name,setName] = useState("Aryan");
  const [email, setEmail] = useState("aryan@example.com");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(name.trim(), email.trim());
      }}
      className="space-y-3 text-black"
    >
      <div>
        <label className="block text-xs mb-1 text-black/70">Name</label>
        <input
          className="w-full border border-black/20 rounded-xl px-3 py-2 bg-white/80"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-xs mb-1 text-black/70">Email</label>
        <input
          className="w-full border border-black/20 rounded-xl px-3 py-2 bg-white/80"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button
        disabled={loading}
        className="w-full bg-black text-white py-2 rounded-xl font-semibold hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Processing" : "Proceed To Checkout"}
      </button>
    </form>
  );
}
