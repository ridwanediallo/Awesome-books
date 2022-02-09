const books = document.querySelector('.books');
const addBtn = document.querySelector('.add-btn');
const inputAuthor = document.querySelector('.author');
const inputTitle = document.querySelector('.title');
const navBar = document.querySelector('.nav-ul');
const allSections = document.querySelectorAll('.all');
const dateEl = document.querySelector('.date');
const footer = document.querySelector('footer');

const findHight = () => {
  if (window.innerHeight > document.body.scrollHeight) {
    footer.style.position = 'fixed';
  } else {
    footer.style.position = 'relative';
  }
};

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Library {
	bookCollection = [];

	constructor() {
	  addBtn.addEventListener('click', this.addBook.bind(this));
	  books.addEventListener('click', this.clickToremove.bind(this));
	  this.getLocalStorage();
	}

	setLocalStorage() {
	  localStorage.setItem('bookCollection', JSON.stringify(this.bookCollection));
	}

	getLocalStorage = function () {
	  /* eslint-disable */
		localStorage.getItem('bookCollection')
			? (this.bookCollection = JSON.parse(
					localStorage.getItem('bookCollection')
			  ))
			: [];
		/* eslint-enable */
	  this.renderList();
	};

	renderList() {
	  books.innerHTML = '';
	  this.bookCollection.forEach((el, i) => {
	    const classWhite = i % 2 !== 0 ? 'white' : '';
	    /* eslint-disable */
			const html = `
			<div class="each-book ${classWhite}">
			<div class="book-align">
		  		<span class="book-title">"${el.title}" by </span>
		  		<span class="author">${el.author}</span>
			 </div>
		  		<button class="remove-btn" data-id=${i}>Remove</button>
	  		</div>`;
			/* eslint-enable */
	    books.insertAdjacentHTML('afterbegin', html);
	  });
	  if (this.bookCollection.length > 0) {
	    books.style.border = '2px solid black';
	  } else books.style.border = 'none';
	}

	addBook() {
	  const title = inputTitle.value;
	  const author = inputAuthor.value;
	  if (author && title) {
	    const book = new Book(title, author);
	    this.bookCollection.push(book);
	    this.setLocalStorage(this.bookCollection);
	    this.renderList();
	  }
	  inputTitle.value = '';
	  inputAuthor.value = '';
	}

	removeList = (el) => {
	  this.bookCollection.splice(el, 1);
	  this.setLocalStorage();
	  this.renderList();
	};

	clickToremove(e) {
	  if (e.target.classList.contains('remove-btn')) {
	    const removeBtn = +e.target.dataset.id;
	    this.removeList(removeBtn);
	  }
	}
}

/* eslint-disable */
const library = new Library();
/* eslint-enable */

navBar.addEventListener('click', (e) => {
  if (e.target.parentElement.classList.contains('nav-link')) {
    const target = e.target.parentElement.id;
    const actTarget = document.querySelector(`.${target}`);
    allSections.forEach((sec) => {
      sec.classList.add('hidden');
    });
    actTarget.classList.remove('hidden');
    findHight();
  }
});

function setDate() {
  const date = new Date();
  const obj = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };
  const formatedDate = Intl.DateTimeFormat([], obj).format(date);
  dateEl.textContent = formatedDate;
}

setInterval(setDate, 1000);
