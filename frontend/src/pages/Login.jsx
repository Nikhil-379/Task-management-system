import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);
  const loggedInUser = {
    _id: res.data.user.id,
    name: res.data.user.name,
    email: res.data.user.email,
    role: res.data.user.role,
  };

localStorage.setItem(
  "user",
  JSON.stringify(loggedInUser)
);

localStorage.setItem(
  "user",
  JSON.stringify(loggedInUser)
);

      navigate("/dashboard");

    } catch (error) {

      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#d8d3ff] p-4">

      <div className="w-[900px] h-[550px] bg-white rounded-[40px] shadow-2xl overflow-hidden flex">

        {/* LEFT SIDE */}
        <div className="w-1/2 flex flex-col justify-center px-14">

          <h1 className="text-4xl font-bold text-center mb-8">
            Sign In
          </h1>

          <form onSubmit={handleSubmit}>

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full bg-gray-100 p-4 rounded-md mb-4 outline-none"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full bg-gray-100 p-4 rounded-md mb-6 outline-none"
            />

            <button className="w-full bg-[#5a3df0] hover:bg-[#4729e5] text-white py-4 rounded-full font-semibold tracking-wide transition">
              SIGN IN
            </button>

          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-1/2 bg-gradient-to-b from-[#6a5cff] to-[#4b35d4] text-white flex flex-col justify-center items-center rounded-l-[120px] p-10">

          <h1 className="text-5xl font-bold mb-6">
            Hello, Friend!
          </h1>

          <p className="text-center text-lg leading-7 mb-10">
            Register with your personal details
            
          </p>

          <Link to="/register">

            <button className="border-2 border-white px-10 py-3 rounded-full font-semibold hover:bg-white hover:text-[#4b35d4] transition">
              SIGN UP
            </button>

          </Link>

        </div>
      </div>
    </div>
  );
}

export default Login;