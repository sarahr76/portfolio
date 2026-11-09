import { TokenCaption } from './TokenCaption'
import styles from './Swatch.module.css'

type Props = { name: string; token?: string; hex: string; note: string }

export function Swatch({ name, token, hex, note }: Props) {
  return (
    <div className={styles.swatch}>
      <div className={styles.chip} style={{ background: hex }} aria-hidden="true" />
      <div className={styles.body}>
        <div className={styles.name}>{name}</div>
        <TokenCaption>{token ? `${token} · ${hex}` : hex}</TokenCaption>
        <p className={styles.note}>{note}</p>
      </div>
    </div>
  )
}
