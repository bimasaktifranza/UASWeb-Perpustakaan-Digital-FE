import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Menu, X, Home, Book, User, LogOut, Bell, BookOpen, BarChart2, Search, Star} from "lucide-react";
import { motion } from "framer-motion";

function Dashboard() {
  const today = new Date();
  const formattedDate = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(today);

  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookTypeFilter, setBookTypeFilter] = useState("all");

  // Tambahan: state untuk review
  const [selectedBook, setSelectedBook] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState({}); // { judulBuku: { rating, reviewText } }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleNotif = () => {
    setIsNotifOpen(!isNotifOpen);
  };

  const notifications = [
    "Update buku terbaru: Cantik Itu Luka",
    "Pengumuman: Libur nasional",
    "Perpustakaan tutup jam 5 sore",
  ];

  const sidebarItems = [
    { label: "Dashboard", path: "/dashboard", icon: <Home size={16} /> },
    { label: "Daftar Buku", path: "/buku", icon: <Book size={16} /> },
    { label: "Profil", path: "/profil", icon: <User size={16} /> },
  ];

  const popularBooks = [
    {
      judul: "Buku Sakti Pemrograman Web",
      penulis: "Didik Setiawan",
      cover:
        "https://cdn.gramedia.com/uploads/picture_meta/2023/1/19/d6c2ynfcdbjkzuu4gllr5b.jpg",
      kategori: "non-fiksi",
    },
    {
      judul: "Laskar Pelangi",
      penulis: "Andrea Hirata",
      cover:
        "https://upload.wikimedia.org/wikipedia/id/thumb/8/8e/Laskar_pelangi_sampul.jpg/250px-Laskar_pelangi_sampul.jpg",
      kategori: "fiksi",
    },
    {
      judul: "Buku Jago Bola Voli",
      penulis: "Ikbal Tawakal",
      cover: "https://cdn.gramedia.com/uploads/items/Voli.jpg",
      kategori: "non-fiksi",
    },
    {
      judul: "Pemrograman Web",
      penulis: "Agusriandi",
      cover:
        "https://id-test-11.slatic.net/p/2fdc1ca008deb541060b7bd9558316a8.jpg",
      kategori: "non-fiksi",
    },
  ];

  const filteredBooks = popularBooks.filter((book) => {
    const matchesSearch = book.judul
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType =
      bookTypeFilter === "all" || book.kategori === bookTypeFilter;
    return matchesSearch && matchesType;
  });

  // Fungsi buka modal review
  const openReviewModal = (book) => {
    setSelectedBook(book);
    setReviewText("");
    setRating(0);
  };

  // Fungsi simpan review
  const saveReview = () => {
    setReviews((prev) => ({
      ...prev,
      [selectedBook.judul]: { reviewText, rating },
    }));
    setSelectedBook(null);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#fefae0] font-serif text-[#2e2e2e]">
      {/* Sidebar */}
      <aside
        className={`fixed z-40 top-0 left-0 h-full w-[220px] bg-[#3e1f0d] text-[#fefae0] p-4 flex flex-col transform transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* ...sidebar content... */}
        <div className="flex justify-between items-center mb-4 md:hidden">
          <div className="text-lg font-bold">One IT Library</div>
          <button onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>

        <div className="text-center mb-6 hidden md:block">
          <div className="text-xl font-bold mb-3">One IT Library</div>
        </div>

        <ul className="list-none space-y-2 mt-4 flex-1">
          {sidebarItems.map((item) => (
            <li
              key={item.label}
              className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-[#5a1616] text-sm"
              onClick={() => {
                navigate(item.path);
                setIsSidebarOpen(false);
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-4 border-t border-[#fefae0]">
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 w-full text-sm font-bold px-2 py-2 rounded hover:bg-[#5a1616]"
          >
            <LogOut size={16} />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Header */}
        <header className="p-4 bg-[#fffdf5] flex justify-between items-center border-b border-gray-300">
          <div className="flex items-center gap-3">
            <button onClick={toggleSidebar} className="md:hidden text-[#3e1f0d]">
              <Menu size={24} />
            </button>
            <h2 className="text-base md:text-lg font-semibold text-[#3e1f0d]">
              One-IT Library
            </h2>
          </div>
          <div className="flex items-center gap-3 relative">
            <span className="text-xs md:text-sm">{formattedDate}</span>
            <div className="relative">
              <button
                onClick={toggleNotif}
                className="p-2 rounded-full hover:bg-gray-200"
              >
                <Bell size={18} className="text-[#3e1f0d]" />
              </button>
              {isNotifOpen && (
                <div className="absolute right-0 mt-1 w-56 bg-white rounded shadow border z-50">
                  <ul className="max-h-48 overflow-y-auto">
                    {notifications.map((note, idx) => (
                      <li
                        key={idx}
                        className="px-4 py-2 text-sm text-gray-700 border-b last:border-b-0 hover:bg-gray-100 cursor-pointer"
                        onClick={() => alert(`Kamu klik notifikasi: "${note}"`)}
                      >
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-4 md:p-6"
        >
          {/* Quick Access */}
          <section className="flex gap-2 mb-4 justify-center md:justify-start">
            <button
              onClick={() => navigate("/buku")}
              className="bg-[#3e1f0d] text-[#fefae0] px-4 py-1.5 rounded-full text-xs font-bold hover:bg-[#2a0707]"
            >
              📚 Pinjam Sekarang
            </button>
          </section>

          {/* Rekomendasi Buku */}
          <section className="mb-6">
            <h3 className="text-[#3e1f0d] mb-2 text-lg font-semibold">
              📖 Rekomendasi Buku Populer
            </h3>
            <div className="flex gap-2 mb-4">
              <div className="flex w-full border rounded overflow-hidden">
                <input
                  type="text"
                  placeholder="Cari buku..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-2 py-1 text-sm outline-none"
                />
                <button className="flex items-center justify-center px-3 bg-[#3e1f0d] text-[#fefae0]">
                  <Search size={16} />
                </button>
              </div>
              <select
                value={bookTypeFilter}
                onChange={(e) => setBookTypeFilter(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              >
                <option value="all">Semua</option>
                <option value="fiksi">Fiksi</option>
                <option value="non-fiksi">Non-Fiksi</option>
              </select>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredBooks.map((book, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg shadow p-2 flex flex-col items-center hover:shadow-lg cursor-pointer transition-shadow"
                >
                  <img
                    src={book.cover}
                    alt={book.judul}
                    className="w-full h-40 object-cover rounded-md mb-2"
                  />
                  <h4 className="text-sm font-semibold text-center">
                    {book.judul}
                  </h4>
                  <p className="text-xs text-gray-600">{book.penulis}</p>

                  {/* Review & Rating */}
                  {reviews[book.judul] && (
                    <div className="mt-1 text-xs text-yellow-600 text-center">
                      ⭐ {reviews[book.judul].rating} - "{reviews[book.judul].reviewText}"
                    </div>
                  )}

                  <button
                    onClick={() => openReviewModal(book)}
                    className="mt-2 text-xs text-blue-500 underline"
                  >
                    Tulis Review
                  </button>
                </div>
              ))}
            </div>
          </section>
        </motion.main>

        {/* Footer */}
        <footer className="mt-8 p-4 text-sm text-gray-600 text-center">
          &copy; {new Date().getFullYear()} Perpustakaan Digital
        </footer>
      </div>

      {/* Modal Review */}
      {selectedBook && (
        <div className="fixed inset-0 bg-[#fefae0] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow w-80">
            <h3 className="text-sm font-semibold mb-2">
              Tulis Review untuk "{selectedBook.judul}"
            </h3>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Tulis review..."
              className="w-full border rounded p-1 mb-2 text-sm"
            />
            <div className="flex items-center gap-1 mb-2">
              <span className="text-xs">Rating:</span>
              {[1, 2, 3, 4, 5].map((num) => (
                <Star
                  key={num}
                  size={16}
                  className={`cursor-pointer ${
                    rating >= num ? "text-yellow-500" : "text-gray-400"
                  }`}
                  onClick={() => setRating(num)}
                />
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedBook(null)}
                className="text-xs px-2 py-1 border rounded"
              >
                Batal
              </button>
              <button
                onClick={saveReview}
                className="text-xs px-2 py-1 bg-blue-500 text-white rounded"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
