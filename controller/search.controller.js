import Search from "../model/search.model.js";

const searchHistory = async (req, res) => {
  try {
    const searchText = req.params.text;
    const userId = req.user._id;

    // 1️⃣ Remove duplicate if exists
    await Search.deleteOne({ search: searchText, user: userId });

    // 2️⃣ Add new search
    await Search.create({
      search: searchText,
      user: userId,
    });

    // 3️⃣ Get all searches (latest first)
    const allSearches = await Search.find({ user: userId }).sort({
      createdAt: -1,
    });

    // 4️⃣ Keep only last 5 searches
    if (allSearches.length > 5) {
      const extra = allSearches.slice(5); // 6th se aage
      const extraIds = extra.map((item) => item._id);

      await Search.deleteMany({ _id: { $in: extraIds } });
    }

    // 5️⃣ Final response (latest 5)
    const finalSearches = await Search.find({ user: userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: finalSearches,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default searchHistory;
