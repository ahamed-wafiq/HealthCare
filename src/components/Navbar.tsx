import { Link, useLocation } from 'react-router-dom';
import {
  Activity,
  Bell,
  Calendar,
  HelpCircle,
  Pill,
  AlertCircle,
  Home
} from 'lucide-react';
import { cn } from '@/lib/utils';


const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Symptoms', path: '/symptoms', icon: Activity },
  { name: 'Reminders', path: '/reminders', icon: Bell },
  { name: 'Appointments', path: '/appointments', icon: Calendar },
  { name: 'Questions', path: '/questions', icon: HelpCircle },
  { name: 'Medications', path: '/medications', icon: Pill },
  { name: 'Emergency', path: '/emergency', icon: AlertCircle },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <Activity className="h-6 w-6 text-primary" />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Virtual Nursing Assistant
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path ||
                (item.path !== '/' && location.pathname.startsWith(item.path));

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile menu - simplified for now */}
          <div className="md:hidden">
            <Link
              to="/emergency"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive text-destructive-foreground font-medium"
            >
              <AlertCircle className="h-4 w-4" />
              <span>Emergency</span>
            </Link>
          </div>
        </div>
      </div>
      <div>
      </div>
    </nav>
  );
};

export default Navbar;
