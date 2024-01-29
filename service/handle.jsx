import Topback from "../src/components/topback"
import { LazyLoadImage } from "react-lazy-load-image-component"

const Handle = ({ status }) => {
    return(
        <div className="page">
            <Topback/>
            {(status == 404) ? (
                <LazyLoadImage src="/img/404page.png" effect="blur" loading="lazy" style={{width: '250px'}}/>
            ) : (
                <LazyLoadImage src="/img/200page.png" effect="blur" loading="lazy" style={{width: '250px'}}/>
            )}
        </div>
    )
}

export default Handle;