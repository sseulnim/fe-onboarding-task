import { useTodosQuery } from "@/hooks/queries/useTodoQuery";
import { Link } from "react-router-dom";

const TodoListPage = () => {
  const { data: todos, isLoading, error } = useTodosQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading todos</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="space-y-2">
        {todos?.map((todo) => (
          <div key={todo.id} className="p-4 border rounded hover:bg-gray-50">
            <Link to={`/todos/${todo.id}`} className="block">
              <span
                className={`${
                  todo.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {todo.title}
              </span>
              <span
                className={`ml-2 text-sm ${
                  todo.completed ? "text-green-500" : "text-yellow-500"
                }`}
              >
                {todo.completed ? "(완료)" : "(진행중)"}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoListPage;
