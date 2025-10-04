import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Pill, CheckCircle2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import PageTransition from '@/components/PageTransition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const ConfirmMedication = () => {
  const [medication, setMedication] = useState('');
  const { addMedicationLog, reminders } = useApp();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!medication.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter medication name",
        variant: "destructive",
      });
      return;
    }

    addMedicationLog(medication);
    
    toast({
      title: "Medication Confirmed",
      description: `${medication} intake has been logged`,
      className: "bg-success text-success-foreground",
    });

    setMedication('');
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
            <div className="p-2 rounded-lg bg-success/10">
              <Pill className="h-6 w-6 text-success" />
            </div>
            <h1 className="text-3xl font-bold">Confirm Medication</h1>
          </div>
          <p className="text-muted-foreground">
            Log your medication intake to track adherence
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Take Medication</CardTitle>
              <CardDescription>
                Confirm that you've taken your medication
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

                {reminders.length > 0 && (
                  <div className="p-4 rounded-lg bg-muted">
                    <h3 className="text-sm font-medium mb-3">Your Active Reminders:</h3>
                    <div className="space-y-2">
                      {reminders.map((reminder) => (
                        <button
                          key={reminder.id}
                          type="button"
                          onClick={() => setMedication(reminder.medication)}
                          className="w-full text-left p-3 rounded-lg bg-card hover:bg-accent/10 transition-colors flex items-center justify-between"
                        >
                          <span className="font-medium">{reminder.medication}</span>
                          <span className="text-sm text-muted-foreground">{reminder.time}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button type="submit" className="flex-1 bg-success hover:bg-success/90">
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Confirm Intake
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => navigate('/medications/log')}
                  >
                    View Log
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

export default ConfirmMedication;
