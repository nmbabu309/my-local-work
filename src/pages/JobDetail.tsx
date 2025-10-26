import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getJobById, getCurrentUser, addApplication, getApplications, Job, Application } from '@/lib/storage';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, IndianRupee, Clock, Briefcase, User } from 'lucide-react';
import { toast } from 'sonner';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [user, setUser] = useState(getCurrentUser());
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    if (!id) return;
    
    const jobData = getJobById(id);
    setJob(jobData);

    const currentUser = getCurrentUser();
    setUser(currentUser);

    if (currentUser && jobData) {
      const applications = getApplications();
      const applied = applications.some(
        app => app.jobId === jobData.id && app.workerId === currentUser.id
      );
      setHasApplied(applied);
    }
  }, [id]);

  const handleApply = () => {
    if (!user) {
      toast.error('Please login to apply for jobs');
      navigate('/login');
      return;
    }

    if (user.userType !== 'worker') {
      toast.error('Only workers can apply for jobs');
      return;
    }

    if (!job) return;

    const application: Application = {
      id: Date.now().toString(),
      jobId: job.id,
      workerId: user.id,
      workerName: user.name,
      status: 'pending',
      appliedAt: new Date().toISOString(),
    };

    addApplication(application);
    setHasApplied(true);
    toast.success('Application submitted successfully!');
  };

  if (!job) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p>Job not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-2">
                  <Badge>{job.category}</Badge>
                  <Badge variant="outline" className={
                    job.status === 'open' 
                      ? 'bg-green-50 text-green-700 border-green-200' 
                      : 'bg-gray-50 text-gray-700 border-gray-200'
                  }>
                    {job.status}
                  </Badge>
                </div>
              </div>
              <CardTitle className="text-3xl">{job.title}</CardTitle>
              <CardDescription className="text-base mt-2">Posted by {job.employerName}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Job Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-3 text-muted-foreground" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center">
                    <IndianRupee className="h-5 w-5 mr-3 text-primary" />
                    <span className="font-semibold text-primary">₹{job.wage} per day</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-3 text-muted-foreground" />
                    <span>{job.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="h-5 w-5 mr-3 text-muted-foreground" />
                    <span>{job.category}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-3 text-muted-foreground" />
                    <span>{job.applicants.length} applicants</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Description</h3>
                <p className="text-muted-foreground">{job.description}</p>
              </div>

              {user?.userType === 'worker' && job.status === 'open' && (
                <div className="pt-4">
                  <Button 
                    onClick={handleApply} 
                    disabled={hasApplied}
                    className="w-full"
                    size="lg"
                  >
                    {hasApplied ? 'Already Applied' : 'Apply for this Job'}
                  </Button>
                </div>
              )}

              {!user && (
                <div className="pt-4 text-center">
                  <p className="text-muted-foreground mb-4">Login to apply for this job</p>
                  <Button onClick={() => navigate('/login')} size="lg">
                    Login
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
