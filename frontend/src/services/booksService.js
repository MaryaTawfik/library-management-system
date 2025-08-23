const books = [
  {
    bookId: "B001",
    image: "/book1.png",
    title: "Introduction to Computer Science",
    category: "Computer Science",
    description:
      "A comprehensive introduction to computer science fundamentals covering programming, algorithms, data structures, and software engineering principles.",
    author: "Jane Smith",
    pages: 450,
    totalCopies: 12,
    availableCopies: 7,
    type: "Hard Copy",
    publicationDate: "2020-03-15",
    isbn: "978-0134093413",
    edition: "3rd Edition",
    publisher: "Tech Publications",
    language: "English",
  },
  {
    bookId: "B002",
    image: "/book2.png",
    title: "Advanced Mathematics",
    category: "Mathematics",
    description:
      "Advanced mathematical concepts including calculus, linear algebra, and discrete math with applications.",
    author: "Robert Johnson",
    pages: 380,
    totalCopies: 8,
    availableCopies: 0,
    type: "E-Book",
    publicationDate: "2019-11-22",
    isbn: "978-0321977616",
    edition: "2nd Edition",
    publisher: "MathWorld Press",
    language: "English",
  },
  {
    bookId: "B003",
    image: "/book3.png",
    title: "Modern Physics",
    category: "Physics",
    description:
      "Covers modern physics theories including quantum mechanics, relativity, and atomic structure.",
    author: "Emily Chen",
    pages: 520,
    totalCopies: 10,
    availableCopies: 3,
    type: "Hard Copy",
    publicationDate: "2021-06-30",
    isbn: "978-1107039631",
    edition: "1st Edition",
    publisher: "ScienceCore",
    language: "English",
  },
  {
    bookId: "B004",
    image: "/book4.png",
    title: "World History",
    category: "History",
    description:
      "A detailed study of world civilizations, cultures, and historical events from ancient to modern times.",
    author: "Michael Williams",
    pages: 610,
    totalCopies: 6,
    availableCopies: 2,
    type: "Hard Copy",
    publicationDate: "2018-09-10",
    isbn: "978-0198810506",
    edition: "5th Edition",
    publisher: "Global Ed.",
    language: "English",
  },
];

export const getAllBooks = () => Promise.resolve(books);

export const getBookById = (id) =>
  Promise.resolve(books.find((b) => b.bookId === id));
