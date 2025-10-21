"use client"
import "@fontsource/great-vibes";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center w-full">
{/* 🟤 HEADER / NAVBAR TỐI GIẢN & SANG HƠN */}
<header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm transition-all">
  <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex justify-between items-center">
    
    {/* Logo + Brand */}
    <div className="flex items-center space-x-3">
      <Image
        src="/coffee_chi_yeu_logo(2).png"
        alt="Điệp's Dream Logo"
        width={42}
        height={42}
        className="object-contain"
      />
      <span className="font-semibold text-lg md:text-xl tracking-wide text-[#2F2A2C]">
        Điệp&apos;s Dream
      </span>
    </div>

    {/* Navigation */}
    <nav className="hidden md:flex items-center space-x-8 font-medium text-sm text-[#2F2A2C]">
      <Link
        href="/"
        className="hover:text-amber-700 transition-colors"
      >
        Trang chủ
      </Link>
      <Link
        href="/menu"
        className="hover:text-amber-700 transition-colors"
      >
        Menu
      </Link>
      <Link
        href="/login"
        className="hover:text-amber-700 transition-colors"
      >
        Đăng nhập
      </Link>
      <Link
        href="/register"
        className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-1.5 rounded-full shadow-sm transition-all"
      >
        Đăng ký
      </Link>
    </nav>

    {/* Icon / Mobile toggle */}
    <div className="md:hidden flex items-center space-x-2">
      <button className="p-2 rounded-md hover:bg-gray-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-[#2F2A2C]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
        </svg>
      </button>
    </div>
  </div>
</header>

{/* 🟤 SECTION 1 — POSTER THƯƠNG HIỆU */}
<section className="relative w-full h-[85vh] flex flex-col items-center justify-center bg-gradient-to-b from-[#f9f6f2] to-[#f4e9de] text-center text-amber-900 overflow-hidden">
  {/* 🌤 Lớp ánh sáng mờ pastel */}
  <div className="absolute inset-0 bg-[linear-gradient(115deg,#f9f6f2_0%,#f4e9de_30%,#f6d9c7_60%,#f9f6f2_100%)] opacity-80 blur-sm"></div>

  {/* ✨ Tiêu đề thương hiệu */}
  <h1
    className="relative text-6xl md:text-8xl mb-3 tracking-wide drop-shadow-sm"
    style={{ fontFamily: '"Great Vibes", cursive' }}
  >
    Điệp&apos;s Dream

    {/* 🦋 Bướm đậu nhẹ cuối chữ “m” */}
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

  {/* ☕ Dòng phụ */}
  <p className="uppercase tracking-[.25em] text-lg text-amber-800 mb-6 relative">
    Coffee &amp; More
  </p>

  {/* 🔘 Nút xem menu */}
  <Link
    href="/menu"
    className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded-full font-semibold transition relative"
  >
    Xem menu
  </Link>

  {/* 💫 Keyframes bay nhẹ */}
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

      {/* 🟤 SECTION 2 — GIỚI THIỆU / NỘI DUNG GIỮA */}
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

      {/* 🟤 SECTION 3 — ẢNH ĐƠN HÀNG / KHUYẾN MÃI */}
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
            Ưu đãi tháng này 🌿
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

      {/* 🟤 SECTION 3 — ẢNH ĐƠN HÀNG / KHUYẾN MÃI */}
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
            Ưu đãi tháng này 🌿
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


      {/* 🟤 FOOTER */}
      <footer className="w-full py-6 bg-[#2c1a0c] text-center text-gray-200 text-sm">
        © {new Date().getFullYear()} Điệp&apos;s Dream Coffee & More.  
        Tất cả các quyền được bảo lưu.
      </footer>
    </main>
  );
}
