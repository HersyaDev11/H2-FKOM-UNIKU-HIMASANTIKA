'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface Message {
  id: string;
  type: 'bot' | 'user';
  text: string;
}

const PRESET_RESPONSES: Record<string, string> = {
  daftar: "Pendaftaran Mahasiswa Baru (PMB) Prodi Teknik Informatika UMC dibuka 100% secara daring! Anda dapat langsung mengakses portal resmi di https://pmb.umc.ac.id. Tersedia Jalur Reguler, Jalur Prestasi (Rapor/Kejuaraan), dan Jalur Beasiswa KIP.",
  kurikulum: "Kurikulum Teknik Informatika UMC dirancang berbasis Outcome-Based Education (OBE) dan standar IEEE/ACM dengan 5 bidang keahlian utama: Rekayasa Perangkat Lunak, Kecerdasan Buatan (AI & ML), Jaringan Komputer & Cyber Security, Data Science, dan Cloud Computing.",
  beasiswa: "Teknik Informatika UMC menyediakan berbagai program beasiswa: Beasiswa KIP-Kuliah (Full Gratis & Uang Saku), Beasiswa Kader Persyarikatan Muhammadiyah, Beasiswa Tahfidz Quran, Beasiswa Prestasi Juara, dan Beasiswa Mitra Industri.",
  biaya: "Biaya kuliah di Teknik Informatika UMC sangat kompetitif dan terjangkau dengan skema cicilan fleksibel tanpa bunga. Detail rincian UKT & DPP dapat Anda lihat langsung di menu biaya pada https://pmb.umc.ac.id.",
  akreditasi: "Program Studi Teknik Informatika Universitas Muhammadiyah Cirebon telah terakreditasi oleh LAM-INFOKOM / BAN-PT dengan jaminan standar mutu pendidikan dan fasilitas laboratorium komputer terpadu.",
};

const getBotResponse = (input: string): string => {
  const lower = input.toLowerCase();
  if (lower.includes('daftar') || lower.includes('syarat') || lower.includes('masuk') || lower.includes('pmb')) {
    return PRESET_RESPONSES.daftar;
  }
  if (lower.includes('kurikulum') || lower.includes('kuliah') || lower.includes('peminatan') || lower.includes('matkul') || lower.includes('belajar')) {
    return PRESET_RESPONSES.kurikulum;
  }
  if (lower.includes('beasiswa') || lower.includes('kip') || lower.includes('kader') || lower.includes('gratis')) {
    return PRESET_RESPONSES.beasiswa;
  }
  if (lower.includes('biaya') || lower.includes('spp') || lower.includes('bayar') || lower.includes('ukt')) {
    return PRESET_RESPONSES.biaya;
  }
  if (lower.includes('akreditasi') || lower.includes('status') || lower.includes('kualitas')) {
    return PRESET_RESPONSES.akreditasi;
  }
  return "Terima kasih atas pesan Anda! 😊 Saya asisten virtual Prodi Teknik Informatika UMC. Untuk konsultasi langsung atau pertanyaan khusus, Anda dapat mengunjungi laman resmi https://pmb.umc.ac.id atau menghubungi hotline admisi UMC. Ada yang bisa kami bantu lagi?";
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      type: 'bot', 
      text: 'Halo! 👋 Selamat datang di Teknik Informatika UMC. Ada yang bisa kami bantu terkait pendaftaran PMB, kurikulum, peminatan, atau program beasiswa?' 
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const chatRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const pulseAnimRef = useRef<gsap.core.Tween | null>(null);

  // Smooth Auto-Scroll to bottom whenever messages or typing state change
  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      setTimeout(() => {
        if (chatBodyRef.current) {
          chatBodyRef.current.scrollTo({
            top: chatBodyRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 50);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Pulse effect for the floating button when closed
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
        { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.45, ease: 'back.out(1.2)', transformOrigin: 'bottom right' }
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
        duration: 0.28,
        ease: 'power3.in',
        onComplete: () => setIsOpen(false)
      });
    } else {
      setIsOpen(true);
    }
  };

  const handleSendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;
    
    // 1. Add user message with unique ID
    const userMsg: Message = { id: `user-${Date.now()}`, type: 'user', text: trimmed };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    
    // 2. Smoothly display typing indicator
    setIsTyping(true);
    
    // 3. Realistic dynamic delay based on reply length
    const botReplyText = getBotResponse(trimmed);
    const delay = Math.min(1400, Math.max(800, botReplyText.length * 10));
    
    setTimeout(() => {
      setIsTyping(false);
      const botMsg: Message = { 
        id: `bot-${Date.now()}`, 
        type: 'bot', 
        text: botReplyText
      };
      setMessages(prev => [...prev, botMsg]);
    }, delay);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] flex flex-col items-end" style={{ fontFamily: "'Mori', sans-serif" }}>
      
      {/* Chat Window */}
      <div 
        ref={chatRef}
        className={`${isOpen ? 'flex' : 'hidden'} w-[calc(100vw-32px)] max-w-[380px] h-[520px] max-h-[calc(100vh-100px)] bg-[#111111]/90 backdrop-blur-2xl border border-neutral-800/80 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] mb-4 sm:mb-5 flex-col overflow-hidden`}
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
              <p className="text-[13px] text-neutral-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                Online
              </p>
            </div>
          </div>
          <button 
            onClick={toggleChat} 
            className="w-9 h-9 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full bg-neutral-800/50 text-neutral-300 hover:text-white hover:bg-neutral-700 transition-all duration-300 cursor-pointer"
            aria-label="Tutup Jendela Chat"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Chat Body with Smooth Animated Messages */}
        <div ref={chatBodyRef} className="flex-1 p-5 overflow-y-auto flex flex-col gap-4 custom-scrollbar">
          
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div 
                key={msg.id} 
                initial={{ opacity: 0, y: 14, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'items-end gap-2.5'}`}
              >
                {msg.type === 'bot' && (
                  <motion.div 
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                    className="w-8 h-8 bg-gradient-to-tr from-[#DF1A22] to-[#ff4b52] rounded-full shrink-0 flex items-center justify-center text-white text-[11px] font-bold shadow-md mb-1 select-none"
                  >
                    TI
                  </motion.div>
                )}
                <div className={`
                  p-4 rounded-2xl text-[14px] leading-relaxed max-w-[85%] shadow-sm transition-shadow duration-300
                  ${msg.type === 'user' 
                    ? 'bg-[#DF1A22] text-white rounded-br-sm shadow-[0_4px_16px_rgba(223,26,34,0.3)]' 
                    : 'bg-[#1A1A1A] border border-neutral-800/90 text-[#F0F0F0] rounded-bl-sm'}
                `}>
                  {msg.text}
                </div>
              </motion.div>
            ))}

            {/* Smooth Animated Typing Indicator */}
            {isTyping && (
              <motion.div 
                key="typing-indicator"
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.92, transition: { duration: 0.2 } }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="flex items-end gap-2.5"
              >
                <div className="w-8 h-8 bg-gradient-to-tr from-[#DF1A22] to-[#ff4b52] rounded-full shrink-0 flex items-center justify-center text-white text-[11px] font-bold shadow-md mb-1">
                  TI
                </div>
                <div className="bg-[#1A1A1A] border border-neutral-800/90 py-3.5 px-4.5 rounded-2xl rounded-bl-sm flex items-center gap-1.5 w-fit shadow-sm">
                  <span className="w-2 h-2 bg-[#DF1A22] rounded-full animate-bounce" style={{ animationDuration: '0.8s', animationDelay: '0s' }}></span>
                  <span className="w-2 h-2 bg-[#DF1A22] rounded-full animate-bounce" style={{ animationDuration: '0.8s', animationDelay: '0.18s' }}></span>
                  <span className="w-2 h-2 bg-[#DF1A22] rounded-full animate-bounce" style={{ animationDuration: '0.8s', animationDelay: '0.36s' }}></span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Preset Suggestion Chips (Smooth Fade In on Start) */}
          {messages.length === 1 && !isTyping && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="flex flex-col gap-2 mt-2 items-end"
            >
              {[
                "Cara Daftar & Syarat Masuk",
                "Info Kurikulum Terbaru",
                "Peluang Beasiswa"
              ].map((chip, idx) => (
                <button 
                  key={idx}
                  onClick={() => handleSendMessage(chip)} 
                  className="bg-[#DF1A22]/10 hover:bg-[#DF1A22] border border-[#DF1A22]/30 hover:border-[#DF1A22] text-[#DF1A22] hover:text-white text-[13px] px-4.5 py-2.5 min-h-[44px] flex items-center rounded-full transition-all duration-300 w-fit text-left shadow-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  {chip}
                </button>
              ))}
            </motion.div>
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
              className="w-full bg-[#1A1A1A] text-[#FFFFFF] text-[14px] pl-5 pr-14 py-3.5 rounded-full outline-none border border-neutral-800 focus:border-[#DF1A22]/60 transition-colors shadow-inner placeholder:text-neutral-500"
            />
            <button 
              type="submit" 
              disabled={!inputText.trim() || isTyping} 
              aria-label="Kirim Pesan" 
              className="absolute right-2 w-10 h-10 min-w-[40px] min-h-[40px] bg-[#DF1A22] text-white rounded-full flex items-center justify-center hover:bg-[#B3151B] disabled:opacity-40 disabled:hover:bg-[#DF1A22] disabled:hover:scale-100 transition-transform duration-300 hover:scale-105 shadow-md cursor-pointer disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-0.5 mt-0.5">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* Floating Action Button with Status Ring */}
      <button 
        ref={buttonRef}
        onClick={toggleChat}
        aria-label={isOpen ? "Tutup Chat" : "Buka Chat Asisten Virtual"}
        className={`w-13 h-13 sm:w-16 sm:h-16 min-w-[50px] min-h-[50px] rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95 z-50 cursor-pointer ${isOpen ? 'bg-[#1A1A1A] border border-neutral-800 text-white shadow-lg rotate-180' : 'bg-gradient-to-tr from-[#DF1A22] to-[#ff4b52] text-white shadow-[0_8px_20px_rgba(223,26,34,0.4)]'}`}
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
