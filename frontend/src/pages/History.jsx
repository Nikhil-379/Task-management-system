import { useEffect, useState } from "react";
import API from "../services/api";

function History() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {

    fetchTasks();

  }, []);

  // FETCH COMPLETED TASKS
  const fetchTasks = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(
        res.data.filter(
          (task) => task.status === "completed"
        )
      );

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-10">
        <div className="flex gap-4">

  

  

</div>

        <h1 className="text-4xl font-bold">
          Completed Task History
        </h1>

        <button
          onClick={() => window.location.href = "/dashboard"}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl"
        >
          Back to Dashboard
        </button>

      </div>


      {/* HISTORY TASKS */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {tasks.map((task) => (

          <div
            key={task._id}
            className="bg-white p-8 rounded-3xl shadow-xl border border-green-100"
          >

            {/* TOP */}

            <div className="flex justify-between items-start">

              <div>

                <h2 className="text-2xl font-bold">
                  {task.title}
                </h2>

                <p className="text-gray-500 mt-3">
                  {task.description}
                </p>

              </div>

              <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">

                Completed

              </span>

            </div>


            {/* MEMBER */}

            <div className="mt-6 bg-gray-100 p-4 rounded-2xl">

              <p className="text-sm text-gray-500">
                Completed By
              </p>

              <h3 className="text-lg font-semibold mt-1">

                {task.assignedTo?.name || "No Member"}

              </h3>

              <p className="text-gray-500 text-sm">

                {task.assignedTo?.email || ""}

              </p>

            </div>


            {/* FOOTER */}

            <div className="mt-6 flex justify-between items-center">

              <div className="text-sm text-gray-500">

                Successfully Completed

              </div>

              <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm font-medium">

                Archived

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default History;