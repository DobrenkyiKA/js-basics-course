import {
  Point,
  Speaker,
  Screamer,
  BookList,
  Book,
} from './index';

describe.skip('Module 4', () => {
  describe('Point', () => {
    it('constructor should throw an error when no params have been passed', () => {
      expect(() => new Point(1)).to.throw();
      expect(() => new Point()).to.throw();
    });

    it('constructor should return object with two fields with passed parameters: x and y', () => {
      const point = new Point(1, 2);

      expect(point.x).toBe(1);
      expect(point.y).toBe(2);
    });

    it('object should have plus method', () => {
      const point = new Point(1, 2);

      expect(point.plus).to.be.an.instanceof(Function);
    });

    it('plus method should get another Point object and return new one as a sum of first ones', () => {
      const firstPoint = new Point(1, 2);
      const secondPoint = new Point(3, 4);
      const result = firstPoint.plus(secondPoint);

      expect(result.x).toBe(4);
      expect(result.y).toBe(6);
    });
  });

  describe('Speaker and Screamer', () => {
    describe('Speaker', () => {
      it('constructor should throw an error when no param has been passed', () => {
        expect(() => new Speaker()).to.throw();
      });

      it('should create an object with property "name" and method "speak"', () => {
        const speaker = new Speaker('Michael');

        expect(speaker.name).toBe('Michael');
        expect(speaker.speak).to.be.instanceOf(Function);
      });

      it('method "speak" should return name of the speaker who says passed text', () => {
        const speaker = new Speaker('Michael');

        speaker.speak('easy, man');

        expect(console.log.calledWith('Michael says easy, man')).toBe(true);
      });
    });

    describe('Screamer', () => {
      it('should says passed text louder than speaker', () => {
        const screamer = new Screamer('Mr. Loud');

        screamer.speak('hell yeah');

        expect(console.log.calledWith('Mr. Loud shouts HELL YEAH')).toBe(true);
      });
    });
  });

  describe('The Reading list', () => {
    describe('Book', () => {
      describe('should have next fields', () => {
        it('title (required)', () => {
          expect(() => new Book({})).to.throw();

          const book = new Book({ title: 'BookTitle' });

          expect(book.title).toBe('BookTitle');
        });

        it('genre', () => {
          const book = new Book({ title: 'BookTitle', genre: 'BookGenre' });

          expect(book.genre).toBe('BookGenre');
        });

        it('isRead (default = false)', () => {
          const book = new Book({ title: 'BookTitle' });

          expect(book.isRead).toBe(false);

          const bookIsRead = new Book({ title: 'BookTitle', isRead: true });

          expect(bookIsRead.isRead).toBe(true);
        });

        it('dateFinished (default = null)', () => {
          const book = new Book({ title: 'BookTitle' });

          expect(book.dateFinished).toBe(null);
        });
      });

      describe('should have next methods', () => {
        describe('.markAsRead()', () => {
          it('should be defined', () => {
            expect(new Book({ title: 'Title' }).markAsRead).to.be.instanceof(Function);
          });

          it('should mark book as read', () => {
            const book = new Book({ title: 'Title' });

            expect(book.isRead).toBe(false);

            book.markAsRead();

            expect(book.isRead).toBe(true);
          });

          it('should set date when finished', () => {
            const book = new Book({ title: 'Title' });

            expect(book.dateFinished).toBe(null);

            book.markAsRead();

            expect(book.dateFinished).toEqual(new Date(Date.now()));
          });
        });
      });
    });

    describe('BookList', () => {
      describe('should have next fields', () => {
        it('number of books marked as read', () => {
          const list = new BookList();

          expect(list.booksFinished).toBe(0);
        });

        it('number of books marked as not read', () => {
          const list = new BookList();

          expect(list.booksNotFinished).toBe(0);
        });

        it('reference to the next book', () => {
          const list = new BookList();

          expect(list.nextBook).toBe(null);
        });

        it('reference to the current book', () => {
          const list = new BookList();

          expect(list.currentBook).toBe(null);
        });

        it('reference to the last book read', () => {
          const list = new BookList();

          expect(list.lastBook).toBe(null);
        });

        it('list of all books', () => {
          const list = new BookList();

          expect(list.books).to.be.instanceOf(Array);
          expect(list.books).toEqual([]);
        });
      });

      describe('should have next methods', () => {
        describe('.add()', () => {
          it('should be defined', () => {
            expect(new BookList().add).to.be.instanceof(Function);
          });

          it('should be get only Book', () => {
            expect(() => new BookList().add()).to.throw();
            expect(() => new BookList().add(123)).to.throw();

            const book = new Book({ title: 'Title' });
            expect(() => new BookList().add(book)).to.not.throw();
          });

          it('should add new Book into the list', () => {
            const book = new Book({ title: 'Title' });
            const list = new BookList();

            expect(list.books.length).toBe(0);

            list.add(book);

            expect(list.books.length).toBe(1);
          });

          it('should make book as current one if it is first in a list', () => {
            const book = new Book({ title: 'Title' });
            const list = new BookList();

            expect(list.books.length).toBe(0);

            list.add(book);

            expect(list.books.length).toBe(1);
            expect(list.currentBook).toEqual(book);

            const book2 = new Book({ title: 'Title2' });

            list.add(book2);
            expect(list.books.length).toBe(2);
            expect(list.currentBook).to.not.eql(book2);
          });
        });

        describe('.finishCurrentBook()', () => {
          it('should be defined', () => {
            expect(new BookList().finishCurrentBook).to.be.instanceof(Function);
          });

          it('should change current book status as read', () => {
            const book = new Book({ title: 'Title' });
            const list = new BookList();

            list.add(book);
            list.finishCurrentBook();
            expect(book.isRead).toBe(true);
          });

          it('should save previous read book', () => {
            const book = new Book({ title: 'Title' });
            const book2 = new Book({ title: 'Title2' });
            const list = new BookList();

            list.add(book);
            list.add(book2);
            list.finishCurrentBook();
            expect(book.isRead).toBe(true);
            expect(list.lastBook).toEqual(book);
          });

          it('should present next unread book from the list as next to read', () => {
            const book = new Book({ title: 'Title' });
            const book2 = new Book({ title: 'Title2' });
            const list = new BookList();

            list.add(book);
            list.add(book2);
            expect(list.nextBook).toEqual(book2);
          });

          it('should take next book as current one', () => {
            const book = new Book({ title: 'Title' });
            const book2 = new Book({ title: 'Title2' });
            const list = new BookList();

            list.add(book);
            list.add(book2);
            list.finishCurrentBook();
            expect(list.currentBook).toEqual(book2);
          });
        });
      });
    });
  });
});
