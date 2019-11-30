import React, {useState} from 'react';
import './Modal.scss';
import PropTypes from 'prop-types';

export const useModal = (defaultValue = false) => {
  const [isOpen, setOpen] = useState(defaultValue);

  return {
    isOpen,
    toggle: () => setOpen(!isOpen),
    close: () => setOpen(false),
    open: () => setOpen(true),
  }
};

const Modal = (props) => {
  const {title, children, open, close} = props;

  const handleClose = (e) => {
    e.preventDefault();
    close();
  };

  return (
    <>
      {open &&
      <div className='modal'>
        <div className="modal__wrapper">
          <header className="modal__header">
            <h5 className="modal__title">{title}</h5>
            <button className="modal__close" type='button' onClick={handleClose}>&times;</button>
          </header>
          <div className="modal__body">
            {children}
          </div>
        </div>
      </div>}
    </>
  )
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool,
  close: PropTypes.func.isRequired,
};

export default Modal;