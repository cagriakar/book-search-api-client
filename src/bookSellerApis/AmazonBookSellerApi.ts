import { Book, BookSellerAPI, FormatType } from '../types';

class AmazonBookSellerAPI implements BookSellerAPI {
  private baseUrl: string
  private format: FormatType;
  constructor(format: FormatType = FormatType.JSON) {
    this.baseUrl = 'http://api.book-seller-amazon.com/by-author'
    this.format = format;
  }
  async getBooksByAuthor(authorName: string, limit: number): Promise<Book[]> {
    const url = new URL(this.baseUrl);
    url.searchParams.set('author', authorName);
    url.searchParams.set('offset', limit.toString());
    url.searchParams.set('format', this.format);

    const response = await this.makeRequest(url);
    return this.parseResponse(response);
  }

  async getBooksByPublisher(publisher: string, limit: number): Promise<Book[]> {
    const url = new URL(this.baseUrl);
    url.searchParams.set('publisher', publisher);
    url.searchParams.set('limit', limit.toString());
    url.searchParams.set('format', this.format);

    const response = await this.makeRequest(url);
    return this.parseResponse(response);
  }

  async getBooksByYear(year: number, limit: number): Promise<Book[]> {
    const url = new URL(this.baseUrl);
    url.searchParams.set('year', year.toString());
    url.searchParams.set('limit', limit.toString());
    url.searchParams.set('format', this.format);

    const response = await this.makeRequest(url);
    return this.parseResponse(response);
  }

  async makeRequest(url: URL | string): Promise<any> {
    try {
      const response = await fetch(url);

      if (!response.ok) throw new Error(`Request failed. Returned status of ${response.status}`);

      return response;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  }

  async parseResponse(response: Response): Promise<Book[]> {
    let data: Book[] = [];

    // Parsing response logic

    return data;
  }
}

export default AmazonBookSellerAPI