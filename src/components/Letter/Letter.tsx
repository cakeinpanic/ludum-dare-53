import React from "react";

import styles from "./Letter.module.scss";

export function Letter({ ...rest }) {
  return (
    <div className={styles.letter} {...rest}>
      <div className={styles.container}>
        <div className={styles.bg}></div>
        <span className={styles.text}>
          Hi! <br />
          <span>
            Writing you in a rush – there's something weird going in your
            parents house, please come and check it out ASAP.
          </span>
          <br />
          <span className={styles.signature}>Love, J</span>
        </span>
      </div>
    </div>
  );
}
