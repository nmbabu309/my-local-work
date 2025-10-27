import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Briefcase, LogOut, User, Bell, Heart, MessageSquare, LayoutDashboard, Briefcase as BriefcaseIcon } from 'lucide-react';
import { getCurrentUser, logout, getNotifications } from '@/lib/storage';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import ThemeToggle from '@/components/ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    
    if (user) {
      const notifications = getNotifications(user.id);
      const unread = notifications.filter(n => !n.read).length;
      setUnreadNotifications(unread);
    }
  }, [location]);

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <nav className="border-b bg-card sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-primary">BluuJobs</span>
          </Link>

          <div className="flex items-center gap-2">
            {currentUser ? (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm" className="hidden md:inline-flex">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="hidden md:inline-flex">
                      <BriefcaseIcon className="h-4 w-4 mr-2" />
                      Jobs
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-card">
                    <DropdownMenuItem asChild>
                      <Link to="/jobs" className="cursor-pointer w-full">Browse Jobs</Link>
                    </DropdownMenuItem>
                    {currentUser.userType === 'employer' && (
                      <DropdownMenuItem asChild>
                        <Link to="/post-job" className="cursor-pointer w-full">Post Job</Link>
                      </DropdownMenuItem>
                    )}
                    {currentUser.userType === 'worker' && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link to="/applied-jobs" className="cursor-pointer w-full">My Applications</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/favorites" className="cursor-pointer w-full">Favorites</Link>
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Link to="/messages">
                  <Button variant="ghost" size="icon">
                    <MessageSquare className="h-5 w-5" />
                  </Button>
                </Link>

                <Link to="/favorites">
                  <Button variant="ghost" size="icon" className="hidden md:inline-flex">
                    <Heart className="h-5 w-5" />
                  </Button>
                </Link>

                <Link to="/notifications">
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadNotifications > 0 && (
                      <Badge 
                        variant="destructive" 
                        className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                      >
                        {unreadNotifications}
                      </Badge>
                    )}
                  </Button>
                </Link>

                {currentUser.userType === 'admin' && (
                  <Link to="/admin">
                    <Button variant="ghost" size="sm" className="hidden md:inline-flex">
                      Admin
                    </Button>
                  </Link>
                )}

                <ThemeToggle />

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-card">
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer w-full">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/edit-profile" className="cursor-pointer w-full">Edit Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <ThemeToggle />
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Register</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
