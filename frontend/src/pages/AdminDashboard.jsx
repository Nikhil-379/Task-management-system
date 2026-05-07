
import { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [dashboardData, setDashboardData] = useState({
    totalProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    overdueTasks: 0,
  });

  const [users, setUsers] = useState([]);

  const [tasks, setTasks] = useState([]);

  const [taskData, setTaskData] = useState({

  title: "",
  description: "",
  assignedTo: "",
  priority: "medium",
  dueDate: "",

});

  useEffect(() => {

    fetchDashboardData();

    fetchUsers();

    fetchTasks();

  }, []);


  // FETCH DASHBOARD

  const fetchDashboardData = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get("/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDashboardData(res.data);

    } catch (error) {

      console.log(error);
    }
  };


  // FETCH USERS

  const fetchUsers = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get("/auth/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(res.data);

    } catch (error) {

      console.log(error);
    }
  };


  // FETCH TASKS

  const fetchTasks = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(res.data);

    } catch (error) {

      console.log(error);
    }
  };


  // HANDLE INPUT

  const handleTaskChange = (e) => {

    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };


  // CREATE TASK

  const createTask = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      await API.post(
        "/tasks",
        taskData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Task Assigned Successfully");

      fetchTasks();

      fetchDashboardData();

      setTaskData({
        title: "",
        description: "",
        assignedTo: "",
        priority: "medium",
      });

    } catch (error) {

      console.log(error);
    }
  };


  // UPDATE TASK STATUS

  const updateTaskStatus = async (taskId, status) => {

    try {

      const token = localStorage.getItem("token");

      await API.put(
        `/tasks/${taskId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks();

      fetchDashboardData();

    } catch (error) {

      console.log(error);
    }
  };


  // ASSIGN MEMBER

  const assignMember = async (taskId, memberId) => {

    try {

      const token = localStorage.getItem("token");

      await API.put(
        `/tasks/${taskId}`,
        {
          assignedTo: memberId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks();

    } catch (error) {

      console.log(error);
    }
  };


  // LOGOUT

  const logoutHandler = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href = "/";
  };


  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-purple-50 p-8">

      {/* HEADER */}

      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl px-10 py-6 flex justify-between items-center mb-10 border border-slate-200">

        <div>

          <h1 className="text-4xl font-bold text-gray-800">
            Admin Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome back, {user?.name}
          </p>

        </div>


        <div className="flex gap-4">

          <button
            onClick={() => window.location.href = "/history"}
            className="bg-indigo-100 text-indigo-700 px-6 py-3 rounded-2xl font-semibold hover:bg-indigo-200 transition"
          >
            History
          </button>

          <button
            onClick={logoutHandler}
            className="bg-rose-100 text-rose-700 px-6 py-3 rounded-2xl font-semibold hover:bg-rose-200 transition"
          >
            Logout
          </button>

        </div>

      </div>


      {/* ANALYTICS */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">

        <div className="bg-gradient-to-br from-blue-200 to-blue-300 text-slate-800 rounded-3xl p-10 shadow-xl">

          <p className="text-slate-700 text-lg font-semibold">
            Total Projects
          </p>

          <h1 className="text-6xl font-bold text-slate-800 mt-5">
            {dashboardData.totalProjects}
          </h1>

        </div>


        <div className="bg-gradient-to-br from-cyan-200 to-sky-300 text-slate-800 rounded-3xl p-10 shadow-xl">

          <p className="text-slate-700 text-lg font-semibold">
            Total Tasks
          </p>

          <h1 className="text-6xl font-bold text-slate-800 mt-5">
            {dashboardData.totalTasks}
          </h1>

        </div>


        <div className="bg-gradient-to-br from-emerald-200 to-green-300 text-slate-800 rounded-3xl p-10 shadow-xl">

          <p className="text-slate-700 text-lg font-semibold">
            Completed Tasks
          </p>

          <h1 className="text-6xl font-bold text-slate-800 mt-5">
            {dashboardData.completedTasks}
          </h1>

        </div>


        <div className="bg-gradient-to-br from-amber-200 to-orange-300 text-slate-800 rounded-3xl p-10 shadow-xl">

          <p className="text-slate-700 text-lg font-semibold">
            Pending Tasks
          </p>

          <h1 className="text-6xl font-bold text-slate-800 mt-5">
            {dashboardData.pendingTasks}
          </h1>

        </div>


        <div className="bg-gradient-to-br from-rose-200 to-red-300 text-slate-800 rounded-3xl p-10 shadow-xl md:col-span-2">

          <p className="text-slate-700 text-lg font-semibold">
            Overdue Tasks
          </p>

          <h1 className="text-6xl font-bold text-slate-800 mt-5">
            {dashboardData.overdueTasks}
          </h1>

        </div>

      </div>


      {/* TEAM MEMBERS */}

      <div className="mb-14">

        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Team Members
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {users
            .filter((member) => member.role === "member")
            .map((member) => (

            <div
              key={member._id}
              className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
            >

              <h2 className="text-2xl font-bold text-gray-800">
                {member.name}
              </h2>

              <p className="text-gray-500 mt-2">
                {member.email}
              </p>

              <span className="inline-block mt-5 bg-green-100 text-green-700 px-5 py-2 rounded-full text-sm font-semibold">
                Member
              </span>

            </div>

          ))}

        </div>

      </div>


      {/* ASSIGN TASK */}

      <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100 mb-14">

        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Assign Task
        </h1>

        <form
          onSubmit={createTask}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >

          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={taskData.title}
            onChange={handleTaskChange}
            className="bg-gray-50 border border-gray-200 p-4 rounded-2xl outline-none"
            required
          />

          <input
            type="text"
            name="description"
            placeholder="Task Description"
            value={taskData.description}
            onChange={handleTaskChange}
            className="bg-gray-50 border border-gray-200 p-4 rounded-2xl outline-none"
            required
          />

          <select
            name="assignedTo"
            value={taskData.assignedTo}
            onChange={handleTaskChange}
            className="bg-gray-50 border border-gray-200 p-4 rounded-2xl outline-none"
          >

            <option value="">
              Select Member
            </option>

            {users
              .filter((member) => member.role === "member")
              .map((member) => (

              <option
                key={member._id}
                value={member._id}
              >
                {member.name}
              </option>

            ))}

          </select>

          <select
            name="priority"
            value={taskData.priority}
            onChange={handleTaskChange}
            className="bg-gray-50 border border-gray-200 p-4 rounded-2xl outline-none"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>

          </select>

          <button className="md:col-span-2 bg-indigo-500 hover:bg-indigo-600 text-white py-4 rounded-2xl font-semibold transition">
            Assign Task
          </button>

        </form>

      </div>


      {/* ALL TASKS */}

      <div>

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold text-gray-800">
            All Tasks
          </h1>

          <div className="bg-indigo-100 text-indigo-700 px-6 py-3 rounded-2xl font-semibold">
            Active Tasks: {
              tasks.filter(
                (task) => task.status !== "completed"
              ).length
            }
          </div>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {tasks
            .filter((task) => task.status !== "completed")
            .map((task) => (

            <div
              key={task._id}
              className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
            >

              <div className="flex justify-between items-start">

                <div>

                  <h2 className="text-2xl font-bold text-gray-800">
                    {task.title}
                  </h2>

                  <p className="text-gray-500 mt-3">
                    {task.description}
                  </p>

                </div>

                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  task.priority === "high"
                    ? "bg-red-100 text-red-700"
                    : task.priority === "medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}>

                  {task.priority}

                </span>

              </div>


              <div className="mt-6">

                <p className="text-gray-500 mb-2">
                  Assign Member
                </p>

                <select
                  value={task.assignedTo?._id || ""}
                  onChange={(e) =>
                    assignMember(task._id, e.target.value)
                  }
                  className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl outline-none"
                >

                  <option value="">
                    Select Member
                  </option>

                  {users
                    .filter((member) => member.role === "member")
                    .map((member) => (

                    <option
                      key={member._id}
                      value={member._id}
                    >
                      {member.name}
                    </option>

                  ))}

                </select>

              </div>


              <div className="mt-8 flex justify-between items-center">

                <div>

                  <p className="text-gray-500 mb-2">
                    Status
                  </p>

                  <span className={`px-5 py-2 rounded-full text-sm font-semibold ${
                    task.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : task.status === "in-progress"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-orange-100 text-orange-700"
                  }`}>

                    {task.status}

                  </span>

                </div>
                    {/* TASK ID */}

                    <div className="mt-6 flex justify-end">

                      <div className="bg-slate-200 text-slate-900 px-5 py-2 rounded-2xl text-sm font-semibold shadow-sm">

                        Task ID:
                        {" "}
                        {task._id.slice(-5)}

                      </div>

                    </div>
                </div>
                

              </div>


          ))}

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;

