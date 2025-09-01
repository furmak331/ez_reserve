import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { reservationApi } from '../services/api';
import { theme } from '../styles/theme';

const ReservationsContainer = styled.div`
  max-width: 1000px;
  margin: 2rem auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-family: ${theme.fonts.heading};
  color: ${theme.colors.primary};
  margin-bottom: 2rem;
  text-align: center;
`;

const ReservationCard = styled(motion.div)`
  background: ${theme.colors.white};
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-left: 4px solid ${theme.colors.primary};
`;

const RestaurantName = styled.h3`
  color: ${theme.colors.primary};
  margin-bottom: 0.5rem;
`;

const ReservationDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

const DetailItem = styled.div`
  p {
    margin: 0;
    color: ${theme.colors.text};
  }
  strong {
    color: ${theme.colors.primary};
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  background-color: ${props => 
    props.status === 'confirmed' ? '#d4edda' : 
    props.status === 'pending' ? '#fff3cd' : 
    props.status === 'cancelled' ? '#f8d7da' : '#e2e3e5'
  };
  color: ${props => 
    props.status === 'confirmed' ? '#155724' : 
    props.status === 'pending' ? '#856404' : 
    props.status === 'cancelled' ? '#721c24' : '#6c757d'
  };
`;

const NoReservations = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${theme.colors.textLight};
`;

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const { data } = await reservationApi.getMyReservations();
      if (data.success) {
        setReservations(data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch reservations');
      console.error('Error fetching reservations:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ReservationsContainer>
        <Title>My Reservations</Title>
        <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>
      </ReservationsContainer>
    );
  }

  if (error) {
    return (
      <ReservationsContainer>
        <Title>My Reservations</Title>
        <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>{error}</div>
      </ReservationsContainer>
    );
  }

  return (
    <ReservationsContainer>
      <Title>My Reservations</Title>
      
      {reservations.length === 0 ? (
        <NoReservations>
          <h3>No reservations found</h3>
          <p>You haven't made any reservations yet. Browse restaurants and make your first booking!</p>
        </NoReservations>
      ) : (
        <>
          {reservations.map((reservation) => (
            <ReservationCard
              key={reservation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <RestaurantName>{reservation.restaurant_name}</RestaurantName>
                <StatusBadge status={reservation.status}>{reservation.status}</StatusBadge>
              </div>
              
              <ReservationDetails>
                <DetailItem>
                  <p><strong>Date:</strong> {new Date(reservation.reservation_date).toLocaleDateString()}</p>
                </DetailItem>
                <DetailItem>
                  <p><strong>Time:</strong> {reservation.reservation_time}</p>
                </DetailItem>
                <DetailItem>
                  <p><strong>Party Size:</strong> {reservation.party_size} {reservation.party_size === 1 ? 'person' : 'people'}</p>
                </DetailItem>
                <DetailItem>
                  <p><strong>Reservation ID:</strong> #{reservation.id}</p>
                </DetailItem>
              </ReservationDetails>
              
              {reservation.special_requests && (
                <DetailItem>
                  <p><strong>Special Requests:</strong> {reservation.special_requests}</p>
                </DetailItem>
              )}
              
              <DetailItem style={{ marginTop: '1rem' }}>
                <p><strong>Address:</strong> {reservation.street_address}</p>
              </DetailItem>
            </ReservationCard>
          ))}
        </>
      )}
    </ReservationsContainer>
  );
};

export default MyReservations;
