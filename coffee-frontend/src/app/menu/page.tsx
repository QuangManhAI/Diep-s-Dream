"use client";
import { UserMenu } from "../../components/page";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:3001";

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
  const [cart, setCart] = useState<MenuItem[]>([]);

  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [editForm, setEditForm] = useState({ name: "", price: "", imagePath: "", category: "" });

  function openEdit(item: MenuItem) {
    setEditingItem(item);
    setEditForm({
      name: item.name,
      price: String(item.price),
      imagePath: item.imagePath || "",
      category: item.category,
    });
  }
  
  const router = useRouter();

  // === FETCH MENU ===
  async function fetchMenu() {
    const res = await fetch(`${BASE_URL}/menu`);
    const data = await res.json();
    setMenu(data);
  }

  // === ADD TO CART ===
  async function addToCart(item: MenuItem) {
    const token = sessionStorage.getItem("accessToken");

    // 🧱 1️⃣ Nếu chưa đăng nhập
    if (!token) {
      toast.error("⚠️ Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
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
        body: JSON.stringify({
          name: item.name,
          quantity: 1,
          price: item.price,
        }),
      });

      const text = await res.text();
      console.log("Server response:", text);

      if (!res.ok) {
        if (res.status === 401) {
          toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!");
          sessionStorage.removeItem("accessToken");
          setTimeout(() => router.push("/login"), 1500);
        } else {
          throw new Error(`❌ Lỗi ${res.status}: ${text}`);
        }
        return;
      }

      toast.success(`☕ Đã thêm "${item.name}" vào giỏ hàng!`);
    } catch (e: any) {
      console.error("Lỗi khi thêm vào giỏ hàng:", e);
      toast.error(e.message || "❌ Có lỗi xảy ra khi thêm vào giỏ hàng!");
    }
  }

  async function updateMenuItem(id: string, data: any) {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      toast.error("⚠️ Bạn chưa đăng nhập với quyền admin!");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/menu/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Cập nhật thất bại!");
      toast.success("✅ Cập nhật thành công!");
      await fetchMenu();
    } catch (err: any) {
      toast.error(err.message || "Không thể cập nhật món!");
    }
  }

  useEffect(() => {
    fetchMenu();
  }, []);

  const categories = [
    { key: "coffee", label: "☕ Cà phê" },
    { key: "drink", label: "🍹 Thức uống" },
    { key: "food", label: "🍜 Món ăn" },
    { key: "matcha", label: "🍵 Matcha" },
  ];

  const filtered = menu.filter((m) => m.category === activeCat);

  return (
    <main className="flex flex-col min-h-screen bg-[#faf7f3]">
      {/* HEADER */}
      <header className="flex justify-between items-center w-full px-8 py-4 border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <Image
            src="/coffee_chi_yeu_logo(2).png"
            alt="Điệp's Dream Logo"
            width={48}
            height={48}
          />
          <span className="font-semibold text-lg tracking-wide text-[#2F2A2C]">
            Điệp&apos;s Dream
          </span>
        </div>

        {/* NAVIGATION */}
        <div className="flex items-center space-x-6 text-sm font-medium text-[#2F2A2C] relative">
          <Link href="/">Trang chủ</Link>
          <Link href="/cart" className="relative">
            🛒
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-amber-700 text-white text-xs rounded-full px-1.5">
                {cart.length}
              </span>
            )}
          </Link>
          <UserMenu />
        </div>
      </header>

      {/* BODY */}
      <div className="flex flex-1">
        {/* SIDEBAR */}
        <aside className="w-1/5 border-r border-gray-200 p-4 bg-white/70">
          <h2 className="font-semibold mb-3 text-amber-900">Danh mục</h2>
          <ul className="space-y-2">
            {categories.map((c) => (
              <li
                key={c.key}
                onClick={() => setActiveCat(c.key)}
                className={`cursor-pointer px-3 py-2 rounded-md text-sm font-medium transition ${
                  activeCat === c.key
                    ? "bg-amber-700 text-white"
                    : "hover:bg-amber-100 text-amber-900"
                }`}
              >
                {c.label}
              </li>
            ))}
          </ul>
        </aside>

{/* MENU GRID */}
<section className="flex-1 p-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
  {filtered.length === 0 ? (
    <p className="text-gray-500 col-span-full text-center">Đang tải menu...</p>
  ) : (
    filtered.map((item) => (
      <div
        key={`${item.id || item.name}`}
        className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
      >
        <div className="w-full flex justify-center mb-3">
          <div className="w-40 h-40 rounded-full overflow-hidden border-[3px] border-amber-100 shadow-sm flex items-center justify-center bg-[#f8f5f0]">
            <Image
              src={item.imagePath || "/coffee_placeholder.png"}
              alt={item.name}
              width={160}
              height={160}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              unoptimized
            />
          </div>
        </div>


        <h3 className="font-semibold text-lg text-amber-900 text-center truncate">
          {item.name}
        </h3>
        <p className="text-gray-700 mb-3 text-center">{item.price}k</p>
        <button
          onClick={() => addToCart(item)}
          className="w-full bg-amber-700 hover:bg-amber-800 text-white py-2 rounded-full text-sm font-semibold transition"
        >
          🛒 Thêm vào giỏ
        </button>
      </div>
    ))
  )}
</section>

      </div>

      {/* FOOTER */}
      <footer className="w-full py-6 bg-[#2c1a0c] text-center text-gray-200 text-sm">
        © {new Date().getFullYear()} Điệp&apos;s Dream Coffee & More. Tất cả các quyền được bảo lưu.
      </footer>
    </main>
  );
}
