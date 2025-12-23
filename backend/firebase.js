import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import admin from "firebase-admin";

// Needed to get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read serviceAccount.json safely
const serviceAccount = JSON.parse(
  fs.readFileSync(path.join(__dirname, "serviceAccount.json"), "utf8")
);

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Export Firestore instance
export const db = admin.firestore();
