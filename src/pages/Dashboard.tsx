import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, getJobs, getApplicationsByWorkerId, Job, Application } from '@/lib/storage';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, MapPin, IndianRupee, Clock, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(getCurrentUser());
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setUser(currentUser);

    if (currentUser.userType === 'worker') {
      setJobs(getJobs().filter(j => j.status === 'open'));
      setApplications(getApplicationsByWorkerId(currentUser.id));
    } else {
      setJobs(getJobs().filter(j => j.employerId === currentUser.id));
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
          <p className="text-muted-foreground">
            {user.userType === 'worker' 
              ? 'Find your next opportunity below' 
              : 'Manage your job postings'}
          </p>
        </div>

        {user.userType === 'employer' && (
          <div className="mb-6">
            <Link to="/post-job">
              <Button size="lg">
                <Plus className="mr-2 h-5 w-5" />
                Post New Job
              </Button>
            </Link>
          </div>
        )}

        <div className="grid gap-6">
          {user.userType === 'worker' && applications.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Your Applications</CardTitle>
                <CardDescription>Track the status of your job applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {applications.map(app => {
                    const job = jobs.find(j => j.id === app.jobId);
                    return (
                      <div key={app.id} className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <p className="font-semibold">{job?.title}</p>
                          <p className="text-sm text-muted-foreground">{job?.employerName}</p>
                        </div>
                        <Badge variant={
                          app.status === 'accepted' ? 'default' : 
                          app.status === 'rejected' ? 'destructive' : 
                          'secondary'
                        }>
                          {app.status}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          <div>
            <h2 className="text-2xl font-bold mb-4">
              {user.userType === 'worker' ? 'Available Jobs' : 'Your Posted Jobs'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map(job => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge>{job.category}</Badge>
                      <Badge variant="outline">{job.status}</Badge>
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
            {jobs.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    {user.userType === 'worker' 
                      ? 'No jobs available at the moment. Check back soon!' 
                      : 'You haven\'t posted any jobs yet. Click "Post New Job" to get started!'}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
