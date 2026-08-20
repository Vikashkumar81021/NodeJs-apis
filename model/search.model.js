import mongoose from "mongoose";

const searchSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  searches: [
    {
      text: String,
      searchedAt: Date,
    },
  ],
});
const Search = mongoose.model("Search", searchSchema);
export default Search;
