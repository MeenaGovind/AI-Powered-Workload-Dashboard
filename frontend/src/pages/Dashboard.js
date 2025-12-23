import { useState } from "react";
import CapacityChart from "../components/CapacityChart";
import BurnoutChart from "../components/BurnoutChart";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/analyze-workload", {
        method: "POST"
      });

      const json = await res.json();
      console.log("AI Result:", json);
      setData(json);
    } catch (e) {
      console.error("AI Error:", e);
      alert("AI Failed — Check backend");
    } finally {
      setLoading(false);
    }
  };

  const team = data?.teamInsights || [];

  // ✅ Enhance team data with utilization + workload hours
  const enhanced = team.map(m => {
    const capacity = Number(m.capacity ?? 40);

    const assigned = Array.isArray(m.workload)
      ? m.workload.reduce(
          (sum, t) => sum + Number(t?.effortHours ?? 0),
          0
        )
      : Number(m.workload ?? 0);

    const utilization = capacity ? (assigned / capacity) * 100 : 0;

    let status = "Balanced";
    if (utilization >= 100) status = "Overloaded";
    else if (utilization >= 80) status = "At Risk";
    else if (utilization <= 50) status = "Underloaded";

    return {
      ...m,
      capacity,
      assigned,
      utilization,
      status
    };
  });

  // ✅ Flatten all tasks for bottom list
  const allTasks =
    team.flatMap(member =>
      (member.workload || []).map(task => ({
        assignee: member.name,
        burnoutRisk: member.burnoutRisk,
        ...task
      }))
    ) || [];

  return (
    <>
      <h1 className="text-2xl font-bold">AI Workload Dashboard</h1>

      <button
        className="bg-green-500 text-white px-4 py-2 mt-3 rounded"
        onClick={analyze}
      >
        {loading ? "Analyzing..." : "Get AI Insights"}
      </button>

      {/* ========================= DASHBOARD ========================= */}
      {data && (
        <div className="grid grid-cols-2 gap-6 mt-6">

          {/* ================= OVERALL SUMMARY ================= */}
          <div className="border p-4 rounded shadow col-span-2 bg-blue-50">
            <h2 className="font-bold text-lg mb-2">Overall Summary</h2>

            <p>
              <b>Team Health Status:</b>{" "}
              {data?.overallSummary?.teamHealthStatus}
            </p>

            <p className="mt-2 font-semibold">Key Risks:</p>
            <ul className="list-disc ml-6">
              {(data?.overallSummary?.keyRisks || []).map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>

            <p className="mt-2 font-semibold">Opportunities:</p>
            <ul className="list-disc ml-6">
              {(data?.overallSummary?.opportunities || []).map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </div>

          {/* ================= CAPACITY CHART ================= */}
          <div className="border p-4 rounded shadow">
            <h2 className="font-bold mb-2">Capacity vs Assigned (Hours)</h2>

            <CapacityChart
              team={enhanced.map(i => ({
                name: i.name,
                capacity: i.capacity,
                assigned: i.assigned
              }))}
            />
          </div>

          {/* ================= BURNOUT CHART ================= */}
          <div className="border p-4 rounded shadow">
            <h2 className="font-bold mb-2">Burnout Risk</h2>

            <BurnoutChart
              insights={team.map(i => ({
                name: i.name,
                value:
                  i.burnoutRisk === "High"
                    ? 3
                    : i.burnoutRisk === "Medium"
                    ? 2
                    : i.burnoutRisk === "Low"
                    ? 1
                    : 0
              }))}
            />
          </div>

          {/* ================= TEAM LOAD SUMMARY ================= */}
          <div className="border p-4 rounded shadow col-span-2">
            <h2 className="font-bold text-lg mb-3">
              Team Load Summary & Suggestions
            </h2>

            <table className="w-full border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 text-left">Member</th>
                  <th className="p-2 text-left">Assigned (hrs)</th>
                  <th className="p-2 text-left">Capacity (hrs)</th>
                  <th className="p-2 text-left">Utilization</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-left">Suggestion</th>
                </tr>
              </thead>

              <tbody>
                {enhanced.map((m, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-2">{m.name}</td>
                    <td className="p-2">{m.assigned}</td>
                    <td className="p-2">{m.capacity}</td>
                    <td className="p-2">{m.utilization.toFixed(1)}%</td>

                    <td className="p-2 font-semibold">
                      {m.status === "Overloaded" && (
                        <span className="text-red-600">Overloaded</span>
                      )}
                      {m.status === "At Risk" && (
                        <span className="text-orange-500">At Risk</span>
                      )}
                      {m.status === "Underloaded" && (
                        <span className="text-green-600">Underloaded</span>
                      )}
                      {m.status === "Balanced" && (
                        <span className="text-blue-600">Balanced</span>
                      )}
                    </td>

                    <td className="p-2">
                      {m.status === "Overloaded" &&
                        "Reassign tasks or extend deadlines"}
                      {m.status === "At Risk" &&
                        "Monitor closely or provide support"}
                      {m.status === "Underloaded" &&
                        "Assign additional tasks to balance workload"}
                      {m.status === "Balanced" && "Maintain workload"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ================= TEAM INSIGHTS ================= */}
          <div className="border p-4 rounded shadow col-span-2 mt-2">
            <h2 className="font-bold text-lg mb-2">Team Insights</h2>

            {(data?.teamInsights || []).map((m, i) => (
              <div key={i} className="border rounded p-3 mb-3 bg-gray-50">
                <h3 className="font-bold text-lg">{m.name}</h3>

                <p><b>Capacity:</b> {m.capacity} hrs</p>
                <p><b>Assigned:</b> {m.assignedHours} hrs</p>
                <p><b>Utilization:</b> {m.utilizationPercent}%</p>

                <p>
                  <b>Burnout Risk:</b>{" "}
                  <span
                    className={
                      m.burnoutRisk === "High"
                        ? "text-red-600"
                        : m.burnoutRisk === "Medium"
                        ? "text-orange-500"
                        : "text-green-600"
                    }
                  >
                    {m.burnoutRisk}
                  </span>
                </p>

                <p><b>Reason:</b> {m.reason}</p>
                <p><b>Root Cause:</b> {m.rootCause}</p>

                <table className="w-full border mt-3">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-2 text-left">Task</th>
                      <th className="p-2 text-left">Hours</th>
                      <th className="p-2 text-left">Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(m.workload || []).map((t, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="p-2">{t.task}</td>
                        <td className="p-2">{t.effortHours}</td>
                        <td className="p-2">{t.priority}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>

          {/* ================= AI REBALANCING PLAN ================= */}
          <div className="border p-4 rounded shadow col-span-2">
            <h2 className="font-bold mb-3 text-lg">AI Rebalancing Plan</h2>

            {(data?.rebalancingPlan || []).length === 0 && (
              <p className="text-gray-500">No suggestions returned.</p>
            )}

            <ul className="space-y-3">
              {(data?.rebalancingPlan || []).map((p, idx) => (
                <li key={idx} className="p-4 border rounded bg-gray-50">
                  <p><b>Action:</b> {p.action}</p>
                  <p><b>Reason:</b> {p.reason}</p>
                  <p><b>Impact:</b> {p.impact}</p>
                  <p><b>Priority:</b> {p.priority}</p>
                  <p><b>Owner:</b> {p.recommendedOwner}</p>
                  <p><b>Affected Members:</b> {(p.affectedMembers || []).join(", ")}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* ================= ALL TASKS LIST ================= */}
          <div className="border p-4 rounded shadow col-span-2 bg-gray-100">
            <h2 className="font-bold text-lg mb-3">All Tasks Overview</h2>

            <table className="w-full border">
              <thead>
                <tr className="bg-gray-300">
                  <th className="p-2 text-left">Task</th>
                  <th className="p-2 text-left">Assignee</th>
                  <th className="p-2 text-left">Hours</th>
                  <th className="p-2 text-left">Priority</th>
                  <th className="p-2 text-left">Assignee Burnout Risk</th>
                </tr>
              </thead>

              <tbody>
                {allTasks.map((t, i) => (
                  <tr key={i} className="border-b bg-white">
                    <td className="p-2">{t.task}</td>
                    <td className="p-2">{t.assignee}</td>
                    <td className="p-2">{t.effortHours}</td>
                    <td className="p-2">{t.priority}</td>
                    <td className="p-2">
                      {t.burnoutRisk === "High" && (
                        <span className="text-red-600">High</span>
                      )}
                      {t.burnoutRisk === "Medium" && (
                        <span className="text-orange-500">Medium</span>
                      )}
                      {t.burnoutRisk === "Low" && (
                        <span className="text-green-600">Low</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}
    </>
  );
}
