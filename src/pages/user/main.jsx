import Navbar from "../../components/navbar"
import Content from "../../components/content"
import Sidebar from "../../components/sidebar"
import checkCookie from "../../../utils/rules"
import { useEffect } from "react"
import "../../style/main.css"

const Main = () => {

    useEffect(() => { checkCookie() }, [])

    return (
        <div className="main">
            <Navbar/>
            <Content/>
            <Sidebar/>
        </div>
    )
}

export default Main