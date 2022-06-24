import React from "react";
import { Todo } from "../type/type";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

interface props {
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  setCompletedTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  CompletedTodos: Array<Todo>;
  user: string;
  setUser: (user: string) => void;
}

const TodoList: React.FC<props> = ({
  user,
  setUser,
  todos,
  setTodos,
  CompletedTodos,
  setCompletedTodos,
}) => {
  const [search, setSearch] = React.useState<boolean>(false);
  const [datatodoList, setDatatodoList] = React.useState<string>("");
  const [dataComptodoList, setDataComptodoList] = React.useState<string>("");

  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">
              Active Tasks{" "}
              <input
                className="find-input"
                onChange={(e) => {
                  setDatatodoList(e.target.value.toUpperCase());

                  datatodoList ? setSearch(true) : setSearch(false);
                }}
                placeholder="Find the task"
              />
            </span>
            {search
              ? todos
                  ?.filter((todo) => {
                    return (
                      todo.todo.toUpperCase().includes(datatodoList) == true
                    );
                  })
                  .map((todo, index) => (
                    <SingleTodo
                      user={user}
                      setUser={setUser}
                      index={index}
                      todos={todos}
                      todo={todo}
                      key={todo.id}
                      setTodos={setTodos}
                    />
                  ))
              : todos?.map((todo, index) => (
                  <SingleTodo
                    user={user}
                    setUser={setUser}
                    index={index}
                    todos={todos}
                    todo={todo}
                    key={todo.id}
                    setTodos={setTodos}
                  />
                ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`todos  ${
              snapshot.isDraggingOver ? "dragcomplete" : "remove"
            }`}
          >
            <span className="todos__heading">
              Completed Tasks{" "}
              <input
                className="find-input"
                onChange={(e) => {
                  setDataComptodoList(e.target.value.toUpperCase());

                  dataComptodoList ? setSearch(true) : setSearch(false);
                }}
                placeholder="Find the task"
              />
            </span>
            {search
              ? CompletedTodos?.filter((todo) => {
                  return (
                    todo.todo.toUpperCase().includes(dataComptodoList) == true
                  );
                }).map((todo, index) => (
                  <SingleTodo
                    user={user}
                    setUser={setUser}
                    index={index}
                    todos={CompletedTodos}
                    todo={todo}
                    key={todo.id}
                    setTodos={setCompletedTodos}
                  />
                ))
              : CompletedTodos?.map((todo, index) => (
                  <SingleTodo
                    user={user}
                    setUser={setUser}
                    index={index}
                    todos={CompletedTodos}
                    todo={todo}
                    key={todo.id}
                    setTodos={setCompletedTodos}
                  />
                ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
