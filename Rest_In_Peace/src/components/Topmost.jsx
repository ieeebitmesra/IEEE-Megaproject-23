import React from "react";
import { TypeAnimation } from "react-type-animation";

function Topmost() {
  return (
    <div className="h-screen w-full">
      <div className="absolute left-0 top-0 h-screen w-full bg-black/60">
        <TypeAnimation
          sequence={[
            'Intuitive Dashboard, Your Way!',
            2000,
            'Latest Updates at Your Fingertips! Newsroom',
            2000,
            'Empower Your Club, Admin Style!',
            2000,
            'Recruit Smart with CLUBCONNECT!',
            2000,
            'Your College Clubs Await!',
            2000,
            'Sync Calendars, Stay Updated!',
            2000
          ]}
          wrapper="h1"
          speed={30}
          className="webkit-typewriter text-2xl bg-clip-text text-transparent font-extrabold text-center p-2 my-[50vh] md:text-4xl"
          repeat={Infinity}
          />
      </div>
    </div>
  );
}
export default Topmost;
