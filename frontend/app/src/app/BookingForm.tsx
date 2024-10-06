import React, { useState } from 'react';
import { useRouter } from 'next/router';

const BookingForm: React.FC = () => {
    const router = useRouter();
    
    const [service, setService] = useState('');
    const [doctor_name, setDoctorName] = useState('');
    const [start_time, setStartTime] = useState('');
    const [end_time, setEndTime] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const bookingData = {
            service,
            doctor_name,
            start_time,
            end_time,
            date
        };

        try {
            const response = await fetch('http://backend:5000/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookingData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to insert booking');
                return;
            }

            // Redirect to the main page after successful insertion
            router.push('/');
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div>
            <h1>Create Booking</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Service:</label>
                    <input
                        type="text"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Doctor Name:</label>
                    <input
                        type="text"
                        value={doctor_name}
                        onChange={(e) => setDoctorName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Start Time:</label>
                    <input
                        type="text"
                        value={start_time}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>End Time:</label>
                    <input
                        type="text"
                        value={end_time}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit Booking</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default BookingForm;
