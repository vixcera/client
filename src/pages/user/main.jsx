import Navbar from "../../components/navbar"
import Content from "../../components/content"
import Sidebar from "../../components/sidebar"
import "../../style/main.css"

const Main = () => {
    return (
        <div className="main">
            <Navbar/>
            <Content/>
            <Sidebar/>
        </div>
    )
}

export default Main