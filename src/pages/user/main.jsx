import Navbar from "../../components/navbar"
import browser from "../../../utils/browser"
import Content from "../../components/content"
import Sidebar from "../../components/sidebar"
import { useEffect } from "react"
import "../../style/main.css"
import checkCookie from "../../../utils/checkCookie"

const Main = () => {

    useEffect(() => { 
        checkCookie()
     }, [])

    return (
        <div className="main">
            <Navbar/>
            <Content/>
            <Sidebar/>
        </div>
    )
}

export default Main