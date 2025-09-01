import { createContext, useContext, useReducer } from 'react';
import { reservationApi, restaurantApi } from '../services/api';

const ReservationContext = createContext();

// Reservation reducer
const reservationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    case 'SET_RESERVATIONS':
      return {
        ...state,
        reservations: action.payload,
        loading: false
      };
    case 'ADD_RESERVATION':
      return {
        ...state,
        reservations: [action.payload, ...state.reservations],
        loading: false
      };
    case 'UPDATE_RESERVATION':
      return {
        ...state,
        reservations: state.reservations.map(reservation =>
          reservation.id === action.payload.id ? action.payload : reservation
        ),
        loading: false
      };
    case 'CANCEL_RESERVATION':
      return {
        ...state,
        reservations: state.reservations.map(reservation =>
          reservation.id === action.payload ? 
          { ...reservation, status: 'cancelled' } : reservation
        ),
        loading: false
      };
    case 'SET_AVAILABILITY':
      return {
        ...state,
        availability: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  reservations: [],
  availability: null,
  loading: false,
  error: null
};

// Reservation provider component
export const ReservationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reservationReducer, initialState);

  // Create reservation
  const createReservation = async (reservationData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const response = await reservationApi.create(reservationData);
      const newReservation = response.data.data;
      
      dispatch({ type: 'ADD_RESERVATION', payload: newReservation });
      return { success: true, data: newReservation };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create reservation';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Get user reservations
  const fetchMyReservations = async (filters = {}) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const response = await reservationApi.getMyReservations(filters);
      const reservations = response.data.data;
      
      dispatch({ type: 'SET_RESERVATIONS', payload: reservations });
      return { success: true, data: reservations };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch reservations';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Update reservation
  const updateReservation = async (id, updateData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const response = await reservationApi.update(id, updateData);
      const updatedReservation = response.data.data;
      
      dispatch({ type: 'UPDATE_RESERVATION', payload: updatedReservation });
      return { success: true, data: updatedReservation };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update reservation';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Cancel reservation
  const cancelReservation = async (id) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      await reservationApi.cancel(id);
      dispatch({ type: 'CANCEL_RESERVATION', payload: id });
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to cancel reservation';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Check availability
  const checkAvailability = async (restaurantId, date, time, partySize) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const response = await restaurantApi.checkAvailability(restaurantId, {
        date,
        time,
        partySize
      });
      const availability = response.data.data;
      
      dispatch({ type: 'SET_AVAILABILITY', payload: availability });
      return { success: true, data: availability };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to check availability';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Helper function to format reservation for display
  const formatReservation = (reservation) => {
    const date = new Date(reservation.reservation_date);
    const time = reservation.reservation_time;
    
    return {
      ...reservation,
      formattedDate: date.toLocaleDateString(),
      formattedTime: time,
      isUpcoming: new Date(`${reservation.reservation_date}T${reservation.reservation_time}`) > new Date(),
      canModify: reservation.status === 'pending' || reservation.status === 'confirmed',
      canCancel: reservation.status === 'pending' || reservation.status === 'confirmed'
    };
  };

  // Get formatted reservations
  const formattedReservations = state.reservations.map(formatReservation);

  // Get upcoming reservations
  const upcomingReservations = formattedReservations.filter(res => res.isUpcoming);

  // Get past reservations
  const pastReservations = formattedReservations.filter(res => !res.isUpcoming);

  const value = {
    ...state,
    reservations: formattedReservations,
    upcomingReservations,
    pastReservations,
    createReservation,
    fetchMyReservations,
    updateReservation,
    cancelReservation,
    checkAvailability,
    clearError
  };

  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  );
};

// Custom hook to use reservation context
export const useReservation = () => {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error('useReservation must be used within a ReservationProvider');
  }
  return context;
};
