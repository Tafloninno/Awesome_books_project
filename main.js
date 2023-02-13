const form = document.querySelector('#form');
const mainHolder = document.querySelector('.container');
const bookInput = document.querySelector('#book');
const authorInput = document.querySelector('#author');
const buttonAdd = document.querySelector('#add');

let books = [];

function show() {
  const books = JSON.parse(localStorage.getItem('books'));
  for (let index = 0; index < books.length; index += 1) {
    bookInput.value = books[index].book;
    authorInput.value = books[index].author;
  }
}
form.addEventListener('load', () => {
  show();
});

if (localStorage.getItem('books')) {
  books = JSON.parse(localStorage.getItem('books'));
}

function addBook(book, author) {
  const newBook = { book, author };
  books.push(newBook);
  localStorage.setItem('books', JSON.stringify(books));
}
function displayBooks() {
  mainHolder.innerHTML = '';
  for (let i = 0; i < books.length; i += 1) {
    const bookHolder = document.createElement('section');
    bookHolder.innerHTML = `
      <h3>${books[i].author}<h3>
      <p>${books[i].book}</p>
      <button onclick="remove('${books[i].book}')" id="remove">remove</button>
      <hr>
       `;
    mainHolder.appendChild(bookHolder);
  }
}

buttonAdd.addEventListener('click', (e) => {
  e.preventDefault();
  const book = bookInput.value;
  const author = authorInput.value;
  addBook(book, author);
  displayBooks();
});

displayBooks();

function remove(book){
  books = books.filter(bookEl => bookEl.book !== book)
  localStorage.setItem("books", JSON.stringify(books));
}
