import { useParams } from "react-router-dom";
import useCrops from "../library/useCrops";

const CropDetails = () => {
  const { id } = useParams();
  const { cropsData } = useCrops();

  const crop = cropsData[id];

  return (
    <div>
      <h1>Crop Details</h1>
      <p>{id}</p>
      {crop && (
        <>
          <p>{crop.category}</p>
          <p>{crop.commodity}</p>
          <p>{crop.date}</p>
          <p>{crop.price}</p>
          <p>{crop.unit}</p>
          <p>{crop.volume}</p>
        </>
      )}
    </div>
  );
};

export default CropDetails;
