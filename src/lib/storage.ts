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
      // Admin Account
      {
        id: '1',
        name: 'Admin User',
        email: 'admin@bluujobs.com',
        password: 'admin123',
        phone: '+91 90000 00000',
        userType: 'admin',
        location: 'Mumbai, Maharashtra',
        pincode: '400001',
        area: 'Fort',
        createdAt: new Date().toISOString(),
        profileComplete: 100,
      },
      
      // Sample Workers
      {
        id: '2',
        name: 'Rajesh Kumar',
        email: 'rajesh@example.com',
        password: 'worker123',
        phone: '+91 98765 43210',
        userType: 'worker',
        location: 'Andheri, Mumbai',
        pincode: '400058',
        area: 'Andheri West',
        skills: ['Plumbing', 'Pipe Fitting', 'Bathroom Repair'],
        experience: '8 years',
        bio: 'Experienced plumber specializing in residential and commercial plumbing. Available for emergency repairs.',
        rating: 4.7,
        totalRatings: 45,
        profileComplete: 95,
        createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '3',
        name: 'Priya Sharma',
        email: 'priya@example.com',
        password: 'worker123',
        phone: '+91 98765 43211',
        userType: 'worker',
        location: 'Bandra, Mumbai',
        pincode: '400050',
        area: 'Bandra West',
        skills: ['House Cleaning', 'Kitchen Work', 'Laundry'],
        experience: '5 years',
        bio: 'Professional house cleaning service. Honest, reliable, and thorough. Available for daily or weekly work.',
        rating: 4.9,
        totalRatings: 67,
        profileComplete: 90,
        createdAt: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '4',
        name: 'Amit Verma',
        email: 'amit@example.com',
        password: 'worker123',
        phone: '+91 98765 43213',
        userType: 'worker',
        location: 'Powai, Mumbai',
        pincode: '400076',
        area: 'Powai',
        skills: ['Painting', 'Wall Texturing', 'Waterproofing'],
        experience: '6 years',
        bio: 'Professional painter with expertise in interior and exterior painting. Quality work guaranteed.',
        rating: 4.5,
        totalRatings: 38,
        profileComplete: 85,
        createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '5',
        name: 'Suresh Patel',
        email: 'suresh@example.com',
        password: 'worker123',
        phone: '+91 98765 43214',
        userType: 'worker',
        location: 'Thane, Mumbai',
        pincode: '400601',
        area: 'Thane West',
        skills: ['Electrical Work', 'Wiring', 'Appliance Repair'],
        experience: '10 years',
        bio: 'Licensed electrician with 10 years experience. Expert in home wiring, repairs, and installations.',
        rating: 4.8,
        totalRatings: 52,
        profileComplete: 100,
        createdAt: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '6',
        name: 'Deepak Singh',
        email: 'deepak@example.com',
        password: 'worker123',
        phone: '+91 98765 43215',
        userType: 'worker',
        location: 'Goregaon, Mumbai',
        pincode: '400063',
        area: 'Goregaon East',
        skills: ['Carpentry', 'Furniture Making', 'Wood Work'],
        experience: '7 years',
        bio: 'Skilled carpenter for furniture repair, custom woodwork, and home renovations.',
        rating: 4.6,
        totalRatings: 41,
        profileComplete: 88,
        createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '7',
        name: 'Ramesh Yadav',
        email: 'ramesh@example.com',
        password: 'worker123',
        phone: '+91 98765 43216',
        userType: 'worker',
        location: 'Kurla, Mumbai',
        pincode: '400070',
        area: 'Kurla West',
        skills: ['Delivery', 'Loading', 'Transportation'],
        experience: '3 years',
        bio: 'Reliable delivery and loading services. Own vehicle available for goods transport.',
        rating: 4.3,
        totalRatings: 29,
        profileComplete: 80,
        createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      },
      
      // Sample Employers
      {
        id: '8',
        name: 'Neha Desai',
        email: 'neha@example.com',
        password: 'employer123',
        phone: '+91 98765 43220',
        userType: 'employer',
        location: 'Andheri, Mumbai',
        pincode: '400058',
        area: 'Andheri West',
        company: 'Desai Constructions',
        bio: 'Construction company specializing in residential and commercial projects.',
        rating: 4.4,
        totalRatings: 18,
        profileComplete: 92,
        createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '9',
        name: 'Vikram Malhotra',
        email: 'vikram@example.com',
        password: 'employer123',
        phone: '+91 98765 43221',
        userType: 'employer',
        location: 'Bandra, Mumbai',
        pincode: '400050',
        area: 'Bandra West',
        company: 'HomeCare Services',
        bio: 'Providing quality home maintenance and cleaning services across Mumbai.',
        rating: 4.6,
        totalRatings: 24,
        profileComplete: 95,
        createdAt: new Date(Date.now() - 300 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '10',
        name: 'Anjali Reddy',
        email: 'anjali@example.com',
        password: 'employer123',
        phone: '+91 98765 43222',
        userType: 'employer',
        location: 'Powai, Mumbai',
        pincode: '400076',
        area: 'Powai',
        company: 'Quick Delivery Hub',
        bio: 'Fast and reliable delivery services for local businesses and individuals.',
        rating: 4.5,
        totalRatings: 21,
        profileComplete: 90,
        createdAt: new Date(Date.now() - 250 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '11',
        name: 'Rahul Kapoor',
        email: 'rahul@example.com',
        password: 'employer123',
        phone: '+91 98765 43223',
        userType: 'employer',
        location: 'Malad, Mumbai',
        pincode: '400064',
        area: 'Malad West',
        company: 'SafeHands Painting',
        bio: 'Professional painting services for homes and offices. 10+ years in the business.',
        rating: 4.7,
        totalRatings: 32,
        profileComplete: 93,
        createdAt: new Date(Date.now() - 400 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '12',
        name: 'Kavita Singh',
        email: 'kavita@example.com',
        password: 'employer123',
        phone: '+91 98765 43224',
        userType: 'employer',
        location: 'Borivali, Mumbai',
        pincode: '400092',
        area: 'Borivali East',
        company: 'CleanCare Services',
        bio: 'Premium cleaning and housekeeping services. Trained staff and eco-friendly products.',
        rating: 4.8,
        totalRatings: 28,
        profileComplete: 97,
        createdAt: new Date(Date.now() - 320 * 24 * 60 * 60 * 1000).toISOString(),
      },
      
      // Additional Workers
      {
        id: '13',
        name: 'Meena Devi',
        email: 'meena@example.com',
        password: 'worker123',
        phone: '+91 98765 43225',
        userType: 'worker',
        location: 'Malad, Mumbai',
        pincode: '400064',
        area: 'Malad West',
        skills: ['Cooking', 'Indian Cuisine', 'Home Cooking'],
        experience: '12 years',
        bio: 'Expert cook specializing in North Indian and South Indian cuisines. Available for events and daily cooking.',
        rating: 4.9,
        totalRatings: 56,
        profileComplete: 92,
        createdAt: new Date(Date.now() - 240 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '14',
        name: 'Arjun Patil',
        email: 'arjun@example.com',
        password: 'worker123',
        phone: '+91 98765 43226',
        userType: 'worker',
        location: 'Borivali, Mumbai',
        pincode: '400092',
        area: 'Borivali East',
        skills: ['Driving', 'Car Maintenance', 'Route Navigation'],
        experience: '9 years',
        bio: 'Experienced driver with clean driving record. Familiar with all Mumbai routes. Available for full-time or part-time.',
        rating: 4.7,
        totalRatings: 44,
        profileComplete: 87,
        createdAt: new Date(Date.now() - 160 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '15',
        name: 'Lakshmi Nair',
        email: 'lakshmi@example.com',
        password: 'worker123',
        phone: '+91 98765 43227',
        userType: 'worker',
        location: 'Vile Parle, Mumbai',
        pincode: '400057',
        area: 'Vile Parle East',
        skills: ['Housekeeping', 'Babysitting', 'Elderly Care'],
        experience: '6 years',
        bio: 'Caring and reliable house help. Experienced in taking care of children and elderly. Very patient and trustworthy.',
        rating: 4.8,
        totalRatings: 39,
        profileComplete: 91,
        createdAt: new Date(Date.now() - 130 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '16',
        name: 'Ganesh Jadhav',
        email: 'ganesh@example.com',
        password: 'worker123',
        phone: '+91 98765 43228',
        userType: 'worker',
        location: 'Dadar, Mumbai',
        pincode: '400028',
        area: 'Dadar East',
        skills: ['Welding', 'Metal Work', 'Fabrication'],
        experience: '11 years',
        bio: 'Skilled welder and metal fabricator. Experienced in gate, window grills, and structural work.',
        rating: 4.6,
        totalRatings: 35,
        profileComplete: 86,
        createdAt: new Date(Date.now() - 210 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];
    localStorage.setItem('bluujobs_users', JSON.stringify(sampleUsers));
  }

  if (!localStorage.getItem('bluujobs_jobs')) {
    const sampleJobs: Job[] = [
      {
        id: '1',
        title: 'Urgent: Plumber Needed for Pipe Leakage',
        description: 'Kitchen sink pipe is leaking badly. Need immediate repair. Materials will be provided.',
        employerId: '8',
        employerName: 'Neha Desai',
        location: 'Andheri West, Mumbai',
        pincode: '400058',
        area: 'Andheri West',
        wage: 800,
        duration: '1 day',
        category: 'Plumbing',
        status: 'open',
        applicants: ['2'],
        jobType: 'contract',
        experienceRequired: '3+ years',
        expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '2',
        title: 'House Cleaning for 2BHK Apartment',
        description: 'Need thorough cleaning of 2BHK apartment. Kitchen, bathrooms, and all rooms. Cleaning supplies provided.',
        employerId: '9',
        employerName: 'Vikram Malhotra',
        location: 'Bandra West, Mumbai',
        pincode: '400050',
        area: 'Bandra West',
        wage: 600,
        duration: '1 day',
        category: 'Cleaning',
        status: 'open',
        applicants: ['3'],
        jobType: 'contract',
        experienceRequired: '2+ years',
        expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '3',
        title: 'Painter Required for Small Shop Repainting',
        description: 'Small retail shop needs fresh coat of paint. Interior walls only. Paint and materials included.',
        employerId: '8',
        employerName: 'Neha Desai',
        location: 'Powai, Mumbai',
        pincode: '400076',
        area: 'Powai',
        wage: 1000,
        duration: '2 days',
        category: 'Painting',
        status: 'open',
        applicants: ['4'],
        jobType: 'contract',
        experienceRequired: '5+ years',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '4',
        title: 'Delivery Helper for 2 Days',
        description: 'Need helper for furniture delivery across Mumbai. Must be able to lift heavy items. Vehicle provided.',
        employerId: '10',
        employerName: 'Anjali Reddy',
        location: 'Multiple locations, Mumbai',
        pincode: '400058',
        area: 'Andheri West',
        wage: 700,
        duration: '2 days',
        category: 'Delivery',
        status: 'open',
        applicants: ['7'],
        jobType: 'part-time',
        experienceRequired: '1+ years',
        expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '5',
        title: 'Electrician for Fan and Switch Repair',
        description: 'Need electrician to fix ceiling fans and replace faulty switches in 3BHK apartment.',
        employerId: '9',
        employerName: 'Vikram Malhotra',
        location: 'Bandra West, Mumbai',
        pincode: '400050',
        area: 'Bandra West',
        wage: 900,
        duration: '1 day',
        category: 'Electrical',
        status: 'open',
        applicants: ['5'],
        jobType: 'contract',
        experienceRequired: '5+ years',
        expiresAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '6',
        title: 'Carpenter for Furniture Repair',
        description: 'Wardrobe door broken and kitchen cabinet needs fixing. Carpenter with own tools required.',
        employerId: '8',
        employerName: 'Neha Desai',
        location: 'Goregaon East, Mumbai',
        pincode: '400063',
        area: 'Goregaon East',
        wage: 850,
        duration: '1 day',
        category: 'Carpentry',
        status: 'open',
        applicants: ['6'],
        jobType: 'contract',
        experienceRequired: '4+ years',
        expiresAt: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '7',
        title: 'Construction Labor - Urgent',
        description: 'Need 3 laborers for construction site. Heavy lifting involved. Daily wage basis for 10 days.',
        employerId: '8',
        employerName: 'Neha Desai',
        location: 'Thane West, Mumbai',
        pincode: '400601',
        area: 'Thane West',
        wage: 750,
        duration: '10 days',
        category: 'Construction',
        status: 'open',
        applicants: [],
        jobType: 'full-time',
        experienceRequired: '1+ years',
        expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '8',
        title: 'Daily Maid for House Work',
        description: 'Looking for reliable maid for daily housework. Timing: 8 AM to 11 AM. Cleaning, dishes, and laundry.',
        employerId: '9',
        employerName: 'Vikram Malhotra',
        location: 'Kurla West, Mumbai',
        pincode: '400070',
        area: 'Kurla West',
        wage: 500,
        duration: 'Daily (Monthly)',
        category: 'Cleaning',
        status: 'open',
        applicants: ['3'],
        jobType: 'part-time',
        experienceRequired: '2+ years',
        expiresAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '9',
        title: 'Electrician for Office Wiring Setup',
        description: 'New office setup needs complete electrical wiring. All materials provided. Expert electrician required.',
        employerId: '10',
        employerName: 'Anjali Reddy',
        location: 'Powai, Mumbai',
        pincode: '400076',
        area: 'Powai',
        wage: 1200,
        duration: '3 days',
        category: 'Electrical',
        status: 'open',
        applicants: ['5'],
        jobType: 'contract',
        experienceRequired: '7+ years',
        expiresAt: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '10',
        title: 'Package Delivery - Part Time',
        description: 'Need delivery person for evening package delivery. Own two-wheeler required. Fuel reimbursed.',
        employerId: '10',
        employerName: 'Anjali Reddy',
        location: 'Multiple areas, Mumbai',
        pincode: '400058',
        area: 'Andheri West',
        wage: 600,
        duration: '15 days',
        category: 'Delivery',
        status: 'open',
        applicants: ['7'],
        jobType: 'part-time',
        experienceRequired: '1+ years',
        expiresAt: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];
    localStorage.setItem('bluujobs_jobs', JSON.stringify(sampleJobs));
  }

  if (!localStorage.getItem('bluujobs_applications')) {
    const sampleApplications: Application[] = [
      {
        id: '1',
        jobId: '1',
        workerId: '2',
        workerName: 'Rajesh Kumar',
        status: 'pending',
        appliedAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '2',
        jobId: '2',
        workerId: '3',
        workerName: 'Priya Sharma',
        status: 'accepted',
        appliedAt: new Date(Date.now() - 40 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '3',
        jobId: '3',
        workerId: '4',
        workerName: 'Amit Verma',
        status: 'pending',
        appliedAt: new Date(Date.now() - 60 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '4',
        jobId: '5',
        workerId: '5',
        workerName: 'Suresh Patel',
        status: 'pending',
        appliedAt: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
      },
    ];
    localStorage.setItem('bluujobs_applications', JSON.stringify(sampleApplications));
  }

  if (!localStorage.getItem('bluujobs_notifications')) {
    const sampleNotifications: Notification[] = [
      {
        id: '1',
        userId: '2',
        title: 'Application Received',
        message: 'Your application for "Urgent: Plumber Needed for Pipe Leakage" has been received.',
        type: 'success',
        read: false,
        createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '2',
        userId: '3',
        title: 'Application Accepted!',
        message: 'Congratulations! Your application for "House Cleaning for 2BHK Apartment" has been accepted.',
        type: 'success',
        read: false,
        createdAt: new Date(Date.now() - 40 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '3',
        userId: '8',
        title: 'New Application',
        message: 'Rajesh Kumar applied for your job "Urgent: Plumber Needed for Pipe Leakage".',
        type: 'info',
        read: false,
        createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
      },
    ];
    localStorage.setItem('bluujobs_notifications', JSON.stringify(sampleNotifications));
  }

  if (!localStorage.getItem('bluujobs_favorites')) {
    const sampleFavorites: Favorite[] = [
      {
        id: '1',
        userId: '2',
        jobId: '3',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '2',
        userId: '4',
        jobId: '1',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];
    localStorage.setItem('bluujobs_favorites', JSON.stringify(sampleFavorites));
  }

  if (!localStorage.getItem('bluujobs_messages')) {
    const sampleMessages: Message[] = [
      {
        id: '1',
        senderId: '8',
        receiverId: '2',
        senderName: 'Neha Desai',
        content: 'Hi Rajesh, I saw your application for the plumbing job. Are you available tomorrow?',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        read: false,
      },
      {
        id: '2',
        senderId: '2',
        receiverId: '8',
        senderName: 'Rajesh Kumar',
        content: 'Yes, I am available. What time would be convenient?',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        read: true,
      },
    ];
    localStorage.setItem('bluujobs_messages', JSON.stringify(sampleMessages));
  }

  if (!localStorage.getItem('bluujobs_reviews')) {
    const sampleReviews: Review[] = [
      {
        id: '1',
        fromUserId: '8',
        toUserId: '2',
        fromUserName: 'Neha Desai',
        rating: 5,
        comment: 'Excellent work! Very professional and completed the job on time.',
        jobId: '1',
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '2',
        fromUserId: '9',
        toUserId: '3',
        fromUserName: 'Vikram Malhotra',
        rating: 5,
        comment: 'Very thorough cleaning. Highly recommended!',
        jobId: '2',
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '3',
        fromUserId: '8',
        toUserId: '4',
        fromUserName: 'Neha Desai',
        rating: 4,
        comment: 'Good painting work. Job completed as expected.',
        jobId: '3',
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];
    localStorage.setItem('bluujobs_reviews', JSON.stringify(sampleReviews));
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
