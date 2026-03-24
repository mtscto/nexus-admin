import { Bell } from "lucide-react";

export default function HeaderNotifications() {
    return (
        <button
            className="
            w-9 h-9 flex items-center justify-center rounded-md

            text-zinc-400 hover:text-white
            hover:bg-white/[0.03]

            transition-all duration-200
            active:scale-90
            "
        >
            <Bell size={18} />
        </button>
    );
}