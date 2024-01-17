import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";

import state from "../store";
import { CustomButton } from "../components";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "../config/motion";

const Home = () => {
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="home" {...slideAnimation("left")}>
          <motion.header {...slideAnimation("down")} className="flex justify-center items-center">
            <img
              src="./threejs.png"
              alt="logo"
              className="w-20 h-20 object-contain"
            />
            <a href='https://floating-beyond-24611-5e378c213419.herokuapp.com/'><button class="center w-15 h-10 bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition duration-500 transform hover:scale-105 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 animate-colorChange">AR</button></a>
          </motion.header>

          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="head-text">
                animAR <br className="xl:block hidden" /> Create
              </h1>
            </motion.div>
            <motion.div
              {...headContentAnimation}
              className="flex flex-col gap-5"
            >
              <p className="max-w-md font-normal text-gray-600 text-base">
                Craft the perfect, exclusive product that reflects your
                individuality with our state-of-the-art 3D customization tool.
                Unleash your <strong>boundless imagination </strong>and define your unique style
                like never before.
              </p>

              <CustomButton
                type="filled"
                title="Get Started"
                handleClick={() => (state.intro = false)}
                customStyles="w-fit px-4 py-2.5 font-bold text-sm"
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Home;
