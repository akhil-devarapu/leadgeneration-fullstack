
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, LogOut, User } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <h1 className="text-3xl font-bold text-blue-900">NxtWave</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
              <Button 
                onClick={handleLogout}
                variant="outline" 
                className="border-red-600 text-red-600 hover:bg-red-50"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Your Dashboard
          </h2>
          <p className="text-xl text-gray-600">
            You're successfully logged in and ready to start your learning journey!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-xl text-gray-800">Profile</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 text-base">
                Email: {user?.email}
              </CardDescription>
              <CardDescription className="text-gray-600 text-sm mt-2">
                Joined: {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">Course Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 text-base">
                Start your learning journey with our comprehensive courses.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 text-base">
                Track your progress and unlock new achievements as you learn.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
