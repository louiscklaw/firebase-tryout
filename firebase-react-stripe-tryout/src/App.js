import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";
import DefaultLayout from "./layouts/DefaultLayout";

import Home from "src/pages/Home";
import About from "src/pages/About";
import Users from "src/pages/Users";
import CheckOut from "src/pages/CheckOut";
import TestStripeElement from "src/pages/TestStripeElement";

function PaySuccess() {
  return <>Pay success</>;
}

export default function App() {
  return (
    <Router>
      <DefaultLayout>
        <Routes>
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/about" element={<About />} />
          <Route path="/users" element={<Users />} />
          <Route path="/success" element={<PaySuccess />} />
          <Route path="/test_stripe_element" element={<TestStripeElement />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </DefaultLayout>
    </Router>
  );
}
