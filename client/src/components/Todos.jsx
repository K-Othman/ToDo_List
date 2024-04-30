import { useEffect, useState } from "react";
import axios from "axios";

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
    <section>
      <div>
        <form>
          <label htmlFor="todo">
            Todo :
            <input
              type="text"
              name="todo"
              placeholder="Todo"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
            />
          </label>
          <input onClick={handlePost} type="submit" />
        </form>
        {todos.length > 0 ? (
          todos.map((todo) => (
            <div key={todo._id} className="flex justify-between">
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
                <button onClick={() => handleDelete(todo._id)}>Delete</button>
                {/* <div onClick={() => handleUpdate(todo._id)}>
                  {todo.done ? <p> Done</p> : <p>Not Done</p>}
                </div> */}

                {/* <button onClick={() => handleUpdate(todo._id)}>Update</button> */}
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
