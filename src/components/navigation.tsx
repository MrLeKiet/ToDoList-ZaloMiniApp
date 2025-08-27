import { BottomNavigation, Icon, useLocation } from "zmp-ui";
import { useViewTransition } from "@/utils/view-transition";

export const NavigationContent = () => {
    const location = useLocation();
    const startViewTransition = useViewTransition();

    const getActiveKey = (path: string): string => {
        switch (path) {
            case "/":
                return "0";
            case "/calendar":
                return "1";
            case "/create-todo":
                return "2";
            case "/check-todo":
                return "3";
            case "/settings":
                return "4";
            default:
                return "0";
        }
    };

    const handleNavigation = (key: string) => {
        const paths: { [key: string]: string } = {
            "0": "/",
            "1": "/calendar",
            "2": "/create-todo",
            "3": "/check-todo",
            "4": "/settings",
        };
        startViewTransition(paths[key]);
    };

    return (
        <BottomNavigation
            fixed
            activeKey={getActiveKey(location.pathname)}
            onChange={handleNavigation}
        >
            <BottomNavigation.Item
                key="0"
                label="Home"
                icon={<Icon icon="zi-home" />}
                className="active:text-primary"
            />
            <BottomNavigation.Item
                key="1"
                label="Calendar"
                icon={<Icon icon="zi-calendar" />}
                className="active:text-primary"
            />
            <BottomNavigation.Item
                key="2"
                label="New Todo"
                icon={<Icon icon="zi-plus-circle" />}
                className="active:text-primary"
            />
            <BottomNavigation.Item
                key="3"
                label="Tasks"
                icon={<Icon icon="zi-check-circle" />}
                className="active:text-primary"
            />
            <BottomNavigation.Item
                key="4"
                label="Settings"
                icon={<Icon icon="zi-setting" />}
                className="active:text-primary"
            />
        </BottomNavigation>
    );
};
