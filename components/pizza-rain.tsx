"use client"

import { useEffect, useState } from "react"
import { Pizza } from "lucide-react"

type PizzaProps = {
  left: number
  delay: number
  size: number
  rotation: number
  duration: number
}

export default function PizzaRain() {
  const [pizzas, setPizzas] = useState<PizzaProps[]>([])

  useEffect(() => {
    // Create 20 pizzas with random properties
    const newPizzas = Array.from({ length: 20 }, (_, i) => ({
      left: Math.random() * 100, // random position from 0-100%
      delay: Math.random() * 5, // random delay 0-5s
      size: Math.random() * 20 + 20, // random size 20-40px
      rotation: Math.random() * 360, // random rotation 0-360deg
      duration: Math.random() * 5 + 5, // random duration 5-10s
    }))

    setPizzas(newPizzas)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {pizzas.map((pizza, index) => (
        <div
          key={index}
          className="absolute animate-fall"
          style={{
            left: `${pizza.left}%`,
            top: `-${pizza.size}px`,
            animationDelay: `${pizza.delay}s`,
            animationDuration: `${pizza.duration}s`,
            animationIterationCount: "infinite",
          }}
        >
          <Pizza
            size={pizza.size}
            className="text-red-500 animate-spin"
            style={{
              animationDuration: `${pizza.duration * 2}s`,
              transform: `rotate(${pizza.rotation}deg)`,
            }}
            fill="#FF6B6B"
          />
        </div>
      ))}
    </div>
  )
}

