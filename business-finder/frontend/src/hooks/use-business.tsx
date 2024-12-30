import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useToast } from './use-toast';

const API_URL = 'http://localhost:5000';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error("Authorization token not found");
    }
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const fetchBusinesses = async () => {
    const { data } = await axios.get(`${API_URL}/businesses`);
    return data;
};

export const useBusinesses = () => {
    return useQuery({ queryKey: ['businesses'], queryFn: fetchBusinesses });
};

const createBusiness = async (newBusiness: unknown) => {
    const config = {
        headers: getAuthHeader()
    };
    const { data } = await axios.post(`${API_URL}/businesses`, newBusiness, config);
    return data;
};

export const useCreateBusiness = () => {
    const queryClient = useQueryClient();
    const toast = useToast();
    return useMutation({
        mutationFn: createBusiness,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['businesses'] });
            toast.toast({ title: 'Success', description: 'Business created successfully' });
        },
        onError: (error: any) => {
            console.error("Error creating business:", error);
            toast.toast({ title: 'Error', description: 'Error creating business: ' + error.message });
        },
    });
};

const updateBusiness = async ({ id, updatedBusiness }: { id: string, updatedBusiness: unknown }) => {
    const config = {
        headers: getAuthHeader()
    };
    const { data } = await axios.put(`${API_URL}/businesses/${id}`, updatedBusiness, config);
    return data;
};

export const useUpdateBusiness = () => {
    const queryClient = useQueryClient();
    const toast = useToast();
    return useMutation({
        mutationFn: updateBusiness,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['businesses'] });
            toast.toast({ title: 'Success', description: 'Business updated successfully' });
        },
        onError: (error: any) => {
            console.error("Error updating business:", error);
            toast.toast({ title: 'Error', description: 'Error updating business: ' + error.message });
        },
    });
};

const deleteBusiness = async (id: string) => {
    const config = {
        headers: getAuthHeader()
    };
    await axios.delete(`${API_URL}/businesses/${id}`, config);
};

export const useDeleteBusiness = () => {
    const queryClient = useQueryClient();
    const toast = useToast();
    return useMutation({
        mutationFn: deleteBusiness,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['businesses'] });
            toast.toast({ title: 'Success', description: 'Business deleted successfully' });
        },
        onError: (error: any) => {
            console.error("Error deleting business:", error);
            toast.toast({ title: 'Error', description: 'Error deleting business: ' + error.message });
        },
    });
};

const subscribeToBusiness = async (id: string) => {
    const config = {
        headers: getAuthHeader()
    };
    const { data } = await axios.post(`${API_URL}/businesses/${id}/subscribe`, {}, config);
    return data;
};

export const useSubscribeToBusiness = () => {
    const queryClient = useQueryClient();
    const toast = useToast();
    return useMutation({
        mutationFn: subscribeToBusiness,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['businesses'] });
            toast.toast({ title: 'Success', description: 'Subscribed to business successfully' });
        },
        onError: (error: any) => {
            console.error("Error subscribing to business:", error);
            toast.toast({ title: 'Error', description: 'Error subscribing to business: ' + error.message });
        },
    });
};

const unsubscribeFromBusiness = async (id: string) => {
    const config = {
        headers: getAuthHeader()
    };
    const { data } = await axios.delete(`${API_URL}/businesses/${id}/unsubscribe`, config);
    return data;
};

export const useUnsubscribeFromBusiness = () => {
    const queryClient = useQueryClient();
    const toast = useToast();
    return useMutation({
        mutationFn: unsubscribeFromBusiness,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['businesses'] });
            toast.toast({ title: 'Success', description: 'Unsubscribed from business successfully' });
        },
        onError: (error: any) => {
            console.error("Error unsubscribing from business:", error);
            toast.toast({ title: 'Error', description: 'Error unsubscribing from business: ' + error.message });
        },
    });
};

const addReview = async ({ businessId, review }: { businessId: string, review: unknown }) => {
    const { data } = await axios.post(`${API_URL}/businesses/${businessId}/review`, review);
    return data;
};

export const useAddReview = () => {
    const queryClient = useQueryClient();
    const toast = useToast();
    return useMutation({
        mutationFn: addReview,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['review'] });
            toast.toast({ title: 'Success', description: 'Review added successfully' });
        },
        onError: (error: any) => {
            console.error("Error adding review:", error);
            toast.toast({ title: 'Error', description: 'Error adding review: ' + error.message });
        },
    });
};

export const useReviews = (id: string) => {
    return useQuery({ queryKey: ['reviews', id], queryFn: () => fetchReviews(id) });
};

const fetchReviews = async (id: string) => {
    const { data } = await axios.get(`${API_URL}/businesses/${id}/reviews`);
    return data;
};

const deleteReview = async ({ businessId, reviewId }: { businessId: string, reviewId: string }) => {
    const config = {
        headers: getAuthHeader()
    };
    const { data } = await axios.delete(`${API_URL}/businesses/${businessId}/review/${reviewId}`, config);
    return data;
};

export const useDeleteReview = () => {
    const queryClient = useQueryClient();
    const toast = useToast();
    return useMutation({
        mutationFn: deleteReview,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['reviews', variables.businessId] });
            toast.toast({ title: 'Success', description: 'Review deleted successfully' });
        },
        onError: (error: any) => {
            console.error("Error deleting review:", error); 
            toast.toast({ title: 'Error', description: 'Error deleting review: ' + error.message });
        },
    });
};
