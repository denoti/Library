const mainCard = document.querySelector('.cards');
const dialog = document.querySelector('dialog');
const exit = document.querySelector('.exit');
const addBook = document.querySelector('#add-book');
const form = document.querySelector('form');

let myLibrary = [];

function Book(title, author, noOfPages, isRead) {
  this.title = title;
  this.author = author;
  this.noOfPages = noOfPages;
  this.isRead = isRead;
}

// FUNCTION TO ADD A BOOK TO THE LIBRARY
function addBookToLibrary(book) {
  myLibrary.push(book);
}

function createBooks(book) {
  // Holds all Item cards
  let cardItem = document.createElement('div');
  cardItem.classList.add('card-item');

  // Title of Book
  let title = document.createElement('h2');
  title.classList.add('title');
  title.textContent = book.title;

  // Author Name
  let author = document.createElement('p');
  author.classList.add('author');
  author.textContent = book.author;

  // Pages
  let pages = document.createElement('p');
  pages.classList.add('pages');
  pages.textContent = `${book.noOfPages} pages`;

  // Read/Not read Button
  let readBtn = document.createElement('button');
  readBtn.classList.add('btn');
  readBtn.addEventListener('click', () => {
    book.isRead = !book.isRead;
    toggleReadBtn(book, readBtn);
  });

  // Delete button
  let deleteBtn = document.createElement('button');
  let deleteIcon = document.createElement('i');
  deleteIcon.classList.add('fa-solid');
  deleteIcon.classList.add('fa-trash-can');
  deleteBtn.appendChild(deleteIcon);
  deleteBtn.addEventListener('click', () => {
    removeBookFromLibrary(book);
    cardItem.remove();
  });

  toggleReadBtn(book, readBtn);

  // Append everything to card Item
  cardItem.append(title, author, pages, readBtn, deleteBtn);
  mainCard.append(cardItem);
}

function toggleReadBtn(book, btn) {
  if (book.isRead) {
    btn.classList.add('read');
    btn.classList.remove('not-read');
    btn.textContent = 'Already Read';
  } else {
    btn.classList.remove('read');
    btn.classList.add('not-read');
    btn.textContent = 'Not read yet';
  }
}

function removeBookFromLibrary(book) {
  const index = myLibrary.indexOf(book);
  if (index !== -1) {
    myLibrary.splice(index, 1);
  }
}

// FUNCTION THAT LOOPS THROUGH THE ARRAY AND DISPLAYS EACH BOOK
function updateScreen() {
  mainCard.textContent = '';
  myLibrary.forEach((book) => createBooks(book));
}

function init() {
  const cantHurtMe = new Book("Can't Hurt Me", 'David Goggins', 300, false);
  const theHobbit = new Book('The Hobbit', 'J.R.R Tolkien', 295, false);
  theHobbit.isRead = true;

  addBookToLibrary(cantHurtMe);
  addBookToLibrary(theHobbit);

  updateScreen();
}

init();

// New Book Event Listener
addBook.addEventListener('click', () => {
  dialog.showModal();
});
// Close Dialog without saving
exit.addEventListener('click', () => {
  dialog.close();
});

// Handling the form button to get values
form.addEventListener('submit', (e) => {
  let authorTitle = e.currentTarget.elements['author-title'].value;
  let author = e.currentTarget.elements.name.value;
  let pages = e.currentTarget.elements.pages.value;
  let readValue = e.currentTarget.elements['read-value'].checked;

  const newBook = new Book(authorTitle, author, pages, readValue);
  addBookToLibrary(newBook);
  updateScreen();
  e.currentTarget.reset();
});
