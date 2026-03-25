import HeaderSearch from "./HeaderSearch";
import HeaderNotifications from "./DashboardNotifications";
import HeaderSidebarToggle from "./DashboardSidebarToggle";
import UserMenu from "../../../../shared/components/UserMenu";
import logo from "../../../../assets/logos/nexus-logo.svg"

export default function DashboardHeader({
    collapsed,
    setCollapsed,
}: {
    collapsed: boolean;
    setCollapsed: (v: boolean) => void;
}) {
    return (
        <header className="
            h-16
            flex items-center justify-between
            px-6

            bg-zinc-950/70
            backdrop-blur-xl
            border-b border-white/5
        ">

            {/* LEFT */}
            <div className="flex items-center gap-4">
                <HeaderSidebarToggle
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                />

                <img
                    src={logo}
                    alt="Nexus Admin"
                    className="h-10 mx-auto" />

            </div>

            {/* CENTER */}
            <HeaderSearch />

            {/* RIGHT */}
            <div className="flex items-center gap-3">

                <HeaderNotifications />

                <div className="w-px h-5 bg-white/5" />

                <UserMenu />
            </div>

        </header>
    );
}