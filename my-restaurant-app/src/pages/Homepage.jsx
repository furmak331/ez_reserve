import { Grid, Typography, Card, CardMedia, CardContent, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const restaurants = [
  { id: 1, name: "The Spicy Spoon", image: "/assets/spicy-spoon.jpg" },
  { id: 2, name: "Ocean's Delight", image: "/assets/ocean-delight.jpg" },
  { id: 3, name: "The Green Salad", image: "/assets/green-salad.jpg" },
];

const HomePage = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h3" align="center" gutterBottom>
        Welcome to Restaurant Reserve
      </Typography>
      <Typography variant="h6" align="center" paragraph>
        Book your favorite restaurant without the hassle of waiting.
      </Typography>
      <Grid container spacing={4}>
        {restaurants.map((restaurant) => (
          <Grid item key={restaurant.id} xs={12} sm={6} md={4}>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <Card>
                <CardMedia
                  component="img"
                  alt={restaurant.name}
                  height="200"
                  image={restaurant.image}
                  title={restaurant.name}
                />
                <CardContent>
                  <Typography variant="h5">{restaurant.name}</Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to={`/restaurant/${restaurant.id}`}
                    fullWidth
                    sx={{ marginTop: 2 }}
                  >
                    Book a Table
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default HomePage;
