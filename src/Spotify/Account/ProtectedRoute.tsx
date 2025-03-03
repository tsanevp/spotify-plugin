import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: Readonly<{ children: any }>) {
    const { profile } = useSelector((state: any) => state.accountReducer);
    if (profile) {
        return children;
    } else {
        return <Navigate to="/signin" />;
    }
}