import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Modal, {useModal} from "../Modal/Modal";

const useInputValue = (defaultvalue = '') => {
  const [value, setValue] = useState(defaultvalue);
  return {
    bind: {
      value,
      onChange: e => setValue(e.target.value),
    },
    clear: () => setValue(''),
    value: () => value,
  }
};

const useInputCheckbox = (defaultStatus = false) => {
  const [checked, setChecked] = useState(defaultStatus);

  return {
    checked,
    onChange: () => setChecked(!checked),
  }
};

const AddTodo = ({createTodo}) => {
  const {bind, clear, value} = useInputValue();
  const {open, close, isOpen} = useModal();
  const inputCheckbox = useInputCheckbox();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (value().trim().length) {
      createTodo(value(), inputCheckbox.checked);
      clear();
      close();
    }
  };

  const openModal = (e) => {
    e.preventDefault();
    open();
  };

  return (
    <form className="form form_add-todo" onSubmit={handleSubmit}>
      <input
        type="text"
        name="todoname"
        placeholder="New todo item name"
        {...bind}/>
      <button type="submit" className="btn btn_main">Add todo</button>
      <button type="button" className="btn btn_accent" onClick={openModal}>Add custom todo</button>

      <Modal title='Add todo' open={isOpen} close={close}>
        <div className="task-completed-flag">
          <input id="isTaskCompleted" type="checkbox" {...inputCheckbox}/>
          <label htmlFor="isTaskCompleted">Task completed</label>
          <button type="submit" className="btn btn_main" onClick={handleSubmit}>Add task</button>
        </div>
      </Modal>
    </form>
  );
};

AddTodo.propTypes = {
  createTodo: PropTypes.func.isRequired,
};

export default AddTodo;