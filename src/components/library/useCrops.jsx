import { useContext } from "react";
import { CropsContext } from "./CropsContext";

const useCrops = () => {
	const context = useContext(CropsContext);
	if (!context) {
		throw new Error("useCrops must be used within a CropsProvider");
	}
	return context;
};

export default useCrops;
