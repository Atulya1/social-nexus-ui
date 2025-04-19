import { Youtube, Twitter, Facebook, Instagram, Newspaper, HandPlatter, Baby} from "lucide-react";

export default function Sidebar({ setMode }) {
    return (
        <div className="w-72 bg-[#2f3e4d] text-white flex flex-col py-6 px-4 shadow-md">
            <div className="flex items-center gap-3 mb-10">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                    <HandPlatter className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold">Social Nexus</h2>
                </div>
            </div>

            <div className="space-y-4">
                <div className="text-xs uppercase text-gray-400 tracking-widest">Insights</div>

                <button
                    onClick={() => setMode('youtube')}
                    className="flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
                >
                    <Youtube className="h-5 w-5" />
                    <span>YouTube Insights</span>
                </button>

                <button
                    onClick={() => setMode('twitter')}
                    className="flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
                >
                    <Twitter className="h-5 w-5" />
                    <span>Twitter Insights</span>
                </button>
                {/* Faint separator line */}
                <hr className="border-t border-gray-500 opacity-20 my-3" />
                <button
                    className="flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg hover:bg-gray-600 transition-all"
                >
                    <Baby className="h-5 w-5" />
                    <span>Reddit Insights</span>
                </button>

                <button
                    className="flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg hover:bg-gray-600 transition-all"
                >
                    <Facebook className="h-5 w-5" />
                    <span>Facebook Insights</span>
                </button>

                <button
                    className="flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg hover:bg-gray-600 transition-all"
                >
                    <Instagram className="h-5 w-5" />
                    <span>Instagram Insights</span>
                </button>

                <button
                    className="flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg hover:bg-gray-600 transition-all"
                >
                    <Newspaper className="h-5 w-5" />
                    <span>News Insights</span>
                </button>
            </div>
        </div>
    );
}
