'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface Message {
  id: string;
  type: 'bot' | 'user';
  text: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', type: 'bot', text: 'Halo! 👋 Selamat datang di Teknik Informatika UMC. Ada yang bisa kami bantu terkait pendaftaran, kurikulum, atau hal lainnya?' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const chatRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const pulseAnimRef = useRef<gsap.core.Tween | null>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Pulse effect for the floating button when it's closed
  useEffect(() => {
    if (buttonRef.current && !isOpen) {
      pulseAnimRef.current = gsap.to(buttonRef.current, {
        boxShadow: '0 0 0 12px rgba(223, 26, 34, 0)',
        repeat: -1,
        duration: 2,
        ease: 'power2.out',
      });
      gsap.set(buttonRef.current, { boxShadow: '0 0 0 0 rgba(223, 26, 34, 0.4)' });
    }

    if (isOpen && pulseAnimRef.current) {
      pulseAnimRef.current.kill();
      if (buttonRef.current) gsap.set(buttonRef.current, { boxShadow: 'none' });
    }
    
    return () => {
      if (pulseAnimRef.current) pulseAnimRef.current.kill();
    };
  }, [isOpen]);

  // Open animation for the chat window
  useGSAP(() => {
    if (isOpen && chatRef.current) {
      gsap.fromTo(
        chatRef.current,
        { opacity: 0, y: 30, scale: 0.9, filter: 'blur(10px)' },
        { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.5, ease: 'back.out(1.2)', transformOrigin: 'bottom right' }
      );

      gsap.fromTo(
        '.chat-stagger',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 0.2 }
      );
    }
  }, [isOpen]);

  const toggleChat = () => {
    if (isOpen && chatRef.current) {
      gsap.to(chatRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.95,
        filter: 'blur(5px)',
        duration: 0.3,
        ease: 'power3.in',
        onComplete: () => setIsOpen(false)
      });
    } else {
      setIsOpen(true);
    }
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMsg: Message = { id: Date.now().toString(), type: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    
    // Simulate bot typing
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      const botMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        type: 'bot', 
        text: 'Terima kasih atas pesannya! 😊 Saat ini saya hanya asisten demo. Untuk informasi lebih lengkap mengenai pendaftaran, Anda bisa menghubungi nomor WhatsApp admin kami yang tertera di Footer website. Ada hal lain yang ingin ditelusuri?' 
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1500);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] flex flex-col items-end" style={{ fontFamily: "'Mori', sans-serif" }}>
      
      {/* Chat Window */}
      <div 
        ref={chatRef}
        className={`${isOpen ? 'flex' : 'hidden'} w-[calc(100vw-32px)] max-w-[380px] h-[520px] max-h-[calc(100vh-100px)] bg-[#111111]/85 backdrop-blur-2xl border border-neutral-800/80 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] mb-4 sm:mb-5 flex-col overflow-hidden`}
      >
        {/* Header */}
        <div className="border-b border-neutral-800/60 p-5 flex justify-between items-center bg-white/[0.02] shrink-0">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-tr from-[#DF1A22] to-[#ff4b52] rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                TI
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#111111] rounded-full"></div>
            </div>
            <div>
              <h4 className="font-semibold tracking-tight text-[16px] text-white">Asisten Virtual UMC</h4>
              <p className="text-[13px] text-neutral-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                Online
              </p>
            </div>
          </div>
          <button onClick={toggleChat} className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-800/50 text-neutral-400 hover:text-white hover:bg-neutral-700 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Chat Body */}
        <div ref={chatBodyRef} className="flex-1 p-5 overflow-y-auto flex flex-col gap-5 custom-scrollbar">
          
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-stagger flex ${msg.type === 'user' ? 'justify-end' : 'items-end gap-3'}`}>
              {msg.type === 'bot' && (
                <div className="w-8 h-8 bg-gradient-to-tr from-[#DF1A22] to-[#ff4b52] rounded-full shrink-0 flex items-center justify-center text-white text-[11px] font-bold shadow-md mb-1">
                  TI
                </div>
              )}
              <div className={`
                p-4 rounded-2xl text-[14px] leading-relaxed max-w-[85%] shadow-sm
                ${msg.type === 'user' 
                  ? 'bg-[#DF1A22] text-white rounded-br-sm' 
                  : 'bg-[#1A1A1A]/80 border border-neutral-800/80 text-[#E5E5E5] rounded-bl-sm'}
              `}>
                {msg.text}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-end gap-3">
              <div className="w-8 h-8 bg-gradient-to-tr from-[#DF1A22] to-[#ff4b52] rounded-full shrink-0 flex items-center justify-center text-white text-[11px] font-bold shadow-md mb-1">
                TI
              </div>
              <div className="bg-[#1A1A1A]/80 border border-neutral-800/80 py-4 px-5 rounded-2xl rounded-bl-sm flex items-center gap-1.5 w-fit">
                <span className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </div>
          )}
          
          {/* Preset Options (Only show if no messages sent yet, besides the first one) */}
          {messages.length === 1 && !isTyping && (
            <div className="flex flex-col gap-2.5 mt-2 items-end">
               <button onClick={() => handleSendMessage("Cara Daftar & Syarat Masuk")} className="chat-stagger bg-[#DF1A22]/10 hover:bg-[#DF1A22] border border-[#DF1A22]/30 hover:border-[#DF1A22] text-[#DF1A22] hover:text-white text-[13px] px-5 py-2.5 rounded-full transition-all duration-300 w-fit text-left shadow-sm">
                 Cara Daftar & Syarat Masuk
               </button>
               <button onClick={() => handleSendMessage("Info Kurikulum Terbaru")} className="chat-stagger bg-[#DF1A22]/10 hover:bg-[#DF1A22] border border-[#DF1A22]/30 hover:border-[#DF1A22] text-[#DF1A22] hover:text-white text-[13px] px-5 py-2.5 rounded-full transition-all duration-300 w-fit text-left shadow-sm">
                 Info Kurikulum Terbaru
               </button>
               <button onClick={() => handleSendMessage("Peluang Beasiswa")} className="chat-stagger bg-[#DF1A22]/10 hover:bg-[#DF1A22] border border-[#DF1A22]/30 hover:border-[#DF1A22] text-[#DF1A22] hover:text-white text-[13px] px-5 py-2.5 rounded-full transition-all duration-300 w-fit text-left shadow-sm">
                 Peluang Beasiswa
               </button>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-neutral-800/60 bg-white/[0.01] shrink-0">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputText);
            }} 
            className="relative flex items-center"
          >
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Tulis pesan Anda..." 
              className="w-full bg-[#1A1A1A] text-[#FFFFFF] text-[14px] pl-5 pr-12 py-3.5 rounded-full outline-none border border-neutral-800 focus:border-[#DF1A22]/50 transition-colors shadow-inner"
            />
            <button type="submit" disabled={!inputText.trim()} className="absolute right-2 w-9 h-9 bg-[#DF1A22] text-white rounded-full flex items-center justify-center hover:bg-[#B3151B] disabled:opacity-50 disabled:hover:bg-[#DF1A22] disabled:hover:scale-100 transition-transform duration-300 hover:scale-105 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-0.5 mt-0.5">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* Floating Button */}
      <button 
        ref={buttonRef}
        onClick={toggleChat}
        aria-label={isOpen ? "Tutup Chat" : "Buka Chat Asisten Virtual"}
        className={`w-11 h-11 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95 z-50 ${isOpen ? 'bg-[#1A1A1A] border border-neutral-800 text-white shadow-lg rotate-180' : 'bg-gradient-to-tr from-[#DF1A22] to-[#ff4b52] text-white shadow-[0_8px_20px_rgba(223,26,34,0.4)]'}`}
      >
        {isOpen ? (
          <svg className="w-4 h-4 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg className="w-5 h-5 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>

      {/* Global CSS for custom scrollbar hidden within component */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #333;
          border-radius: 10px;
        }
      `}} />
    </div>
  );
}
