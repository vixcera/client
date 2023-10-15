import React from 'react'
import Routing from './routing'
import ReactDOM from 'react-dom/client'

import "react-lazy-load-image-component/src/effects/blur.css"
import "@fortawesome/fontawesome-free/css/all.css"
import "./root.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,
)
