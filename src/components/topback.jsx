const Topback = () => {
    return(
        <div className="back" onClick={() => navigate('/')}>
            <div className="fa-solid fa-arrow-left fa-xl active"></div>
            <div className="nav-logo"><p style={{fontFamily : "var(--caveat)"}}>Vixcera</p></div>
        </div>
    )
}

export default Topback