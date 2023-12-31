import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      title: {
        display: true,
        text: "Y Axis",
        color: "#000",
        font: {
          family: "Inter",
          size: 16,
          weight: "bold",
          lineHeight: 1,
        },
        padding: { top: 0, left: 0, right: 0, bottom: 20 },
      },
      ticks: {
        callback: function (value, index, values) {
          return value.toLocaleString();
        },
      },
    },
    x: {
      title: {
        display: true,
        text: "X Axis",
        color: "#000",
        font: {
          family: "Inter",
          size: 16,
          weight: "bold",
        },
        padding: { top: 20, left: 0, right: 0, bottom: 0 },
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

const BarChart = ({ data, options }) => {
  return <Bar data={data} options={options} />;
};

export default BarChart;
