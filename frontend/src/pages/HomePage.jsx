import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Dashboard from "../components/Dashboard";
import Process from "../components/Process";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <>
          <Hero />
          <Features />
          <Dashboard />
          <Process />
          <Testimonials />
          <Footer />
    
    </>
 );
}