import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Plus, ChevronRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import PageTransition from '@/components/PageTransition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const SymptomList = () => {
  const { symptoms } = useApp();

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold">Symptom History</h1>
            </div>
            <p className="text-muted-foreground">
              Track all your reported symptoms
            </p>
          </div>
          <Button asChild>
            <Link to="/symptoms/add">
              <Plus className="mr-2 h-4 w-4" />
              Add Symptom
            </Link>
          </Button>
        </div>

        {symptoms.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Activity className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Symptoms Reported</h3>
              <p className="text-muted-foreground mb-4">
                Start tracking your symptoms to monitor your health
              </p>
              <Button asChild>
                <Link to="/symptoms/add">Report First Symptom</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {symptoms.map((symptom, index) => (
              <motion.div
                key={symptom.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.01 }}
              >
                <Link to={`/symptoms/${symptom.id}`}>
                  <Card className="cursor-pointer transition-all hover:shadow-card-hover hover:border-primary/20">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <CardTitle className="text-xl">{symptom.symptom}</CardTitle>
                            <Badge variant="secondary">{symptom.duration}</Badge>
                          </div>
                          <CardDescription>
                            Reported on {symptom.date}
                          </CardDescription>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default SymptomList;
