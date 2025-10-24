"use client"
import "@fontsource/great-vibes";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [avatar, setAvatar] = useState("/Gemini_Generated_Image_8rmho48rmho48rmh.png");
  const [fullName, setFullName] = useState("");

useEffect(() => {
  const token = sessionStorage.getItem("accessToken");
  const name = sessionStorage.getItem("fullName");
  if (token) {
    setIsLoggedIn(true);
    setFullName(name || "");
  } else {
    setIsLoggedIn(false);
  }
}, []);

  return (
    <main className="flex flex-col items-center w-full">
      {/* HEADER / NAVBAR SANG TRỌNG */}
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
            <Link
              href="/"
              className="text-[#3a2a1a] hover:text-amber-700 transition-colors duration-200"
            >
              Trang chủ
            </Link>
            <Link
              href="/menu"
              className="text-[#3a2a1a] hover:text-amber-700 transition-colors duration-200"
            >
              Menu
            </Link>

            {isLoggedIn ? (
              <Link
                href="/profile"
                className="flex items-center space-x-2 group"
              >
                <Image
                  src={avatar}
                  alt="Avatar"
                  width={36}
                  height={36}
                  className="rounded-full border border-amber-700 shadow-sm group-hover:scale-105 transition-transform"
                />
                <span className="text-sm font-medium text-amber-800 group-hover:text-amber-700">
                  {fullName || "Người dùng"}
                </span>
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-[#3a2a1a] hover:text-amber-700 transition-colors duration-200"
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-800 hover:to-amber-700 text-white px-5 py-1.5 rounded-full shadow-sm transition-all duration-200 font-semibold"
                >
                  Đăng ký
                </Link>
              </>
            )}
          </nav>

          {/* Mobile toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <button className="p-2 rounded-md hover:bg-amber-50 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#3a2a1a]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 8h16M4 16h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

{/* SECTION 1 — POSTER THƯƠNG HIỆU */}
<section className="relative w-full h-[85vh] flex flex-col items-center justify-center bg-gradient-to-b from-[#f9f6f2] to-[#f4e9de] text-center text-amber-900 overflow-hidden">
  {/* 🌤 Lớp ánh sáng mờ pastel */}
  <div className="absolute inset-0 bg-[linear-gradient(115deg,#f9f6f2_0%,#f4e9de_30%,#f6d9c7_60%,#f9f6f2_100%)] opacity-80 blur-sm"></div>

  {/* Tiêu đề thương hiệu */}
  <h1
    className="relative text-6xl md:text-8xl mb-3 tracking-wide drop-shadow-sm"
    style={{ fontFamily: '"Great Vibes", cursive' }}
  >
    Điệp&apos;s Dream

    {/* Bướm đậu nhẹ cuối chữ “m” */}
    <div className="absolute -right-6 -top-8 md:-right-32 md:-top-12 opacity-90">
      <Image
        src="/Coffee_chi_yeu(5).png"
        alt="Butterfly"
        width={240}
        height={240}
        className="animate-[float_3s_ease-in-out_infinite] drop-shadow-[0_0_6px_rgba(243,201,220,0.7)]"
      />
    </div>
  </h1>

  {/* Dòng phụ */}
  <p className="uppercase tracking-[.25em] text-lg text-amber-800 mb-6 relative">
    Coffee &amp; More
  </p>

  {/* Nút xem menu */}
  <Link
    href="/menu"
    className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded-full font-semibold transition relative"
  >
    Xem menu
  </Link>

  {/* Keyframes bay nhẹ */}
  <style jsx>{`
    @keyframes float {
      0%, 100% {
        transform: translateY(0px) rotate(0deg);
      }
      50% {
        transform: translateY(-3px) rotate(2deg);
      }
    }
  `}</style>
  
</section>

      {/* SECTION 2 — GIỚI THIỆU / NỘI DUNG GIỮA */}
      <section className="flex flex-col md:flex-row items-center justify-center w-full py-20 px-6 bg-[#faf7f3] gap-10">
        <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
          <h2 className="text-3xl font-semibold text-amber-900">
            Hương vị của giấc mơ
          </h2>
          <p className="text-gray-700 leading-relaxed max-w-lg">
            “Điệp’s Dream” là nơi những câu chuyện bắt đầu từ một tách cà phê.  
            Chúng tôi mang đến hương vị tinh tế, không gian yên bình,  
            và cảm giác mà bạn chỉ có thể tìm thấy ở một nơi thật sự đặc biệt.
          </p>
          <Link
            href="/menu"
            className="inline-block mt-4 bg-amber-700 hover:bg-amber-800 text-white px-5 py-2 rounded-full"
          >
            Khám phá hương vị
          </Link>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="/Coffee_chi_yeu(6).png"
            alt="Logo Điệp's Dream"
            width={1000}
            height={1000}
            className="object-contain"
          />
        </div>
      </section>

      {/* SECTION 3 — ẢNH ĐƠN HÀNG / KHUYẾN MÃI */}
      <section className="flex flex-col md:flex-row items-center justify-between w-full bg-white py-20 px-8 border-t border-gray-100">
        <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
          <Image
            src="/coffe_ra.png"
            alt="Ưu đãi thương hiệu Điệp's Dream"
            width={600}
            height={400}
            className="rounded-lg shadow-lg object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 text-center md:text-left md:pl-10 space-y-4">
          <h3 className="text-3xl font-semibold text-amber-900">
            Ưu đãi tháng này
          </h3>
          <p className="text-gray-700 max-w-md leading-relaxed">
            Chào mừng bạn đến với Diep's Dream Coffee!

          Hãy bắt đầu hành trình của bạn bằng cách Đặt đơn đầu tiên ngay hôm nay để nhận ngay Ưu đãi Độc Quyền dành riêng cho bạn.

          Đắm mình trong hương vị cà phê thơm lừng, chất lượng tuyệt hảo. Hãy để mỗi giọt cà phê của chúng tôi tiếp thêm năng lượng, cùng bạn chinh phục và thực hiện những giấc mơ lớn lao.
          </p>
          <Link
            href="/menu"
            className="inline-block bg-amber-700 hover:bg-amber-800 text-white px-5 py-2 rounded-full"
          >
            Đặt ngay
          </Link>
        </div>
      </section>

      {/* SECTION 3 — ẢNH ĐƠN HÀNG / KHUYẾN MÃI */}
      <section className="flex flex-col md:flex-row-reverse items-center justify-between w-full bg-[#f8eee4] py-20 px-8 border-t border-[#e6d3c2]">
        {/* Ảnh bên phải */}
        <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
          <Image
            src="/discount_chi_yeu(1).png"
            alt="Ưu đãi thương hiệu Điệp's Dream"
            width={600}
            height={400}
            className="rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.15)] object-cover"
          />
        </div>

        {/* Nội dung bên trái */}
        <div className="w-full md:w-1/2 text-center md:text-left md:pr-10 space-y-4">
          <h3 className="text-3xl font-semibold text-[#3d2f2f] drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
            Ưu đãi tháng này
          </h3>

          <p className="text-[#4a3d3d] max-w-md leading-relaxed">
            Đặt đơn hàng đầu tiên và nhận ngay ưu đãi đặc biệt dành riêng cho bạn.  
            Tận hưởng ly cà phê thơm lừng và để chúng tôi đồng hành cùng giấc mơ của bạn.
          </p>

          <Link
            href="/menu"
            className="inline-block bg-amber-700 hover:bg-amber-800 text-white px-6 py-2 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.15)] transition"
          >
            Đặt ngay
          </Link>
        </div>
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
