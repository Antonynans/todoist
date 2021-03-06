import { Droppable } from 'react-beautiful-dnd';

import React, { useEffect } from 'react';
import { Todo } from './module';
import SingleTodo from './SingleTodo';
import "./style.css";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList = ({ todos, setTodos, completedTodos, setCompletedTodos }: Props) => {

  useEffect(() => {
    localStorage.setItem("todosdata", JSON.stringify(todos));
    localStorage.setItem("completedTodosData", JSON.stringify(completedTodos));
  }, [todos, completedTodos]);

  return (
 
  <div className="container">
    <Droppable droppableId='TodosList'>
      {(provided, snapshot) => (
        <div className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`} ref={provided.innerRef} {...provided.droppableProps}>
      <span className="todos__heading">
        Active Tasks
      </span>
      {
        todos.map((todo, index) => (
          <SingleTodo index={index} todo={todo} key={todo.id} todos={todos} setTodos={setTodos} />
        ))
      }
      {provided.placeholder}
    </div>
      )}
        </Droppable>
        
        <Droppable droppableId='TodosRemove '>
        {(provided, snapshot) => (
          <div className={`todos remove ${snapshot.isDraggingOver ? "dragcomplete" : ""}`} ref={provided.innerRef} {...provided.droppableProps}>
      <span className="todos__heading">
        Completed Tasks
      </span>
      {
        completedTodos.map((todo, index) => (
          <SingleTodo index={index} todo={todo} key={todo.id} todos={completedTodos} setTodos={setCompletedTodos} />
        ))
      }
      {provided.placeholder}
    </div>
        )}
        </Droppable>
    
  </div>
  );
};

export default TodoList;
