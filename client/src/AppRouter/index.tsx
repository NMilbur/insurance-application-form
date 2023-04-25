import { Route, Routes } from "react-router-dom";
import ApplicationForm from "views/ApplicationForm";

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<ApplicationForm />} />
    <Route path="/resume" element={<ApplicationForm />} />
  </Routes>
);

export default AppRouter;
