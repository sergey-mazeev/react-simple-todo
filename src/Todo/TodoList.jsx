import React from 'react';
import TodoItem from "./TodoItem";
import PropTypes from 'prop-types';

const TodoList = (props) => {
  const {todos} = props;
  return (
    <ol className='todos-list'>
      {todos.map((todo, index) =>
        <TodoItem {...todo} key={todo.id} index={index}/>
      )}
    </ol>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoList;
