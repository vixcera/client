import bowser from "bowser"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { LazyLoadImage } from "react-lazy-load-image-component"

const Browser = () => {

    const navigate = useNavigate()
    const safari = '/'
    const chrome = '/'
    const firefox = '/'

    const [name, setName] = useState('')
    const [version, setVersion] = useState(null)

    useEffect(() => {
        const info = bowser.parse(window.navigator.userAgent)
        setName(info.browser.name.toLowerCase())
        setVersion(info.browser.version)
    }, [])

    return(
        <div className="page-max">
            <div className="back" onClick={() => navigate('/')}>
                <div className="fa-solid fa-arrow-left fa-xl active"></div>
                <div className="nav-logo" style={{fontFamily: 'var(--caveat)'}}>Vixcera</div>
            </div>
            <div className="browser">
                <div className="top-browser">
                    <LazyLoadImage src="" loading="lazy" effect="blur"/>
                    <div style={{ textAlign: 'center' }}>
                        <div className="title">{name}</div>
                        <div className="desc">v. {version}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Browser