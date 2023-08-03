import { motion, useIsPresent } from "framer-motion"
import "./animation.css"
const TransitionScreen = () => {
    const isPresent = useIsPresent();

    return (
        <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0, transition: { duration: 0.5, ease: "circIn" } }}
        exit={{ scaleX: 1, transition: { duration: 0.5, ease: "circOut" } }}
        style={{ originX: isPresent ? 0 : 1 }}
        className="privacy-screen"
      />
    )
}

export default TransitionScreen