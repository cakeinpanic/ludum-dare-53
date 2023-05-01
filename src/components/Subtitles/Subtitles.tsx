import React from "react";

import styles from "./Subtitles.module.scss";

export function Subtitles({ text, clear }: { text: string; clear: () => {} }) {
  return text ? (
    <div className={styles.subtitles} onClick={clear}>
      <div className={styles.text}>{text}</div>
    </div>
  ) : (
    <></>
  );
}
