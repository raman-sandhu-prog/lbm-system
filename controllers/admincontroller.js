exports.getDashboard = async (req, res) => {
  try {
    // Replace with MongoDB queries later
    const stats = {
      totalBooks: 320,
      totalUsers: 150,
      issuedBooks: 45,
      returnedBooks: 275
    };

    res.render("admin/dashboard", { stats });

  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};