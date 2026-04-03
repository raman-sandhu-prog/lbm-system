exports.getDashboard = async (req, res) => {
  try {
    const stats = {
      totalBooks: 320,
      totalUsers: 150,
      issuedBooks: 45,
      returnedBooks: 275
    };

   res.render("admin/dashboard", { user: req.user,stats  });


  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

// Hardcoded books
const books = [
  { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '9780061120084', category: 'Fiction', copies: 5, available: true },
  { id: 2, title: '1984', author: 'George Orwell', isbn: '9780451524935', category: 'Dystopian', copies: 4, available: false },
  { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '9780743273565', category: 'Classic', copies: 3, available: true },
  { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', isbn: '9780141439518', category: 'Romance', copies: 6, available: true },
  { id: 5, title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling', isbn: '9780590353427', category: 'Fantasy', copies: 10, available: false }
];

exports.listBooks = (req, res) => {
  res.render('admin/books', { user: req.user,books });
};
exports.addBookForm = (req, res) => {
  res.render('admin/add-book');
};


exports.editBookForm = (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);
  res.render('admin/edit-book', { user: req.user,book });
};
