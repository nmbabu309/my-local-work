import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getCurrentUser, getApplicationsByWorkerId, getJobs, User } from '@/lib/storage';
import Navbar from '@/components/Navbar';
import { User as UserIcon, Mail, Phone, MapPin, Briefcase, Edit } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState({ appliedJobs: 0, postedJobs: 0 });

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setUser(currentUser);
    
    // Calculate stats
    if (currentUser.userType === 'worker') {
      const applications = getApplicationsByWorkerId(currentUser.id);
      setStats({ appliedJobs: applications.length, postedJobs: 0 });
    } else if (currentUser.userType === 'employer') {
      const jobs = getJobs().filter(j => j.employerId === currentUser.id);
      setStats({ appliedJobs: 0, postedJobs: jobs.length });
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <UserIcon className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{user.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Badge variant={user.userType === 'worker' ? 'default' : 'secondary'}>
                        {user.userType === 'worker' ? 'Worker' : user.userType === 'employer' ? 'Employer' : 'Admin'}
                      </Badge>
                    </CardDescription>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate('/edit-profile')}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-3 text-muted-foreground" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-3 text-muted-foreground" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-3 text-muted-foreground" />
                    <span>{user.location}</span>
                  </div>
                </div>
              </div>

              {user.userType === 'worker' && user.skills && (
                <div>
                  <h3 className="font-semibold text-lg mb-4">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill, index) => (
                      <Badge key={index} variant="outline">
                        <Briefcase className="h-3 w-3 mr-1" />
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {user.userType === 'employer' && user.company && (
                <div>
                  <h3 className="font-semibold text-lg mb-4">Company</h3>
                  <div className="flex items-center">
                    <Briefcase className="h-5 w-5 mr-3 text-muted-foreground" />
                    <span>{user.company}</span>
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-semibold text-lg mb-2">Member Since</h3>
                <p className="text-muted-foreground">
                  {new Date(user.createdAt).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Activity</CardTitle>
              <CardDescription>Your platform statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.userType === 'worker' && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Jobs Applied</span>
                    <span className="text-2xl font-bold">{stats.appliedJobs}</span>
                  </div>
                )}
                {user.userType === 'employer' && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Jobs Posted</span>
                    <span className="text-2xl font-bold">{stats.postedJobs}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
