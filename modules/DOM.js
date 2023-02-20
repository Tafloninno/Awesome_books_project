import SavelocalItems from './localStorage.js';

const bookList = document.querySelector('#book-list');
class ListBooks {
    static displaybooks = () => {
      const booksInserted = SavelocalItems.getBook();
      booksInserted.forEach((book) => ListBooks.addBook(book));
    }

    static addBook = (book) => {
      const bookHolder = document.createElement('tr');
      bookHolder.innerHTML = `
        <td>'${book.title}' by ${book.author}</td>
        <td><button class="remove" data-id="${book.id}">Remove</button></td>
      `;
      bookList.appendChild(bookHolder);
    }

    static deleteBook = (id) => {
      const bookRow = document.querySelector(`[data-id="${id}"]`).closest('tr');
      if (bookRow) {
        bookRow.remove();
        SavelocalItems.removeBook(id);
      }
    }
}

ListBooks.displaybooks();

export default ListBooks;
