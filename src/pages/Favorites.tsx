import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getCurrentUser, getFavorites, getJobById, removeFavorite, Job } from '@/lib/storage';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MapPin, IndianRupee, Clock, Briefcase, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const Favorites = () => {
  const navigate = useNavigate();
  const [favoriteJobs, setFavoriteJobs] = useState<Job[]>([]);
  const [currentUser, setCurrentUser] = useState(getCurrentUser());

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      navigate('/login');
      return;
    }
    setCurrentUser(user);

    const favorites = getFavorites(user.id);
    const jobs = favorites.map(fav => getJobById(fav.jobId)).filter(job => job !== null) as Job[];
    setFavoriteJobs(jobs);
  }, [navigate]);

  const handleRemoveFavorite = (jobId: string) => {
    if (!currentUser) return;
    
    removeFavorite(currentUser.id, jobId);
    setFavoriteJobs(prev => prev.filter(job => job.id !== jobId));
    toast.success('Removed from favorites');
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="flex items-center gap-3 mb-6">
          <Heart className="h-8 w-8 text-primary fill-primary" />
          <h1 className="text-3xl font-bold">My Favorites</h1>
        </div>

        {favoriteJobs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">No favorite jobs yet</p>
              <Link to="/jobs">
                <Button>Browse Jobs</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteJobs.map(job => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge>{job.category}</Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveFavorite(job.id)}
                      className="h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  <CardTitle className="text-xl">{job.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{job.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-sm">
                      <IndianRupee className="h-4 w-4 mr-2 text-muted-foreground" />
                      ₹{job.wage}/day
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      {job.duration}
                    </div>
                    <div className="flex items-center text-sm">
                      <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                      {job.employerName}
                    </div>
                  </div>
                  <Link to={`/job/${job.id}`}>
                    <Button className="w-full">View Details</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Favorites;
