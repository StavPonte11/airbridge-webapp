import Link from 'next/link'
import {
  DocTitle, H2, H3, P, Ul, Li, Callout, CodeBlock, InlineCode,
} from '@/components/docs/doc-ui'
import { DocPager } from '@/components/docs/doc-pager'
import { getAdjacent } from '@/lib/docs-nav'

const step1Yaml = `# airbridge.yaml
apiVersion: airbridge.dev/v1alpha1
kind: Bundle
metadata:
  name: demo-storefront
  version: 1.2.0
  description: "E-commerce storefront microservices"

spec:
  images:
    - name: store-frontend
      ref: ghcr.io/acme/store-frontend:v1.2.0
    - name: store-backend
      ref: ghcr.io/acme/store-backend:v1.2.0
    - name: redis
      ref: docker.io/library/redis:7.2-alpine

  charts:
    - name: storefront
      path: ./charts/storefront
      values: ./values-prod.yaml

  deployment:
    strategy: rolling
    targetNamespace: storefront-prod`

const step2Build = `# Build the bundle on a connected builder / CI runner
airbridge bundle build \\
  --config airbridge.yaml \\
  --output demo-storefront-v1.2.0.aib

# Inspect the generated artifact
ls -lh demo-storefront-v1.2.0.aib`

const step3Sign = `# Sign the bundle with Cosign before transfer
cosign sign-blob \\
  --key cosign.key \\
  demo-storefront-v1.2.0.aib \\
  --output-signature demo-storefront-v1.2.0.aib.sig`

const step4Import = `# Import the bundle inside the air-gapped enclave
airbridge import demo-storefront-v1.2.0.aib \\
  --signature demo-storefront-v1.2.0.aib.sig \\
  --target-registry registry.internal.enclave.local \\
  --cluster gov-cluster-01`

const step5Status = `# Monitor deployment health and verification state
airbridge status demo-storefront --cluster gov-cluster-01`

export default function QuickstartPage() {
  const { prev, next } = getAdjacent('/docs/quickstart')

  return (
    <article className="max-w-3xl">
      <DocTitle
        eyebrow="Getting Started"
        title="Quickstart Guide"
        description="Learn how to package, sign, transfer, and deploy a multi-container application into an isolated Kubernetes cluster in under 5 minutes."
      />

      <H2 id="overview">The 5-Step Delivery Flow</H2>
      <P>
        AirBridge follows a clean separation of concerns: assemble outside the air gap, verify at the boundary,
        and deploy inside. Follow these steps to ship your first application.
      </P>

      <H2 id="step-1">1. Create a Bundle Manifest</H2>
      <P>
        Create an <InlineCode>airbridge.yaml</InlineCode> file in your project repository defining the target container
        images, Helm charts, and environment configuration:
      </P>
      <CodeBlock code={step1Yaml} lang="yaml" filename="airbridge.yaml" />

      <H2 id="step-2">2. Build the Immutable .aib Bundle</H2>
      <P>
        On your connected build workstation or GitHub Actions runner, execute the build command. AirBridge fetches
        all OCI image layers, packages the Helm charts, generates an SBOM, and creates a compressed <InlineCode>.aib</InlineCode> file.
      </P>
      <CodeBlock code={step2Build} lang="bash" filename="terminal" />

      <H2 id="step-3">3. Sign the Bundle</H2>
      <P>
        Ensure software supply chain security by attaching a cryptographic signature. AirBridge integrates natively
        with Cosign / Sigstore:
      </P>
      <CodeBlock code={step3Sign} lang="bash" filename="terminal" />

      <H2 id="step-4">4. Import Across the Air Gap</H2>
      <P>
        Once the <InlineCode>.aib</InlineCode> file is transferred into the air-gapped enclave, run the import command.
        AirBridge validates signatures, pushes layers to your internal OCI registry, and applies the deployment plan.
      </P>
      <CodeBlock code={step4Import} lang="bash" filename="terminal" />

      <Callout type="tip">
        AirBridge automatically rewrites container image references in Helm charts to point to your internal enclave registry.
      </Callout>

      <H2 id="step-5">5. Verify Deployment Health</H2>
      <P>
        Check the status of your live application across the cluster:
      </P>
      <CodeBlock code={step5Status} lang="bash" filename="terminal" />

      <Callout type="info">
        Congratulations! You have delivered an air-gapped application without manual image loading or script wrangling.
      </Callout>

      <DocPager prev={prev} next={next} />
    </article>
  )
}
