import { Routes, Route } from "react-router"
import Nav from "./header/Nav"
import Home from "./page/Home"
import Footer from "./footer/Footer"
function App() {

  return (
    <>
    <Nav />
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
    <Footer />
    </>
  )
}

export default App
