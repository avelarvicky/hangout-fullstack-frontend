import { Routes, Route } from "react-router-dom";
import "./App.css";

// import pages
import HomePage from "./Pages/HomePage";

// import components
import NavBar from "./Components/NavBar";
import YourHangouts from "./Pages/YourHangouts";
import AddHangout from "./Pages/AddHangout";
import EditHangoutPage from "./Pages/EditHangout";
import HangoutDetailsPage from "./Pages/HangoutDetails";
import SignUpPage from "./Pages/SignUp";
import LoginPage from "./Pages/Login";

import IsPrivate from './Components/IsPrivate';
import IsAnon from './Components/IsAnon';
import AddComment from "./Pages/AddComment";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hangouts" element={<YourHangouts />} />
        <Route path="/hangouts/create" element={<AddHangout />} />
        <Route path="/hangouts/:hangoutId" element={<HangoutDetailsPage />} />
        <Route path="/hangouts/edit/:hangoutId" element={<EditHangoutPage />} />

        <Route path="/signup" element={<IsAnon><SignUpPage/></IsAnon>}/>
        <Route path="/login" element={<IsAnon><LoginPage/></IsAnon>}/>

        <Route path="/comments/create" element={<AddComment />} />
      </Routes>
    </div>
  );
}

export default App;