"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Terminal } from "lucide-react"
import { useRouter } from "next/navigation"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

type CommandHistory = {
  command: string
  output: string
  isError?: boolean
}

export default function CliInterface() {
  const router = useRouter()
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: "",
      output:
        "🍕 Welcome to Pizza Paradise CLI v1.0.0\n" +
        "Type 'help' to see available commands.\n" +
        "Start your order with 'order pizza'.",
    },
  ])
  const [orderData, setOrderData] = useState({
    size: "",
    crust: "",
    toppings: [] as string[],
    name: "",
    address: "",
    phone: "",
    email: "",
  })
  const [orderStep, setOrderStep] = useState("")
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  // Auto-focus input
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    processCommand(input)
    setInput("")
  }

  const processCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase()
    let output = ""
    let isError = false

    // Add command to history
    const newHistory = [...history, { command, output: "", isError: false }]

    // Process based on current order step
    if (orderStep) {
      switch (orderStep) {
        case "size":
          if (["small", "medium", "large", "xl"].includes(command)) {
            setOrderData({ ...orderData, size: command })
            output = `Size set to ${command}.\nPlease select a crust type: regular, thin, stuffed, or gluten-free`
            setOrderStep("crust")
          } else {
            output = "Invalid size. Please choose: small, medium, large, or xl"
            isError = true
          }
          break

        case "crust":
          if (["regular", "thin", "stuffed", "gluten-free"].includes(command)) {
            setOrderData({ ...orderData, crust: command })
            output = `Crust set to ${command}.\nPlease enter toppings separated by commas (max 5), or type 'none'`
            setOrderStep("toppings")
          } else {
            output = "Invalid crust type. Please choose: regular, thin, stuffed, or gluten-free"
            isError = true
          }
          break

        case "toppings":
          if (command !== "none") {
            const toppings = command
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
            if (toppings.length > 5) {
              output = "Too many toppings! Maximum is 5. Please try again."
              isError = true
            } else {
              setOrderData({ ...orderData, toppings })
              output = `Toppings set: ${toppings.join(", ") || "none"}.\nPlease enter your name`
              setOrderStep("name")
            }
          } else {
            setOrderData({ ...orderData, toppings: [] })
            output = "No toppings selected.\nPlease enter your name"
            setOrderStep("name")
          }
          break

        case "name":
          setOrderData({ ...orderData, name: command })
          output = `Name set to ${command}.\nPlease enter your delivery address`
          setOrderStep("address")
          break

        case "address":
          setOrderData({ ...orderData, address: command })
          output = `Address set to ${command}.\nPlease enter your phone number`
          setOrderStep("phone")
          break

        case "phone":
          setOrderData({ ...orderData, phone: command })
          output = `Phone set to ${command}.\nPlease enter your email`
          setOrderStep("email")
          break

        case "email":
          if (command.includes("@") && command.includes(".")) {
            setOrderData({ ...orderData, email: command })
            output =
              `Email set to ${command}.\n\nOrder Summary:\n` +
              `Size: ${orderData.size}\n` +
              `Crust: ${orderData.crust}\n` +
              `Toppings: ${orderData.toppings.length ? orderData.toppings.join(", ") : "none"}\n` +
              `Name: ${orderData.name}\n` +
              `Address: ${orderData.address}\n` +
              `Phone: ${orderData.phone}\n` +
              `Email: ${command}\n\n` +
              `Type 'confirm' to place your order or 'cancel' to start over.`
            setOrderStep("confirm")
          } else {
            output = "Please enter a valid email address"
            isError = true
          }
          break

        case "confirm":
          if (command === "confirm") {
            output = "🎉 Order confirmed! Processing your pizza order...\n\nYour pizza will be ready for your meetup!"

            // Show toast notification
            toast({
              title: "Order Placed!",
              description: "Your pizza order has been received and will be ready for your meetup.",
            })

            // Reset order state
            setOrderStep("")

            // Redirect to success page after a delay
            setTimeout(() => {
              router.push("/success")
            }, 3000)
          } else if (command === "cancel") {
            output = "Order cancelled. Type 'order pizza' to start a new order."
            setOrderStep("")
          } else {
            output = "Please type 'confirm' to place your order or 'cancel' to start over."
            isError = true
          }
          break
      }
    } else {
      // Process regular commands
      switch (command) {
        case "help":
          output =
            "Available commands:\n" +
            "- help: Show this help message\n" +
            "- order pizza: Start a new pizza order\n" +
            "- clear: Clear the terminal\n" +
            "- about: Learn about Pizza Paradise"
          break

        case "order pizza":
          output = "Starting new pizza order...\n\nPlease select a size: small, medium, large, or xl"
          setOrderStep("size")
          break

        case "clear":
          setHistory([
            {
              command: "",
              output: "🍕 Terminal cleared. Type 'help' to see available commands.",
            },
          ])
          return

        case "about":
          output =
            "🍕 Pizza CLI 🍕\n\n" +
            "We make the best pizzas for your meetups and events!\n" +
            "Our pizzas are made with fresh ingredients and baked to perfection.\n" +
            "Order now and experience pizza paradise!"
          break

        default:
          output = `Command not recognized: ${command}\nType 'help' to see available commands.`
          isError = true
      }
    }

    // Update the last command's output
    newHistory[newHistory.length - 1].output = output
    newHistory[newHistory.length - 1].isError = isError

    setHistory(newHistory)
  }

  return (
    <Card className="border-2 border-gray-800 bg-black text-white">
      <CardHeader className="bg-gray-900 border-b border-gray-800">
        <div className="flex items-center">
          <Terminal className="h-5 w-5 text-green-400 mr-2" />
          <CardTitle className="text-green-400">Pizza CLI</CardTitle>
        </div>
        <CardDescription className="text-gray-400">Order your pizza using command-line interface</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div
          ref={terminalRef}
          className="font-mono text-sm p-4 h-[400px] overflow-y-auto bg-black"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((item, index) => (
            <div key={index} className="mb-2">
              {item.command && (
                <div className="flex">
                  <span className="text-green-400 mr-2">$</span>
                  <span>{item.command}</span>
                </div>
              )}
              <div className={`ml-4 whitespace-pre-wrap ${item.isError ? "text-red-400" : "text-gray-300"}`}>
                {item.output}
              </div>
            </div>
          ))}
          <form onSubmit={handleSubmit} className="flex items-center mt-2">
            <span className="text-green-400 mr-2">$</span>
            <Input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border-none text-white focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-6"
              autoComplete="off"
            />
          </form>
        </div>
      </CardContent>
    </Card>
  )
}

