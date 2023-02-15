/* eslint-disable  max-classes-per-file */
const bookList = document.querySelector('#book-list');
const bookInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const buttonAdd = document.querySelector('#add');
const navList = document.querySelectorAll('.nav-link-one');
const navAdd = document.querySelectorAll('.nav-link-two');
const navContact = document.querySelectorAll('.nav-link-three');
const List = document.querySelector('.list');
const Add = document.querySelector('.add');
const Contact = document.querySelector('.contact');


  static saveItem(book) {
    const books = SavelocalItems.getBook();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(id) {
    const books = SavelocalItems.getBook();
    const updatedBooks = books.filter((book) => book.id !== id);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
  }
}

class ListBooks {
  static displaybooks() {
    const booksInserted = SavelocalItems.getBook();
    booksInserted.forEach((book) => ListBooks.addBook(book));
  }

  static addBook(book) {
    const bookHolder = document.createElement('tr');
    bookHolder.innerHTML = `
      <td>''${book.title}'' by ${book.author}</td>
      <td><button class="remove" data-id="${book.id}">Remove</button></td>
    `;
    bookList.appendChild(bookHolder);
  }

  static deleteBook(id) {
    const bookRow = document.querySelector(`[data-id="${id}"]`).closest('tr');
    if (bookRow) {
      bookRow.remove();
      SavelocalItems.removeBook(id);
    }
  }
}

ListBooks.displaybooks();

buttonAdd.addEventListener('click', (e) => {
  e.preventDefault();
  const title = bookInput.value;
  const author = authorInput.value;
  const book = new Books(title, author);
  ListBooks.addBook(book);
  SavelocalItems.saveItem(book);
  bookInput.value = '';
  authorInput.value = '';
});

bookList.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove')) {
    const id = parseInt(e.target.dataset.id, 10);
    ListBooks.deleteBook(id);
  }
});