type Plan = "free" | "pro" | "enterprise";

export type PlanColors = {
    badge: string;
    iconActive: string;
    iconInactive: string;
    iconHover: string;
    textPrimary: string;
    textSecondary: string;
    activeIndicator: string;
    ring: string;
    hoverBg: string;
    activeBg: string;
    ambient: string;
};

export function getPlanColors(plan: Plan): PlanColors {
    switch (plan) {
        case "free":
            return {
                badge: "bg-zinc-800 text-zinc-300 border-zinc-700",
                iconActive: "text-white",
                iconInactive: "text-zinc-400",
                iconHover: "group-hover:text-zinc-200",
                textPrimary: "text-white",
                textSecondary: "text-zinc-400",
                activeIndicator: "bg-zinc-500",
                ring: "ring-zinc-600",
                hoverBg: "hover:bg-zinc-800/50",
                activeBg: "bg-zinc-800/70",
                ambient: "bg-zinc-500/10",
            };

        case "pro":
            return {
                badge: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
                iconActive: "text-indigo-400",
                iconInactive: "text-indigo-300/70",
                iconHover: "group-hover:text-indigo-300",
                textPrimary: "text-white",
                textSecondary: "text-indigo-300/70",
                activeIndicator: "bg-indigo-500",
                ring: "ring-indigo-500",
                hoverBg: "hover:bg-indigo-500/10",
                activeBg: "bg-indigo-500/10",
                ambient: "bg-indigo-500/12",
            };

        case "enterprise":
            return {
                badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                iconActive: "text-emerald-400",
                iconInactive: "text-emerald-300/70",
                iconHover: "group-hover:text-emerald-300",
                textPrimary: "text-white",
                textSecondary: "text-emerald-300/70",
                activeIndicator: "bg-emerald-500",
                ring: "ring-emerald-500",
                hoverBg: "hover:bg-emerald-500/10",
                activeBg: "bg-emerald-500/10",
                ambient: "bg-emerald-400/15",
            };

        default:
            return {
                badge: "",
                iconActive: "text-white",
                iconInactive: "text-zinc-400",
                iconHover: "group-hover:text-zinc-200",
                textPrimary: "text-white",
                textSecondary: "text-zinc-400",
                activeIndicator: "bg-zinc-500",
                ring: "ring-zinc-700",
                hoverBg: "hover:bg-zinc-800/50",
                activeBg: "bg-zinc-800/70",
                ambient: "bg-zinc-500/10",
            };
    }
}