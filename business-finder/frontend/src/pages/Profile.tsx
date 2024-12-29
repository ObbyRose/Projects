import React, { useEffect } from 'react';
import useProfileFunctions from '../hooks/use-profile-functions';

interface ProfileProps {
    userId: string;
}

const Profile: React.FC<ProfileProps> = ({ userId }) => {
    const { profile, loading, error, refetchProfile } = useProfileFunctions(userId);

    useEffect(() => {
        refetchProfile();
    }, [userId, refetchProfile]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading profile</div>;
    }

    return (
        <div>
            <h1>User Profile</h1>
            {profile ? (
                <div>
                    <p>Name: {profile.name}</p>
                    <p>Email: {profile.email}</p>
                </div>
            ) : (
                <div>No profile data available</div>
            )}
        </div>
    );
};

export default Profile;