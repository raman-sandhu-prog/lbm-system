const fineSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  issue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "issue"
  },
  amount: {
    type: Number,
    required: true
  },
  paid: {
    type: Boolean,
    default: false
  },
  paidAt: Date
});

module.exports = mongoose.model("Fine", fineSchema);