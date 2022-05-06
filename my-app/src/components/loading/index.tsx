import { Backdrop, CircularProgress } from "@mui/material";
import { useAppSelector } from "stores/hooks";

const LoadingComp = () => {
    const loading = useAppSelector(state => state.action.loading);
    
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1111 }} open={loading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingComp;