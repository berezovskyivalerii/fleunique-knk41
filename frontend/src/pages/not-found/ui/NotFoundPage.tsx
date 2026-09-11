import { Link } from 'react-router-dom'
import { MediumOutlinedButton } from '@/shared/ui/MediumOutlinedButton'

type FooterFlower = {
  id: number
  left?: string
  right?: string
  width: string
  height: string
  bottom: string
  scale: number
}

const FLOWERS: FooterFlower[] = [
  { id: 1, left: '-0.6%', width: 'clamp(112px, 12.43vw, 179px)', height: 'clamp(130px, 14.44vw, 208px)', bottom: '-0.1vw', scale: 1 },
  { id: 2, left: '11.7%', width: 'clamp(89px, 9.86vw, 142px)', height: 'clamp(119px, 13.19vw, 190px)', bottom: '-2vw', scale: 1.2 },
  { id: 3, left: '20.5%', width: 'clamp(108px, 12.01vw, 173px)', height: 'clamp(129px, 14.38vw, 207px)', bottom: '-0.1vw', scale: 1 },
  { id: 4, left: '32.5%', width: 'clamp(63px, 7.01vw, 101px)', height: 'clamp(69px, 7.64vw, 110px)', bottom: '-0.2vw', scale: 1 },
  { id: 5, left: '39.5%', width: 'clamp(126px, 14.03vw, 202px)', height: 'clamp(130px, 14.44vw, 208px)', bottom: '-1.5vw', scale: 1.4 },
  { id: 6, left: '54.5%', width: 'clamp(99px, 11.04vw, 159px)', height: 'clamp(116px, 12.92vw, 186px)', bottom: '-0.5vw', scale: 1 },
  { id: 7, left: '67.5%', width: 'clamp(89px, 9.86vw, 142px)', height: 'clamp(119px, 13.19vw, 190px)', bottom: '-2.5vw', scale: 1.2 },
  { id: 8, left: '78.5%', width: 'clamp(115px, 12.78vw, 184px)', height: 'clamp(138px, 15.28vw, 220px)', bottom: '-0.5vw', scale: 1 },
  { id: 9, right: '0', width: 'clamp(63px, 7.01vw, 101px)', height: 'clamp(69px, 7.64vw, 110px)', bottom: '-0.2vw', scale: 1 }
]

const backgroundGradient = [
  'radial-gradient(109.39% 98.4% at 87.85% 19.68%, rgba(4, 198, 209, 0.33) 0%, rgba(4, 198, 209, 0) 100%)',
  'radial-gradient(90% 160% at 0% 0%, #fbb2ea80 0%, rgba(251, 178, 234, 0.28) 58%, rgba(251, 178, 234, 0) 100%)',
  'var(--silver-50, #FCFCFC)'
].join(', ')

export const NotFoundPage = () => {
  return (
    <div 
      style={{ background: backgroundGradient }}
      className="fixed inset-0 flex flex-col items-center justify-between overflow-hidden select-none"
    >
      {/* Header */}
      <header className="absolute left-[6.667%] top-[3.906%] z-20">
        <Link to="/">
          <img src="/assets/logo.svg" alt="Fleunique" className="h-12 w-[clamp(110px,9.792vw,141px)]" />
        </Link>
      </header>

      {/* Main content */}
      <main className="not-found-main absolute left-1/2 top-[clamp(96px,19vh,184px)] z-20 flex w-[min(1114px,calc(100%-32px))] -translate-x-1/2 flex-col items-center">
        <div className="not-found-hero flex h-[clamp(160px,34vh,354px)] w-full items-center justify-between overflow-visible">
          <span
            className="flex h-full w-[31.7%] items-center justify-center font-fleunique text-[clamp(220px,33.333vw,480px)] font-normal leading-none text-[#057B83] translate-y-[4px] max-[640px]:text-[clamp(96px,33.333vw,220px)]"
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
            className="flex h-full w-[31.7%] items-center justify-center font-fleunique text-[clamp(220px,33.333vw,480px)] font-normal leading-none text-[#057B83] translate-y-[4px] max-[640px]:text-[clamp(96px,33.333vw,220px)]"
            aria-hidden="true"
          >
            4
          </span>

          <span className="sr-only">404</span>
        </div>

        <p className="m-0 mt-[clamp(16px,4.6875vh,48px)] min-h-[22px] w-[min(544px,calc(100%-32px))] text-center font-montserrat text-lg font-normal leading-[22px] text-[#033438] max-[640px]:text-sm max-[640px]:leading-5">
          Hey! Looks like the page you&apos;re looking for isn&apos;t here...
        </p>

        <MediumOutlinedButton
          to="/"
          className="mt-[clamp(8px,1.6vh,16px)] w-[min(352px,100%)]"
        >
          Go Back
        </MediumOutlinedButton>
      </main>

      {/* Footer flowers */}
      <footer className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible">
        {FLOWERS.map((flower) => (
          <img
            key={flower.id}
            src={`/assets/flower-${flower.id}.png`}
            alt=""
            style={{
              left: flower.left,
              right: flower.right,
              bottom: flower.bottom,
              width: flower.width,
              height: flower.height,
              transform: `scale(${flower.scale})`,
              transformOrigin: 'center bottom'
            }}
            className="absolute object-contain"
          />
        ))}
      </footer>
    </div>
  )
}