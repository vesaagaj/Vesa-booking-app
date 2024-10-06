import '../styles/styles.css'; 
import BookingList from '../components/BookingList'; 
import { useRouter } from 'next/router';

const BookingsList: React.FC = () => {
    const router = useRouter();

    return (
        <div>
            <h1>Welcome to the Booking System</h1>
            <button onClick={() => router.push('/create-booking')}>Create New Booking</button>
            <BookingList /> 
        </div>
    );
};

export default BookingsList;
