import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import { Button } from "@mui/material";
import Verified from "@mui/icons-material/Verified";
import Logout from "@mui/icons-material/Logout";
import { useUser } from "../../context/UserContext";
import { IoFileTray } from "react-icons/io5";

import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../features/auth/authApiSlice";
import { IoMenu } from "react-icons/io5";

function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name: string) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
}

const Navbar = ({ toggleDrawer }: any) => {
    const navigate = useNavigate();
    const userData: any = useUser();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [logout, { isSuccess }] = useLogoutMutation();

    const handleLogout = async () => {
        await logout({});
        navigate("/secure/sign-in");
    };

    return (
        <nav className="bg-deepNavyBlue text-white py-1 px-4 shadow-md border-b border-gray-700">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center md:hidden">
                    <Button onClick={toggleDrawer(true)}>
                        <IoMenu className="text-4xl text-white border border-gray-600 p-1 rounded" />
                    </Button>
                </div>

                <div className="hidden md:flex items-center space-x-1 ml-10">
                    <IoFileTray />
                    <span className="font-medium text-sm">
                        Do you the latest update of Covid 2024?{" "}
                        <span className="text-gray-400">
                            An overview of ours is now available ...
                        </span>
                    </span>
                </div>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        textAlign: "center",
                        marginBottom: "6px",
                    }}
                >
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2, gap: "10px" }}
                            aria-controls={open ? "account-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                        >
                            <Avatar
                                alt="Avatar"
                                src={userData?.user?.profilePicture}
                                sx={{ width: "50px", height: "50px" }}
                            />
                            <div className="flex flex-col text-sm items-start">
                                <span className="text-green-600">
                                    Connected
                                </span>
                                <span className="text-white">
                                    {userData.user.firstName}{" "}
                                    {userData.user.lastName}
                                </span>
                            </div>
                        </IconButton>
                    </Tooltip>
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    slotProps={{
                        paper: {
                            elevation: 0,
                            sx: {
                                overflow: "visible",
                                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                mt: 1.5,
                                "& .MuiAvatar-root": {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                "&::before": {
                                    content: '""',
                                    display: "block",
                                    position: "absolute",
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: "background.paper",
                                    transform: "translateY(-50%) rotate(45deg)",
                                    zIndex: 0,
                                },
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                    <MenuItem onClick={() => navigate("profile")}>
                        <Avatar /> Profile
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => navigate("settings")}>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </div>
        </nav>
    );
};

export default Navbar;
