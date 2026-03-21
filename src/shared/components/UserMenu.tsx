import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Check,
    LogOut,
    Settings,
    Building2,
    UserRound,
    ChevronDown,
} from "lucide-react";
import { useAuth } from "../../features/auth/context/AuthContext";
import { useOrganization } from "../context/OrganizationContext";

export default function UserMenu() {
    const [open, setOpen] = useState(false);
    const [showOrgs, setShowOrgs] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const { user, logout } = useAuth();
    const { activeOrganization, switchOrganization, planColors } =
        useOrganization();

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (!menuRef.current) return;
            if (!menuRef.current.contains(e.target as Node)) {
                setOpen(false);
                setShowOrgs(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    function handleLogout() {
        logout();
        navigate("/");
    }

    if (!user) return null;

    return (
        <div ref={menuRef} className="relative">

            {/* BUTTON */}
            <button
                onClick={() => {
                    setOpen(!open);
                    setShowOrgs(false);
                }}
                className="
                flex items-center gap-2 px-2 py-1 rounded-lg
                transition-all duration-200 ease-out

                hover:bg-zinc-800
                active:scale-95 active:opacity-80
                "
            >
                <div
                    className={`
                    w-8 h-8 rounded-full bg-zinc-700 ring-2
                    transition-all duration-300
                    ${planColors?.ring}
                    `}
                />

                <ChevronDown
                    size={14}
                    className={`
                    text-zinc-400 transition-transform duration-200
                    ${open ? "rotate-180 text-white" : ""}
                    `}
                />
            </button>

            {/* DROPDOWN */}
            <div
                className={`
                absolute right-0 mt-2 w-64 rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl overflow-hidden z-50

                transition-all duration-200 ease-out origin-top

                ${open
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    }
                `}
            >

                {/* HEADER */}
                <div className="px-4 py-3 border-b border-zinc-800">
                    <p className="text-sm font-semibold">{user.name}</p>
                    <p className="text-xs text-zinc-400">
                        {activeOrganization?.name}
                    </p>
                </div>

                {/* PROFILE */}
                <MenuItem icon={UserRound}>Profile</MenuItem>

                {/* SWITCH ORG */}
                <button
                    onClick={() => setShowOrgs(!showOrgs)}
                    className="
                    w-full px-4 py-3 flex items-center gap-2 text-sm
                    text-zinc-200

                    transition-all duration-200 ease-out

                    hover:bg-zinc-800
                    active:scale-[0.98]
                    "
                >
                    <Building2 size={16} />
                    Switch Organization
                </button>

                {/* ORGANIZATIONS */}
                <div
                    className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${showOrgs ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
                    `}
                >
                    {user.organizations.map((org) => {
                        const isActive = org.id === activeOrganization?.id;

                        return (
                            <button
                                key={org.id}
                                onClick={() => {
                                    switchOrganization(org.id);
                                    // NÃO fecha (UX correto)
                                }}
                                className={`
                                w-full px-4 py-2.5 flex items-center justify-between text-sm

                                transition-all duration-200 ease-out

                                ${isActive
                                        ? `
                                        ${planColors?.activeBg ?? "bg-white/5"}
                                        text-white font-medium
                                        `
                                        : "text-zinc-300 hover:bg-zinc-800"
                                    }

                                active:scale-[0.98]
                                `}
                            >
                                <span>{org.name}</span>

                                {isActive && (
                                    <Check
                                        size={14}
                                        className={`
                                        ${planColors?.iconActive ?? "text-white"}
                                        `}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* SETTINGS */}
                <MenuItem icon={Settings}>Settings</MenuItem>

                {/* LOGOUT */}
                <button
                    onClick={handleLogout}
                    className="
                    w-full px-4 py-3 flex items-center gap-2 text-sm text-red-400

                    transition-all duration-200 ease-out

                    hover:bg-zinc-800
                    active:scale-[0.97]

                    border-t border-zinc-800
                    "
                >
                    <LogOut size={16} />
                    Logout
                </button>
            </div>
        </div>
    );
}

/* ---------- ITEM REUTILIZÁVEL ---------- */

function MenuItem({
    icon: Icon,
    children,
}: {
    icon: any;
    children: React.ReactNode;
}) {
    return (
        <button
            className="
            w-full px-4 py-3 flex items-center gap-2 text-sm text-zinc-200

            transition-all duration-200 ease-out

            hover:bg-zinc-800
            active:scale-[0.98]
            "
        >
            <Icon size={16} />
            {children}
        </button>
    );
}