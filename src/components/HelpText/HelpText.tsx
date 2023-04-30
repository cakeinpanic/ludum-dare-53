import React, { useEffect } from "react";

import styles from "./HelpText.module.scss";

export function HelpText({
  text,
  inventory,
}: {
  text: string;
  inventory: string;
}) {
  console.log(inventory);
  return (
    <div className={styles.helpText}>
      <div className={styles.subs}>{text}</div>
      <div className={styles.inventory}>Inventory: {inventory || "empty"}</div>
    </div>
  );
}
