import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';

export default function App() {
    const [mode, setMode] = useState('twitter');
    const [chatKey, setChatKey] = useState(0);

    const handleSetMode = (newMode) => {
        setMode(newMode);
        setChatKey(prev => prev + 1); // force reset of chat area
    };

    return (
        <div className="flex h-screen">
            <Sidebar setMode={handleSetMode} />
            <ChatArea key={chatKey} mode={mode} />
        </div>
    );
}