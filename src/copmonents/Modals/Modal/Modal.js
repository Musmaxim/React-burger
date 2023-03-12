import React, { useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import styles from "./Modal.module.css";

const modalRoot = document.getElementById("modals");

const Modal = ({ children, header, onClose }) => {

  const closeEsc = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", closeEsc);

    return () => {
      document.removeEventListener("keydown", closeEsc);
    };
  }, [closeEsc]);

  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <div className={styles.container}>
        <header className={styles.header + " ml-10 mr-10 mt-10"}>
          <p className="text text_type_main-large">{header}</p>
          <CloseIcon type="primary" onClick={onClose} />
        </header>
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  header: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
