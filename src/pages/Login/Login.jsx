import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";

const Login = () => {
  const axiosPublic = useAxiosPublic();

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const identifier = form.identifier.value;
    const pin = form.pin.value;
    const loginInfo = { identifier, pin };

    try {
      const { data } = await axiosPublic.post("/login", loginInfo);
      if (data.data === "match") {
        localStorage.setItem("token", data.token);
        toast.success("Login Successful");
      } else {
        toast.error(data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={handleLogin} className="card-body">
          <div className="form-control">
            <input
              type="text"
              name="identifier"
              placeholder="Email or Mobile Number"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <input
              name="pin"
              type="password"
              placeholder="PIN"
              className="input input-bordered"
              required
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <small className="mt-1 mx-auto">
              New user?{" "}
              <Link to="/register" className="text-primary hover:underline">
                Register
              </Link>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
