import React, { useState } from 'react';
import { Tv2 } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { channels } from './types';

function App() {
  const [currentChannel, setCurrentChannel] = useState<string>('');

  const handleChannelSelect = (channelId: string) => {
    setCurrentChannel(channelId);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Tv2 className="w-8 h-8 text-cyan-500" />
            <h1 className="text-3xl font-bold text-cyan-500">TV Online Player</h1>
          </div>
          
          <SearchBar 
            channels={channels} 
            onChannelSelect={handleChannelSelect} 
          />
        </div>

        {currentChannel && (
          <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
            <iframe
              src={`https://redecanaistv.ps/player3/ch.php?canal=${currentChannel}`}
              className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
              allowFullScreen
            />
          </div>
        )}

        {!currentChannel && (
          <div className="flex flex-col items-center justify-center p-8 bg-gray-800 rounded-lg text-center">
            <Tv2 className="w-16 h-16 text-gray-600 mb-4" />
            <p className="text-gray-400">
              Digite o nome de um canal para começar a assistir
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;