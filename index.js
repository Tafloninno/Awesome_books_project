/* eslint-disable  max-classes-per-file */

import Books from './modules/books.js';
import SavelocalItems from './modules/localStorage.js';
import ListBooks from './modules/DOM.js';

const store = () => new SavelocalItems();
store();

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

navList.forEach((element) => {
  element.addEventListener('click', () => {
    List.classList.remove('hidden');
    Add.classList.remove('active');
    Contact.classList.remove('active');
  });
});

navAdd.forEach((element) => {
  element.addEventListener('click', () => {
    List.classList.add('hidden');
    Add.classList.add('active');
    Contact.classList.remove('active');
  });
});

navContact.forEach((element) => {
  element.addEventListener('click', () => {
    List.classList.add('hidden');
    Add.classList.remove('active');
    Contact.classList.add('active');
  });
});

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
