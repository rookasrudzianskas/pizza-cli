"use client"

import Link from "next/link"
import { ArrowLeft, CheckCircle, Pizza } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"
import PizzaRain from "@/components/pizza-rain"

export default function Success() {
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
            <div className="flex flex-col items-center justify-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-900 mb-6">
                <CheckCircle className="h-10 w-10 text-green-400" />
              </div>
              <h1 className="text-3xl font-bold mb-2 text-white">Order Successful!</h1>
              <p className="text-muted-foreground mb-8 max-w-md">
                Your pizza order has been received and will be ready for your meetup. We've sent a confirmation to your email.
              </p>
              <div className="flex flex-col gap-4 w-full max-w-xs">
                <Link href="/">
                  <Button className="w-full">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Return to Home
                  </Button>
                </Link>
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