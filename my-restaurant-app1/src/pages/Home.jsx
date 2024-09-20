import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import RestaurantCard from '../components/RestaurantCard';
import Footer from '../components/Footer';
import { theme } from '../styles/theme';
import { FaSearch } from 'react-icons/fa';

const HomeContainer = styled.div`
  min-height: 100vh;
  background-color: ${theme.colors.background};
`;

const Section = styled.section`
  max-width: 100%;
  padding: 6rem 2rem;
  background-color: ${theme.colors.background};
`;

const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  font-family: ${theme.fonts.heading};
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-align: center;
  color: ${theme.colors.text};
`;

const RestaurantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const SearchSection = styled.section`
  background-color: ${theme.colors.primaryLight};
  padding: 3rem 0;
  box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const SearchContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  background-color: ${theme.colors.white};
  border-radius: 50px;
  padding: 0.5rem 1rem;
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.08),
    inset 0 -2px 5px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  &:focus-within {
    transform: translateY(-2px);
    box-shadow: 
      0 6px 12
`;

const SearchInput = styled.input`
  flex-grow: 1;
  border: none;
  font-size: 1.1rem;
  padding: 0.5rem;
  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${theme.colors.primaryDark};
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const FilterButton = styled.button`
  background-color: ${props => props.active ? theme.colors.primary : theme.colors.white};
  color: ${props => props.active ? theme.colors.white : theme.colors.primary};
  border: 1px solid ${theme.colors.primary};
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
  }
`;

const LoadMoreButton = styled(motion.button)`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: bold;
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: 50px;
  cursor: pointer;
  margin-top: 2rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${theme.colors.primaryDark};
  }
`;

function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchRestaurants();
  }, [page]);

  const fetchRestaurants = async () => {
    // Simulate API call
    const newRestaurants = [
      {
        id: 1,
        name: "Gourmet Bistro",
        cuisine: "French",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      },
      {
        id: 2,
        name: "Sushi Haven",
        cuisine: "Japanese",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      },
      {
        id: 3,
        name: "Pasta Paradise",
        cuisine: "Italian",
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      },
      {
        id: 4,
        name: "Spice Route",
        cuisine: "Indian",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      },
      {
        id: 5,
        name: "Taco Fiesta",
        cuisine: "Mexican",
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      },
      {
        id: 6,
        name: "Dim Sum Delight",
        cuisine: "Chinese",
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      }
    ];
    
    setRestaurants(prev => [...prev, ...newRestaurants]);
    setHasMore(newRestaurants.length === 10);
  };

  const filteredRestaurants = restaurants.filter(restaurant => 
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (activeFilter === 'All' || restaurant.cuisine === activeFilter)
  );

  const cuisines = ['All', ...new Set(restaurants.map(r => r.cuisine))];

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <HomeContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <HeroSection />
      <SearchSection>
        <SearchContainer>
          <SearchInput 
            type="text" 
            placeholder="Search for restaurants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchButton>
            <FaSearch />
          </SearchButton>
        </SearchContainer>
        <FilterContainer>
          {cuisines.map(cuisine => (
            <FilterButton 
              key={cuisine}
              active={activeFilter === cuisine}
              onClick={() => setActiveFilter(cuisine)}
            >
              {cuisine}
            </FilterButton>
          ))}
        </FilterContainer>
      </SearchSection>
      <Section id="featured-restaurants">
        <SectionContent>
          <SectionTitle
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Featured Restaurants
          </SectionTitle>
          <RestaurantGrid>
            {filteredRestaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index % 10) }}
              >
                <RestaurantCard restaurant={restaurant} />
              </motion.div>
            ))}
          </RestaurantGrid>
          {hasMore && (
            <LoadMoreButton
              onClick={loadMore}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Load More
            </LoadMoreButton>
          )}
        </SectionContent>
      </Section>
      <Footer />
    </HomeContainer>
  );
}

export default Home;