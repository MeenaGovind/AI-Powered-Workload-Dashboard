import "dotenv/config";
import express from "express";
import cors from "cors";
import axios from "axios";
import { db } from "./firebase.js";

const app = express();
app.use(cors());
app.use(express.json());

async function getTeamWithTasks() {
  const users = (await db.collection("users").get())
    .docs.map(d => ({ id: d.id, ...d.data() }));

  const tasks = (await db.collection("tasks").get())
    .docs.map(d => ({ id: d.id, ...d.data() }));

  return users.map(user => ({
    ...user,
    workload: tasks.filter(t => t.assigneeId === user.id)
  }));
}

async function callLLM(data) {
  const prompt = `
You are an expert project manager AI analyzing team capacity, workload balance, and burnout risk.

Analyze the following team workload data and return ONLY valid JSON (no markdown, no explanation).

Return this EXACT structure:

{
  "teamInsights": [
    {
      "name": "Member Name",
      "capacity": number,
      "assignedHours": number,
      "utilizationPercent": number,
      "burnoutRisk": "Low" | "Medium" | "High",
      "reason": "Clear explanation of workload condition and why the risk level is assigned",
      "rootCause": "Primary reason such as over-allocation, lack of prioritization, poor task distribution, dependency blocking, or unrealistic deadlines",
      "workload": [
        {
          "task": "Task name",
          "effortHours": number,
          "priority": "Low" | "Medium" | "High"
        }
      ]
    }
  ],
  "rebalancingPlan": [
    {
      "action": "Very specific step such as reassigning X task from Member A to Member B, extending deadline, splitting large task, or providing support",
      "reason": "Why this is needed based on utilization, risk, or workload imbalance",
      "impact": "Expected outcome such as reduced burnout, faster delivery, balanced workload",
      "priority": "High" | "Medium" | "Low",
      "recommendedOwner": "Who should execute this (Project Manager | Tech Lead | Team Lead)",
      "affectedMembers": ["Name1", "Name2"]
    }
  ],
  "overallSummary": {
    "teamHealthStatus": "Excellent | Stable | Concerning | Critical",
    "keyRisks": ["list of risks"],
    "opportunities": ["where the PM can optimize workload and productivity"]
  }
}

Rules:
- Ensure valid JSON ONLY
- Do NOT include any explanation text outside the JSON
- Burnout risk should be based on utilization:
  - >100% = High
  - 80% - 100% = Medium
  - <50% = Underutilized but NOT burnout risk (categorize as Low risk)
- If capacity is missing assume 40 hours
- Summarize workload realistically using effortHours
- Provide meaningful, practical, human-level PM recommendations
- Do NOT invent fake people or unrelated tasks
- Keep actions realistic and implementable

Here is the team data to analyze:
${JSON.stringify(data)}
`;


  console.count("Groq Call");

  const res = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "openai/gpt-oss-120b",  // updated model
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  return res.data.choices[0].message.content;
}


app.post("/api/analyze-workload", async (_, res) => {
  try {
    const team = await getTeamWithTasks();
    const ai = await callLLM(team);
    res.json(JSON.parse(ai));
  } catch (error) {
    console.error("Data error :", error?.response?.data || error);
    res.status(500).json({ error: "AI failed", details: error?.response?.data || error.message });
  }
});

app.listen(5000, () => console.log("Backend running on port 5000"));
