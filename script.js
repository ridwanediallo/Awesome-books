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
	#bookCollection = [];
	constructor() {
		addBtn.addEventListener('click', this._addBook.bind(this));
		books.addEventListener('click', this._clickToremove.bind(this));
		this._getLocalStorage();
	}
	_setLocalStorage() {
		localStorage.setItem(
			'bookCollection',
			JSON.stringify(this.#bookCollection)
		);
	}
	_getLocalStorage = function () {
		localStorage.getItem('bookCollection')
			? (this.#bookCollection = JSON.parse(
					localStorage.getItem('bookCollection')
			  ))
			: [];
		this._renderList();
	};

	_renderList() {
		books.innerHTML = '';
		this.#bookCollection.forEach((el, i) => {
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
	_addBook() {
		const title = inputTitle.value;
		const author = inputAuthor.value;
		if (author && title) {
			const book = new Book(title, author);
			this.#bookCollection.push(book);
			this._setLocalStorage(this.#bookCollection);
			this._renderList();
		}
		inputTitle.value = '';
		inputAuthor.value = '';
	}
	_removeList = (el) => {
		this.#bookCollection.splice(el, 1);
		this._setLocalStorage();
		this._renderList();
	};

	_clickToremove(e) {
		if (e.target.classList.contains('remove-btn')) {
			const removeBtn = +e.target.dataset.id;
			this._removeList(removeBtn);
		}
	}
}

const library = new Library();
