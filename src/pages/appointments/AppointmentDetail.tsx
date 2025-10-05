import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, FileText, ArrowLeft, MapPin } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import PageTransition from '@/components/PageTransition';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const AppointmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { appointments } = useApp();
  
  const appointment = appointments.find(a => a.id === id);

  if (!appointment) {
    return (
      <PageTransition>
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="py-12 text-center">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Appointment Not Found</h3>
              <p className="text-muted-foreground mb-4">
                The appointment you're looking for doesn't exist
              </p>
              <Button asChild>
                <Link to="/appointments/list">View All Appointments</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate('/appointments/list')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to List
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-accent/10">
                  <Calendar className="h-8 w-8 text-accent" />
                </div>
                <Badge variant="outline" className="text-sm">
                  Scheduled
                </Badge>
              </div>
              <CardTitle className="text-3xl mb-2">{appointment.type}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted">
                  <Calendar className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <p className="text-sm font-medium mb-1">Date</p>
                    <p className="text-muted-foreground">{appointment.date}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted">
                  <Clock className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <p className="text-sm font-medium mb-1">Time</p>
                    <p className="text-muted-foreground">{appointment.time}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-muted">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <p className="text-sm font-medium mb-1">Location</p>
                    <p className="text-muted-foreground">
                      Healthcare Center, Main Building<br />
                      123 Medical Plaza, Suite 100
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold mb-3">Preparation Tips</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Arrive 15 minutes early for check-in</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Bring your insurance card and ID</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>List any symptoms or questions you have</span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-3 pt-4">
                <Button asChild className="flex-1">
                  <Link to="/symptoms/add">
                    <FileText className="mr-2 h-4 w-4" />
                    Report Symptom
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link to="/questions/ask">Ask Question</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default AppointmentDetail;
