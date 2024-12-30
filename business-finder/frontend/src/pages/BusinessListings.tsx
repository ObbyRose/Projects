import React, { useState } from 'react';
import { useBusinesses, useCreateBusiness, useUpdateBusiness, useDeleteBusiness, useSubscribeToBusiness, useUnsubscribeFromBusiness, useAddReview, useDeleteReview } from '../hooks/use-business';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from '@tanstack/react-query';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

const BusinessListings: React.FC = () => {
        const toast = useToast();
        const queryClient = useQueryClient();
        const { data: businesses, isLoading, isError } = useBusinesses();
        const createBusinessMutation = useCreateBusiness();
        const updateBusinessMutation = useUpdateBusiness();
        const deleteBusinessMutation = useDeleteBusiness();
        const subscribeToBusinessMutation = useSubscribeToBusiness();
        const unsubscribeFromBusinessMutation = useUnsubscribeFromBusiness();
        const addReviewMutation = useAddReview();
        const deleteReviewMutation = useDeleteReview();

        // State for Sheets
        const [isBusinessSheetOpen, setIsBusinessSheetOpen] = useState(false);
        const [isReviewSheetOpen, setIsReviewSheetOpen] = useState(false);
        const [currentBusinessId, setCurrentBusinessId] = useState<string | null>(null);
        const [currentBusinessName, setCurrentBusinessName] = useState<string>('');
        const [currentBusinessDescription, setCurrentBusinessDescription] = useState<string>('');
        const [reviewText, setReviewText] = useState('');
        const [rating, setRating] = useState(5);

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
                                toast.toast({ title: 'Error', description: 'Error creating business: ' + error.message });
                        }
                });
        };

        const handleUpdateBusiness = () => {
                if (currentBusinessId) {
                        const updatedBusiness = { name: currentBusinessName, description: currentBusinessDescription };
                        updateBusinessMutation.mutate({ id: currentBusinessId, updatedBusiness }, {
                                onSuccess: () => {
                                        toast.toast({ title: 'Success', description: 'Business updated successfully' });
                                        setIsBusinessSheetOpen(false); // Close the sheet after update
                                },
                                onError: (error) => {
                                        toast.toast({ title: 'Error', description: 'Error updating business: ' + error.message });
                                }
                        });
                }
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
                        onSuccess: () => {
                                toast.toast({ title: 'Success', description: 'Subscribed to business successfully' });
                        },
                        onError: (error) => {
                                toast.toast({ title: 'Error', description: 'Error subscribing to business: ' + error.message });
                        }
                });
        };

        const handleUnsubscribeFromBusiness = (id: string) => {
                unsubscribeFromBusinessMutation.mutate(id, {
                        onSuccess: () => {
                                toast.toast({ title: 'Success', description: 'Unsubscribed from business successfully' });
                        },
                        onError: (error) => {
                                toast.toast({ title: 'Error', description: 'Error unsubscribing from business: ' + error.message });
                        }
                });
        };

        const handleAddReview = () => {
                if (currentBusinessId) {
                        const review = { rating, comment: reviewText };
                        addReviewMutation.mutate({ businessId: currentBusinessId, review }, {
                                onSuccess: () => {
                                        toast.toast({ title: 'Success', description: 'Review added successfully' });
                                        setIsReviewSheetOpen(false); // Close the sheet after adding review
                                        setReviewText('');
                                        setRating(5);
                                        // Optionally update the local cache here too
                                },
                                onError: (error) => {
                                        toast.toast({ title: 'Error', description: 'Error adding review: ' + error.message });
                                }
                        });
                }
        };

        const handleDeleteReview = (businessId: string, reviewId: string) => {
                deleteReviewMutation.mutate({ businessId, reviewId }, {
                        onSuccess: () => {
                                // Optimistically update the cache by removing the deleted review
                                queryClient.setQueryData(['businesses'], (oldBusinesses: any) => {
                                        return oldBusinesses.map((business: any) => {
                                                if (business._id === businessId) {
                                                        // Remove the review from the specific business
                                                        business.reviews = business.reviews.filter((review: any) => review._id !== reviewId);
                                                }
                                                return business;
                                        });
                                });

                                toast.toast({ title: 'Success', description: 'Review deleted successfully' });
                        },
                        onError: (error) => {
                                toast.toast({ title: 'Error', description: 'Error deleting review: ' + error.message });
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
                                                <Button onClick={() => {
                                                        setCurrentBusinessId(business._id);
                                                        setCurrentBusinessName(business.name);
                                                        setCurrentBusinessDescription(business.description);
                                                        setIsBusinessSheetOpen(true);
                                                }}>Update</Button>
                                                <Button onClick={() => handleDeleteBusiness(business._id)}>Delete</Button>
                                                <Button onClick={() => handleSubscribeToBusiness(business._id)}>Subscribe</Button>
                                                <Button onClick={() => handleUnsubscribeFromBusiness(business._id)}>Unsubscribe</Button>
                                                <Button onClick={() => {
                                                        setCurrentBusinessId(business._id);
                                                        setIsReviewSheetOpen(true);
                                                }}>Add Review</Button>
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

                        {/* Business Update Sheet */}
                        <Sheet open={isBusinessSheetOpen} onOpenChange={(open) => setIsBusinessSheetOpen(open)}>
                                <SheetContent>
                                        <SheetHeader>
                                                <SheetTitle>Update Business</SheetTitle>
                                                <SheetDescription>
                                                        Make changes to the business here. Click save when you're done.
                                                </SheetDescription>
                                        </SheetHeader>
                                        <div className="grid gap-4 py-4">
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="businessName" className="text-right">
                                                                Name
                                                        </Label>
                                                        <Input
                                                                id="businessName"
                                                                value={currentBusinessName}
                                                                onChange={(e) => setCurrentBusinessName(e.target.value)}
                                                                className="col-span-3"
                                                        />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="businessDescription" className="text-right">
                                                                Description
                                                        </Label>
                                                        <Input
                                                                id="businessDescription"
                                                                value={currentBusinessDescription}
                                                                onChange={(e) => setCurrentBusinessDescription(e.target.value)}
                                                                className="col-span-3"
                                                        />
                                                </div>
                                        </div>
                                        <SheetFooter>
                                                <SheetClose asChild>
                                                        <Button onClick={handleUpdateBusiness}>Save changes</Button>
                                                </SheetClose>
                                        </SheetFooter>
                                </SheetContent>
                        </Sheet>

                        {/* Add Review Sheet */}
                        <Sheet open={isReviewSheetOpen} onOpenChange={(open) => setIsReviewSheetOpen(open)}>
                                <SheetContent>
                                        <SheetHeader>
                                                <SheetTitle>Add a Review</SheetTitle>
                                                <SheetDescription>
                                                        Write your review and rate the business. Click submit when you're done.
                                                </SheetDescription>
                                        </SheetHeader>
                                        <div className="grid gap-4 py-4">
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="reviewText" className="text-right">
                                                                Review
                                                        </Label>
                                                        <Input
                                                                id="reviewText"
                                                                value={reviewText}
                                                                onChange={(e) => setReviewText(e.target.value)}
                                                                className="col-span-3"
                                                        />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="rating" className="text-right">
                                                                Rating
                                                        </Label>
                                                        <Input
                                                                id="rating"
                                                                type="number"
                                                                min="1"
                                                                max="5"
                                                                value={rating}
                                                                onChange={(e) => setRating(Number(e.target.value))}
                                                                className="col-span-3"
                                                        />
                                                </div>
                                        </div>
                                        <SheetFooter>
                                                <SheetClose asChild>
                                                        <Button onClick={handleAddReview}>Submit Review</Button>
                                                </SheetClose>
                                        </SheetFooter>
                                </SheetContent>
                        </Sheet>
                </div>
        );
};

export default BusinessListings;
