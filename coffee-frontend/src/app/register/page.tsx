"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
const BASE_URL = "http://localhost:3001";
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

    async function handleRegister(e:React.FormEvent) {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const res = await fetch(`${BASE_URL}/users/register`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    email,
                    password,
                    fullName,
                    phoneNumber,
                    address,
                }),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || "Đăng ký thất bại");
            }

            const data = await res.json();
            setSuccess("Đăng ký thành công! Đang chuyển sang đăng nhập...");
            setTimeout(() => router.push("/login"), 1500);
        } catch (err: any){
            setError(err.message || "Đăng ký thất bại");
        } finally {
            setLoading(false);
        }
    }
  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-b from-[#f9f6f2] to-[#f4e9de] text-[#2F2A2C]">
      {/* 🟤 HEADER */}
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
          <Link href="/login" className="hover:text-amber-700">Đăng nhập</Link>
        </nav>
      </header>

      {/* 🟤 FORM REGISTER */}
      <section className="flex flex-1 justify-center items-center px-6">
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
            className={`w-full bg-amber-700 hover:bg-amber-800 text-white py-2 rounded-md font-semibold transition ${
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

      {/* 🟤 FOOTER */}
      <footer className="w-full py-6 bg-[#2c1a0c] text-center text-gray-200 text-sm">
        © {new Date().getFullYear()} Điệp&apos;s Dream Coffee & More.  
        Tất cả các quyền được bảo lưu.
      </footer>
    </main>
  );
}
