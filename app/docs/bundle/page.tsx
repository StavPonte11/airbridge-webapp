import Link from 'next/link'
import {
  DocTitle, H2, H3, P, Ul, Li, Callout, CodeBlock, InlineCode,
} from '@/components/docs/doc-ui'
import { DocPager } from '@/components/docs/doc-pager'
import { getAdjacent } from '@/lib/docs-nav'

const bundleStructure = `my-application-v1.2.0.aib
├── manifest.yaml           # Root bundle specification & version metadata
├── sbom.spdx.json          # Software Bill of Materials (SPDX 2.3 format)
├── signature.sig           # Cosign signature & provenance attestation
├── artifacts/
│   ├── images/             # OCI-compliant image layer blobs (tar/v2)
│   │   ├── sha256:7f8a...  # Content-addressed image blob
│   │   └── index.json      # OCI layout index
│   └── charts/             # Packaged Helm charts / Kustomize bases
│       └── storefront.tgz
└── config/
    └── values-override.yaml # Environment configuration & secrets references`

const manifestSchema = `apiVersion: airbridge.dev/v1alpha1
kind: Bundle
metadata:
  name: payments-api
  version: 2.4.1
  created: "2026-08-07T14:30:00Z"
  authors:
    - "Platform Security Team <sec@company.gov>"

spec:
  # OCI Container Image references
  images:
    - name: api-server
      digest: "sha256:4a8e32918804791bf2803b9b47e2"
      sizeBytes: 419430400
    - name: worker
      digest: "sha256:9f02c4819aa01824104928172901"
      sizeBytes: 251658240

  # Kubernetes Deployment Workloads
  charts:
    - name: payments-chart
      version: 2.4.1
      chartPath: artifacts/charts/payments-chart.tgz

  # Security Gates & Verification
  security:
    cosignPublicKey: "cosign.pub"
    slsaLevel: 3
    cveThreshold: "HIGH"

  # Target Apply Sequence
  deploymentPlan:
    hooks:
      preApply: "scripts/db-migrate.sh"
      postApply: "scripts/health-check.sh"
    timeoutSeconds: 300`

export default function BundleSpecPage() {
  const { prev, next } = getAdjacent('/docs/bundle')

  return (
    <article className="max-w-3xl">
      <DocTitle
        eyebrow="Core Concepts"
        title="The Bundle (.aib) Specification"
        description="Deep dive into the architecture, zip-based binary layout, manifest schema, and security metadata of the .aib bundle file format."
      />

      <H2 id="what-is-aib">What is an .aib File?</H2>
      <P>
        The <InlineCode>.aib</InlineCode> (AirBridge Application Bundle) format is an open, OCI-native container specification
        designed specifically for air-gapped application transfer. It combines container image layers, Helm charts, configuration,
        and supply chain security metadata into a single, immutable archive.
      </P>

      <Callout type="info">
        <strong className="text-foreground">Immutability Guarantee:</strong> Once created, an <InlineCode>.aib</InlineCode> bundle is
        content-addressed by a root cryptographic digest. Modifying any byte inside the archive invalidates the signature.
      </Callout>

      <H2 id="internal-structure">Internal Directory Layout</H2>
      <P>
        Unpacking an <InlineCode>.aib</InlineCode> archive reveals a deterministic structure complying with the OCI Image Layout Specification:
      </P>
      <CodeBlock code={bundleStructure} lang="text" filename="bundle layout" />

      <H2 id="manifest-schema">Manifest Schema (manifest.yaml)</H2>
      <P>
        The root manifest describes the contents, dependencies, and execution rules for the AirBridge runtime:
      </P>
      <CodeBlock code={manifestSchema} lang="yaml" filename="manifest.yaml" />

      <H2 id="key-components">Key Specification Components</H2>

      <H3 id="oci-layer-deduplication">1. OCI Layer Deduplication</H3>
      <P>
        When building bundles containing multiple microservices, AirBridge automatically deduplicates shared base image layers
        (e.g., Alpine or Ubuntu base layers). This reduces total file size by up to 70% when packaging microservice fleets.
      </P>

      <H3 id="sbom-integration">2. Software Bill of Materials (SBOM)</H3>
      <P>
        Every build automatically inspects container image packages, OS dependencies, and application binaries to generate
        a comprehensive SPDX 2.3 or CycloneDX SBOM. Security teams inside the enclave can query the SBOM before allowing import.
      </P>

      <H3 id="provenance-attestation">3. SLSA Attestation</H3>
      <P>
        Bundles include in-toto build provenance attestations capturing git commit hashes, CI environment metadata, and build step hashes.
        This satisfies SLSA Level 3 compliance out of the box.
      </P>

      <DocPager prev={prev} next={next} />
    </article>
  )
}
