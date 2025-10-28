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
  pincode?: string;
  area?: string;
  experience?: string;
  bio?: string;
  rating?: number;
  totalRatings?: number;
  profileComplete?: number;
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
  pincode?: string;
  area?: string;
  experienceRequired?: string;
  jobType?: 'full-time' | 'part-time' | 'contract';
  expiresAt?: string;
}

export interface Application {
  id: string;
  jobId: string;
  workerId: string;
  workerName: string;
  status: 'pending' | 'accepted' | 'rejected';
  appliedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
  read: boolean;
  createdAt: string;
}

export interface Favorite {
  id: string;
  userId: string;
  jobId: string;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  senderName: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Review {
  id: string;
  fromUserId: string;
  toUserId: string;
  fromUserName: string;
  rating: number;
  comment: string;
  jobId?: string;
  createdAt: string;
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
      {
        id: '4',
        name: 'Amit Verma',
        email: 'amit@example.com',
        password: 'worker123',
        phone: '+91 98765 43213',
        userType: 'worker',
        location: 'Delhi, NCR',
        skills: ['Carpentry', 'Electrical Work'],
        createdAt: new Date().toISOString(),
      },
      {
        id: '5',
        name: 'Neha Patel',
        email: 'neha@example.com',
        password: 'employer123',
        phone: '+91 98765 43214',
        userType: 'employer',
        location: 'Bangalore, Karnataka',
        company: 'Patel Enterprises',
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
      {
        id: '4',
        title: 'Electrician for Shop Setup',
        description: 'Need qualified electrician to setup wiring for new retail shop.',
        employerId: '5',
        employerName: 'Neha Patel',
        location: 'Whitefield, Bangalore',
        wage: 1000,
        duration: '2 days',
        category: 'Electrical',
        status: 'open',
        applicants: [],
        createdAt: new Date().toISOString(),
      },
      {
        id: '5',
        title: 'Cleaning Staff for Office',
        description: 'Looking for daily cleaning staff for office premises. Timings: 6 AM to 9 AM.',
        employerId: '5',
        employerName: 'Neha Patel',
        location: 'Koramangala, Bangalore',
        wage: 500,
        duration: 'Daily',
        category: 'Cleaning',
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

  if (!localStorage.getItem('bluujobs_notifications')) {
    localStorage.setItem('bluujobs_notifications', JSON.stringify([]));
  }

  if (!localStorage.getItem('bluujobs_favorites')) {
    localStorage.setItem('bluujobs_favorites', JSON.stringify([]));
  }

  if (!localStorage.getItem('bluujobs_messages')) {
    localStorage.setItem('bluujobs_messages', JSON.stringify([]));
  }

  if (!localStorage.getItem('bluujobs_reviews')) {
    localStorage.setItem('bluujobs_reviews', JSON.stringify([]));
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

// Notification operations
export const getNotifications = (userId: string): Notification[] => {
  const notifications = localStorage.getItem('bluujobs_notifications');
  const allNotifications: Notification[] = notifications ? JSON.parse(notifications) : [];
  return allNotifications.filter(n => n.userId === userId);
};

export const addNotification = (notification: Notification): void => {
  const notifications = localStorage.getItem('bluujobs_notifications');
  const allNotifications: Notification[] = notifications ? JSON.parse(notifications) : [];
  allNotifications.push(notification);
  localStorage.setItem('bluujobs_notifications', JSON.stringify(allNotifications));
};

export const markNotificationAsRead = (notificationId: string): void => {
  const notifications = localStorage.getItem('bluujobs_notifications');
  const allNotifications: Notification[] = notifications ? JSON.parse(notifications) : [];
  const updated = allNotifications.map(n => 
    n.id === notificationId ? { ...n, read: true } : n
  );
  localStorage.setItem('bluujobs_notifications', JSON.stringify(updated));
};

// Favorite operations
export const getFavorites = (userId: string): Favorite[] => {
  const favorites = localStorage.getItem('bluujobs_favorites');
  const allFavorites: Favorite[] = favorites ? JSON.parse(favorites) : [];
  return allFavorites.filter(f => f.userId === userId);
};

export const addFavorite = (favorite: Favorite): void => {
  const favorites = localStorage.getItem('bluujobs_favorites');
  const allFavorites: Favorite[] = favorites ? JSON.parse(favorites) : [];
  allFavorites.push(favorite);
  localStorage.setItem('bluujobs_favorites', JSON.stringify(allFavorites));
};

export const removeFavorite = (userId: string, jobId: string): void => {
  const favorites = localStorage.getItem('bluujobs_favorites');
  const allFavorites: Favorite[] = favorites ? JSON.parse(favorites) : [];
  const filtered = allFavorites.filter(f => !(f.userId === userId && f.jobId === jobId));
  localStorage.setItem('bluujobs_favorites', JSON.stringify(filtered));
};

export const isFavorite = (userId: string, jobId: string): boolean => {
  const favorites = getFavorites(userId);
  return favorites.some(f => f.jobId === jobId);
};

// Message operations
export const getMessages = (userId: string): Message[] => {
  const messages = localStorage.getItem('bluujobs_messages');
  const allMessages: Message[] = messages ? JSON.parse(messages) : [];
  return allMessages.filter(m => m.senderId === userId || m.receiverId === userId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const getConversation = (userId: string, otherUserId: string): Message[] => {
  const messages = getMessages(userId);
  return messages.filter(m => 
    (m.senderId === userId && m.receiverId === otherUserId) ||
    (m.senderId === otherUserId && m.receiverId === userId)
  ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
};

export const sendMessage = (message: Message): void => {
  const messages = localStorage.getItem('bluujobs_messages');
  const allMessages: Message[] = messages ? JSON.parse(messages) : [];
  allMessages.push(message);
  localStorage.setItem('bluujobs_messages', JSON.stringify(allMessages));
};

export const markMessageAsRead = (messageId: string): void => {
  const messages = localStorage.getItem('bluujobs_messages');
  const allMessages: Message[] = messages ? JSON.parse(messages) : [];
  const updated = allMessages.map(m => 
    m.id === messageId ? { ...m, read: true } : m
  );
  localStorage.setItem('bluujobs_messages', JSON.stringify(updated));
};

// Review operations
export const getReviews = (userId: string): Review[] => {
  const reviews = localStorage.getItem('bluujobs_reviews');
  const allReviews: Review[] = reviews ? JSON.parse(reviews) : [];
  return allReviews.filter(r => r.toUserId === userId);
};

export const addReview = (review: Review): void => {
  const reviews = localStorage.getItem('bluujobs_reviews');
  const allReviews: Review[] = reviews ? JSON.parse(reviews) : [];
  allReviews.push(review);
  localStorage.setItem('bluujobs_reviews', JSON.stringify(allReviews));
  
  // Update user's average rating
  const userReviews = allReviews.filter(r => r.toUserId === review.toUserId);
  const avgRating = userReviews.reduce((sum, r) => sum + r.rating, 0) / userReviews.length;
  
  updateUser(review.toUserId, {
    rating: avgRating,
    totalRatings: userReviews.length
  });
};

export const updateApplicationStatus = (applicationId: string, status: 'pending' | 'accepted' | 'rejected'): void => {
  const apps = getApplications();
  const index = apps.findIndex(app => app.id === applicationId);
  if (index !== -1) {
    apps[index].status = status;
    localStorage.setItem('bluujobs_applications', JSON.stringify(apps));
  }
};
