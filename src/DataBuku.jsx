import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import { Search, Pencil, Calendar, BookOpen } from "lucide-react";

const ModalKonfirmasi = ({ show, onClose, onConfirm, pesan }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-80 text-center shadow-lg">
        <p className="mb-4 text-[#3e1f0d]">{pesan}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
          >
            Ya
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-1 rounded"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

function DataBuku() {
  const daftarBuku = [
    {
      id: 1,
      judul: "Kala Senja Menyapa",
      penulis: "Rosa Maria Aguado",
      tahun: 2002,
      kategori: "Fiksi",
      cover:
        "https://marketplace.canva.com/EAFY7T6tOE0/1/0/1003w/canva-oren-estetik-buku-cerita-pasangan-cinta-romantis-kartun-bagus-laGditSTCv0.jpg",
      tersedia: 5,
    },
    {
      id: 2,
      judul: "Buku Catatan",
      penulis: "Olivia Wilson",
      tahun: 2005,
      kategori: "Non-Fiksi",
      cover:
        "https://marketplace.canva.com/EAGdp398ccw/1/0/1131w/canva-biru-putih-berwarna-lucu-sampul-buku-catatan-dokumen-a4-ay-_R3rSmtE.jpg",
      tersedia: 3,
    },
    {
      id: 3,
      judul: "Laporan Tahunan",
      penulis: "Cahaya Dewi",
      tahun: 2025,
      kategori: "Dokumen",
      cover:
        "https://marketplace.canva.com/EAFrIXNBb48/2/0/1003w/canva-biru-modern-laporan-tahunan-sampul-buku-9Ok4whGdElQ.jpg",
      tersedia: 7,
    },
    {
      id: 4,
      judul: "Bu Aku Ingin Pelukmu",
      penulis: "Reza Mustopa",
      tahun: 2023,
      kategori: "Fiksi",
      cover:
        "https://www.gramedia.com/blog/content/images/2024/12/Bu--Aku-Ingin-Pelukmu--Disaat-Dunia-Begitu-Keras-Menempaku.png",
      tersedia: 4,
    },
    {
      id: 5,
      judul: "Pemrograman Web",
      penulis: "Agusriandi",
      tahun: 2010,
      kategori: "Non-Fiksi",
      cover:
        "https://id-test-11.slatic.net/p/2fdc1ca008deb541060b7bd9558316a8.jpg",
      tersedia: 8,
    },
    {
      id: 6,
      judul: "Buku Sakti Pemrograman Web",
      penulis: "Didik Setiawan",
      tahun: 2015,
      kategori: "Non-Fiksi",
      cover:
        "https://cdn.gramedia.com/uploads/picture_meta/2023/1/19/d6c2ynfcdbjkzuu4gllr5b.jpg",
      tersedia: 10,
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [kategoriFilter, setKategoriFilter] = useState("Semua");
  const [bukuData, setBukuData] = useState(daftarBuku);
  const [modal, setModal] = useState({ show: false, pesan: "", aksi: null });
  const [peminjaman, setPeminjaman] = useState(() => {
    const saved = localStorage.getItem("dataPeminjaman");
    return saved
      ? JSON.parse(saved).map((item) => ({
          ...item,
          tanggalPinjam: new Date(item.tanggalPinjam),
        }))
      : [];
  });

  useEffect(() => {
    if (peminjaman.length === 0) {
      localStorage.removeItem("dataPeminjaman");
      localStorage.removeItem("bukuDipinjam");
      return;
    }

    localStorage.setItem(
      "dataPeminjaman",
      JSON.stringify(
        peminjaman.map((item) => ({
          ...item,
          tanggalPinjam: item.tanggalPinjam.toISOString(),
        }))
      )
    );

    const bukuDipinjam = peminjaman.map(({ id, tanggalPinjam }) => {
      const buku = bukuData.find((b) => b.id === id);
      return {
        id,
        title: buku?.judul || "",
        author: buku?.penulis || "",
        cover: buku?.cover || "",
        dateBorrowed: tanggalPinjam.toLocaleDateString(),
      };
    });
    localStorage.setItem("bukuDipinjam", JSON.stringify(bukuDipinjam));
  }, [peminjaman, bukuData]);

  const handleSearch = (e) => setSearchQuery(e.target.value);

  const konfirmasiPinjam = (bukuId) => {
    if (peminjaman.find((p) => p.id === bukuId)) {
      alert("📚 Buku ini sudah Anda pinjam.");
      return;
    }

    const buku = bukuData.find((b) => b.id === bukuId);
    if (!buku || buku.tersedia <= 0) {
      alert("📚 Maaf, buku ini tidak tersedia untuk dipinjam.");
      return;
    }

    setModal({
      show: true,
      pesan: `Yakin ingin meminjam buku "${buku.judul}"? Maksimal 7 hari.`,
      aksi: () => handlePinjam(bukuId),
    });
  };

  const handlePinjam = (bukuId) => {
    setBukuData((prev) =>
      prev.map((buku) =>
        buku.id === bukuId && buku.tersedia > 0
          ? { ...buku, tersedia: buku.tersedia - 1 }
          : buku
      )
    );
    setPeminjaman((prev) => [...prev, { id: bukuId, tanggalPinjam: new Date() }]);
    setModal({ show: false, pesan: "", aksi: null });
    alert("📚 Buku berhasil dipinjam!");
  };

  const konfirmasiKembalikan = (bukuId) => {
    setModal({
      show: true,
      pesan: "Yakin ingin mengembalikan buku ini?",
      aksi: () => handleKembalikan(bukuId),
    });
  };

  const handleKembalikan = (bukuId) => {
    setBukuData((prev) =>
      prev.map((buku) =>
        buku.id === bukuId ? { ...buku, tersedia: buku.tersedia + 1 } : buku
      )
    );
    setPeminjaman((prev) => prev.filter((p) => p.id !== bukuId));
    setModal({ show: false, pesan: "", aksi: null });
    alert("📚 Buku berhasil dikembalikan!");
  };

  const kategoriList = ["Semua", ...new Set(daftarBuku.map((buku) => buku.kategori))];

  const bukuFiltered = bukuData.filter((buku) => {
    const cocokSearch =
      buku.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      buku.penulis.toLowerCase().includes(searchQuery.toLowerCase());
    const cocokKategori =
      kategoriFilter === "Semua" || buku.kategori === kategoriFilter;
    return cocokSearch && cocokKategori;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col min-h-screen w-full bg-[#fefae0] text-[#2e2e2e] font-serif"
    >
      <Navbar />
      <ModalKonfirmasi
        show={modal.show}
        onClose={() => setModal({ show: false, pesan: "", aksi: null })}
        onConfirm={modal.aksi}
        pesan={modal.pesan}
      />
      <main className="flex-1 px-4 py-8 max-w-6xl mx-auto w-full">
        <div className="mb-6">
          <h2 className="text-3xl text-[#3e1f0d] mb-2 font-bold">
            📘 Data Buku Perpustakaan
          </h2>
          <p className="text-gray-700">
            Koleksi buku terbaik yang tersedia dalam sistem perpustakaan.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Cari buku..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-[#3e1f0d]/30 bg-white text-[#3b0a0a] focus:outline-none focus:ring-2 focus:ring-[#3b0a0a]"
            />
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#3e1f0d]"
            />
          </div>
          <select
            className="w-full sm:w-auto rounded-full border border-[#3e1f0d]/30 px-4 py-2 bg-white text-[#3b0a0a] focus:outline-none focus:ring-2 focus:ring-[#3b0a0a]"
            value={kategoriFilter}
            onChange={(e) => setKategoriFilter(e.target.value)}
          >
            {kategoriList.map((kat) => (
              <option key={kat} value={kat}>
                {kat}
              </option>
            ))}
          </select>
        </div>

        <section>
          <h3 className="mb-3 text-xl font-semibold text-[#3e1f0d]">Daftar Buku</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {bukuFiltered.length === 0 && (
              <p className="col-span-full text-center text-gray-500">
                Tidak ada buku ditemukan.
              </p>
            )}
            {bukuFiltered.map((buku) => (
              <motion.div
                key={buku.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col"
              >
                <div className="relative aspect-[2/3] w-full mb-4 rounded-md overflow-hidden">
                  <img
                    src={buku.cover}
                    alt={buku.judul}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex-grow">
                  <h4 className="font-semibold text-lg text-[#3e1f0d]">
                    {buku.judul}
                  </h4>
                  <p className="flex items-center gap-2 text-gray-700 mt-1">
                    <Pencil size={16} className="text-[#3e1f0d]" />
                    {buku.penulis}
                  </p>
                  <p className="flex items-center gap-2 text-gray-700 mt-1">
                    <Calendar size={16} className="text-[#3e1f0d]" />
                    {buku.tahun}
                  </p>
                  <p className="flex items-center gap-2 text-gray-700 mt-1">
                    <BookOpen size={16} className="text-[#3e1f0d]" />
                    {buku.kategori}
                  </p>
                  <p className="mt-1 font-semibold text-[#6b705c]">
                    Tersedia: {buku.tersedia}
                  </p>
                </div>
                <button
                  onClick={() => konfirmasiPinjam(buku.id)}
                  disabled={buku.tersedia <= 0}
                  className={`mt-4 w-full py-2 rounded-md font-semibold text-white ${
                    buku.tersedia > 0
                      ? "bg-[#d4a373] hover:bg-[#b9a97d]"
                      : "bg-gray-400 cursor-not-allowed"
                  } transition-colors duration-200`}
                >
                  Pinjam Buku
                </button>
              </motion.div>
            ))}
          </div>
          <footer className="mt-8 p-4 text-sm text-gray-600 text-center">
            &copy; {new Date().getFullYear()} Perpustakaan Digital
          </footer>
        </section>
      </main>
    </motion.div>
  );
}

export default DataBuku;
