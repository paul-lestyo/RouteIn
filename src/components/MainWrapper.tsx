import BottomNavigation from "./BottomNavigation";
import ProfileMenu from "./HeaderPage";

interface MainWrapperProps {
  activeTab: string;
	children: React.ReactNode;
}

const MainWrapper: React.FC<MainWrapperProps> = ({ children, activeTab }) => {
  return (
    <div className="min-h-screen bg-gray-100 pb-16">
			<ProfileMenu />
      {children}
      <BottomNavigation activeTab={activeTab} />
    </div>
  );
};

export default MainWrapper;