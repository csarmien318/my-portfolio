import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Songs from "./pages/Songs";
import Weather from "./pages/Weather";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import useAuth from "./hooks/useAuth";

// const App = () => {
//   const { isUser } = useAuth();

//   return (
//     <Router>
//       <Header />
//       <Routes>
//         {!isUser && <Route path="/login" element={<Login />} />}

//         {isUser && (
//           <>
//             <Route path="/" element={<Home />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/songs" element={<Songs />} />
//             <Route path="/weather" element={<Weather />} />
//             <Route path="/contact" element={<Contact />} />
//           </>
//         )}
//         <Route path="*" element={<Navigate to={isUser ? "/" : "/login"} />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

const App = () => {
  return (
    <Router>
      <Header />
      <AppRoutes>
        <Routes />
      </AppRoutes>
    </Router>
  );
};

export const AppRoutes = () => {
  const { isUser } = useAuth();

  return (
    <>
      <Routes>
        {!isUser && <Route path="/login" element={<Login />} />}

        {isUser && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/songs" element={<Songs />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/contact" element={<Contact />} />
          </>
        )}
        <Route path="*" element={<Navigate to={isUser ? "/" : "/login"} />} />
      </Routes>
    </>
  );
};

export default App;
