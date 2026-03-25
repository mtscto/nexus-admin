import React, { useState, useRef, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../../auth/context/AuthContext";
import { useOrganization } from "../../../../shared/context/OrganizationContext";
import { getPlanColors } from "../../../../shared/theme/planBranding";
import DashboardHeader from "../header/DashboardHeader";
import {
    LayoutDashboard,
    Package,
    Users
} from "lucide-react";

export default function DashboardLayout() {
    const [collapsed, setCollapsed] = useState(false);

    const indicatorRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    const { user } = useAuth();
    const { activeOrganization, planColors } = useOrganization();

    const safePlanColors =
        planColors ?? getPlanColors(activeOrganization?.plan ?? "free");

    useEffect(() => {
        const nav = navRef.current;
        const indicator = indicatorRef.current;

        if (!nav || !indicator) return;

        const active = nav.querySelector("[data-active='true']") as HTMLElement;
        if (!active) return;

        const rect = active.getBoundingClientRect();
        const parentRect = nav.getBoundingClientRect();

        indicator.style.top = `${rect.top - parentRect.top}px`;
        indicator.style.height = `${rect.height}px`;
    }, [location]);

    return (
        <div className="min-h-screen bg-zinc-950 text-white flex flex-col relative isolate">

            <div className="pointer-events-none absolute inset-0 z-0">
                <div
                    className={`
                    absolute top-0 left-1/2 -translate-x-1/2
                    w-[900px] h-[900px] rounded-full blur-[120px]
                    opacity-50
                    ${safePlanColors.ambient}
                    `}
                />
            </div>

            <div className="relative z-50">
                <DashboardHeader
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                />
            </div>

            <div className="flex flex-1 relative z-10">

                <aside
                    className={`
                    relative z-20
                    transition-[width] duration-300 ease-in-out
                    bg-zinc-900/70 backdrop-blur-xl
                    border-r border-white/5
                    ${collapsed ? "w-20" : "w-64"}
                    `}
                >

                    <div className="px-4 h-24 flex items-center border-b border-white/5">
                        <div className="flex items-center gap-4 w-full">

                            <div
                                className={`
                                w-12 h-12 rounded-full shrink-0 bg-zinc-700 ring-2
                                transition-all duration-500 ease-out
                                ${safePlanColors.ring}
                                `}
                            />

                            <div
                                className={`
                                flex flex-col justify-center overflow-hidden
                                transition-all duration-300 ease-in-out
                                ${collapsed ? "opacity-0 max-w-0" : "opacity-100 max-w-[200px]"}
                                `}
                            >
                                <span className="text-sm font-semibold whitespace-nowrap">
                                    {user?.name}
                                </span>

                                <span className="text-xs text-zinc-400 whitespace-nowrap">
                                    {activeOrganization?.name}
                                </span>

                                {activeOrganization && (
                                    <span
                                        className={`
                                        mt-2 px-2 py-0.5 text-[10px] font-medium rounded-full border w-fit
                                        transition-all duration-500 ease-out
                                        ${safePlanColors.badge}
                                        `}
                                    >
                                        {activeOrganization.plan.toUpperCase()}
                                    </span>
                                )}
                            </div>

                        </div>
                    </div>

                    <nav ref={navRef} className="relative py-4 space-y-1">

                        <div
                            ref={indicatorRef}
                            className={`
                            absolute left-1 w-[3px] rounded-full
                            transition-all duration-300 ease-out
                            ${safePlanColors.activeIndicator}
                            `}
                            style={{ top: 0, height: 0 }}
                        />

                        <NavItem to="/dashboard" collapsed={collapsed} Icon={LayoutDashboard} planColors={safePlanColors}>
                            Dashboard
                        </NavItem>

                        <NavItem to="/products" collapsed={collapsed} Icon={Package} planColors={safePlanColors}>
                            Products
                        </NavItem>

                        <NavItem to="/team" collapsed={collapsed} Icon={Users} planColors={safePlanColors}>
                            Team
                        </NavItem>

                    </nav>

                </aside>

                <main className="relative z-10 flex-1 overflow-hidden bg-transparent">
                    <div className="relative z-10 p-6">
                        <Outlet />
                    </div>
                </main>

            </div>
        </div>
    );
}

function NavItem({
    to,
    collapsed,
    Icon,
    children,
    planColors,
}: {
    to: string;
    collapsed: boolean;
    Icon: React.ComponentType<{ size?: number; className?: string }>;
    children: React.ReactNode;
    planColors: any;
}) {
    return (
        <NavLink to={to} end={to === "/dashboard"}>
            {({ isActive }) => (
                <div
                    data-active={isActive}
                    className={`
                    group w-full flex items-center h-10 px-3 rounded-md
                    transition-all duration-200 ease-out
                    active:scale-[0.97]
                    active:opacity-80
                    ${isActive
                            ? `${planColors.activeBg} text-white shadow-inner`
                            : `text-zinc-400 ${planColors.hoverBg} hover:text-white`
                        }
                    `}
                >
                    <div className="w-14 h-9 flex items-center justify-center shrink-0">
                        <Icon
                            size={18}
                            className={`
                            transition-all duration-200 ease-out
                            ${isActive
                                    ? "text-white scale-110"
                                    : "text-zinc-400 group-hover:text-white group-hover:scale-105"
                                }
                            `}
                        />
                    </div>

                    <span
                        className={`
                        ml-3 whitespace-nowrap overflow-hidden
                        transition-all duration-300 ease-in-out
                        ${collapsed
                                ? "opacity-0 max-w-0"
                                : "opacity-100 max-w-[200px]"
                            }
                        `}
                    >
                        {children}
                    </span>
                </div>
            )}
        </NavLink>
    );
}