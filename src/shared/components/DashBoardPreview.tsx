import { useEffect, useState } from "react";

export default function DashboardPreview() {
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        function handleMove(e: MouseEvent) {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;

            setOffset({ x, y });
        }

        window.addEventListener("mousemove", handleMove);

        return () => window.removeEventListener("mousemove", handleMove);
    }, []);

    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">

            <div
                className="animate-floatSlow opacity-30 blur-sm transition-transform duration-300"
                style={{
                    transform: `translate(${offset.x}px, ${offset.y}px) scale(1.15)`
                }}
            >

                <div className="w-[1000px] bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl p-6 space-y-6">

                    {/* HEADER */}
                    <div className="flex items-center justify-between">

                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-emerald-500/40" />
                            <div className="w-32 h-5 bg-zinc-700 rounded" />
                        </div>

                        <div className="flex gap-3">
                            <div className="w-6 h-6 bg-zinc-700 rounded" />
                            <div className="w-6 h-6 bg-zinc-700 rounded" />
                            <div className="w-6 h-6 bg-zinc-700 rounded" />
                            <div className="w-8 h-8 rounded-full bg-zinc-700" />
                        </div>

                    </div>

                    {/* METRICS */}
                    <div className="grid grid-cols-4 gap-4">

                        <div className="bg-zinc-800 rounded-lg p-4 space-y-2">
                            <div className="w-20 h-3 bg-zinc-600 rounded" />
                            <div className="w-16 h-6 bg-zinc-600 rounded" />
                        </div>

                        <div className="bg-zinc-800 rounded-lg p-4 space-y-2">
                            <div className="w-20 h-3 bg-zinc-600 rounded" />
                            <div className="w-16 h-6 bg-zinc-600 rounded" />
                        </div>

                        <div className="bg-zinc-800 rounded-lg p-4 space-y-2">
                            <div className="w-20 h-3 bg-zinc-600 rounded" />
                            <div className="w-16 h-6 bg-zinc-600 rounded" />
                        </div>

                        <div className="bg-zinc-800 rounded-lg p-4 space-y-2">
                            <div className="w-20 h-3 bg-zinc-600 rounded" />
                            <div className="w-16 h-6 bg-zinc-600 rounded" />
                        </div>

                    </div>

                    {/* CHART */}
                    <div className="grid grid-cols-3 gap-4">

                        <div className="col-span-2 bg-zinc-800 rounded-lg h-56 relative overflow-hidden">

                            <svg
                                viewBox="0 0 300 100"
                                className="absolute bottom-0 w-full h-full opacity-60"
                            >
                                <polyline
                                    fill="none"
                                    stroke="#10b981"
                                    strokeWidth="3"
                                    points="0,80 40,70 80,75 120,60 160,65 200,50 240,55 300,40"
                                />
                            </svg>

                        </div>

                        <div className="bg-zinc-800 rounded-lg p-4 space-y-3">

                            <div className="w-full h-4 bg-zinc-700 rounded" />
                            <div className="w-3/4 h-4 bg-zinc-700 rounded" />
                            <div className="w-5/6 h-4 bg-zinc-700 rounded" />
                            <div className="w-2/3 h-4 bg-zinc-700 rounded" />

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}