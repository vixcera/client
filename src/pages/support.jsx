import { useNavigate } from "react-router";
import Safe from "react-safe"

const Support = () => {

    const navigate = useNavigate()

    return (
        <div className="page">
            <div className="back" onClick={() => navigate('/')}>
                <div className="fa-solid fa-arrow-left fa-xl active"></div>
                <div className="nav-logo" style={{fontFamily: 'var(--caveat)'}}>Vixcera</div>
            </div>
            <div className="product-page" style={(window.innerWidth < 425) ? {marginTop: '20px'} : {marginTop: '0'}}>
                <div id="disqus_thread"></div>
            </div>
            <Safe.script>
                {(function() { // DON'T EDIT BELOW THIS LINE
                    var d = document, s = d.createElement('script');
                    s.src = 'https://vixcera-netlify-app.disqus.com/embed.js';
                    s.setAttribute('data-timestamp', +new Date());
                    (d.head || d.body).appendChild(s);
                })()}
            </Safe.script>
        </div>
    )
}

export default Support