import type { ReactNode } from "react";

interface EmptyStateProps {
    title: string;
    description: string;
    icon: ReactNode;
    planColors: any;
    actionLabel?: string;
    onAction?: () => void;
}

export default function EmptyState({
    title,
    description,
    icon,
    planColors,
    actionLabel,
    onAction,
}: EmptyStateProps) {
    return (
        <div className="flex items-center justify-center h-full">

            <div
                className={`
                w-full max-w-xl p-6 rounded-xl border border-zinc-800 bg-zinc-900/60 backdrop-blur
                transition-all duration-300
                hover:border-zinc-700
                hover:scale-[1.01] active:scale-[0.99]
                ${planColors?.glow ?? ""}
                `}
            >

                {/* HEADER */}
                <div className="flex items-center gap-3 mb-4">

                    <div
                        className={`
                        w-10 h-10 flex items-center justify-center rounded-lg
                        bg-zinc-800
                        transition-colors duration-300
                        ${planColors?.activeBg ?? ""}
                        `}
                    >
                        {icon}
                    </div>

                    <h2 className="text-lg font-semibold text-white">
                        {title}
                    </h2>

                </div>

                {/* DESCRIPTION */}
                <p className="text-sm text-zinc-400 leading-relaxed">
                    {description}
                </p>

                {/* CTA */}
                {actionLabel && onAction && (
                    <button
                        onClick={onAction}
                        className={`
                        mt-5 px-4 py-2 text-sm font-medium rounded-lg
                        transition-all duration-200

                        bg-zinc-800 text-white
                        hover:bg-zinc-700
                        active:scale-95

                        ${planColors?.activeBorder ?? ""}
                        `}
                    >
                        {actionLabel}
                    </button>
                )}

            </div>

        </div>
    );
}