import { Book, BookSellerAPI, FormatType } from '../types';

class ExampleBookSellerAPI implements BookSellerAPI {
  private baseUrl: string;
  private format: FormatType;
  private XML_SELECTOR: string;
  constructor(format: FormatType = FormatType.JSON) {
    this.baseUrl = 'http://api.book-seller-example.com/by-author';
    this.format = format;
    this.XML_SELECTOR = 'book';
  }

  async getBooksByAuthor(authorName: string, limit: number): Promise<Book[]> {
    const url = new URL(this.baseUrl);
    url.searchParams.set('q', authorName);
    url.searchParams.set('limit', limit.toString());
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

  async makeRequest(url: URL | string): Promise<Response> {
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
    let data: Book[];
    if (this.format === FormatType.JSON) data = await response.json();

    if (this.format === FormatType.XML) {
      const xmlText = await response.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(xmlText, 'text/xml');
      const bookNodes = xml.querySelectorAll(this.XML_SELECTOR);

      data = Array.from(bookNodes).map((node) => ({
        title: node.querySelector('title')?.textContent || '',
        author: node.querySelector('author')?.textContent || '',
        isbn: node.querySelector('isbn')?.textContent || '',
        quantity: parseInt(node.querySelector('quantity')?.textContent || '0'),
        price: parseFloat(node.querySelector('price')?.textContent || '0.00')
      }));
    } else {
      throw new Error('Unsupported format');
    }

    return data;
  }
}

export default ExampleBookSellerAPI
