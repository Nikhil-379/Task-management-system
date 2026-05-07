import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
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
      await API.post("/auth/register", formData);

      alert("Registration Successful");

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#d8d3ff] p-4">
      <div className="w-[900px] h-[550px] bg-white rounded-[40px] shadow-2xl overflow-hidden flex">

        {/* LEFT PANEL */}
        <div className="w-1/2 bg-gradient-to-b from-[#6a5cff] to-[#4b35d4] text-white flex flex-col justify-center items-center rounded-r-[120px] p-10">

          <h1 className="text-5xl font-bold mb-6">
            Welcome Back!
          </h1>

          <p className="text-center text-lg leading-7 mb-10">
            Enter your personal details
            <br />
          </p>

          <Link to="/">
            <button className="border-2 border-white px-10 py-3 rounded-full font-semibold hover:bg-white hover:text-[#4b35d4] transition">
              SIGN IN
            </button>
          </Link>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-1/2 flex flex-col justify-center px-14">

          <h1 className="text-4xl font-bold text-center mb-8">
            Create Account
          </h1>

          
        

          <p className="text-center text-gray-500 mb-6">
            or use your email for registration
          </p>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              className="w-full bg-gray-100 p-4 rounded-md mb-4 outline-none"
            />

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
              className="w-full bg-gray-100 p-4 rounded-md mb-4 outline-none"
            />

            <select
              name="role"
              onChange={handleChange}
              className="w-full bg-gray-100 p-4 rounded-md mb-6 outline-none"
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>

            <button className="w-full bg-[#5a3df0] hover:bg-[#4729e5] text-white py-4 rounded-full font-semibold tracking-wide transition">
              SIGN UP
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;