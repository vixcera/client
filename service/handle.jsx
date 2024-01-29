import Topback from "../src/components/topback"
import { LazyLoadImage } from "react-lazy-load-image-component"

const Handle = ({ status }) => {
    return(
        <div className="page" style={{flexDirection: 'column', gap: '30px'}}>
            <Topback/>
            {(status == 404) ? (
                <>
                <LazyLoadImage src="/img/404page.png" effect="blur" loading="lazy" style={{width: '250px'}}/>
                <div className="title" style={{fontSize: '1.4rem'}}>Products not found</div>
                </>
            ) : (
                <>
                <LazyLoadImage src="/img/200page.png" effect="blur" loading="lazy" style={{width: '250px'}}/>
                <div className="title" style={{fontSize: '1.4rem'}}>Server maintenance</div>
                </>
            )}
        </div>
    )
}

export default Handle;