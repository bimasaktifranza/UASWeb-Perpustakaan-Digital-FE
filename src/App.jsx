import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import DataBuku from "./DataBuku";
import Profil from "./Profil";
import Login from "./Login";
import BukuDipinjam from "./BukuDipinjam";

function App() {
  return (
    <Routes>
      {/* Redirect root ke login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/buku" element={<DataBuku />} />
      <Route path="/profil" element={<Profil />} />
      <Route path="/bukudipinjam" element={<BukuDipinjam />} />

     
      {/* Redirect untuk route yang tidak dikenali */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
