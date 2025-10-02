import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, Calendar, Clock, ArrowLeft, FileText } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import PageTransition from '@/components/PageTransition';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const EmergencyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { emergencies } = useApp();
  
  const emergency = emergencies.find(e => e.id === id);

  if (!emergency) {
    return (
      <PageTransition>
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="py-12 text-center">
              <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Request Not Found</h3>
              <p className="text-muted-foreground mb-4">
                The emergency request you're looking for doesn't exist
              </p>
              <Button asChild>
                <Link to="/emergency/list">View All Requests</Link>
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
          onClick={() => navigate('/emergency/list')}
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
                <div className="p-3 rounded-lg bg-destructive/10">
                  <AlertCircle className="h-8 w-8 text-destructive" />
                </div>
                <Badge 
                  variant={emergency.status === 'pending' ? 'destructive' : 'secondary'}
                  className="text-sm"
                >
                  {emergency.status === 'pending' ? 'Pending Response' : 'Resolved'}
                </Badge>
              </div>
              <CardTitle className="text-3xl mb-2">Emergency Request</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted">
                  <Calendar className="h-5 w-5 text-destructive mt-0.5" />
                  <div>
                    <p className="text-sm font-medium mb-1">Date</p>
                    <p className="text-muted-foreground">{emergency.date}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted">
                  <Clock className="h-5 w-5 text-destructive mt-0.5" />
                  <div>
                    <p className="text-sm font-medium mb-1">Time</p>
                    <p className="text-muted-foreground">{emergency.time}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-muted">
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-destructive mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-2">Description</p>
                    <p className="text-muted-foreground leading-relaxed">
                      {emergency.description}
                    </p>
                  </div>
                </div>
              </div>

              {emergency.status === 'pending' && (
                <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                    <p className="font-medium text-destructive">Awaiting Response</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your emergency request has been received. A healthcare professional will contact you shortly.
                  </p>
                </div>
              )}

              <div className="border-t pt-6">
                <h3 className="font-semibold mb-3">What to Do While Waiting</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-1">•</span>
                    <span>Stay in a safe location</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-1">•</span>
                    <span>Keep your phone nearby and charged</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-1">•</span>
                    <span>If situation worsens, call 911 immediately</span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-3 pt-4">
                <Button asChild variant="destructive" className="flex-1">
                  <a href="tel:911">Call 911</a>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link to="/symptoms/add">Report Symptom</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default EmergencyDetail;
