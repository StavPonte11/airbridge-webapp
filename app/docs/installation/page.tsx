import Link from 'next/link'
import {
  DocTitle, H2, H3, P, Ul, Li, Callout, CodeBlock, InlineCode,
} from '@/components/docs/doc-ui'
import { DocPager } from '@/components/docs/doc-pager'
import { getAdjacent } from '@/lib/docs-nav'

const installScript = `# One-line installer (automatically detects OS & architecture)
curl -sfL https://install.airbridge.dev | sh

# Verify binary location and version
airbridge --version`

const homebrewCode = `# Install via Homebrew tap
brew tap airbridge-dev/tap
brew install airbridge`

const checksumCode = `# Download binary and checksums from release asset
curl -LO https://github.com/airbridge-dev/airbridge/releases/download/v1.0.0/airbridge_1.0.0_linux_amd64.tar.gz
curl -LO https://github.com/airbridge-dev/airbridge/releases/download/v1.0.0/checksums.txt

# Verify SHA256 checksum
sha256sum --check checksums.txt --ignore-missing

# Verify signature via Cosign
cosign verify-blob \\
  --key https://airbridge.dev/cosign.pub \\
  --signature airbridge_1.0.0_linux_amd64.tar.gz.sig \\
  airbridge_1.0.0_linux_amd64.tar.gz`

export default function InstallationPage() {
  const { prev, next } = getAdjacent('/docs/installation')

  return (
    <article className="max-w-3xl">
      <DocTitle
        eyebrow="Getting Started"
        title="Installation"
        description="AirBridge is packaged as a single static Go binary with zero external dependencies. Install it locally or transfer static binaries into your air-gapped environment."
      />

      <H2 id="quick-install">Quick Install (Connected)</H2>
      <P>
        If your machine has internet connectivity (e.g. your developer workstation or cloud build agent),
        use the official installer script:
      </P>
      <CodeBlock code={installScript} lang="bash" filename="terminal" />

      <H2 id="homebrew">Homebrew (macOS / Linux)</H2>
      <P>
        For macOS users or Linux developers using Homebrew:
      </P>
      <CodeBlock code={homebrewCode} lang="bash" filename="terminal" />

      <H2 id="offline-install">Air-Gapped / Offline Installation</H2>
      <P>
        To install AirBridge inside an isolated, disconnected network:
      </P>
      <Ul>
        <Li>
          Download the standalone tarball for your target OS and CPU architecture from the{' '}
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-cyan underline-offset-4 hover:underline"
          >
            GitHub Releases
          </a>{' '}
          page.
        </Li>
        <Li>
          Transfer the archive across the security boundary (via USB media, optical disc, or authorized transfer gateway).
        </Li>
        <Li>
          Extract the archive and move the <InlineCode>airbridge</InlineCode> binary into your system <InlineCode>PATH</InlineCode> (e.g., <InlineCode>/usr/local/bin</InlineCode>).
        </Li>
      </Ul>

      <Callout type="warning">
        Always verify file checksums and cryptographic Cosign signatures before executing binary binaries inside high-assurance enclaves.
      </Callout>

      <H2 id="verification">Cryptographic Verification</H2>
      <P>
        Every release build is signed using keyless Cosign attestations and SLSA Level 3 provenance.
      </P>
      <CodeBlock code={checksumCode} lang="bash" filename="verify.sh" />

      <H2 id="system-requirements">System Requirements</H2>
      <Ul>
        <Li>
          <strong className="text-foreground">Supported OS:</strong> Linux (kernel 4.19+), macOS (12.0+), Windows (WSL2 or static exe).
        </Li>
        <Li>
          <strong className="text-foreground">Architectures:</strong> x86_64 / amd64, arm64 / aarch64.
        </Li>
        <Li>
          <strong className="text-foreground">Memory:</strong> Minimal 512 MB RAM (2 GB recommended for multi-gigabyte layer streams).
        </Li>
        <Li>
          <strong className="text-foreground">Disk Space:</strong> 50 MB for the binary; additional storage equivalent to target bundle sizes.
        </Li>
      </Ul>

      <DocPager prev={prev} next={next} />
    </article>
  )
}
