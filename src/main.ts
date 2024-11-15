import { Detector, createDetector } from "./langdetect";
import * as fs from "fs";
import path = require("path");
import express = require("express");

async function loadLanguageProfilesFromDirectory(directory: string): Promise<string[]> {
    const jsonData: string[] = [];

    try {
        const files = fs.readdirSync(directory);
        files.forEach((file) => {
            const filePath = path.join(directory, file);
            const fileContent = fs.readFileSync(filePath, "utf-8");
            jsonData.push(fileContent);
            console.log(`Loaded profile: ${file}, size: ${fileContent.length}`);
        });
    } catch (error) {
        console.error(`Error reading language profiles from directory: ${directory}`, error);
    }

    return jsonData;
}

async function setupServer() {
    const profilesDirectory = "./profiles";
    console.log(`Loading language profiles from directory: ${profilesDirectory}`);

    const jsonData = await loadLanguageProfilesFromDirectory(profilesDirectory);

    if (jsonData.length === 0) {
        console.error("No language profiles were successfully loaded.");
        process.exit(1);
    }

    const detector: Detector = createDetector(jsonData);

    const app = express();
    app.use(express.json());

    app.post("/detect", (req: express.Request, res: express.Response) => {
        const text = req.body.text;

        if (!text) {
            return res.status(400).json({ error: "No text provided for language detection." });
        }
        detector.appendString(text);

        const probabilities = detector.getProbabilities();

        if (probabilities.length === 0) {
            return res.status(200).json({ message: "No language detected." });
        }

        return res.status(200).json({ probabilities });
    });

    const port = 3000;
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

setupServer().catch((error) => {
    console.error("An error occurred while setting up the server:", error);
});
