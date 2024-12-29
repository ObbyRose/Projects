import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

const socket = io("http://localhost:5000");

export const useNotifications = (businessId: string) => {
    const queryClient = useQueryClient();

    useEffect(() => {
        socket.on('connect', () => {
            console.log("Connected to server");
            socket.emit("subscribe", businessId);
            console.log(`Subscribed to business ${businessId}`);
        });

        socket.on('notification', (message: string) => {
            console.log("Received notification:", message);
            toast({ title: "New Notification", description: message });

            queryClient.setQueryData(['notifications', businessId], (oldNotifications: string[] = []) => [
                ...oldNotifications, message,
            ]);
        });

        socket.on('disconnect', () => {
            console.log("Disconnected from server");
        });

        return () => {
            socket.off('connect');
            socket.off('notification');
            socket.off('disconnect');
        };
    }, [businessId, queryClient]);

    const notificationsQuery = queryClient.getQueryData(['notifications', businessId]);
    return notificationsQuery || [];
};
