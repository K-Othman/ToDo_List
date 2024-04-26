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

  //   const handleClick = async () => {
  //     try {
  //       const res = await axios.delete(`${theLink}todo/${_id}`);
  //       //   setTodos(todos.filter((todo) => todo._id !== todoId));
  //       console.log(res);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  const handleClick = async (todoId) => {
    try {
      await axios.delete(`${theLink}todo/${todoId}`);
      setTodos(todos.filter((todo) => todo._id !== todoId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section>
      <div>
        <form>
          <label htmlFor="todo">Todo : </label>
          <input
            type="text"
            name="todo"
            placeholder="Todo"
            value={value}
            onChange={setValue}
            required
          />
        </form>
        {todos ? (
          todos.map((todo) => (
            <div key={todo._id} className="flex justify-between">
              <p>{todo.todo}</p>
              <div className="flex gap-3">
                <button onClick={() => handleClick(todo._id)}>Delete</button>

                {/* <button onClick={handleClick}>Delete</button> */}
                <p>Update</p>
              </div>
            </div>
          ))
        ) : (
          <p>What Are You Up to Today</p>
        )}
      </div>
    </section>
  );
};

export default Todos;
