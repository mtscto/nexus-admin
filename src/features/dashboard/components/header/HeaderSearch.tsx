import { Search } from "lucide-react";

export default function HeaderSearch() {
    return (
        <div className="flex-1 flex justify-center">
            <div className="w-full max-w-md relative">
                <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                    placeholder="Search..."
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-zinc-600"
                />
            </div>
        </div>
    );
}