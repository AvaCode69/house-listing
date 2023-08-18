import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import { Home, About, Error, AddItem, SingleItemPage, EditItem } from "./pages";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />
        <Route path="/AddItem" element={<AddItem />} />
        <Route exact path="/:id" element={<SingleItemPage />} />
        <Route exact path="/edit/:id" element={<EditItem />} />
        <Route path="/*" element={<Error />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
