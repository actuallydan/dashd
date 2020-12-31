import { connectToDatabase } from "../../../util/mongodb";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export default async function handler({ body, method }, res) {
  if (method === "POST") {
    try {
      const { db } = await connectToDatabase();

      if (!body.email || !body.password) {
        throw "Username and password cannot be blank";
      }

      let { email, password } = body;

      let user = await db.collection("users").findOne({ email });

      if (!user) {
        throw "User does not exist by that email";
      }

      let valid = bcrypt.compareSync(password, user.password);

      if (!valid) {
        throw "Invalid password";
      }

      var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 86400, // 24 hours
      });

      res.json({ token });
    } catch (e) {
      console.error(e);
      res.json({ error: e });
    }
  }
}
