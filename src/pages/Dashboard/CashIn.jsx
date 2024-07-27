import { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { ImSpinner3 } from "react-icons/im";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";

const CashIn = () => {
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const handleCashIn = async (e) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    const mobile = form.mobile.value;
    const amount = parseInt(form.amount.value);
    const cashInInfo = { mobile, amount, userMobile: user?.mobile };
    console.log(cashInInfo);

    try {
      const { data } = await axiosPublic.post("/cashin-request", cashInInfo);
      if (data.insertedId) {
        form.reset();
        setLoading(false);
        return toast.success(
          "Cash-in request sent successfully. Waiting for approval!"
        );
      } else if (data.data === "Invalid Agent") {
        setLoading(false);
        return toast.error("Invalid Agent");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleCashIn}
        className="flex justify-center items-center h-[90vh] w-[80%] lg:w-[50%] flex-col gap-3"
      >
        <label className="input input-bordered flex items-center gap-2 w-full">
          <FaPhoneAlt color="#626973" size={14}></FaPhoneAlt>
          <input
            name="mobile"
            type="number"
            required
            className="w-full"
            placeholder="Phone number (agent)"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full">
          <FaBangladeshiTakaSign
            color="#626973"
            size={15}
          ></FaBangladeshiTakaSign>
          <input
            name="amount"
            required
            title="Amount at least 50 taka"
            type="number"
            className="w-full"
            placeholder="Amount"
          />
        </label>

        <button
          disabled={loading}
          type="submit"
          className="disabled:cursor-not-allowed flex items-center px-4 w-full justify-center py-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
        >
          {loading ? (
            <ImSpinner3 size={18} className="animate-spin m-auto"></ImSpinner3>
          ) : (
            "Cash In"
          )}
        </button>
      </form>
    </div>
  );
};

export default CashIn;
