import Link from 'next/link'
import {
  DocTitle, H2, H3, P, Ul, Li, Callout, CodeBlock, InlineCode,
} from '@/components/docs/doc-ui'
import { DocPager } from '@/components/docs/doc-pager'
import { getAdjacent } from '@/lib/docs-nav'

const pipelineCode = `# Example CLI command to watch a live import pipeline execution
airbridge import payments-api-v2.4.1.aib \\
  --registry registry.internal.gov \\
  --cluster gov-cluster-01 \\
  --watch`

const policyExample = `# policy.rego — custom Rego policy for step 3 (Validate)
package airbridge.policy

default allow = false

# Require Cosign signature
allow {
    input.signature.verified == true
    input.security.slsaLevel >= 2
    count(input.vulnerabilities.critical) == 0
}`

export default function ImportPipelineDocPage() {
  const { prev, next } = getAdjacent('/docs/import-pipeline')

  return (
    <article className="max-w-3xl">
      <DocTitle
        eyebrow="Core Concepts"
        title="The Import Pipeline"
        description="Understand the 7-stage deterministic workflow that ingests, verifies, rewrites, and deploys application bundles inside the air-gapped enclave."
      />

      <H2 id="pipeline-stages">The 7 Pipeline Stages</H2>
      <P>
        Every <InlineCode>.aib</InlineCode> bundle uploaded to AirBridge undergoes a strict 7-stage evaluation pipeline.
        If any stage fails, execution stops immediately, preventing untrusted code from entering the cluster.
      </P>

      <H3 id="stage-1-upload">Stage 1: Upload</H3>
      <P>
        The bundle is uploaded to the AirBridge Gateway using chunked, resumable streaming over HTTP/2. SHA256 hashes are verified per chunk to ensure payload integrity during transport.
      </P>

      <H3 id="stage-2-detect">Stage 2: Detect</H3>
      <P>
        The worker extracts the bundle manifest, inspects required OCI images, parses Helm charts, and identifies necessary plugin extensions.
      </P>

      <H3 id="stage-3-validate">Stage 3: Validate & Policy Gate</H3>
      <P>
        Cryptographic signatures (Cosign/Sigstore) are verified against trusted public keys. The embedded Policy Engine evaluates Rego/CEL rules against the bundle's SBOM and CVE scan results.
      </P>

      <CodeBlock code={policyExample} lang="rego" filename="policy.rego" />

      <H3 id="stage-4-normalize">Stage 4: Normalize</H3>
      <P>
        Image references in Helm values and Kustomize overlays are automatically rewritten to target your internal enclave registry (e.g. rewriting <InlineCode>docker.io/library/redis</InlineCode> to <InlineCode>registry.internal.gov/library/redis</InlineCode>).
      </P>

      <H3 id="stage-5-publish">Stage 5: Publish</H3>
      <P>
        Container image layers are extracted and pushed to your internal OCI registry. Duplicate layers already present in the registry are skipped automatically.
      </P>

      <H3 id="stage-6-deploy">Stage 6: Deploy</H3>
      <P>
        The deployment engine executes the normalized manifests using Helm, Kustomize, or kubectl apply. Pre-deploy database migrations or hooks run in ordered sequence.
      </P>

      <H3 id="stage-7-verify">Stage 7: Verify</H3>
      <P>
        AirBridge monitors Kubernetes pod readiness probes and health status. Once all deployments report Healthy, an immutable audit event is recorded and notification webhooks fire.
      </P>

      <H2 id="monitoring-pipeline">Monitoring Pipeline Execution</H2>
      <P>
        You can monitor pipeline execution live via the AirBridge Web Console or CLI:
      </P>
      <CodeBlock code={pipelineCode} lang="bash" filename="terminal" />

      <Callout type="info">
        <strong className="text-foreground">Rollback Protection:</strong> If Stage 6 or 7 fails, AirBridge automatically triggers a health rollback to the last verified application version.
      </Callout>

      <DocPager prev={prev} next={next} />
    </article>
  )
}
