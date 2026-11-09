import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes'

// Fonts are self-hosted via Fontsource: faster, and no third-party requests.
import '@fontsource/young-serif/400.css'
import '@fontsource/dm-sans/400.css'
import '@fontsource/dm-sans/500.css'
import '@fontsource/dm-sans/700.css'
import '@fontsource/jetbrains-mono/500.css'

import './styles/tokens.css'
import './styles/base.css'

export const createRoot = ViteReactSSG({ routes })
