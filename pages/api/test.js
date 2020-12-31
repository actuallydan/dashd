import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  if (req.method === "POST") {
    // Process a POST request
  } else {
    db.collection("companies").insertOne({ name: "example corp" });
    // Handle any other HTTP method
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ name: "John Doe" }));
  }
}
