function generateShortCode(length = 6) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";

  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return code;
}

import UrlShortner from "../model/url.shortner.js";

const urlShort = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    if (!originalUrl) {
      return res.status(400).json({ message: "Missing filed are required" });
    }
    const shortCode = generateShortCode();
    await UrlShortner.create({
      originalUrl,
      shortCode,
    });
    return res.json({
      shortUrl: `http://loclhost:3000/${shortCode}`,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal server error" });
  }
};

export const redirectUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const data = await UrlShortner.findOne({ shortCode });

    if (!data) {
      return res.status(404).json({ message: "URL not found" });
    }

    return res.redirect(data.originalUrl);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export { urlShort };
