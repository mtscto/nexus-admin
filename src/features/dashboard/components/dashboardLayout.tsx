// src/features/dashboard/components/DashboardLayout.tsx

import React, { useState, useRef, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/context/AuthContext";
import { useOrganization } from "../../../shared/context/OrganizationContext";
import UserMenu from "../../../shared/components/UserMenu";
import {
    Search,
    Bell,
    LayoutDashboard,
    Package,
    Users,
    PanelLeft,
} from "lucide-react";

export default function DashboardLayout() {
    const [collapsed, setCollapsed] = useState(false);

    const indicatorRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    const { user } = useAuth();
    const { activeOrganization, planColors } = useOrganization();

    /**
     * Active navigation indicator positioning
     *
     * The indicator is positioned dynamically based on the active route.
     * We compute the offset relative to the nav container to avoid layout shifts
     * and ensure smooth transitions even with sidebar collapse/expand.
     */
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
        <div className="min-h-screen bg-zinc-950 text-white flex flex-col transition-colors duration-300">

            <header className="h-16 border-b border-zinc-800 bg-zinc-950 px-6 flex items-center justify-between">

                <div className="flex items-center gap-4">
                    {/* Sidebar toggle with tactile feedback and branding */}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className={`
                        transition-all duration-300 ease-out
                        ${planColors?.iconActive ?? "text-emerald-400"}

                        hover:scale-105 hover:opacity-90
                        active:scale-90 active:opacity-70
                        `}
                    >
                        <PanelLeft size={20} />
                    </button>

                    <h1 className="text-lg font-semibold tracking-tight">
                        Dashboard
                    </h1>
                </div>

                <div className="flex items-center gap-5">
                    {/* Neutral interaction icons (consistent across product) */}
                    <Search className="text-zinc-400 hover:text-white transition duration-200" size={18} />
                    <Bell className="text-zinc-400 hover:text-white transition duration-200" size={18} />

                    <div className="w-px h-6 bg-zinc-800" />

                    <UserMenu />
                </div>

            </header>

            <div className="flex flex-1">

                <aside
                    className={`
                    transition-[width] duration-300 ease-in-out
                    bg-zinc-900/80 backdrop-blur-xl border-r border-zinc-800
                    ${collapsed ? "w-20" : "w-64"}
                    `}
                >

                    {/* USER CONTEXT BLOCK */}
                    <div className="px-4 h-24 flex items-center border-b border-zinc-800">
                        <div className="flex items-center gap-4 w-full">

                            {/* Avatar reflects active plan via ring color */}
                            <div
                                className={`
                                w-12 h-12 rounded-full shrink-0 bg-zinc-700 ring-2
                                transition-all duration-500 ease-out
                                ${planColors?.ring ?? "ring-zinc-700"}
                                `}
                            />

                            {/* Organization + user info (collapsed-safe animation) */}
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

                                {/* Plan badge is part of branding system */}
                                {activeOrganization && planColors && (
                                    <span
                                        className={`
                                        mt-2 px-2 py-0.5 text-[10px] font-medium rounded-full border w-fit
                                        transition-all duration-500 ease-out
                                        ${planColors.badge}
                                        `}
                                    >
                                        {activeOrganization.plan.toUpperCase()}
                                    </span>
                                )}
                            </div>

                        </div>
                    </div>

                    <nav ref={navRef} className="relative py-4 space-y-1">

                        {/* Active route indicator
                           Combines position animation + color transition from plan */}
                        <div
                            ref={indicatorRef}
                            className={`
                            absolute left-1 w-[3px] rounded-full
                            transition-all duration-300 ease-out

                            ${planColors?.activeIndicator ?? "bg-zinc-500"}
                            ${planColors?.glow ?? ""}
                            `}
                            style={{ top: 0, height: 0 }}
                        />

                        <NavItem to="/dashboard" collapsed={collapsed} Icon={LayoutDashboard} planColors={planColors}>
                            Dashboard
                        </NavItem>

                        <NavItem to="/products" collapsed={collapsed} Icon={Package} planColors={planColors}>
                            Products
                        </NavItem>

                        <NavItem to="/team" collapsed={collapsed} Icon={Users} planColors={planColors}>
                            Team
                        </NavItem>

                    </nav>

                </aside>

                <main className="flex-1 p-6 bg-zinc-950">
                    <Outlet />
                </main>

            </div>
        </div>
    );
}

/**
 * Navigation item
 *
 * Responsibilities:
 * - Reflect active route state
 * - Apply branding only to active state
 * - Maintain consistent spacing in both collapsed and expanded states
 * - Provide tactile feedback via micro-interactions
 */
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

                    /* Motion */
                    transition-all duration-200 ease-out
                    transition-colors duration-300

                    /* Interaction feedback */
                    active:scale-[0.97]
                    active:opacity-80

                    /* State styling */
                    ${isActive
                            ? `${planColors?.activeBg ?? "bg-white/5"} text-white shadow-inner`
                            : "text-zinc-400 hover:bg-zinc-800/40 hover:text-white"
                        }
                    `}
                >
                    <div className="w-14 h-9 flex items-center justify-center shrink-0">
                        <Icon
                            size={18}
                            className={`
                            transition-all duration-200 ease-out
                            transition-colors duration-300

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

                        /* Collapse-safe animation */
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