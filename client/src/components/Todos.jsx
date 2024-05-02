import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");
  const theLink = "http://localhost:8800/api/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${theLink}todos`);
        setTodos(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // Handling Deleting todos

  const handleDelete = async (todoId) => {
    try {
      await axios.delete(`${theLink}todo/${todoId}`);
      setTodos(todos.filter((todo) => todo._id !== todoId));
    } catch (err) {
      console.log(err);
    }
  };

  // Handling posting todos
  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${theLink}todos`, {
        todo: value,
      });
      setTodos([...todos, res.data]);
      setValue("");
    } catch (err) {
      console.log(err);
    }
  };

  // Handling Updating todos

  const handleUpdate = async (id, done) => {
    try {
      const res = await axios.put(`${theLink}todo/` + id, { done: !done });
      setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="text-center w-[700px] mx-auto mt-10">
      <div className="">
        <h1 className="font-bold mb-8 text-5xl">Todo List</h1>
        <form className="h-10 flex items-center gap-1">
          <label htmlFor="todo" className="flex-grow">
            <input
              className="w-full outline-black p-1 mr-2 ml-0"
              type="text"
              name="todo"
              placeholder="Todo"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
            />
          </label>
          <input
            className="w-40 h-8 bg-black text-white"
            onClick={handlePost}
            type="submit"
          />
        </form>
        {todos.length > 0 ? (
          todos.map((todo) => (
            <div
              key={todo._id}
              className="flex justify-between my-1 bg-black text-white p-4"
            >
              <div className="flex gap-3">
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => handleUpdate(todo._id, todo.done)}
                  id="todo"
                />
                <p id="todo" className={todo.done ? "line_through" : ""}>
                  {todo.todo}
                </p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => handleDelete(todo._id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>What Are You Up to Today!</p>
        )}
      </div>
    </section>
  );
};

export default Todos;
