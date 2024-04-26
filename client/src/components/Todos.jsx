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

  const handleDelete = async (todoId) => {
    try {
      await axios.delete(`${theLink}todo/${todoId}`);
      setTodos(todos.filter((todo) => todo._id !== todoId));
    } catch (err) {
      console.log(err);
    }
  };

  const handlePost = async () => {
    try {
      await axios.post(`${theLink}todos`, {
        todo: value,
      });
    } catch (err) {
      console.log(err);
    }
  };

  //   const handleUpdate = async (todoId) => {
  //     try {
  //       const res = axios.put(`${theLink}todo/${todoId}`);
  //       console.log(res);
  //       setTodos();
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

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
              <p>{todo.todo}</p>
              <div className="flex gap-3">
                <button onClick={() => handleDelete(todo._id)}>Delete</button>
                {/* <button onClick={() => handleUpdate(todo._id)}>Update</button> */}
                <button>Update</button>
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
