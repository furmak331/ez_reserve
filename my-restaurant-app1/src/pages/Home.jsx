import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import RestaurantCard from '../components/RestaurantCard';
import Footer from '../components/Footer';
import { theme } from '../styles/theme';
import { FaSearch } from 'react-icons/fa';
import { restaurantApi } from '../services/api';

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

const FilterButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'active'
})`
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRestaurants();
  }, []); // Remove page dependency since we're fetching all restaurants at once

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const { data } = await restaurantApi.getAll();
      if (data.success) {
        setRestaurants(data.data);
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    } finally {
      setLoading(false);
    }
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
                <RestaurantCard restaurant={restaurant} index={index} />
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