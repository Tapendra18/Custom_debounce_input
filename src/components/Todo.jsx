import { useEffect, useState } from 'react';

export default function Todo() {
  const [value, setValue] = useState('');
  const [debounce, setDebounce] = useState('');
  const [todos, setTodos] = useState([]);
  console.log(value, debounce, 'sdsdsd');

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebounce(value);
    }, 500);
    return () => clearTimeout(debounceTimeout);
  }, [value]);

  const handleChangeText = (e) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    if (debounce.trim()) {
      setTodos((prevTodos) => [...prevTodos, debounce]);
      setValue('');
    }
  };

  const handleDelete = (todo) => {
    console.log(todo, 'todo');
  };

  return (
    <>
      <div className="todo-container">
        <h2 className="todo-title">My Todo List</h2>
        <div className="todo-input-container">
          <input
            type="text"
            className="todo-input"
            placeholder="Enter your task"
            value={value}
            onChange={handleChangeText}
          />
          <button className="todo-button" onClick={handleClick}>
            Add Todo
          </button>
        </div>

        {/* Display the todo list */}
        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={index} className="todo-item">
              <h1>{todo}</h1>
              <button
                onClick={() => handleDelete(index)}
                className="todo-button"
              >
                delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
