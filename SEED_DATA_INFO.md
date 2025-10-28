# BluuJobs Seed Data Documentation

## Overview
BluuJobs comes pre-populated with realistic sample data to demonstrate all features of the platform. This document explains the seed data structure, default accounts, and how the initialization works.

---

## 🔐 Default Login Credentials

### Admin Account
- **Email:** admin@bluujobs.com
- **Password:** admin123
- **Access:** Full access to admin dashboard, user management, job management, and analytics

### Sample Employers (3)
1. **Neha Desai** (Desai Constructions)
   - Email: neha@example.com
   - Password: employer123
   - Location: Andheri West, Mumbai (400058)
   - Rating: 4.4/5 (18 ratings)

2. **Vikram Malhotra** (HomeCare Services)
   - Email: vikram@example.com
   - Password: employer123
   - Location: Bandra West, Mumbai (400050)
   - Rating: 4.6/5 (24 ratings)

3. **Anjali Reddy** (Quick Delivery Hub)
   - Email: anjali@example.com
   - Password: employer123
   - Location: Powai, Mumbai (400076)
   - Rating: 4.5/5 (21 ratings)

### Sample Workers (6)
1. **Rajesh Kumar** - Plumber
   - Email: rajesh@example.com
   - Password: worker123
   - Skills: Plumbing, Pipe Fitting, Bathroom Repair
   - Experience: 8 years
   - Location: Andheri West, Mumbai (400058)
   - Rating: 4.7/5 (45 ratings)

2. **Priya Sharma** - House Cleaning
   - Email: priya@example.com
   - Password: worker123
   - Skills: House Cleaning, Kitchen Work, Laundry
   - Experience: 5 years
   - Location: Bandra West, Mumbai (400050)
   - Rating: 4.9/5 (67 ratings)

3. **Amit Verma** - Painter
   - Email: amit@example.com
   - Password: worker123
   - Skills: Painting, Wall Texturing, Waterproofing
   - Experience: 6 years
   - Location: Powai, Mumbai (400076)
   - Rating: 4.5/5 (38 ratings)

4. **Suresh Patel** - Electrician
   - Email: suresh@example.com
   - Password: worker123
   - Skills: Electrical Work, Wiring, Appliance Repair
   - Experience: 10 years
   - Location: Thane West, Mumbai (400601)
   - Rating: 4.8/5 (52 ratings)

5. **Deepak Singh** - Carpenter
   - Email: deepak@example.com
   - Password: worker123
   - Skills: Carpentry, Furniture Making, Wood Work
   - Experience: 7 years
   - Location: Goregaon East, Mumbai (400063)
   - Rating: 4.6/5 (41 ratings)

6. **Ramesh Yadav** - Delivery
   - Email: ramesh@example.com
   - Password: worker123
   - Skills: Delivery, Loading, Transportation
   - Experience: 3 years
   - Location: Kurla West, Mumbai (400070)
   - Rating: 4.3/5 (29 ratings)

---

## 💼 Sample Jobs (10)

### Urgent Jobs
1. **Urgent: Plumber Needed for Pipe Leakage**
   - Wage: ₹800/day
   - Duration: 1 day
   - Category: Plumbing
   - Experience Required: 3+ years
   - Expires in: 2 days
   - Has 1 applicant

2. **Construction Labor - Urgent**
   - Wage: ₹750/day
   - Duration: 10 days
   - Category: Construction
   - Job Type: Full-time
   - Experience Required: 1+ years
   - Expires in: 2 days

### Regular Jobs
3. **House Cleaning for 2BHK Apartment**
   - Wage: ₹600/day
   - Duration: 1 day
   - Category: Cleaning
   - Status: Application Accepted

4. **Painter Required for Small Shop Repainting**
   - Wage: ₹1000/day
   - Duration: 2 days
   - Category: Painting

5. **Delivery Helper for 2 Days**
   - Wage: ₹700/day
   - Duration: 2 days
   - Category: Delivery
   - Job Type: Part-time

6. **Electrician for Fan and Switch Repair**
   - Wage: ₹900/day
   - Duration: 1 day
   - Category: Electrical

7. **Carpenter for Furniture Repair**
   - Wage: ₹850/day
   - Duration: 1 day
   - Category: Carpentry

8. **Daily Maid for House Work**
   - Wage: ₹500/day
   - Duration: Daily (Monthly)
   - Category: Cleaning
   - Job Type: Part-time

9. **Electrician for Office Wiring Setup**
   - Wage: ₹1200/day
   - Duration: 3 days
   - Category: Electrical
   - Experience Required: 7+ years

10. **Package Delivery - Part Time**
    - Wage: ₹600/day
    - Duration: 15 days
    - Category: Delivery
    - Job Type: Part-time

---

## 📊 Additional Sample Data

### Applications (4)
- Rajesh Kumar applied for "Urgent: Plumber Needed" (Pending)
- Priya Sharma applied for "House Cleaning for 2BHK" (Accepted)
- Amit Verma applied for "Painter Required" (Pending)
- Suresh Patel applied for "Electrician for Fan Repair" (Pending)

### Notifications (3)
- Application received notifications for workers
- Application accepted notification for Priya
- New application notification for employer Neha

### Messages (2)
- Conversation between Neha Desai and Rajesh Kumar about plumbing job

### Reviews (3)
- 5-star review for Rajesh Kumar from Neha Desai
- 5-star review for Priya Sharma from Vikram Malhotra
- 4-star review for Amit Verma from Neha Desai

### Favorites (2)
- Rajesh saved "Painter Required for Small Shop"
- Amit saved "Urgent: Plumber Needed"

---

## 🔄 How Seed Initialization Works

### Automatic Initialization
The `initializeData()` function runs automatically when:
- The app loads for the first time
- localStorage is empty (no existing data)
- It checks for the presence of `bluujobs_users` key

### One-Time Load
```javascript
if (!localStorage.getItem('bluujobs_users')) {
  // Initialize all sample data
}
```
Data is loaded **only once** and persists across page refreshes.

### Data Persistence
All data is stored in browser's localStorage with keys:
- `bluujobs_users` - User accounts
- `bluujobs_jobs` - Job postings
- `bluujobs_applications` - Job applications
- `bluujobs_notifications` - User notifications
- `bluujobs_favorites` - Saved jobs
- `bluujobs_messages` - User messages
- `bluujobs_reviews` - User ratings and reviews
- `bluujobs_current_user` - Active session

---

## 🛠 Manual Data Reset (Admin Only)

### Reset Demo Data Button
Located in the Admin Dashboard, this feature allows complete data reset:

**How it works:**
1. Admin clicks "Reset Demo Data" button
2. Confirmation dialog appears with warning
3. Upon confirmation:
   - All localStorage data is cleared
   - Fresh seed data is reloaded
   - Admin is logged out
   - Redirected to login page

**Use Cases:**
- Testing from scratch
- Corrupted data recovery
- Demonstration resets
- Development testing

---

## 🎯 Data Distribution

### Users
- 1 Admin
- 3 Employers with realistic company profiles
- 6 Workers with diverse skills across categories

### Job Categories
- Plumbing (1)
- Cleaning (2)
- Painting (1)
- Delivery (2)
- Electrical (2)
- Carpentry (1)
- Construction (1)

### Job Types
- Full-time (1)
- Part-time (3)
- Contract (6)

### Location Distribution
All jobs and users are distributed across Mumbai:
- Andheri West (400058)
- Bandra West (400050)
- Powai (400076)
- Thane West (400601)
- Goregaon East (400063)
- Kurla West (400070)

---

## 📝 Notes

### For Developers
- All user passwords are stored as plain text (demo only - not production ready)
- User IDs are simple numeric strings ('1', '2', etc.)
- Timestamps use ISO 8601 format
- All wages are in Indian Rupees (₹)
- Phone numbers use Indian format (+91 prefix)

### For Testing
- Use quick login buttons on login page for instant access
- Admin account has full privileges
- Worker accounts have diverse skill sets for testing filters
- Jobs have varying expiry dates to test time-based features
- Some applications are pre-accepted for testing review system

### Data Relationships
- Jobs link to employers via `employerId`
- Applications link to both jobs and workers
- Reviews link to users via `fromUserId` and `toUserId`
- Messages link to senders and receivers
- Favorites link users to jobs

---

## 🚀 Quick Start

1. **First Login:** Use any demo account from the quick login buttons
2. **Explore Features:** Each user type has different capabilities
3. **Test Workflow:** 
   - Worker: Browse jobs → Apply → Check notifications
   - Employer: Post job → Review applications → Accept/Reject
   - Admin: View analytics → Manage users/jobs → Reset data

---

## ⚠️ Important

- **Local Storage Only:** All data stored in browser localStorage
- **No Backend:** This is a client-side demo application
- **No Production Use:** Not suitable for production deployment
- **Data Privacy:** Data cleared when browser cache is cleared
- **Testing Purpose:** Designed for demonstration and testing only
