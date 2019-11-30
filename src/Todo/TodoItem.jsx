import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import clsx from 'classnames';
import Context from "../context";

const TodoItem = (props) => {
  const {title, id, completed, index} = props;
  const {toggleTask, deleteTask} = useContext(Context);
  return (
    <li className={clsx('todos-list__item', {'todos-list__item_done': completed})}>
      <span>
        <input id={`task-id-${id}`} type="checkbox" onChange={() => toggleTask(id)} checked={completed}/>
        <label htmlFor={`task-id-${id}`}>
          <b>{index + 1}. </b>
          {title}
        </label>
      </span>
      <button type='button' onClick={() => deleteTask(id)}>&times;</button>
    </li>)
};

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  completed: PropTypes.bool,
  index: PropTypes.number,
};

export default TodoItem;
