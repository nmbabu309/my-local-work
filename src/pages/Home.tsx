import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, Users, TrendingUp, Shield } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Connect Local Workers with Daily Opportunities
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              BluuJobs bridges the gap between daily wage workers and employers in India. 
              Find work nearby or hire trusted workers for your tasks.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/register">
                <Button size="lg" className="shadow-lg">
                  Get Started
                </Button>
              </Link>
              <Link to="/jobs">
                <Button size="lg" variant="outline">
                  Browse Jobs
                </Button>
              </Link>
            </div>
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
            <Button size="lg" variant="secondary" className="shadow-xl">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 BluuJobs. Empowering daily wage workers across India.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
