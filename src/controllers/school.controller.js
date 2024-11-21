import db from "../config/db.js";
import { calculateDistance } from "../utils/calculate-distance.js";

export const addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    if (
      !name ||
      !address ||
      typeof latitude !== "number" ||
      typeof longitude !== "number"
    ) {
      return res.status(400).json({ message: "Invalid input data" });
    }
    await db.query(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
      [name, address, latitude, longitude]
    );

    return res.status(201).json({ message: "School added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const listSchools = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    if (typeof latitude !== "string" || typeof longitude !== "string") {
      return res.status(400).send({ error: "Invalid query parameters" });
    }
    const userLatitude = parseFloat(latitude);
    const userLongitude = parseFloat(longitude);
    if (isNaN(userLatitude) || isNaN(userLongitude)) {
      return res.status(400).send({ error: "Invalid latitude or longitude" });
    }
    const [schools] = await db.query("SELECT * FROM schools");

    const sortedSchools = schools
      .map((school) => {
        const distance = calculateDistance(
          userLatitude,
          userLongitude,
          school.latitude,
          school.longitude
        );
        return { ...school, distance };
      })
      .sort((a, b) => a.distance - b.distance);

    res.send(sortedSchools);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
