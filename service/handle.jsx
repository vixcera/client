import Topback from "../src/components/topback"
import { LazyLoadImage } from "react-lazy-load-image-component";

const Handle = ({ status }) => {
    return(
        <div className="page" style={{flexDirection: 'column', gap: '30px'}}>
            <Topback/>
            {(status == 404) ? (
                <>
                <img src="/img/404page.png" style={{width: '250px'}}/>
                <div className="title" style={{fontSize: '1.4rem'}}>Products not found</div>
                </>
            ) : (
                <>
                <LazyLoadImage src="/img/500.png" style={{width: '340px'}} effect="blur" loading="lazy"/>
                </>
            )}
        </div>
    )
}

export default Handle;