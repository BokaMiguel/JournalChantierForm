import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Form from "./components/journalForm/Form";
import CalendarPage from "./components/calendrier/CalendarPage";
import PlanningForm from "./components/calendrier/PlanningForm";
import Sidebar from "./components/header/Sidebar";
import Footer from "./components/footer/Footer";
import Rapport from "./components/sections/rapport/journal/Rapport";
import Gestion from "./components/sections/gestions/Gestions";
import Callback from "./components/Callback";
import { AuthProvider } from "./context/AuthContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App flex">
          <Sidebar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Form />} />
              <Route path="/:type" element={<Form />} />
              <Route path="/calendrier" element={<CalendarPage />} />
              <Route path="/planning" element={<PlanningForm />} />
              <Route path="/rapport" element={<Rapport />} />
              <Route path="/gestions" element={<Gestion />} />
              <Route path="/callback" element={<Callback />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
