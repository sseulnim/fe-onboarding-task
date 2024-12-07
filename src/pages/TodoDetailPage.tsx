import { useTodoQuery } from "@/hooks/queries/useTodoQuery";
import { useParams, useNavigate } from "react-router-dom";

const TodoDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: todo, isLoading, error } = useTodoQuery(Number(id));

  if (isLoading) return <div>Loading...</div>;
  if (error || !todo) return <div>Error loading todo</div>;

  return (
    <div className="p-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate("/todos")}
          className="mb-4 text-blue-500 hover:text-blue-700"
        >
          ← Back to List
        </button>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Todo Detail</h1>
          <div className="space-y-4">
            <div>
              <span className="font-semibold">ID:</span> {todo.id}
            </div>
            <div>
              <span className="font-semibold">Title:</span> {todo.title}
            </div>
            <div>
              <span className="font-semibold">Status:</span>
              <span
                className={`ml-2 ${
                  todo.completed ? "text-green-500" : "text-yellow-500"
                }`}
              >
                {todo.completed ? "Completed" : "In Progress"}
              </span>
            </div>
            <div>
              <span className="font-semibold">User ID:</span> {todo.userId}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoDetailPage;
