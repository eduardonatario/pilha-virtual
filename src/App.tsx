import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Info, Power, ChevronRight, X, ToggleLeft, ToggleRight } from 'lucide-react';

interface BatteryComponent {
  id: string;
  name: string;
  description: string;
  color: string;
}

const COMPONENTS: BatteryComponent[] = [
  {
    id: 'anodo',
    name: 'Eletrodo Negativo de Zinco (Ânodo)',
    description: 'O invólucro de zinco que sofre oxidação e libera elétrons para o fio externo.',
    color: '#94A3B8',
  },
  {
    id: 'eletrolito',
    name: 'Pasta de Eletrólito',
    description: 'Substância úmida que conduz os íons internamente para permitir o fluxo de eletricidade.',
    color: '#3B82F6',
  },
  {
    id: 'separador',
    name: 'Separador',
    description: 'Uma barreira que impede o contato direto entre o ânodo e o cátodo, evitando um curto-circuito.',
    color: '#E2E8F0',
  },
  {
    id: 'mistura',
    name: 'Mistura de Carbono e Dióxido de Manganês',
    description: 'Envolve o cátodo e ajuda a prevenir o acúmulo de hidrogênio, mantendo a voltagem constante.',
    color: '#334155',
  },
  {
    id: 'catodo',
    name: 'Eletrodo Positivo de Carbono (Cátodo)',
    description: 'O bastão central de carbono que atrai os elétrons do circuito externo, fechando a reação química.',
    color: '#111827', 
  },
];

export default function App() {
  const [isOn, setIsOn] = useState(false);
  const [selectedComp, setSelectedComp] = useState<BatteryComponent | null>(null);

  const toggleCircuit = () => setIsOn(!isOn);

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 p-4 md:p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl flex flex-col gap-4">
        
        {/* Main Interaction Card */}
        <div className="bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col relative">
          
          {/* Header Compacto */}
          <div className="px-8 py-5 border-b border-slate-50 flex justify-between items-center bg-white/50 backdrop-blur-sm sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl transition-all ${isOn ? 'bg-yellow-100' : 'bg-slate-100'}`}>
                <Zap className={`w-5 h-5 ${isOn ? 'text-yellow-600 fill-yellow-600' : 'text-slate-400'}`} />
              </div>
              <div>
                <h1 className="text-lg font-black tracking-tight uppercase leading-none">Pilha Virtual</h1>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Laboratório de Eletroquímica</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className={`text-[10px] font-black uppercase tracking-widest ${isOn ? 'text-red-500' : 'text-slate-400'}`}>
                {isOn ? 'Circuito Fechado' : 'Circuito Aberto'}
              </span>
              <button
                onClick={toggleCircuit}
                className={`p-2 rounded-full transition-all ${isOn ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-400'}`}
                title={isOn ? "Desligar" : "Ligar"}
              >
                <Power className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Interactive SVG Area */}
          <div className="relative pt-4 md:pt-8 px-4 md:px-8 flex items-center justify-center bg-white min-h-[400px]">
            <svg viewBox="0 0 800 550" className="w-full h-full max-h-[480px] drop-shadow-sm select-none">
              
              {/* CIRCUIT PATH WITH BREAK FOR SWITCH */}
              <g className="transition-colors duration-500">
                {/* Fixed parts of the wire */}
                <path d="M 230 415 L 100 415 L 100 380" fill="none" stroke={isOn ? "#EF4444" : "#CBD5E1"} strokeWidth="12" strokeLinecap="round" />
                <path d="M 100 280 L 100 110 L 700 110 L 700 415 L 570 415" fill="none" stroke={isOn ? "#EF4444" : "#CBD5E1"} strokeWidth="12" strokeLinecap="round" />
                
                {/* Moving electrons */}
                {isOn && (
                  <g>
                    <path d="M 230 415 L 100 415 L 100 380 M 100 280 L 100 110 L 700 110 L 700 415 L 570 415" fill="none" stroke="#F87171" strokeWidth="4" strokeDasharray="10 20">
                      <animate attributeName="stroke-dashoffset" from="300" to="0" dur="2s" repeatCount="indefinite" />
                    </path>
                  </g>
                )}
              </g>

              {/* INTERRUPTOR (SWITCH) */}
              <g transform="translate(100, 330)" onClick={toggleCircuit} className="cursor-pointer group">
                <circle cx="0" cy="50" r="10" fill="#4B5563" />
                <circle cx="0" cy="-50" r="10" fill="#4B5563" />
                
                {/* Switch Arm */}
                <motion.line
                  x1="0" y1="50"
                  x2={isOn ? "0" : "-60"} y2={isOn ? "-45" : "-10"}
                  stroke="#475569" strokeWidth="12" strokeLinecap="round"
                  animate={{ x2: isOn ? 0 : -60, y2: isOn ? -45 : -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
                
                <text x="-25" y="35" textAnchor="end" className="text-[10px] font-black fill-slate-300 uppercase tracking-widest">Interruptor</text>
              </g>

              {/* LAMP (LÂMPADA) - FORMATO REDONDO */}
              <g transform="translate(400, 110)" className="cursor-pointer">
                <AnimatePresence>
                  {isOn && (
                    <motion.circle 
                      initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 0.4, scale: 2.5 }} exit={{ opacity: 0 }}
                      cx="0" cy="-60" r="40" fill="#FDE047" className="blur-3xl"
                    />
                  )}
                </AnimatePresence>
                
                {/* Vidro da Lâmpada (Redondo) */}
                <circle 
                  cx="0" cy="-60" r="50" 
                  fill={isOn ? "#FEF9C3" : "#F8FAFC"} 
                  stroke="#475569" strokeWidth="3" 
                  className="transition-colors duration-500"
                />
                
                {/* Pescoço de conexão com a base */}
                <path 
                   d="M -22 -15 L -15 0 L 15 0 L 22 -15" 
                   fill={isOn ? "#FEF9C3" : "#F8FAFC"} 
                   stroke="#475569" strokeWidth="3"
                   strokeLinejoin="round"
                />

                {/* Base de Metal */}
                <rect x="-15" y="0" width="30" height="25" rx="2" fill="#94A3B8" />
                <path d="M -15 7 L 15 7 M -15 14 L 15 14" stroke="#64748B" strokeWidth="2" />
                <path d="M -15 20 L 15 20 L 0 32 Z" fill="#475569" />
                
                <text x="0" y="-130" textAnchor="middle" className="text-[12px] font-black fill-slate-400 tracking-[0.2em] uppercase">Lâmpada</text>
              </g>

              {/* BATTERY (PILHA) */}
              <g transform="translate(400, 460)">
                <rect x="-170" y="-110" width="340" height="130" rx="20" fill="#FACC15" stroke="#475569" strokeWidth="3" />
                <g transform="translate(-160, -100)">
                  <rect x="0" y="0" width="100" height="110" rx="10" fill="#94A3B8" className="hover:opacity-80 cursor-pointer" onClick={() => setSelectedComp(COMPONENTS[0])} />
                  <text x="50" y="55" transform="rotate(-90 50,55)" textAnchor="middle" className="text-[10px] font-black fill-white pointer-events-none uppercase tracking-widest opacity-60">Ânodo</text>
                  <rect x="100" y="0" width="50" height="110" fill="#3B82F6" className="hover:opacity-80 cursor-pointer" onClick={() => setSelectedComp(COMPONENTS[1])} />
                  <text x="125" y="55" transform="rotate(-90 125,55)" textAnchor="middle" className="text-[10px] font-black fill-white pointer-events-none uppercase tracking-widest opacity-80">Eletrólito</text>
                  <rect x="150" y="0" width="10" height="110" fill="white" className="hover:opacity-80 cursor-pointer" onClick={() => setSelectedComp(COMPONENTS[2])} />
                  <rect x="160" y="0" width="120" height="110" rx="8" fill="#334155" className="hover:opacity-80 cursor-pointer" onClick={() => setSelectedComp(COMPONENTS[3])} />
                  <text x="220" y="55" transform="rotate(-90 220,55)" textAnchor="middle" className="text-[10px] font-black fill-white pointer-events-none uppercase tracking-widest opacity-60">Mistura</text>
                  <rect x="280" y="20" width="60" height="70" rx="4" fill="#111827" className="hover:opacity-80 cursor-pointer" onClick={() => setSelectedComp(COMPONENTS[4])} />
                  <text x="310" y="55" transform="rotate(-90 310,55)" textAnchor="middle" className="text-[8px] font-black fill-white pointer-events-none uppercase tracking-widest opacity-60">Cátodo</text>
                </g>
                <text x="-140" y="-35" className="text-[40px] font-black fill-white pointer-events-none opacity-40">+</text>
                <text x="120" y="-35" className="text-[40px] font-black fill-white pointer-events-none opacity-40">-</text>
                <text x="0" y="60" textAnchor="middle" className="text-[12px] font-black fill-slate-400 tracking-[0.2em] uppercase">Pilha Seca</text>
              </g>

              {/* Linhas de Conexão Ajustadas */}
              <g className="stroke-slate-300 stroke-[1.5px] fill-none opacity-60">
                <path d="M 290 380 L 150 276" /> {/* Ânodo */}
                <path d="M 365 380 L 270 276" /> {/* Eletrólito */}
                <path d="M 395 380 L 390 276" /> {/* Separador */}
                <path d="M 460 380 L 510 276" /> {/* Mistura */}
                <path d="M 550 380 L 630 276" /> {/* Cátodo */}
              </g>
              
              {/* Pontos de conexão */}
              <g fill="#CBD5E1">
                <circle cx="290" cy="380" r="3" />
                <circle cx="365" cy="380" r="3" />
                <circle cx="395" cy="380" r="3" />
                <circle cx="460" cy="380" r="3" />
                <circle cx="550" cy="380" r="3" />
              </g>

              {COMPONENTS.map((comp, idx) => (
                <g key={comp.id} className="cursor-pointer group" onClick={() => setSelectedComp(comp)}>
                  <rect x={100 + (idx * 120)} y="240" width="100" height="36" rx="18" fill={selectedComp?.id === comp.id ? "#3B82F6" : "#F8FAFC"} className="shadow-sm border border-slate-100 transition-colors" />
                  <text x={150 + (idx * 120)} y="262" textAnchor="middle" className={`text-[9px] font-black tracking-tight transition-colors ${selectedComp?.id === comp.id ? 'fill-white' : 'fill-slate-500'}`}>
                    {comp.id === 'catodo' ? 'CÁTODO' : comp.id === 'mistura' ? 'MISTURA' : comp.id === 'separador' ? 'SEPARADOR' : comp.id === 'eletrolito' ? 'ELETRÓLITO' : 'ÂNODO'}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* PAINEL DE INFORMAÇÕES INTEGRADO */}
          <div className="bg-slate-50 border-t border-slate-100 p-4 md:p-6 flex items-center justify-center relative">
            <AnimatePresence mode="wait">
              {selectedComp ? (
                <motion.div
                  key={selectedComp.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col md:flex-row items-center gap-4 max-w-3xl"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white shadow-md" style={{ backgroundColor: selectedComp.color }}>
                    <Info className="w-5 h-5" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-sm font-black text-slate-900 leading-tight">{selectedComp.name}</h3>
                    <p className="text-slate-500 text-[13px] leading-relaxed font-medium mt-0.5">
                      {selectedComp.description}
                    </p>
                  </div>
                  <button onClick={() => setSelectedComp(null)} className="p-1.5 hover:bg-slate-200 rounded-full transition-colors flex-shrink-0">
                    <X className="w-4 h-4 text-slate-400" />
                  </button>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 py-2">
                  <Info className="w-4 h-4 text-slate-300" />
                  <p className="text-slate-400 font-bold text-[9px] uppercase tracking-widest">
                    Toque nos componentes para ver detalhes
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer Minimalista */}
        <footer className="py-4 text-center flex flex-col gap-1 items-center">
          <p className="text-[9px] text-slate-400 font-mono tracking-[0.4em] uppercase opacity-50">
            Eletroquímica Interativa • Virtual Lab
          </p>
          <div className="flex items-center gap-1.5 opacity-30">
            <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Otimizado para Versão Standalone</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
