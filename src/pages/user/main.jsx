import Navbar from "../../components/navbar"
import Content from "../../components/content"
import Sidebar from "../../components/sidebar"
import Loading from "../../../utils/loading"
import { Suspense } from "react"
import "../../style/main.css"

const Main = () => {

    return (
        <div className="main">
            <Suspense fallback={<Loading/>}>
                <Navbar/>
                <Content/>
                <Sidebar/>
            </Suspense>
            
        </div>
    )
}

export default Main