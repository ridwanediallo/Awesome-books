const books = document.querySelector('.books');
const addBtn = document.querySelector('.add-btn');
const inputAuthor = document.querySelector('.author');
const inputTitle = document.querySelector('.title');

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
			/* eslint-disable */
			const html = `
			<div class="each-book">
		  		<span class="book-title">${el.title}</span>
		  		<span class="author">${el.author}</span>
		  		<button class="remove-btn" data-id=${i}>Remove</button>
	  		</div>`;
			/* eslint-enable */
			books.insertAdjacentHTML('afterbegin', html);
		});
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
