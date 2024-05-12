export interface Book {
  title: string;
  author: string;
  isbn: string;
  quantity: number;
  price: number;
}
export enum FormatType {
  JSON = 'json',
  XML = 'xml'
}

export enum BookSellerType {
  Example = 'example',
  Amazon = 'amazon'
}

export interface BookSellerAPI {
  getBooksByAuthor(authorName: string, limit: number): Promise<any>;
  getBooksByPublisher(publisher: string, limit: number): Promise<any>;
  getBooksByYear(year: number, limit: number): Promise<any>;
  makeRequest(url: URL | string): Promise<Response>;
  parseResponse(response: Response): Promise<Book[]>;
}
