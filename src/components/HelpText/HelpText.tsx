import React, { useEffect, useState } from "react";

import styles from "./HelpText.module.scss";

export function HelpText({
  text,
  inventory,
}: {
  text: string;
  inventory: string;
}) {
  const [oldText, setOldText] = useState<string>("");
  const [animate, setAnimate] = useState<boolean>(false);
  useEffect(() => {
    return () => {
      setAnimate(true);
      setOldText(text);
      setTimeout(() => {
        setAnimate(false);
        setOldText("");
      }, 1000);
    };
  }, [text]);
  useEffect(() => {}, [oldText]);
  return (
    <div className={styles.helpText}>
      <div className={styles.subs}>
        {animate ? (
          <>
            <div className={styles.old + " " + styles.disappear}>{oldText}</div>
            <div className={styles.old + " " + styles.appear}>{text}</div>
          </>
        ) : (
          <div className={styles.old}>{text}</div>
        )}

        {!oldText && <div className={styles.newNew}>{text}</div>}
      </div>
      <div className={styles.inventory}>Inventory: {inventory || "empty"}</div>
    </div>
  );
}
