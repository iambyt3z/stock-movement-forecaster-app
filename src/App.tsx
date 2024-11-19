import { Toolbar } from "@mui/material"
import ApplicationBar from "./components/ApplicationBar"
import MainContent from "./components/MainContent"

function App() {
    return (
        <>
            <ApplicationBar/>

            <Toolbar id="space-creator"/>

            <MainContent/>
        </>
    )
}

export default App
