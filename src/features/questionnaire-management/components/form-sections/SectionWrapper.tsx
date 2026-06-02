'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface SectionWrapperProps {
  title: string
  description: string
  children: React.ReactNode
}

/**
 * Shared wrapper for all form sections.
 * Encapsulates the repeated motion animation + Card layout.
 */
export function SectionWrapper({ title, description, children }: SectionWrapperProps) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
      <Card className="gap-0 overflow-hidden rounded-2xl border border-gray-200 bg-white py-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 py-6">
          <CardTitle className="text-2xl font-semibold text-slate-900">{title}</CardTitle>
          <CardDescription className="text-gray-600">{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 py-6">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  )
}
