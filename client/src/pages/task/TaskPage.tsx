import { useEffect } from "react";
import { CartMain } from "../../components/iu/CartMain";
import { DeleteTask, GetTaskAll } from "../../services";
import { useAuthStore, useTaskStore } from "../../store";
import { Link } from "react-router-dom";

import { ImFileEmpty } from "react-icons/im";

export const TaskPage = () => {

  const { tasks, setTasks, deleteTask } = useTaskStore((state => state))
  const auth = useAuthStore((state => state.auth))

  const allTask = async () => {
    const geTaskAll = await GetTaskAll();
    setTasks(geTaskAll.data)
  };


  const handleDelete = async (taskId: string) => {
    const deleteTaskOne = await DeleteTask(taskId);
    deleteTask(deleteTaskOne.data);
    window.location.reload();
  };

  useEffect(() => {
    allTask();
  }, []);

  return (
    <CartMain>
      <h1 className="text-3xl font-bold text-center my-8">Tasks</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {tasks.length === 0 && (
          <div className="flex justify-center items-center p-10">
            <div>
              <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
              <h1 className="font-bold text-xl">
                No tasks yet, please add a new task
              </h1>
            </div>
          </div>
        )}
        {tasks.map((task) => (
          <div key={task.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{task.title}</h2>
            <p className="mt-2 text-gray-700">{task.description}</p>
            <p className="mt-2 text-gray-500">
              Created: {new Date(task.createdAt).toLocaleString()}
            </p>
            <p className="mt-2 text-gray-500">
              Create for user: {(task.User !== null) ? task.User.username : 'None'}
            </p>
            <Link
              to={`/tasks/${task.id}`}
              className="inline-block mt-4 text-blue-500 hover:text-blue-700"
            >
              View Task
            </Link>
            {auth.id === task.userId && (
              <>
                <button
                  className="inline-block mt-4 ml-4 text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete Task
                </button>
                <Link to={`/tasks/${task.id}`}
                  className="inline-block mt-4 ml-4 text-yellow-500 hover:text-yellow-700"
                >
                  Update Task
                </Link>
              </>
            )}
          </div>
        ))}
      </div>
    </CartMain>
  );
};
