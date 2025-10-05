import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Bell, 
  Calendar, 
  HelpCircle, 
  Pill, 
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const features = [
  {
    title: 'Report Symptoms',
    description: 'Track and report your symptoms with duration details',
    icon: Activity,
    path: '/symptoms/add',
    color: 'text-primary',
  },
  {
    title: 'Medication Reminders',
    description: 'Set and manage medication reminders',
    icon: Bell,
    path: '/reminders/add',
    color: 'text-secondary',
  },
  {
    title: 'Book Appointments',
    description: 'Schedule appointments with healthcare providers',
    icon: Calendar,
    path: '/appointments/add',
    color: 'text-accent',
  },
  {
    title: 'Ask Questions',
    description: 'Get answers to your health-related questions',
    icon: HelpCircle,
    path: '/questions/ask',
    color: 'text-primary',
  },
  {
    title: 'Medication Log',
    description: 'Confirm and track your medication intake',
    icon: Pill,
    path: '/medications/confirm',
    color: 'text-success',
  },
  {
    title: 'Emergency Help',
    description: 'Request immediate assistance in emergencies',
    icon: AlertCircle,
    path: '/emergency/request',
    color: 'text-destructive',
  },
];

const Home = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(var(--gradient-hero))] opacity-10" />
          <div className="container mx-auto px-4 py-16 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Your Virtual Nursing Assistant
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Comprehensive healthcare management at your fingertips. Track symptoms, manage medications, 
                and stay connected with your health journey.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg" className="text-base">
                  <Link to="/symptoms/add">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-base">
                  <Link to="/emergency/request">
                    <AlertCircle className="mr-2 h-5 w-5" />
                    Emergency Help
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="container mx-auto px-4 py-16">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-center mb-12"
          >
            What Would You Like to Do?
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                >
                  <Link to={feature.path}>
                    <Card className="h-full cursor-pointer transition-all hover:shadow-card-hover border-2 hover:border-primary/20">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <div className={`p-3 rounded-lg bg-muted ${feature.color}`}>
                            <Icon className="h-6 w-6" />
                          </div>
                          <ArrowRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                        <CardDescription className="text-base">
                          {feature.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Quick Stats or Info Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="bg-card rounded-2xl p-8 shadow-card">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="text-4xl font-bold text-primary mb-2">24/7</h3>
                <p className="text-muted-foreground">Available Anytime</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-secondary mb-2">100%</h3>
                <p className="text-muted-foreground">Secure & Private</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-accent mb-2">Easy</h3>
                <p className="text-muted-foreground">Simple to Use</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Home;
