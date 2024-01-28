import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"
const lenghtData = Array.from({ length: 5 }, () => ({}))

const Swaload = {
    Product : () => {
        return lenghtData.map((i, index) => {
            return(
            <div className='product-card' key={index}>
                <Skeleton style={{boxShadow: 'var(--softshadow)'}} className='product-img' baseColor='var(--primary)' highlightColor='var(--prime)'/>
                <div className='wrapped-text'>
                    <Skeleton  style={{boxShadow: 'var(--softshadow)'}} className='product-title' count={2} baseColor='var(--primary)' highlightColor='var(--prime)'/>
                    <div className='wrapdet' style={{ position: 'unset', marginTop: '15px', marginLeft: '5px', gap: '5px' }}>
                        <Skeleton style={{boxShadow: 'var(--softshadow)'}} width={95} height={30} baseColor='var(--primary)' highlightColor='var(--prime)'/>
                        <Skeleton style={{boxShadow: 'var(--softshadow)'}} width={95} height={30} baseColor='var(--primary)' highlightColor='var(--prime)'/>
                    </div>
                    <div className='wrapped-details'>
                        <Skeleton className='button price' style={{ backgroundColor: 'unset' }} baseColor='var(--primary)' highlightColor='var(--prime)'/>
                    </div>
                </div>
            </div>
            )
        } )
    },

    Details : () => {
        return(
            <>
            <div className="product-card" style={{ height: 'max-content', width: '100%', marginTop: '0px', justifyContent: 'center' }}>
                <Skeleton style={{boxShadow: 'var(--softshadow)', width: '100%', height: '400px'}} className='product-img' baseColor='var(--primary)' highlightColor='var(--prime)'/>
            </div>
            <Skeleton className="button-max" style={{boxShadow: 'var(--softshadow)', backgroundColor: 'unset'}} baseColor='var(--primary)' highlightColor='var(--prime)'/>
            <div className='product-card' style={{ height: 'max-content', width: '100%', marginTop: "30px" }}>
                <div className='wrapped-text'>
                    <Skeleton className="product-title" height={30} style={{boxShadow: 'var(--softshadow)'}} baseColor='var(--primary)' highlightColor='var(--prime)'/>
                    <Skeleton className="product-desc" height={20} style={{boxShadow: 'var(--softshadow)', marginTop: '10px'}} baseColor='var(--primary)' highlightColor='var(--prime)'/>
                </div>
            </div>
            <div className='product-card' style={{ height: 'max-content', width: '100%', marginTop: '10px' }}>
                <div className='wrapped-text'>
                    <div className='wrapped-details' style={{margin: 0, paddingTop: '0', display: 'flex',alignItems: 'unset', flexDirection: "column", gap: '10px'}}>
                        <Skeleton className="product-desc-product" count={4} style={{boxShadow: 'var(--softshadow)'}} baseColor='var(--primary)' highlightColor='var(--prime)'/>
                    </div>
                </div>
            </div>
            <div className='product-card' style={{ height: 'max-content', width: '100%' }}>
                <div className='wrapped-text'>
                    <div className='wrapped-details' style={{margin: 0, paddingTop: '0', display: 'flex',alignItems: 'unset', flexDirection: "column", gap: '10px'}}>
                        <Skeleton className="product-desc-product" count={2} style={{boxShadow: 'var(--softshadow)'}} baseColor='var(--primary)' highlightColor='var(--prime)'/>
                    </div>
                </div>
            </div>
            <Skeleton className="button-max" style={{boxShadow: 'var(--softshadow)', backgroundColor: 'unset', marginTop: '30px'}} baseColor='var(--primary)' highlightColor='var(--prime)'/>
            </>
        )
    }
}

export default Swaload