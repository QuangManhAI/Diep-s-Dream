"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { UserMenu } from "../../components/page";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
console.log("🔍 ENV NEXT_PUBLIC_API_URL:", process.env.NEXT_PUBLIC_API_URL);
console.log("🧭 MenuPage mounted");


type MenuItem = {
  id: string;
  category: string;
  name: string;
  price: number;
  imagePath?: string;
};

export default function MenuPage() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [activeCat, setActiveCat] = useState("coffee");
  const router = useRouter();

  async function fetchMenu() {
    console.log("🌐 Fetching from:", `${BASE_URL}/menu`);
    const res = await fetch(`${BASE_URL}/menu`);
    console.log("📡 Response status:", res.status);
    const text = await res.text();
    console.log("📄 Raw text:", text.slice(0, 200));
    try {
      const data = JSON.parse(text);
      console.log("✅ Parsed JSON length:", data.length);
      setMenu(data);
    } catch (e) {
      console.error("❌ JSON parse error:", e);
    }
  }


  useEffect(() => {
    fetchMenu();
  }, []);

  const categories = [
    { key: "coffee", label: "Cà phê" },
    { key: "drink", label: "Thức uống" },
    { key: "food", label: "Món ăn" },
    { key: "matcha", label: "Matcha" },
  ];

  const filtered = menu.filter((m) => m.category === activeCat);

  async function addToCart(item: MenuItem) {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      toast.error("Vui lòng đăng nhập để thêm sản phẩm!");
      setTimeout(() => router.push("/login"), 1500);
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: item.name, quantity: 1, price: item.price }),
      });

      if (!res.ok) throw new Error("Thêm thất bại!");
      toast.success(`Đã thêm "${item.name}" vào giỏ hàng!`);
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#faf7f2] text-[#3a2a1a]">
      {/* HEADER */}
      <header className="flex justify-between items-center px-8 py-5 bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <Image src="/coffee_chi_yeu_logo(2).png" alt="Logo" width={42} height={42} />
          <span className="font-serif text-xl tracking-wide">
            Điệp&apos;s <span className="italic text-amber-700">Dream</span>
          </span>
        </div>

        <nav className="flex items-center space-x-6 text-sm">
          <Link href="/" className="hover:text-amber-700">Trang chủ</Link>
          <Link href="/cart" className="hover:text-amber-700">Giỏ hàng</Link>
          <UserMenu />
        </nav>
      </header>

      {/* BODY */}
      <div className="flex flex-1">
{/* SIDEBAR — danh mục tinh tế, sang trọng hơn */}
<aside className="w-1/5 min-w-[180px] bg-[#f5efe8]/80 px-6 py-10 border-r border-[#d4bca2] hidden md:block shadow-[inset_-2px_0_8px_rgba(0,0,0,0.05)]">
  <h2 className="font-semibold text-sm text-[#3a2a1a] mb-6 uppercase tracking-[0.25em]">
    Danh mục
  </h2>

  <ul className="space-y-3">
    {categories.map((c) => (
      <li key={c.key}>
        <button
          onClick={() => setActiveCat(c.key)}
          className={`w-full text-left text-base font-medium tracking-wide transition-all duration-200 pb-1 border-b
            ${
              activeCat === c.key
                ? "border-[#2c1a0c] text-[#2c1a0c] font-semibold"
                : "border-transparent text-[#4a3b2d] hover:text-[#2c1a0c]"
            }`}
        >
          {c.label}
        </button>
      </li>
    ))}
  </ul>
</aside>

        {/* MENU GRID */}
        <section className="flex-1 p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 place-items-center">
          {filtered.length === 0 ? (
            <p className="text-gray-500 col-span-full text-center italic">
              Đang tải menu...
            </p>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id || item.name}
                className="flex flex-col items-center text-center bg-white/80 backdrop-blur-sm 
                          rounded-full p-8 shadow-[0_4px_15px_rgba(0,0,0,0.05)] 
                          hover:shadow-[0_6px_18px_rgba(0,0,0,0.08)] hover:-translate-y-1 
                          border border-transparent hover:border-[#2c1a0c] 
                          transition-all duration-300"
              >
                <div className="relative w-40 h-40 rounded-full overflow-hidden border-[3px] border-amber-100 shadow-sm mb-4">
                  <Image
                    src={item.imagePath || "/coffee_placeholder.png"}
                    alt={item.name}
                    width={160}
                    height={160}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                </div>
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-amber-800 font-medium mt-1 mb-4">{item.price}k</p>
                <button
                  onClick={() => addToCart(item)}
                  className="bg-gradient-to-r from-amber-700 to-amber-600 
                             hover:from-amber-800 hover:to-amber-700 text-white 
                             px-6 py-2 rounded-full text-sm font-semibold 
                             shadow-[0_2px_8px_rgba(107,51,0,0.2)] transition-all"
                >
                  Thêm vào giỏ
                </button>
              </div>
            ))
          )}
        </section>
      </div>

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
