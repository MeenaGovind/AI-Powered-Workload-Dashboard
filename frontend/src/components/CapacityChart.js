
// import { Bar } from "react-chartjs-2";
// import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement } from "chart.js";
// ChartJS.register(BarElement, CategoryScale, LinearScale,ArcElement, Tooltip, Legend);

// export default function CapacityChart({ team }) {
//   const labels = team.map(t => t.name);
//   const capacity = team.map(t => t.capacity || 40);
//   const used = team.map(t => t.workload?.reduce((s,x)=>s+x.estimatedHours,0) || 0);

//   return <Bar data={{ labels, datasets:[{label:"Capacity",data:capacity},{label:"Used",data:used}] }} />;
// }
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale,ArcElement, Tooltip, Legend);

export default function CapacityChart({ team }) {
  const labels = team.map(t => t.name);

  const data = {
    labels,
    datasets: [
      {
        label: "Capacity (hrs)",
        data: team.map(t => t.capacity),
        backgroundColor: "rgba(30, 144, 255, 0.7)", // Blue
        borderRadius: 6
      },
      {
        label: "Assigned Workload",
        data: team.map(t => t.assigned),
        backgroundColor: "rgba(255, 99, 132, 0.7)", // Red
        borderRadius: 6
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  return <Bar data={data} options={options} />;
}
