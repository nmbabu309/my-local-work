import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getJobs, Job } from '@/lib/storage';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JobFilters, { FilterState } from '@/components/JobFilters';
import { MapPin, Clock, IndianRupee, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const Jobs = () => {
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  useEffect(() => {
    const jobs = getJobs().filter(job => job.status === 'open');
    setAllJobs(jobs);
    setFilteredJobs(jobs);
  }, []);

  const handleFilterChange = (filters: FilterState) => {
    let filtered = [...allJobs];

    // Search filter
    if (filters.search) {
      const query = filters.search.toLowerCase();
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(query) ||
        job.category.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(job => job.category === filters.category);
    }

    // Location filter
    if (filters.location) {
      const locationQuery = filters.location.toLowerCase();
      filtered = filtered.filter(job =>
        job.location.toLowerCase().includes(locationQuery) ||
        job.area?.toLowerCase().includes(locationQuery) ||
        job.pincode?.includes(locationQuery)
      );
    }

    // Wage range filter
    filtered = filtered.filter(job =>
      job.wage >= filters.minWage && job.wage <= filters.maxWage
    );

    // Job type filter
    if (filters.jobType !== 'all') {
      filtered = filtered.filter(job => job.jobType === filters.jobType);
    }

    // Experience filter
    if (filters.experience !== 'all') {
      filtered = filtered.filter(job => job.experienceRequired === filters.experience);
    }

    // Sort
    switch (filters.sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'wage-high':
        filtered.sort((a, b) => b.wage - a.wage);
        break;
      case 'wage-low':
        filtered.sort((a, b) => a.wage - b.wage);
        break;
      case 'nearest':
        // Simple pincode-based sorting (jobs with pincode first)
        filtered.sort((a, b) => {
          if (a.pincode && !b.pincode) return -1;
          if (!a.pincode && b.pincode) return 1;
          return 0;
        });
        break;
    }

    setFilteredJobs(filtered);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Browse All Jobs</h1>
          <p className="text-muted-foreground mb-6">
            Find the perfect job opportunity near you
          </p>
          
          <JobFilters onFilterChange={handleFilterChange} />
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
              <Briefcase className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground text-lg mb-2">No jobs found</p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your filters or check back later for new opportunities
              </p>
            </CardContent>
          </Card>
        )}

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Showing {filteredJobs.length} of {allJobs.length} available jobs</p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Jobs;
