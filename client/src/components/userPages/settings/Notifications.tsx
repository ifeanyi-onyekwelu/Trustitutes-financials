import Switch from "@mui/material/Switch";
const label = { inputProps: { "aria-label": "Switch demo" } };

const Notifications = () => {
    const notifications = [
        {
            title: "New Transfer Alert",
            description: "Receive emails when you receive funds",
            defaultChecked: true,
        },
        {
            title: "New Login Alert",
            description:
                "Receive emails when a login is detected in your account",
            defaultChecked: true,
        },
        {
            title: "Push Notifications",
            description:
                "Receive instant push notifications for all alerts and updates",
            defaultChecked: false,
        },
    ];

    return (
        <div className="text-white w-full">
            <h3 className="text-3xl">Notification</h3>
            <p>Select your preference by notification type</p>

            {notifications.map((notification, index) => (
                <div
                    key={index}
                    className="flex flex-row justify-between space-x-1 items-center my-8"
                >
                    <div>
                        <h4 className="text-md font-semibold">
                            {notification.title}
                        </h4>
                        <p className="text-sm">{notification.description}</p>
                    </div>
                    <Switch
                        {...label}
                        defaultChecked={notification.defaultChecked}
                    />
                </div>
            ))}
        </div>
    );
};

export default Notifications;
