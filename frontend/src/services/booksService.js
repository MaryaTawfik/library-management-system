const API_URL = "https://library-management-system-1-mrua.onrender.com/books";
export const getAllBooks = async () => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch books from backend");
    return await res.json(); // { status: 'success', data: [...] }
  } catch (err) {
    console.error(err);
    // fallback to mock data if backend fails
    return [
      {
        bookId: "B001",
        image: "/book1.png",
        title: "Don’t Make Me Think",
        catagory: "Computer Science",
        description:
          "A comprehensive introduction to computer science fundamentals covering programming, algorithms, data structures, and software engineering principles.",
        author: "By Steve Krug, 2000",
        pages: 450,
        totalcopies: 12,
        avaliablecopies: 7,
        type: "Hard Copy",
        publishedYear: "2020-03-15",
        isbn: "978-0134093413",
        edition: "Second Edition",
        publisher: "Tech Publications",
        language: "English",
      },
      {
        bookId: "B002",
        image: "/book2.png",
        title: "The Design of EveryDay Things",
        catagory: "Computer Science",
        description:
          "The Design of Everyday Things* shows how human-centered design makes products simple, usable, and frustration-free.",
        author: "Don Norman, 1988",
        pages: 380,
        totalcopies: 8,
        avaliablecopies: 0,
        type: "E-Book",
        publishedYear: "2019-11-22",
        isbn: "978-0321977616",
        edition: "2nd Edition",
        publisher: "MathWorld Press",
        language: "English",
      },
      {
        bookId: "B003",
        image: "/book3.png",
        title: "Modern Physics",
        catagory: "Physics",
        description:
          "Covers modern physics theories including quantum mechanics, relativity, and atomic structure.",
        author: "Emily Chen",
        pages: 520,
        totalcopies: 10,
        avaliablecopies: 3,
        type: "Hard Copy",
        publishedYear: "2021-06-30",
        isbn: "978-1107039631",
        edition: "1st Edition",
        publisher: "ScienceCore",
        language: "English",
      },
      {
        bookId: "B004",
        image: "/book4.png",
        title: "World History",
        catagory: "History",
        description:
          "A detailed study of world civilizations, cultures, and historical events from ancient to modern times.",
        author: "Michael Williams",
        pages: 610,
        totalcopies: 6,
        avaliablecopies: 2,
        type: "Hard Copy",
        publishedYear: "2018-09-10",
        isbn: "978-0198810506",
        edition: "5th Edition",
        publisher: "Global Ed.",
        language: "English",
      },
    ];
  }
};

export const getBookById = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Book not found");
    return await res.json(); // book object
  } catch (err) {
    console.error(err);
    // fallback to mock data
    const mockBooks = await getAllBooks();
    return mockBooks.find((b) => b.bookId === id);
  }
};
