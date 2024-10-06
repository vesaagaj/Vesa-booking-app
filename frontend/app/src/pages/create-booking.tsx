import React, { useState } from 'react';
import { useRouter } from 'next/router';

const CreateBooking: React.FC = () => {
    const [service, setService] = useState('');
    const [doctorName, setDoctorName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [date, setDate] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const bookingData = { service, doctor_name: doctorName, start_time: startTime, end_time: endTime, date };

        try {
            const response = await fetch('http://localhost:5000/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });

            if (response.ok) {
                router.push('/');
            } else {
                const errorData = await response.json();
                console.error('Error:', errorData);
                alert('Failed to create booking. Please check the console for more details.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while creating the booking.');
        }
    };

    return (
        <div>
            <h1>Create a New Booking</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Service:
                    <input type="text" value={service} onChange={(e) => setService(e.target.value)} required />
                </label>
                <label>
                    Doctor Name:
                    <input type="text" value={doctorName} onChange={(e) => setDoctorName(e.target.value)} required />
                </label>
                <label>
                    Start Time:
                    <input type="text" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
                </label>
                <label>
                    End Time:
                    <input type="text" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
                </label>
                <label>
                    Date:
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </label>
                <button type="submit">Create Booking</button>
            </form>
        </div>
    );
};

export default CreateBooking;
