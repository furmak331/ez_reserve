// src/components/Footer.jsx
import { Typography } from "@mui/material";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        backgroundColor: "#1abc9c",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <Typography variant="body1" color="white">
        © {new Date().getFullYear()} Restaurant Reserve. All rights reserved.
      </Typography>
    </motion.footer>
  );
};

export default Footer;
