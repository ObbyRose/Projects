import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

const fetchBusinesses = async () => {
    const { data } = await axios.get(`${API_URL}/businesses`);
    return data;
};

export const useBusinesses = () => {
    return useQuery({ queryKey: ['businesses'], queryFn: fetchBusinesses });
};

const createBusiness = async (newBusiness: unknown) => {
    const { data } = await axios.post(`${API_URL}/businesses`, newBusiness);
    return data;
};

export const useCreateBusiness = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createBusiness,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['businesses'] });
        },
    });
};

const updateBusiness = async ({ id, updatedBusiness }: { id: string, updatedBusiness: unknown }) => {
    const { data } = await axios.put(`${API_URL}/businesses/${id}`, updatedBusiness);
    return data;
};

export const useUpdateBusiness = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateBusiness,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['businesses'] });
        },
    });
};

const deleteBusiness = async (id: string) => {
    await axios.delete(`${API_URL}/businesses/${id}`);
};

export const useDeleteBusiness = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteBusiness,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['businesses'] });
        },
    });
};

const subscribeToBusiness = async (id: string) => {
    const { data } = await axios.post(`${API_URL}/businesses/${id}/subscribe`);
    return data;
};

export const useSubscribeToBusiness = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: subscribeToBusiness,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['businesses'] });
        },
    });
};

const unsubscribeFromBusiness = async (id: string) => {
    const { data } = await axios.delete(`${API_URL}/businesses/${id}/subscribe`);
    return data;
};

export const useUnsubscribeFromBusiness = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: unsubscribeFromBusiness,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['businesses'] });
        },
    });
};

const addReview = async ({ businessId, review }: { businessId: string, review: unknown }) => {
    const { data } = await axios.post(`${API_URL}/businesses/${businessId}/review`, review);
    return data;
};

export const useAddReview = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addReview,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['review'] });
        },
    });
};

const fetchReviews = async (id: string) => {
    const { data } = await axios.get(`${API_URL}/businesses/${id}/reviews`);
    return data;
};

export const useReviews = (id: string) => {
    return useQuery({ queryKey: ['reviews', id], queryFn: () => fetchReviews(id) });
};

const deleteReview = async ({ businessId, reviewId }: { businessId: string, reviewId: string }) => {
    try {
        const { data } = await axios.delete(`${API_URL}/businesses/${businessId}/review/${reviewId}`);
        return data;
    } catch (error: any) {
        if (error.response) {
            if (error.response.status === 500) {
                console.error('Error checking admin privileges:', error.response.data);
            } else {
                console.error(`Error deleting review: ${error.response.status} - ${error.response.data}`);
            }
        } else {
            console.error('Error deleting review:', error.message);
        }
        throw error;
    }
};

export const useDeleteReview = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteReview,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reviews'] });
        },
        onError: (error: any) => {
            if (error.response && error.response.status === 500) {
                console.error('Server error while deleting review:', error);
            } else {
                console.error('Error deleting review:', error);
            }
        },
    });
};