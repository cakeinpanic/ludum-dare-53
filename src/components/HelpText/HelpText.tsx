import React, { useEffect } from 'react'

import styles from './HelpText.module.scss'

export function HelpText({ text }: { text: string }) {
  return (
    <>
      <div className={styles.helpText}>{text}</div>
    </>
  )
}
