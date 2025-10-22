"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Đăng nhập thất bại");
      }

      const data = await res.json();

      sessionStorage.setItem("accessToken", data.accessToken);
      sessionStorage.setItem("userId", data.userId);
      sessionStorage.setItem("role", data.role);
      sessionStorage.setItem("email", data.email || "");
      sessionStorage.setItem("fullName", data.fullName || "");
      window.name = data.accessToken;

      if (data.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/menu");
      }
    } catch (err: any) {
      setError(err.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  }
 return (
    <main className="flex flex-col min-h-screen bg-gradient-to-b from-[#f9f6f2] to-[#f4e9de] text-[#2F2A2C]">
      {/* HEADER */}
      <header className="flex justify-between items-center w-full px-8 py-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <Image
            src="/coffee_chi_yeu_logo(2).png"
            alt="Điệp's Dream Logo"
            width={48}
            height={48}
            className="object-contain"
          />
          <span className="font-semibold text-lg tracking-wide text-[#2F2A2C]">
            Điệp&apos;s Dream
          </span>
        </div>

        <nav className="flex space-x-6 text-sm font-medium text-[#2F2A2C]">
          <Link href="/" className="hover:text-amber-700">Trang chủ</Link>
          <Link href="/menu" className="hover:text-amber-700">Menu</Link>
          <Link href="/register" className="hover:text-amber-700">Đăng ký</Link>
        </nav>
      </header>

      {/* FORM LOGIN */}
      <section className="flex flex-1 justify-center items-center px-6">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm space-y-5"
        >
          <h2 className="text-2xl font-semibold text-amber-900 text-center">
            Đăng nhập
          </h2>

          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 border border-red-200 p-2 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-amber-700"
              placeholder="email@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-amber-700"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-amber-700 hover:bg-amber-800 text-white py-2 rounded-md font-semibold transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Chưa có tài khoản?{" "}
            <Link href="/register" className="text-amber-700 hover:underline">
              Đăng ký ngay
            </Link>
          </p>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="w-full py-6 bg-[#2c1a0c] text-center text-gray-200 text-sm">
        © {new Date().getFullYear()} Điệp&apos;s Dream Coffee & More.  
        Tất cả các quyền được bảo lưu.
      </footer>
    </main>
  );
}
