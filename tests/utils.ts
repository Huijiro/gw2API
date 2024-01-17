import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env["TEST_API_KEY"] as string;

if (!API_KEY) {
  throw new Error("No API key provided");
}

console.warn("Running tests with API key: " + API_KEY);

export { API_KEY };
