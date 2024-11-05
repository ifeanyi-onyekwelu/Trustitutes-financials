import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useLocation, useNavigate } from "react-router-dom";
import { useFetchUserAccountQuery } from "../../features/user/userApiSlice";
import { IoHome, IoWalletSharp } from "react-icons/io5";
import { AiFillCreditCard } from "react-icons/ai";
import { VscHistory } from "react-icons/vsc";
import formatAmount from "../../config/formatAmount";
import Logo from "../../assets/img/logo.png";

const SideBarDrawer = ({ open, toggleDrawer }: any) => {
    const location = useLocation();

    const { data: accountData } = useFetchUserAccountQuery("userAccount");
    const account = accountData?.account || {};

    const navigate = useNavigate();

    const menuItems = [
        {
            to: "/user/dashboard",
            label: "Dashboard",
            icon: <IoHome className="w-5 h-5" />,
        },
        {
            to: "transfer",
            label: "Send Money",
            icon: <IoWalletSharp className="w-5 h-5" />,
        },
        {
            to: "card/virtual/add",
            label: "Virtual Cards",
            icon: <AiFillCreditCard className="w-5 h-5" />,
        },
        {
            to: "transactions",
            label: "Transaction History",
            icon: <VscHistory className="w-5 h-5" />,
        },
    ];

    const DrawerList = (
        <Box
            sx={{
                width: 250,
                bgcolor: "#0A0F2C",
                height: "100vh",
                color: "#fff",
            }}
            role="presentation"
            onClick={toggleDrawer(false)}
        >
            <div className="border-b border-gray-700 p-5 mb-10 flex items-center justify-center">
                <img src={Logo} alt="Logo" width={100} />
            </div>

            <div className="p-4 space-y-1 mb-5">
                <h3 className="uppercase text-white font-black text-sm">
                    Available balance
                </h3>
                <div className="flex justify-between">
                    <h1 className="text-3xl text-blue-500">
                        <span className="font-extrabold">
                            {formatAmount(account.balance)}
                        </span>{" "}
                        USD
                    </h1>
                </div>
                <p className="text-gray-300">
                    <span className="font-extrabold">
                        {formatAmount(account.balance)}
                    </span>{" "}
                    USD
                </p>
            </div>
            <Divider />
            <List>
                {menuItems.map(({ to, label, icon }, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton onClick={() => navigate(to)}>
                            <ListItemIcon sx={{ color: "#fff" }}>
                                {icon}
                            </ListItemIcon>
                            <ListItemText primary={label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
};

export default SideBarDrawer;
