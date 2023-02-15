/* eslint-disable  max-classes-per-file */
const bookList = document.querySelector('#book-list');
const bookInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const buttonAdd = document.querySelector('#add');
// const navigation = document.querySelectorAll('.nav-links');
const List = document.querySelector('.list');
const Add = document.querySelector('.add');
const Contact = document.querySelector('.contact');

// navigation.forEach((el) =>{
//   el.addEventListener('click', ()=>{
//    List.classList.toggle('hide');
//    Add.classList.toggle('active'); 
//    Contact.classList.toggle('active'); 
//   })
// })

  // Get references to the links and content sections
  const listLink = document.querySelector('.nav_bar li:nth-child(1) a');
  const addLink = document.querySelector('.nav_bar li:nth-child(2) a');
  const contactLink = document.querySelector('.nav_bar li:nth-child(3) a');
  const listSection = document.querySelector('#list-books');
  const addSection = document.querySelector('#add-books');
  const contactSection = document.querySelector('#contact-us');
  
  // Add event listeners to the links
  listLink.addEventListener('click', () => {
    listSection.classList.remove('hidden');
    addSection.classList.remove('active');
    contactSection.classList.remove('active');
  });
  
  addLink.addEventListener('click', () => {
    listSection.classList.add('hidden');
    addSection.classList.add('active');
    contactSection.classList.remove('active');
  });
  
  contactLink.addEventListener('click', () => {
    listSection.classList.add('hidden');
    addSection.classList.add('hidden');
    contactSection.classList.remove('hidden');
  });

class Books {
  constructor(title, author){
    this.title = title;
    this.author = author;
    this.id = Math.floor(Math.random() * 1000000);
  }
}

class SavelocalItems {
   static getBook(){
    let books;
    if(localStorage.getItem('books') === null){
      books = []
    }else {
      books = JSON.parse(localStorage.getItem('books'))
    } 
    return books;
   }
   static saveItem(book){
      const books = SavelocalItems.getBook()
      books.push(book)
      localStorage.setItem('books', JSON.stringify(books))
   }

  static removeBook(id) {
    const books = SavelocalItems.getBook();
    const updatedBooks = books.filter(book => book.id !== id);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
  }
}

class ListBooks {
  static displaybooks(){
    const booksInserted = SavelocalItems.getBook()
    booksInserted.forEach(book => ListBooks.addBook(book))
  }

  static addBook(book) {
    let bookHolder = document.createElement('tr')
    bookHolder.innerHTML = `
      <td>''${book.title}'' by ${book.author}</td>
      <td><button class="remove" data-id="${book.id}">Remove</button></td>
    `
    bookList.appendChild(bookHolder)
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

buttonAdd.addEventListener('click', (e)=>{
  e.preventDefault();
  let title = bookInput.value;
  let author = authorInput.value;
  const book = new Books(title, author)
  ListBooks.addBook(book)
  SavelocalItems.saveItem(book)
  bookInput.value = '';
  authorInput.value = '';
})

bookList.addEventListener('click',(e)=>{
  if (e.target.classList.contains('remove')) {
    const id = parseInt(e.target.dataset.id, 10);
    ListBooks.deleteBook(id);
  }
})