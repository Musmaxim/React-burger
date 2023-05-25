import React, { useEffect, useCallback, ReactNode, FC } from 'react';
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Modal.module.css";

const modalRoot: any = document.getElementById("modals");

type TModal = {
  children: ReactNode;
  handleCloseModal: () => void;
};

const Modal:FC<TModal> = ({ children, handleCloseModal }) => {
  const closeEsc = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    },
    [handleCloseModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", closeEsc);

    return () => {
      document.removeEventListener("keydown", closeEsc);
    };
  }, [closeEsc]);

  return ReactDOM.createPortal(
    (
    <div className={styles.modal}>
      <div className={styles.container}>
        <header className={styles.header + " ml-10 mr-10 mt-10"}>
          <CloseIcon type="primary" onClick={handleCloseModal} />
        </header>
        {children}
      </div>
      <ModalOverlay onClose={handleCloseModal} />
    </div>
    ),
    modalRoot
  );
};

export default Modal;
