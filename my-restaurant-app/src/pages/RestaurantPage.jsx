import { Typography, Button, Container } from "@mui/material";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

const RestaurantPage = () => {
  const { id } = useParams();
  // Fetch restaurant data based on the `id` parameter
  return (
    <Container>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <Typography variant="h4" gutterBottom>
          Restaurant {id}
        </Typography>
        <Typography variant="body1" paragraph>
          Book your table today at Restaurant {id} and enjoy a delightful dining experience.
        </Typography>
        <Button variant="contained" color="primary" size="large">
          Confirm Reservation
        </Button>
      </motion.div>
    </Container>
  );
};

export default RestaurantPage;
