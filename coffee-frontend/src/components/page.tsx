"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function UserMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<{ email: string; fullName: string; role: string } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    const email = sessionStorage.getItem("email");
    const fullName = sessionStorage.getItem("fullName");
    const role = sessionStorage.getItem("role");
    if (token && email) setUser({ email, fullName: fullName || "", role: role || "user" });

    // Đóng dropdown khi click ra ngoài
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  function handleLogout() {
    sessionStorage.clear();
    window.name = "";
    setUser(null);
    router.push("/login");
  }

  return (
    <div className="relative" ref={menuRef}>
      {/* 🧍‍♂️ Avatar / Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 focus:outline-none"
      >
        <Image
          src="/Gemini_Generated_Image_8rmho48rmho48rmh.png"
          alt="User"
          width={30}
          height={30}
          className="rounded-full border border-gray-300"
        />
        {user ? (
          <span className="text-gray-800 font-medium">{user.fullName || "Người dùng"}</span>
        ) : (
          <span className="text-amber-700 hover:underline text-sm">Đăng nhập</span>
        )}
      </button>

      {/* 🔽 Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden z-50">
          {user ? (
            <>
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-amber-800">{user.fullName}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
              <button
                onClick={() => router.push("/profile")}
                className="w-full text-left px-4 py-2 text-sm hover:bg-amber-50"
              >
                Thông tin tài khoản
              </button>
              {user.role === "admin" && (
                <button
                  onClick={() => router.push("/admin")}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-amber-50"
                >
                  Quản trị viên
                </button>
              )}
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => router.push("/login")}
                className="w-full text-left px-4 py-2 text-sm hover:bg-amber-50"
              >
                Đăng nhập
              </button>
              <button
                onClick={() => router.push("/register")}
                className="w-full text-left px-4 py-2 text-sm hover:bg-amber-50"
              >
                Đăng ký
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
