import Topback from "../src/components/topback"

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
                <img src="/img/500page.png" style={{width: '270px'}}/>
                </>
            )}
        </div>
    )
}

export default Handle;