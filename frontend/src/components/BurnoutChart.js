import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function BurnoutChart({ insights }) {
  const labels = insights.map(i => i.name);

  const data = {
    labels,
    datasets: [
      {
        label: "Burnout Risk",
        data: insights.map(i => i.value),
        backgroundColor: insights.map(i =>
          i.value === 3 ? "rgba(255, 99, 132, .8)" :       // High - Red
          i.value === 2 ? "rgba(255, 206, 86, .8)" :       // Medium - Yellow
          "rgba(75, 192, 192, .8)"                         // Low - Green
        )
      }
    ]
  };

  return <Bar data={data} />;
}
