/**
 * Point
 * 
 * @param {number} x 
 * @param {number} y 
 */
export class Point {
  constructor(x, y) {
    throwErrorIfUndefined(x);
    throwErrorIfUndefined(y);

    this.x = x;
    this.y = y;
  }
  plus(point) {
    return new Point(point.x + this.x, point.y + this.y);
  }
}

/**
 * Speaker and Screamer
 */
export class Speaker {
  makes = ' says ';
  constructor(name) {
    throwErrorIfUndefined(name);
    this.name = name;
  }

  speak(speech) {
    console.log(this.name + this.makes + speech);
  }
}

export class Screamer extends Speaker {
  makes = ' shouts ';

  speak(speech) {
    super.speak(speech.toUpperCase());
  }
}

/**
 * The Reading list
 */
export class BookList {

  constructor() {
    this.books = [];
    this.booksFinished = 0;
    this.booksNotFinished = 0;
    this.nextBook = null;
    this.currentBook = null;
    this.lastBook = null;
    this.books = [];
  }

  add(book) {
    throwErrorIfUndefined(book);
    if (!(book instanceof Book)) {
      throw Error;
    }
    this.lastBook = this.currentBook;
    this.books.unshift(book);
    if (this.books.length === 1) {
      this.currentBook = book;
      this.nextBook = book;
    } else {
      this.nextBook = book;
    }

  }

  finishCurrentBook() {
    this.currentBook.markAsRead();
    this.lastBook = this.currentBook;
    this.currentBook = this.nextBook;
    this.nextBook = this.books.find(book => book.isRead === false);
  }
}
export class Book {

  constructor(obj) {
    throwErrorIfUndefined(obj.title);
    this.title = obj.title;
    this.author = obj.author;
    this.genre = obj.genre;
    this.isRead = obj.isRead !== undefined;
    this.dateFinished = obj.dateFinished === undefined ? null : obj.dateFinished;
  }

  markAsRead() {
    this.isRead = true;
    this.dateFinished = new Date(Date.now());
  }
}

function throwErrorIfUndefined(parameter) {
  if (typeof parameter === 'undefined') {
    throw Error;
  }
}
