import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";

const Login: React.FC = () => {
  return (
    <div>
      <Grid container spacing={2} display="flex" justifyContent="center">
        <Grid item xs={12} sm={6} md={4}></Grid>
        <Divider light orientation="vertical" flexItem />
        <Grid item xs={12} sm={6} md={4}></Grid>
      </Grid>
    </div>
  );
};

export default Login;
