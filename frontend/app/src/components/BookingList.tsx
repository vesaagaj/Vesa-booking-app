import '../styles/styles.css';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Booking {
    id: number;
    date: string;
    start_time: string;
    doctor_name: string;
    service: string;
    end_time: string;
}

const BookingList: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);

    useEffect(() => {
        const fetchBookings = async () => {
            console.log('Fetching bookings...'); 
            try {
                const response = await fetch('http://localhost:5000/api/bookings');
              if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Data:', data); 
                setBookings(data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };
    
        fetchBookings();
    }, []);
    

    return (
        <div className="booking-container">
            <h1>Bookings</h1>
            <ul>
                {bookings.map((booking) => (
                    <li key={booking.id}>
                        <Link href={`/booking/${booking.id}`}>
                            A Booking on {booking.date} starting at {booking.start_time}
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="back-button">
                <button onClick={() => window.history.back()}>Back</button>
            </div>
        </div>
    );
    
};

export default BookingList;
