import { connectToDatabase } from "../../../util/mongodb";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// return bcrypt.compareSync(password, this.password);

export default async function handler({ body, method }, res) {
  if (method === "POST") {
    try {
      const { db } = await connectToDatabase();

      if (!body.email || !body.password) {
        throw "Username and password cannot be blank";
      }

      let { email, password } = body;

      let exists = await db.collection("users").findOne({ email });

      if (exists) {
        throw "User already exists with that email";
      }

      password = bcrypt.hashSync(password);

      let res = db
        .collection("users")
        .insertOne({ email, password, createdAt: new Date().toJSON() });

      var token = jwt.sign({ id: res.id }, process.env.JWT_SECRET, {
        expiresIn: 86400, // 24 hours
      });

      res.json({ token });
    } catch (e) {
      console.error(e);
      res.json({ error: e });
    }
  }
}
