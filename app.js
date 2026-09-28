// impor express
const express = require("express");
const app = express();

// middleware agar body JSON bisa dibaca
app.use(express.json());

// port server
const PORT = process.env.PORT || 3000;

// menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

module.exports = app;
