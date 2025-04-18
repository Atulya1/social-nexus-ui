import { useState, useEffect } from 'react';
import {
    startOrchestration,
    pollStatus
} from './RagPipelineService';
export default function ChatArea({ mode }) {
    const [input, setInput] = useState("");
    const [input2, setInput2] = useState("");
    const [youtubeURL, setYoutubeURL] = useState("");
    const [savedYoutubeURL, setSavedYoutubeURL] = useState("");
    const [response, setResponse] = useState("");
    const [topTweets, setTopTweets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState("twitter-data-test");

    useEffect(() => {
        setInput("");
        setYoutubeURL("");
        setSavedYoutubeURL("");
        setResponse("");
        setTopTweets([]);
        setLoading(false);
    }, []);

    function isValidYouTubeUrl(url) {
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/|youtube\.com\/live\/)([a-zA-Z0-9_-]{11})$/;
        const match = url.match(youtubeRegex);
        return !!match;
    }

    const handleSend = async () => {
        if (!input.trim()) return;
        setLoading(true);
        setResponse("");
        setTopTweets([]);

        // — your existing payload logic, untouched —
        let payload;
        if (mode === 'twitter') {
            payload = {
                mode: "twitter",
                query: input,
                index_name: selectedIndex,
                similarity_threshold: 1.3,
                document_count: 5,
                temperature: 0.2
            };
        } else {
            const currentValid = isValidYouTubeUrl(youtubeURL);
            if (!currentValid) {
                window.alert("Invalid Url");
                setLoading(false);
                return;
            }
            if (currentValid && savedYoutubeURL === "") {
                setSavedYoutubeURL(youtubeURL);
                payload = { mode: "youtube", url: youtubeURL, query: input, similarity_threshold: 1.3, document_count: 100, temperature: 0.2 };
            } else if (currentValid && savedYoutubeURL !== youtubeURL) {
                setSavedYoutubeURL(youtubeURL);
                payload = { mode: "youtube", url: youtubeURL, query: input, similarity_threshold: 1.3, document_count: 100, temperature: 0.2 };
            } else {
                payload = { mode: "youtube", url: youtubeURL, query: input, similarity_threshold: 1.3, document_count: 100, temperature: 0.2 };
            }
        }
        // — end of existing logic —

        try {
            const instanceId = await startOrchestration(payload);
            const finalOutput = await pollStatus(instanceId, status =>
                console.log("status:", status)
            );
            // 3) Your original state updates
            setResponse(finalOutput.answer || "No response found.");
            setTopTweets(finalOutput.top_tweets || []);
            setInput2(input);
            setInput("");
        } catch (err) {
            console.error(err);
            setResponse("Error fetching insights.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex-1 bg-gray-50 flex flex-col items-center justify-end py-6 relative">
            {mode === 'twitter' && (
                <div className="absolute top-4 left-4">
                    <div className="mb-1 font-semibold text-gray-700">Select Data Set</div>
                    <select
                        className="border border-gray-300 rounded-md p-2"
                        value={selectedIndex}
                        onChange={(e) => setSelectedIndex(e.target.value)}
                    >
                        <option value="4">twitter-data-test</option>
                        <option value="1">twitter-data-v1</option>
                        <option value="2">twitter-data-v2</option>
                        <option value="3">twitter-data-v3</option>
                    </select>
                </div>
            )}

            {response && (
                <div className="w-full max-w-2xl px-4 flex-1 overflow-y-auto space-y-4">
                    <div className="bg-gray-100 border border-gray-300 rounded-md p-4 shadow">
                        <h3 className="text-lg font-semibold mb-2">{input2}</h3>
                        <p className="whitespace-pre-line text-sm text-gray-800">{response}</p>
                    </div>

                    {topTweets.map((tweet, index) => (
                        <div key={index} className="bg-gray-100 border rounded-lg p-4 shadow">
                            <div className="text-xs font-semibold text-gray-700 mb-2">Sentiment: {tweet.sentiment[0]} ({tweet.sentiment[1]})</div>
                            <div className="italic text-sm text-gray-800 whitespace-pre-line">{tweet.tweet_text}</div>
                        </div>
                    ))}
                </div>
            )}

            {!response && (
                <div className="flex flex-col items-center space-y-4">
                    {mode === 'twitter' && (
                        <>
                            <h2 className="text-2xl font-semibold">Get Twitter Insights</h2>
                            <div className="text-center text-sm text-gray-600 space-y-1">
                                <p>1. Get insights on what people are talking about any topic on Twitter.</p>
                                <p>2. Get top comments related to the topic.</p>
                            </div>
                        </>
                    )}

                    {mode === 'youtube' && (
                        <>
                            <h2 className="text-2xl font-semibold">Get YouTube Video Insights</h2>
                            <div className="text-center text-sm text-gray-600 space-y-1">
                                <p>1. Submit the link of the YouTube video you want insights of.</p>
                                <p>2. Ask anything related to the video and the discourse that the people are having in the comments section.</p>
                                <p>3. To reset the window, click on the "Youtube Insights" button on the sidebar.</p>
                                <p>4. You can submit new youtube link if you are done with the previous video.</p>
                            </div>
                        </>
                    )}
                </div>
            )}

            <div className="w-full max-w-2xl px-4 mt-4 space-y-2">
                {mode === 'youtube' && (
                    <input
                        type="text"
                        value={youtubeURL}
                        onChange={(e) => setYoutubeURL(e.target.value)}
                        placeholder="Enter YouTube link"
                        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none"
                    />
                )}
                <div className="flex">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask anything"
                        className="flex-1 border border-gray-300 rounded-l-md p-3 focus:outline-none"
                    />
                    <button
                        onClick={handleSend}
                        className={`text-white px-4 rounded-r-md ${mode === 'youtube' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        {loading ? 'Loading...' : mode === 'youtube' ? 'Send (YouTube)' : 'Send (Twitter)'}
                    </button>
                </div>
            </div>
        </div>
    );
}