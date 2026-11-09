import { Link } from 'react-router-dom'
import { site } from '../../content/site'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <nav aria-label="Footer">
          <ul className={styles.links}>
            {site.nav.map((item) => (
              <li key={item.label}><Link to={item.to}>{item.label}</Link></li>
            ))}
            <li><a href={site.resume.href}>{site.resume.label}</a></li>
          </ul>
        </nav>
        <p className={styles.copy}>© {new Date().getFullYear()} {site.name}</p>
      </div>
    </footer>
  )
}
