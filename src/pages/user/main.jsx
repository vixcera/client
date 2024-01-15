import Navbar from "../../components/navbar"
import browser from "../../../utils/browser"
import Content from "../../components/content"
import Sidebar from "../../components/sidebar"
import { useEffect } from "react"
import "../../style/main.css"

const Main = () => {

    useEffect(() => { browser() }, [])

    return (
        <div className="main">
            <Navbar/>
            <Content/>
            <Sidebar/>
        </div>
    )
}

export default Main