import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, Phone } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import PageTransition from '@/components/PageTransition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const EmergencyRequest = () => {
  const [description, setDescription] = useState('');
  const { addEmergency } = useApp();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEmergency = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim()) {
      toast({
        title: "Missing Information",
        description: "Please describe your emergency",
        variant: "destructive",
      });
      return;
    }

    addEmergency(description);
    
    toast({
      title: "Emergency Request Sent",
      description: "Help is on the way. Stay calm and safe.",
      variant: "destructive",
    });

    navigate('/emergency/list');
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-destructive/10 animate-pulse-emergency">
              <AlertCircle className="h-6 w-6 text-destructive" />
            </div>
            <h1 className="text-3xl font-bold text-destructive">Emergency Request</h1>
          </div>
          <p className="text-muted-foreground">
            Request immediate assistance - help will be dispatched
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          {/* Emergency Call Card */}
          <Card className="border-destructive/20 bg-destructive/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-destructive text-destructive-foreground">
                  <Phone className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Life-Threatening Emergency?</h3>
                  <p className="text-sm text-muted-foreground">Call emergency services immediately</p>
                </div>
                <Button 
                  size="lg"
                  variant="destructive"
                  className="animate-pulse-emergency"
                  asChild
                >
                  <a href="tel:911">Call 911</a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Request Form */}
          <Card>
            <CardHeader>
              <CardTitle>Describe Your Emergency</CardTitle>
              <CardDescription>
                Provide details so we can send appropriate help
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEmergency} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="description">What's happening?</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your emergency situation, location, and any immediate needs..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={6}
                    className="resize-none"
                  />
                </div>

                <div className="p-4 rounded-lg bg-muted">
                  <h3 className="text-sm font-medium mb-2">What happens next:</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Your request is sent immediately to on-call staff</li>
                    <li>• You'll receive a confirmation and estimated response time</li>
                    <li>• A healthcare professional will contact you</li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <Button 
                    type="submit" 
                    className="flex-1"
                    variant="destructive"
                    size="lg"
                  >
                    <AlertCircle className="mr-2 h-5 w-5" />
                    Send Emergency Request
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => navigate('/emergency/list')}
                  >
                    View History
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

export default EmergencyRequest;
