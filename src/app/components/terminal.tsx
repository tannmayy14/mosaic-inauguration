'use client';

import { useState, useRef, useEffect } from 'react';

interface TerminalProps {
  onStartSequence?: () => void;
}

export default function Terminal({ onStartSequence }: TerminalProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    'MOSAIC INAUGURATION SYSTEM v2.0.25',
    'System online. Awaiting commands.',
    ''
  ]);
  const [isVisible, setIsVisible] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;

    const command = input.toLowerCase().trim();
    const newHistory = [...history, `Instructions> ${input}`];

    // Command responses
    switch (command) {
      case 'help':
        newHistory.push(
          '  Available commands:',
          '  • help          - Show this message',
          '  • about         - Event information',
          '  • date          - Event date and time',
          '  • register      - Registration link',
          '  • clear         - Clear terminal',
          '  • go            - Initialize launch sequence',
          '  • start: mosaic-2025 - Begin inauguration',
          ''
        );
        break;
      case 'about':
        newHistory.push(
          '  MOSAIC Inauguration 2025',
          '  Experience the future of innovation.',
          '  Where technology meets creativity.',
          ''
        );
        break;
      case 'date':
        newHistory.push(
          '  📅 January 20, 2025',
          '  ⏰ 10:00 AM IST',
          '  📍 Campus Auditorium',
          ''
        );
        break;
      case 'register':
        newHistory.push(
          '  🔗 Registration: https://mosaic2025.com/register',
          '  Secure your spot now!',
          ''
        );
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'go':
        newHistory.push(
          '  [████████████████████] 100%',
          '  🚀 Launch sequence initiated...',
          '  ✓ Systems online',
          '  ✓ Ready for takeoff',
          ''
        );
        break;
      case 'start: mosaic-2025':
      case 'start:mosaic-2025':
        newHistory.push(
          '  ▶ Starting MOSAIC-2025...',
          '  ✓ Initializing systems',
          '  ✓ Loading modules',
          '  → Launching in 3... 2... 1...',
          ''
        );
        setHistory(newHistory);
        setInput('');
        
        // Start fade out with longer duration
        setTimeout(() => {
          setIsVisible(false);
          onStartSequence?.();
        }, 1500);
        return;
      default:
        newHistory.push(
          `  Command not found: ${input}`,
          '  Type "help" for available commands.',
          ''
        );
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className={`fixed inset-0 z-20 flex items-center justify-center pointer-events-none transition-all duration-[2000ms] ease-in-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
      <div 
        className="w-[90%] max-w-3xl h-[500px] pointer-events-auto"
        onClick={handleTerminalClick}
      >
        {/* Terminal Window */}
        <div className="h-full backdrop-blur-xl bg-black/40 border-2 border-cyan-500/30 rounded-lg shadow-2xl overflow-hidden">
          {/* Terminal Header */}
          <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 border-b-2 border-cyan-500/30 px-4 py-2 flex items-center gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
            </div>
            <span className="text-cyan-400 text-sm font-mono ml-4">
              MOSAIC://TERMINAL/2025
            </span>
          </div>

          {/* Terminal Content */}
          <div 
            ref={terminalRef}
            className="h-[calc(100%-50px)] overflow-y-auto p-4 font-mono text-sm scrollbar-thin scrollbar-thumb-cyan-500/50 scrollbar-track-transparent"
          >
            {/* History */}
            {history.map((line, index) => (
              <div 
                key={index} 
                className={`${
                  line.startsWith('Instructions>') 
                    ? 'text-green-400' 
                    : line.startsWith(' ') 
                    ? 'text-gray-300' 
                    : 'text-cyan-300'
                } mb-1`}
              >
                {line}
              </div>
            ))}

            {/* Input Line */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <span className="text-green-400">Instructions&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent outline-none text-white caret-green-400"
                autoFocus
                spellCheck={false}
              />
              <span className="animate-pulse text-green-400">▊</span>
            </form>
          </div>
        </div>

        {/* Glow Effect
        <div className="absolute inset-0 -z-10 blur-2xl opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500 animate-pulse"></div>
        </div> */}
      </div>
    </div>
  );
}