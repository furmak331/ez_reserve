import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { restaurantApi, reservationApi } from '../services/api';

const DetailContainer = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const ImageGallery = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
  
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 12px;
  }
`;

const ReservationSection = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [partySize, setPartySize] = useState(2);
  const [specialRequests, setSpecialRequests] = useState('');
  const [loading, setLoading] = useState(true);
  const [reservationLoading, setReservationLoading] = useState(false);

  // Available time slots
  const timeSlots = [
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30', '21:00', '21:30', '22:00'
  ];

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const { data } = await restaurantApi.getById(id);
        if (data.success) {
          // Handle nested restaurant structure
          setRestaurant(data.data.restaurant || data.data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching restaurant:', error);
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);

  const handleReservation = async () => {
    if (!selectedTime) {
      alert('Please select a time');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to make a reservation');
      return;
    }

    setReservationLoading(true);
    
    try {
      // Format date as YYYY-MM-DD
      const formattedDate = selectedDate.toISOString().split('T')[0];
      
      const { data } = await reservationApi.create({
        restaurant_id: parseInt(id),
        reservation_date: formattedDate,
        reservation_time: selectedTime,
        party_size: partySize,
        special_requests: specialRequests
      });
      
      if (data.success) {
        alert('Reservation created successfully!');
        // Reset form
        setSelectedDate(new Date());
        setSelectedTime('');
        setPartySize(2);
        setSpecialRequests('');
      }
    } catch (error) {
      console.error('Error creating reservation:', error);
      alert(error.response?.data?.message || 'Failed to create reservation');
    } finally {
      setReservationLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }

  return (
    <DetailContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ImageGallery>
        <img src={restaurant.image_url || restaurant.image || '/assets/hero-image0.jpg'} alt={restaurant.name} />
      </ImageGallery>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div>
          <h1>{restaurant.name}</h1>
          <p><strong>Cuisine:</strong> {restaurant.cuisine}</p>
          <p><strong>Address:</strong> {restaurant.address}</p>
          <p><strong>Phone:</strong> {restaurant.phone}</p>
          <p><strong>Hours:</strong> {restaurant.hours}</p>
          <p><strong>Price Range:</strong> {restaurant.price_range}</p>
          <p><strong>Rating:</strong> {restaurant.avg_rating || restaurant.rating}/5</p>
          <p>{restaurant.description}</p>
        </div>

        <ReservationSection>
          <h2>Make a Reservation</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label>Date:</label>
            <DatePicker
              selected={selectedDate}
              onChange={date => setSelectedDate(date)}
              minDate={new Date()}
              dateFormat="MMMM d, yyyy"
              style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Time:</label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0' }}
            >
              <option value="">Select Time</option>
              {timeSlots.map(time => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Party Size:</label>
            <select
              value={partySize}
              onChange={(e) => setPartySize(Number(e.target.value))}
              style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0' }}
            >
              {[...Array(20)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} {i === 0 ? 'Person' : 'People'}
                </option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Special Requests:</label>
            <textarea
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="Any special requests..."
              style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0', minHeight: '80px' }}
            />
          </div>
          <button 
            onClick={handleReservation}
            disabled={reservationLoading}
            style={{ 
              width: '100%', 
              padding: '1rem', 
              backgroundColor: '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px',
              cursor: reservationLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {reservationLoading ? 'Creating Reservation...' : 'Reserve Now'}
          </button>
        </ReservationSection>
      </div>
    </DetailContainer>
  );
};

export default RestaurantDetails;