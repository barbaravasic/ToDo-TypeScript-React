import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

type FormElem = React.FormEvent<HTMLFormElement>

interface ITodo {
  text: string
  complete: boolean

}

function App(): JSX.Element {
  const [value, setValue] = useState<string>('')
  const [todos, setTodos] = useState<ITodo[]>([])

  const onSubmit = (e: FormElem): void => {
    e.preventDefault()
    addTodo(value)
    setValue('')
  }

  const addTodo = (text: string): void => {
    const newTodos: ITodo[] = [...todos, { text, complete: false }]
    setTodos(newTodos)

  }

  const completeTodo = (index: number) => {
    const newTodos: ITodo[] = [...todos]
    newTodos[index].complete = !newTodos[index].complete
    setTodos(newTodos)
  }

  return (
    <div className="page-container">
      <h1 className="page-title">ToDo List</h1>
      <form className="todo-form" onSubmit={onSubmit}>
        <input className="todo-input" type="text" required value={value} onChange={e => setValue(e.target.value)} />
        <button className="submit-btn" type="submit">Add ToDo</button>
      </form>
      <section>
        {todos.map((todo: ITodo, i: number) => (
          <div className="todo" key={i}>
            <div className={`todo-text ${todo.complete ? 'todo-text-complete' : ''}`} key={i}>{todo.text}</div>
            <button className={`todo-btn ${todo.complete ? 'todo-btn-incomplete' : 'todo-btn-complete'}`} type="button" onClick={() => completeTodo(i)}>{todo.complete ? 'Incomplete' : 'Complete'}</button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
