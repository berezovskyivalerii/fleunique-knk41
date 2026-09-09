import { Link } from 'react-router-dom'

const FLOWERS = [
  { id: 1, left: '-1.5%', width: 179, height: 208, bottom: '-0.2vw' },
  { id: 2, left: '10%', width: 142, height: 190, bottom: '-1.6vw' },
  { id: 3, left: '21%', width: 173, height: 207, bottom: '-1.5vw' },
  { id: 4, left: '32.5%', width: 101, height: 110, bottom: '-1.1vw' },
  { id: 5, left: '40%', width: 202, height: 208, bottom: '-1.25vw' },
  { id: 6, left: '54.5%', width: 159, height: 186, bottom: '-1.7vw' },
  { id: 7, left: '67.5%', width: 142, height: 110, bottom: '-1.25vw' },
  { id: 8, left: '78.5%', width: 184, height: 220, bottom: '-1.5vw' },
  { id: 9, left: '91.5%', width: 101, height: 110, bottom: '-1.1vw' }
]

const bgGradient = 'radial-gradient(109.39% 98.4% at 87.85% 19.68%, rgba(4, 198, 209, 0.33) 0%, rgba(251, 178, 234, 0.33) 100%), #FCFCFC'

export const NotFoundPage = () => {
  return (
    <div 
      style={{ background: bgGradient }}
      className="fixed inset-0 flex flex-col justify-between items-center overflow-hidden select-none"
    >
      {/* Header */}
      <header className="absolute left-[6.667%] top-[3.906%] z-20">
        <Link to="/">
          <img src="/assets/logo.svg" alt="Fleunique" className="h-12 w-[clamp(110px,9.792vw,141px)]" />
        </Link>
      </header>

      {/* Main content */}
      <main className="absolute left-1/2 top-[18vh] z-20 flex h-[492px] w-[min(1114px,calc(100%-32px))] -translate-x-1/2 flex-col items-center">
        <div className="flex h-[clamp(220px,24.583vw,354px)] w-full items-center justify-between overflow-visible">
          <span 
            style={{ fontFamily: "'Fleunique404', sans-serif" }}
            className="flex h-full w-[31.7%] items-center justify-center text-[clamp(220px,33.333vw,480px)] font-Regular leading-none text-[#057B83] translate-y-[4px]"
            aria-hidden="true"
          >     
            4
          </span>

          <img 
            src="/assets/flower-zero.png" 
            alt="" 
            aria-hidden="true"
            className="h-full w-[35.2%] object-contain" 
          />

          <span 
            style={{ fontFamily: "'Fleunique404', sans-serif" }}
            className="flex h-full w-[31.7%] items-center justify-center text-[clamp(220px,33.333vw,480px)] font-Regular leading-none text-[#057B83] translate-y-[4px]"
            aria-hidden="true"
          >
            4
          </span>

          <span className="sr-only">404</span>
        </div>

        <p className="m-0 mt-12 h-[22px] w-[min(544px,calc(100%-32px))] text-center font-montserrat text-lg font-normal leading-[22px] text-[#033438]">
          Hey! Looks like the page you&apos;re looking for isn&apos;t here...
        </p>

        <Link 
          to="/" 
          className="mt-4 flex w-[352px] items-center justify-center rounded-[27px] border-2 border-[#B3158E] bg-white/20 px-0 py-2 font-montserrat text-lg font-semibold text-[#B3158E] shadow-[0_2px_2px_rgba(61,59,60,0.1)] backdrop-blur-sm transition-all hover:bg-[#B3158E] hover:text-white"
        >
          Go Back
        </Link>
      </main>

      {/* Footer flowers */}
      <footer className="absolute inset-0 h-full w-full pointer-events-none z-10 overflow-visible">
        {FLOWERS.map((f) => (
          <img 
            key={f.id}
            src={`/assets/flower-${f.id}.png`} 
            alt="" 
            style={{ 
              left: f.left, 
              bottom: f.bottom,
              width: f.width,
              height: f.height
            }}
            className="absolute object-contain" 
          />
        ))}
      </footer>
    </div>
  )
}