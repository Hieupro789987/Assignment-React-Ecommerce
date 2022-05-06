import { Navigate } from 'react-router-dom';


const PublicRoute = (props: any) => {
  const { children, isAuth } = props;
  // const user = useStatusAuth();

  // console.log('public: ',user);
  
  return  !true && isAuth ? children : <Navigate to="/" />;
};

export default PublicRoute;
