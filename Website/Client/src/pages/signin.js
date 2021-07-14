import Login from "../components/Login/Login";
import { motion } from "framer-motion";
import { animationOne, transition } from "./pageAnimation";

const SigninPage = () => {
  return (
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={animationOne}
      transition={transition}
    >
      <Login />
    </motion.div>
  );
};

export default SigninPage;
