import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HelpCircle, Calendar, MessageCircle, ArrowLeft } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import PageTransition from '@/components/PageTransition';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const QuestionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { questions } = useApp();
  
  const question = questions.find(q => q.id === id);

  if (!question) {
    return (
      <PageTransition>
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="py-12 text-center">
              <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Question Not Found</h3>
              <p className="text-muted-foreground mb-4">
                The question you're looking for doesn't exist
              </p>
              <Button asChild>
                <Link to="/questions/list">View All Questions</Link>
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
          onClick={() => navigate('/questions/list')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to List
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Question Card */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <HelpCircle className="h-8 w-8 text-primary" />
                </div>
                <Badge variant="secondary">Your Question</Badge>
              </div>
              <CardTitle className="text-2xl mb-2">Your Question</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed mb-4">{question.question}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Asked on {question.date}</span>
              </div>
            </CardContent>
          </Card>

          {/* Answer Card */}
          <Card className="border-l-4 border-l-secondary">
            <CardHeader>
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-secondary/10">
                  <MessageCircle className="h-8 w-8 text-secondary" />
                </div>
                <Badge className="bg-secondary text-secondary-foreground">Response</Badge>
              </div>
              <CardTitle className="text-2xl mb-2">Healthcare Professional Response</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">{question.answer}</p>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Related Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full justify-start" variant="outline">
                <Link to="/symptoms/add">
                  Report Related Symptom
                </Link>
              </Button>
              <Button asChild className="w-full justify-start" variant="outline">
                <Link to="/appointments/add">
                  Book Appointment
                </Link>
              </Button>
              <Button asChild className="w-full justify-start" variant="outline">
                <Link to="/questions/ask">
                  Ask Another Question
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default QuestionDetail;
