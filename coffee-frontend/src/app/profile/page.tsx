"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:3001";

type User = {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  role: string;
};

type Order = {
  _id: string;
  items: { name: string; price: number; quantity: number }[];
  total: number;
  createdAt: string;
  status: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [editing, setEditing] = useState(false);

  // 🧠 Lấy thông tin user & đơn hàng
  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    const email = sessionStorage.getItem("email");
    if (!token || !email) {
      toast.error("⚠️ Vui lòng đăng nhập!");
      setTimeout(() => (window.location.href = "/login"), 800);
      return;
    }
    fetchUser(email, token);
    fetchOrders(token);
  }, []);

  async function fetchUser(email: string, token: string) {
    try {
      const res = await fetch(`${BASE_URL}/users/email/${email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setUser(await res.json());
    } catch {
      toast.error("Không thể tải thông tin tài khoản!");
    }
  }

    async function fetchOrders(token: string) {
    try {
        const res = await fetch(`${BASE_URL}/Order/my`, {
        headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) setOrders(await res.json());
    } catch {
        toast.error("Không thể tải lịch sử đơn hàng!");
    }
    }


  // ✏️ Cập nhật thông tin
  async function updateInfo() {
    if (!user) return;
    const token = sessionStorage.getItem("accessToken");
    if (!token) return;

    const updatePromise = fetch(`${BASE_URL}/users/${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });

    await toast.promise(updatePromise, {
      loading: "Đang lưu thay đổi...",
      success: "✅ Cập nhật thông tin thành công!",
      error: "❌ Cập nhật thất bại!",
    });

    setEditing(false);
  }

  // 🚪 Đăng xuất
  function logout() {
    toast.success("Đã đăng xuất!");
    sessionStorage.clear();
    window.name = "";
    setUser(null);
    setOrders([]); // 🧹 Xóa ngay dữ liệu cũ trong UI
    setTimeout(() => (window.location.href = "/login"), 700);
  }

  // 🗑 Xóa tài khoản
  async function deleteAccount() {
    if (!user) return;
    const token = sessionStorage.getItem("accessToken");

    toast(
      (t) => (
        <div className="text-sm">
          <p className="font-medium mb-2">
            ⚠️ Bạn có chắc muốn xóa tài khoản này?
          </p>
          <div className="flex gap-2">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  const res = await fetch(`${BASE_URL}/users/${user._id}`, {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${token}` },
                  });
                  if (!res.ok) throw new Error();
                  toast.success("✅ Tài khoản đã bị xóa!");
                  sessionStorage.clear();
                  setUser(null);
                  setOrders([]);
                  setTimeout(() => (window.location.href = "/register"), 1000);
                } catch {
                  toast.error("❌ Không thể xóa tài khoản!");
                }
              }}
              className="px-3 py-1 bg-red-600 text-white rounded-md text-xs"
            >
              Xóa
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md text-xs"
            >
              Hủy
            </button>
          </div>
        </div>
      ),
      { duration: 5000 }
    );
  }

  // 🧱 Chặn render khi chưa đăng nhập hoặc user bị xóa
  const token = typeof window !== "undefined" ? sessionStorage.getItem("accessToken") : null;
  if (!token || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center text-gray-600">
        <p>Đang đăng xuất...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf7f3] text-[#2F2A2C] flex flex-col items-center justify-between">
      <div className="w-full flex-1 p-8 flex flex-col items-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-4xl flex gap-8">
          {/* 🧍‍♂️ Avatar */}
          <div className="flex-shrink-0 flex flex-col items-center">
            <img
              src="/Gemini_Generated_Image_8rmho48rmho48rmh.png"
              alt="Avatar"
              className="w-40 h-40 rounded-full border-4 border-amber-700 object-cover shadow-md"
            />
            <p className="mt-3 font-semibold text-amber-800">{user.fullName}</p>
            <p className="text-sm text-gray-500">{user.role}</p>

            <div className="flex flex-col gap-2 mt-4">
              <button
                onClick={logout}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-1 rounded-md text-sm"
              >
                🚪 Đăng xuất
              </button>
              <button
                onClick={deleteAccount}
                className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-1 rounded-md text-sm"
              >
                ❌ Xóa tài khoản
              </button>
            </div>
          </div>

          {/* 🧾 Thông tin người dùng */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-amber-800 mb-4">
              Thông tin tài khoản
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label>
                <span className="block text-sm text-gray-600">Họ và tên</span>
                <input
                  type="text"
                  value={user.fullName}
                  onChange={(e) =>
                    setUser({ ...user, fullName: e.target.value })
                  }
                  readOnly={!editing}
                  className={`w-full border rounded-lg px-3 py-2 ${
                    editing ? "bg-white border-amber-600" : "bg-gray-100"
                  }`}
                />
              </label>

              <label>
                <span className="block text-sm text-gray-600">Email</span>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-500"
                />
              </label>

              <label>
                <span className="block text-sm text-gray-600">Số điện thoại</span>
                <input
                  type="tel"
                  value={user.phoneNumber}
                  onChange={(e) =>
                    setUser({ ...user, phoneNumber: e.target.value })
                  }
                  readOnly={!editing}
                  className={`w-full border rounded-lg px-3 py-2 ${
                    editing ? "bg-white border-amber-600" : "bg-gray-100"
                  }`}
                />
              </label>

              <label>
                <span className="block text-sm text-gray-600">Địa chỉ</span>
                <input
                  type="text"
                  value={user.address}
                  onChange={(e) =>
                    setUser({ ...user, address: e.target.value })
                  }
                  readOnly={!editing}
                  className={`w-full border rounded-lg px-3 py-2 ${
                    editing ? "bg-white border-amber-600" : "bg-gray-100"
                  }`}
                />
              </label>
            </div>

            <div className="flex gap-4 mt-6">
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="px-5 py-2 rounded-md bg-amber-700 text-white hover:bg-amber-800"
                >
                  ✏️ Chỉnh sửa
                </button>
              ) : (
                <>
                  <button
                    onClick={updateInfo}
                    className="px-5 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
                  >
                    💾 Lưu
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="px-5 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
                  >
                    Hủy
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* 📜 Lịch sử đơn hàng */}
        <div className="mt-10 w-full max-w-4xl bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4 text-amber-800">
            📦 Lịch sử đặt hàng gần đây
          </h2>
          {orders.length === 0 ? (
            <p className="text-gray-500 text-sm">Chưa có đơn hàng nào</p>
          ) : (
            <ul className="space-y-4">
              {orders.map((o) => (
                <li
                  key={o._id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
                >
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
                  <div className="text-sm text-gray-600 border-t pt-2">
                    {o.items.map((it, i) => (
                      <div key={i} className="flex justify-between">
                        <span>
                          {it.name} × {it.quantity}
                        </span>
                        <span>{it.price * it.quantity}k</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-3 text-sm">
                    <span className="text-gray-500">
                      🕒 {new Date(o.createdAt).toLocaleString("vi-VN")}
                    </span>
                    <span className="font-semibold text-amber-800">
                      Tổng: {o.total}k
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <footer className="w-full py-6 bg-[#2c1a0c] text-center text-gray-200 text-sm">
        © {new Date().getFullYear()} Điệp&apos;s Dream Coffee & More.  
        Tất cả các quyền được bảo lưu.
      </footer>
    </main>
  );
}
