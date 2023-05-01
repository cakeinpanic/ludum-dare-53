import React, { useEffect } from "react";

import styles from "./Subtitles.module.scss";

export function Subtitles({ text, clear }: { text: string; clear: () => {} }) {
  return text ? (
    <div className={styles.container} onClick={clear}>
      <div className={styles.subtitles}>
        <div className={styles.text}>{text}</div>
      </div>
    </div>
  ) : (
    <></>
  );
}
