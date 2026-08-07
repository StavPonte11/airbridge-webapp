import Link from 'next/link'
import {
  DocTitle, H2, H3, P, Ul, Li, Callout, CodeBlock, InlineCode,
} from '@/components/docs/doc-ui'
import { DocPager } from '@/components/docs/doc-pager'
import { getAdjacent } from '@/lib/docs-nav'

const cliUsage = `# Global CLI Syntax
airbridge [command] [subcommand] [flags]

# Example: Build a bundle with custom manifest and tags
airbridge bundle build \\
  --config ./airbridge.yaml \\
  --tag v2.4.1 \\
  --output ./builds/payments-api.aib`

const bundleSubcommands = `# Initialize a fresh manifest template
airbridge bundle init [name]

# Package images and charts into an .aib archive
airbridge bundle build --config airbridge.yaml --output bundle.aib

# Sign an existing bundle with Cosign
airbridge bundle sign --key cosign.key bundle.aib

# Inspect contents, SBOM, and signatures without extracting
airbridge bundle inspect bundle.aib

# Extract archive to a local directory for manual auditing
airbridge bundle unpack bundle.aib --dir ./extracted`

const importSubcommands = `# Upload and deploy a bundle into an enclave
airbridge import bundle.aib \\
  --gateway https://airbridge.internal.gov \\
  --token $AIRBRIDGE_TOKEN \\
  --registry registry.internal.gov \\
  --cluster gov-cluster-01

# Perform a dry-run validation without pushing to registry or cluster
airbridge import bundle.aib --dry-run`

const envVars = `# Environment variables for CI / automation
export AIRBRIDGE_GATEWAY="https://airbridge.internal.gov"
export AIRBRIDGE_TOKEN="ab_tok_9a8f3b2c1d4e"
export AIRBRIDGE_REGISTRY="registry.internal.gov"
export AIRBRIDGE_OUTPUT_FORMAT="json"`

export default function CliDocPage() {
  const { prev, next } = getAdjacent('/docs/cli')

  return (
    <article className="max-w-3xl">
      <DocTitle
        eyebrow="Guides"
        title="CLI Command Reference"
        description="Complete command line interface documentation for building, signing, inspecting, importing, and auditing AirBridge bundles."
      />

      <H2 id="syntax">Command Syntax</H2>
      <P>
        The <InlineCode>airbridge</InlineCode> CLI is structured logically into command groups:
      </P>
      <CodeBlock code={cliUsage} lang="bash" filename="terminal" />

      <H2 id="bundle-commands">1. Bundle Commands (airbridge bundle)</H2>
      <P>
        Commands for authoring, building, signing, and inspecting <InlineCode>.aib</InlineCode> packages outside the air gap:
      </P>
      <CodeBlock code={bundleSubcommands} lang="bash" filename="bundle commands" />

      <H2 id="import-commands">2. Import Commands (airbridge import)</H2>
      <P>
        Commands for transferring and deploying bundles inside the enclave:
      </P>
      <CodeBlock code={importSubcommands} lang="bash" filename="import commands" />

      <H2 id="status-audit">3. Status & Audit Commands</H2>
      <Ul>
        <Li><InlineCode>airbridge status [bundle-name]</InlineCode>: Displays live deployment status across target Kubernetes clusters.</Li>
        <Li><InlineCode>airbridge audit --since 24h</InlineCode>: Exports cryptographic audit logs and provenance records in JSON format.</Li>
        <Li><InlineCode>airbridge version</InlineCode>: Prints CLI binary version, git commit hash, and build architecture.</Li>
      </Ul>

      <H2 id="environment-variables">Environment Variables</H2>
      <P>
        All CLI flags can be set via environment variables for easy integration into CI/CD build scripts:
      </P>
      <CodeBlock code={envVars} lang="bash" filename=".env / environment" />

      <Callout type="tip">
        Append <InlineCode>--json</InlineCode> to any command to receive machine-readable JSON output suitable for scripting.
      </Callout>

      <DocPager prev={prev} next={next} />
    </article>
  )
}
