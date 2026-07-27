import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/dashboard/Dashboard";
import Calendar from "../pages/calendar/Calendar";
import Tasks from "../pages/tasks/Tasks";
import Goals from "../pages/goals/Goals";
import Finance from "../pages/finance/Finance";
import Health from "../pages/health/Health";
import Notes from "../pages/notes/Notes";
import Meetings from "../pages/meetings/Meetings";
import Settings from "../pages/settings/Settings";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/health" element={<Health />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/meetings" element={<Meetings />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;