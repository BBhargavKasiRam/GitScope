const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

// CORS configuration to allow your Vite frontend to talk to this backend
app.use(cors());

app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get('/', (req, res) => {
    res.send("Backend is running");
});


app.post('/api/analyze', async (req, res) => {
    const { username } = req.body;
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

    if (!username) return res.status(400).json({ error: "Username is required" });

    try {
        // 1. Fetch GitHub Data
        const headers = { Authorization: `token ${GITHUB_TOKEN}` };
        const [userRes, reposRes] = await Promise.all([
            axios.get(`https://api.github.com/users/${username}`, { headers }),
            axios.get(`https://api.github.com/users/${username}/repos?sort=updated&per_page=30`, { headers })
        ]);

        const user = userRes.data;
        const repos = reposRes.data;

        // 2. Weighted Scoring Logic (The "Recruiter Lens")
        let docScore = 0; // Out of 40
        let consistencyScore = 0; // Out of 30
        let impactScore = 0; // Out of 30

        repos.forEach(repo => {
            // Documentation: +2 for each description/readme signal
            if (repo.description) docScore += 2;
            if (repo.has_pages) docScore += 5; // Extra points for deployment

            // Consistency: Updated in last 90 days
            if (new Date(repo.updated_at) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)) {
                consistencyScore += 3;
            }
            impactScore += repo.stargazers_count + repo.forks_count;
        });

        const finalScore = Math.min(100, Math.round(
            (Math.min(docScore, 40)) +
            (Math.min(consistencyScore, 30)) +
            (Math.min(impactScore * 2, 30))
        ));

        // 3. AI Insights (The "Enhancer")

        let aiFeedback = "AI temporarily unavailable. Please try again later.";

        const modelName = process.env.GEMINI_MODEL || "gemini-1.5-flash";

        const aiPrompt = `Analyze this GitHub profile for a recruiter: 
        User: ${username}, Bio: ${user.bio}, Repos: ${repos.length}, Total Stars: ${impactScore}.
        Top Projects: ${repos.slice(0, 3).map(r => r.name).join(", ")}.
        
        Provide exactly three sections:
        1. Recruiter Sentiment
        2. Red Flag
        3. Growth Roadmap`;

            try {
                const model = genAI.getGenerativeModel({ model: modelName });

                const result = await model.generateContent(aiPrompt);
                aiFeedback = result.response.text();

            } catch (err) {
                console.error(`Model ${modelName} failed:`, err.message);
            }


        res.json({
            profile: {
                name: user.name || username,
                avatar: user.avatar_url,
                bio: user.bio,
                url: user.html_url
            },
            score: finalScore,
            aiFeedback: aiFeedback,
            rawStats: {
                repos: user.public_repos,
                followers: user.followers,
                stars: impactScore
            }
        });

    }
    catch (err) {
        // This logs the specific failure to your terminal so we stop guessing
        if (err.response) {
            console.error("❌ API ERROR:", err.response.status, err.response.data);
        } else {
            console.error("❌ SERVER ERROR:", err.message);
        }
        res.status(500).json({

            error: "Analysis failed",
            details: err.response ? err.response.data.message : err.message
        });
    }
}
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
