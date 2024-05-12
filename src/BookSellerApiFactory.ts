import bookSellerApis from './bookSellerApis';
import { BookSellerAPI, BookSellerType } from './types';

class BookSellerAPIFactory {
  static createBookSellerAPI(type: BookSellerType): BookSellerAPI {
    switch (type) {
      case BookSellerType.Example:
        return new bookSellerApis.ExampleBookSellerAPI();
      case BookSellerType.Amazon:
        return new bookSellerApis.AmazonBookSellerAPI();
      default:
        throw new Error(`Unsupported book seller type: ${type}`);
    }
  }
}

export default BookSellerAPIFactory