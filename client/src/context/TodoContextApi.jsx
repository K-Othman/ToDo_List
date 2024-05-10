import axios from "axios";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

export const myTodoContext = createContext("");

export const MyTodoContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const theUrl = "http://localhost:8800/api/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const token = localStorage.getItem("token");
        // if (!token) return "Haven't Logged In Successfully";

        const res = await axios.get(`${theUrl}todos`, {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        setTodos(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // Handling posting todos
  const handlePost = useCallback(
    async (e) => {
      try {
        const res = await axios.post(`${theUrl}todos`, {
          todo: value,
        });
        setTodos([...todos, res.data]);
        setValue("");
      } catch (err) {
        console.log(err);
      }
    },
    [todos, value]
  );

  // Handling Deleting todos

  const handleDelete = useCallback(
    async (todoId) => {
      try {
        await axios.delete(`${theUrl}todo/${todoId}`);
        setTodos(todos.filter((todo) => todo._id !== todoId));
      } catch (err) {
        console.log(err);
      }
    },
    [todos, setTodos, theUrl]
  );

  // Handling action Updating todos

  const actionUpdate = useCallback(
    async (id, done) => {
      try {
        const res = await axios.put(`${theUrl}todo/` + id, { done: !done });
        setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
      } catch (err) {
        console.log(err);
      }
    },
    [todos]
  );

  // Handle Editing todos

  const handleUpdate = useCallback(
    async (id) => {
      try {
        await axios.put(`${theUrl}/todos/update`, {
          _id: id,
          todo: value,
        });
        setValue("");
        setIsUpdating(false);
        setTodos(todos.map((t) => (t._id === id ? { ...t, todo: value } : t)));
      } catch (err) {
        console.log(err);
      }
    },
    [todos, value]
  );

  //   UseMemo Function

  const values = useMemo(
    () => ({
      todos,
      setTodos,
      theUrl,
      value,
      setValue,
      isUpdating,
      setIsUpdating,
      selectedId,
      setSelectedId,
      handlePost,
      handleDelete,
      actionUpdate,
      handleUpdate,
    }),
    [
      todos,
      setTodos,
      theUrl,
      value,
      setValue,
      handlePost,
      handleDelete,
      actionUpdate,
      isUpdating,
      setIsUpdating,
      selectedId,
      setSelectedId,
      handleUpdate,
    ]
  );
  return (
    <myTodoContext.Provider value={values}>{children}</myTodoContext.Provider>
  );
};
