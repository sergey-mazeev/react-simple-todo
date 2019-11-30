import React, {useState, useEffect} from 'react';
import TodoList from "./Todo/TodoList";
import Context from "./context";
import Loader from "./Loader";

const initialState = [];
// Эмуляция задержки
/*const AddTodo = React.lazy(() => new Promise(resolve => {
  setTimeout(() => {
    resolve(import('./Todo/AddTodo'))
  }, 3000);
}));*/
const AddTodo = React.lazy(() => import('./Todo/AddTodo'));

const App = () => {

  const [todos, setTodos] = useState(initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=8')
      .then(response => response.json())
      .then(todos => setTimeout(() => {
          setLoading(false);
          setTodos(todos);
        }, 1500)
      )
  }, []);

  const toggleTask = (id) => {
    setTodos(
      todos.map((task) => {
        if (id === task.id) {
          task.completed = !task.completed
        }
        return task;
      })
    )
  };

  const deleteTask = (taskId) => {
    setTodos(
      todos.filter(({id}) => taskId !== id)
    )
  };

  const createTodo = (title, success) => {
    setTodos([
      ...todos,
      {id: Date.now(), completed: !!success, title: title}
    ])
  };

  return (
    <Context.Provider value={{deleteTask, toggleTask}}>
      <div className="page-wrapper">
        <div className="container">
          <h1>React Rush Tutorial</h1>
          <React.Suspense fallback={<p>Loading...</p>}>
            <AddTodo createTodo={createTodo}/>
          </React.Suspense>
          {loading && <Loader/>}
          {todos.length ? (<TodoList todos={todos}/>) :
            (loading ? null : <p>Todos list is empty.</p>)}
        </div>
      </div>
    </Context.Provider>
  );
};

export default App;
