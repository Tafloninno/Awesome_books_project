const bookList = document.querySelector('#book-list');
const bookInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const buttonAdd = document.querySelector('#add');

class Books {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class SavelocalItems {
  static getBook() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static saveItem(book) {
    const books = SavelocalItems.getBook();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeItem(author) {
    const books = SavelocalItems.getBook();
    books.forEach((book, index) => {
      if (book.author === author) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// const booksInserted = [];

class ListBooks {
  static displaybooks() {
    const booksInserted = SavelocalItems.getBook();
    booksInserted.forEach((book) => ListBooks.addBooks(book));
  }

  static addBooks(book) {
    const bookHolder = document.createElement('tr');
    bookHolder.innerHTML = `
    <td>''${book.title}'' <span> by </span></td>
    <td>${book.author}</td>
    <button><a href="#" class="remove">Remove</button>
      `;
    bookList.appendChild(bookHolder);
  }

  static RemoveBook(item) {
    if (item.classList.contains('remove')) {
      item.parentElement.parentElement.remove();
    }
  }
}

ListBooks.displaybooks();

// document.addEventListener('DOMContentLoaded', ListBooks.displaybooks);

buttonAdd.addEventListener('click', (e) => {
  e.preventDefault();
  const title = bookInput.value;
  const author = authorInput.value;
  const book = new Books(title, author);
  ListBooks.addBooks(book);
  SavelocalItems.saveItem(book);
});

bookList.addEventListener('click', (e) => {
  ListBooks.RemoveBook(e.target);
  SavelocalItems.removeItem(e.target.parentElement.previousElementSibling.textContent);
});