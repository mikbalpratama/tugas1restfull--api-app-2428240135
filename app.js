// impor express
const express = require("express");
const app = express();

// middleware agar body JSON bisa dibaca (req.body)
app.use(express.json());

// data awal di memori (minimal 3 data)
let serviceOrders = [
  {
    id: 1,
    platNomor: "B 4321 XYZ",
    namaPelanggan: "Hendra Wijaya",
    jenisServis: "Ganti oli + tune up",
    biaya: 450000,
    status: "antre",
  },
  {
    id: 2,
    platNomor: "BG 1234 AB",
    namaPelanggan: "Sari Utami",
    jenisServis: "Ganti kampas rem",
    biaya: 300000,
    status: "dikerjakan",
  },
  {
    id: 3,
    platNomor: "BG 5678 CD",
    namaPelanggan: "Budi Santoso",
    jenisServis: "Service berkala",
    biaya: 250000,
    status: "selesai",
  },
];
let nextId = 4;

const STATUS_VALID = ["antre", "dikerjakan", "selesai"];

// helper: validasi field wajib, mengembalikan pesan error atau null
function validasi(body) {
  const { platNomor, namaPelanggan, jenisServis, biaya, status } = body;
  if (!platNomor) return "Field platNomor wajib diisi";
  if (!namaPelanggan) return "Field namaPelanggan wajib diisi";
  if (!jenisServis) return "Field jenisServis wajib diisi";
  if (biaya === undefined || biaya === null || typeof biaya !== "number")
    return "Field biaya wajib diisi (number)";
  if (!status) return "Field status wajib diisi";
  if (!STATUS_VALID.includes(status))
    return "Field status harus antre, dikerjakan, atau selesai";
  return null;
}
