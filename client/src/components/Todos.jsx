import { useEffect, useState } from "react";
import axios from "axios";

const Todos = () => {
  const [todos, setTodos] = useState([]);
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

  return (
    <section>
      <div>
        <form>
          <label htmlFor="todo">Todo : </label>
          <input type="text" name="todo" placeholder="Todo" required />
        </form>
        {todos.map((todo) => (
          <div key={todo._id} className="flex justify-between">
            <p>{todo.todo}</p>
            <div className="flex gap-3">
              <p>Delete</p>
              <p>Update</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Todos;
