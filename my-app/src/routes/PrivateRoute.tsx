
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'stores/hooks';




const PrivateRoute =  ({ children }: any)=> {
  const user =  useAppSelector(state => state.user);
  
  return  user.uid ? children : <Navigate to="/"/>;
};

export default PrivateRoute;
