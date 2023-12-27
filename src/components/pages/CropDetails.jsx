import { useParams } from "react-router-dom";
import useCrops from "../library/cropsHandler/useCrops";
import CurrencySelector from "../library/currencyHandler/CurrencySelector";
import CurrencyFormatter from "../library/currencyHandler/CurrencyFormatter";
import { titleCase } from "../library/Item";

const CropDetails = () => {
  const { id } = useParams();
  const { cropsData } = useCrops();

  const crop = cropsData[id];

  return (
    <main className="flex flex-col h-full p-4 lg:px-8">
      <section
        aria-labelledby="graph-heading"
        className="relative h-52 flex items-center justify-center sm:p-2 lg:px-9 "
      >
        <h2 id="graph-heading" className="sr-only">
          Crop Graph
        </h2>
        <div className="">
          <span className="text-lg p-1">---Graph Here---</span>
        </div>
      </section>
      <section
        aria-labelledby="details-heading"
        className="flex flex-col pb-24 pt-6"
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
