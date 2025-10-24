"use client";
import "@fontsource/great-vibes";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, fullName, phoneNumber, address }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Đăng ký thất bại");
      }

      setSuccess("Đăng ký thành công! Đang chuyển sang đăng nhập...");
      setTimeout(() => router.push("/login"), 1500);
    } catch (err: any) {
      setError(err.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-b from-[#f9f6f2] to-[#f4e9de] text-[#2F2A2C]">
      {/* HEADER / NAVBAR sang trọng */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-amber-100 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex justify-between items-center">
          {/* Logo + Brand */}
          <div className="flex items-center space-x-3">
            <Image
              src="/coffee_chi_yeu_logo(2).png"
              alt="Điệp's Dream Logo"
              width={46}
              height={46}
              className="object-contain drop-shadow-md"
            />
            <span className="font-serif text-[1.45rem] tracking-wide text-[#3a2a1a] select-none">
              Điệp&apos;s <span className="text-amber-700 italic">Dream</span>
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8 font-medium text-[0.95rem]">
            <Link href="/" className="text-[#3a2a1a] hover:text-amber-700 transition-colors">
              Trang chủ
            </Link>
            <Link href="/menu" className="text-[#3a2a1a] hover:text-amber-700 transition-colors">
              Menu
            </Link>
            <Link href="/login" className="text-[#3a2a1a] hover:text-amber-700 transition-colors">
              Đăng nhập
            </Link>
            <Link
              href="/register"
              className="bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-800 hover:to-amber-700 text-white px-5 py-1.5 rounded-full shadow-sm transition-all font-semibold"
            >
              Đăng ký
            </Link>
          </nav>
        </div>
      </header>

      {/* FORM REGISTER */}
      <section className="flex justify-center items-center px-6 pt-24 pb-20 min-h-[calc(135vh-210px)]">
        <form
          onSubmit={handleRegister}
          className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm space-y-5"
        >
          <h2 className="text-2xl font-semibold text-amber-900 text-center">
            Tạo tài khoản
          </h2>

          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 border border-red-200 p-2 rounded">
              {error}
            </div>
          )}
          {success && (
            <div className="text-green-700 text-sm text-center bg-green-50 border border-green-200 p-2 rounded">
              {success}
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-700 mb-1">Họ và tên</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-amber-700"
              placeholder="Nguyễn Văn A"
              required
            />
          </div>

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

          <div>
            <label className="block text-sm text-gray-700 mb-1">Số điện thoại</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-amber-700"
              placeholder="090xxxxxxx"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Địa chỉ</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-amber-700"
              placeholder="Số nhà, đường, phường, quận..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-800 hover:to-amber-700 text-white py-2 rounded-md font-semibold transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Đã có tài khoản?{" "}
            <Link href="/login" className="text-amber-700 hover:underline">
              Đăng nhập
            </Link>
          </p>
        </form>
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
