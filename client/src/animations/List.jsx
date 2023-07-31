import { motion, Variants } from "framer-motion";

const list = {
    visible: { 
        opacity: 1, 
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.1
          }
    },
    hidden: { opacity: 0 },
  }
export const ListParent = ({children}) => {
    return (
        <motion.ul
        initial="hidden"
        animate="visible"
        variants={list}
        style={{
            listStyleType: "none",
            all : "inherit",
            position : "initial"
        }}
        >
            {children}
        </motion.ul>
    )
} 



const itemVariants = {
    hidden: {
      opacity: 0,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    visible: { opacity: 1, y: 20, transition: { duration: 0.2 } }
  };

export const ListItem = ({children}) => {
    return (
        <motion.li variants={itemVariants} style={{listStyleType : "none", listStylePosition: "outside",  }}>
            {children}
        </motion.li>
    )
}