class SavelocalItems {
    static getBook = () => {
      const books = localStorage.getItem('books');
      return books ? JSON.parse(books) : [];
    }

    static saveItem = (book) => {
      const books = SavelocalItems.getBook();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook = (id) => {
      const books = SavelocalItems.getBook();
      const updatedBooks = books.filter((book) => book.id !== id);
      localStorage.setItem('books', JSON.stringify(updatedBooks));
    }
}

export default SavelocalItems;