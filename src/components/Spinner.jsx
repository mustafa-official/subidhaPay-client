import { ClipLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-[70vh]">
      <ClipLoader
        color="#4F46E5"
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Spinner;
