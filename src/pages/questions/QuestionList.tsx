import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HelpCircle, Plus, ChevronRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import PageTransition from '@/components/PageTransition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const QuestionList = () => {
  const { questions } = useApp();

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <HelpCircle className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold">Your Questions</h1>
            </div>
            <p className="text-muted-foreground">
              View responses from healthcare professionals
            </p>
          </div>
          <Button asChild>
            <Link to="/questions/ask">
              <Plus className="mr-2 h-4 w-4" />
              Ask Question
            </Link>
          </Button>
        </div>

        {questions.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Questions Yet</h3>
              <p className="text-muted-foreground mb-4">
                Ask your first health question to get expert advice
              </p>
              <Button asChild>
                <Link to="/questions/ask">Ask First Question</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {questions.map((question, index) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.01 }}
              >
                <Link to={`/questions/${question.id}`}>
                  <Card className="cursor-pointer transition-all hover:shadow-card-hover hover:border-primary/20">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary">Answered</Badge>
                          </div>
                          <CardTitle className="text-lg mb-2 line-clamp-2">
                            {question.question}
                          </CardTitle>
                          <CardDescription>
                            Asked on {question.date}
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

export default QuestionList;
