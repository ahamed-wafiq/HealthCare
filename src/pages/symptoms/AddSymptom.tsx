import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import PageTransition from '@/components/PageTransition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const AddSymptom = () => {
  const [symptom, setSymptom] = useState('');
  const [duration, setDuration] = useState('');
  const { addSymptom } = useApp();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!symptom || !duration) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    addSymptom({ symptom, duration });
    
    toast({
      title: "Symptom Reported",
      description: "Your symptom has been recorded successfully",
    });

    navigate('/symptoms/list');
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
            <div className="p-2 rounded-lg bg-primary/10">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Report Symptom</h1>
          </div>
          <p className="text-muted-foreground">
            Document your symptoms to track your health journey
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Symptom Details</CardTitle>
              <CardDescription>
                Please provide information about your symptom
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="symptom">Symptom</Label>
                  <Input
                    id="symptom"
                    placeholder="e.g., Headache, Fever, Cough"
                    value={symptom}
                    onChange={(e) => setSymptom(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    placeholder="e.g., 2 days, 1 week"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>

                <div className="flex gap-3">
                  <Button type="submit" className="flex-1">
                    Submit Report
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => navigate('/symptoms/list')}
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

export default AddSymptom;
