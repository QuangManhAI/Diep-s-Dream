"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

type CartItem = { name: string; price: number; quantity: number };
type CartResponse = { items: CartItem[]; total: number };
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

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken") || window.name;
    if (!token) {
      router.push("/login");
      return;
    }
    fetchCart();
    fetchOrders();
  }, []);

  async function fetchCart() {
    const token = sessionStorage.getItem("accessToken");
    if (!token) return;
    try {
      const res = await fetch(`${BASE_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCart(data);
    } catch {
      setCart({ items: [], total: 0 });
    } finally {
      setLoading(false);
    }
  }

  async function fetchOrders() {
    const token = sessionStorage.getItem("accessToken");
    if (!token) return;
    try {
      const res = await fetch(`${BASE_URL}/Order/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data.slice(0, 5));
      }
    } catch {}
  }

  async function updateQuantity(name: string, newQty: number) {
    const token = sessionStorage.getItem("accessToken");
    if (!token) return router.push("/login");
    const res = await fetch(`${BASE_URL}/cart/update`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
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
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
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

  async function checkout() {
    const token = sessionStorage.getItem("accessToken");
    if (!token) return router.push("/login");

    const items = cart?.items || [];
    if (items.length === 0) return alert("Giỏ hàng trống!");

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
      await fetchOrders();
    } catch {
      setMessage("❌ Đặt hàng thất bại. Vui lòng thử lại!");
    } finally {
      setCheckoutLoading(false);
    }
  }

  const total = cart?.items?.reduce((sum, i) => sum + i.price * i.quantity, 0) || 0;

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-[#f9f6f2] to-[#f4e9de] text-[#3a2a1a]">
    {/* HEADER */}
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-amber-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex justify-between items-center">
        
        {/* Logo + Brand */}
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/coffee_chi_yeu_logo(2).png"
            alt="Điệp's Dream Logo"
            width={46}
            height={46}
            className="object-contain drop-shadow-md"
          />
          <span className="font-serif text-[1.4rem] tracking-wide text-[#3a2a1a]">
            Điệp&apos;s <span className="text-amber-700 italic">Dream</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-[0.95rem] font-medium">
          <Link href="/menu" className="hover:text-amber-700 transition">
            Menu
          </Link>
          <Link href="/cart" className="text-amber-700 font-semibold">
            Giỏ hàng
          </Link>
        </nav>
      </div>
    </header>


      {/* BODY */}
      <section className="flex-1 pt-28 pb-20 px-6 md:px-10">
        {loading ? (
          <p className="text-center text-gray-500 mt-20">Đang tải...</p>
        ) : !cart || cart.items.length === 0 ? (
          <div className="text-center text-gray-600 mt-20">
            <p>Giỏ hàng của bạn trống.</p>
            <Link href="/menu" className="text-amber-700 hover:underline mt-3 inline-block">
              ← Quay lại menu
            </Link>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
            <h1 className="text-2xl font-semibold text-amber-900 mb-6 text-center">
              🛍️ Giỏ hàng của bạn
            </h1>

            {cart.items.map((item) => (
              <div key={item.name} className="flex justify-between items-center border-b border-amber-100 py-3">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.price}k</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.name, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-sm"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.name, item.quantity + 1)}
                    className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-sm"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item.name)}
                    className="ml-3 text-red-600 hover:underline text-sm"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}

            {/* Tổng tiền */}
            <div className="flex justify-between items-center mt-6 text-lg font-semibold">
              <p>Tổng cộng:</p>
              <p className="text-amber-800">{total}k</p>
            </div>

            {/* Nhập số điện thoại */}
            <div className="mt-4">
              <label className="text-sm text-gray-700 block mb-1">Số điện thoại liên hệ:</label>
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
                Xóa tất cả
              </button>
              <button
                onClick={checkout}
                disabled={checkoutLoading}
                className={`bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-800 hover:to-amber-700 text-white px-6 py-2 rounded-full font-semibold transition-all ${
                  checkoutLoading ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {checkoutLoading ? "⏳ Đang xử lý..." : "Thanh toán"}
              </button>
            </div>

            {message && (
              <p className="text-center text-sm mt-4 text-amber-700">{message}</p>
            )}
          </div>
        )}

        {/* Lịch sử đơn hàng */}
        {orders.length > 0 && (
          <div className="max-w-3xl mx-auto bg-white/80 rounded-2xl shadow-md p-6 mt-10">
            <h2 className="text-lg font-semibold mb-4 text-amber-900 text-center">
              Lịch sử đặt hàng gần đây
            </h2>
            <ul className="space-y-4">
              {orders.map((o) => (
                <li key={o._id} className="border border-gray-200 rounded-lg p-4 hover:bg-[#fdf8f3] transition">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-amber-800">
                      Mã đơn: {o._id.slice(-6).toUpperCase()}
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

                  <div className="space-y-1 border-t border-gray-200 pt-2 text-sm">
                    {o.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between text-gray-700">
                        <span>
                          {it.name} <span className="text-gray-500">x{it.quantity}</span>
                        </span>
                        <span className="text-gray-800 font-medium">{it.price * it.quantity}k</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mt-3 text-sm text-gray-600">
                    <span>{new Date(o.createdAt).toLocaleString("vi-VN")}</span>
                    <span className="font-semibold text-amber-800">Tổng: {o.total}k</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

{/* FOOTER */}
<footer className="w-full bg-[#2c1a0c] text-gray-200 text-sm mt-auto">
  <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
    
    {/* Thương hiệu */}
    <div>
      <h3 className="text-lg font-semibold text-white mb-3">
        Điệp&apos;s Dream Coffee
      </h3>
      <p className="text-gray-300 leading-relaxed">
        68 Hoàng Sa, Thị trấn An Châu, Huyện Châu Thành,<br />
        Tỉnh An Giang, Việt Nam
      </p>
      <p className="mt-2 text-gray-400">📞 0345 552 262</p>
      <p className="text-gray-400">✉️ py.quangmanh.ai@gmail.com</p>
    </div>

    {/* Liên kết nhanh */}
    <div>
      <h3 className="text-lg font-semibold text-white mb-3">
        Liên kết nhanh
      </h3>
      <ul className="space-y-2 text-gray-300">
        <li><Link href="/" className="hover:text-amber-400">Trang chủ</Link></li>
        <li><Link href="/menu" className="hover:text-amber-400">Menu</Link></li>
        <li><Link href="/login" className="hover:text-amber-400">Đăng nhập</Link></li>
        <li><Link href="/register" className="hover:text-amber-400">Đăng ký</Link></li>
      </ul>
    </div>

    {/* Mạng xã hội */}
    <div>
      <h3 className="text-lg font-semibold text-white mb-3">
        Kết nối với chúng tôi
      </h3>
      <div className="flex space-x-5 text-2xl">
        {/* Facebook */}
        <a
          href="https://facebook.com"
          target="_blank"
          className="hover:text-amber-400 transition"
          aria-label="Facebook"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.03H8.1v-2.9h2.34V9.41c0-2.32 1.38-3.6 3.5-3.6.7 0 1.52.12 1.88.18v2.17H14.7c-1.17 0-1.53.73-1.53 1.48v1.77h2.61l-.42 2.9h-2.19v7.03C18.34 21.25 22 17.09 22 12.07z" />
          </svg>
        </a>

        {/* Instagram */}
        <a
          href="https://instagram.com"
          target="_blank"
          className="hover:text-amber-400 transition"
          aria-label="Instagram"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-2a1 1 0 100 2 1 1 0 000-2z" />
          </svg>
        </a>

        {/* LinkedIn */}
        <a
          href="https://linkedin.com"
          target="_blank"
          className="hover:text-amber-400 transition"
          aria-label="LinkedIn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path d="M19 3A2 2 0 0121 5V19A2 2 0 0119 21H5A2 2 0 013 19V5A2 2 0 015 3H19M8.3 17.6V10.7H5.9V17.6H8.3M7.1 9.6A1.4 1.4 0 107.1 6.8A1.4 1.4 0 007.1 9.6M18.1 17.6V13.6C18.1 11.4 16.8 10.3 15 10.3C13.7 10.3 12.9 11 12.6 11.6H12.5V10.7H10.1V17.6H12.6V13.9C12.6 13.1 12.7 12.4 13.6 12.4C14.5 12.4 14.6 13.2 14.6 13.9V17.6H18.1Z" />
          </svg>
        </a>
      </div>

      <p className="mt-4 text-gray-400 text-xs">
        © {new Date().getFullYear()} Điệp&apos;s Dream Coffee & More.  
        Tất cả các quyền được bảo lưu.
      </p>
    </div>
  </div>
</footer>

    </main>
  );
}
