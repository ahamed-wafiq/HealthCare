import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bell, Calendar, Clock, ArrowLeft, Trash2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import PageTransition from '@/components/PageTransition';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const ReminderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { reminders, cancelReminder } = useApp();
  const { toast } = useToast();
  
  const reminder = reminders.find(r => r.id === id);

  const handleDelete = () => {
    if (reminder) {
      cancelReminder(reminder.id);
      toast({
        title: "Reminder Deleted",
        description: `Reminder for ${reminder.medication} has been removed`,
      });
      navigate('/reminders/list');
    }
  };

  if (!reminder) {
    return (
      <PageTransition>
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="py-12 text-center">
              <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Reminder Not Found</h3>
              <p className="text-muted-foreground mb-4">
                The reminder you're looking for doesn't exist
              </p>
              <Button asChild>
                <Link to="/reminders/list">View All Reminders</Link>
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
          onClick={() => navigate('/reminders/list')}
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
                <div className="p-3 rounded-lg bg-secondary/10">
                  <Bell className="h-8 w-8 text-secondary" />
                </div>
                <Badge className="bg-secondary text-secondary-foreground text-sm">
                  {reminder.time}
                </Badge>
              </div>
              <CardTitle className="text-3xl mb-2">{reminder.medication}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted">
                  <Calendar className="h-5 w-5 text-secondary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium mb-1">Date Set</p>
                    <p className="text-muted-foreground">{reminder.date}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted">
                  <Clock className="h-5 w-5 text-secondary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium mb-1">Reminder Time</p>
                    <p className="text-muted-foreground">{reminder.time}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold mb-3">Reminder Tips</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span>Take your medication at the same time each day</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span>Keep medications in a visible location</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span>Confirm intake in the medication log</span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-3 pt-4">
                <Button asChild className="flex-1">
                  <Link to="/medications/confirm">Confirm Intake</Link>
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleDelete}
                  className="flex-1"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Reminder
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default ReminderDetail;
