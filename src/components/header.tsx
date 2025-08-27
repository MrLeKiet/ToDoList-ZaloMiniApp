import "@/css/header.scss";
import { Header as ZMPHeader } from "zmp-ui";
interface HeaderProps {
  title?: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
  subtitle?: string;
}

const Header = ({
  title = "Todo List",
  showBack = false,
  rightAction,
  subtitle
}: HeaderProps) => {
  const location = window.location.pathname;

  const getPageTitle = () => {
    switch (location) {
      case '/':
        return 'Home';
      case '/calendar':
        return 'Calendar';
      case '/check-todo':
        return 'Check Todo';
      case '/create-todo':
        return 'Create Todo';
      case '/settings':
        return 'Settings';
      default:
        return title;
    }
  };

  return (
    <ZMPHeader
      className="px-4 header-title"
      title={getPageTitle()}
    />
  );
};

export default Header;
