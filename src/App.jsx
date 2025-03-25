import { BrowserRouter } from "react-router-dom";

import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
} from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0">
        {/* StarsCanvas sebagai latar belakang utama */}
        <StarsCanvas />

        {/* Konten aplikasi */}
        <div className="relative z-10">
          <div className="bg-cover bg-no-repeat bg-center">
            <Navbar />
            <Hero />
          </div>
          <div>
            <About />
            <Experience />
            <Tech />
            <Works />
            {/* <Feedbacks /> */}
          </div>
          <Contact />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
