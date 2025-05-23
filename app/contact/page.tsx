"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import SiteHeader from "@/components/site-header"
import ShineButton from "@/components/shine-button"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    }, 1500)
  }

  return (
    <main className="flex min-h-screen flex-col">
      <SiteHeader />

      <section className="w-full bg-gradient-to-b from-green-600 to-green-700 text-white pt-20 md:pt-32 pb-6 md:pb-10">
        <div className="container mx-auto px-4 max-w-7xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center font-heading">
            Contact Us
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-center mt-3 md:mt-4 max-w-3xl mx-auto font-body">
            Have questions about BurnJaro? Our team is here to help. Reach out to us using any of the methods below.
          </p>
        </div>
      </section>

      <section className="w-full bg-white py-8 md:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
            {/* Contact Information */}
            <div className="space-y-6 md:space-y-10">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-700 mb-3 sm:mb-6 font-heading">
                  Get In Touch
                </h2>
                <p className="text-base sm:text-lg font-body">
                  We're here to answer any questions you may have about BurnJaro, our ingredients, shipping, or anything
                  else. Our customer support team is available Monday through Friday, 9am to 5pm EST.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="mt-1 bg-green-100 p-2 sm:p-3 rounded-full">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-green-700" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-green-700 font-heading">Phone</h3>
                    <p className="text-base sm:text-lg font-body">(800) 555-1234</p>
                    <p className="text-sm sm:text-base text-gray-600 font-body">Monday-Friday, 9am-5pm EST</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="mt-1 bg-green-100 p-2 sm:p-3 rounded-full">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-green-700" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-green-700 font-heading">Email</h3>
                    <p className="text-base sm:text-lg font-body">support@burnjaro.com</p>
                    <p className="text-sm sm:text-base text-gray-600 font-body">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="mt-1 bg-green-100 p-2 sm:p-3 rounded-full">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-green-700" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-green-700 font-heading">Address</h3>
                    <p className="text-base sm:text-lg font-body">
                      BurnJaro Fulfillment Center
                      <br />
                      123 Wellness Way
                      <br />
                      Fitness City, CA 90210
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-green-700 mb-2 sm:mb-4 font-heading">
                  Frequently Asked Questions
                </h3>
                <p className="text-base sm:text-lg mb-2 sm:mb-4 font-body">
                  For quick answers to common questions, please visit our{" "}
                  <Link href="/#faq" className="text-green-700 underline">
                    FAQ section
                  </Link>
                  .
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 p-4 sm:p-6 md:p-8 rounded-xl shadow-sm">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-700 mb-4 sm:mb-6 font-heading">
                Send Us a Message
              </h2>

              {submitSuccess ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-3 sm:px-4 py-2 sm:py-3 rounded mb-4 sm:mb-6">
                  <p className="font-body text-base sm:text-lg">
                    Thank you for your message! We'll get back to you shortly.
                  </p>
                </div>
              ) : null}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-base sm:text-lg font-medium text-gray-700 mb-1 sm:mb-2 font-body"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base sm:text-lg font-body"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-base sm:text-lg font-medium text-gray-700 mb-1 sm:mb-2 font-body"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base sm:text-lg font-body"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-base sm:text-lg font-medium text-gray-700 mb-1 sm:mb-2 font-body"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base sm:text-lg font-body"
                  >
                    <option value="">Select a subject</option>
                    <option value="Order Question">Order Question</option>
                    <option value="Product Information">Product Information</option>
                    <option value="Weight Loss Advice">Weight Loss Advice</option>
                    <option value="Shipping & Delivery">Shipping & Delivery</option>
                    <option value="Returns & Refunds">Returns & Refunds</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-base sm:text-lg font-medium text-gray-700 mb-1 sm:mb-2 font-body"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base sm:text-lg font-body"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <div>
                  <ShineButton
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green-700 hover:bg-green-600 text-white font-bold text-base sm:text-lg md:text-xl py-3 sm:py-4 rounded-lg flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                        Send Message
                      </>
                    )}
                  </ShineButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full bg-green-800 text-white py-6 sm:py-10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <Image src="/burnjaro-bottle.png" alt="BurnJaro Logo" width={40} height={40} className="object-contain" />
              <span className="font-bold text-xl sm:text-2xl font-heading">BurnJaro</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 font-body text-sm sm:text-base md:text-lg">
              <Link href="/terms" className="hover:underline">
                Terms
              </Link>
              <Link href="/privacy" className="hover:underline">
                Privacy
              </Link>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
              <Link href="/refund-policy" className="hover:underline">
                Refund Policy
              </Link>
            </div>
          </div>
          <div className="mt-4 sm:mt-8 text-center text-xs sm:text-sm text-gray-300 font-body">
            <p>© {new Date().getFullYear()} BurnJaro. All Rights Reserved.</p>
            <p className="mt-2 sm:mt-3 text-xs sm:text-base max-w-4xl mx-auto">
              *These statements have not been evaluated by the Food and Drug Administration. This product is not
              intended to diagnose, treat, cure, or prevent any disease.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
