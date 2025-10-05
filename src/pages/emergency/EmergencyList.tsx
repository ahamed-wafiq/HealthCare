import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, Plus, ChevronRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import PageTransition from '@/components/PageTransition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const EmergencyList = () => {
  const { emergencies } = useApp();

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-destructive/10">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
              <h1 className="text-3xl font-bold">Emergency Requests</h1>
            </div>
            <p className="text-muted-foreground">
              View your emergency request history
            </p>
          </div>
          <Button asChild variant="destructive">
            <Link to="/emergency/request">
              <Plus className="mr-2 h-4 w-4" />
              New Request
            </Link>
          </Button>
        </div>

        {emergencies.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Emergency Requests</h3>
              <p className="text-muted-foreground mb-4">
                Your emergency request history will appear here
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {emergencies.map((emergency, index) => (
              <motion.div
                key={emergency.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.01 }}
              >
                <Link to={`/emergency/${emergency.id}`}>
                  <Card className="cursor-pointer transition-all hover:shadow-card-hover hover:border-destructive/20">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <Badge 
                              variant={emergency.status === 'pending' ? 'destructive' : 'secondary'}
                            >
                              {emergency.status === 'pending' ? 'Pending' : 'Resolved'}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {emergency.date} at {emergency.time}
                            </span>
                          </div>
                          <CardTitle className="text-lg mb-2 line-clamp-2">
                            Emergency Request
                          </CardTitle>
                          <CardDescription className="line-clamp-1">
                            {emergency.description}
                          </CardDescription>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0 ml-2" />
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

export default EmergencyList;
