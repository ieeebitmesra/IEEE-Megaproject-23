import React from "react";
import Showcase from "./Showcase";
import Navbar from "./Navbar";
import Topmost from "./Topmost";
import { ListC } from "./ListC";
import { Headinginterest } from "./ListC";
import Meetdev from "./Meet-devs";
import Footer from "./Footer";

export default function Home() {
  return (
    <div className="bg-[url('/static/images/bitphoto.JPG')] z-10 bg-center bg-cover bg-fixed">
      <Navbar />
      <Topmost />
      <Showcase />
      <Headinginterest />
      <ListC />
      <Meetdev />
      <Footer />
    </div>
  );
}
