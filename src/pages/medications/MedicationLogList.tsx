import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Pill, Plus, ChevronRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import PageTransition from '@/components/PageTransition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const MedicationLogList = () => {
  const { medicationLogs } = useApp();

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-success/10">
                <Pill className="h-6 w-6 text-success" />
              </div>
              <h1 className="text-3xl font-bold">Medication Log</h1>
            </div>
            <p className="text-muted-foreground">
              Track your medication adherence history
            </p>
          </div>
          <Button asChild className="bg-success hover:bg-success/90">
            <Link to="/medications/confirm">
              <Plus className="mr-2 h-4 w-4" />
              Confirm Intake
            </Link>
          </Button>
        </div>

        {medicationLogs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Pill className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Medications Logged</h3>
              <p className="text-muted-foreground mb-4">
                Start tracking your medication intake
              </p>
              <Button asChild className="bg-success hover:bg-success/90">
                <Link to="/medications/confirm">Log First Medication</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {medicationLogs.map((log, index) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.01 }}
              >
                <Link to={`/medications/${log.id}`}>
                  <Card className="cursor-pointer transition-all hover:shadow-card-hover hover:border-success/20">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <CardTitle className="text-xl">{log.medication}</CardTitle>
                            <Badge className="bg-success text-success-foreground">
                              Taken
                            </Badge>
                          </div>
                          <CardDescription>
                            {log.date} at {log.time}
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

export default MedicationLogList;
