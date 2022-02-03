import React from "react";
import { useRoutes } from "hookrouter";
import { Header } from "./components/Header";
import { Wrapper } from "./components/Wrapper";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Songs } from "./pages/Songs";
import { Weather } from "./pages/Weather";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";

const routes = {
  "/": () => <Home />,
  "/about*": () => <About />,
  "/songs-project": () => <Songs />,
  "/weather-api": () => <Weather />,
  "/contact": () => <Contact />,
};

function App() {
  const match = useRoutes(routes);
  return (
    <main>
      <Wrapper>
        <Header />
        <div className="container-flex">{match || <NotFound />}</div>
      </Wrapper>
    </main>
  );
}

export default App;
