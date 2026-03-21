import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import DashboardPreview from "../../../shared/components/DashBoardPreview";
import logo from "../../../assets/logos/nexus-logo.svg"

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const cardRef = useRef<HTMLFormElement>(null);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [remember, setRemember] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0
    });
    const [lightIntesity, setLightIntensity] = useState(0.4);

    const [gridOffset, setGridOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        function handleMouseMove(e: MouseEvent) {

            const rect = cardRef.current?.getBoundingClientRect();

            let targetIntensity = 0.04;

            if (rect) {
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const distanceX = e.clientX - centerX;
                const distanceY = e.clientY - centerY;

                const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

                if (distance < 300) {
                    targetIntensity = 0.08;
                }
            }

            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });

            setLightIntensity(prev => prev + (targetIntensity - prev) * 0.08);

            setGridOffset({
                x: (e.clientX / window.innerWidth - 0.5) * 8,
                y: (e.clientY / window.innerHeight - 0.5) * 8
            });
        }

        window.addEventListener("mousemove", handleMouseMove);

        return () => window.removeEventListener("mousemove", handleMouseMove);

    }, []);

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();

        setLoading(true);
        setError(null);

        try {
            await login(email, password);
            navigate("/dashboard");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white relative overflow-hidden">

            {/* BACKGROUND GRADIENT */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black" />

            {/* GRID PATTERN */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.025] transition-transform duration-500 ease-out"
                style={{
                    transform: `translate3d(${gridOffset.x}px, ${gridOffset.y}px, 0)`,
                    backgroundImage: `
                        linear-gradient(to right, white 1px, transparent 1px),
                        linear-gradient(to bottom, white 1px, transparent 1px)
                    `,
                    backgroundSize: "40px 40px",
                    maskImage:
                        "radial-gradient(circle at center, black 30%, transparent 80%)",
                    WebkitMaskImage:
                        "radial-gradient(circle at center, black 30%, transparent 80%)"
                }}
            />

            {/* MOUSE LIGHT */}
            <div
                className="pointer-events-none absolute inset-0 transition-all duration-300"
                style={{
                    background: `radial-gradient(
                        900px at ${mousePosition.x}px ${mousePosition.y}px,
                        rgba(16,185,129,${lightIntesity}),
                        transparent 70%
                    )`
                }}
            />

            {/* DASHBOARD PREVIEW */}
            <DashboardPreview />

            <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-emerald-500/12 rounded-full blur-[180px]" />

            <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-emerald-400/8 rounded-full blur-[160px]" />

            <form
                ref={cardRef}
                onSubmit={handleLogin}
                className="relative w-full max-w-[640px] bg-zinc-900/5 backdrop-blur-xl border border-white/5 p-10 rounded-2xl space-y-6 shadow-lg shadow-black/40"
            >

                {/* HEADER */}
                <div className="text-center space-y-2 pb-2">

                    <img
                        src={logo}
                        alt="Nexus Admin"
                        className="h-20 mx-auto" />

                    <p className="text-zinc-400 text-sm">
                        Sign in to your account
                    </p>

                </div>

                {/* EMAIL */}
                <div className="space-y-2">

                    <label className="text-sm text-zinc-400">
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="demo@nexusadmin.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition"
                    />

                </div>

                {/* PASSWORD */}
                <div className="space-y-2">

                    <label className="text-sm text-zinc-400">
                        Password
                    </label>

                    <div className="relative">

                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 pr-11 transition"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>

                    </div>

                </div>

                {/* REMEMBER */}
                <div className="flex items-center justify-between text-sm pt-1">

                    <label className="flex items-center gap-2 text-zinc-400 cursor-pointer select-none">

                        <input
                            type="checkbox"
                            checked={remember}
                            onChange={() => setRemember(!remember)}
                            className="accent-emerald-600 w-4 h-4"
                        />

                        <span className="hover:text-zinc-300 transition">
                            Remember me
                        </span>

                    </label>

                    <button
                        type="button"
                        className="text-zinc-400 hover:text-white transition"
                    >
                        Forgot password?
                    </button>

                </div>

                {/* ERROR */}
                {error && (
                    <p className="text-red-500 text-sm">
                        {error}
                    </p>
                )}

                {/* BUTTON */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-emerald-600 rounded-lg font-semibold hover:bg-emerald-500 shadow-md shadow-emerald-900/30 transition disabled:opacity-60"
                >
                    {loading ? "Signing in..." : "Sign in"}
                </button>

                <div className="text-xs text-zinc-500 text-center border-t border-zinc-800 pt-4">

                    <p>Demo access</p>

                    <p className="mt-1">
                        demo@nexusadmin.com
                    </p>

                    <p>demo123</p>

                </div>

                <p className="text-center text-sm text-zinc-400">

                    Don’t have an account?{" "}

                    <button
                        type="button"
                        className="text-emerald-500 hover:text-emerald-400 transition"
                    >
                        Sign up →
                    </button>

                </p>

            </form>

        </div>
    );
}