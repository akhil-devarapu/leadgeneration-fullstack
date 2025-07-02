
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Trophy, ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <h1 className="text-3xl font-bold text-black">MyLeadGen</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-black hover:text-red-600 font-medium relative group">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#features" className="text-black hover:text-red-600 font-medium relative group">
                Features
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#about" className="text-black hover:text-red-600 font-medium relative group">
                About Us
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#contact" className="text-black hover:text-red-600 font-medium relative group">
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative bg-white py-20 overflow-hidden">
        {/* Diagonal Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-red-600/5 to-transparent"></div>
        <div className="absolute top-10 right-20 w-40 h-2 bg-red-600 transform rotate-45"></div>
        <div className="absolute bottom-20 right-40 w-20 h-2 bg-black transform -rotate-45"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-black mb-6 leading-tight">
              Unlock Your Potential with
              <span className="text-red-600 block">Intelligent Lead Management</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              AI-driven insights and personalized engagement for every lead. Transform your business with smart automation and data-driven decisions.
            </p>
            <Link to="/signup">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-12 py-6 text-xl font-semibold rounded-lg">
                Get Started
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section id="about" className="py-20 bg-gray-50 relative">
        {/* Background Image */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('/lovable-uploads/cb861b87-cc10-4b3b-91fd-ab6ad1ce9ca1.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Meet Our Founders</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sashank Gujjula */}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center relative overflow-hidden group hover:shadow-xl transition-shadow duration-300">
              <div className="absolute top-0 right-0 w-20 h-2 bg-red-600 transform rotate-45 translate-x-8 -translate-y-1"></div>
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6"></div>
              <h3 className="text-2xl font-bold text-black mb-2">Sashank Gujjula</h3>
              <div className="space-y-1 text-gray-600">
                <p className="font-semibold">• IIT Bombay, AIR 119 in JEE 2013</p>
                <p className="font-semibold">• Honoured in Forbes India</p>
                <p className="font-semibold text-red-600">30 Under 30</p>
              </div>
            </div>

            {/* Anupam Pedarla */}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center relative overflow-hidden group hover:shadow-xl transition-shadow duration-300">
              <div className="absolute top-0 right-0 w-20 h-2 bg-red-600 transform rotate-45 translate-x-8 -translate-y-1"></div>
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6"></div>
              <h3 className="text-2xl font-bold text-black mb-2">Anupam Pedarla</h3>
              <div className="space-y-1 text-gray-600">
                <p className="font-semibold">• IIT Kharagpur, Awarded 'Young Alumni Achiever'</p>
                <p className="font-semibold">• Honoured in Forbes India</p>
                <p className="font-semibold text-red-600">30 Under 30</p>
              </div>
            </div>

            {/* Rahul Attuluri */}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center relative overflow-hidden group hover:shadow-xl transition-shadow duration-300">
              <div className="absolute top-0 right-0 w-20 h-2 bg-red-600 transform rotate-45 translate-x-8 -translate-y-1"></div>
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6"></div>
              <h3 className="text-2xl font-bold text-black mb-2">Rahul Attuluri</h3>
              <div className="space-y-1 text-gray-600">
                <p className="font-semibold">• IIIT Hyderabad, Ex-Amazon</p>
                <p className="font-semibold">• Named among India's Top 150</p>
                <p className="font-semibold text-red-600">Next-Gen Entrepreneurs by Hurun India, 2024</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Why Choose MyLeadGen?</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-red-600"></div>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <BookOpen className="h-8 w-8 text-red-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-black">AI-Powered Analytics</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-base">
                  Advanced machine learning algorithms analyze your leads and provide actionable insights for better conversion rates.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-red-600"></div>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <Users className="h-8 w-8 text-red-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-black">Smart Automation</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-base">
                  Automate your lead nurturing process with intelligent workflows that adapt to each prospect's behavior.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-red-600"></div>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <Trophy className="h-8 w-8 text-red-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-black">Proven Results</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-base">
                  Join thousands of businesses that have increased their conversion rates by 300% with our platform.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-2 bg-red-600 transform rotate-45 translate-x-8"></div>
        <div className="absolute bottom-0 left-0 w-60 h-2 bg-red-600 transform -rotate-45 -translate-x-12"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h3 className="text-4xl font-bold mb-4">Ready to Transform Your Lead Management?</h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of businesses that trust MyLeadGen for intelligent lead management and conversion optimization.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-12 py-4 text-lg font-semibold">
              Get Started Today
              <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">MyLeadGen</h3>
              <p className="text-gray-400">
                Intelligent lead management powered by AI for modern businesses.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-red-400">Features</a></li>
                <li><a href="#" className="hover:text-red-400">Pricing</a></li>
                <li><a href="#" className="hover:text-red-400">Analytics</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-red-400">About Us</a></li>
                <li><a href="#" className="hover:text-red-400">Careers</a></li>
                <li><a href="#" className="hover:text-red-400">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-red-400">Help Center</a></li>
                <li><a href="#" className="hover:text-red-400">Documentation</a></li>
                <li><a href="#" className="hover:text-red-400">Community</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MyLeadGen. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
