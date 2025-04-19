import { Settings, Info } from "lucide-react";
import { Youtube, Twitter } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function ChatHeader({ mode }) {
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    const handleAboutClick = () => {
        navigate("/about");
        setShowMenu(false);
    };

    const handleHomeClick = () => {
        navigate("/");
    };

    const capitalizedMode = mode.charAt(0).toUpperCase() + mode.slice(1);
    const modeColor = mode === "twitter" ? "bg-blue-600" : "bg-red-600";

    return (
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-[#2f3e4d] px-4 py-3 shadow-sm">
            <div className="flex items-center gap-2 cursor-pointer" onClick={handleHomeClick}>
                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${modeColor}`}>
                    {mode === "twitter" ? (
                        <Twitter className="h-5 w-5" />
                    ) : (
                        <Youtube className="h-5 w-5" />
                    )}
                </div>
                <h1 className="text-xl font-bold text-white">{capitalizedMode} Insights</h1>
            </div>
            <div className="relative">
                <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="p-2 rounded-full hover:bg-gray-100"
                >
                    <Settings className="h-5 w-5 text-white" />
                </button>
                {showMenu && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-md">
                        <button
                            onClick={handleAboutClick}
                            className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                            <Info className="mr-2 h-4 w-4" />
                            About
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}