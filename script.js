const mainCard = document.querySelector('.cards');

let myLibrary = [];

function Book(title, author, noOfPages, isRead) {
  this.title = title;
  this.author = author;
  this.noOfPages = noOfPages;
  this.isRead = isRead;
  this.infor = function () {
    return `${this.title} by ${this.author}, ${this.noOfPages} pages, ${this.isRead} `;
  };
  this.toggleIsReadStatus = function () {
    if (this.isRead) {
      this.isRead = false;
    } else {
      this.isRead = true;
    }
  };
}

// FUNCTION TO ADD A BOOK TO THE LIBRARY
function addBookToLibrary(book) {
  myLibrary.push({
    title: book.title,
    author: book.author,
    noOfPages: book.noOfPages,
    isRead: book.isRead,
    infor: book.infor,
    toggleIsReadStatus: book.toggleIsReadStatus,
  });
}

// FUNCTION THAT LOOPS THROUGH THE ARRAY AND DISPLAYS EACH BOOK

function updateScreen() {
  mainCard.textContent = '';
  if (myLibrary.length > 0) {
    for (let i = 0; i < myLibrary.length; i++) {
      createBooks(
        myLibrary[i].title,
        myLibrary[i].author,
        myLibrary[i].noOfPages,
        myLibrary[i].isRead
      );
    }
  } else {
    return;
  }
}

function createBooks(bookTitle, bookAuthor, bookPages, bookIsRead) {
  // Title of Book
  let title = document.createElement('h2');
  title.classList.add('title');
  title.textContent = bookTitle;
  // Author Name
  let author = document.createElement('p');
  author.classList.add('author');
  author.textContent = bookAuthor;
  // Pages
  let pages = document.createElement('p');
  pages.classList.add('pages');
  pages.textContent = bookPages;
  // Read/Not read Button
  let readBtn = document.createElement('button');
  readBtn.classList.add('btn');
  toggleReadBtn(bookIsRead, readBtn);
  // Delete button
  let deleteBtn = document.createElement('button');
  // Delete Icon Fontawesome
  let deleteIcon = document.createElement('i');
  deleteIcon.classList.add('fa-solid');
  deleteIcon.classList.add('fa-trash-can');

  deleteBtn.appendChild(deleteIcon);
  // Holds all Item cards
  let cardItem = document.createElement('div');
  cardItem.classList.add('card-item');

  // Append everything to card Item
  cardItem.append(title, author, pages, readBtn, deleteBtn);
  mainCard.append(cardItem);
}

function toggleReadBtn(value, btn) {
  if (value === true) {
    btn.classList.add('read');
    btn.classList.remove('not-read');
    btn.textContent = 'Already Read';
  } else {
    btn.classList.remove('read');
    btn.classList.add('not-read');
    btn.textContent = 'Not read yet';
  }
}

const cantHurtMe = new Book("Can't Hurt Me", 'David Goggins', 295, false);

const theHobbit = new Book('The Hobbit', 'J.R.R Tolkien', 295, false);

theHobbit.toggleIsReadStatus();

addBookToLibrary(cantHurtMe);
addBookToLibrary(theHobbit);
// addBookToLibrary(cantHurtMe);
// addBookToLibrary(theHobbit);
// addBookToLibrary(cantHurtMe);
// addBookToLibrary(theHobbit);

updateScreen();

// TOGGLE BUTTONS
const toggleRead = Array.from(document.querySelectorAll('.btn'));

toggleRead.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    myLibrary[index].toggleIsReadStatus();
    toggleReadBtn(myLibrary[index].isRead, btn);
  });
});

// DELETE BUTTONS

const deleteBtn = Array.from(document.querySelectorAll('i'));

deleteBtn.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    const parent = btn.parentElement.parentElement;
    myLibrary = myLibrary.filter(
      (item) => item.title !== parent.children[0].textContent
    );
    parent.remove();
  });
});
