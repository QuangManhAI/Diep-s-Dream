"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const BASE_URL = "http://localhost:3001";

type CartItem = {
  name: string;
  price: number;
  quantity: number;
};

type CartResponse = {
  items: CartItem[];
  total: number;
};

type Order = {
  _id: string;
  items: CartItem[];
  total: number;
  createdAt: string;
  status: string;
};

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [message, setMessage] = useState("");

  // 🧠 Kiểm tra login
  useEffect(() => {
    const token = sessionStorage.getItem("accessToken") || window.name;
    if (!token) {
      router.push("/login");
      return;
    }
    fetchCart();
    fetchOrders();
  }, []);

  // 🛒 Lấy giỏ hàng
  async function fetchCart() {
    const token = sessionStorage.getItem("accessToken");
    if (!token) return;

    try {
      const res = await fetch(`${BASE_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Không tải được giỏ hàng");
      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error(err);
      setCart({ items: [], total: 0 });
    } finally {
      setLoading(false);
    }
  }

  // 📜 Lấy lịch sử đơn hàng gần nhất
  async function fetchOrders() {
    const token = sessionStorage.getItem("accessToken");
    if (!token) return;
    try {
      const res = await fetch(`${BASE_URL}/Order/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data.slice(0, 5)); // hiển thị tối đa 5 đơn gần nhất
      }
    } catch (err) {
      console.error("Không tải được đơn hàng:", err);
    }
  }

  async function updateQuantity(name: string, newQty: number) {
    const token = sessionStorage.getItem("accessToken");
    if (!token) return router.push("/login");

    const res = await fetch(`${BASE_URL}/cart/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, quantity: newQty }),
    });
    const data = await res.json();
    setCart(data);
  }

  async function removeItem(name: string) {
    const token = sessionStorage.getItem("accessToken");
    if (!token) return router.push("/login");

    const res = await fetch(`${BASE_URL}/cart/remove`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    setCart(data);
  }

  async function clearCart() {
    const token = sessionStorage.getItem("accessToken");
    if (!token) return router.push("/login");

    await fetch(`${BASE_URL}/cart/clear`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setCart({ items: [], total: 0 });
  }

  // 💳 Đặt hàng
  async function checkout() {
    const token = sessionStorage.getItem("accessToken");
    if (!token) return router.push("/login");

    const items = cart?.items || [];
    if (items.length === 0) {
      alert("Giỏ hàng trống!");
      return;
    }

    try {
      setCheckoutLoading(true);
      setMessage("");

      const res = await fetch(`${BASE_URL}/Order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items,
          total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
          phone,
        }),
      });

      if (!res.ok) throw new Error("Không thể tạo đơn hàng!");
      setMessage("✅ Đặt hàng thành công!");
      await clearCart();
      await fetchOrders(); // cập nhật lịch sử mới nhất
    } catch (err) {
      console.error(err);
      setMessage("❌ Đặt hàng thất bại. Vui lòng thử lại!");
    } finally {
      setCheckoutLoading(false);
    }
  }

  const total =
    cart?.items?.reduce((sum, i) => sum + i.price * i.quantity, 0) || 0;

  return (
    <main className="min-h-screen bg-[#faf7f3] text-[#2F2A2C] flex flex-col">
      {/* HEADER */}
      <header className="flex justify-between items-center w-full px-8 py-4 border-b border-gray-200 bg-white sticky top-0 z-50">
        <h1 className="font-semibold text-lg tracking-wide">🛒 Giỏ hàng</h1>
        <Link href="/menu" className="text-amber-700 hover:underline">
          ← Quay lại menu
        </Link>
      </header>

      {/* BODY */}
      <section className="flex-1 p-8">
        {loading ? (
          <p className="text-center text-gray-500">Đang tải...</p>
        ) : (
          <>
            {/* 🛍️ Giỏ hàng */}
            {!cart || cart.items.length === 0 ? (
              <p className="text-center text-gray-600">Giỏ hàng của bạn trống.</p>
            ) : (
              <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6 mb-8">
                {cart.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex justify-between items-center border-b border-gray-200 py-3"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.price}k</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.name, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        className="px-2 py-1 bg-gray-100 rounded"
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.name, item.quantity + 1)
                        }
                        className="px-2 py-1 bg-gray-100 rounded"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.name)}
                        className="ml-4 text-red-600 hover:underline text-sm"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                ))}

                {/* Tổng tiền */}
                <div className="flex justify-between items-center mt-4">
                  <p className="font-semibold">Tổng cộng:</p>
                  <p className="text-lg text-amber-800 font-bold">{total}k</p>
                </div>

                {/* Nhập sđt */}
                <div className="mt-4">
                  <label className="text-sm text-gray-700 block mb-1">
                    Số điện thoại liên hệ:
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="090xxxxxxx"
                    className="border border-gray-300 rounded-md px-3 py-2 w-full focus:border-amber-700 focus:outline-none"
                  />
                </div>

                {/* Hành động */}
                <div className="flex justify-between mt-6">
                  <button
                    onClick={clearCart}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                  >
                    🧹 Xóa tất cả
                  </button>
                  <button
                    onClick={checkout}
                    disabled={checkoutLoading}
                    className={`bg-amber-700 hover:bg-amber-800 text-white px-5 py-2 rounded-md font-semibold ${
                      checkoutLoading ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                  >
                    {checkoutLoading ? "⏳ Đang xử lý..." : "Thanh toán"}
                  </button>
                </div>

                {message && (
                  <p className="text-center text-sm mt-4 text-amber-700">
                    {message}
                  </p>
                )}
              </div>
            )}

{/* 🧾 Lịch sử đơn hàng */}
{orders.length > 0 && (
  <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6">
    <h2 className="text-lg font-semibold mb-4 text-amber-800">
      📜 Lịch sử đặt hàng gần đây
    </h2>
    <ul className="space-y-4">
      {orders.map((o) => (
        <li
          key={o._id}
          className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
        >
          {/* 🔸 Thông tin chung */}
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-amber-700">
              🧾 Mã đơn: {o._id.slice(-6).toUpperCase()}
            </span>
            <span
              className={`text-sm px-2 py-1 rounded ${
                o.status === "done"
                  ? "bg-green-100 text-green-700"
                  : o.status === "cancelled"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {o.status || "pending"}
            </span>
          </div>

          {/* 🔹 Danh sách món */}
          <div className="space-y-1 border-t border-gray-200 pt-2 text-sm">
            {o.items.map((it, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center text-gray-700"
              >
                <span>
                  {it.name}{" "}
                  <span className="text-gray-500">x{it.quantity}</span>
                </span>
                <span className="text-gray-800 font-medium">
                  {it.price * it.quantity}k
                </span>
              </div>
            ))}
          </div>

          {/* 🔸 Tổng tiền + thời gian */}
          <div className="flex justify-between items-center mt-3 text-sm text-gray-600">
            <span>
              🕒 {new Date(o.createdAt).toLocaleString("vi-VN")}
            </span>
            <span className="font-semibold text-amber-800">
              Tổng: {o.total}k
            </span>
          </div>
        </li>
      ))}
    </ul>
  </div>
)}
          </>
        )}
      </section>

      {/* FOOTER */}
      <footer className="w-full py-6 bg-[#2c1a0c] text-center text-gray-200 text-sm">
        © {new Date().getFullYear()} Điệp&apos;s Dream Coffee & More.  
        Tất cả các quyền được bảo lưu.
      </footer>
    </main>
  );
}
