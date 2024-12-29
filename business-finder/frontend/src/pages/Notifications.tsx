import React from 'react';
import { useNotifications } from '@/hooks/use-notifications';

interface Notification {
    message: string;
}

const NotificationsPage: React.FC = () => {
    const businessId = "your-business-id";
    const notificationsData = useNotifications(businessId);
    const notifications: Notification[] = Array.isArray(notificationsData) ? notificationsData : [];

    return (
        <div>
            <h1>Notification History</h1>
            <ul>
                {(notifications || []).map((notification: Notification, index: number) => (
                    <li key={index}>{notification.message}</li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationsPage;