import { createRoot } from 'react-dom/client'
import App from './App'
import "./index.css"
import "./pages/Search/index.scss"
import 'swiper/css';

createRoot(document.getElementById('root')!).render(
  <>
    <App />
  </>
)
