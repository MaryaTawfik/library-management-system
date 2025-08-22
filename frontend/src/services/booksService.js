// Mock data service (replace with real API later)
const books = [
  {
    bookId: "B001",
    image: "/book1.png",
    title: "Don't Make Me Think",
    category: "Computer Science",
    description: "A book on web usability",
    author: "Steve Krug",
    pages: 216,
    totalCopies: 10,
    availableCopies: 5,
    type: "Hard Copy",
    publicationDate: "2000-05-18",
  },
  {
    bookId: "B002",
    image: "/book2.png",
    title: "The Design of Everyday Things",
    category: "Design",
    description: "Explains human-centered design principles",
    author: "Don Norman",
    pages: 368,
    totalCopies: 8,
    availableCopies: 2,
    type: "E-Book",
    publicationDate: "2013-11-05",
  },
];

export const getAllBooks = () => Promise.resolve(books);

export const getBookById = (id) =>
  Promise.resolve(books.find((b) => b.bookId === id));
