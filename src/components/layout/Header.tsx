import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { site } from '../../content/site'
import { Button } from '../ui/Button'
import styles from './Header.module.css'

const linkClass = ({ isActive }: { isActive: boolean }) => `${styles.navLink}${isActive ? ' active' : ''}`

export function Header() {
  const [open, setOpen] = useState(false)
  const { pathname, hash } = useLocation()
  const menuBtn = useRef<HTMLButtonElement>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)

  // Close the menu after navigating.
  useEffect(() => setOpen(false), [pathname, hash])

  // While open: lock page scroll, move focus in, and let Escape close it.
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    closeBtn.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuBtn.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <Link className={styles.logo} to="/">{site.name}</Link>

        <nav className={styles.nav} aria-label="Main">
          {site.nav.map((item) => (
            <NavLink key={item.label} className={linkClass} to={item.to}>{item.label}</NavLink>
          ))}
          <a className={styles.navLink} href={site.resume.href}>{site.resume.label}</a>
          <Button to={site.contact.to}>{site.contact.label}</Button>
        </nav>

        <button
          ref={menuBtn}
          type="button"
          className={styles.menuBtn}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(true)}
        >
          Menu
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>

      <div id="mobile-nav" className={styles.overlay} hidden={!open} role="dialog" aria-modal="true" aria-label="Main menu">
        <div className={styles.overlayTop}>
          <span className={styles.logo}>{site.name}</span>
          <button
            ref={closeBtn}
            type="button"
            className={styles.menuBtn}
            onClick={() => { setOpen(false); menuBtn.current?.focus() }}
          >
            Close
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <ul className={styles.overlayList}>
          {site.nav.map((item) => (
            <li key={item.label}><Link className={styles.overlayLink} to={item.to}>{item.label}</Link></li>
          ))}
          <li><a className={styles.overlayLink} href={site.resume.href}>{site.resume.label}</a></li>
        </ul>
        <Button to={site.contact.to}>{site.contact.label}</Button>
      </div>
    </header>
  )
}
