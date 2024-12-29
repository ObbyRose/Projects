import React from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mail, User, MessageSquare, Send } from "lucide-react";

const Contact: React.FC = () => {
    return (
        <div className="min-h-screen min-w-screen py-12 px-4 sm:px-6 lg:px-8 m-auto">
            <Card className="max-w-2xl mx-auto p-8">
                <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>
                <form className="space-y-6">
                    <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                            <User className="w-5 h-5 text-gray-500" />
                            <span>Name</span>
                        </label>
                        <Input name="name" required />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                            <Mail className="w-5 h-5 text-gray-500" />
                            <span>Email</span>
                        </label>
                        <Input type="email" name="email" required />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                            <MessageSquare className="w-5 h-5 text-gray-500" />
                            <span>Message</span>
                        </label>
                        <Textarea name="message" required rows={6} />
                    </div>

                    <Button type="submit" className="w-full">
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default Contact;
