import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@mui/material/Button';

export const LogoutButton = () => {
  const { logout } = useAuth0();
  //localStorage._deleteLocation()

  return (
    <div className="cerrarsesion">
    <Button variant="contained" onClick={() => logout({ returnTo: window.location.href="http://localhost:3000/" })}>
      Cerrar sesión
    </Button>
    </div>
  );
};