import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getCurrentUser, getJobs, getApplicationsByWorkerId, Job, Application, getApplications, getUsers, updateJob, deleteJob, User, getNotifications } from '@/lib/storage';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Briefcase, MapPin, IndianRupee, Clock, Plus, TrendingUp, Users, CheckCircle2, Eye, Pencil, Trash2, Phone, Mail, Star, AlertCircle, Search, Calendar, Bell } from 'lucide-react';
import { toast } from 'sonner';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(getCurrentUser());
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Job>>({});
  const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'closed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState<'all' | 'week' | 'month'>('all');
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  const loadData = () => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setUser(currentUser);

    if (currentUser.userType === 'worker') {
      setJobs(getJobs().filter(j => j.status === 'open').slice(0, 6));
      setApplications(getApplicationsByWorkerId(currentUser.id));
    } else {
      const employerJobs = getJobs().filter(j => j.employerId === currentUser.id);
      setJobs(employerJobs);
      const allApplications = getApplications();
      const myJobIds = employerJobs.map(j => j.id);
      setApplications(allApplications.filter(app => myJobIds.includes(app.jobId)));
      
      // Get unread notifications count
      const notifications = getNotifications(currentUser.id);
      const unread = notifications.filter(n => !n.read).length;
      setUnreadNotifications(unread);
    }
  };

  useEffect(() => {
    loadData();
  }, [navigate]);

  if (!user) return null;

  const filteredJobs = jobs.filter(job => {
    // Status filter
    if (filterStatus !== 'all' && job.status !== filterStatus) return false;
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!job.title.toLowerCase().includes(query) && 
          !job.category.toLowerCase().includes(query) &&
          !job.location.toLowerCase().includes(query)) {
        return false;
      }
    }
    
    // Date filter
    if (dateFilter !== 'all') {
      const jobDate = new Date(job.createdAt);
      const now = new Date();
      const daysDiff = Math.floor((now.getTime() - jobDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (dateFilter === 'week' && daysDiff > 7) return false;
      if (dateFilter === 'month' && daysDiff > 30) return false;
    }
    
    return true;
  });

  const activeJobs = jobs.filter(j => j.status === 'open').length;
  const stats = {
    totalJobs: jobs.length,
    activeJobs,
    totalApplications: applications.length,
    acceptedApplications: applications.filter(a => a.status === 'accepted').length,
    pendingApplications: applications.filter(a => a.status === 'pending').length,
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setEditFormData({
      title: job.title,
      description: job.description,
      location: job.location,
      wage: job.wage,
      duration: job.duration,
      category: job.category,
      status: job.status,
    });
  };

  const handleUpdateJob = () => {
    if (!editingJob) return;
    
    updateJob(editingJob.id, editFormData);
    toast.success('Job updated successfully!');
    setEditingJob(null);
    loadData();
  };

  const handleDeleteJob = (jobId: string) => {
    deleteJob(jobId);
    toast.success('Job deleted successfully!');
    loadData();
  };

  const getApplicantsForJob = (jobId: string) => {
    const jobApplications = applications.filter(app => app.jobId === jobId);
    const allUsers = getUsers();
    
    return jobApplications.map(app => {
      const applicant = allUsers.find(u => u.id === app.workerId);
      return {
        ...app,
        applicant,
      };
    });
  };

  // Employer Dashboard - Redesigned with clean layout
  if (user.userType === 'employer') {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        
        <div className="container mx-auto px-4 py-8 flex-1">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
              <p className="text-muted-foreground">Manage your job postings and track applications</p>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="relative"
              onClick={() => navigate('/notifications')}
            >
              <Bell className="h-5 w-5" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </Button>
          </div>

          {/* Statistics Cards */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="hover:shadow-lg transition-all border-l-4 border-l-primary">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
                <Briefcase className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.totalJobs}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {activeJobs} active
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all border-l-4 border-l-blue-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                <Users className="h-5 w-5 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.totalApplications}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stats.pendingApplications} pending review
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all border-l-4 border-l-green-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Accepted</CardTitle>
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">{stats.acceptedApplications}</div>
                <p className="text-xs text-muted-foreground mt-1">Successfully hired</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all border-l-4 border-l-orange-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Applicants</CardTitle>
                <TrendingUp className="h-5 w-5 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {stats.totalJobs > 0 ? Math.round(stats.totalApplications / stats.totalJobs) : 0}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Per job posting</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4">
                {/* Search and Date Filter Row */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search jobs by title, category, or location..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={dateFilter} onValueChange={(value: any) => setDateFilter(value)}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <Calendar className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Filter by date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="week">Last 7 Days</SelectItem>
                      <SelectItem value="month">Last 30 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Status Filters and Post Job Button */}
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                  <div className="flex gap-2">
                    <Button
                      variant={filterStatus === 'all' ? 'default' : 'outline'}
                      onClick={() => setFilterStatus('all')}
                      size="sm"
                    >
                      All Jobs
                    </Button>
                    <Button
                      variant={filterStatus === 'open' ? 'default' : 'outline'}
                      onClick={() => setFilterStatus('open')}
                      size="sm"
                    >
                      Active
                    </Button>
                    <Button
                      variant={filterStatus === 'closed' ? 'default' : 'outline'}
                      onClick={() => setFilterStatus('closed')}
                      size="sm"
                    >
                      Closed
                    </Button>
                  </div>
                  <Link to="/post-job">
                    <Button size="lg" className="w-full sm:w-auto">
                      <Plus className="mr-2 h-5 w-5" />
                      Post New Job
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Management Table */}
          <Card>
            <CardHeader>
              <CardTitle>Job Management</CardTitle>
              <CardDescription>
                View and manage all your job postings ({filteredJobs.length} {filterStatus === 'all' ? 'total' : filterStatus})
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredJobs.length === 0 ? (
                <div className="text-center py-12">
                  <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
                  <p className="text-muted-foreground mb-4">
                    {filterStatus === 'all' 
                      ? "You haven't posted any jobs yet." 
                      : `No ${filterStatus} jobs available.`}
                  </p>
                  {filterStatus === 'all' && (
                    <Link to="/post-job">
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Post Your First Job
                      </Button>
                    </Link>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Job Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Wage</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-center">Applicants</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredJobs.map((job) => {
                        const jobApplicants = getApplicantsForJob(job.id);
                        return (
                          <TableRow key={job.id} className="hover:bg-muted/50">
                            <TableCell className="font-medium">{job.title}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{job.category}</Badge>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {job.location}
                            </TableCell>
                            <TableCell className="text-sm">₹{job.wage}/day</TableCell>
                            <TableCell>
                              <Badge variant={job.status === 'open' ? 'default' : 'secondary'}>
                                {job.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className="font-semibold"
                                    onClick={() => setSelectedJob(job)}
                                  >
                                    {jobApplicants.length}
                                    {jobApplicants.length > 0 && (
                                      <Eye className="ml-1 h-4 w-4" />
                                    )}
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                                  <DialogHeader>
                                    <DialogTitle>Applicants for "{job.title}"</DialogTitle>
                                    <DialogDescription>
                                      Review applicants and their profiles
                                    </DialogDescription>
                                  </DialogHeader>
                                  
                                  {jobApplicants.length === 0 ? (
                                    <div className="text-center py-8">
                                      <Users className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                                      <p className="text-muted-foreground">No applications yet</p>
                                    </div>
                                  ) : (
                                    <div className="space-y-4">
                                      {jobApplicants.map((app) => (
                                        <Card key={app.id} className="border-l-4 border-l-primary">
                                          <CardContent className="pt-6">
                                            <div className="flex justify-between items-start mb-4">
                                              <div className="flex-1">
                                                <h4 className="font-semibold text-lg">{app.applicant?.name}</h4>
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                                  <Mail className="h-3 w-3" />
                                                  {app.applicant?.email}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                                  <Phone className="h-3 w-3" />
                                                  {app.applicant?.phone || 'Not provided'}
                                                </div>
                                              </div>
                                              <Badge variant={
                                                app.status === 'accepted' ? 'default' : 
                                                app.status === 'rejected' ? 'destructive' : 
                                                'secondary'
                                              }>
                                                {app.status}
                                              </Badge>
                                            </div>
                                            
                                            {app.applicant && (
                                              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t">
                                                <div>
                                                  <p className="text-xs text-muted-foreground">Experience</p>
                                                  <p className="font-medium">{app.applicant.experience || 'N/A'} years</p>
                                                </div>
                                                <div>
                                                  <p className="text-xs text-muted-foreground">Skills</p>
                                                  <p className="font-medium">{app.applicant.skills?.join(', ') || 'N/A'}</p>
                                                </div>
                                                <div>
                                                  <p className="text-xs text-muted-foreground">Rating</p>
                                                  <div className="flex items-center gap-1">
                                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                    <span className="font-medium">
                                                      {app.applicant.rating?.toFixed(1) || 'N/A'}
                                                    </span>
                                                  </div>
                                                </div>
                                                <div>
                                                  <p className="text-xs text-muted-foreground">Location</p>
                                                  <p className="font-medium">{app.applicant.area || app.applicant.location || 'N/A'}</p>
                                                </div>
                                              </div>
                                            )}
                                          </CardContent>
                                        </Card>
                                      ))}
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => handleEditJob(job)}
                                    >
                                      <Pencil className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Edit Job</DialogTitle>
                                      <DialogDescription>
                                        Update job details and status
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <div className="space-y-2">
                                        <Label htmlFor="edit-title">Job Title</Label>
                                        <Input
                                          id="edit-title"
                                          value={editFormData.title || ''}
                                          onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="edit-description">Description</Label>
                                        <Textarea
                                          id="edit-description"
                                          value={editFormData.description || ''}
                                          onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                                          rows={3}
                                        />
                                      </div>
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-location">Location</Label>
                                          <Input
                                            id="edit-location"
                                            value={editFormData.location || ''}
                                            onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-wage">Daily Wage (₹)</Label>
                                          <Input
                                            id="edit-wage"
                                            type="number"
                                            value={editFormData.wage || ''}
                                            onChange={(e) => setEditFormData({ ...editFormData, wage: parseInt(e.target.value) })}
                                          />
                                        </div>
                                      </div>
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-duration">Duration</Label>
                                          <Input
                                            id="edit-duration"
                                            value={editFormData.duration || ''}
                                            onChange={(e) => setEditFormData({ ...editFormData, duration: e.target.value })}
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="edit-status">Status</Label>
                                          <Select
                                            value={editFormData.status}
                                            onValueChange={(value: 'open' | 'closed') => 
                                              setEditFormData({ ...editFormData, status: value })
                                            }
                                          >
                                            <SelectTrigger>
                                              <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="open">Open</SelectItem>
                                              <SelectItem value="closed">Closed</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                      </div>
                                      <Button onClick={handleUpdateJob} className="w-full">
                                        Save Changes
                                      </Button>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                                
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Delete Job?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete "{job.title}"? This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleDeleteJob(job.id)}
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                      >
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Analytics Section */}
          {stats.totalJobs > 0 && (
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Application Rate</span>
                    <span className="font-semibold">
                      {stats.totalJobs > 0 ? ((stats.totalApplications / stats.totalJobs) * 100).toFixed(0) : 0}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Acceptance Rate</span>
                    <span className="font-semibold text-green-600">
                      {stats.totalApplications > 0 
                        ? ((stats.acceptedApplications / stats.totalApplications) * 100).toFixed(0) 
                        : 0}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Active Job Rate</span>
                    <span className="font-semibold">
                      {stats.totalJobs > 0 ? ((activeJobs / stats.totalJobs) * 100).toFixed(0) : 0}%
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {applications.slice(0, 5).map((app) => {
                      const job = jobs.find(j => j.id === app.jobId);
                      const applicant = getUsers().find(u => u.id === app.workerId);
                      return (
                        <div key={app.id} className="flex justify-between items-center text-sm">
                          <div className="flex-1">
                            <p className="font-medium">{applicant?.name}</p>
                            <p className="text-xs text-muted-foreground">{job?.title}</p>
                          </div>
                          <Badge variant={
                            app.status === 'accepted' ? 'default' : 
                            app.status === 'rejected' ? 'destructive' : 
                            'secondary'
                          } className="text-xs">
                            {app.status}
                          </Badge>
                        </div>
                      );
                    })}
                    {applications.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No applications yet
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        <Footer />
      </div>
    );
  }

  // Worker Dashboard - Keep existing design
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
          <p className="text-muted-foreground">Find your next opportunity below</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Jobs</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalJobs}</div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Applications</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalApplications}</div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Accepted</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{stats.acceptedApplications}</div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <TrendingUp className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{stats.pendingApplications}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6">
          {applications.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Your Applications</CardTitle>
                <CardDescription>Track the status of your job applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {applications.map(app => {
                    const job = getJobs().find(j => j.id === app.jobId);
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
            <h2 className="text-2xl font-bold mb-4">Available Jobs</h2>
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
                    No jobs available at the moment. Check back soon!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
