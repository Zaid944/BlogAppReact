import Navbar from "./components/Header/Navbar";
import Blogs from "./components/Dashboard/Display/Blogs";
import { Route, Routes } from "react-router-dom";
import { BlogContextProvider } from "./context/blog-crud-context";
import BlogPage from "./components/BlogPageMain/BlogPageContainer/BlogPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={
            <BlogContextProvider>
              <Blogs />
            </BlogContextProvider>
          }
        />
        <Route path='/blogs/:id' element={<BlogPage />} />
      </Routes>
    </>
  );
}

export default App;
