import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Business {
    id: string;
    name: string;
    description: string;
    category: string;
}

const Home = () => {
    const { data: businesses = [], isLoading, error } = useQuery<Business[]>({
        queryKey: ['businesses'],
        queryFn: async () => {
            const response = await axios.get<{ data: Business[] }>('/businesses');
            return response.data.data;
        },
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-destructive">Error loading businesses</div>
            </div>
        );
    }

    return (
        <div className="flex">
            {/* <AppSidebar /> */}
            <main className="flex-1">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-8">Business Directory</h1>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {businesses?.map((business) => (
                            <Card key={business.id}>
                                <CardHeader>
                                    <CardTitle>{business.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground mb-4">
                                        {business.description}
                                    </p>
                                    <Badge variant="secondary">
                                        {business.category}
                                    </Badge>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;