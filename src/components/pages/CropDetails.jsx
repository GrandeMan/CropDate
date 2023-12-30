import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import useCrops from "../library/cropsHandler/useCrops";
import CurrencySelector from "../library/currencyHandler/CurrencySelector";
import CurrencyFormatter from "../library/currencyHandler/CurrencyFormatter";
import { titleCase } from "../library/Item";
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
import { Bar, Line } from "react-chartjs-2";

const CropDetails = () => {
  const { id } = useParams();
  const { cropsData } = useCrops();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const crop = cropsData.find((crop) => crop.id === Number(id));
  const chartRef = useRef(null);

  const updateWindowSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    const handleResize = () => {
      updateWindowSize();
      options.width =
        windowSize.width < 896 ? windowSize.width : windowSize.width / 2;

      if (chartRef.current && chartRef.current.chartInstance) {
        chartRef.current.chartInstance.update();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [windowSize]);

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

  const options = {
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
          padding: { top: 0, left: 0, right: 0, bottom: 10 },
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
          padding: { top: 10, left: 0, right: 0, bottom: 0 },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <main className="flex flex-col h-full p-4 lg:px-8">
      <section
        aria-labelledby="graph-heading"
        className="md:flex md:flex-col lg:grid lg:grid-cols-2 gap-4 lg:px-9 "
      >
        <h2 id="graph-heading" className="sr-only">
          Crop Graph
        </h2>
        <div className="flex-1 max-w-4xl">
          <Bar
            ref={chartRef}
            data={{
              labels: crop?.dates.map((date) => date.slice(0, 10)),
              datasets: [
                {
                  label: "Price",
                  data: crop?.prices.slice(0, 7),
                  backgroundColor: "rgba(255, 99, 132, 0.2)",
                  borderColor: "rgba(255, 99, 132, 1)",
                  borderWidth: 2,
                },
              ],
            }}
            options={{
              ...options,
              scales: {
                y: {
                  ...options.scales.y,
                  title: {
                    ...options.scales.y.title,
                    text: `Price (${crop?.unit})`,
                  },
                },
                x: {
                  ...options.scales.x,
                  title: {
                    ...options.scales.x.title,
                    text: "Date",
                  },
                },
              },
            }}
          />
        </div>
        <div className="flex-1 max-w-4xl">
          <Bar
            ref={chartRef}
            data={{
              labels: crop?.dates.map((date) => date.slice(0, 10)),
              datasets: [
                {
                  label: "Volume",
                  data: crop?.volumes.slice(0, 7),
                  backgroundColor: "rgba(54, 162, 235, 0.2)",
                  borderColor: "rgba(54, 162, 235, 1)",
                  borderWidth: 2,
                },
              ],
            }}
            options={{
              ...options,
              scales: {
                y: {
                  ...options.scales.y,
                  title: {
                    ...options.scales.y.title,
                    text: `Volume (${crop?.unit})`,
                  },
                },
                x: {
                  ...options.scales.x,
                  title: {
                    ...options.scales.x.title,
                    text: "Date",
                  },
                },
              },
            }}
          />
        </div>
      </section>
      <section
        aria-labelledby="details-heading"
        className="flex flex-col pb-24 pt-12"
      >
        <h2 id="details-heading" className="sr-only">
          Crop Details
        </h2>
        <div className="flex sm:p-2 lg:px-9">
          <span className="text-lg p-1">
            Currency: <CurrencySelector />
          </span>
        </div>
        {crop && (
          <div className="grid lg:grid-cols-5 sm:grid-rows-5 w-full">
            <div className="grid lg:grid-cols-1 sm:grid-cols-2 xs:grid-cols-2 text-center">
              <span className="bg-green-200 font-bold px-2 py-4 min-h-max min-w-max">
                Category
              </span>
              <span className="border p-2 min-h-max min-w-max text-center">
                {titleCase(crop.category)}
              </span>
            </div>
            <div className="grid lg:grid-cols-1 sm:grid-cols-2 xs:grid-cols-2 text-center ">
              <span className="bg-green-200 font-bold px-2 py-4 min-h-max min-w-max">
                Name
              </span>
              <span className="border p-2 min-h-max min-w-max text-center ">
                {titleCase(crop.commodity)}
              </span>
            </div>
            <div className="grid lg:grid-cols-1 sm:grid-cols-2 xs:grid-cols-2 text-center">
              <span className="bg-green-200 font-bold px-2 py-4 min-h-max min-w-max">
                Last Update
              </span>
              <span className="border p-2 min-h-max min-w-max text-center">
                {crop.dates[0].slice(0, 10)}
              </span>
            </div>
            <div className="grid lg:grid-cols-1 sm:grid-cols-2 xs:grid-cols-2 text-center">
              <span className="bg-green-200 font-bold px-2 py-4 min-h-max min-w-max">
                Price
              </span>
              <span className="border p-2 min-h-max min-w-max text-center">
                {crop.prices[0] !== 0 ? (
                  <>
                    <CurrencyFormatter value={crop.prices[0]} /> per{" "}
                    {crop.unit === "100's" ? "100's" : crop.unit.toUpperCase()}
                  </>
                ) : (
                  "Price not available"
                )}
              </span>
            </div>
            <div className="grid lg:grid-cols-1 sm:grid-cols-2 xs:grid-cols-2 text-center">
              <span className="bg-green-200 font-bold px-2 py-4 min-h-max min-w-max">
                Volume Sold ({crop.unit})
              </span>
              <span className="border p-2 min-h-max min-w-max text-center">
                {crop.volumes[0]}
              </span>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default CropDetails;
