'use client'

import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'

export function QuestionnaireHeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 px-6 py-16 text-white">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-4 inline-flex items-center rounded-full border border-cyan-500/30 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 px-4 py-2 text-sm font-medium backdrop-blur-sm">
            <FileText className="mr-2 h-4 w-4" />
            Initial Pilot Setup
          </div>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            Discovery Questionnaire
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            We appreciate that this form gets quite detailed, but please
            don&apos;t feel pressured to have all the exact figures at hand.
            Your best estimates or approximations are perfectly fine at this
            stage. The goal is to help us better understand your current
            processes and structure so we can tailor the pilot to suit your
            needs.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
