import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import Navbar from "@/components/Navbar";

// Pages
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

// Symptoms
import AddSymptom from "./pages/symptoms/AddSymptom";
import SymptomList from "./pages/symptoms/SymptomList";
import SymptomDetail from "./pages/symptoms/SymptomDetail";

// Reminders
import AddReminder from "./pages/reminders/AddReminder";
import ReminderList from "./pages/reminders/ReminderList";
import ReminderDetail from "./pages/reminders/ReminderDetail";

// Appointments
import AddAppointment from "./pages/appointments/AddAppointment";
import AppointmentList from "./pages/appointments/AppointmentList";
import AppointmentDetail from "./pages/appointments/AppointmentDetail";

// Questions
import AskQuestion from "./pages/questions/AskQuestion";
import QuestionList from "./pages/questions/QuestionList";
import QuestionDetail from "./pages/questions/QuestionDetail";

// Medications
import ConfirmMedication from "./pages/medications/ConfirmMedication";
import MedicationLogList from "./pages/medications/MedicationLogList";
import MedicationLogDetail from "./pages/medications/MedicationLogDetail";

// Emergency
import EmergencyRequest from "./pages/emergency/EmergencyRequest";
import EmergencyList from "./pages/emergency/EmergencyList";
import EmergencyDetail from "./pages/emergency/EmergencyDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              
              {/* Symptoms Routes */}
              <Route path="/symptoms" element={<SymptomList />} />
              <Route path="/symptoms/add" element={<AddSymptom />} />
              <Route path="/symptoms/list" element={<SymptomList />} />
              <Route path="/symptoms/:id" element={<SymptomDetail />} />
              
              {/* Reminders Routes */}
              <Route path="/reminders" element={<ReminderList />} />
              <Route path="/reminders/add" element={<AddReminder />} />
              <Route path="/reminders/list" element={<ReminderList />} />
              <Route path="/reminders/:id" element={<ReminderDetail />} />
              
              {/* Appointments Routes */}
              <Route path="/appointments" element={<AppointmentList />} />
              <Route path="/appointments/add" element={<AddAppointment />} />
              <Route path="/appointments/list" element={<AppointmentList />} />
              <Route path="/appointments/:id" element={<AppointmentDetail />} />
              
              {/* Questions Routes */}
              <Route path="/questions" element={<QuestionList />} />
              <Route path="/questions/ask" element={<AskQuestion />} />
              <Route path="/questions/list" element={<QuestionList />} />
              <Route path="/questions/:id" element={<QuestionDetail />} />
              
              {/* Medications Routes */}
              <Route path="/medications" element={<MedicationLogList />} />
              <Route path="/medications/confirm" element={<ConfirmMedication />} />
              <Route path="/medications/log" element={<MedicationLogList />} />
              <Route path="/medications/:id" element={<MedicationLogDetail />} />
              
              {/* Emergency Routes */}
              <Route path="/emergency" element={<EmergencyRequest />} />
              <Route path="/emergency/request" element={<EmergencyRequest />} />
              <Route path="/emergency/list" element={<EmergencyList />} />
              <Route path="/emergency/:id" element={<EmergencyDetail />} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
