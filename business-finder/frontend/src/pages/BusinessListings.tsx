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
    const [isCreateBusinessSheetOpen, setIsCreateBusinessSheetOpen] = useState(false);
    const [isReviewSheetOpen, setIsReviewSheetOpen] = useState(false);
    const [currentBusinessId, setCurrentBusinessId] = useState<string | null>(null);
    const [currentBusinessName, setCurrentBusinessName] = useState<string>('');
    const [currentBusinessDescription, setCurrentBusinessDescription] = useState<string>('');
    const [currentBusinessCategory, setCurrentBusinessCategory] = useState<string>('');
    const [currentBusinessOwner, setCurrentBusinessOwner] = useState<string>('');
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(5);
    const [newBusinessName, setNewBusinessName] = useState('');
    const [newBusinessDescription, setNewBusinessDescription] = useState('');
    const [newBusinessCategory, setNewBusinessCategory] = useState('');
    const [newBusinessOwner, setNewBusinessOwner] = useState('');

    if (isLoading) {
        return <div className="text-center">Loading...</div>;
    }

    if (isError) {
        return <div className="text-center text-red-500">Error loading businesses</div>;
    }

    const handleCreateBusiness = () => {
        const newBusiness = { name: newBusinessName, description: newBusinessDescription, category: newBusinessCategory, owner: newBusinessOwner };
        createBusinessMutation.mutate(newBusiness, {
            onSuccess: () => {
                toast.toast({ title: 'Success', description: 'Business created successfully' });
                setIsCreateBusinessSheetOpen(false);
                setNewBusinessName('');
                setNewBusinessDescription('');
                setNewBusinessOwner('');
            },
            onError: (error) => {
                toast.toast({ title: 'Error', description: 'Error creating business: ' + error.message });
            }
        });
    };

    const handleUpdateBusiness = () => {
        if (currentBusinessId) {
            const updatedBusiness = { name: currentBusinessName, description: currentBusinessDescription, category: currentBusinessCategory, owner: currentBusinessOwner };
            updateBusinessMutation.mutate({ id: currentBusinessId, updatedBusiness }, {
                onSuccess: () => {
                    toast.toast({ title: 'Success', description: 'Business updated successfully' });
                    setIsBusinessSheetOpen(false);
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
                onSuccess: (newReview) => {
                    queryClient.setQueryData(['businesses'], (oldBusinesses: any) => {
                        return oldBusinesses.map((business: any) => {
                            if (business._id === currentBusinessId) {
                                business.reviews = [...business.reviews, newReview];
                            }
                            return business;
                        });
                    });

                    toast.toast({ title: 'Success', description: 'Review added successfully' });
                    setIsReviewSheetOpen(false);
                    setReviewText('');
                    setRating(5);
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
                queryClient.setQueryData(['businesses'], (oldBusinesses: any) => {
                    return oldBusinesses.map((business: any) => {
                        if (business._id === businessId) {
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
        <div className='m-auto flex flex-col items-center'>
            <h1 className="text-2xl font-bold mb-4">Business Listings</h1>
            <Button className="mb-4" onClick={() => setIsCreateBusinessSheetOpen(true)}>Add Business</Button>
            {businesses && businesses.map((business: any) => (
                <Card className='flex flex-col m-auto items-center mb-4 p-4 shadow-lg' key={business._id}>
                    <CardHeader>
                        <h2 className="text-xl font-semibold">{business.name}</h2>
                    </CardHeader>
                    <CardContent>
                        <p className="font-medium">Who are we?</p>
                        <p className='mb-8'>{business.description}</p>
                        <p className="font-medium">Category:</p>
                        <p className='mb-8'>{business.category}</p>
                        <p className="font-medium">Owner:</p>
                        <p className='mb-8'>{business.owner.name}</p>
                        <Button className="mb-2 mr-4" onClick={() => {
                            setCurrentBusinessId(business._id);
                            setCurrentBusinessName(business.name);
                            setCurrentBusinessDescription(business.description);
                            setCurrentBusinessCategory(business.category);
                            setCurrentBusinessOwner(business.owner);
                            setIsBusinessSheetOpen(true);
                        }}>Update</Button>
                        <Button className="mb-2 mr-4" onClick={() => handleDeleteBusiness(business._id)}>Delete</Button>
                        <Button className="mb-2 mr-4" onClick={() => handleSubscribeToBusiness(business._id)}>Subscribe</Button>
                        <Button className="mb-2 mr-4" onClick={() => handleUnsubscribeFromBusiness(business._id)}>Unsubscribe</Button>
                        <Button className="mb-2 mr-4" onClick={() => {
                            setCurrentBusinessId(business._id);
                            setIsReviewSheetOpen(true);
                        }}>Add Review</Button>
                        {business.reviews.map((review: any) => (
                            <div key={`${business._id}-${review._id}`} className="mb-2">
                                <p>{review.comment}</p>
                                <Button onClick={() => handleDeleteReview(business._id, review._id)}>Delete Review</Button>
                            </div>
                        ))}
                    </CardContent>
                    <CardFooter>
                    </CardFooter>
                </Card>
            ))}

            {/* Create Business Sheet */}
            <Sheet open={isCreateBusinessSheetOpen} onOpenChange={(open) => setIsCreateBusinessSheetOpen(open)}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Create Business</SheetTitle>
                        <SheetDescription>
                            Enter the business details and click submit to create the business.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="newBusinessName" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="newBusinessName"
                                value={newBusinessName}
                                onChange={(e) => setNewBusinessName(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="newBusinessDescription" className="text-right">
                                Description
                            </Label>
                            <Input
                                id="newBusinessDescription"
                                value={newBusinessDescription}
                                onChange={(e) => setNewBusinessDescription(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="newBusinessCategory" className="text-right">
                                Category
                            </Label>
                            <Input
                                id="newBusinessCategory"
                                value={newBusinessCategory}
                                onChange={(e) => setNewBusinessCategory(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button onClick={handleCreateBusiness}>Create Business</Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>

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
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="businessCategory" className="text-right">
                                Category
                            </Label>
                            <Input
                                id="businessCategory"
                                value={currentBusinessCategory}
                                onChange={(e) => setCurrentBusinessCategory(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="businessOwner" className="text-right">
                                Owner
                            </Label>
                            <Input
                                id="businessOwner"
                                value={currentBusinessOwner}
                                onChange={(e) => setCurrentBusinessOwner(e.target.value)}
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
