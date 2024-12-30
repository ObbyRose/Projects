import React from 'react';
import { useNotifications } from '@/hooks/use-notifications';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Notification {
    message: string;
}

const NotificationsPage: React.FC = () => {
    const [businessId, setBusinessId] = useState<number | null>(null);
    const notifications = useNotifications(businessId ? businessId.toString() : '');

    useEffect(() => {
        const fetchBusinessId = async () => {
            try {
                const response = await axios.get('http://localhost:5000/businesses/:id', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setBusinessId(response.data._id);
            } catch (error) {
                console.error('Error fetching business ID:', error);
            }
        };

        fetchBusinessId();
    }, []);

    return (
        <div>
            <h1>Notification History</h1>
            {Array.isArray(notifications) && notifications.length > 0 ? (
                <ul>
                    {notifications.map((notification: Notification, index: number) => (
                        <li key={index}>{notification.message}</li>
                    ))}
                </ul>
            ) : (
                <p className='text-red-500'>No notifications are present</p>
            )}
        </div>
    );
};

export default NotificationsPage;
