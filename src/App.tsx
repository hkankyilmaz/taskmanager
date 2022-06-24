import React, { useEffect, useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Todo } from "./type/type";
import Portal from "./components/Portal";
import SpeedDiall from "./components/SpeedDiall";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [CompletedTodos, setCompletedTodos] = useState<Array<Todo>>([]);
  const [isOpenPortal, setIsOpenPortal] = useState<boolean>(true);
  const [user, setUser] = useState<string>("David");

  useEffect(() => {
    console.log(CompletedTodos);
  });

  useEffect(() => {
    const activeTodos: any = JSON.parse(
      localStorage.getItem(`${user}Active`) || "[]"
    );
    const completeTodos: any = JSON.parse(
      localStorage.getItem(`${user}Complete`) || "[]"
    );

    setTodos(activeTodos);
    setCompletedTodos(completeTodos);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`${user}Active`, JSON.stringify(todos));
      localStorage.setItem(`${user}Complete`, JSON.stringify(CompletedTodos));
    }
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      localStorage.setItem(`${user}Active`, JSON.stringify(todos));

      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    console.log(result);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todos;
    let complete = CompletedTodos;

    // Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    localStorage.setItem(`${user}Complete`, JSON.stringify(CompletedTodos));

    setTodos(active);
    localStorage.setItem(`${user}Active`, JSON.stringify(todos));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Task Manager</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          user={user}
          setUser={setUser}
          todos={todos}
          setTodos={setTodos}
          CompletedTodos={CompletedTodos}
          setCompletedTodos={setCompletedTodos}
        />
        <Portal
          todos={todos}
          setTodos={setTodos}
          user={user}
          setUser={setUser}
          isOpenPortal={isOpenPortal}
          setIsOpenPortal={setIsOpenPortal}
        />
        <SpeedDiall
          setIsOpenPortal={setIsOpenPortal}
          user={user}
          setUser={setUser}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
