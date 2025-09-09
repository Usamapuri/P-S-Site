"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, CheckCircle, Shield, Heart, Menu, X, Star, Users, Sparkles, Zap, ArrowRight } from "lucide-react"
import Image from "next/image"

const products = [
  {
    name: "Wheelchair",
    category: "mobility",
    description: "Standard manual wheelchair for daily use and independence.",
  },
  {
    name: "Walker with Seat",
    category: "mobility",
    description: "Provides support and a convenient resting spot during walks.",
  },
  {
    name: "Hospital Bed",
    category: "mobility",
    description: "Adjustable electric bed for home care comfort and recovery.",
  },
  { name: "Walking Cane", category: "mobility", description: "Lightweight and sturdy walking cane for stability." },
  {
    name: "Oxygen Concentrator",
    category: "respiratory",
    description: "Provides a continuous supply of medical-grade oxygen.",
  },
  { name: "CPAP Machine", category: "respiratory", description: "For effective treatment of sleep apnea disorders." },
  { name: "Nebulizer", category: "respiratory", description: "Delivers medication in the form of a fine mist." },
  { name: "Shower Chair", category: "safety", description: "Provides stability and safety while bathing." },
  {
    name: "Grab Bars",
    category: "safety",
    description: "Installable support bars for bathroom safety.",
  },
  {
    name: "Toilet Safety Frame",
    category: "safety",
    description: "Assists with sitting and standing from the toilet.",
  },
  { name: "Reacher Grabber", category: "living", description: "Helps retrieve items without bending or stretching." },
  { name: "Pill Organizer", category: "living", description: "Manages weekly medications easily and safely." },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    text: "P&S Med Services made getting my father's hospital bed so easy. They handled everything with his Medicare plan, and the delivery was fast. I can't thank them enough for their kindness and efficiency.",
    rating: 5,
  },
  {
    name: "Michael Brown",
    text: "As someone with a chronic respiratory condition, dealing with insurance is a constant headache. The team at P&S was a breath of fresh air. They knew exactly what was needed and took care of it all.",
    rating: 5,
  },
  {
    name: "David Rodriguez",
    text: "Fantastic customer service! They found the perfect walker for my mother and made sure her insurance covered it. The process was stress-free from beginning to end. Highly recommend!",
    rating: 5,
  },
]

const insurancePartners = [
  "Medicare",
  "Medicaid",
  "Aetna",
  "Blue Cross Blue Shield",
  "Cigna",
  "Humana",
  "UnitedHealth",
  "Kaiser Permanente",
]

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [scrollY, setScrollY] = useState(0)

  // Map product names to local image assets in public/images
  const productImageMap: Record<string, string> = {
    "Wheelchair": "/images/wheelchair.webp",
    "Walker with Seat": "/images/walker%20with%20seat.webp",
    "Hospital Bed": "/images/hosp%20bed.jpg",
    "Walking Cane": "/images/walking%20cane.jpg",
    "Oxygen Concentrator": "/images/Oxygen%20Concentrator.webp",
    "CPAP Machine": "/images/CPAP%20Machine.jpg",
    "Nebulizer": "/placeholder.jpg",
    "Shower Chair": "/images/Shower%20Chair.png",
    "Grab Bars": "/images/Grab%20Bars.webp",
    "Toilet Safety Frame": "/images/Toilet%20Safety%20Frame.jpg",
    "Reacher Grabber": "/images/Reacher%20Grabber.jpg",
    "Pill Organizer": "/images/Pill%20Organizer.webp",
  }

  const getProductImageSrc = (name: string) => productImageMap[name] ?? "/placeholder.jpg"

  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(products.filter((product) => product.category === activeFilter))
    }
  }, [activeFilter])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Image
                src="/images/ps-med-logo.png"
                alt="P&S Med Services Logo"
                width={48}
                height={48}
                className="rounded-full animate-pulse-glow"
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-ping"></div>
            </div>
            <div>
              <h1 className="font-serif font-bold text-xl text-primary">P&S Med Services</h1>
              <p className="text-sm text-muted-foreground">Your Partner in Health</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105 relative group"
            >
              How It Works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={() => scrollToSection("products")}
              className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105 relative group"
            >
              Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={() => scrollToSection("insurance")}
              className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105 relative group"
            >
              Insurance
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105 relative group"
            >
              Reviews
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </button>
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Contact Us
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-primary/10 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-emerald border-t border-border/50 animate-slide-in-left">
            <nav className="flex flex-col p-4 space-y-2">
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-left py-3 px-4 text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("products")}
                className="text-left py-3 px-4 text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
              >
                Products
              </button>
              <button
                onClick={() => scrollToSection("insurance")}
                className="text-left py-3 px-4 text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
              >
                Insurance
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-left py-3 px-4 text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
              >
                Reviews
              </button>
              <Button
                onClick={() => scrollToSection("contact")}
                className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Contact Us
              </Button>
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden min-h-screen flex items-center bg-background">
          {/* Background image */}
          <Image
            src="/images/shutterstock_621845186.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Subtle overlay for readability */}
          <div className="absolute inset-0 bg-white/70"></div>
          <div className="container mx-auto px-4 py-16 md:py-24 text-center relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="animate-fade-in-up">
                <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-lg">
                  <Sparkles className="w-4 h-4" />
                  Trusted by 10,000+ Patients
                </div>
              </div>

              <h1 className="font-serif font-bold text-5xl md:text-7xl leading-tight text-balance animate-fade-in-up delay-100">
                Your Partner in
                <span className="text-primary animate-gradient"> Health</span>
                <br />
                and Independence
              </h1>

              <p className="mt-8 text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto text-pretty animate-fade-in-up delay-200 leading-relaxed">
                P&S Med Services simplifies access to essential medical equipment, billed directly to your insurance. We
                handle the paperwork so you can focus on what matters most—your well-being.
              </p>

              <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6 animate-fade-in-up delay-300">
                <Button
                  size="lg"
                  onClick={() => scrollToSection("products")}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-2xl text-lg px-10 py-4 hover-lift group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    View Our Products
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollToSection("contact")}
                  className="text-lg px-10 py-4 hover-lift glass border-primary/20 hover:bg-primary/5"
                >
                  Get In Touch
                </Button>
              </div>

              <div className="mt-16 animate-fade-in-up delay-400">
                <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    Medicare Approved
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    HIPAA Compliant
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-primary" />
                    Family Owned
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16">
              <defs>
                <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f1f5f9" />
                  <stop offset="50%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#f8fafc" />
                </linearGradient>
              </defs>
              <path
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                fill="url(#waveGradient)"
                opacity=".4"
              ></path>
              <path
                d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                fill="url(#waveGradient)"
                opacity=".6"
              ></path>
              <path
                d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                fill="url(#waveGradient)"
              ></path>
            </svg>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="bg-card py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-32 h-32 border border-primary rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 border border-secondary rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-accent rounded-full"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                Simple Process
              </div>
              <h2 className="font-serif font-bold text-4xl md:text-5xl text-foreground text-balance">
                Getting Started is Easy
              </h2>
              <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
                We've streamlined the process into three simple steps.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center glass hover-lift animate-scale-in delay-100 group">
                <CardHeader>
                  <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="font-serif text-2xl">Check Eligibility</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    Provide us with your insurance information. We'll quickly verify your coverage for the equipment you
                    need, completely free of charge.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center glass hover-lift animate-scale-in delay-200 group">
                <CardHeader>
                  <div className="mx-auto w-20 h-20 bg-gradient-to-br from-secondary to-secondary/70 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="font-serif text-2xl">We Handle the Paperwork</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    Once approved, we coordinate with your doctor and insurance provider, managing all prescriptions and
                    billing details on your behalf.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center glass hover-lift animate-scale-in delay-300 group">
                <CardHeader>
                  <div className="mx-auto w-20 h-20 bg-gradient-to-br from-accent to-accent/70 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Heart className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="font-serif text-2xl">Discreet Home Delivery</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    Your medical equipment is delivered directly and discreetly to your door. We provide setup support
                    and are always here to help.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Why Choose Us
              </div>
              <h2 className="font-serif font-bold text-4xl md:text-5xl text-foreground text-balance">
                Compassionate Service. Quality Equipment.
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="glass hover-lift">
                <CardHeader>
                  <CardTitle className="font-serif text-xl">Insurance Experts</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    We verify coverage and handle claim paperwork end to end so you don’t have to.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="glass hover-lift">
                <CardHeader>
                  <CardTitle className="font-serif text-xl">Fast, Discreet Delivery</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Equipment delivered to your door with optional setup guidance from our team.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="glass hover-lift">
                <CardHeader>
                  <CardTitle className="font-serif text-xl">Trusted Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    We carry reliable, clinician‑recommended products to support daily independence.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-20 md:py-32 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Heart className="w-4 h-4" />
                Quality Equipment
              </div>
              <h2 className="font-serif font-bold text-4xl md:text-5xl text-foreground text-balance">
                Durable Medical Equipment We Provide
              </h2>
              <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
                Explore our curated selection of high-quality equipment to support your daily life.
              </p>
            </div>

            {/* Product Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-up delay-100">
              <Button
                variant={activeFilter === "all" ? "default" : "outline"}
                onClick={() => setActiveFilter("all")}
                className="rounded-full px-6 py-3 hover-lift"
              >
                All Products
              </Button>
              <Button
                variant={activeFilter === "mobility" ? "default" : "outline"}
                onClick={() => setActiveFilter("mobility")}
                className="rounded-full px-6 py-3 hover-lift"
              >
                Mobility Aids
              </Button>
              <Button
                variant={activeFilter === "respiratory" ? "default" : "outline"}
                onClick={() => setActiveFilter("respiratory")}
                className="rounded-full px-6 py-3 hover-lift"
              >
                Respiratory
              </Button>
              <Button
                variant={activeFilter === "safety" ? "default" : "outline"}
                onClick={() => setActiveFilter("safety")}
                className="rounded-full px-6 py-3 hover-lift"
              >
                Bathroom Safety
              </Button>
              <Button
                variant={activeFilter === "living" ? "default" : "outline"}
                onClick={() => setActiveFilter("living")}
                className="rounded-full px-6 py-3 hover-lift"
              >
                Daily Living Aids
              </Button>
            </div>

            {/* Product Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product, index) => (
                <Card
                  key={index}
                  className="glass hover-lift group animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="h-40 bg-gradient-subtle rounded-lg overflow-hidden mb-4 group-hover:scale-105 transition-transform duration-300">
                      <Image
                        src={getProductImageSrc(product.name)}
                        alt={product.name}
                        width={280}
                        height={160}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle className="font-serif text-xl group-hover:text-primary transition-colors">
                      {product.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed mb-4">{product.description}</CardDescription>
                    <Badge
                      variant="secondary"
                      className="capitalize bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {product.category.replace("-", " ")}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Insurance Section */}
        <section id="insurance" className="bg-card py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 right-20 w-64 h-64 bg-primary rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 left-20 w-48 h-48 bg-secondary rounded-full blur-2xl animate-float delay-1000"></div>
            <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-accent rounded-full blur-xl animate-float delay-500"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="animate-slide-in-left">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Shield className="w-4 h-4" />
                  Insurance Coverage
                </div>
                <h2 className="font-serif font-bold text-4xl md:text-5xl text-foreground text-balance">
                  Covered By Your Insurance
                </h2>
                <p className="mt-8 text-xl text-muted-foreground leading-relaxed">
                  We work with a vast network of insurance providers, including Medicare and Medicaid, to maximize your
                  benefits and minimize your out-of-pocket expenses.
                </p>
                <p className="mt-6 text-lg text-muted-foreground">
                  Our team are experts in navigating insurance policies to ensure you get the equipment you are entitled
                  to.
                </p>

                <div className="mt-10">
                  <h4 className="font-serif font-bold text-xl text-foreground mb-6">
                    Insurance Partners We Work With:
                  </h4>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="glass p-6 rounded-lg text-center hover-lift group relative overflow-hidden animate-scale-in">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10">
                        <Image
                          src="/insurers/medicare.svg"
                          alt="Medicare"
                          width={140}
                          height={40}
                          className="mx-auto mb-2 h-8 w-auto object-contain"
                        />
                        <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                          Medicare
                        </span>
                      </div>
                    </div>

                    <div
                      className="glass p-6 rounded-lg text-center hover-lift group relative overflow-hidden animate-scale-in"
                      style={{ animationDelay: "100ms" }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10">
                        <Image
                          src="/insurers/medicaid.svg"
                          alt="Medicaid"
                          width={140}
                          height={40}
                          className="mx-auto mb-2 h-8 w-auto object-contain"
                        />
                        <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                          Medicaid
                        </span>
                      </div>
                    </div>

                    <div
                      className="glass p-6 rounded-lg text-center hover-lift group relative overflow-hidden animate-scale-in"
                      style={{ animationDelay: "200ms" }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10">
                        <Image
                          src="/insurers/aetna.svg"
                          alt="Aetna"
                          width={140}
                          height={40}
                          className="mx-auto mb-2 h-8 w-auto object-contain"
                        />
                        <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                          Aetna
                        </span>
                      </div>
                    </div>

                    <div
                      className="glass p-6 rounded-lg text-center hover-lift group relative overflow-hidden animate-scale-in"
                      style={{ animationDelay: "300ms" }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10">
                        <Image
                          src="/insurers/bcbs.svg"
                          alt="Blue Cross Blue Shield"
                          width={180}
                          height={40}
                          className="mx-auto mb-2 h-8 w-auto object-contain"
                        />
                        <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                          Blue Cross Blue Shield
                        </span>
                      </div>
                    </div>

                    <div
                      className="glass p-6 rounded-lg text-center hover-lift group relative overflow-hidden animate-scale-in"
                      style={{ animationDelay: "400ms" }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10">
                        <Image
                          src="/insurers/cigna.svg"
                          alt="Cigna"
                          width={140}
                          height={40}
                          className="mx-auto mb-2 h-8 w-auto object-contain"
                        />
                        <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                          Cigna
                        </span>
                      </div>
                    </div>

                    <div
                      className="glass p-6 rounded-lg text-center hover-lift group relative overflow-hidden animate-scale-in"
                      style={{ animationDelay: "500ms" }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10">
                        <Image
                          src="/insurers/humana.svg"
                          alt="Humana"
                          width={140}
                          height={40}
                          className="mx-auto mb-2 h-8 w-auto object-contain"
                        />
                        <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                          Humana
                        </span>
                      </div>
                    </div>

                    <div
                      className="glass p-6 rounded-lg text-center hover-lift group relative overflow-hidden animate-scale-in"
                      style={{ animationDelay: "600ms" }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10">
                        <Image
                          src="/insurers/unitedhealth.svg"
                          alt="UnitedHealth"
                          width={160}
                          height={40}
                          className="mx-auto mb-2 h-8 w-auto object-contain"
                        />
                        <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                          UnitedHealth
                        </span>
                      </div>
                    </div>

                    <div
                      className="glass p-6 rounded-lg text-center hover-lift group relative overflow-hidden animate-scale-in"
                      style={{ animationDelay: "700ms" }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10">
                        <Image
                          src="/insurers/kaiser.svg"
                          alt="Kaiser Permanente"
                          width={180}
                          height={40}
                          className="mx-auto mb-2 h-8 w-auto object-contain"
                        />
                        <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                          Kaiser Permanente
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="animate-slide-in-right">
                <div className="glass p-10 rounded-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <h3 className="font-serif font-bold text-2xl text-center mb-8 group-hover:text-primary transition-colors">
                      Typical Coverage Breakdown
                    </h3>
                    <div className="space-y-8">
                      <div className="animate-fade-in-up">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-lg font-medium text-foreground">Insurance Coverage</span>
                          <span className="font-bold text-3xl text-primary animate-pulse-glow">80-90%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-6 overflow-hidden shadow-inner">
                          <div
                            className="bg-gradient-emerald h-6 rounded-full animate-gradient relative overflow-hidden"
                            style={{ width: "85%" }}
                          >
                            <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
                          </div>
                        </div>
                      </div>

                      <div className="animate-fade-in-up delay-200">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-lg font-medium text-foreground">Your Copay</span>
                          <span className="font-bold text-3xl text-secondary">10-20%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-6 overflow-hidden shadow-inner">
                          <div
                            className="bg-gradient-to-r from-secondary to-accent h-6 rounded-full relative overflow-hidden"
                            style={{ width: "15%" }}
                          >
                            <div className="absolute inset-0 bg-white/20 animate-shimmer delay-500"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/10">
                      <p className="text-sm text-muted-foreground text-center italic">
                        *Coverage varies by plan and equipment type
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 md:py-32 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Users className="w-4 h-4" />
                Patient Stories
              </div>
              <h2 className="font-serif font-bold text-4xl md:text-5xl text-foreground text-balance">
                Trusted By Patients and Families
              </h2>
              <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
                Hear what our satisfied clients have to say about our service.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={index}
                  className="glass hover-lift group animate-scale-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-secondary text-secondary group-hover:scale-110 transition-transform"
                          style={{ transitionDelay: `${i * 50}ms` }}
                        />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <blockquote className="text-muted-foreground mb-6 italic text-lg leading-relaxed">
                      "{testimonial.text}"
                    </blockquote>
                    <cite className="font-semibold text-foreground not-italic text-lg">- {testimonial.name}</cite>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-primary text-primary-foreground py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-32 h-32 border border-white/30 rounded-full animate-float"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 border border-white/30 rounded-full animate-float delay-1000"></div>
            <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-white/30 rounded-full animate-float delay-500"></div>
          </div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-primary-foreground/90 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 border border-primary-foreground">
                <Sparkles className="w-4 h-4 mr-2" />
                Get Started Today
              </div>
              <h2 className="font-serif font-bold text-4xl md:text-5xl text-balance text-primary-foreground">
                Ready to Get Started?
              </h2>
              <p className="mt-8 text-xl max-w-3xl mx-auto text-pretty leading-relaxed text-primary-foreground/90">
                Contact our friendly team today to check your eligibility or ask any questions. We're here to help you
                on your path to better health and independence.
              </p>
            </div>

            <div className="mt-16 grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <Card className="glass text-primary border-0 hover-lift animate-scale-in delay-100">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                    <Phone className="h-8 w-8" />
                  </div>
                  <CardTitle className="font-serif text-2xl">Call Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <a href="tel:628-262-7713" className="text-3xl font-bold hover:underline block">
                    628 262 7713
                  </a>
                  <p className="text-sm text-muted-foreground mt-3">Monday - Friday, 8 AM - 6 PM EST</p>
                </CardContent>
              </Card>

              <Card className="glass text-primary border-0 hover-lift animate-scale-in delay-200">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                    <Mail className="h-8 w-8" />
                  </div>
                  <CardTitle className="font-serif text-2xl">Email Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <a
                    href="mailto:support@psmedservices.com"
                    className="text-xl font-bold hover:underline break-all block"
                  >
                    support@psmedservices.com
                  </a>
                  <p className="text-sm text-muted-foreground mt-3">We respond within 24 hours</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-5 left-5 w-16 h-16 border border-white rounded-full"></div>
          <div className="absolute bottom-5 right-5 w-12 h-12 border border-white rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center space-x-4 mb-6 animate-fade-in-up">
            <div className="relative">
              <Image
                src="/images/ps-med-logo.png"
                alt="P&S Med Services Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-ping"></div>
            </div>
            <span className="font-serif font-bold text-2xl">P&S Med Services</span>
          </div>
          <p className="text-sm opacity-90 mb-2">&copy; 2024 P&S Med Services. All Rights Reserved.</p>
          <p className="text-xs opacity-75 max-w-2xl mx-auto">
            Your partner in health, providing quality medical equipment with compassion and care.
          </p>
          <div className="mt-4 flex items-center justify-center gap-6 text-sm">
            <a href="#products" className="hover:underline">
              Products
            </a>
            <a href="#insurance" className="hover:underline">
              Insurance
            </a>
            <a href="#contact" className="hover:underline">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
