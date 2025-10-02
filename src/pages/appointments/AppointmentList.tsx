import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Plus, ChevronRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import PageTransition from '@/components/PageTransition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const AppointmentList = () => {
  const { appointments } = useApp();

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-accent/10">
                <Calendar className="h-6 w-6 text-accent" />
              </div>
              <h1 className="text-3xl font-bold">Your Appointments</h1>
            </div>
            <p className="text-muted-foreground">
              View and manage your scheduled visits
            </p>
          </div>
          <Button asChild>
            <Link to="/appointments/add">
              <Plus className="mr-2 h-4 w-4" />
              Book Appointment
            </Link>
          </Button>
        </div>

        {appointments.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Appointments Scheduled</h3>
              <p className="text-muted-foreground mb-4">
                Book your first appointment to get started
              </p>
              <Button asChild>
                <Link to="/appointments/add">Book First Appointment</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {appointments.map((appointment, index) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.01 }}
              >
                <Link to={`/appointments/${appointment.id}`}>
                  <Card className="cursor-pointer transition-all hover:shadow-card-hover hover:border-accent/20">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <CardTitle className="text-xl">{appointment.type}</CardTitle>
                            <Badge variant="outline">{appointment.date}</Badge>
                            <Badge className="bg-accent text-accent-foreground">
                              {appointment.time}
                            </Badge>
                          </div>
                          <CardDescription>
                            Booked on {appointment.createdAt}
                          </CardDescription>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default AppointmentList;
