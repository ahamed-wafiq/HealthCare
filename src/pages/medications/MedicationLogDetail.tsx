import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Pill, Calendar, Clock, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import PageTransition from '@/components/PageTransition';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const MedicationLogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { medicationLogs } = useApp();
  
  const log = medicationLogs.find(l => l.id === id);

  if (!log) {
    return (
      <PageTransition>
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="py-12 text-center">
              <Pill className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Log Entry Not Found</h3>
              <p className="text-muted-foreground mb-4">
                The log entry you're looking for doesn't exist
              </p>
              <Button asChild>
                <Link to="/medications/log">View All Logs</Link>
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
          onClick={() => navigate('/medications/log')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Log
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-success/10">
                  <Pill className="h-8 w-8 text-success" />
                </div>
                <Badge className="bg-success text-success-foreground">
                  <CheckCircle2 className="mr-1 h-3 w-3" />
                  Confirmed
                </Badge>
              </div>
              <CardTitle className="text-3xl mb-2">{log.medication}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted">
                  <Calendar className="h-5 w-5 text-success mt-0.5" />
                  <div>
                    <p className="text-sm font-medium mb-1">Date Taken</p>
                    <p className="text-muted-foreground">{log.date}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted">
                  <Clock className="h-5 w-5 text-success mt-0.5" />
                  <div>
                    <p className="text-sm font-medium mb-1">Time Taken</p>
                    <p className="text-muted-foreground">{log.time}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-success/5 border border-success/20">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <p className="font-medium text-success">Successfully Logged</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your medication intake has been recorded. Keep up with your treatment plan!
                </p>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold mb-3">Adherence Tips</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-1">•</span>
                    <span>Take medications at the same time each day</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-1">•</span>
                    <span>Set reminders to avoid missing doses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success mt-1">•</span>
                    <span>Track side effects and report to your doctor</span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-3 pt-4">
                <Button asChild className="flex-1">
                  <Link to="/reminders/add">Set Reminder</Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link to="/medications/confirm">Log Another</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default MedicationLogDetail;
