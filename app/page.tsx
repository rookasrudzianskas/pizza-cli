"use client"

import type React from "react"

import { useState } from "react"
import { Pizza } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import CliInterface from "@/components/cli-interface"
import PizzaRain from "@/components/pizza-rain"

export default function Home() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Order Placed!",
      description: "Your pizza order has been received and will be ready for your meetup.",
    })

    setIsSubmitting(false)

    setTimeout(() => {
      router.push("/success")
    }, 2000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <PizzaRain />

      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-2 items-center">
            <Pizza className="h-8 w-8 text-red-500" fill="#FFA07A" />
            <span className="text-xl font-bold text-primary">Pizza CLI</span>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-red-900 to-black relative">
          <div className="container px-4 md:px-6 relative z-20">
            <div className="flex flex-col items-center gap-4 text-center text-white mb-12">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Pizza  CLI</h1>
              <p className="max-w-[700px] text-lg md:text-xl">
                Order your perfect pizza for your next meetup with our command-line interface.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <CliInterface />
            </div>

            <div className="mt-6 text-sm text-white/80 text-center">
              <p>
                Hint: Type <code className="bg-white/20 px-1 py-0.5 rounded">help</code> to see available commands.
              </p>
              <p>
                Start your order with <code className="bg-white/20 px-1 py-0.5 rounded">order pizza</code>.
              </p>
            </div>
            
            {/* Roadmap Section Added */}
            <div className="mt-12 p-4 bg-black/40 border border-white/10 rounded-lg text-white/90 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
  {/* Phase 1 */}
  <div className="bg-gradient-to-br from-red-900/60 to-black/60 rounded-lg p-5 border-l-4 border-red-500 shadow-md transition-transform hover:scale-[1.01]">
    <div className="flex items-center mb-3">
      <span className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full font-bold mr-3">1</span>
      <h4 className="text-lg font-bold text-white">Initial Setup <span className="text-sm font-normal text-red-300">(1-2 months)</span></h4>
    </div>
    <ul className="space-y-2 text-white/90">
      <li className="flex items-start">
        <span className="text-red-400 mr-2 mt-1">•</span>
        <span>Register as Wolt merchant partner and obtain API credentials</span>
      </li>
      <li className="flex items-start">
        <span className="text-red-400 mr-2 mt-1">•</span>
        <span>Create basic API endpoints to connect with Wolt</span>
      </li>
      <li className="flex items-start">
        <span className="text-red-400 mr-2 mt-1">•</span>
        <span>Implement order submission functionality</span>
      </li>
    </ul>
  </div>

  {/* Phase 2 */}
  <div className="bg-gradient-to-br from-red-800/60 to-black/60 rounded-lg p-5 border-l-4 border-red-400 shadow-md transition-transform hover:scale-[1.01]">
    <div className="flex items-center mb-3">
      <span className="w-8 h-8 flex items-center justify-center bg-red-400 text-white rounded-full font-bold mr-3">2</span>
      <h4 className="text-lg font-bold text-white">Target Market Launch <span className="text-sm font-normal text-red-300">(2-3 months)</span></h4>
    </div>
    <ul className="space-y-2 text-white/90">
      <li className="flex items-start">
        <span className="text-red-400 mr-2 mt-1">•</span>
        <span>Deploy in Italy, Lithuania, and Denmark</span>
      </li>
      <li className="flex items-start">
        <span className="text-red-400 mr-2 mt-1">•</span>
        <span>Localize menus and payment options</span>
      </li>
      <li className="flex items-start">
        <span className="text-red-400 mr-2 mt-1">•</span>
        <span>Implement country-specific tax handling</span>
      </li>
    </ul>
  </div>

  {/* Phase 3 */}
  <div className="bg-gradient-to-br from-red-700/60 to-black/60 rounded-lg p-5 border-l-4 border-red-300 shadow-md transition-transform hover:scale-[1.01]">
    <div className="flex items-center mb-3">
      <span className="w-8 h-8 flex items-center justify-center bg-red-300 text-red-900 rounded-full font-bold mr-3">3</span>
      <h4 className="text-lg font-bold text-white">Improvements <span className="text-sm font-normal text-red-300">(1-2 months)</span></h4>
    </div>
    <ul className="space-y-2 text-white/90">
      <li className="flex items-start">
        <span className="text-red-400 mr-2 mt-1">•</span>
        <span>Add order tracking functionality</span>
      </li>
      <li className="flex items-start">
        <span className="text-red-400 mr-2 mt-1">•</span>
        <span>Optimize performance and user experience</span>
      </li>
      <li className="flex items-start">
        <span className="text-red-400 mr-2 mt-1">•</span>
        <span>Collect user feedback</span>
      </li>
    </ul>
  </div>

  {/* Phase 4 */}
  <div className="bg-gradient-to-br from-red-600/60 to-black/60 rounded-lg p-5 border-l-4 border-red-200 shadow-md transition-transform hover:scale-[1.01]">
    <div className="flex items-center mb-3">
      <span className="w-8 h-8 flex items-center justify-center bg-red-200 text-red-900 rounded-full font-bold mr-3">4</span>
      <h4 className="text-lg font-bold text-white">Global Expansion <span className="text-sm font-normal text-red-300">(6-12 months)</span></h4>
    </div>
    <ul className="space-y-2 text-white/90">
      <li className="flex items-start">
        <span className="text-red-400 mr-2 mt-1">•</span>
        <span>Expand to additional EU countries</span>
      </li>
      <li className="flex items-start">
        <span className="text-red-400 mr-2 mt-1">•</span>
        <span>Target North America and Asia markets</span>
      </li>
      <li className="flex items-start">
        <span className="text-red-400 mr-2 mt-1">•</span>
        <span>Scale infrastructure for increased demand</span>
      </li>
    </ul>
  </div>
</div>

{/* Developer Requirements */}
<div className="mt-6 bg-gradient-to-r from-red-900/70 to-black rounded-lg p-5 border border-red-500/30 shadow-md">
  <div className="flex items-center mb-4">
    <svg className="w-6 h-6 mr-2 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
    <h4 className="text-lg font-bold text-white">Developer Requirements</h4>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-white/90">
    <div className="flex items-center bg-black/30 rounded p-3">
      <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
      <span>Experience with React/Next.js and TypeScript</span>
    </div>
    <div className="flex items-center bg-black/30 rounded p-3">
      <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
      <span>Knowledge of API integrations</span>
    </div>
    <div className="flex items-center bg-black/30 rounded p-3">
      <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
      <span>Familiarity with food delivery platforms</span>
    </div>
    <div className="flex items-center bg-black/30 rounded p-3">
      <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
      <span>Interest in contributing to an innovative ordering interface</span>
    </div>
  </div>
</div>
              <div className="mt-10 mb-8 p-6 bg-gradient-to-r from-red-800/70 to-orange-900/70 rounded-xl border border-red-500/30 shadow-lg text-white">
            <div className="flex items-center mb-4">
              <Pizza className="h-6 w-6 mr-2 text-red-300" fill="#FFAA80" />
              <h3 className="text-xl font-bold text-red-100">Project Vision</h3>
            </div>
            
            <p className="text-lg mb-4 font-medium leading-relaxed">
              I would love for this project to see the light in the tunnel, and to be able to actually download a NPM package on my mac, and order pizza + pay with Apple Pay.
            </p>
            
            <div className="space-y-3 my-4 text-red-100/90">
              <p className="leading-relaxed">
                I have started this project as a fun little side thing, and I'll be coming back to Denmark pretty soon, so I want to give it to a very cool computer science person, who can manage to pull this one off successfully.
              </p>
              
              <p className="leading-relaxed">
                I will make sure to be your first client when you launch it, and I'll be the first one to download it as an NPM package!
              </p>
            </div>
  
  <div className="mt-5 flex items-center justify-between flex flex-col md:flex-row">
    <div className="flex items-center">
      <span className="mr-2 text-xl">🚀</span>
      <span className="font-bold">Don't miss your chance on a ONE BILLION Euros idea</span>
      <span className="ml-2 text-xl">😂</span>, 
      <span className='ml-2 font-semibold'>by Rokas with <span className='text-xl'>💜</span></span>
    </div>
    
    <Button 
  className="bg-red-500 hover:bg-red-600 text-white border-none"
  onClick={() => window.location.href = 'mailto:rokas.rudzianskas@stud.dtu.dk?subject=Joining%20Pizza%20CLI%20Project&body=Hi%20Rokas%2C%0A%0AI%27m%20interested%20in%20joining%20the%20Pizza%20CLI%20project.%20Here%27s%20a%20bit%20about%20me%20and%20my%20experience%3A%0A%0A%5BYour%20introduction%20here%5D%0A%0ALooking%20forward%20to%20discussing%20this%20opportunity%20further.%0A%0ABest%20regards%2C%0A%5BYour%20name%5D'}
>
  Gift me this Project
</Button>
  </div>
</div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-gray-800 py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">© 2025 Pizza CLI. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary">
              Terms
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary">
              Privacy
            </a>
          </div>
        </div>
      </footer>

      <Toaster />
    </div>
  )
}
