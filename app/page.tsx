import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { Hero } from '@/components/sections/hero'
import { Problem } from '@/components/sections/problem'
import { Vision } from '@/components/sections/vision'
import { Architecture } from '@/components/sections/architecture'
import { ImportPipeline } from '@/components/sections/import-pipeline'
import { PluginSystem } from '@/components/sections/plugin-system'
import { Features } from '@/components/sections/features'
import { Bundle } from '@/components/sections/bundle'
import { BuildDeploy } from '@/components/sections/build-deploy'
import { DashboardPreview } from '@/components/sections/dashboard-preview'
import { Enterprise } from '@/components/sections/enterprise'
import { DocsCards } from '@/components/sections/docs-cta'
import { Roadmap } from '@/components/sections/roadmap'
import { OpenSource } from '@/components/sections/open-source'
import { FinalCta } from '@/components/sections/final-cta'

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <SiteNav />
      <main>
        <Hero />
        <Problem />
        <Vision />
        <Architecture />
        <ImportPipeline />
        <PluginSystem />
        <Features />
        <Bundle />
        <BuildDeploy />
        <DashboardPreview />
        <Enterprise />
        <DocsCards />
        <Roadmap />
        <OpenSource />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  )
}
