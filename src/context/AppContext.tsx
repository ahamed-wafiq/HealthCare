import { createContext, useContext, useState, ReactNode } from 'react';

export interface Symptom {
  id: string;
  symptom: string;
  duration: string;
  date: string;
}

export interface Reminder {
  id: string;
  medication: string;
  time: string;
  date: string;
}

export interface Appointment {
  id: string;
  date: string;
  time: string;
  type: string;
  createdAt: string;
}

export interface Question {
  id: string;
  question: string;
  answer: string;
  date: string;
}

export interface MedicationLog {
  id: string;
  medication: string;
  date: string;
  time: string;
}

export interface Emergency {
  id: string;
  description: string;
  date: string;
  time: string;
  status: 'pending' | 'resolved';
}

interface AppContextType {
  symptoms: Symptom[];
  addSymptom: (symptom: Omit<Symptom, 'id' | 'date'>) => void;
  
  reminders: Reminder[];
  addReminder: (reminder: Omit<Reminder, 'id' | 'date'>) => void;
  cancelReminder: (id: string) => void;
  
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt'>) => void;
  
  questions: Question[];
  addQuestion: (question: string) => void;
  
  medicationLogs: MedicationLog[];
  addMedicationLog: (medication: string) => void;
  
  emergencies: Emergency[];
  addEmergency: (description: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [medicationLogs, setMedicationLogs] = useState<MedicationLog[]>([]);
  const [emergencies, setEmergencies] = useState<Emergency[]>([]);

  const addSymptom = (symptom: Omit<Symptom, 'id' | 'date'>) => {
    const newSymptom: Symptom = {
      ...symptom,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
    };
    setSymptoms(prev => [newSymptom, ...prev]);
  };

  const addReminder = (reminder: Omit<Reminder, 'id' | 'date'>) => {
    const newReminder: Reminder = {
      ...reminder,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
    };
    setReminders(prev => [newReminder, ...prev]);
  };

  const cancelReminder = (id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  const addAppointment = (appointment: Omit<Appointment, 'id' | 'createdAt'>) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: Date.now().toString(),
      createdAt: new Date().toLocaleDateString(),
    };
    setAppointments(prev => [newAppointment, ...prev]);
  };

  const addQuestion = (question: string) => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      question,
      answer: "Thank you for your question. A healthcare professional will respond within 24 hours.",
      date: new Date().toLocaleDateString(),
    };
    setQuestions(prev => [newQuestion, ...prev]);
  };

  const addMedicationLog = (medication: string) => {
    const now = new Date();
    const newLog: MedicationLog = {
      id: Date.now().toString(),
      medication,
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMedicationLogs(prev => [newLog, ...prev]);
  };

  const addEmergency = (description: string) => {
    const now = new Date();
    const newEmergency: Emergency = {
      id: Date.now().toString(),
      description,
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'pending',
    };
    setEmergencies(prev => [newEmergency, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        symptoms,
        addSymptom,
        reminders,
        addReminder,
        cancelReminder,
        appointments,
        addAppointment,
        questions,
        addQuestion,
        medicationLogs,
        addMedicationLog,
        emergencies,
        addEmergency,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
