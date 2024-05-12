import BookSearchApiClient from './BookSearchApiClient';
import { BookSellerType } from './types';


async function init() {
  const amazonClient = new BookSearchApiClient(BookSellerType.Amazon);
  const exampleClient = new BookSearchApiClient(BookSellerType.Example);
  try {
    const booksByShakespeareFromAmazon = await amazonClient.getBooksByAuthor('Shakespeare', 10);
    console.log('Amazon => Books by Shakespeare:', booksByShakespeareFromAmazon);
     const booksByShakespeareFromExample = await exampleClient.getBooksByAuthor('Shakespeare', 10);
    console.log('Example => Books by Shakespeare:', booksByShakespeareFromExample);
  } catch (error) {
    console.error('Error:', error);
  }
}

init();
