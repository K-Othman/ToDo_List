import { useEffect, useState } from "react";
import axios from "axios";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");
  const [updateValue, setUpdateValue] = useState("");
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

  //   // Handling Updating todos
  //   const handleUpdate = async (todoId) => {
  //     try {
  //       const res = await axios.put(`${theLink}todo/${todoId}`, {
  //         update: value,
  //       });
  //       console.log(res.data.todo);
  //       setValue(res.data.todo);

  //       //   setTodos(todos.map((todo) => (todo._id === todoId ? res.data : todo)));
  //       setTodos(todos.map((todo) => (todo._id === todoId ? res.data : todo)));
  //       //   setValue("");
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  // Handling Updating todos
  const handleEdit = (todo) => {
    setValue(todo.todo); // Set the input field to the todo's current text
    setUpdateValue(todo._id); // Set the editing ID to the current todo's ID
  };
  // Handling Updating todos
  const handleUpdate = async (todoId) => {
    try {
      const res = await axios.put(`${theLink}todo/${todoId}`, {
        update: value, // Use the correct key for the updated value
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === todoId ? { ...todo, todo: res.data.todo } : todo
        )
      );
      setUpdateValue(null); // Reset the editing ID after updating
      setValue(""); // Clear the input field after updating
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
              <p>{todo.todo}</p>
              <div className="flex gap-3">
                <button onClick={() => handleDelete(todo._id)}>Delete</button>
                <button onClick={() => handleUpdate(todo._id)}>Update</button>
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
