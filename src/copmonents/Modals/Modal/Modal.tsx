import React, { useEffect, useCallback, ReactNode, FC } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Modal.module.css";

const modalRoot: any = document.getElementById("modals");

type TModal = {
  children: ReactNode;
  onClose: () => void;
};

const Modal: FC<TModal> = ({ children, onClose }) => {
  const closeEsc = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
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
          <CloseIcon type="primary" onClick={onClose} />
        </header>
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </div>,
    modalRoot
  );
};

export default Modal;
