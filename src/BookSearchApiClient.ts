import BookSellerAPIFactory from './BookSellerApiFactory';
import { Book, BookSellerAPI, BookSellerType } from './types';

class BookSearchApiClient {
  private readonly bookSellerAPI: BookSellerAPI;
  constructor(type: BookSellerType) {
    this.bookSellerAPI = BookSellerAPIFactory.createBookSellerAPI(type);
  }

  async getBooksByAuthor(authorName: string, limit: number): Promise<Book[]> {
    // Delegate to the injected BookSellerAPI instance
    return this.bookSellerAPI.getBooksByAuthor(authorName, limit);
  }
  async getBooksByPublisher(publisher: string, limit: number): Promise<Book[]> {
    // Delegate to the injected BookSellerAPI instance
    return this.bookSellerAPI.getBooksByPublisher(publisher, limit);
  }
  async getBooksByYear(year: number, limit: number): Promise<Book[]> {
    // Delegate to the injected BookSellerAPI instance
    return this.bookSellerAPI.getBooksByYear(year, limit);
  }
}

export default BookSearchApiClient;

