import BookSearchApiClient from '../BookSearchApiClient';
import BookSellerAPIFactory from '../BookSellerApiFactory';
import bookSellerApis from '../bookSellerApis';
import { Book, BookSellerAPI, BookSellerType } from '../types';

const mockBookResponse = [{ title: 'title', author: 'author', isbn: 'isbn', quantity: 20, price: 25.0 }]

// Mock BookSellerAPI implementation
class MockBookSellerAPI implements BookSellerAPI {
  async getBooksByAuthor(authorName: string, limit: number): Promise<Book[]> {
    return Promise.resolve(mockBookResponse);
  }
  async getBooksByPublisher(publisher: string, limit: number): Promise<Book[]> {
    return Promise.resolve(mockBookResponse);
  }
  async getBooksByYear(year: number, limit: number): Promise<Book[]> {
    return Promise.resolve(mockBookResponse);
  }
  async makeRequest(url: URL | string): Promise<any> {
    return Promise.resolve(Response);
  }
  async parseResponse(response: Response): Promise<Book[]> {
    return Promise.resolve(mockBookResponse);
  }
}

describe('BookSearchApiClient', () => {
  let client: BookSearchApiClient;

  beforeEach(() => {
    // Mock the BookSellerAPIFactory to return a MockBookSellerAPI
    jest.spyOn(BookSellerAPIFactory, 'createBookSellerAPI').mockReturnValue(new MockBookSellerAPI());
    client = new BookSearchApiClient(BookSellerType.Example);
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore the mocks after each test
  });

  it('should fetch books by author', async () => {
    const books = await client.getBooksByAuthor('author', 1);
    expect(books).toEqual(mockBookResponse);
  });

  it('should fetch books by publisher', async () => {
    const books = await client.getBooksByPublisher('publisher', 1);
    expect(books).toEqual(mockBookResponse);

  });

  it('should fetch books by year', async () => {
    const books = await client.getBooksByYear(2022, 1);
    expect(books).toEqual(mockBookResponse);

  });
});

describe('BookSellerAPIFactory', () => {
  it('should create ExampleBookSellerAPI instance', () => {
    const exampleAPI = BookSellerAPIFactory.createBookSellerAPI(BookSellerType.Example);
    expect(exampleAPI).toBeInstanceOf(bookSellerApis.ExampleBookSellerAPI);
  });

  it('should create AmazonBookSellerAPI instance', () => {
    const amazonAPI = BookSellerAPIFactory.createBookSellerAPI(BookSellerType.Amazon);
    expect(amazonAPI).toBeInstanceOf(bookSellerApis.AmazonBookSellerAPI);
  });

  it('should throw error for unsupported book seller type', () => {
    expect(() => {
      BookSellerAPIFactory.createBookSellerAPI('unsupported' as BookSellerType);
    }).toThrow('Unsupported book seller type: unsupported');
  });
});
