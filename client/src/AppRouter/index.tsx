import { Navigate, Route, Routes } from "react-router-dom";
import ApplicationForm from "views/ApplicationForm";

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/resume" replace />} />
    <Route path="/resume" element={<ApplicationForm />} />

    <Route path="/*" element={<Navigate to="/resume" replace />} />
  </Routes>
);

export default AppRouter;
