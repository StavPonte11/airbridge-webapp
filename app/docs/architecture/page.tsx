import Link from 'next/link'
import {
  DocTitle, H2, H3, P, Ul, Li, Callout, CodeBlock, InlineCode,
} from '@/components/docs/doc-ui'
import { DocPager } from '@/components/docs/doc-pager'
import { getAdjacent } from '@/lib/docs-nav'

const archDiagram = `CONNECTED ZONE                        AIR GAP                        DISCONNECTED ENCLAVE
┌─────────────────────┐                                     ┌────────────────────────────────┐
│  CI Build Engine    │                                     │  AirBridge Ingress Gateway     │
│  (GitHub / GitLab)  │                                     │  (REST / gRPC / Auth / mTLS)   │
└──────────┬──────────┘                                     └───────────────┬────────────────┘
           │                                                                │
           ▼                                                                ▼
┌─────────────────────┐            ONE-WAY TRANSFER         ┌────────────────────────────────┐
│  airbridge bundle   │ ───────────────► 📦 ───────────────►│  Durable Workflow Engine (DAG) │
│  Build & Sign       │        (Data Diode / USB)           └───────────────┬────────────────┘
└─────────────────────┘                                                     │
                                                            ┌───────────────┴────────────────┐
                                                            ▼                                ▼
                                                  ┌──────────────────┐    ┌──────────────────┐
                                                  │  OCI Registry    │    │  Deploy Worker   │
                                                  │  (Harbor / ECR)  │    │  (K8s / Helm)    │
                                                  └──────────────────┘    └──────────────────┘`

export default function ArchitectureDocPage() {
  const { prev, next } = getAdjacent('/docs/architecture')

  return (
    <article className="max-w-3xl">
      <DocTitle
        eyebrow="Core Concepts"
        title="AirBridge Platform Architecture"
        description="Learn how the gateway, durable workflow engine, worker executors, and embedded registry fit together to process bundles safely."
      />

      <H2 id="topology">System Topology</H2>
      <P>
        AirBridge is architected around a strict decoupled design: software creation occurs outside the air gap,
        while ingestion, validation, and execution happen inside the secure enclave.
      </P>

      <CodeBlock code={archDiagram} lang="text" filename="system topology" />

      <H2 id="core-components">Core Subsystems</H2>

      <H3 id="gateway">1. Ingress Gateway</H3>
      <P>
        The front-door service running inside the air-gapped enclave. Provides a high-performance REST and gRPC API
        for chunked bundle uploads, authentication via OIDC or LDAP, and fine-grained RBAC access control.
      </P>
      <Ul>
        <Li><strong className="text-foreground">mTLS Support:</strong> Enforces mutual TLS authentication for all API clients.</Li>
        <Li><strong className="text-foreground">Chunked Uploads:</strong> Streams multi-gigabyte files in 64MB chunks with auto-resume on interruption.</Li>
      </Ul>

      <H3 id="workflow-engine">2. Durable Workflow Engine</H3>
      <P>
        Every bundle import runs as an isolated, state-machine driven Directed Acyclic Graph (DAG). If a node fails or
        the host restarts mid-import, the workflow engine resumes precisely where it left off.
      </P>

      <H3 id="worker-pool">3. Parallel Worker Pool</H3>
      <P>
        Horizontally scalable background executors responsible for intensive workloads:
      </P>
      <Ul>
        <Li><strong className="text-foreground">Validation Workers:</strong> Verify digital Cosign signatures and SLSA attestations.</Li>
        <Li><strong className="text-foreground">Scanner Workers:</strong> Run Trivy/Grype vulnerability checks against extracted layers.</Li>
        <Li><strong className="text-foreground">Normalization Workers:</strong> Rewrite image references in Helm manifests to target local registries.</Li>
      </Ul>

      <H3 id="registry-layer">4. OCI Registry Integration</H3>
      <P>
        AirBridge acts as a registry-agnostic bridge. Extracted image layers are pushed directly to your internal OCI store
        (Harbor, AWS ECR, GCP GAR, Nexus, or an embedded registry) using standard OCI distribution protocols.
      </P>

      <H3 id="deployment-engine">5. Pluggable Deployer</H3>
      <P>
        Applies normalized Kubernetes manifests to target clusters. Supports native Helm 3 releases, Kustomize overlays,
        or GitOps controllers like ArgoCD and Flux.
      </P>

      <Callout type="tip">
        All platform state is maintained in an embedded HA storage backend (etcd or PostgreSQL), requiring zero external cloud dependencies.
      </Callout>

      <DocPager prev={prev} next={next} />
    </article>
  )
}
