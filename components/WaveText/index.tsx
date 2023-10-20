"use client"

interface Props {
  text: string
}

export default function WaveText({ text }: Props) {
  const chars = text.split("")

  return (
    <div className="leading-7 flex text-lg gap-1">
      {chars.map((char, idx) => {
        return (
          <span
            key={idx}
            style={{ animationDelay: `${idx * 100}ms` }}
            className={`transition-all duration-[2000ms] animate-wave inline-block`}
          >
            {char}
          </span>
        )
      })}
    </div>
  )
}
