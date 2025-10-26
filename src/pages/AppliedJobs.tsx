import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getCurrentUser, getApplicationsByWorkerId, getJobById, Application, Job } from '@/lib/storage';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import { MapPin, Clock, IndianRupee, Briefcase } from 'lucide-react';

interface ApplicationWithJob extends Application {
  job: Job | null;
}

const AppliedJobs = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(getCurrentUser());
  const [applications, setApplications] = useState<ApplicationWithJob[]>([]);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    if (currentUser.userType !== 'worker') {
      toast.error('Only workers can view applied jobs');
      navigate('/dashboard');
      return;
    }
    setUser(currentUser);
    
    // Load applications with job details
    const apps = getApplicationsByWorkerId(currentUser.id);
    const appsWithJobs = apps.map(app => ({
      ...app,
      job: getJobById(app.jobId)
    }));
    setApplications(appsWithJobs);
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Applications</h1>
          <p className="text-muted-foreground">
            Track all the jobs you've applied for
          </p>
        </div>

        {applications.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">No applications yet</p>
              <p className="text-muted-foreground mb-4">Start applying to jobs to see them here</p>
              <Button onClick={() => navigate('/jobs')}>Browse Jobs</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {applications.map((app) => {
              if (!app.job) return null;
              
              return (
                <Card key={app.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl mb-2">{app.job.title}</CardTitle>
                        <CardDescription>Applied on {new Date(app.appliedAt).toLocaleDateString()}</CardDescription>
                      </div>
                      <Badge 
                        variant={
                          app.status === 'accepted' ? 'default' : 
                          app.status === 'rejected' ? 'destructive' : 
                          'secondary'
                        }
                      >
                        {app.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{app.job.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{app.job.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <IndianRupee className="h-4 w-4 text-muted-foreground" />
                        <span>₹{app.job.wage}/day</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{app.job.duration}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span>{app.job.category}</span>
                      </div>
                    </div>

                    <Button 
                      variant="outline" 
                      onClick={() => navigate(`/job/${app.job!.id}`)}
                    >
                      View Job Details
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppliedJobs;
