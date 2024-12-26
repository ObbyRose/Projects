import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Star, UserRound } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center mx-auto h-[90vh] z-10 w-full max-w-[1300px] px-12">
            <div className="text-center md:text-left md:mb-0">
                <h1 className="text-5xl bg-gradient-to-t from-[#ff0844] to-[#ffb199] bg-clip-text text-transparent mb-6">
                    Connect
                </h1>
                <h2 className="text-4xl bg-gradient-to-t from-[#b721ff] to-[#21d4fd] bg-clip-text text-transparent">
                    Connecting people with businesses around the world
                </h2>
                <p className="mt-4 text-2xl font-bold text-white">
                    Start connecting today!
                </p>
                <Link to="/signup">
                    <button className="text-xl bg-purpleCustom py-3 px-8 border-none rounded text-white mt-4 cursor-pointer relative transition-all duration-300 outline-none hover:after:w-full after:content-[''] after:absolute after:top-0 after:left-0 after:w-0 after:h-full after:bg-[#4837ff] after:transition-all after:duration-300 after:rounded">
                        Get Started
                    </button>
                </Link>
            </div>
            <div className="text-center">
                <img src='src/assets/undraw_online-connection_c56e.svg' alt="pic1" className="h-4/5 w-4/5 mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 text-center m-auto justify-center items-center">
                <Card>
                    <CardHeader>
                        <UserRound className="flex justify-center m-auto mb-3" />
                        <CardTitle>Users Connected</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-purpleCustom text-4xl text-center">5,000+</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <Star className="flex justify-center m-auto mb-3" />
                        <CardTitle>5-Star reviews</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-purpleCustom text-4xl text-center">400+</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <Building2 className="flex justify-center m-auto mb-3" />
                        <CardTitle>Businesses Listed</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-purpleCustom text-4xl text-center">5,000+</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Home;
