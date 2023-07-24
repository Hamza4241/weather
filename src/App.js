import Weather from "./components/weather";
import Navbar from "./components/navbar";
import Cities from "./components/Cities";
import Search from "./components/Search";

import React, {useState} from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {


  return (
    <div className="container h-max max-w-full bg-slate-900 text-white flex flex-row">
     <Router>
        {/* <Header/> */}

        <div className="navbar h-full">
          <Navbar/>
        </div>

        <div className="dynamic-area w-full">
          <Routes>
            
            <Route exact path="/" element={<Weather/>} />
            <Route exact path="/cities" element={<Cities/>} />
            <Route exact path="/search" element={<Search/>} />
            {/* <Route exact path="/csv" element={<CSV/>} />
            <Route exact path="/emp-pay" element={<EmpPay/>} />
            <Route exact path="/history" element={<History/>} />
            <Route exact path="/profile" element={<Profile/>} />
            <Route exact path="/inflation" element={<Inflation/>} />
            <Route exact path="/report" element={<Report/>} />
            <Route exact path="/bonus" element={<Bonus/>} />
            <Route exact path="/topup" element={<Top_up/>} />
            <Route exact path="/ai" element={<AI/>} /> */}
            
          </Routes>
        </div>

        {/* <Footer/> */}
      </Router>
    </div>

  );
}

export default App;
