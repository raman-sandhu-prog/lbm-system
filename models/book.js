const requestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "book"
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
  requestDate: {
    type: Date,
    default: Date.now
  },
  responseDate: Date
});

module.exports = mongoose.model("Request", requestSchema);