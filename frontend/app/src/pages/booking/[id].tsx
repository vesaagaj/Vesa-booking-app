import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const BookingDetail: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [booking, setBooking] = useState<any>(null);

    useEffect(() => {
        const fetchBooking = async () => {
            if (id) {
                try {
                    const response = await fetch(`http://localhost:5000/api/bookings/${id}`);
                    const data = await response.json();
                    setBooking(data);
                } catch (error) {
                    console.error('Error fetching booking:', error);
                }
            }
        };

        fetchBooking();
    }, [id]);

    if (!booking) return <p>Loading...</p>;

    return (
        <div>
            <h1>Booking Details</h1>
            <p>Date: {booking.date}</p>
            <p>Start Time: {booking.start_time}</p>
            <p>Doctor: {booking.doctor_name}</p>
            <p>Service: {booking.service}</p>
            <button onClick={() => router.push('/')}>Back</button>
        </div>
    );
};

export default BookingDetail;
