// Ambil daftar buku dari localStorage atau buat array kosong jika belum ada
let books = JSON.parse(localStorage.getItem("books")) || {
  belumSelesai: [],
  sudahSelesai: [],
};

// Simpan daftar buku ke localStorage
function saveBooks() {
  localStorage.setItem("books", JSON.stringify(books));
}

// Fungsi untuk menampilkan daftar buku
function displayBooks() {
  const bookList = document.getElementById("bookList");
  bookList.innerHTML = ""; // Kosongkan daftar buku sebelum menambahkan ulang

  // Tampilkan buku di rak "belum selesai di baca"
  const belumSelesaiList = document.createElement("div");
  belumSelesaiList.innerHTML =
    '<h3 class="font-semibold text-lg mb-2">Belum Selesai di Baca</h3>';
  books.belumSelesai.forEach((book, index) => {
    const bookCard = createBookCard(book, index, "belumSelesai");
    belumSelesaiList.appendChild(bookCard);
  });

  // Tampilkan buku di rak "sudah selesai di baca"
  const sudahSelesaiList = document.createElement("div");
  sudahSelesaiList.innerHTML =
    '<h3 class="font-semibold text-lg mb-2">Selesai di Baca</h3>';
  books.sudahSelesai.forEach((book, index) => {
    const bookCard = createBookCard(book, index, "sudahSelesai");
    sudahSelesaiList.appendChild(bookCard);
  });

  bookList.appendChild(belumSelesaiList);
  bookList.appendChild(sudahSelesaiList);
}

// Fungsi untuk membuat kartu buku
function createBookCard(book, index, status) {
  const bookCard = document.createElement("div");
  bookCard.classList.add(
    "border",
    "bg-slate-200",
    "p-4",
    "mb-2",
    "flex",
    "justify-between",
    "items-center",
    "border",
    "border-black",
    "rounded-lg"
  );
  bookCard.innerHTML = `
      <div>
          <h4 class="font-semibold">${capitalize(book)}</h4>
      </div>
      <div>
          ${
            status === "belumSelesai"
              ? `<button class="bg-[#c57429] text-white p-2 rounded mr-2" onclick="moveBook(${index}, '${status}', 'sudahSelesai')">Selesai</button>`
              : ""
          }
          ${
            status === "sudahSelesai"
              ? `<button class="bg-[#c57429] text-white p-2 rounded mr-2" onclick="moveBook(${index}, '${status}', 'belumSelesai')">Baca Ulang</button>`
              : ""
          }
          ${
            status === "sudahSelesai"
              ? `<button class="bg-[#955223] text-white p-2 rounded" onclick="deleteBook(${index}, '${status}')">Hapus</button>`
              : ""
          }
      </div>
  `;
  return bookCard;
}

// Fungsi untuk menambahkan buku baru
document.getElementById("addBookForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const bookTitle = document.getElementById("bookTitle").value.trim();
  if (bookTitle) {
    books.belumSelesai.push(bookTitle);
    saveBooks();
    displayBooks();
    document.getElementById("bookTitle").value = "";
  }
});

// Fungsi untuk memindahkan buku antar rak
function moveBook(index, fromStatus, toStatus) {
  const book = books[fromStatus].splice(index, 1)[0];
  books[toStatus].push(book);
  saveBooks();
  displayBooks();
}

// Fungsi untuk menghapus buku
function deleteBook(index, status) {
  books[status].splice(index, 1);
  saveBooks();
  displayBooks();
}
// Menjalankan aplikasi
displayBooks();

// Fungsi untuk kapital text
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.substr(1);
}
