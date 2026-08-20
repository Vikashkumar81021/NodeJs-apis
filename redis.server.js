import { createClient } from "redis";
const client = createClient({
  url: "redis://localhost:6379",
});
client.on("error", (err) => {
  console.log("Redis connection failed");
});

async function conectRedis() {
  await client.connect();
  console.log("Redis connection successfully");
}

export { conectRedis, client };
