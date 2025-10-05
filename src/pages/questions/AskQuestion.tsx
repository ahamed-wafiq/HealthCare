import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import PageTransition from '@/components/PageTransition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import AIChat from '@/components/api/AIChat';


const AskQuestion = () => {
  const [question, setQuestion] = useState('');
  const { addQuestion } = useApp();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter your question",
        variant: "destructive",
      });
      return;
    }

    addQuestion(question);
    
    toast({
      title: "Question Submitted",
      description: "A healthcare professional will respond within 24 hours",
    });

    navigate('/questions/list');
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
              <HelpCircle className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Ask a Health Question</h1>
          </div>
          <p className="text-muted-foreground">
            Get professional advice from healthcare experts
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Your Question</CardTitle>
              <CardDescription>
                Describe your health concern in detail
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="question">Question</Label>
                  <Textarea
                    id="question"
                    placeholder="e.g., What are the side effects of this medication? When should I be concerned about this symptom?"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    rows={8}
                    className="resize-none"
                  />
                  <p className="text-sm text-muted-foreground">
                    Be as specific as possible for a more accurate response
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button type="submit" className="flex-1">
                    Submit Question
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => navigate('/questions/list')}
                  >
                    View All
                  </Button>
                </div>
                <AIChat/>
                
              </form>
            </CardContent>
          </Card>
          
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default AskQuestion;
