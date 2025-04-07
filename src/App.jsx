import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {CssBaseline} from "@mui/material";
import DashboardPage from "./pages/dashboard";
import LoginPage from "./pages/login/login";
import {AuthProvider} from "./contexts/auth/AuthProvider.jsx";
import {SnackbarProvider} from 'notistack'

function App() {
  return (
    <AuthProvider>
      <SnackbarProvider
        autoHideDuration={1500}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}>
        <Router>
          <CssBaseline/>
          <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/dashboard" element={<DashboardPage/>}/>
          </Routes>
        </Router>
      </SnackbarProvider>
    </AuthProvider>
  );
}

export default App;
