import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SingleEvent from "./pages/SingleEvent";
import NotFound from "./pages/NotFound";
import Navbar from "./component/globalcomponent/Navbar";
import Footer from "./component/globalcomponent/Footer";
import MyEvents from "./pages/MyEvents";
import AddEvent from "./pages/AddEvent";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/signin" Component={SignIn} />
        <Route path="/signup" Component={SignUp} />
        <Route path="/myevents" Component={MyEvents} />
        <Route path="/addevent" Component={AddEvent} />
        <Route path="/events/:id" Component={SingleEvent} />
        <Route path="*" Component={NotFound} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
