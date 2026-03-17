'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Globe, 
  Palette, 
  TrendingUp, 
  Search, 
  ShoppingCart, 
  Figma,
  ChevronRight,
  Menu,
  X,
  ArrowRight,
  Play,
  Star,
  Quote,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Linkedin,
  Instagram,
  Github,
  Zap,
  Target,
  LineChart,
  Users,
  Rocket,
  Sparkles,
  Code2,
  Layers,
  BarChart3,
  Megaphone,
  PenTool,
  Calendar,
  Clock,
  Send,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react'
import { useState, useRef } from 'react'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
}

// Project Details Data
const projectDetails = {
  'health-wellness': {
    title: 'Health & Wellness Website',
    category: 'Website',
    client: 'Serenity Wellness Studio',
    timeline: '8 weeks',
    image: '/projects/health-wellness.png',
    overview: 'A comprehensive website redesign and build for a premium health and wellness brand. The project encompassed a complete digital transformation, creating an immersive online experience that reflects the brand\'s commitment to holistic well-being.',
    challenge: 'The client needed a digital presence that would differentiate them in the crowded wellness market. Their existing website was outdated, difficult to navigate, and didn\'t effectively communicate their unique value proposition or capture leads.',
    solution: 'We designed and developed a modern, responsive website with a calming aesthetic that aligns with the brand\'s wellness focus. The solution included a streamlined booking system, an SEO-optimized blog for content marketing, and a conversion-optimized landing page.',
    features: [
      'Custom landing page with hero video background',
      'Integrated booking system with calendar sync',
      'SEO-optimized blog with content architecture',
      'Mobile-first responsive design',
      'Client testimonial showcase',
      'Newsletter subscription integration',
      'Performance optimization (95+ Lighthouse score)',
      'Analytics and conversion tracking setup'
    ],
    results: [
      '200% increase in online bookings',
      '150% more organic traffic in 3 months',
      '45% reduction in bounce rate',
      '85% improvement in page load speed'
    ],
    technologies: ['Next.js', 'Tailwind CSS', 'Contentful CMS', 'Calendly Integration', 'Google Analytics']
  },
  'fintech-brand': {
    title: 'Fintech Brand Identity',
    category: 'Branding',
    client: 'NexPay Financial',
    timeline: '6 weeks',
    image: '/projects/fintech-brand.png',
    overview: 'A complete brand identity development for an innovative fintech startup. The project delivered a cohesive visual identity that communicates trust, innovation, and simplicity in financial services.',
    challenge: 'As a new entrant in the competitive fintech space, NexPay needed a brand identity that would stand out while conveying trust and security. They required a complete brand system that could scale across digital products, marketing materials, and investor presentations.',
    solution: 'We developed a comprehensive brand identity system from the ground up, starting with strategic positioning and extending to every touchpoint. The design language balances modern innovation with financial credibility, using a sophisticated color palette and clean typography.',
    features: [
      'Custom logo design with brand mark',
      'Primary and secondary color palette',
      'Typography system with hierarchy guidelines',
      'Comprehensive brand guidelines document',
      'Mobile app UI mockups (20+ screens)',
      'Web dashboard UI designs',
      'Marketing collateral templates',
      'Icon set and illustration style'
    ],
    results: [
      'Successful Series A funding round',
      '95% positive user testing feedback',
      'Brand recognition increased 300%',
      '3 design industry awards'
    ],
    technologies: ['Figma', 'Adobe Illustrator', 'Principle', 'Brand Strategy', 'Design Systems']
  },
  'real-estate-social': {
    title: 'Real Estate Agency Social & Ads',
    category: 'Marketing',
    client: 'Prestige Properties',
    timeline: '4 weeks',
    image: '/projects/real-estate-social.png',
    overview: 'A comprehensive social media strategy and paid advertising campaign for a luxury real estate agency. The project delivered a complete content ecosystem designed to generate qualified leads and build brand authority in the competitive property market.',
    challenge: 'Prestige Properties was struggling to stand out in a saturated market with inconsistent social media presence. Their previous marketing efforts were fragmented, lacked a cohesive strategy, and weren\'t generating quality leads or meaningful engagement.',
    solution: 'We developed an integrated social media and paid advertising strategy focused on showcasing luxury properties while establishing thought leadership. The approach combined organic content pillars with targeted paid campaigns across Instagram, Facebook, and LinkedIn.',
    features: [
      'Social media strategy & content pillars',
      '30-day content calendar',
      '50+ custom post designs',
      'Video content scripts & story templates',
      'Paid ad creative sets (15 variations)',
      'Audience targeting strategy',
      'Lead magnet landing pages',
      'Analytics & reporting dashboard'
    ],
    results: [
      '400% increase in lead generation',
      '250K+ monthly impressions',
      '4.2% average engagement rate',
      '35% reduction in cost per lead'
    ],
    technologies: ['Meta Ads Manager', 'Canva Pro', 'Later', 'Google Analytics', 'HubSpot']
  },
  'sechild-ngo': {
    title: 'Sechild— NGO Platform',
    category: 'Website',
    client: 'Sechild Foundation',
    timeline: '10 weeks',
    image: '/projects/sechild-ngo.png',
    overview: 'A purpose-built digital platform for an NGO focused on child welfare and community development. The solution integrated donor management, beneficiary tracking, program management, and automated impact reporting into a single, intuitive system.',
    challenge: 'Sechild Foundation was managing their operations across multiple disconnected tools—spreadsheets for donor data, paper files for beneficiary records, and manual report generation. This fragmented approach led to data inconsistencies, reporting delays, and difficulty demonstrating impact to stakeholders.',
    solution: 'We built a custom platform that centralizes all NGO operations. The system streamlines donor relationships, tracks beneficiary progress, manages programs, and automatically generates impact reports. The design prioritizes ease-of-use for staff with varying technical skills.',
    features: [
      'Donor management & CRM system',
      'Beneficiary tracking & profiles',
      'Program management dashboard',
      'Automated impact reporting',
      'Donation processing integration',
      'Volunteer coordination tools',
      'Document & media library',
      'Multi-user role permissions'
    ],
    results: [
      '60% reduction in admin time',
      '100% data accuracy improvement',
      '45% increase in donor retention',
      'Real-time impact reporting enabled'
    ],
    technologies: ['Next.js', 'PostgreSQL', 'Prisma', 'Stripe', 'Chart.js']
  },
  'brand-video': {
    title: 'Brand Video Series',
    category: 'Content Production',
    client: 'Lumina Lifestyle Co.',
    timeline: '5 weeks',
    image: '/projects/brand-video.png',
    overview: 'A 6-part brand documentary series for a lifestyle company, showcasing their journey from startup to industry leader. The project covered concept development, scripting, filming, post-production editing, and motion graphics integration.',
    challenge: 'Lumina Lifestyle wanted to tell their brand story in an authentic, engaging way that would resonate with their audience. Their previous video content was inconsistent and failed to capture the emotional depth of their brand journey.',
    solution: 'We developed a comprehensive video strategy centered on authentic storytelling. The series was filmed across multiple locations with a cinematic approach, featuring interviews, behind-the-scenes footage, and custom motion graphics that reinforce brand values.',
    features: [
      'Brand story concept development',
      'Full scriptwriting & storyboarding',
      'Multi-location filming (6 episodes)',
      'Professional post-production editing',
      'Custom motion graphics & animations',
      'Original music composition',
      'Social media optimization cuts',
      'Behind-the-scenes documentary footage',
      'Brand documentary premiere event'
    ],
    results: [
      '2M+ total views in first month',
      '500K+ social shares',
      '45% increase in brand awareness',
      '3 industry feature mentions'
    ],
    technologies: ['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Cinema Cameras', 'Original Score']
  },
  'b2b-saas-seo': {
    title: 'B2B SaaS SEO Overhaul',
    category: 'SEO & Content Strategy',
    client: 'CloudSync Software',
    timeline: '6 months',
    image: '/projects/b2b-saas-seo.png',
    overview: 'A comprehensive SEO audit and 6-month content strategy for a B2B software company. The project transformed their organic search presence through technical optimization, strategic content creation, and targeted link building campaigns.',
    challenge: 'CloudSync Software was struggling to rank for competitive B2B SaaS keywords despite having a quality product. Their previous SEO efforts were fragmented, with technical debt from poor site architecture and no consistent content strategy. Organic traffic was flat and lead quality from search was low.',
    solution: 'We executed a comprehensive SEO overhaul starting with a full technical audit. We redesigned their site architecture, developed a content strategy targeting high-intent keywords, and implemented a systematic backlink outreach program. The approach balanced quick technical wins with long-term authority building.',
    features: [
      'Full technical SEO audit',
      'Keyword research & mapping strategy',
      'Site architecture redesign',
      'Core web vitals optimization',
      'Content calendar (24 blog posts)',
      'Pillar content creation',
      'Backlink outreach campaign',
      'Internal linking optimization',
      'Schema markup implementation'
    ],
    results: [
      '350% increase in organic traffic',
      '45 keywords in top 10 rankings',
      '120% improvement in lead quality',
      '200+ high-quality backlinks earned'
    ],
    technologies: ['Ahrefs', 'SEMrush', 'Screaming Frog', 'Google Search Console', 'Clearscope']
  }
}

// Project Modal Component
interface ProjectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  projectKey: string | null
  onStartProject: () => void
}

function ProjectModal({ open, onOpenChange, projectKey, onStartProject }: ProjectModalProps) {
  const project = projectKey ? projectDetails[projectKey as keyof typeof projectDetails] : null
  
  if (!project) return null
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] rounded-3xl p-0 flex flex-col">
        {/* Project Image Header */}
        <div className="relative w-full h-48 sm:h-56 shrink-0">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover rounded-t-3xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-t-3xl" />
          <div className="absolute bottom-4 left-6 right-6">
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium mb-2">
              {project.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">{project.title}</h2>
          </div>
        </div>
        
        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* Project Meta */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-brand-primary" />
              <span className="text-foreground/60">Client:</span>
              <span className="font-medium">{project.client}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-primary" />
              <span className="text-foreground/60">Timeline:</span>
              <span className="font-medium">{project.timeline}</span>
            </div>
          </div>
          
          {/* Overview */}
          <div>
            <h4 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider mb-2">Overview</h4>
            <p className="text-foreground/70 leading-relaxed">{project.overview}</p>
          </div>
          
          {/* Challenge */}
          <div>
            <h4 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider mb-2">The Challenge</h4>
            <p className="text-foreground/70 leading-relaxed">{project.challenge}</p>
          </div>
          
          {/* Solution */}
          <div>
            <h4 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider mb-2">Our Solution</h4>
            <p className="text-foreground/70 leading-relaxed">{project.solution}</p>
          </div>
          
          {/* Features */}
          <div>
            <h4 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider mb-3">Key Features</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-foreground/70">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Results */}
          <div>
            <h4 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider mb-3">Results</h4>
            <div className="grid grid-cols-2 gap-3">
              {project.results.map((result, index) => (
                <div key={index} className="bg-brand-primary/10 rounded-xl p-3 text-center">
                  <div className="text-lg font-bold text-brand-primary">{result.split(' ')[0]}</div>
                  <div className="text-xs text-foreground/60">{result.split(' ').slice(1).join(' ')}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Technologies */}
          <div>
            <h4 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider mb-3">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-foreground/5 text-foreground/70"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          {/* CTA */}
          <div className="pt-4 border-t border-foreground/10">
            <p className="text-sm text-foreground/60 mb-4 text-center">
              Want to build something similar for your brand?
            </p>
            <Button 
              onClick={() => {
                onOpenChange(false)
                onStartProject()
              }}
              className="w-full bg-gradient-brand hover:opacity-90 text-white rounded-xl h-12"
            >
              <Rocket className="mr-2 w-4 h-4" />
              Start a Project
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Service Details Data
const serviceDetails = {
  'web-development': {
    title: 'Website Development',
    icon: Globe,
    color: 'from-brand-primary to-brand-secondary',
    description: 'We build custom, responsive websites that perform flawlessly across all devices and platforms.',
    benefits: [
      'Custom design tailored to your brand identity',
      'Mobile-first responsive development',
      'Fast loading speeds & optimized performance',
      'SEO-friendly architecture',
      'Easy-to-use content management',
      'Ongoing maintenance & support'
    ],
    howWeHelp: 'Whether you need a corporate website, landing page, or complex web application, our team delivers solutions that drive results. We focus on user experience, conversion optimization, and scalable architecture that grows with your business.',
    deliverables: ['Custom Website', 'Mobile Responsive Design', 'CMS Integration', 'Analytics Setup', 'SEO Foundation']
  },
  'ui-ux-design': {
    title: 'UI/UX Design',
    icon: Palette,
    color: 'from-brand-secondary to-brand-accent',
    description: 'User-centered design that creates intuitive, engaging digital experiences your customers will love.',
    benefits: [
      'User research & persona development',
      'Wireframing & prototyping',
      'Visual design & brand consistency',
      'Usability testing & iteration',
      'Design system creation',
      'Mobile & web interfaces'
    ],
    howWeHelp: 'Great design isn\'t just about aesthetics—it\'s about solving problems for your users. We dive deep into understanding your audience, creating interfaces that are intuitive, accessible, and delightful to use.',
    deliverables: ['User Research', 'Wireframes', 'High-Fidelity Mockups', 'Interactive Prototypes', 'Design System']
  },
  'digital-marketing': {
    title: 'Digital Marketing',
    icon: TrendingUp,
    color: 'from-brand-accent to-brand-primary',
    description: 'Strategic digital marketing campaigns that build brand awareness and drive measurable growth.',
    benefits: [
      'Multi-channel campaign strategy',
      'Social media marketing',
      'Email marketing automation',
      'Content marketing',
      'PPC advertising',
      'Performance analytics & reporting'
    ],
    howWeHelp: 'We create data-driven marketing strategies that connect with your target audience and convert them into customers. From brand awareness to lead generation, we help you achieve your business goals.',
    deliverables: ['Marketing Strategy', 'Campaign Management', 'Content Calendar', 'Performance Reports', 'ROI Analysis']
  },
  'seo': {
    title: 'SEO Optimization',
    icon: Search,
    color: 'from-brand-primary to-brand-secondary',
    description: 'Data-driven SEO strategies that improve visibility and drive organic traffic to your site.',
    benefits: [
      'Comprehensive SEO audit',
      'Keyword research & strategy',
      'On-page optimization',
      'Technical SEO improvements',
      'Link building campaigns',
      'Local SEO optimization'
    ],
    howWeHelp: 'We help your business get found online. Our SEO experts analyze your website, identify opportunities, and implement strategies that improve your search rankings and drive qualified organic traffic.',
    deliverables: ['SEO Audit', 'Keyword Strategy', 'On-Page Optimization', 'Technical Fixes', 'Monthly Reports']
  },
  'ecommerce': {
    title: 'E-commerce Development',
    icon: ShoppingCart,
    color: 'from-brand-accent to-brand-primary',
    description: 'Scalable online stores with seamless checkout experiences that drive conversions.',
    benefits: [
      'Custom e-commerce solutions',
      'Payment gateway integration',
      'Inventory management',
      'Shopping cart optimization',
      'Mobile commerce ready',
      'Order & customer management'
    ],
    howWeHelp: 'We build e-commerce platforms that convert browsers into buyers. From product pages to checkout, we optimize every step of the customer journey to maximize your sales.',
    deliverables: ['Online Store', 'Payment Integration', 'Inventory System', 'Order Management', 'Analytics Dashboard']
  },
  'branding': {
    title: 'Brand Identity Design',
    icon: Layers,
    color: 'from-brand-secondary to-brand-accent',
    description: 'Distinctive visual identities that communicate your brand essence and values.',
    benefits: [
      'Logo design & variations',
      'Brand color palette',
      'Typography selection',
      'Brand guidelines',
      'Marketing collateral',
      'Social media assets'
    ],
    howWeHelp: 'Your brand is more than a logo—it\'s the emotional connection with your audience. We create cohesive brand identities that tell your story and set you apart from competitors.',
    deliverables: ['Logo Design', 'Brand Guidelines', 'Color Palette', 'Typography', 'Marketing Templates']
  }
}

// Service Modal Component
interface ServiceModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  serviceKey: string | null
  onBookConsultation: () => void
}

function ServiceModal({ open, onOpenChange, serviceKey, onBookConsultation }: ServiceModalProps) {
  const service = serviceKey ? serviceDetails[serviceKey as keyof typeof serviceDetails] : null
  
  if (!service) return null
  
  const IconComponent = service.icon
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto rounded-3xl">
        <DialogHeader>
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 shadow-brand`}>
            <IconComponent className="w-7 h-7 text-white" />
          </div>
          <DialogTitle className="text-2xl font-bold">{service.title}</DialogTitle>
          <DialogDescription className="text-base">
            {service.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-6 space-y-6">
          {/* How We Help */}
          <div>
            <h4 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider mb-2">How We Can Help</h4>
            <p className="text-foreground/70 leading-relaxed">{service.howWeHelp}</p>
          </div>
          
          {/* Benefits */}
          <div>
            <h4 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider mb-3">What You Get</h4>
            <ul className="grid grid-cols-2 gap-2">
              {service.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-foreground/70">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Deliverables */}
          <div>
            <h4 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider mb-3">Deliverables</h4>
            <div className="flex flex-wrap gap-2">
              {service.deliverables.map((item, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-brand-primary/10 text-brand-primary"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          
          {/* CTA */}
          <Button 
            onClick={() => {
              onOpenChange(false)
              onBookConsultation()
            }}
            className="w-full bg-gradient-brand hover:opacity-90 text-white rounded-xl h-12"
          >
            <Calendar className="mr-2 w-4 h-4" />
            Book a Consultation
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Contact Modal Component
interface ContactModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  type: 'project' | 'consultation'
}

function ContactModal({ open, onOpenChange, type }: ContactModalProps) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, type }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong.')
      }

      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        onOpenChange(false)
        setFormData({ name: '', email: '', company: '', service: '', budget: '', message: '' })
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {type === 'project' ? 'Start a Project' : 'Book a Consultation'}
          </DialogTitle>
          <DialogDescription>
            {type === 'project' 
              ? 'Fill out the form below and we\'ll get back to you within 24 hours.'
              : 'Schedule a free consultation to discuss your project needs.'}
          </DialogDescription>
        </DialogHeader>
        
        {submitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-12 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
            <p className="text-foreground/60">We'll get back to you soon.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input 
                  id="name" 
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input 
                  id="email" 
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="rounded-xl"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input 
                id="company" 
                placeholder="Your company name"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className="rounded-xl"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="service">Service Interested In</Label>
              <Select value={formData.service} onValueChange={(value) => setFormData({...formData, service: value})}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web-development">Web Development</SelectItem>
                  <SelectItem value="ui-ux-design">UI/UX Design</SelectItem>
                  <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
                  <SelectItem value="seo">SEO Optimization</SelectItem>
                  <SelectItem value="branding">Brand Identity</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {type === 'project' && (
              <div className="space-y-2">
                <Label htmlFor="budget">Budget Range</Label>
                <Select value={formData.budget} onValueChange={(value) => setFormData({...formData, budget: value})}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                    <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                    <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                    <SelectItem value="50k+">$50,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea 
                id="message" 
                placeholder={type === 'project' 
                  ? 'Tell us about your project...' 
                  : 'What would you like to discuss?'}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
                className="rounded-xl min-h-[100px]"
              />
            </div>
            
            {error && (
              <div className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3">
                {error}
              </div>
            )}
            
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-brand hover:opacity-90 text-white rounded-xl h-12 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="mr-2 w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 w-4 h-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

// Navigation Component
function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState<'project' | 'consultation'>('project')
  
  const openModal = (type: 'project' | 'consultation') => {
    setModalType(type)
    setModalOpen(true)
    setIsOpen(false)
  }
  
  return (
    <>
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="glass-card rounded-2xl px-6 py-3 flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3">
              <img 
                src="/logo.png" 
                alt="22 Dstrct Logo" 
                className="h-10 w-auto object-contain"
              />
              <span className="font-bold text-xl tracking-tight">Dstrct</span>
            </a>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">About</a>
              <a href="#services" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">Services</a>
              <a href="#team" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">Team</a>
              <a href="#portfolio" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">Portfolio</a>
            </div>
            
            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-3">
              <Button 
                onClick={() => openModal('project')}
                className="bg-gradient-brand hover:opacity-90 text-white shadow-brand rounded-xl px-5"
              >
                Start a Project
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-foreground/5"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
          
          {/* Mobile Menu */}
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden glass-card rounded-2xl mt-2 p-4"
            >
              <div className="flex flex-col gap-3">
                <a href="#about" className="text-sm font-medium py-2 px-3 rounded-lg hover:bg-foreground/5" onClick={() => setIsOpen(false)}>About</a>
                <a href="#services" className="text-sm font-medium py-2 px-3 rounded-lg hover:bg-foreground/5" onClick={() => setIsOpen(false)}>Services</a>
                <a href="#team" className="text-sm font-medium py-2 px-3 rounded-lg hover:bg-foreground/5" onClick={() => setIsOpen(false)}>Team</a>
                <a href="#portfolio" className="text-sm font-medium py-2 px-3 rounded-lg hover:bg-foreground/5" onClick={() => setIsOpen(false)}>Portfolio</a>
                <Button onClick={() => openModal('project')} className="bg-gradient-brand text-white rounded-xl mt-2">
                  Start a Project
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>
      
      <ContactModal open={modalOpen} onOpenChange={setModalOpen} type={modalType} />
    </>
  )
}

// Hero Section
function HeroSection() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState<'project' | 'consultation'>('project')
  const [serviceModalOpen, setServiceModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  
  const openModal = (type: 'project' | 'consultation') => {
    setModalType(type)
    setModalOpen(true)
  }
  
  const openServiceModal = (serviceKey: string) => {
    setSelectedService(serviceKey)
    setServiceModalOpen(true)
  }
  
  const handleBookConsultation = () => {
    setModalOpen(true)
    setModalType('consultation')
  }
  
  const services = [
    { icon: Globe, label: 'Web Development', key: 'web-development' },
    { icon: Palette, label: 'UI/UX Design', key: 'ui-ux-design' },
    { icon: TrendingUp, label: 'Digital Marketing', key: 'digital-marketing' },
    { icon: Search, label: 'SEO', key: 'seo' },
  ]
  
  return (
    <>
      <section className="relative min-h-screen flex items-center pt-24 pb-16 px-4 overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-brand opacity-[0.03] animate-gradient" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl animate-float-delayed" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Text Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
              >
                <Sparkles className="w-4 h-4 text-brand-primary" />
                <span className="text-sm font-medium">Your Digital Growth Partner</span>
              </motion.div>
              
              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6"
              >
                We Build Digital Experiences{' '}
                <span className="text-gradient">That Convert.</span>
              </motion.h1>
              
              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg sm:text-xl text-foreground/70 max-w-xl mx-auto lg:mx-0 mb-10"
              >
              22 Dstrct is a modern web development and digital marketing studio helping brands grow online with powerful websites and strategic marketing.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10"
            >
              <Button 
                size="lg"
                onClick={() => openModal('project')}
                className="bg-gradient-brand hover:opacity-90 text-white shadow-brand-lg rounded-2xl px-8 h-14 text-lg"
              >
                Start a Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => openModal('consultation')}
                className="rounded-2xl px-8 h-14 text-lg border-foreground/10 hover:bg-foreground/5"
              >
                Book a Consultation
              </Button>
            </motion.div>
            
            {/* Service Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3"
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  onClick={() => openServiceModal(service.key)}
                  className="glass-card rounded-xl px-4 py-2 flex items-center gap-2 cursor-pointer hover:shadow-brand transition-shadow"
                >
                  <service.icon className="w-4 h-4 text-brand-primary" />
                  <span className="text-sm font-medium">{service.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Right - Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-gradient-brand opacity-20 blur-3xl rounded-3xl scale-90" />
              
              {/* Main image */}
              <div className="relative glass-card rounded-3xl overflow-hidden shadow-brand-lg">
                <img 
                  src="/hero-image.png" 
                  alt="22 Dstrct Digital Solutions"
                  className="w-full h-auto object-cover"
                />
              </div>
              
              {/* Floating accent elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 glass-card rounded-2xl px-4 py-3 shadow-brand"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-brand flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">Fast Delivery</div>
                    <div className="text-xs text-foreground/60">2-4 weeks</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 glass-card rounded-2xl px-4 py-3 shadow-brand"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-secondary to-brand-accent flex items-center justify-center">
                    <Star className="w-4 h-4 text-white fill-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">5.0 Rating</div>
                    <div className="text-xs text-foreground/60">50+ Reviews</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-foreground/20 flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-brand-primary"
          />
        </div>
      </motion.div>
    </section>
    
    <ContactModal open={modalOpen} onOpenChange={setModalOpen} type={modalType} />
    <ServiceModal 
      open={serviceModalOpen} 
      onOpenChange={setServiceModalOpen} 
      serviceKey={selectedService}
      onBookConsultation={handleBookConsultation}
    />
    </>
  )
}

// About Section
function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  return (
    <section id="about" className="relative py-24 px-4 overflow-hidden" ref={containerRef}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/about-bg.png" 
          alt="" 
          className="w-full h-full object-cover"
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-background/20" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Content Card (moved from right) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="glass-card rounded-3xl p-8 lg:p-10 shadow-brand backdrop-blur-xl bg-background/60">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-medium mb-6">
                About Us
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Crafting Digital Experiences Since Day One
              </h2>
              
              <p className="text-lg text-foreground/70 mb-6">
                22 Dstrct was born from a simple belief: every brand deserves a powerful digital presence. We&apos;re a collective of designers, developers, and strategists who transform visions into digital realities.
              </p>
              
              <p className="text-lg text-foreground/70 mb-8">
                From stunning websites to comprehensive marketing campaigns, we blend creativity with data-driven strategies to deliver measurable results. Our approach is collaborative, transparent, and focused on your success.
              </p>
              
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-foreground/10">
                <div>
                  <div className="text-3xl font-bold text-gradient">50+</div>
                  <div className="text-sm text-foreground/60">Projects Delivered</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gradient">98%</div>
                  <div className="text-sm text-foreground/60">Client Satisfaction</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gradient">3x</div>
                  <div className="text-sm text-foreground/60">Avg. ROI Increase</div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right - Empty space to let background image show through */}
          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  )
}

// Services Section
function ServicesSection() {
  const [serviceModalOpen, setServiceModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [contactModalOpen, setContactModalOpen] = useState(false)
  
  const services = [
    {
      icon: Globe,
      title: 'Website Development',
      description: 'Custom-built, responsive websites that perform flawlessly across all devices and platforms.',
      color: 'from-brand-primary to-brand-secondary',
      key: 'web-development'
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'User-centered design that creates intuitive, engaging digital experiences your customers will love.',
      color: 'from-brand-secondary to-brand-accent',
      key: 'ui-ux-design'
    },
    {
      icon: ShoppingCart,
      title: 'E-commerce Development',
      description: 'Scalable online stores with seamless checkout experiences that drive conversions.',
      color: 'from-brand-accent to-brand-primary',
      key: 'ecommerce'
    },
    {
      icon: Search,
      title: 'SEO Optimization',
      description: 'Data-driven SEO strategies that improve visibility and drive organic traffic to your site.',
      color: 'from-brand-primary to-brand-secondary',
      key: 'seo'
    },
    {
      icon: TrendingUp,
      title: 'Social Media Marketing',
      description: 'Strategic social campaigns that build brand awareness and engage your target audience.',
      color: 'from-brand-secondary to-brand-accent',
      key: 'digital-marketing'
    },
    {
      icon: Layers,
      title: 'Brand Identity Design',
      description: 'Distinctive visual identities that communicate your brand essence and values.',
      color: 'from-brand-accent to-brand-primary',
      key: 'branding'
    }
  ]
  
  const openServiceModal = (serviceKey: string) => {
    setSelectedService(serviceKey)
    setServiceModalOpen(true)
  }
  
  const handleBookConsultation = () => {
    setContactModalOpen(true)
  }
  
  return (
    <>
      <section id="services" className="py-24 px-4 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-brand-primary/5 to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-secondary/10 text-brand-secondary text-sm font-medium mb-6"
            >
              Our Services
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Solutions That Drive <span className="text-gradient">Growth</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-foreground/70 max-w-2xl mx-auto">
              We offer comprehensive digital services tailored to transform your business and accelerate your growth.
            </motion.p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={scaleIn}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group"
              >
                <Card 
                  onClick={() => openServiceModal(service.key)}
                  className="glass-card h-full p-8 rounded-3xl border-0 hover:shadow-brand-lg transition-all duration-300 cursor-pointer"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-brand group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-foreground/60 leading-relaxed">{service.description}</p>
                  <div className="mt-6 flex items-center text-brand-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn More <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      <ServiceModal 
        open={serviceModalOpen} 
        onOpenChange={setServiceModalOpen} 
        serviceKey={selectedService}
        onBookConsultation={handleBookConsultation}
      />
      <ContactModal 
        open={contactModalOpen} 
        onOpenChange={setContactModalOpen} 
        type="consultation"
      />
    </>
  )
}

// Portfolio Section
function PortfolioSection() {
  const [projectModalOpen, setProjectModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [contactModalOpen, setContactModalOpen] = useState(false)
  
  const openProjectModal = (projectKey: string) => {
    setSelectedProject(projectKey)
    setProjectModalOpen(true)
  }
  
  const handleStartProject = () => {
    setContactModalOpen(true)
  }
  
  const projects = [
    {
      title: 'Health & Wellness Website',
      category: 'Website',
      description: 'Full website design and build for a health and wellness brand: landing page, blog, booking flow, and SEO-optimized content architecture.',
      image: '/projects/health-wellness.png',
      key: 'health-wellness'
    },
    {
      title: 'Fintech Brand Identity',
      category: 'Branding',
      description: 'Complete brand identity concept for a fictional fintech startup: logo, color palette, typography system, brand guidelines, and app UI mockups.',
      image: '/projects/fintech-brand.png',
      key: 'fintech-brand'
    },
    {
      title: 'Real Estate Agency Social & Ads',
      category: 'Marketing',
      description: 'Full social media strategy and paid ad concept for a real estate agency: content pillars, sample posts, ad creatives, and targeting strategy.',
      image: '/projects/real-estate-social.png',
      key: 'real-estate-social'
    },
    {
      title: 'Sechild— NGO Platform',
      category: 'Website',
      description: 'A purpose-built NGO website combining donor management, beneficiary tracking, program management, and automated impact reporting in a single, easy-to-use platform.',
      image: '/projects/sechild-ngo.png',
      key: 'sechild-ngo'
    },
    {
      title: 'Brand Video Series',
      category: 'Content Production',
      description: 'Produced a 6-part brand documentary series for a lifestyle company — concept development, scripting, filming, and post-production editing with motion graphics.',
      image: '/projects/brand-video.png',
      key: 'brand-video'
    },
    {
      title: 'B2B SaaS SEO Overhaul',
      category: 'SEO & Content Strategy',
      description: 'Comprehensive SEO audit and 6-month content strategy for a B2B software company — keyword mapping, blog production, backlink outreach, and on-page optimization.',
      image: '/projects/b2b-saas-seo.png',
      key: 'b2b-saas-seo'
    }
  ]
  
  return (
    <>
    <section id="portfolio" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div 
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-medium mb-6"
          >
            Our Work
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Featured <span className="text-gradient">Projects</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Explore our latest work and see how we've helped brands achieve their digital goals.
          </motion.p>
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={scaleIn}
              onClick={() => project.key && openProjectModal(project.key)}
              className="group relative overflow-hidden rounded-3xl cursor-pointer"
            >
              {/* Project Image */}
              <div className="aspect-[4/3] relative">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              
              {/* Glass Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="glass rounded-xl px-3 py-1 text-xs font-medium text-white w-fit mb-3">
                  {project.category}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-white/70 text-sm mb-4">{project.description}</p>
                <Button 
                  size="sm"
                  className="w-fit bg-white/20 hover:bg-white/30 text-white rounded-xl backdrop-blur-sm"
                >
                  View Case Study
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
              
              {/* Default visible content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 group-hover:opacity-0 transition-opacity duration-300">
                <div className="text-white/80 text-xs font-medium mb-2">{project.category}</div>
                <h3 className="text-lg font-bold text-white">{project.title}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
      
      <ProjectModal 
        open={projectModalOpen} 
        onOpenChange={setProjectModalOpen} 
        projectKey={selectedProject}
        onStartProject={handleStartProject}
      />
      <ContactModal 
        open={contactModalOpen} 
        onOpenChange={setContactModalOpen} 
        type="project"
      />
    </>
  )
}

// Process Section
function ProcessSection() {
  const steps = [
    { 
      icon: Target, 
      title: 'Strategy', 
      description: 'Deep dive into your goals, market, and audience',
      color: 'text-brand-primary',
      bgColor: 'bg-brand-primary/10'
    },
    { 
      icon: Palette, 
      title: 'Design', 
      description: 'Stunning visuals crafted around user experience',
      color: 'text-brand-secondary',
      bgColor: 'bg-brand-secondary/10'
    },
    { 
      icon: Zap, 
      title: 'Development', 
      description: 'Clean, performant code built for scale',
      color: 'text-brand-accent',
      bgColor: 'bg-brand-accent/10'
    },
    { 
      icon: Rocket, 
      title: 'Launch', 
      description: 'Rigorous testing and seamless deployment',
      color: 'text-brand-primary',
      bgColor: 'bg-brand-primary/10'
    },
    { 
      icon: TrendingUp, 
      title: 'Growth', 
      description: 'Ongoing optimization and marketing support',
      color: 'text-brand-secondary',
      bgColor: 'bg-brand-secondary/10'
    }
  ]
  
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-primary/3 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div 
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-secondary/10 text-brand-secondary text-sm font-medium mb-6"
          >
            How We Work
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Our <span className="text-gradient">Process</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-foreground/70 max-w-2xl mx-auto">
            A proven, streamlined workflow that takes your project from idea to impact.
          </motion.p>
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-16 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-brand-primary/30 via-brand-secondary/30 to-brand-primary/30" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                variants={fadeInUp}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Step Number Badge */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20">
                  <div className="w-8 h-8 rounded-full bg-gradient-brand flex items-center justify-center text-white text-sm font-bold shadow-brand">
                    {index + 1}
                  </div>
                </div>
                
                {/* Icon Card */}
                <div className="relative z-10 w-24 h-24 rounded-2xl glass-card flex items-center justify-center mb-6 shadow-brand group-hover:shadow-brand-lg transition-all duration-300 group-hover:-translate-y-1">
                  <div className={`w-12 h-12 rounded-xl ${step.bgColor} flex items-center justify-center`}>
                    <step.icon className={`w-6 h-6 ${step.color}`} />
                  </div>
                </div>
                
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-foreground/60 max-w-[180px] leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      quote: "22 Dstrct transformed our online presence completely. Our website traffic increased by 300% within three months of launch.",
      author: "Maduakor Obianuju",
      role: "CEO, Serenity Wellness",
      avatar: "MO"
    },
    {
      quote: "The team's attention to detail and creative vision exceeded our expectations. They truly understood our brand and delivered.",
      author: "Chief Ifeanyi Obi",
      role: "Director, Prestige Properties",
      avatar: "IO"
    },
    {
      quote: "Professional, responsive, and incredibly talented. Our e-commerce platform now converts 4x better than before.",
      author: "Kawan Aondofa-Anjira",
      role: "Founder & President, Sechild",
      avatar: "KA"
    }
  ]
  
  return (
    <section id="testimonials" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div 
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-medium mb-6"
          >
            Testimonials
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Client <span className="text-gradient">Stories</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Hear what our clients have to say about working with us.
          </motion.p>
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              variants={scaleIn}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <Card className="glass-card h-full p-8 rounded-3xl border-0 shadow-brand hover:shadow-brand-lg transition-all duration-300">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-brand-accent text-brand-accent" />
                  ))}
                </div>
                
                {/* Quote */}
                <Quote className="w-8 h-8 text-brand-primary/20 mb-4" />
                <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                
                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold">{testimonial.author}</div>
                    <div className="text-sm text-foreground/60">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Team Section
function TeamSection() {
  const team = [
    {
      name: 'Temidayo',
      role: 'Founder',
      bio: 'Visionary leader driving digital innovation and growth',
      avatar: 'T'
    },
    {
      name: 'Micheal',
      role: 'Chief Operations Officer',
      bio: 'Strategic operations expert ensuring seamless delivery',
      avatar: 'M'
    },
    {
      name: 'Jude',
      role: 'Chief Technical Officer',
      bio: 'Technical mastermind architecting scalable solutions',
      avatar: 'J'
    }
  ]
  
  return (
    <section id="team" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div 
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-medium mb-6"
          >
            Our Team
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Meet the <span className="text-gradient">Creators</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-foreground/70 max-w-2xl mx-auto">
            A passionate team of designers, developers, and strategists dedicated to your success.
          </motion.p>
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              variants={scaleIn}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group"
            >
              <Card className="glass-card h-full p-6 rounded-3xl border-0 shadow-brand hover:shadow-brand-lg transition-all duration-300 text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-brand flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-brand group-hover:scale-110 transition-transform duration-300">
                  {member.avatar}
                </div>
                <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                <p className="text-sm text-brand-primary font-medium mb-2">{member.role}</p>
                <p className="text-sm text-foreground/60">{member.bio}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// CTA Section
function CTASection() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState<'project' | 'consultation'>('project')
  
  const openModal = (type: 'project' | 'consultation') => {
    setModalType(type)
    setModalOpen(true)
  }
  
  return (
    <>
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-brand p-8 sm:p-12 lg:p-16"
          >
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            </div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Let's Build Something Exceptional.
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">
                Ready to transform your digital presence? Let's discuss your project and create something remarkable together.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  size="lg"
                  onClick={() => openModal('project')}
                  className="bg-white text-brand-primary hover:bg-white/90 rounded-2xl px-8 h-14 text-lg font-semibold shadow-lg"
                >
                  Start a Project
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg"
                  onClick={() => openModal('consultation')}
                  className="bg-white/10 backdrop-blur-sm border border-white/40 text-white hover:bg-white/20 rounded-2xl px-8 h-14 text-lg font-medium"
                >
                  Book a Consultation
                  <Calendar className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <ContactModal open={modalOpen} onOpenChange={setModalOpen} type={modalType} />
    </>
  )
}

// Footer
interface FooterProps {
  onOpenServiceModal: (serviceKey: string) => void
  onOpenContactModal: () => void
}

function Footer({ onOpenServiceModal, onOpenContactModal }: FooterProps) {
  const footerLinks = {
    Services: [
      { label: 'Web Development', action: () => onOpenServiceModal('web-development') },
      { label: 'UI/UX Design', action: () => onOpenServiceModal('ui-ux-design') },
      { label: 'Digital Marketing', action: () => onOpenServiceModal('digital-marketing') },
      { label: 'SEO Optimization', action: () => onOpenServiceModal('seo') }
    ],
    Company: [
      { label: 'About Us', href: '#about' },
      { label: 'Our Team', href: '#team' },
      { label: 'Contact', action: () => onOpenContactModal() }
    ]
  }
  
  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Github, href: '#', label: 'GitHub' }
  ]
  
  return (
    <footer id="contact" className="border-t border-foreground/10">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="flex items-center gap-3 mb-6">
              <img 
                src="/logo.png" 
                alt="22 Dstrct Logo" 
                className="h-10 w-auto object-contain"
              />
              <span className="font-bold text-xl tracking-tight">Dstrct</span>
            </a>
            <p className="text-sm text-foreground/60 mb-6">
              Building digital experiences that convert and drive growth.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-xl glass-card flex items-center justify-center hover:shadow-brand transition-shadow"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.action ? (
                      <button 
                        onClick={link.action} 
                        className="text-sm text-foreground/60 hover:text-foreground transition-colors text-left"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <a href={link.href} className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Contact Info */}
        <div className="flex flex-wrap gap-6 py-8 border-t border-foreground/10 mb-8">
          <a href="mailto:hello.22dstrct@gmail.com" className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors">
            <Mail className="w-4 h-4" />
            hello.22dstrct@gmail.com
          </a>
          <a href="tel:+2347030644229" className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors">
            <Phone className="w-4 h-4" />
            +234 703 064 4229
          </a>
          <span className="flex items-center gap-2 text-sm text-foreground/60">
            <MapPin className="w-4 h-4" />
            21 Attah street, 3rd avenue, FHA Lugbe, Abuja
          </span>
        </div>
        
        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-foreground/10">
          <p className="text-sm text-foreground/60">
            © {new Date().getFullYear()} 22 Dstrct. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="/privacy" className="text-sm text-foreground/60 hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="/terms" className="text-sm text-foreground/60 hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Main Page Component
export default function Home() {
  const [serviceModalOpen, setServiceModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const [contactModalType, setContactModalType] = useState<'project' | 'consultation'>('project')

  const handleOpenServiceModal = (serviceKey: string) => {
    setSelectedService(serviceKey)
    setServiceModalOpen(true)
  }

  const handleOpenContactModal = (type: 'project' | 'consultation' = 'project') => {
    setContactModalType(type)
    setContactModalOpen(true)
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <ProcessSection />
      <TeamSection />
      <TestimonialsSection />
      <CTASection />
      <Footer 
        onOpenServiceModal={handleOpenServiceModal}
        onOpenContactModal={() => handleOpenContactModal('consultation')}
      />
      
      {/* Global Modals for Footer Access */}
      <ServiceModal 
        open={serviceModalOpen} 
        onOpenChange={setServiceModalOpen} 
        serviceKey={selectedService}
        onBookConsultation={() => {
          setServiceModalOpen(false)
          handleOpenContactModal('consultation')
        }}
      />
      <ContactModal 
        open={contactModalOpen} 
        onOpenChange={setContactModalOpen} 
        type={contactModalType}
      />
    </main>
  )
}
