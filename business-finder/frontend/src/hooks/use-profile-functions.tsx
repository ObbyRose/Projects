import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const fetchProfile = async (userId: string) => {
    const response = await axios.get(`http://localhost:5000/auth/profile/${userId}`);
    return response.data;
};

const updateProfile = async ({ userId, profileData }: { userId: string, profileData: any }) => {
    const response = await axios.put(`http://localhost:5000/auth/profile/${userId}`, profileData);
    return response.data;
};

const useProfileFunctions = (userId: string) => {
    const queryClient = useQueryClient();

    const { data: profile, isLoading: loading, error } = useQuery({
        queryKey: ['profile', userId],
        queryFn: () => fetchProfile(userId),
        enabled: !!userId,
    });

    if (loading) {
        console.log('Loading profile...');
    }

    if (error) {
        console.error('Error fetching profile:', error);
    }

    if (profile) {
        console.log('Profile data:', profile);
    }

    interface ProfileData {
        [key: string]: any;
    }

    interface UpdateProfileParams {
        userId: string;
        profileData: ProfileData;
    }

    const mutation = useMutation<ProfileData, unknown, UpdateProfileParams>({
        mutationFn: ({ userId, profileData }: UpdateProfileParams) => updateProfile({ userId, profileData }),
        onSuccess: (data) => {
            queryClient.setQueryData(['profile', userId], data);
        },
        onError: (error) => {
            console.error('Error updating profile:', error);
        },
    });

    const updateProfileData = (profileData: ProfileData) => {
        mutation.mutate({ userId, profileData });
    };

    const refetchProfile = () => {
        queryClient.invalidateQueries({ queryKey: ['profile', userId] });
    };

    return {
        profile,
        loading,
        error,
        updateProfile: updateProfileData,
        refetchProfile,
    };
};

export default useProfileFunctions;
