import Link from 'next/link'
import {
  DocTitle, H2, H3, P, Ul, Li, Callout, CodeBlock,
} from '@/components/docs/doc-ui'
import { DocPager } from '@/components/docs/doc-pager'
import { getAdjacent } from '@/lib/docs-nav'
import { ArrowRight, Package, Terminal, Rocket } from 'lucide-react'

const installCode = `# Install the AirBridge CLI
curl -sfL https://install.airbridge.dev | sh

# Verify installation
airbridge version`

const quickstartCode = `# Initialize a new bundle
airbridge bundle init my-application

# Build the bundle (from your CI or local machine)
airbridge bundle build \\
  --image nginx:1.25 \\
  --helm ./charts/my-app \\
  --output my-application-v1.0.0.aib

# Import into an air-gapped environment
airbridge import my-application-v1.0.0.aib \\
  --registry registry.internal.gov \\
  --cluster gov-cluster-01`

const configCode = `# airbridge.yaml — bundle manifest
apiVersion: airbridge.dev/v1alpha1
kind: Bundle
metadata:
  name: my-application
  version: 1.0.0
  description: "My containerized application"

spec:
  images:
    - nginx:1.25
    - redis:7.2-alpine
  
  charts:
    - path: ./charts/my-app
      version: 0.5.0
  
  deployment:
    strategy: rolling
    namespace: production
    
  policy:
    requireSignature: true
    minSLSALevel: 2`

export default function DocsIndexPage() {
  const { prev, next } = getAdjacent('/docs')

  return (
    <article className="max-w-3xl">
      <DocTitle
        eyebrow="Getting Started"
        title="Introduction to AirBridge"
        description="AirBridge is the open-source application delivery platform for air-gapped environments. Ship your entire application — images, charts, config, signatures — in a single immutable .aib bundle."
      />

      <H2 id="what-is-airbridge">What is AirBridge?</H2>
      <P>
        AirBridge solves a fundamental problem in secure, disconnected environments: how do you deliver
        modern, cloud-native applications to systems with no internet access?
      </P>
      <P>
        Traditional approaches require manual processes, brittle scripts, and heroic effort. AirBridge
        automates the entire pipeline — from building in the cloud to deploying inside the air gap —
        through a single, reproducible artifact called the <strong className="text-foreground">.aib bundle</strong>.
      </P>

      <Callout type="info">
        <strong>AirBridge is not a registry mirror.</strong> It is a complete delivery platform that
        handles building, packaging, signing, transferring, validating, and deploying applications
        into disconnected Kubernetes environments.
      </Callout>

      <H2 id="core-concepts">Core Concepts</H2>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          {
            icon: Package,
            title: 'The .aib Bundle',
            desc: 'A single, immutable, signed file containing your entire application.',
            href: '/docs/bundle',
          },
          {
            icon: Terminal,
            title: 'The CLI',
            desc: 'airbridge build, import, and deploy from any CI or terminal.',
            href: '/docs/cli',
          },
          {
            icon: Rocket,
            title: 'The Platform',
            desc: 'Gateway, workflow engine, registry, and deployment in one.',
            href: '/docs/architecture',
          },
        ].map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.title}
              href={card.href}
              className="group flex flex-col gap-3 rounded-xl border border-border bg-card/40 p-4 transition-all hover:border-cyan/30 hover:bg-cyan/5"
            >
              <span className="flex size-9 items-center justify-center rounded-lg border border-border bg-background text-cyan transition-transform group-hover:scale-110">
                <Icon className="size-4" />
              </span>
              <div>
                <h3 className="text-sm font-semibold">{card.title}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">{card.desc}</p>
              </div>
              <ArrowRight className="mt-auto size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </Link>
          )
        })}
      </div>

      <H2 id="installation">Installation</H2>
      <P>Install the AirBridge CLI on any Linux or macOS system:</P>
      <CodeBlock code={installCode} lang="bash" filename="terminal" />

      <Callout type="tip">
        For air-gapped installations, download the static binary from the GitHub releases page and
        transfer it manually. The CLI has zero runtime dependencies.
      </Callout>

      <H2 id="quickstart">Quickstart</H2>
      <P>
        This example shows the complete lifecycle: building a bundle on a connected machine, then
        importing and deploying it into an air-gapped Kubernetes cluster.
      </P>

      <CodeBlock code={quickstartCode} lang="bash" filename="quickstart.sh" />

      <H2 id="bundle-manifest">Bundle Manifest</H2>
      <P>
        Every AirBridge bundle is defined by an <code className="font-mono text-sm text-cyan">airbridge.yaml</code>{' '}
        manifest. This file describes what goes into the bundle and how it should be deployed.
      </P>
      <CodeBlock code={configCode} lang="yaml" filename="airbridge.yaml" />

      <H2 id="next-steps">Next Steps</H2>
      <Ul>
        <Li>
          Read the{' '}
          <Link href="/docs/bundle" className="text-cyan underline-offset-4 hover:underline">
            Bundle Specification
          </Link>{' '}
          to understand everything that can go inside an .aib file.
        </Li>
        <Li>
          Learn about the{' '}
          <Link href="/docs/architecture" className="text-cyan underline-offset-4 hover:underline">
            AirBridge Architecture
          </Link>{' '}
          to understand how all the pieces fit together.
        </Li>
        <Li>
          Explore the{' '}
          <Link href="/docs/plugins" className="text-cyan underline-offset-4 hover:underline">
            Plugin SDK
          </Link>{' '}
          to extend AirBridge for your custom artifact formats and registries.
        </Li>
        <Li>
          See{' '}
          <Link href="/docs/deployment" className="text-cyan underline-offset-4 hover:underline">
            Deployment Guide
          </Link>{' '}
          to install AirBridge itself inside an air-gapped Kubernetes cluster.
        </Li>
      </Ul>

      <DocPager prev={prev} next={next} />
    </article>
  )
}
