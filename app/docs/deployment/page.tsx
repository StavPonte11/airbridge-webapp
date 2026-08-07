import Link from 'next/link'
import {
  DocTitle, H2, H3, P, Ul, Li, Callout, CodeBlock, InlineCode,
} from '@/components/docs/doc-ui'
import { DocPager } from '@/components/docs/doc-pager'
import { getAdjacent } from '@/lib/docs-nav'

const helmRepo = `# Add the AirBridge Helm repository
helm repo add airbridge https://charts.airbridge.dev
helm repo update

# Install AirBridge into your air-gapped Kubernetes cluster
helm install airbridge airbridge/airbridge \\
  --namespace airbridge-system \\
  --create-namespace \\
  --values values-airgapped.yaml`

const helmValues = `# values-airgapped.yaml — Enterprise Production Configuration
replicaCount: 3

ingress:
  enabled: true
  className: nginx
  hosts:
    - host: airbridge.internal.gov
      paths:
        - path: /
          pathType: Prefix

# Embedded OCI-compliant registry
registry:
  embedded: false
  externalRegistry: "registry.internal.gov"
  authSecretName: "internal-registry-credentials"

# Storage Backend for Multi-GB Bundle Streaming
storage:
  type: s3
  s3:
    endpoint: "https://minio.internal.gov"
    bucket: "airbridge-bundles"
    accessKeySecret: "minio-credentials"

# Security & RBAC Configuration
security:
  oidc:
    enabled: true
    issuer: "https://keycloak.internal.gov/realms/gov"
    clientId: "airbridge-console"
  audit:
    enabled: true
    retentionDays: 365`

const upgradeCode = `# Upgrade an existing AirBridge installation
helm upgrade airbridge airbridge/airbridge \\
  --namespace airbridge-system \\
  --values values-airgapped.yaml`

export default function DeploymentDocPage() {
  const { prev, next } = getAdjacent('/docs/deployment')

  return (
    <article className="max-w-3xl">
      <DocTitle
        eyebrow="Guides"
        title="Deploying AirBridge in Production"
        description="Complete operational guide for installing, configuring, and scaling the AirBridge platform inside isolated Kubernetes environments."
      />

      <H2 id="deployment-models">Deployment Models</H2>
      <P>
        AirBridge can be deployed as a single standalone container for developer labs, or as a High-Availability (HA)
        control plane inside enterprise Kubernetes clusters (OpenShift, RKE2, K3s, EKS Anywhere).
      </P>

      <H2 id="helm-installation">Helm 3 Installation</H2>
      <P>
        Deploy AirBridge using the official Helm chart:
      </P>
      <CodeBlock code={helmRepo} lang="bash" filename="terminal" />

      <H2 id="configuration">Production Configuration (values-airgapped.yaml)</H2>
      <P>
        Configure external OCI registry credentials, S3-compatible chunk storage, and OIDC identity authentication:
      </P>
      <CodeBlock code={helmValues} lang="yaml" filename="values-airgapped.yaml" />

      <H2 id="high-availability">High Availability & Scaling</H2>
      <Ul>
        <Li><strong className="text-foreground">Stateless Gateway:</strong> Scale ingress replicas horizontally (3+ pods) behind your load balancer.</Li>
        <Li><strong className="text-foreground">Durable Workers:</strong> Worker pods consume jobs from a shared Redis/PostgreSQL work queue and scale dynamically based on CPU/RAM load.</Li>
        <Li><strong className="text-foreground">Object Storage:</strong> Bundles are stored in MinIO, Ceph, or AWS S3; worker pods store zero persistent state locally.</Li>
      </Ul>

      <H2 id="maintenance-and-upgrades">Upgrades & Maintenance</H2>
      <P>
        AirBridge supports zero-downtime rolling upgrades. Database schema migrations run automatically via Helm pre-upgrade hooks.
      </P>
      <CodeBlock code={upgradeCode} lang="bash" filename="terminal" />

      <Callout type="tip">
        For air-gapped Helm deployments where chart downloads are restricted, mirror the <InlineCode>airbridge/airbridge</InlineCode> Helm chart into your internal chart repository.
      </Callout>

      <DocPager prev={prev} next={next} />
    </article>
  )
}
