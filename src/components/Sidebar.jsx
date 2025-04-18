export default function Sidebar({ setMode }) {
    return (
        <div className="w-64 bg-white shadow-md border-r border-gray-200 flex flex-col p-4">
            <h1 className="text-2xl font-bold mb-6">Social Nexus</h1>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded mb-3 hover:bg-blue-600"
                onClick={() => setMode('youtube')}
            >
                YouTube Insights
            </button>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => setMode('twitter')}
            >
                Twitter Insights
            </button>
        </div>
    );
}