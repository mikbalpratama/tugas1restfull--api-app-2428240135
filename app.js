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

// GET /
// Info API
app.get("/", (req, res) => {
  res.json({
    nama: "ISI_NAMA_KAMU",
    nim: "ISI_NPM_KAMU",
    topik: 23,
    endpoints: [
      "GET /service-orders",
      "GET /service-orders/:id",
      "GET /service-orders?status=antre",
      "POST /service-orders",
      "PUT /service-orders/:id",
      "DELETE /service-orders/:id",
    ],
  });
});

// GET /service-orders
// GET /service-orders?status=antre  (filter dengan req.query)
app.get("/service-orders", (req, res) => {
  const { status } = req.query;
  if (status) {
    return res.json(serviceOrders.filter((o) => o.status === status));
  }
  res.json(serviceOrders);
});

// GET /service-orders/1
app.get("/service-orders/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const order = serviceOrders.find((o) => o.id === id);
  if (!order) {
    return res
      .status(404)
      .json({
        status: "error",
        message: `Data dengan id ${id} tidak ditemukan`,
        data: null,
      });
  }
  res.json(order);
});

// POST /service-orders
// Body: { "platNomor": "B 4321 XYZ", "namaPelanggan": "Hendra Wijaya", "jenisServis": "Ganti oli + tune up", "biaya": 450000, "status": "antre" }
app.post("/service-orders", (req, res) => {
  const pesan = validasi(req.body);
  if (pesan) {
    return res
      .status(400)
      .json({ status: "error", message: pesan, data: null });
  }
  const { platNomor, namaPelanggan, jenisServis, biaya, status } = req.body;
  const baru = {
    id: nextId++,
    platNomor,
    namaPelanggan,
    jenisServis,
    biaya,
    status,
  };
  serviceOrders.push(baru);
  res
    .status(201)
    .json({
      status: "success",
      message: "Data berhasil ditambahkan",
      data: baru,
    });
});
