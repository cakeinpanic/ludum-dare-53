import React, { useEffect } from "react";

import styles from "./Letter.module.scss";

export function Letter({ ...rest }) {
  return (
    <div className={styles.letter} {...rest}>
      <div className={styles.bg}></div>
      <span className={styles.text}>
        Hi, I'm a letter! There's something strange in your neighborhood. Go and
        check it.... This font gonna be changed, dont worry
      </span>
    </div>
  );
}
