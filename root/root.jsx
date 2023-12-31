import React from 'react'
import axios from 'axios'
import Routing from './routing'
import ReactDOM from 'react-dom/client'
axios.defaults.withCredentials = true

import "react-lazy-load-image-component/src/effects/blur.css"
import "@fortawesome/fontawesome-free/css/all.css"
import "./root.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,
)
