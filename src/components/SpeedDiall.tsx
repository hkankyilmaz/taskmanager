import * as React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import LogoutIcon from "@mui/icons-material/Logout";

const actions = [{ icon: <LogoutIcon />, name: "LogOut" }];
interface props {
  user: string;
  setUser: (user: string) => void;
  setIsOpenPortal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SpeedDiall: React.FC<props> = ({ setIsOpenPortal, user, setUser }) => {
  return (
    <div style={{ zIndex: "11" }}>
      <p style={{ color: "white", position: "fixed", bottom: 30, right: 100 }}>
        {user}, Welcome !
      </p>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "fixed", bottom: 30, right: 30 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => setIsOpenPortal(true)}
          />
        ))}
      </SpeedDial>
    </div>
  );
};

export default SpeedDiall;
