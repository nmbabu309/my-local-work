import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Briefcase, Users, TrendingUp, Shield, Search, Hammer, Truck, Wrench, Sparkles, PaintBucket, Zap } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/jobs?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/jobs');
    }
  };

  const categories = [
    { name: 'Construction', icon: Hammer, color: 'text-orange-500' },
    { name: 'Delivery', icon: Truck, color: 'text-blue-500' },
    { name: 'Plumbing', icon: Wrench, color: 'text-cyan-500' },
    { name: 'Cleaning', icon: Sparkles, color: 'text-purple-500' },
    { name: 'Painting', icon: PaintBucket, color: 'text-pink-500' },
    { name: 'Electrical', icon: Zap, color: 'text-yellow-500' },
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Painter',
      quote: 'BluuJobs helped me find work near my home every day. I can now support my family better!',
    },
    {
      name: 'Priya Sharma',
      role: 'Employer',
      quote: 'Finding reliable workers was always a challenge. BluuJobs made it so simple and quick!',
    },
    {
      name: 'Amit Verma',
      role: 'Carpenter',
      quote: 'Great platform! I get job notifications instantly and can apply right away.',
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent animate-fade-in">
              Find Jobs Near You — Instantly!
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
              BluuJobs connects daily wage workers with local employers across India. 
              Find work nearby or hire trusted workers for your tasks — all in one platform.
            </p>
            
            {/* Hero Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8 animate-fade-in">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Search by job type or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 h-12 text-lg"
                />
                <Button type="submit" size="lg" className="h-12">
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </div>
            </form>

            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/register">
                <Button size="lg" className="shadow-lg hover-scale">
                  Get Started
                </Button>
              </Link>
              <Link to="/jobs">
                <Button size="lg" variant="outline" className="hover-scale">
                  Browse Jobs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Top Categories Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Top Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link 
                key={category.name} 
                to={`/jobs?category=${category.name}`}
                className="group"
              >
                <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <CardContent className="pt-6 pb-6">
                    <category.icon className={`h-12 w-12 mx-auto mb-3 ${category.color} group-hover:scale-110 transition-transform`} />
                    <h3 className="font-semibold">{category.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose BluuJobs?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2 hover:border-primary transition-all duration-300">
              <CardContent className="pt-6">
                <Briefcase className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Local Jobs</h3>
                <p className="text-muted-foreground">
                  Find daily wage work opportunities in your area
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-all duration-300">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Verified Workers</h3>
                <p className="text-muted-foreground">
                  Connect with skilled and reliable workers
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-all duration-300">
              <CardContent className="pt-6">
                <TrendingUp className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Quick Hiring</h3>
                <p className="text-muted-foreground">
                  Post jobs and get applications within hours
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-all duration-300">
              <CardContent className="pt-6">
                <Shield className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Safe Platform</h3>
                <p className="text-muted-foreground">
                  Secure and easy-to-use for everyone
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Join thousands of workers and employers already using BluuJobs
          </p>
          <Link to="/register">
            <Button size="lg" variant="secondary" className="shadow-xl hover-scale">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
