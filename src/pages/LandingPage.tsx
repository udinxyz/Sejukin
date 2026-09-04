import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/landing/HeroSection'
import TrustStatsSection from '@/components/landing/TrustStatsSection'
import WhyChooseSection from '@/components/landing/WhyChooseSection'
import ServicesSection from '@/components/landing/ServicesSection'
import HowItWorksSection from '@/components/landing/HowItWorksSection'
import TestimonialsSection from '@/components/landing/TestimonialsSection'
import CTASection from '@/components/landing/CTASection'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />
      <main>
        <HeroSection />
        <TrustStatsSection />
        <WhyChooseSection />
        <ServicesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
