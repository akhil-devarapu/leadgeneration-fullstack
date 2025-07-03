
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Download, Video, LogOut, User, BookOpen } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [showVideo, setShowVideo] = useState(false);
  const [isStudentRegistered, setIsStudentRegistered] = useState(false);
  const [webinarAttended, setWebinarAttended] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const [formData, setFormData] = useState({
    name: user?.user_metadata?.name || '',
    email: user?.email || '',
    education: ''
  });

  const educationOptions = [
    'B.Tech',
    'B.Sc',
    'B.Com',
    'Diploma',
    'Other'
  ];

  const API_BASE_URL = 'http://localhost:5000';

  // YouTube video tracking
  useEffect(() => {
    if (showVideo && !webinarAttended) {
      // Listen for messages from YouTube iframe
      const handleMessage = (event: MessageEvent) => {
        if (event.origin !== 'https://www.youtube.com') return;
        
        if (event.data && typeof event.data === 'string') {
          try {
            const data = JSON.parse(event.data);
            if (data.event === 'video-progress') {
              const currentTime = data.info?.currentTime || 0;
              const duration = data.info?.duration || 1;
              const progress = currentTime / duration;
              
              // If user watched 50% or more, mark as attended
              if (progress >= 0.5 && !webinarAttended) {
                handleMarkWebinarAttended();
              }
            }
          } catch (e) {
            // Ignore parsing errors
          }
        }
      };

      window.addEventListener('message', handleMessage);
      return () => window.removeEventListener('message', handleMessage);
    }
  }, [showVideo, webinarAttended]);

  // Alternative approach: Use a timer to check video progress
  useEffect(() => {
    let progressTimer: NodeJS.Timeout;
    
    if (showVideo && !webinarAttended) {
      // Set a timer to automatically mark as attended after 2 minutes (assuming video is ~4 minutes)
      progressTimer = setTimeout(() => {
        if (!webinarAttended) {
          handleMarkWebinarAttended();
        }
      }, 120000); // 2 minutes = half of a typical 4-minute video
    }

    return () => {
      if (progressTimer) {
        clearTimeout(progressTimer);
      }
    };
  }, [showVideo, webinarAttended]);

  const handleSubmitStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.education) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/submit_lead`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          education: formData.education,
          attended_webinar: 'No',
          downloaded_brochure: 'No'
        }),
      });

      if (response.ok) {
        console.log('Student registered successfully');
        setIsStudentRegistered(true);
        toast({
          title: "Success",
          description: "Student registration completed successfully!",
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to register student');
      }
    } catch (error) {
      console.error('Error registering student:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDownloadBrochure = async () => {
    if (!isStudentRegistered) {
      toast({
        title: "Registration Required",
        description: "Please complete student registration first",
        variant: "destructive",
      });
      return;
    }

    if (!formData.email) {
      toast({
        title: "Error",
        description: "Please provide an email address",
        variant: "destructive",
      });
      return;
    }

    try {
      // Open the Google Drive link in a new tab
      window.open('https://drive.google.com/file/d/1_XTd8M2XCbBv4EeBz9sTki0IWMzuHEzs/view?usp=sharing', '_blank');

      // Update student status
      const response = await fetch(`${API_BASE_URL}/update_lead`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          update: {
            "Downloaded Brochure": "Yes"
          }
        }),
      });

      if (response.ok) {
        toast({
          title: "Brochure opened!",
          description: "The brochure has been opened in a new tab.",
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update student record');
      }
    } catch (error) {
      console.error('Error opening brochure:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleAttendWebinar = () => {
    if (!isStudentRegistered) {
      toast({
        title: "Registration Required",
        description: "Please complete student registration first",
        variant: "destructive",
      });
      return;
    }
    
    setShowVideo(true);
  };

  const handleMarkWebinarAttended = async () => {
    if (webinarAttended) return; // Prevent multiple calls
    
    if (!formData.email) {
      toast({
        title: "Error",
        description: "Please provide an email address",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/update_lead`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          update: {
            "Attended Webinar": "Yes"
          }
        }),
      });

      if (response.ok) {
        setWebinarAttended(true);
        toast({
          title: "Webinar Progress Tracked!",
          description: "Great! You've watched enough of the webinar. It's been marked as completed.",
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update webinar attendance');
      }
    } catch (error) {
      console.error('Error updating webinar attendance:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleCloseVideo = () => {
    setShowVideo(false);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-blue-900">NxtWave</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-700">
                <User className="h-5 w-5" />
                <span className="font-medium">{user?.user_metadata?.name || user?.email}</span>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2 border-gray-300 hover:bg-gray-50"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome, {user?.user_metadata?.name || user?.email}!
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Let's explore your career opportunities and take the next step towards your professional growth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Student Registration Form */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-gray-800">Student Registration</CardTitle>
                  <CardDescription>
                    Register for our webinar and download our brochure
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitStudent} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    disabled={isStudentRegistered}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    disabled={isStudentRegistered}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="education" className="text-gray-700">Education</Label>
                  <Select 
                    value={formData.education} 
                    onValueChange={(value) => setFormData({ ...formData, education: value })}
                    disabled={isStudentRegistered}
                  >
                    <SelectTrigger className="border-gray-300 focus:border-purple-500 focus:ring-purple-500">
                      <SelectValue placeholder="Select your education level" />
                    </SelectTrigger>
                    <SelectContent>
                      {educationOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {!isStudentRegistered ? (
                  <Button 
                    type="submit" 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition-colors duration-200"
                  >
                    Submit
                  </Button>
                ) : (
                  <div className="text-center py-3">
                    <span className="text-green-600 font-medium">✓ Registration Complete</span>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Action Cards */}
          <div className="space-y-6">
            {/* Download Brochure Card */}
            <Card className={`shadow-lg border-0 bg-white/80 backdrop-blur-sm transition-shadow duration-300 ${!isStudentRegistered ? 'opacity-50' : 'hover:shadow-xl'}`}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Download className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-gray-800">Download Brochure</CardTitle>
                    <CardDescription>
                      Get detailed information about our programs and courses
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={handleDownloadBrochure}
                  disabled={!isStudentRegistered}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Brochure
                </Button>
                {!isStudentRegistered && (
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    Complete registration to unlock
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Attend Webinar Card */}
            <Card className={`shadow-lg border-0 bg-white/80 backdrop-blur-sm transition-shadow duration-300 ${!isStudentRegistered ? 'opacity-50' : 'hover:shadow-xl'}`}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Video className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-gray-800">Attend Webinar</CardTitle>
                    <CardDescription>
                      Join our exclusive webinar and learn from industry experts
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={handleAttendWebinar}
                  disabled={!isStudentRegistered}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Video className="mr-2 h-4 w-4" />
                  Join Webinar
                </Button>
                {!isStudentRegistered && (
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    Complete registration to unlock
                  </p>
                )}
                {webinarAttended && (
                  <p className="text-sm text-green-600 mt-2 text-center font-medium">
                    ✓ Webinar Completed
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Video Modal */}
        {showVideo && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[80vh] overflow-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800">Career Growth Webinar</h3>
                <Button
                  onClick={handleCloseVideo}
                  variant="outline"
                  size="sm"
                >
                  Close
                </Button>
              </div>
              
              <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                <iframe
                  ref={videoRef}
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/0818am3NaXY?autoplay=1&enablejsapi=1"
                  title="Career Growth Webinar"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
              
              <div className="text-center">
                {webinarAttended ? (
                  <div className="text-green-600 font-medium">
                    ✓ Webinar Completed! Thank you for watching.
                  </div>
                ) : (
                  <div className="text-gray-600">
                    <p className="mb-2">Watch at least half of the video to complete the webinar.</p>
                    <p className="text-sm text-gray-500">Progress will be tracked automatically.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
