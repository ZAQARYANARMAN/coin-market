import styles from "./style.module.css";
import React from "react";

function IconWithToolltip({ icon: Icon, text, onClick }) {
  return (
    <div className={styles.iconWrapper}>
      <Icon className={styles.icon} onClick={onClick} />
      <span className={styles.tooltip}>{text}</span>
    </div>
  );
}

export default IconWithToolltip;