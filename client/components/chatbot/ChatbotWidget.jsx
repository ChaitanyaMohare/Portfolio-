'use client';

import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  MessageSquare,
  X,
  Gamepad2,
  Send,
  RotateCcw,
  Sparkles,
  Bot,
  User,
  Zap,
} from 'lucide-react';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'game'

  // --- CHAT STATE ---
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hey! I'm Chaitanya's AI twin. Ask me about his architecture work at Pravesh Mitra, his hackathons, or test your skills against me in Tic-Tac-Toe!",
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const chatBottomRef = useRef(null);

  // --- TIC-TAC-TOE STATE ---
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [difficulty, setDifficulty] = useState('unbeatable'); // 'unbeatable' | 'casual'
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing' | 'won' | 'lost' | 'draw'
  const [scores, setScores] = useState({ player: 0, bot: 0, ties: 0 });
  const [botTaunt, setBotTaunt] = useState('Make your move! I dare you.');

  useEffect(() => {
    if (chatBottomRef.current && activeTab === 'chat') {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeTab]);

  // Quick Reply Prompts
  const quickChips = [
    'Tell me about Pravesh Mitra',
    'Events organized?',
    'NEP Timetable Engine?',
    'Hardware & IoT work?',
    "Let's play Tic-Tac-Toe!",
  ];

  // Knowledge base responses for Chaitanya Mohare
  const getBotResponse = (query) => {
    const q = query.toLowerCase();

    if (q.includes('tic-tac-toe') || q.includes('game') || q.includes('play')) {
      setActiveTab('game');
      return "Game on! I just switched us to Tic-Tac-Toe mode. Choose your difficulty if you dare!";
    }

    if (q.includes('pravesh') || q.includes('mitra') || q.includes('founder')) {
      return "Chaitanya is Co-Founder & Lead Architect at Pravesh Mitra! He built the full-stack admission & student ecosystem that currently serves 1,200+ active university users with high-uptime REST APIs and real-time workflows.";
    }

    if (q.includes('event') || q.includes('hackathon') || q.includes('bharat')) {
      return "Chaitanya co-organized 'Build for Bharat 2026' (a 12-hour national hackathon with 350+ attendees and 70+ teams at MIT), as well as the Campus Tech Symposium (450+ attendees) and IoT Bootcamps!";
    }

    if (q.includes('timetable') || q.includes('nep') || q.includes('genetic') || q.includes('algorithm')) {
      return "The Automated NEP 2020 Timetable Engine uses Genetic Algorithms and Constraint Satisfaction Problems (CSP) in Python & FastAPI to solve departmental scheduling collisions in seconds.";
    }

    if (q.includes('hardware') || q.includes('kicad') || q.includes('pcb') || q.includes('8051') || q.includes('iot')) {
      return "Chaitanya bridges software with embedded hardware! He has designed custom KiCad PCBs, an automated fire detection system on 8051/8085 microcontrollers, and solar battery management systems.";
    }

    if (q.includes('education') || q.includes('mit') || q.includes('cgpa') || q.includes('college')) {
      return "Chaitanya is pursuing B.Tech in Electronics & Computer Engineering at MIT, Chhatrapati Sambhaginagar with a stellar CGPA of 8.15 / 10!";
    }

    if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('linkedin')) {
      return "You can reach Chaitanya directly at chaitanyamohare@gmail.com, or check his GitHub at github.com/Chaitanyamohare and LinkedIn at linkedin.com/in/chaitanyamohare!";
    }

    if (q.includes('stack') || q.includes('skill') || q.includes('tech')) {
      return "His core stack includes Next.js, React, Node.js, Express, MongoDB, Python, FastAPI, Docker, Tailwind CSS, KiCad, and 8051/ESP32 microcontrollers.";
    }

    return "Chaitanya is a Full-Stack Systems Architect & ECE Engineer at MIT Chhatrapati Sambhaginagar (CGPA: 8.15). Ask me about Pravesh Mitra (1,200+ users), Build for Bharat 2026, or challenge me in Tic-Tac-Toe!";
  };

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');

    setTimeout(() => {
      const replyText = getBotResponse(text);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'bot', text: replyText },
      ]);
    }, 400);
  };

  // --- TIC-TAC-TOE GAME LOGIC ---

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    if (squares.every((sq) => sq !== null)) {
      return 'tie';
    }
    return null;
  };

  // Minimax Algorithm for Unbeatable AI
  const minimax = (currBoard, depth, isMaximizing) => {
    const result = checkWinner(currBoard);
    if (result === 'O') return 10 - depth;
    if (result === 'X') return depth - 10;
    if (result === 'tie') return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (!currBoard[i]) {
          currBoard[i] = 'O';
          const score = minimax(currBoard, depth + 1, false);
          currBoard[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (!currBoard[i]) {
          currBoard[i] = 'X';
          const score = minimax(currBoard, depth + 1, true);
          currBoard[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const findBestMove = (currBoard) => {
    let bestScore = -Infinity;
    let move = null;
    for (let i = 0; i < 9; i++) {
      if (!currBoard[i]) {
        currBoard[i] = 'O';
        const score = minimax(currBoard, 0, false);
        currBoard[i] = null;
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  };

  const handleCellClick = (index) => {
    if (board[index] || !isPlayerTurn || gameStatus !== 'playing') return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner) {
      finishGame(winner, newBoard);
      return;
    }

    setIsPlayerTurn(false);
    setBotTaunt('Evaluating decision trees...');

    // Bot move delay for realism
    setTimeout(() => {
      botMove(newBoard);
    }, 450);
  };

  const botMove = (currentBoard) => {
    let chosenIndex = null;

    if (difficulty === 'unbeatable') {
      chosenIndex = findBestMove(currentBoard);
    } else {
      // Casual mode: 60% random, 40% smart
      const available = currentBoard
        .map((val, idx) => (val === null ? idx : null))
        .filter((val) => val !== null);
      if (Math.random() < 0.6 && available.length > 0) {
        chosenIndex = available[Math.floor(Math.random() * available.length)];
      } else {
        chosenIndex = findBestMove(currentBoard);
      }
    }

    if (chosenIndex !== null && chosenIndex !== undefined) {
      const nextBoard = [...currentBoard];
      nextBoard[chosenIndex] = 'O';
      setBoard(nextBoard);

      const taunts = [
        'Calculating 4 steps ahead!',
        'A bold move, but Minimax never sleeps.',
        'Corner trap? I wrote that algorithm.',
        'Nice try! Let us see your response.',
      ];
      setBotTaunt(taunts[Math.floor(Math.random() * taunts.length)]);

      const winner = checkWinner(nextBoard);
      if (winner) {
        finishGame(winner, nextBoard);
      } else {
        setIsPlayerTurn(true);
      }
    }
  };

  const finishGame = (winner, finalBoard) => {
    if (winner === 'X') {
      setGameStatus('won');
      setScores((s) => ({ ...s, player: s.player + 1 }));
      setBotTaunt('IMPOSSIBLE! You defied the algorithm! Masterfully played!');
      confetti({
        particleCount: 90,
        spread: 60,
        origin: { y: 0.8 },
      });
    } else if (winner === 'O') {
      setGameStatus('lost');
      setScores((s) => ({ ...s, bot: s.bot + 1 }));
      setBotTaunt('Checkmate! The Minimax algorithm reigns supreme.');
    } else if (winner === 'tie') {
      setGameStatus('draw');
      setScores((s) => ({ ...s, ties: s.ties + 1 }));
      setBotTaunt('A hard-fought stalemate! Perfect play from both sides.');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setGameStatus('playing');
    setBotTaunt('New round started! You are X, I am O.');
  };

  return (
    <>
      {/* Floating Bottom-Right Launcher Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="brutal-btn p-4 bg-electric text-ink rounded-full flex items-center gap-2 group shadow-[4px_4px_0px_#111111]"
            aria-label="Open AI Assistant & Tic-Tac-Toe"
          >
            <div className="relative">
              <Bot className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-sky border border-ink"></span>
            </div>
            <span className="text-xs font-black uppercase tracking-wider hidden sm:inline">
              Chat & Play 🎮
            </span>
          </button>
        )}
      </div>

      {/* Floating Chat & Game Widget Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-[400px] h-[550px] bg-white border-3 border-ink shadow-[8px_8px_0px_#111111] flex flex-col overflow-hidden">
          
          {/* Header */}
          <div className="bg-ink text-white p-3.5 flex items-center justify-between border-b-2 border-ink">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-electric border border-white"></div>
              <span className="font-display text-lg uppercase tracking-wide">
                CHAITANYA.AI // SYSTEM
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              aria-label="Close widget"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Dual Mode Switcher Tabs */}
          <div className="grid grid-cols-2 bg-[#F8F9FA] border-b-2 border-ink text-xs font-black uppercase">
            <button
              onClick={() => setActiveTab('chat')}
              className={`py-2.5 flex items-center justify-center gap-2 border-r-2 border-ink transition-colors ${
                activeTab === 'chat'
                  ? 'bg-electric text-ink'
                  : 'text-ink/70 hover:bg-white'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Ask Bot</span>
            </button>
            <button
              onClick={() => setActiveTab('game')}
              className={`py-2.5 flex items-center justify-center gap-2 transition-colors ${
                activeTab === 'game'
                  ? 'bg-sky text-white'
                  : 'text-ink/70 hover:bg-white'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Tic-Tac-Toe</span>
            </button>
          </div>

          {/* TAB 1: ASK BOT CHAT */}
          {activeTab === 'chat' && (
            <div className="flex-1 flex flex-col justify-between overflow-hidden p-3 bg-white">
              {/* Message Feed */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-2 ${
                      msg.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.sender === 'bot' && (
                      <div className="w-6 h-6 rounded-full bg-electric border border-ink flex items-center justify-center shrink-0 mt-0.5">
                        <Bot className="w-3.5 h-3.5 text-ink" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-3 text-xs leading-relaxed border-2 border-ink ${
                        msg.sender === 'user'
                          ? 'bg-sky text-white shadow-[2px_2px_0px_#111111]'
                          : 'bg-[#F8F9FA] text-ink shadow-[2px_2px_0px_#111111]'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={chatBottomRef} />
              </div>

              {/* Quick Prompt Chips */}
              <div className="py-2 border-t border-ink/10 flex gap-1.5 overflow-x-auto no-scrollbar">
                {quickChips.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(chip)}
                    className="whitespace-nowrap px-2.5 py-1 bg-[#F8F9FA] hover:bg-electric border border-ink text-[10px] font-bold text-ink shrink-0 transition-colors shadow-[1px_1px_0px_#111111]"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Input Box */}
              <div className="flex gap-2 pt-2 border-t-2 border-ink">
                <input
                  type="text"
                  placeholder="Ask about projects, hackathons, or tech..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 px-3 py-2 text-xs border-2 border-ink focus:outline-none focus:bg-pastelPink/20"
                />
                <button
                  onClick={() => handleSendMessage()}
                  className="brutal-btn px-3 py-2 bg-electric text-ink"
                  aria-label="Send message"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: PLAY TIC-TAC-TOE */}
          {activeTab === 'game' && (
            <div className="flex-1 flex flex-col justify-between p-4 bg-[#F8F9FA]">
              {/* Game Status & Controls Bar */}
              <div className="flex items-center justify-between pb-3 border-b-2 border-ink">
                {/* Difficulty Select */}
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-ink">
                    AI Mode:
                  </span>
                  <select
                    value={difficulty}
                    onChange={(e) => {
                      setDifficulty(e.target.value);
                      resetGame();
                    }}
                    className="text-[11px] font-bold border-2 border-ink px-1.5 py-0.5 bg-white uppercase"
                  >
                    <option value="unbeatable">Unbeatable (Minimax)</option>
                    <option value="casual">Casual Mode</option>
                  </select>
                </div>

                {/* Reset Button */}
                <button
                  onClick={resetGame}
                  className="brutal-btn px-2.5 py-1 bg-white hover:bg-electric text-[10px] font-bold uppercase flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Restart</span>
                </button>
              </div>

              {/* Scoreboard */}
              <div className="grid grid-cols-3 gap-2 my-2 text-center">
                <div className="bg-white border-2 border-ink p-1.5 shadow-[2px_2px_0px_#111111]">
                  <div className="text-[10px] font-bold text-sky uppercase">Player (X)</div>
                  <div className="font-display text-xl text-ink">{scores.player}</div>
                </div>
                <div className="bg-white border-2 border-ink p-1.5 shadow-[2px_2px_0px_#111111]">
                  <div className="text-[10px] font-bold text-ink/60 uppercase">Ties</div>
                  <div className="font-display text-xl text-ink">{scores.ties}</div>
                </div>
                <div className="bg-white border-2 border-ink p-1.5 shadow-[2px_2px_0px_#111111]">
                  <div className="text-[10px] font-bold text-red-500 uppercase">Bot (O)</div>
                  <div className="font-display text-xl text-ink">{scores.bot}</div>
                </div>
              </div>

              {/* Bot Trash-talk Bubble */}
              <div className="bg-white border-2 border-ink p-2 mb-2 text-center text-xs font-bold text-ink shadow-[2px_2px_0px_#111111] flex items-center justify-center gap-1.5">
                <Bot className="w-3.5 h-3.5 text-electric shrink-0" />
                <span className="truncate italic">&ldquo;{botTaunt}&rdquo;</span>
              </div>

              {/* 3x3 Interactive Grid */}
              <div className="grid grid-cols-3 gap-2 max-w-[260px] mx-auto w-full aspect-square my-auto">
                {board.map((cell, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleCellClick(idx)}
                    disabled={cell !== null || gameStatus !== 'playing' || !isPlayerTurn}
                    className={`border-3 border-ink flex items-center justify-center font-display text-4xl font-bold transition-all shadow-[3px_3px_0px_#111111] ${
                      cell === 'X'
                        ? 'bg-sky text-white'
                        : cell === 'O'
                        ? 'bg-electric text-ink'
                        : 'bg-white hover:bg-pastelPink/40'
                    }`}
                  >
                    {cell}
                  </button>
                ))}
              </div>

              {/* Game Result Banner */}
              {gameStatus !== 'playing' && (
                <div className="mt-2 p-2 bg-ink text-white border-2 border-ink text-center flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-electric">
                    {gameStatus === 'won' && '🎉 VICTORY! YOU DEFEATED THE AI!'}
                    {gameStatus === 'lost' && '🤖 BOT VICTORIOUS! TRY AGAIN!'}
                    {gameStatus === 'draw' && '⚖️ STALEMATE! HONORABLE DRAW!'}
                  </span>
                  <button
                    onClick={resetGame}
                    className="px-2 py-0.5 bg-electric text-ink text-[10px] font-bold uppercase"
                  >
                    Play Again
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      )}
    </>
  );
}
