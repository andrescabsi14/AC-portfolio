"use client";

import { motion } from "framer-motion";
import Typewriter from "../ui/Typewriter";

export default function ProblemsSection() {
  return (
    <section className="relative bg-black">
      <div className="max-w-5xl mx-auto px-6">

        {/* Initial Spacer / Hook */}
        <ProblemBlock>
          <div className="text-center space-y-8">
            <h2 className="text-4xl md:text-6xl font-light text-white leading-tight tracking-tight">
              You know you need AI.<br />But where do you even start?
            </h2>
            <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed text-white/80">
              Every vendor promises transformation. Every consultant has a framework. Meanwhile, your competitors are moving, and you're stuck trying to figure out what's real and what's just hype.
            </p>
          </div>
        </ProblemBlock>

        {/* The AI-First principle */}
        <ProblemBlock>
          <div className="space-y-12 max-w-3xl mx-auto">
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-light text-white/90 leading-tight">
                <Typewriter text={`This is why <span className="aifirst">AI-First</span> was born.`} />
              </h3>
              <p className="text-lg md:text-xl font-light leading-relaxed text-white/80">
                After years building systems for Fortune 500s, I saw the same pattern: companies treating AI like another tool to bolt onto existing processes. They'd spend months on pilots that never made it to production. They'd buy expensive platforms that sat unused. They'd hire consultants who left behind PowerPoints, not working systems.
              </p>
              <p className="text-lg md:text-xl font-light leading-relaxed text-white/80">
                <span className="aifirst">AI-First</span><span className="text-white"> is different</span>. It's not about adding AI to what you do, it's about rethinking how you operate from the ground up, with intelligence built into every workflow.
              </p>
            </div>
          </div>
        </ProblemBlock>

        {/* Real problems - Waiting */}
        <ProblemBlock>
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-light text-white/90 leading-relaxed">
              <Typewriter text={`Here's what happens if you wait.`} />
            </h3>
            <p className="text-lg md:text-xl font-light mt-4 leading-relaxed text-white/80">
              Your team keeps doing manual work that could be automated. Your competitors start closing deals faster. Your best people leave for companies that give them better tools. The gap widens every month.
            </p>
          </div>
        </ProblemBlock>

        {/* Real problems - Doing it wrong */}
        <ProblemBlock>
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-light text-white/90 leading-relaxed">
              <Typewriter text={`Here's what happens if you do it wrong.`} />
            </h3>
            <p className="text-lg md:text-xl font-light mt-4 leading-relaxed text-white/80">
              You spend six months on a pilot that never scales. You buy tools that don't talk to each other. Your team gets frustrated with systems that create more work than they save. You've spent money and time with nothing to show for it.
            </p>
          </div>
        </ProblemBlock>

        {/* AI-First Solution */}
        <ProblemBlock>
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-light text-white/90 leading-relaxed">
              <Typewriter text={`Here's what <span className="aifirst">AI-First</span> looks like for your business.`} isHtml />
            </h3>
            <p className="text-lg md:text-xl font-light mt-4 leading-relaxed text-white/80">
              You build systems that actually work in production from day one. Your team gets time back for strategic work. Your customers notice you're faster and smarter. You create advantages your competitors can't easily copy. And you do it without the enterprise overhead.
            </p>
          </div>
        </ProblemBlock>

      </div>
    </section>
  );
}

function ProblemBlock({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.5, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen flex items-center justify-center py-24"
    >
      {children}
    </motion.div>
  );
}
