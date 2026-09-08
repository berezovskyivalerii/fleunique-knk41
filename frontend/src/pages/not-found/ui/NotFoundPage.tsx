import { Link } from 'react-router-dom'

const FLOWERS = [
  { id: 1, left: '-1.5%', bottom: -25, w: 179, h: 208 },
  { id: 2, left: '12%', bottom: -18, w: 142, h: 109 },
  { id: 3, left: '21%', bottom: -22, w: 173, h: 207 },
  { id: 4, left: '32.5%', bottom: -16, w: 101, h: 110 },
  { id: 5, left: '40%', bottom: -18, w: 210, h: 220 },
  { id: 6, left: '54.5%', bottom: -25, w: 159, h: 186 },
  { id: 7, left: '67.5%', bottom: -18, w: 142, h: 109 },
  { id: 8, left: '78.5%', bottom: -22, w: 184, h: 220 },
  { id: 9, left: '91.5%', bottom: -16, w: 101, h: 110 }
]

const bgGradient = 'linear-gradient(110deg, #F8CEEC 0%, #E8F0FE 40%, #CBE7F6 65%, #A8ECE9 100%)'

export const NotFoundPage = () => {
  return (
    <div 
      style={{ background: bgGradient }}
      className="fixed inset-0 flex flex-col justify-between items-center overflow-hidden select-none"
    >
      {/* Header */}
      <header className="z-20 w-full pt-15 pl-20">
        <Link to="/">
          <img src="/assets/logo.svg" alt="Fleunique" className="h-12" />
        </Link>
      </header>

      {/* Main content */}
      <main className="z-20 flex flex-col items-center justify-center my-auto mt-12">
        <div className="flex items-center justify-center gap-5 mb-6 h-[354px] overflow-visible">
          <span 
            style={{ fontFamily: "'Fleunique404', sans-serif" }}
            className="w-[353px] flex items-center justify-center text-[#008080] text-[480px] leading-none font-bold translate-y-[10px] shrink-0"
          >     
            4
          </span>

          <img 
            src="/assets/flower-zero.png" 
            alt="0" 
            className="w-[392px] h-[354px] object-contain shrink-0" 
          />

          <span 
            style={{ fontFamily: "'Fleunique404', sans-serif" }}
            className="w-[353px] flex items-center justify-center text-[#008080] text-[480px] leading-none font-bold translate-y-[10px] shrink-0"
          >
            4
          </span>
        </div>

        <p className="text-[#6B7280] text-sm font-medium mb-5 text-center">
          Hey! Looks like the page you&apos;re looking for isn&apos;t here...
        </p>

        <Link 
          to="/" 
          className="flex items-center justify-center w-[352px] h-[45px] rounded-[27px] border-2 border-[#B3158E] shadow-[0_2px_2px_rgba(61,59,60,0.1)] text-[#B3158E] font-semibold text-sm bg-white/20 backdrop-blur-sm transition-all hover:bg-[#B3158E] hover:text-white"
        >
          Go Back
        </Link>
      </main>

      {/* Footer flowers */}
      <footer className="absolute bottom-0 left-0 w-full h-[280px] pointer-events-none z-10 overflow-hidden">
        {FLOWERS.map((f, i) => (
          <img 
            key={f.id}
            src={`/assets/flower-${i + 1}.png`} 
            alt="" 
            style={{ 
              left: f.left, 
              bottom: f.bottom,
              width: f.w,
              height: f.h
            }}
            className="absolute object-contain" 
          />
        ))}
      </footer>
    </div>
  )
}