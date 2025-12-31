
import React, { useState, useEffect } from 'react';
import FestiveBackground from './components/FestiveBackground';
import CountdownTimer from './components/CountdownTimer';
import { generateEvaGreeting } from './services/geminiService';
import { GeminiResponse } from './types';

const App: React.FC = () => {
  const [isFinished, setIsFinished] = useState(false);
  const [aiGreeting, setAiGreeting] = useState<GeminiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGreeting = async () => {
      const data = await generateEvaGreeting();
      setAiGreeting(data);
      setIsLoading(false);
    };
    fetchGreeting();
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 selection:bg-blue-100 bg-white">
      <FestiveBackground />

      <main className="relative z-10 max-w-2xl w-full text-center space-y-10 py-12">
        {/* Header */}
        <header className="space-y-2 animate-in fade-in duration-1000">
          <p className="text-sm font-bold tracking-[0.3em] text-[#4285F4] uppercase">New Year Holiday</p>
          <h1 className="text-5xl md:text-7xl font-light tracking-tight text-[#202124]">
            Eva, 假期快乐
          </h1>
        </header>

        {/* Countdown Section */}
        <section className="bg-white/40 backdrop-blur-md rounded-[2.5rem] p-10 google-shadow animate-in zoom-in duration-700">
          <p className="text-xs font-semibold text-[#5f6368] uppercase tracking-widest mb-6">距离 17:00 打车时间还剩</p>
          <CountdownTimer onComplete={() => setIsFinished(true)} />
        </section>

        {/* Taxi Reminder Message */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <div className="inline-flex items-center space-x-3 px-6 py-3 bg-[#f8f9fa] rounded-full border border-gray-100">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <p className="text-[#202124] text-sm font-medium">
              温馨提示：记得 17:00 准时叫车，平安回家。
            </p>
          </div>
        </div>

        {/* AI Greeting */}
        <section className="pt-6 animate-in fade-in duration-1000 delay-500">
          {isLoading ? (
            <div className="flex justify-center space-x-1 opacity-20">
              {[0, 1, 2].map(i => <div key={i} className="w-1.5 h-1.5 bg-black rounded-full animate-bounce" style={{animationDelay: `${i*0.15}s`}} />)}
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xl text-[#202124] font-medium tracking-tight">
                {aiGreeting?.greeting}
              </p>
              <div className="text-[#5f6368] text-sm font-light leading-relaxed whitespace-pre-line italic">
                {aiGreeting?.poem}
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="fixed bottom-8 opacity-30">
        <span className="text-[10px] font-bold tracking-[0.4em] text-[#5f6368] uppercase">
          Happy New Year 2025 • Stay Safe
        </span>
      </footer>
    </div>
  );
};

export default App;
