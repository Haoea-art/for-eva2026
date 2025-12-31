
import React, { useState, useEffect } from 'react';
import { TimeRemaining } from '../types';

interface Props {
  onComplete: () => void;
}

const CountdownTimer: React.FC<Props> = ({ onComplete }) => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({ 
    hours: 0, 
    minutes: 0, 
    seconds: 0, 
    isPast: false 
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      // 获取北京时间 (UTC+8)
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const beijingNow = new Date(utc + (3600000 * 8));
      
      // 设置目标时间为今天的 17:00
      let targetDate = new Date(beijingNow);
      targetDate.setHours(17, 0, 0, 0);

      // 如果现在已经过了 17:00，就设为明天的 17:00 (或者根据需求停止)
      if (beijingNow.getTime() > targetDate.getTime()) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, isPast: true });
        onComplete();
        return;
      }

      const diff = targetDate.getTime() - beijingNow.getTime();

      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ hours: h, minutes: m, seconds: s, isPast: false });
    };

    const timer = setInterval(calculateTime, 1000);
    calculateTime();
    return () => clearInterval(timer);
  }, [onComplete]);

  const TimeUnit = ({ value, label, color }: { value: number; label: string; color: string }) => (
    <div className="flex flex-col items-center mx-2 md:mx-4">
      <div className="text-5xl md:text-7xl font-medium tracking-tight text-[#3c4043] tabular-nums">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-[10px] font-bold uppercase tracking-widest mt-1" style={{ color }}>
        {label}
      </div>
    </div>
  );

  if (timeLeft.isPast) {
    return (
      <div className="text-center animate-bounce">
        <h2 className="text-2xl md:text-4xl font-semibold text-[#4285F4]">
          🚖 17:00 已到，该打车回家啦！
        </h2>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center">
      <TimeUnit value={timeLeft.hours} label="Hours" color="#4285F4" />
      <span className="text-4xl text-gray-300 pb-6">:</span>
      <TimeUnit value={timeLeft.minutes} label="Min" color="#EA4335" />
      <span className="text-4xl text-gray-300 pb-6">:</span>
      <TimeUnit value={timeLeft.seconds} label="Sec" color="#34A853" />
    </div>
  );
};

export default CountdownTimer;
