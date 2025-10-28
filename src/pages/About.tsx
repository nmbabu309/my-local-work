import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Eye, Heart, Users, Briefcase, TrendingUp } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">About BluuJobs</h1>
            <p className="text-muted-foreground text-lg">
              Connecting daily wage workers with opportunities, one job at a time
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <p className="text-lg leading-relaxed mb-4">
                BluuJobs is a revolutionary platform designed to bridge the gap between daily wage workers 
                and employers in India. We understand that finding reliable work every day is challenging 
                for millions of workers, while employers struggle to find skilled workers for short-term tasks.
              </p>
              <p className="text-lg leading-relaxed">
                Our mission is to create a seamless, accessible platform where workers can easily discover 
                job opportunities near them, and employers can quickly find the right talent for their needs.
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Target className="h-12 w-12 text-primary mb-4" />
                <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
                <p className="text-muted-foreground">
                  To empower daily wage workers by providing easy access to job opportunities and 
                  helping them build sustainable livelihoods through dignified work.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Eye className="h-12 w-12 text-primary mb-4" />
                <h2 className="text-2xl font-bold mb-3">Our Vision</h2>
                <p className="text-muted-foreground">
                  To become India's most trusted platform for connecting blue-collar workers with 
                  employers, creating millions of job opportunities and transforming lives.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Heart className="h-6 w-6 mr-2 text-primary" />
                What We Believe In
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Users className="h-10 w-10 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">Accessibility</h3>
                  <p className="text-sm text-muted-foreground">
                    Making job opportunities accessible to everyone, everywhere
                  </p>
                </div>
                <div className="text-center">
                  <Briefcase className="h-10 w-10 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">Dignity</h3>
                  <p className="text-sm text-muted-foreground">
                    Treating every worker with respect and fair compensation
                  </p>
                </div>
                <div className="text-center">
                  <TrendingUp className="h-10 w-10 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">Growth</h3>
                  <p className="text-sm text-muted-foreground">
                    Helping workers build skills and advance their careers
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Our Impact</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
                  <div className="text-sm text-muted-foreground">Workers Registered</div>
                </div>
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-2">5,000+</div>
                  <div className="text-sm text-muted-foreground">Jobs Posted</div>
                </div>
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-2">95%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
