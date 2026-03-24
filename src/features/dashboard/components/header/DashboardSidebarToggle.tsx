import { Menu } from "lucide-react";

export default function HeaderSidebarToggle({
    collapsed,
    setCollapsed,
}: {
    collapsed: boolean;
    setCollapsed: (v: boolean) => void;
}) {
    return (
        <button
            onClick={() => setCollapsed(!collapsed)}
            className="
            w-9 h-9 flex items-center justify-center rounded-md

            text-zinc-400 hover:text-white
            hover:bg-white/[0.03]

            transition-all duration-200
            active:scale-90
            "
        >
            <Menu size={18} />
        </button>
    );
}