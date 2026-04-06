
exports.getDashboard = (req, res) => {
  try {
    const user = req.user || {
      name: "Demo Student",
      email: "student@test.com"
    };

    const issuedBooks = [
      {
        book: { title: "DBMS", author: "NAVATHE" },
        dueDate: new Date("2026-04-10")
      },
      {
        book: { title: "Let Us C", author: "Balaguru Swami" },
        dueDate: new Date("2026-04-01")
      }
    ];
    const totalBooks = issuedBooks.length;
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    const overdueBooks = issuedBooks.filter(item => {
      const due = new Date(item.dueDate);
      due.setHours(0, 0, 0, 0);
      return due < today;
    });
    
    res.render('student/dashboard', {
      user,
      totalBooks,
      issuedBooks,
      overdueCount: overdueBooks.length
    });

  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).send("Internal Server Error");
  }
};