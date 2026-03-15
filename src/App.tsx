import React from 'react';
import MusicPlayer from './components/MusicPlayer';
import SnakeGame from './components/SnakeGame';
import { Music, Gamepad2, Zap } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#FFF0F5] text-pink-900 font-sans selection:bg-pink-200">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-pink-300/20 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-rose-400/20 blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-pink-100 backdrop-blur-md bg-white/40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(244,114,182,0.3)]">
              <Zap size={24} className="text-white fill-white" />
            </div>
            <div>
              <h1 className="text-xl font-black uppercase tracking-tighter leading-none text-pink-600">Sweet Rhythm</h1>
              <span className="text-[10px] text-rose-400 font-mono uppercase tracking-[0.2em]">Princess Edition</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-pink-700 hover:text-rose-500 transition-colors">Best Friends</a>
            <a href="#" className="text-sm font-medium text-pink-400 hover:text-pink-600 transition-colors">My Songs</a>
            <a href="#" className="text-sm font-medium text-pink-400 hover:text-pink-600 transition-colors">Closet</a>
          </nav>

          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-white/50 border border-pink-100 rounded-full text-xs font-mono text-pink-400">
              v1.0.4-sweet
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Sidebar - Stats & Info */}
          <div className="lg:col-span-3 space-y-8 order-2 lg:order-1">
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-pink-500">
                <Gamepad2 size={18} />
                <h2 className="text-xs font-bold uppercase tracking-widest">Game Magic</h2>
              </div>
              <div className="p-6 bg-white/60 border border-pink-100 rounded-3xl space-y-6 shadow-sm">
                <div className="space-y-1">
                  <span className="text-[10px] text-pink-300 uppercase tracking-widest font-mono">Sparkle Level</span>
                  <div className="h-1 w-full bg-pink-100 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-pink-400" />
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-pink-300 uppercase tracking-widest font-mono">Friendship Power</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                    <span className="text-sm font-mono text-pink-600">Infinite</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-2 text-rose-400">
                <Music size={18} />
                <h2 className="text-xs font-bold uppercase tracking-widest">Sweet Tunes</h2>
              </div>
              <MusicPlayer />
            </section>
          </div>

          {/* Center - Game Window */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative">
              {/* Decorative Frame */}
              <div className="absolute -inset-4 bg-gradient-to-b from-pink-100/50 to-transparent rounded-[40px] pointer-events-none border border-pink-200/50" />
              <SnakeGame />
            </div>
          </div>

          {/* Right Sidebar - Social/History */}
          <div className="lg:col-span-3 space-y-8 order-3">
            <section className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-pink-300">Recent Magic</h2>
              <div className="space-y-4">
                {[
                  { user: 'Princess_Lily', action: 'Found 12 hearts', time: '2m ago' },
                  { user: 'SparkleGamer', action: 'Started a party', time: '5m ago' },
                  { user: 'SweetSnake', action: 'New High Score!', time: '12m ago' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-white/60 border border-pink-100 rounded-2xl hover:bg-white/80 transition-colors cursor-pointer shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-200 to-rose-100 border border-pink-100" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate text-pink-800">{item.user}</p>
                      <p className="text-xs text-pink-400 truncate">{item.action}</p>
                    </div>
                    <span className="text-[10px] font-mono text-pink-300 whitespace-nowrap">{item.time}</span>
                  </div>
                ))}
              </div>
            </section>

            <div className="p-6 bg-rose-100/50 border border-rose-200 rounded-3xl">
              <h3 className="text-sm font-bold text-rose-500 mb-2">Sweet Tip</h3>
              <p className="text-xs text-pink-700/70 leading-relaxed">
                The ochre snake loves pink treats! Collect them to grow your pretty tail.
              </p>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-pink-100 py-8 mt-12 bg-white/20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-pink-300 font-mono">
            &copy; 2026 SWEET RHYTHM ARCADE. MADE WITH LOVE.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-pink-400 hover:text-pink-600 transition-colors">Privacy</a>
            <a href="#" className="text-xs text-pink-400 hover:text-pink-600 transition-colors">Terms</a>
            <a href="#" className="text-xs text-pink-400 hover:text-pink-600 transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
