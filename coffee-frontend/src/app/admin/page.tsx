"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export default function AdminPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"menu" | "orders">("menu");
  const [menu, setMenu] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    category: "coffee",
    imagePath: "",
    available: true,
  });

  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    category: "coffee",
    imagePath: "",
  });

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    const role = sessionStorage.getItem("role");
    if (!token || role !== "admin") {
      alert("Bạn không có quyền truy cập!");
      router.push("/login");
      return;
    }
    fetchMenu();
    fetchOrders();
  }, []);

  async function fetchMenu() {
    try {
      const res = await fetch(`${BASE_URL}/menu`);
      const data = await res.json();
      setMenu(data);
    } catch (err) {
      console.error("Lỗi tải menu:", err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchOrders() {
    try {
      const token = sessionStorage.getItem("accessToken");
      const res = await fetch(`${BASE_URL}/Order`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Lỗi tải đơn hàng:", err);
    }
  }

  async function searchOrders(query: string) {
    try {
      const token = sessionStorage.getItem("accessToken");
      const res = await fetch(
        `${BASE_URL}/Order/search?query=${encodeURIComponent(query)}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.ok) throw new Error("Không tìm thấy đơn hàng phù hợp!");
      const data = await res.json();
      setOrders(data);
    } catch (err: any) {
      alert(err.message);
    }
  }

  async function addMenuItem(e: any) {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("accessToken");
      const res = await fetch(`${BASE_URL}/menu`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...newItem,
          price: Number(newItem.price),
        }),
      });
      if (!res.ok) throw new Error("Thêm món thất bại!");
      alert("Đã thêm món mới!");
      setNewItem({
        name: "",
        price: "",
        category: "coffee",
        imagePath: "",
        available: true,
      });
      fetchMenu();
    } catch (err: any) {
      alert(err.message);
    }
  }

  function openEdit(item: any) {
    setEditingItem(item);
    setEditForm({
      name: item.name,
      price: item.price,
      category: item.category,
      imagePath: item.imagePath || "",
    });
  }

  async function saveEdit() {
    try {
      const token = sessionStorage.getItem("accessToken");
      const res = await fetch(`${BASE_URL}/menu/${editingItem._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...editForm,
          price: Number(editForm.price),
        }),
      });
      if (!res.ok) throw new Error("Cập nhật thất bại!");
      alert("Đã cập nhật món!");
      setEditingItem(null);
      fetchMenu();
    } catch (err: any) {
      alert(err.message);
    }
  }

  async function deleteMenuItem(id: string) {
    if (!confirm("Bạn có chắc muốn xóa món này?")) return;
    try {
      const token = sessionStorage.getItem("accessToken");
      const res = await fetch(`${BASE_URL}/menu/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Xóa thất bại!");
      alert("Đã xóa món!");
      fetchMenu();
    } catch (err: any) {
      alert(err.message);
    }
  }
  async function updateStatus(id: string, status: string) {
    try {
      const token = sessionStorage.getItem("accessToken");
      const res = await fetch(`${BASE_URL}/Order/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Không thể cập nhật trạng thái!");
      alert("Đã cập nhật trạng thái đơn!");
      fetchOrders();
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <main className="min-h-screen bg-[#faf7f3] text-[#2F2A2C] flex flex-col">
      {/* HEADER */}
      <header className="flex justify-between items-center w-full px-8 py-4 border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <Image src="/coffee_chi_yeu_logo(2).png" alt="Điệp's Dream" width={42} height={42} />
          <span className="font-semibold text-lg">Admin Dashboard</span>
        </div>
        <button onClick={() => router.push("/menu")} className="text-sm text-amber-700 hover:underline">
          ← Quay lại Menu
        </button>
      </header>

      {/* TAB BUTTONS */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => setActiveTab("menu")}
          className={`px-4 py-2 rounded-md font-medium ${
            activeTab === "menu"
              ? "bg-amber-700 text-white"
              : "bg-white text-amber-700 border border-amber-300"
          }`}
        >
          Quản lý Menu
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-4 py-2 rounded-md font-medium ${
            activeTab === "orders"
              ? "bg-amber-700 text-white"
              : "bg-white text-amber-700 border border-amber-300"
          }`}
        >
          Đơn hàng
        </button>
      </div>

      {/* NỘI DUNG */}
      <section className="flex-1 p-8">
        {loading ? (
          <p className="text-center text-gray-500">Đang tải...</p>
        ) : activeTab === "menu" ? (
          <>
            {/* FORM THÊM MÓN */}
            <form
              onSubmit={addMenuItem}
              className="max-w-2xl mx-auto bg-white shadow rounded-xl p-6 mb-6 space-y-4"
            >
              <h2 className="text-lg font-semibold text-amber-800">Thêm món mới</h2>
              <input
                type="text"
                placeholder="Tên món"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                className="w-full border px-3 py-2 rounded-md"
                required
              />
              <input
                type="number"
                placeholder="Giá (k)"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                className="w-full border px-3 py-2 rounded-md"
                required
              />
              <input
                type="text"
                placeholder="Đường dẫn ảnh (/image.png)"
                value={newItem.imagePath}
                onChange={(e) => setNewItem({ ...newItem, imagePath: e.target.value })}
                className="w-full border px-3 py-2 rounded-md"
              />
              <select
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                className="border px-3 py-2 rounded-md w-full"
              >
                <option value="coffee">Coffee</option>
                <option value="drink">Drink</option>
                <option value="food">Food</option>
                <option value="matcha">Matcha</option>
              </select>
              <button type="submit" className="w-full bg-amber-700 hover:bg-amber-800 text-white py-2 rounded-md">
                Thêm món
              </button>
            </form>

            {/* DANH SÁCH MENU */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {menu.map((m) => (
                <div key={m._id} className="bg-white rounded-xl shadow p-4 hover:shadow-md transition flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-amber-900">{m.name}</h3>
                    <p className="text-gray-600">{m.category}</p>
                    <p className="font-medium mt-1">{m.price}k</p>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => openEdit(m)}
                      className="flex-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 py-1 rounded-md text-sm"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => deleteMenuItem(m._id)}
                      className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 py-1 rounded-md text-sm"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          // ==== QUẢN LÝ ĐƠN HÀNG ====
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold text-amber-800 mb-4">Quản lý đơn hàng</h2>
            <div className="mb-6 flex gap-3 justify-center">
              <input
                type="text"
                id="searchInput"
                placeholder="Tìm theo tên, email hoặc số điện thoại..."
                className="border border-gray-300 rounded-md px-3 py-2 w-80 focus:border-amber-700 focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const val = (e.target as HTMLInputElement).value.trim();
                    if (val) searchOrders(val);
                  }
                }}
              />
              <button
                onClick={() => {
                  const input = document.getElementById("searchInput") as HTMLInputElement;
                  const val = input?.value.trim();
                  if (val) searchOrders(val);
                }}
                className="px-4 py-2 bg-amber-700 text-white rounded-md hover:bg-amber-800"
              >
                Tìm kiếm
              </button>
              <button
                onClick={fetchOrders}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Làm mới
              </button>
            </div>

            <ul className="space-y-4">
              {orders.map((o) => (
                <li key={o._id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-amber-700">
                      Mã: {o._id.slice(-6).toUpperCase()}
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
                  <div className="text-sm text-gray-700 border-t pt-2 space-y-1">
                    {o.items.map((i: any, idx: number) => (
                      <div key={idx} className="flex justify-between text-gray-700">
                        <span>
                          {i.name} ×{i.quantity}
                        </span>
                        <span>{i.price * i.quantity}k</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-3 text-sm text-gray-600">
                    <span>{o.phoneNumber || "Không rõ"}</span>
                    <span>{new Date(o.createdAt).toLocaleString("vi-VN")}</span>
                    <span className="font-semibold text-amber-800">Tổng: {o.total}k</span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    {["pending", "preparing", "done", "cancelled"].map((s) => (
                      <button
                        key={s}
                        onClick={() => updateStatus(o._id, s)}
                        className={`px-3 py-1 rounded-md text-sm ${
                          o.status === s
                            ? "bg-amber-700 text-white"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* === MODAL SỬA MÓN === */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-96 shadow-xl">
            <h2 className="text-lg font-semibold text-amber-800 mb-4">Chỉnh sửa món</h2>
            <div className="space-y-3">
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                placeholder="Tên món"
                className="w-full border px-3 py-2 rounded-md"
              />
              <input
                type="number"
                value={editForm.price}
                onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                placeholder="Giá (k)"
                className="w-full border px-3 py-2 rounded-md"
              />
              <input
                type="text"
                value={editForm.imagePath}
                onChange={(e) => setEditForm({ ...editForm, imagePath: e.target.value })}
                placeholder="Đường dẫn ảnh"
                className="w-full border px-3 py-2 rounded-md"
              />
              <select
                value={editForm.category}
                onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                className="w-full border px-3 py-2 rounded-md"
              >
                <option value="coffee">Coffee</option>
                <option value="drink">Drink</option>
                <option value="food">Food</option>
                <option value="matcha">Matcha</option>
              </select>
            </div>
            <div className="flex justify-between mt-5">
              <button
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
              >
                Hủy
              </button>
              <button
                onClick={saveEdit}
                className="px-4 py-2 rounded-md bg-amber-700 text-white hover:bg-amber-800"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
