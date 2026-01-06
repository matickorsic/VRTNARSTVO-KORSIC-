import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Image as ImageIcon, Loader2, Sprout, Bot } from 'lucide-react';
import { generateGardenAdvice } from '../services/geminiService';
import { ChatMessage, MessageRole } from '../types';

export const PlantDoctor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: MessageRole.MODEL,
      text: "Pozdravljeni! Sem rastlinski strokovnjak Vrtnarstva Koršič. 🌿 Kako vam lahko danes pomagam pri vašem vrtu? Za diagnozo lahko naložite fotografijo svoje rastline!"
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if ((!input.trim() && !selectedImage) || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: MessageRole.USER,
      text: input,
      image: selectedImage || undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    const currentImage = selectedImage;
    setSelectedImage(null); // Clear image after sending
    setIsLoading(true);

    try {
      const responseText = await generateGardenAdvice(userMessage.text || "Analiziraj to sliko", currentImage || undefined);
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: MessageRole.MODEL,
        text: responseText
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: MessageRole.MODEL,
        text: "Imam težave pri povezovanju z bazo podatkov rastlinjaka. Prosimo, poskusite kasneje.",
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 bg-nature-600 text-white p-4 rounded-full shadow-2xl hover:bg-nature-700 transition-all duration-300 hover:scale-110 flex items-center gap-2 group ${isOpen ? 'opacity-0 pointer-events-none translate-y-10' : 'opacity-100'}`}
      >
        <Sprout className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-medium whitespace-nowrap">
          Vprašajte strokovnjaka
        </span>
      </button>

      {/* Chat Interface */}
      <div 
        className={`fixed z-50 bottom-6 right-6 w-full max-w-[400px] h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-300 transform origin-bottom-right border border-gray-100 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none translate-y-10'
        }`}
      >
        {/* Header */}
        <div className="bg-nature-700 p-4 rounded-t-2xl flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full">
              <Bot size={20} />
            </div>
            <div>
              <h3 className="font-bold">Rastlinski strokovnjak AI</h3>
              <p className="text-xs text-nature-100">Poganja Gemini</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-nature-50/50">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.role === MessageRole.USER ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${
                  msg.role === MessageRole.USER 
                    ? 'bg-nature-600 text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                } ${msg.isError ? 'bg-red-50 text-red-600 border-red-100' : ''}`}
              >
                {msg.image && (
                  <img src={msg.image} alt="Uporabniška slika" className="w-full h-32 object-cover rounded-lg mb-2 border border-white/20" />
                )}
                <div className="prose prose-sm max-w-none break-words whitespace-pre-wrap">
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 flex items-center gap-2 text-nature-600">
                <Loader2 size={16} className="animate-spin" />
                <span className="text-sm font-medium">Fotosintetična analiza v teku...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100 rounded-b-2xl">
          {selectedImage && (
            <div className="relative inline-block mb-2">
              <img src={selectedImage} alt="Predogled" className="h-16 w-16 object-cover rounded-lg border border-gray-200" />
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 shadow-md hover:bg-red-600"
              >
                <X size={12} />
              </button>
            </div>
          )}
          
          <div className="flex items-end gap-2">
             <button 
              onClick={() => fileInputRef.current?.click()}
              className="p-3 text-nature-600 hover:bg-nature-50 rounded-full transition-colors"
              title="Naloži fotografijo rastline"
            >
              <ImageIcon size={20} />
            </button>
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleImageSelect}
              accept="image/*"
              className="hidden"
            />
            
            <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-200 focus-within:border-nature-500 focus-within:ring-1 focus-within:ring-nature-500 transition-all flex items-end">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Vprašajte o svojih rastlinah..."
                className="w-full bg-transparent border-none focus:ring-0 p-3 max-h-32 resize-none text-sm"
                rows={1}
              />
            </div>
            
            <button 
              onClick={handleSend}
              disabled={isLoading || (!input.trim() && !selectedImage)}
              className="p-3 bg-nature-600 text-white rounded-full hover:bg-nature-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
            >
              <Send size={18} />
            </button>
          </div>
          <p className="text-center text-[10px] text-gray-400 mt-2">
            AI se lahko zmoti. Za kritične nasvete se posvetujte z našim osebjem.
          </p>
        </div>
      </div>
    </>
  );
};