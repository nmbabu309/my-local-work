// Local storage management for BluuJobs
// This simulates a database using browser's localStorage

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  userType: 'worker' | 'employer' | 'admin';
  location: string;
  skills?: string[];
  company?: string;
  createdAt: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  employerId: string;
  employerName: string;
  location: string;
  wage: number;
  duration: string;
  category: string;
  status: 'open' | 'closed';
  applicants: string[];
  createdAt: string;
}

export interface Application {
  id: string;
  jobId: string;
  workerId: string;
  workerName: string;
  status: 'pending' | 'accepted' | 'rejected';
  appliedAt: string;
}

// Initialize sample data if localStorage is empty
export const initializeData = () => {
  if (!localStorage.getItem('bluujobs_users')) {
    const sampleUsers: User[] = [
      {
        id: '1',
        name: 'Rajesh Kumar',
        email: 'rajesh@example.com',
        password: 'worker123',
        phone: '+91 98765 43210',
        userType: 'worker',
        location: 'Mumbai, Maharashtra',
        skills: ['Painting', 'Plumbing', 'General Labor'],
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Priya Sharma',
        email: 'priya@example.com',
        password: 'employer123',
        phone: '+91 98765 43211',
        userType: 'employer',
        location: 'Mumbai, Maharashtra',
        company: 'Sharma Constructions',
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        name: 'Admin User',
        email: 'admin@bluujobs.com',
        password: 'admin123',
        phone: '+91 98765 43212',
        userType: 'admin',
        location: 'Mumbai, Maharashtra',
        createdAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem('bluujobs_users', JSON.stringify(sampleUsers));
  }

  if (!localStorage.getItem('bluujobs_jobs')) {
    const sampleJobs: Job[] = [
      {
        id: '1',
        title: 'Painter Needed for Home',
        description: 'Need experienced painter for 2BHK apartment. Work includes wall painting and touch-ups.',
        employerId: '2',
        employerName: 'Priya Sharma',
        location: 'Andheri, Mumbai',
        wage: 800,
        duration: '3 days',
        category: 'Painting',
        status: 'open',
        applicants: [],
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Delivery Helper Required',
        description: 'Looking for helper to deliver furniture items across Mumbai. Must have experience in handling goods.',
        employerId: '2',
        employerName: 'Priya Sharma',
        location: 'Bandra, Mumbai',
        wage: 600,
        duration: '1 day',
        category: 'Delivery',
        status: 'open',
        applicants: [],
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        title: 'Construction Labor - Urgent',
        description: 'Need 5 laborers for construction site. Heavy lifting involved. Daily wage basis.',
        employerId: '2',
        employerName: 'Priya Sharma',
        location: 'Powai, Mumbai',
        wage: 700,
        duration: '10 days',
        category: 'Construction',
        status: 'open',
        applicants: [],
        createdAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem('bluujobs_jobs', JSON.stringify(sampleJobs));
  }

  if (!localStorage.getItem('bluujobs_applications')) {
    localStorage.setItem('bluujobs_applications', JSON.stringify([]));
  }
};

// User operations
export const getUsers = (): User[] => {
  const users = localStorage.getItem('bluujobs_users');
  return users ? JSON.parse(users) : [];
};

export const addUser = (user: User): void => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem('bluujobs_users', JSON.stringify(users));
};

export const getUserById = (id: string): User | null => {
  const users = getUsers();
  return users.find(u => u.id === id) || null;
};

export const authenticateUser = (email: string, password: string): User | null => {
  const users = getUsers();
  return users.find(u => u.email === email && u.password === password) || null;
};

// Job operations
export const getJobs = (): Job[] => {
  const jobs = localStorage.getItem('bluujobs_jobs');
  return jobs ? JSON.parse(jobs) : [];
};

export const addJob = (job: Job): void => {
  const jobs = getJobs();
  jobs.push(job);
  localStorage.setItem('bluujobs_jobs', JSON.stringify(jobs));
};

export const getJobById = (id: string): Job | null => {
  const jobs = getJobs();
  return jobs.find(j => j.id === id) || null;
};

export const updateJob = (id: string, updates: Partial<Job>): void => {
  const jobs = getJobs();
  const index = jobs.findIndex(j => j.id === id);
  if (index !== -1) {
    jobs[index] = { ...jobs[index], ...updates };
    localStorage.setItem('bluujobs_jobs', JSON.stringify(jobs));
  }
};

// Application operations
export const getApplications = (): Application[] => {
  const apps = localStorage.getItem('bluujobs_applications');
  return apps ? JSON.parse(apps) : [];
};

export const addApplication = (application: Application): void => {
  const apps = getApplications();
  apps.push(application);
  localStorage.setItem('bluujobs_applications', JSON.stringify(apps));
  
  // Update job's applicants list
  const job = getJobById(application.jobId);
  if (job) {
    updateJob(job.id, {
      applicants: [...job.applicants, application.workerId]
    });
  }
};

export const getApplicationsByWorkerId = (workerId: string): Application[] => {
  return getApplications().filter(app => app.workerId === workerId);
};

export const getApplicationsByJobId = (jobId: string): Application[] => {
  return getApplications().filter(app => app.jobId === jobId);
};

// Current user session
export const setCurrentUser = (user: User): void => {
  localStorage.setItem('bluujobs_current_user', JSON.stringify(user));
};

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem('bluujobs_current_user');
  return user ? JSON.parse(user) : null;
};

export const logout = (): void => {
  localStorage.removeItem('bluujobs_current_user');
};

// Update user profile
export const updateUser = (userId: string, updates: Partial<User>): void => {
  const users = getUsers();
  const index = users.findIndex(u => u.id === userId);
  if (index !== -1) {
    users[index] = { ...users[index], ...updates };
    localStorage.setItem('bluujobs_users', JSON.stringify(users));
    
    // Update current user if it's the same user
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      setCurrentUser(users[index]);
    }
  }
};

// Delete user (admin only)
export const deleteUser = (userId: string): void => {
  const users = getUsers();
  const filteredUsers = users.filter(u => u.id !== userId);
  localStorage.setItem('bluujobs_users', JSON.stringify(filteredUsers));
};

// Delete job (admin or employer who created it)
export const deleteJob = (jobId: string): void => {
  const jobs = getJobs();
  const filteredJobs = jobs.filter(j => j.id !== jobId);
  localStorage.setItem('bluujobs_jobs', JSON.stringify(filteredJobs));
  
  // Also delete associated applications
  const apps = getApplications();
  const filteredApps = apps.filter(app => app.jobId !== jobId);
  localStorage.setItem('bluujobs_applications', JSON.stringify(filteredApps));
};
