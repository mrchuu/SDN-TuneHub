import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController
);
export default function Top5Tracks() {
  const data = {
    labels: ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5"],
    datasets: [
      {
        label: "Data Series 1",
        backgroundColor: [
          "rgba(255, 193, 205, 0.5)",
          "rgba(252, 218, 184, 0.5)",
          "rgba(255, 223, 155, 0.5)",
          "rgba(174, 242, 242, 0.5)",
          "rgba(205, 178, 255, 0.5)",
        ],
        borderColor: [
            "rgba(255, 193, 205, 1)",
            "rgba(252, 218, 184, 1)",
            "rgba(255, 223, 155, 1)",
            "rgba(174, 242, 242, 1)",
            "rgba(205, 178, 255, 1)",
          ],
        borderWidth: 1,
        data: [12, 19, 3, 5, 2],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Ensures the chart can take the full height of the parent container
    plugins: {
      legend: {
        position: "bottom",
        display: false,
      },
      title: {
        display: false,
        text: "Top Streamed tracks",
      },
    },
    // scales: {
    //   x: {
    //     ticks: {
    //       color: "#0000FF", // Change X-axis labels text color
    //     },
    //   },
    //   y: {
    //     ticks: {
    //       color: "#0000FF", // Change Y-axis labels text color
    //     },
    //   },
    // },
  };

  return (
    <div className="w-full h-64">
      <Bar data={data} options={options} />
    </div>
  );
}
