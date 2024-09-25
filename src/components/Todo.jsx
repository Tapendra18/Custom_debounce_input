import { useEffect, useState } from 'react';

export default function Todo() {
  const [value, setValue] = useState('');
  const [debounce, setDebounce] = useState('');
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

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
      if (isEditing) {
        setTodos((prevTodos) =>
          prevTodos.map((todo, index) =>
            index === currentIndex ? debounce : todo
          )
        );
        setIsEditing(false);
        setCurrentIndex(null);
      } else {
        setTodos((prevTodos) => [...prevTodos, debounce]);
      }
      setValue('');
    }
  };

  const handleDelete = (index) => {
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setValue(todos[index]);
    setIsEditing(true);
    setCurrentIndex(index);
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
            {isEditing ? 'Update Todo' : 'Add Todo'}
          </button>
        </div>

        {/* Display the todo list */}
        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={index} className="todo-item">
              <h1>{todo}</h1>
              <button onClick={() => handleDelete(index)} className="todo-button">
                Delete
              </button>
              <button onClick={() => handleEdit(index)}>
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
