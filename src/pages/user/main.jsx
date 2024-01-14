import Navbar from "../../components/navbar"
import Content from "../../components/content"
import Sidebar from "../../components/sidebar"
import { useEffect } from "react"
import "../../style/main.css"
import browser from "../../../utils/browser"

const Main = () => {

    useEffect(() => { browser()}, [])

    return (
        <div className="main">
            <Navbar/>
            <Content/>
            <Sidebar/>
        </div>
    )
}

export default Main