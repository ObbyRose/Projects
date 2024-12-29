import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, Loader2 } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

const UpgradePlan: React.FC = () => {
    const toast = useToast();
    const [isLoading, setIsLoading] = React.useState(false);
    const [currentPlan, setCurrentPlan] = React.useState<string | null>(null);

    const fetchCurrentPlan = async () => {
        try {
            const userId = JSON.parse(localStorage.getItem("user") || '{}')._id;
            const token = localStorage.getItem("token");
            if (!token) {
                toast.toast({ description: "Authentication token is missing. Please log in again." });
                return;
            }

            const response = await axios.get(`http://localhost:5000/auth/profile/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setCurrentPlan(response.data.plan);
            } else {
                toast.toast({ description: "Failed to fetch current plan. Please try again." });
            }
        } catch (error) {
            toast.toast({ description: `An error occurred: ${(error as any).message}` });
        }
    };

    useEffect(() => {
        fetchCurrentPlan();
    }, [toast, currentPlan]);

    const handleUpgrade = async (plan: string) => {
        setIsLoading(true);
        try {
            const userId = JSON.parse(localStorage.getItem("user") || '{}')._id;
            const token = localStorage.getItem("token");
            if (!token) {
                toast.toast({ description: "Authentication token is missing. Please log in again." });
                setIsLoading(false);
                return;
            }

            try {
                const response = await axios.put(`http://localhost:5000/auth/profile/${userId}`, { plan }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    toast.toast({ description: `You have successfully upgraded to the ${plan} Plan!` });
                    setCurrentPlan(plan);
                } else {
                    toast.toast({ description: `Failed to upgrade to the ${plan} Plan. Please try again.` });
                }
            } catch (error) {
                const typedError = error as any;
                if (typedError.response && typedError.response.status === 401) {
                    try {
                        const refreshToken = localStorage.getItem("refreshToken");
                        if (refreshToken) {
                            const refreshResponse = await axios.post(`http://localhost:5000/auth/refresh-token`, { token: refreshToken });
                            if (refreshResponse.status === 200) {
                                localStorage.setItem("token", refreshResponse.data.token);
                                // Retry the upgrade request
                                await handleUpgrade(plan);
                                return;
                            }
                        }
                    } catch (refreshError) {
                        toast.toast({ description: "Unauthorized. Please log in again." });
                    }
                } else {
                    toast.toast({ description: `An error occurred: ${typedError.message}` });
                }
            }
        } catch (error) {
            toast.toast({ description: `An error occurred: ${(error as any).message}` });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-10 mr-10">
            <h1 className="text-4xl font-bold text-center mb-6">Upgrade Your Plan</h1>

            <Alert className="mb-6">
                <InfoIcon className="h-4 w-4" />
                <AlertDescription>
                    Choose a plan based on the number of businesses you want to manage.
                </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Standard Plan */}
                <Card className="flex flex-col h-full">
                    <CardHeader>
                        <CardTitle>Standard Plan</CardTitle>
                        <CardDescription>Free</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <ul className="space-y-2">
                            <li>✓ 1 Business</li>
                            <li>✓ Basic Features</li>
                            <li>✓ Community Support</li>
                        </ul>
                    </CardContent>
                    <CardFooter className="mt-auto">
                        <Button 
                            className="w-full" 
                            variant="secondary" 
                            onClick={() => handleUpgrade("Standard")}
                            disabled={isLoading || currentPlan === "Standard"}
                        >
                            {isLoading && currentPlan === "Standard" ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : currentPlan === "Standard" ? (
                                "Current Plan"
                            ) : (
                                "Switch to Standard"
                            )}
                        </Button>
                    </CardFooter>
                </Card>

                {/* Gold Plan */}
                <Card className="flex flex-col h-full border-2 border-yellow-500">
                    <CardHeader>
                        <CardTitle>Gold Plan</CardTitle>
                        <CardDescription>19.99$ / Month</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <ul className="space-y-2">
                            <li>✓ Up to 3 Businesses</li>
                            <li>✓ Advanced Features</li>
                            <li>✓ Custom Reports</li>
                            <li>✓ Enhanced Security</li>
                            <li>✓ Email Support</li>
                        </ul>
                    </CardContent>
                    <CardFooter className="mt-auto">
                        <Button 
                            className="w-full" 
                            onClick={() => handleUpgrade("Gold")}
                            disabled={isLoading || currentPlan === "Gold"}
                        >
                            {isLoading && currentPlan === "Gold" ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : currentPlan === "Gold" ? (
                                "Current Plan"
                            ) : currentPlan === "Platinum" ? (
                                "Switch to Gold"
                            ) : (
                                "Upgrade to Gold"
                            )}
                        </Button>
                    </CardFooter>
                </Card>

                {/* Platinum Plan */}
                <Card className="flex flex-col h-full border-2 border-cyan-500">
                    <CardHeader>
                        <CardTitle>Platinum Plan</CardTitle>
                        <CardDescription>29.99$ / Month</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <ul className="space-y-2">
                            <li>✓ Up to 10 Businesses</li>
                            <li>✓ All Features</li>
                            <li>✓ Priority Support</li>
                        </ul>
                    </CardContent>
                    <CardFooter className="mt-auto">
                        <Button 
                            className="w-full" 
                            variant="destructive"
                            onClick={() => handleUpgrade("Platinum")}
                            disabled={isLoading || currentPlan === "Platinum"}
                        >
                            {isLoading && currentPlan === "Platinum" ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : currentPlan === "Platinum" ? (
                                "Current Plan"
                            ) : (
                                "Upgrade to Platinum"
                            )}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default UpgradePlan;
