import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import PageTransition from '@/components/PageTransition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const AddReminder = () => {
  const [medication, setMedication] = useState('');
  const [time, setTime] = useState('');
  const { addReminder } = useApp();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!medication || !time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    addReminder({ medication, time });
    
    toast({
      title: "Reminder Set",
      description: `Reminder set for ${medication} at ${time}`,
    });

    navigate('/reminders/list');
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-secondary/10">
              <Bell className="h-6 w-6 text-secondary" />
            </div>
            <h1 className="text-3xl font-bold">Set Medication Reminder</h1>
          </div>
          <p className="text-muted-foreground">
            Never miss a dose with timely reminders
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Reminder Details</CardTitle>
              <CardDescription>
                Set up your medication schedule
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="medication">Medication Name</Label>
                  <Input
                    id="medication"
                    placeholder="e.g., Aspirin, Ibuprofen"
                    value={medication}
                    onChange={(e) => setMedication(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>

                <div className="flex gap-3">
                  <Button type="submit" className="flex-1">
                    Set Reminder
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => navigate('/reminders/list')}
                  >
                    View All
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default AddReminder;
