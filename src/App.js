import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Blogs from "./components/Blogs/Blogs";
import { Route, Routes } from "react-router-dom";
import BlogPage from "./components/BlogPage/BlogPage";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path = "/" element = {<Blogs/>}/>
        <Route path = "/blogs/:id" element = {<BlogPage/>}/>
      </Routes>
    </>
  );
}

export default App;
