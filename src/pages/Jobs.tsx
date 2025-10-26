import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getJobs, Job } from '@/lib/storage';
import Navbar from '@/components/Navbar';
import { MapPin, Clock, IndianRupee, Search, Filter, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const Jobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    setJobs(getJobs().filter(job => job.status === 'open'));
  }, []);

  const categories = ['all', 'Painting', 'Plumbing', 'Carpentry', 'Construction', 'Delivery', 'Cleaning', 'Electrical', 'Other'];

  const filteredJobs = jobs.filter(job => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = (
      job.title.toLowerCase().includes(query) ||
      job.category.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query)
    );
    const matchesCategory = categoryFilter === 'all' || job.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Browse All Jobs</h1>
          
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs by title, category, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map(job => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge>{job.category}</Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Open
                  </Badge>
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
                  <div className="flex items-center text-sm font-semibold text-primary">
                    <IndianRupee className="h-4 w-4 mr-2" />
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
                  <Button className="w-full">View Details & Apply</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                {searchQuery || categoryFilter !== 'all'
                  ? 'No jobs found matching your search. Try different keywords.' 
                  : 'No jobs available at the moment. Check back soon!'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Jobs;
