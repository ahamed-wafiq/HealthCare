import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bell, Plus, ChevronRight, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import PageTransition from '@/components/PageTransition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const ReminderList = () => {
  const { reminders, cancelReminder } = useApp();
  const { toast } = useToast();

  const handleCancel = (id: string, medication: string) => {
    cancelReminder(id);
    toast({
      title: "Reminder Cancelled",
      description: `Reminder for ${medication} has been removed`,
    });
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-secondary/10">
                <Bell className="h-6 w-6 text-secondary" />
              </div>
              <h1 className="text-3xl font-bold">Medication Reminders</h1>
            </div>
            <p className="text-muted-foreground">
              Manage your medication schedule
            </p>
          </div>
          <Button asChild>
            <Link to="/reminders/add">
              <Plus className="mr-2 h-4 w-4" />
              Add Reminder
            </Link>
          </Button>
        </div>

        {reminders.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Reminders Set</h3>
              <p className="text-muted-foreground mb-4">
                Add your first medication reminder to stay on track
              </p>
              <Button asChild>
                <Link to="/reminders/add">Set First Reminder</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {reminders.map((reminder, index) => (
              <motion.div
                key={reminder.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.01 }}
              >
                <Card className="transition-all hover:shadow-card-hover">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Link to={`/reminders/${reminder.id}`} className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-xl">{reminder.medication}</CardTitle>
                          <Badge className="bg-secondary text-secondary-foreground">
                            {reminder.time}
                          </Badge>
                        </div>
                        <CardDescription>
                          Set on {reminder.date}
                        </CardDescription>
                      </Link>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleCancel(reminder.id, reminder.medication)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <X className="h-5 w-5" />
                        </Button>
                        <Link to={`/reminders/${reminder.id}`}>
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </Link>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default ReminderList;
