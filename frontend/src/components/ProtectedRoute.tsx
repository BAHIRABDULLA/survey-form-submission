import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';


interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/admin/login" replace />;
};
export default ProtectedRoute
