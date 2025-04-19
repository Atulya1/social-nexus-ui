import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import About from './pages/About'; // make sure this path is correct
import { ChatHeader } from './components/ChatHeader'; // if Header is its own component

export default function App() {
    const [mode, setMode] = useState('twitter');
    const [chatKey, setChatKey] = useState(0);

    const handleSetMode = (newMode) => {
        setMode(newMode);
        setChatKey(prev => prev + 1);
    };

    return (
        <div className="flex h-screen overflow-hidden flex">
            <Sidebar setMode={handleSetMode} />
            <div className="flex flex-col flex-1">
                <ChatHeader mode={mode}/>
                <Routes>
                    <Route path="/" element={<ChatArea key={chatKey} mode={mode} />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </div>
        </div>
    );
}
