const rateLimitMap = new Map();
const RATE_LIMIT = 5;
const WINDOW_SIZE = 60 * 1000;

const rateLimiter = (req, res, next) => {
  const userId = req.ip;
  const currentTime = Date.now();

  if (!rateLimitMap.has(userId)) {
    rateLimitMap.set(userId, []);
  }

  let timestamps = rateLimitMap.get(userId);

  timestamps = timestamps.filter((time) => currentTime - time < WINDOW_SIZE);

  if (timestamps.length >= RATE_LIMIT) {
    return res.status(429).json({
      message: "Too Many Requests",
    });
  }

  timestamps.push(currentTime);
  rateLimitMap.set(userId, timestamps);

  next();
};

// import redis from "./redis.js";

// const RATE_LIMIT = 10; // requests
// const WINDOW = 60; // seconds

// export const rateLimiter = async (req, res, next) => {
//   try {
//     const ip = req.ip;

//     const key = `rate:${ip}`;

//     const current = await redis.get(key);

//     if (current && parseInt(current) >= RATE_LIMIT) {
//       return res.status(429).json({
//         message: "Too many requests. Try again later."
//       });
//     }

//     if (!current) {
//       await redis.set(key, 1, "EX", WINDOW);
//     } else {
//       await redis.incr(key);
//     }

//     next();
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
