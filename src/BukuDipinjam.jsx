import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Pencil, Calendar, BookOpen, Clock } from "lucide-react";

function BukuDipinjam() {
  const [bukuDipinjam, setBukuDipinjam] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("bukuDipinjam");
    if (data) {
      setBukuDipinjam(JSON.parse(data));
    }
  }, []);

  const hitungTenggat = (tanggalPinjam) => {
    const tanggal = new Date(tanggalPinjam);
    tanggal.setDate(tanggal.getDate() + 7);
    return tanggal;
  };

  const statusTerlambat = (tanggalPinjam) => {
    const tenggat = hitungTenggat(tanggalPinjam);
    const sekarang = new Date();
    return sekarang > tenggat ? "Terlambat" : "Belum Terlambat";
  };

  const handleKembalikan = (id) => {
    if (
      window.confirm("Yakin ingin mengembalikan buku ini? Buku akan tersedia kembali.")
    ) {
      const updatedList = bukuDipinjam.filter((buku) => buku.id !== id);
      setBukuDipinjam(updatedList);
      localStorage.setItem("bukuDipinjam", JSON.stringify(updatedList));

      const dataPeminjaman = JSON.parse(localStorage.getItem("dataPeminjaman"));
      if (dataPeminjaman) {
        const updatedPeminjaman = dataPeminjaman.filter((p) => p.id !== id);
        localStorage.setItem("dataPeminjaman", JSON.stringify(updatedPeminjaman));
      }

      const dataBuku = JSON.parse(localStorage.getItem("dataBuku"));
      if (dataBuku) {
        const updatedBuku = dataBuku.map((b) =>
          b.id === id ? { ...b, tersedia: b.tersedia + 1 } : b
        );
        localStorage.setItem("dataBuku", JSON.stringify(updatedBuku));
      }

      alert("📚 Buku berhasil dikembalikan!");
    }
  };

  if (bukuDipinjam.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#fefae0] to-[#e6dcc8] text-[#2e2e2e] font-serif">
        <Navbar />
        <main className="max-w-5xl mx-auto p-6 text-center">
          <h2 className="text-4xl font-bold text-[#3e1f0d] mb-4">
            📚 Buku Dipinjam
          </h2>
          <p className="text-gray-700">Anda belum meminjam buku apapun.</p>
        </main>
        <footer className="mt-8 p-4 text-sm text-gray-600 text-center">
          &copy; {new Date().getFullYear()} Perpustakaan Digital
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fefae0] to-[#e6dcc8] text-[#2e2e2e] font-serif">
      <Navbar />
      <header className="bg-gradient-to-r from-[#f2e8cf] to-[#fefae0] py-4 shadow-inner">
        <h2 className="text-4xl font-bold text-center text-[#3e1f0d]">📚 Buku Dipinjam</h2>
      </header>
      <main className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {bukuDipinjam.map((buku) => {
            const tenggat = hitungTenggat(buku.dateBorrowed);
            const status = statusTerlambat(buku.dateBorrowed);

            return (
              <div
                key={buku.id}
                className="bg-white rounded-xl shadow-md ring-1 ring-[#d6caa3] flex flex-col overflow-hidden transform transition duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                <div className="aspect-[2/3] relative w-full">
                  <img
                    src={buku.cover}
                    alt={buku.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex-grow p-4 flex flex-col">
                  <h4 className="font-bold text-lg text-[#3e1f0d] mb-1">{buku.title}</h4>
                  <p className="flex items-center gap-2 text-gray-700">
                    <Pencil size={16} className="text-[#3e1f0d]" />
                    {buku.author}
                  </p>
                  <p className="flex items-center gap-2 text-gray-700 mt-1">
                    <Calendar size={16} className="text-[#3e1f0d]" />
                    Tgl Pinjam: {buku.dateBorrowed}
                  </p>
                  <p className="flex items-center gap-2 text-gray-700 mt-1">
                    <Calendar size={16} className="text-[#3e1f0d]" />
                    Tenggat: {tenggat.toLocaleDateString()}
                  </p>
                  <p
                    className={`flex items-center gap-2 mt-1 font-semibold ${
                      status === "Terlambat" ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    <Clock size={16} className="text-[#3e1f0d]" />
                    Status: {status}
                  </p>

                  <button
                    onClick={() => handleKembalikan(buku.id)}
                    className="mt-auto bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-md py-2 px-4 transition-all duration-300 shadow-sm"
                  >
                    Kembalikan Buku
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <footer className="mt-8 p-4 text-sm text-gray-600 text-center">
        &copy; {new Date().getFullYear()} Perpustakaan Digital
      </footer>
    </div>
  );
}

export default BukuDipinjam;
