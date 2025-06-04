import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Menu, X, Bell, Search, Star, LogOut} from "lucide-react";
import {FaTachometerAlt, FaBook, FaUser, FaHome,} from "react-icons/fa";
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

  const [selectedBook, setSelectedBook] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState({});

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleNotif = () => setIsNotifOpen(!isNotifOpen);

  const notifications = [
    "Update buku terbaru: Cantik Itu Luka",
    "Pengumuman: Libur nasional",
    "Perpustakaan tutup jam 5 sore",
  ];

  const sidebarItems = [
    { label: "Dashboard", path: "/dashboard", icon: <FaHome size={16} /> },
    { label: "Daftar Buku", path: "/buku", icon: <FaBook size={16} /> },
    { label: "Profil", path: "/profil", icon: <FaUser size={16} /> },
  ];

  const popularBooks = [
    {
      judul: "Buku Sakti Pemrograman Web",
      penulis: "Didik Setiawan",
      cover: "https://cdn.gramedia.com/uploads/picture_meta/2023/1/19/d6c2ynfcdbjkzuu4gllr5b.jpg",
      kategori: "non-fiksi",
    },
    {
      judul: "Laskar Pelangi",
      penulis: "Andrea Hirata",
      cover: "https://upload.wikimedia.org/wikipedia/id/thumb/8/8e/Laskar_pelangi_sampul.jpg/250px-Laskar_pelangi_sampul.jpg",
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
      cover: "https://id-test-11.slatic.net/p/2fdc1ca008deb541060b7bd9558316a8.jpg",
      kategori: "non-fiksi",
    },
    {
      judul: "Laporan Tahunan",
      penulis: "Cahaya Dewi",
      cover: "https://marketplace.canva.com/EAFrIXNBb48/2/0/1003w/canva-biru-modern-laporan-tahunan-sampul-buku-9Ok4whGdElQ.jpg",
      kategori: "non-fiksi",
    },
  ];

  const filteredBooks = popularBooks.filter((book) => {
    const matchesSearch = book.judul.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = bookTypeFilter === "all" || book.kategori === bookTypeFilter;
    return matchesSearch && matchesType;
  });

  const openReviewModal = (book) => {
    setSelectedBook(book);
    setReviewText("");
    setRating(0);
  };

  const saveReview = () => {
    setReviews((prev) => ({
      ...prev,
      [selectedBook.judul]: { reviewText, rating },
    }));
    setSelectedBook(null);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-[#fefae0] via-[#fcf7e8] to-[#faf4e0] font-serif text-[#2e2e2e]">
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed z-40 top-0 left-0 h-full w-[240px] bg-gradient-to-b from-[#3e1f0d] via-[#4a2515] to-[#3e1f0d] text-[#fefae0] p-6 flex flex-col transform transition-transform duration-300 ease-in-out md:static md:translate-x-0 shadow-2xl ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center mb-6 md:hidden">
          <div className="text-lg font-bold text-[#ffd60a]">One IT Library</div>
          <button 
            onClick={toggleSidebar}
            className="p-1 rounded-full hover:bg-[#5a1616] transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="text-center mb-8 hidden md:block">
          <div className="text-2xl font-bold mb-2 text-[#fefae0] drop-shadow-lg">One IT Library</div>
        </div>

        <ul className="list-none space-y-3 mt-4 flex-1">
          {sidebarItems.map((item, index) => (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-gradient-to-r hover:from-[#5a1616] hover:to-[#6b1e1e] transition-all duration-300 text-sm group hover:scale-105 hover:shadow-lg"
              onClick={() => {
                navigate(item.path);
                setIsSidebarOpen(false);
              }}
            >
              <div className="group-hover:scale-110 transition-transform duration-200">
                {item.icon}
              </div>
              <span className="font-medium">{item.label}</span>
            </motion.li>
          ))}
        </ul>

        <div className="mt-auto pt-6 border-t border-[#fefae0] border-opacity-30">
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-3 w-full text-sm font-bold px-3 py-3 rounded-xl hover:bg-gradient-to-r hover:from-[#5a1616] hover:to-[#6b1e1e] transition-all duration-300 group hover:scale-105"
          >
            <LogOut size={16} className="group-hover:scale-110 transition-transform duration-200" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Header */}
        <header className="p-6 bg-gradient-to-r from-[#fffdf5] via-[#fefcf3] to-[#fffdf5] flex justify-between items-center border-b border-gray-200 shadow-sm backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleSidebar} 
              className="md:hidden text-[#3e1f0d] p-2 rounded-full hover:bg-[#ffd60a] hover:bg-opacity-20 transition-colors"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-xl md:text-2xl font-bold text-[#3e1f0d] drop-shadow-sm">
              One-IT Library
            </h2>
          </div>
          <div className="flex items-center gap-4 relative">
            <span className="text-sm md:text-base font-medium text-[#3e1f0d] bg-opacity-20 px-3 py-1 rounded-full">
              {formattedDate}
            </span>
            <div className="relative">
              <button
                onClick={toggleNotif}
                className="p-3 rounded-full hover:bg-[#ffd60a] hover:bg-opacity-20 transition-colors relative"
              >
                <Bell size={20} className="text-[#3e1f0d]" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </button>
              {isNotifOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
                >
                  <div className="p-3 bg-gradient-to-r from-[#3e1f0d] to-[#4a2515] text-white">
                    <h4 className="font-semibold text-sm">Notifikasi</h4>
                  </div>
                  <ul className="max-h-48 overflow-y-auto">
                    {notifications.map((note, idx) => (
                      <li
                        key={idx}
                        className="px-4 py-3 text-sm text-gray-700 border-b last:border-b-0 hover:bg-gradient-to-r hover:from-[#ffd60a] hover:from-opacity-10 hover:to-transparent cursor-pointer transition-all duration-200"
                        onClick={() => alert(`Kamu klik notifikasi: "${note}"`)}
                      >
                        {note}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 md:p-8 flex-1"
        >
          {/* Action Buttons */}
          <section className="flex gap-4 mb-8 justify-center md:justify-start">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/buku")}
              className="bg-gradient-to-r from-[#3e1f0d] to-[#4a2515] text-[#fefae0] px-6 py-3 rounded-full text-sm font-bold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              <span className="text-lg">📚</span>
              Pinjam Sekarang
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/bukudipinjam")}
              className="bg-gradient-to-r from-[#3e1f0d] to-[#4a2515] text-[#fefae0] px-6 py-3 rounded-full text-sm font-bold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              <span className="text-lg">📖</span>
              Buku Dipinjam
            </motion.button>
          </section>

          {/* Book Recommendations */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-[#3e1f0d] text-2xl font-bold">
                📖 Rekomendasi Buku Populer
              </h3>
            </div>

            {/* Search and Filter */}
            <div className="flex gap-4 mb-6 flex-wrap">
              <div className="flex flex-1 min-w-[200px] border-2 border-[#3e1f0d] border-opacity-20 rounded-full overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
                <input
                  type="text"
                  placeholder="Cari buku favorit Anda..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-4 py-3 text-sm outline-none bg-transparent"
                />
                <button className="flex items-center justify-center px-4 bg-gradient-to-r from-[#3e1f0d] to-[#4a2515] text-[#fefae0] hover:from-[#4a2515] hover:to-[#3e1f0d] transition-all duration-300">
                  <Search size={18} />
                </button>
              </div>
              <select
                value={bookTypeFilter}
                onChange={(e) => setBookTypeFilter(e.target.value)}
                className="border-2 border-[#3e1f0d] border-opacity-20 rounded-full px-4 py-3 text-sm bg-white shadow-sm hover:shadow-md transition-shadow outline-none"
              >
                <option value="all">📚 Semua Kategori</option>
                <option value="fiksi">✨ Fiksi</option>
                <option value="non-fiksi">🎓 Non-Fiksi</option>
              </select>
            </div>

            {/* Books Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {filteredBooks.map((book, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-4 flex flex-col items-center group border border-gray-100"
                >
                  <div className="relative overflow-hidden rounded-xl mb-3 w-full">
                    <img
                      src={book.cover}
                      alt={book.judul}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <h4 className="text-sm font-bold text-center text-[#3e1f0d] line-clamp-2 mb-1 group-hover:text-[#ffd60a] transition-colors">
                    {book.judul}
                  </h4>
                  <p className="text-xs text-gray-600 mb-2 text-center">{book.penulis}</p>

                  <div className="flex items-center gap-1 mb-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      book.kategori === 'fiksi' 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {book.kategori === 'fiksi' ? '✨ Fiksi' : '🎓 Non-Fiksi'}
                    </span>
                  </div>

                  {reviews[book.judul] && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-2 text-xs text-center p-2 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200"
                    >
                      <div className="flex justify-center mb-1">
                        {[...Array(reviews[book.judul].rating)].map((_, i) => (
                          <span key={i} className="text-yellow-500">⭐</span>
                        ))}
                      </div>
                      <p className="text-gray-700 italic">"{reviews[book.judul].reviewText}"</p>
                    </motion.div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openReviewModal(book)}
                    className="mt-3 text-xs text-white bg-gradient-to-r from-[#3e1f0d] to-[#4a2515] px-3 py-2 rounded-full hover:shadow-lg transition-all duration-300 font-medium"
                  >
                    ✍️ Tulis Review
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </section>
        </motion.main>

        {/* Footer */}
        <footer className="mt-auto p-6 text-sm text-gray-600 text-center border-t border-gray-200 bg-gradient-to-r from-[#fffdf5] to-[#fefcf3]">
          <div className="flex items-center justify-center gap-2">
            <span>&copy; {new Date().getFullYear()} Perpustakaan Digital</span> 
          </div>
        </footer>
      </div>

      {/* Review Modal */}
      {selectedBook && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#3e1f0d] to-[#ffd60a] rounded-full flex items-center justify-center">
                <span className="text-white text-lg">✍️</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#3e1f0d] mb-1">
                  Review Buku
                </h3>
                <p className="text-sm text-gray-600">"{selectedBook.judul}"</p>
              </div>
            </div>
            
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Bagikan pengalaman membaca Anda..."
              className="w-full border-2 border-gray-200 rounded-xl p-3 mb-4 text-sm resize-none h-24 focus:border-[#3e1f0d] focus:outline-none transition-colors"
              rows="3"
            />
            
            <div className="flex items-center gap-2 mb-6">
              <span className="text-sm font-medium text-[#3e1f0d]">Rating:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((num) => (
                  <motion.button
                    key={num}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setRating(num)}
                  >
                    <Star
                      size={20}
                      className={`cursor-pointer transition-colors ${
                        rating >= num ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                      }`}
                    />
                  </motion.button>
                ))}
              </div>
            </div>           
           <div className="flex justify-end gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedBook(null)}
                className="px-4 py-2 border-2 border-gray-200 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                Batal
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={saveReview}
                className="px-6 py-2 bg-gradient-to-r from-[#3e1f0d] to-[#4a2515] text-white rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300"
                >
                Simpan Review
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default Dashboard;