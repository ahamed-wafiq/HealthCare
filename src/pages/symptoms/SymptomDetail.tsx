import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Calendar, Clock, ArrowLeft } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import PageTransition from '@/components/PageTransition';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const SymptomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { symptoms } = useApp();
  
  const symptom = symptoms.find(s => s.id === id);

  if (!symptom) {
    return (
      <PageTransition>
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="py-12 text-center">
              <Activity className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Symptom Not Found</h3>
              <p className="text-muted-foreground mb-4">
                The symptom you're looking for doesn't exist
              </p>
              <Button asChild>
                <Link to="/symptoms/list">View All Symptoms</Link>
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
          onClick={() => navigate('/symptoms/list')}
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
                <div className="p-3 rounded-lg bg-primary/10">
                  <Activity className="h-8 w-8 text-primary" />
                </div>
                <Badge variant="secondary" className="text-sm">
                  {symptom.duration}
                </Badge>
              </div>
              <CardTitle className="text-3xl mb-2">{symptom.symptom}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium mb-1">Date Reported</p>
                    <p className="text-muted-foreground">{symptom.date}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium mb-1">Duration</p>
                    <p className="text-muted-foreground">{symptom.duration}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold mb-3">Next Steps</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Monitor your symptoms and note any changes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Consider booking an appointment if symptoms persist</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Keep track of related symptoms</span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-3 pt-4">
                <Button asChild className="flex-1">
                  <Link to="/appointments/add">Book Appointment</Link>
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

export default SymptomDetail;
