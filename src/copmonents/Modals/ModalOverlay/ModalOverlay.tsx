import React from "react";
import styles from "./ModalOverlay.module.css";

type TOverlay = {
  onClose: () => any;
};

const ModalOverlay = ({ onClose }: TOverlay) => {
  return <div className={styles.container} onClick={onClose}/>;
};

export default ModalOverlay;
