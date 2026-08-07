import Link from 'next/link'
import {
  DocTitle, H2, H3, P, Ul, Li, Callout, CodeBlock, InlineCode,
} from '@/components/docs/doc-ui'
import { DocPager } from '@/components/docs/doc-pager'
import { getAdjacent } from '@/lib/docs-nav'

const pluginTypes = `Plugin Category       Description                                Example Integrations
─────────────────────────────────────────────────────────────────────────────────────────────
Artifact Plugins     Parse & package non-standard artifact formats   Raw tarballs, WASM binaries
Registry Plugins     Custom authentication & push logic              Harbor, ECR, GAR, Nexus
Deployment Plugins   Custom target deployment strategies             Helm, Kustomize, ArgoCD, Flux
Scanner Plugins      Vulnerability & compliance evaluation engines   Trivy, Grype, OpenPolicyAgent
Notification Plugins Broadcast events to chat or webhook sinks       Slack, Teams, Webhook, PagerDuty
Git Plugins          Sync bundle manifests from git repositories     GitHub Enterprise, GitLab`

const goPluginCode = `// main.go — AirBridge Artifact Plugin written in Go
package main

import (
	"context"
	"github.com/airbridge-dev/sdk-go/plugin"
)

type CustomArtifactPlugin struct{}

func (p *CustomArtifactPlugin) Detect(ctx context.Context, req *plugin.DetectRequest) (*plugin.DetectResponse, error) {
	// Parse custom artifact headers
	if req.Extension == ".myfmt" {
		return &plugin.DetectResponse{Supported: true, Type: "custom-binary"}, nil
	}
	return &plugin.DetectResponse{Supported: false}, nil
}

func (p *CustomArtifactPlugin) Extract(ctx context.Context, req *plugin.ExtractRequest) (*plugin.ExtractResponse, error) {
	// Extract content-addressed layers
	return &plugin.ExtractResponse{LayersExtracted: 3}, nil
}

func main() {
	plugin.Serve(&CustomArtifactPlugin{})
}`

const configPlugin = `# Registering a custom plugin in airbridge.yaml
spec:
  plugins:
    - name: custom-scanner
      path: ./plugins/scanner-trivy.wasm
      type: scanner
      config:
        severityThreshold: "CRITICAL"
        failOnCVE: true`

export default function PluginSdkDocPage() {
  const { prev, next } = getAdjacent('/docs/plugins')

  return (
    <article className="max-w-3xl">
      <DocTitle
        eyebrow="Guides"
        title="Plugin SDK & Extensions"
        description="AirBridge features a pluggable architecture. Learn how to extend AirBridge with custom artifact formats, registries, deployers, scanners, and notifications."
      />

      <H2 id="architecture">Plugin Sandbox Architecture</H2>
      <P>
        AirBridge ships a lightweight, opinionated core engine. Every external integration is compiled to WebAssembly (WASM)
        or runs as an isolated gRPC sidecar process using HashiCorp <InlineCode>go-plugin</InlineCode>.
      </P>

      <Callout type="info">
        <strong className="text-foreground">Sandboxed Execution:</strong> Plugins execute inside strict WASM or gRPC sandboxes.
        A buggy or malicious plugin cannot access host filesystem resources or crash the core gateway.
      </Callout>

      <H2 id="plugin-categories">Plugin Categories</H2>
      <CodeBlock code={pluginTypes} lang="text" filename="plugin types" />

      <H2 id="writing-a-plugin">Writing a Custom Plugin in Go</H2>
      <P>
        Use the official <InlineCode>github.com/airbridge-dev/sdk-go</InlineCode> package to build custom extensions:
      </P>
      <CodeBlock code={goPluginCode} lang="go" filename="main.go" />

      <H2 id="compiling-and-registering">Compiling to WebAssembly (WASM)</H2>
      <P>
        Compile your Go plugin to WebAssembly for seamless cross-platform deployment:
      </P>
      <CodeBlock
        code={`# Compile Go plugin to WebAssembly target
GOOS=wasip1 GOARCH=wasm go build -o scanner-trivy.wasm main.go`}
        lang="bash"
        filename="terminal"
      />

      <H2 id="registering-plugins">Registering Plugins</H2>
      <P>
        Reference compiled plugins directly inside your bundle manifest or Gateway configuration:
      </P>
      <CodeBlock code={configPlugin} lang="yaml" filename="airbridge.yaml" />

      <DocPager prev={prev} next={next} />
    </article>
  )
}
