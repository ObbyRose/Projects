import React from 'react';
import { useBusinesses, useCreateBusiness, useUpdateBusiness, useDeleteBusiness, useSubscribeToBusiness, useUnsubscribeFromBusiness, useAddReview, useReviews, useDeleteReview } from '../hooks/use-business';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/card';
import { useToast } from "@/hooks/use-toast"

const BusinessListings: React.FC = () => {
    const toast = useToast();
    const { data: businesses, isLoading, isError } = useBusinesses();
    const createBusinessMutation = useCreateBusiness();
    const updateBusinessMutation = useUpdateBusiness();
    const deleteBusinessMutation = useDeleteBusiness();
    const subscribeToBusinessMutation = useSubscribeToBusiness();
    const unsubscribeFromBusinessMutation = useUnsubscribeFromBusiness();
    const addReviewMutation = useAddReview();
    const deleteReviewMutation = useDeleteReview();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading businesses</div>;
    }

    const handleCreateBusiness = () => {
        const newBusiness = { name: 'New Business', description: 'Description' };
        createBusinessMutation.mutate(newBusiness, {
            onError: (error) => {
                toast.toast({ title: 'Error', description: 'Error creating business: ' + error.message});
            }
        });
    };

    const handleUpdateBusiness = (id: string) => {
        const updatedBusiness = { name: 'Updated Business', description: 'Updated Description' };
        updateBusinessMutation.mutate({ id, updatedBusiness }, {
            onError: (error) => {
                toast.toast({ title: 'Error', description: 'Error updating business: ' + error.message});
            }
        });
    };

    const handleDeleteBusiness = (id: string) => {
        deleteBusinessMutation.mutate(id, {
            onError: (error) => {
                toast.toast({ title: 'Error', description: 'Error deleting business: ' + error.message });
            }
        });
    };

    const handleSubscribeToBusiness = (id: string) => {
        subscribeToBusinessMutation.mutate(id, {
            onError: (error) => {
                toast.toast({ title: 'Error', description: 'Error subscribing to business: ' + error.message});
            }
        });
    };

    const handleUnsubscribeFromBusiness = (id: string) => {
        unsubscribeFromBusinessMutation.mutate(id, {
            onError: (error) => {
                toast.toast({ title: 'Error', description: 'Error unsubscribing from business: ' + error.message});
            }
        });
    };

    const handleAddReview = (businessId: string) => {
        const review = { rating: 5, comment: 'Great business!' };
        addReviewMutation.mutate({ businessId, review }, {
            onError: (error) => {
                toast.toast({ title: 'Error', description: 'Error adding review: ' + error.message });
            }
        });
    };

    const handleDeleteReview = (businessId: string, reviewId: string) => {
        deleteReviewMutation.mutate({ businessId, reviewId }, {
            onSuccess: () => {
                toast.toast({ title: 'Success', description: 'Review deleted successfully' });
            },
            onError: (error) => {
                toast.toast({ title: 'Error', description: 'Error deleting review: ' + error.message});
            }
        });
    };

    return (
        <div>
            <h1>Business Listings</h1>
            <Button onClick={handleCreateBusiness}>Add Business</Button>
            {businesses && businesses.map((business: any) => (
                <Card key={business._id}>
                    <CardHeader>
                        <h2>{business.name}</h2>
                    </CardHeader>
                    <CardContent>
                        <p>{business.description}</p>
                        <Button onClick={() => handleUpdateBusiness(business._id)}>Update</Button>
                        <Button onClick={() => handleDeleteBusiness(business._id)}>Delete</Button>
                        <Button onClick={() => handleSubscribeToBusiness(business._id)}>Subscribe</Button>
                        <Button onClick={() => handleUnsubscribeFromBusiness(business._id)}>Unsubscribe</Button>
                        <Button onClick={() => handleAddReview(business._id)}>Add Review</Button>
                        {business.reviews.map((review: any) => (
                            <div key={`${business._id}-${review._id}`}>
                                <p>{review.comment}</p>
                                <Button onClick={() => handleDeleteReview(business._id, review._id)}>Delete Review</Button>
                            </div>
                        ))}
                    </CardContent>
                    <CardFooter>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};

export default BusinessListings;