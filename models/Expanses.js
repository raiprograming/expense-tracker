const mongoose= require("mongoose");
const Schema=mongoose.Schema;

const expanseSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  expanses: [
    {
      category: { type: Schema.Types.ObjectId, ref: "Category" },
      categoryName: String,
      cause: String,
      amount: Number,
    },
  ],
  u_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports=mongoose.model("Expanse",expanseSchema);