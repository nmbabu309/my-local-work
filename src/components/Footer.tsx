import { Link } from 'react-router-dom';
import { Briefcase } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Briefcase className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary">BluuJobs</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Connecting daily wage workers with local opportunities across India.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/jobs" className="text-muted-foreground hover:text-primary">Browse Jobs</Link></li>
              <li><Link to="/post-job" className="text-muted-foreground hover:text-primary">Post a Job</Link></li>
              <li><Link to="/dashboard" className="text-muted-foreground hover:text-primary">Dashboard</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary">About Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">How It Works</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">FAQs</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Email: contact@bluujobs.com</li>
              <li>Phone: +91 98765 00000</li>
              <li>Mumbai, Maharashtra</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} BluuJobs. All rights reserved. Empowering daily wage workers across India.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
