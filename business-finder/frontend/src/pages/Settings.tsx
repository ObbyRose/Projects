import { FC } from 'react';
import {
    Bell,
    Moon,
    Sun,
    Globe,
    Shield,
    UserCog,
    Database,
    Mail,
    BellRing,
    Languages
} from 'lucide-react';

const Setting: FC = () => {
    return (
        <div className="p-6 max-w-3xl m-auto">
            <h1 className="text-3xl font-bold mb-6">Settings</h1>
            
            <div className="space-y-4">
                {/* Notifications */}
                <div className="flex items-center justify-between p-4 rounded-lg shadow">
                    <div className="flex items-center gap-3">
                        <Bell className="w-6 h-6" />
                        <span>Push Notifications</span>
                    </div>
                    <input type="checkbox" className="toggle" />
                </div>

                {/* Dark Mode */}
                <div className="flex items-center justify-between p-4 rounded-lg shadow">
                    <div className="flex items-center gap-3">
                        <Moon className="w-6 h-6" />
                        <span>Dark Mode</span>
                    </div>
                    <input type="checkbox" className="toggle" />
                </div>

                {/* Language */}
                <div className="flex items-center justify-between p-4 rounded-lg shadow">
                    <div className="flex items-center gap-3">
                        <Globe className="w-6 h-6" />
                        <span>Language</span>
                    </div>
                    <select className="select select-bordered text-black">
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                    </select>
                </div>

                {/* Privacy */}
                <div className="flex items-center justify-between p-4 rounded-lg shadow">
                    <div className="flex items-center gap-3">
                        <Shield className="w-6 h-6" />
                        <span>Privacy Settings</span>
                    </div>
                    <button className="btn">Configure</button>
                </div>

                {/* Account Settings */}
                <div className="flex items-center justify-between p-4 rounded-lg shadow">
                    <div className="flex items-center gap-3">
                        <UserCog className="w-6 h-6" />
                        <span>Account Settings</span>
                    </div>
                    <button className="btn">Manage</button>
                </div>

                {/* Data Preferences */}
                <div className="flex items-center justify-between p-4 rounded-lg shadow">
                    <div className="flex items-center gap-3">
                        <Database className="w-6 h-6" />
                        <span>Data Preferences</span>
                    </div>
                    <button className="btn">Configure</button>
                </div>

                {/* Email Notifications */}
                <div className="flex items-center justify-between p-4 rounded-lg shadow">
                    <div className="flex items-center gap-3">
                        <Mail className="w-6 h-6" />
                        <span>Email Notifications</span>
                    </div>
                    <input type="checkbox" className="toggle" />
                </div>

                {/* Sound Settings */}
                <div className="flex items-center justify-between p-4 rounded-lg shadow">
                    <div className="flex items-center gap-3">
                        <BellRing className="w-6 h-6" />
                        <span>Sound Settings</span>
                    </div>
                    <input type="range" className="range" min="0" max="100" />
                </div>

                {/* Appearance */}
                <div className="flex items-center justify-between p-4 rounded-lg shadow">
                    <div className="flex items-center gap-3">
                        <Sun className="w-6 h-6" />
                        <span>Appearance</span>
                    </div>
                    <select className="select select-bordered text-black">
                        <option>System</option>
                        <option>Light</option>
                        <option>Dark</option>
                    </select>
                </div>

                {/* Translation */}
                <div className="flex items-center justify-between p-4 rounded-lg shadow">
                    <div className="flex items-center gap-3">
                        <Languages className="w-6 h-6" />
                        <span>Auto-Translation</span>
                    </div>
                    <input type="checkbox" className="toggle" />
                </div>
            </div>
        </div>
    );
};

export default Setting;