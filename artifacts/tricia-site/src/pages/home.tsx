import React, { useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import logoImage from "@assets/logo.png";
import textureImage from "@/assets/images/texture.png";
import portfolio1 from "@/assets/images/portfolio-1.png";
import portfolio2 from "@/assets/images/portfolio-2.png";
import portfolio3 from "@/assets/images/portfolio-3.png";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  school: z.string().min(2, "School/Organization is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Tell me a bit more about your project"),
});

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      school: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Just a visual representation
    console.log(values);
    alert("Thank you for your inquiry. I will get back to you soon.");
    form.reset();
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-hidden font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 mix-blend-difference flex justify-between items-center pointer-events-none">
        <div className="w-32 opacity-90 pointer-events-auto">
          <img src={logoImage} alt="Tricia" className="w-full h-auto" />
        </div>
        <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-medium pointer-events-auto">
          <a href="#work" className="hover:text-[#0000EE] transition-colors">Selected Work</a>
          <a href="#approach" className="hover:text-[#0000EE] transition-colors">The Approach</a>
          <a href="#contact" className="hover:text-[#0000EE] transition-colors">Inquire</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center px-6 md:px-24">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <img src={textureImage} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#080808]"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mt-20">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[#0000EE] uppercase tracking-[0.2em] mb-6 text-sm font-semibold"
          >
            Digital Craftsmanship
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight mb-8"
          >
            Stitching your <br/>memories together.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-gray-400 text-lg md:text-2xl max-w-2xl leading-relaxed mb-12"
          >
            I build bespoke digital yearbooks and class reunion websites for Indonesian schools. Every pixel measured, every memory threaded with care.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <a href="#contact" className="inline-flex items-center gap-3 border border-white/20 px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all duration-300 group">
              <span className="font-medium tracking-wide uppercase text-sm">Start a Project</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Philosophy / About */}
      <section className="py-32 px-6 md:px-24 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              A website is not a template. <br/>
              <span className="text-gray-600">It is a tailored garment.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
              <p>
                When a class graduates, or when alumni gather after decades apart, the memories deserve more than a generic social media group. They deserve a dedicated, permanent home.
              </p>
              <p>
                Like a master tailor, I measure the unique personality of your class. The inside jokes, the definitive moments, the collective identity—stitched into a digital experience that lasts forever.
              </p>
              <div className="w-12 h-[1px] bg-[#0000EE] mt-8"></div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Selected Work */}
      <section id="work" className="py-32 px-6 md:px-24">
        <FadeIn>
          <div className="flex items-center gap-4 mb-20">
            <h2 className="text-sm uppercase tracking-[0.2em] font-semibold text-[#0000EE]">Selected Work</h2>
            <div className="h-[1px] flex-1 bg-white/10"></div>
          </div>
        </FadeIn>

        <div className="space-y-32">
          {/* Project 1 */}
          <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-center">
            <FadeIn className="md:col-span-7">
              <div className="aspect-[16/9] overflow-hidden bg-white/5 border border-white/10 group">
                <img src={portfolio1} alt="Graduation Yearbook" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
            </FadeIn>
            <FadeIn delay={0.2} className="md:col-span-5 space-y-6">
              <p className="text-[#0000EE] text-sm tracking-widest uppercase">SMA N 1 Jakarta — 2024</p>
              <h3 className="text-3xl font-bold">The Digital Yearbook</h3>
              <p className="text-gray-400 leading-relaxed">
                A monumental archive for a graduating class of 400 students. Featuring an interactive mosaic, personalized superlatives, and a hidden "letters to the future" vault.
              </p>
            </FadeIn>
          </div>

          {/* Project 2 */}
          <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-center">
            <FadeIn delay={0.2} className="md:col-span-5 space-y-6 order-2 md:order-1">
              <p className="text-[#0000EE] text-sm tracking-widest uppercase">ITB Alumni — 1998</p>
              <h3 className="text-3xl font-bold">25th Silver Reunion</h3>
              <p className="text-gray-400 leading-relaxed">
                A nostalgic journey through time. Designed with elegant dark motifs and an interactive timeline mapping out the technological evolution since their graduation.
              </p>
            </FadeIn>
            <FadeIn className="md:col-span-7 order-1 md:order-2">
              <div className="aspect-[16/9] overflow-hidden bg-white/5 border border-white/10 group">
                <img src={portfolio2} alt="Reunion Site" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
            </FadeIn>
          </div>

          {/* Project 3 */}
          <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-center">
            <FadeIn className="md:col-span-7">
              <div className="aspect-[16/9] overflow-hidden bg-white/5 border border-white/10 group">
                <img src={portfolio3} alt="Memorial Archive" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
            </FadeIn>
            <FadeIn delay={0.2} className="md:col-span-5 space-y-6">
              <p className="text-[#0000EE] text-sm tracking-widest uppercase">Private Commission</p>
              <h3 className="text-3xl font-bold">The Memory Archive</h3>
              <p className="text-gray-400 leading-relaxed">
                A deeply personal, intimate collection of photographs and essays. Built with a focus on typography and quiet, deliberate pacing.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* The Approach */}
      <section id="approach" className="py-32 px-6 md:px-24 bg-[#050505]">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-24">The measure, the cut, the finish.</h2>
          </FadeIn>
          
          <div className="space-y-16">
            {[
              { num: "01", title: "The Measure", desc: "We sit down. We discuss your class's identity. I gather the raw materials: the photos, the inside jokes, the tone." },
              { num: "02", title: "The Pattern", desc: "I draft the architecture. No templates. A bespoke layout engineered specifically for the stories you need to tell." },
              { num: "03", title: "The Stitch", desc: "Development. Pixel-perfect implementation with subtle animations that make the website feel alive, yet timeless." },
              { num: "04", title: "The Finish", desc: "Final review with the committee. We polish the details until it is ready to be unveiled to the world." }
            ].map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.1}>
                <div className="grid grid-cols-[auto_1fr] gap-8 md:gap-16 items-start border-t border-white/10 pt-8">
                  <span className="text-2xl md:text-4xl font-light text-gray-600">{step.num}</span>
                  <div>
                    <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                    <p className="text-gray-400 text-lg leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-32 px-6 md:px-24 bg-[#0000EE] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <svg className="w-12 h-12 mx-auto mb-8 opacity-50" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14.017 21L16.41 14.37H11.583V3H21V11.23L18.067 21H14.017ZM3.457 21L5.85 14.37H1.023V3H10.44V11.23L7.507 21H3.457Z" />
            </svg>
            <p className="text-2xl md:text-4xl font-medium leading-relaxed mb-12">
              "Tricia didn't just build a website; she built a time machine. The attention to detail made our entire committee tear up when we first saw the staging link. It is perfect."
            </p>
            <p className="font-bold tracking-widest uppercase text-sm">
              — Andi P., Committee Chair, SMAN 8 Jakarta
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 px-6 md:px-24 border-t border-white/10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Let's craft your <br/>legacy.
            </h2>
            <p className="text-gray-400 text-lg mb-12">
              Currently accepting commissions for the upcoming graduation season. Reach out to discuss timelines, scope, and vision.
            </p>
            <div className="flex items-center gap-4 text-gray-400">
              <Mail className="w-5 h-5" />
              <a href="mailto:hello@buildwithtricia.com" className="hover:text-[#0000EE] transition-colors">hello@buildwithtricia.com</a>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-white/5 p-8 border border-white/10">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300 uppercase tracking-widest text-xs">Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Budi Santoso" className="bg-transparent border-white/20 focus-visible:ring-[#0000EE] rounded-none h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="school"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300 uppercase tracking-widest text-xs">School / Organization</FormLabel>
                        <FormControl>
                          <Input placeholder="SMA 1 Bandung" className="bg-transparent border-white/20 focus-visible:ring-[#0000EE] rounded-none h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300 uppercase tracking-widest text-xs">Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="budi@example.com" className="bg-transparent border-white/20 focus-visible:ring-[#0000EE] rounded-none h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300 uppercase tracking-widest text-xs">Project Details</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell me about your class, your timeline, and what you're hoping to build..." 
                            className="bg-transparent border-white/20 focus-visible:ring-[#0000EE] rounded-none min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-[#0000EE] hover:bg-[#0000CC] text-white rounded-none h-14 tracking-widest uppercase text-sm font-semibold">
                    Submit Inquiry
                  </Button>
                </form>
              </Form>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-24 border-t border-white/10 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Tricia. All rights reserved.</p>
        <p className="mt-4 md:mt-0">Jakarta, Indonesia</p>
      </footer>
    </div>
  );
}
