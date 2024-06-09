import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
export default function RevenueRatio() {
  const data = [
    {
      label: "Exclusive tracks",
      value: 55,
      color: "rgba(170, 216, 243, 1)",
      cutout: "50%",
    },
    {
      label: "Albums",
      value: 15,
      color: "rgba(254, 190, 200, 1)",
      cutout: "50%",
    },
  ];

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Ensures the chart can take the full height of the parent container
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: false,
        text: "Revenue ratio",
      },
    },
  };

  const finalData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => Math.round(item.value)),
        backgroundColor: data.map((item) => item.color),
        borderColor: data.map((item) => item.color),
        borderWidth: 1,
        dataVisibility: new Array(data.length).fill(true),
      },
    ],
  };
  return (
    <div className="w-full h-64">
      <Doughnut data={finalData} options={options} />
    </div>

  );
}
