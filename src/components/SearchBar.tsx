import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Channel } from '../types';

interface SearchBarProps {
  channels: Channel[];
  onChannelSelect: (channelId: string) => void;
}

export function SearchBar({ channels, onChannelSelect }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredChannels = channels.filter(channel =>
    channel.name.toLowerCase().includes(query.toLowerCase()) ||
    channel.id.toLowerCase().includes(query.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredChannels.length > 0) {
      onChannelSelect(filteredChannels[0].id);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            className="w-full px-4 py-2 pl-10 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400"
            placeholder="Digite o nome do canal..."
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </form>

      {showSuggestions && query && (
        <div
          ref={suggestionRef}
          className="absolute z-50 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {filteredChannels.map((channel) => (
            <div
              key={channel.id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-700 text-white"
              onClick={() => {
                onChannelSelect(channel.id);
                setQuery(channel.name);
                setShowSuggestions(false);
              }}
            >
              {channel.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}