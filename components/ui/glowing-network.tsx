'use client'

import { useEffect, useRef } from 'react'

interface Node {
  x: number
  y: number
  label: string
  size: number
  color: 'cyan' | 'violet' | 'amber'
  pulse: number
  pulseSpeed: number
}

interface Connection {
  from: number
  to: number
  progress: number
  speed: number
  color: 'cyan' | 'violet'
}

const COLORS = {
  cyan: { r: 130, g: 210, b: 230 },
  violet: { r: 140, g: 90, b: 230 },
  amber: { r: 220, g: 180, b: 80 },
}

export function GlowingNetworkSVG({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const animRef = useRef<number>(0)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    let time = 0

    // Nodes: positioned as a layered architecture
    const nodes: Node[] = [
      { x: 0.5, y: 0.07, label: 'Developer', size: 22, color: 'cyan', pulse: 0, pulseSpeed: 0.04 },
      { x: 0.5, y: 0.22, label: 'Cloud Build', size: 18, color: 'cyan', pulse: 1.2, pulseSpeed: 0.035 },
      { x: 0.5, y: 0.37, label: '.aib Bundle', size: 24, color: 'violet', pulse: 2.4, pulseSpeed: 0.05 },
      { x: 0.2, y: 0.6, label: 'AirBridge', size: 28, color: 'cyan', pulse: 0.8, pulseSpeed: 0.03 },
      { x: 0.8, y: 0.6, label: 'Registry', size: 18, color: 'cyan', pulse: 3.0, pulseSpeed: 0.04 },
      { x: 0.2, y: 0.82, label: 'K8s Cluster A', size: 16, color: 'violet', pulse: 1.6, pulseSpeed: 0.045 },
      { x: 0.5, y: 0.82, label: 'K8s Cluster B', size: 16, color: 'violet', pulse: 0.4, pulseSpeed: 0.04 },
      { x: 0.8, y: 0.82, label: 'K8s Cluster C', size: 16, color: 'violet', pulse: 2.0, pulseSpeed: 0.038 },
    ]

    const connections: Connection[] = [
      { from: 0, to: 1, progress: 0, speed: 0.006, color: 'cyan' },
      { from: 1, to: 2, progress: 0.3, speed: 0.005, color: 'cyan' },
      { from: 2, to: 3, progress: 0.6, speed: 0.007, color: 'violet' },
      { from: 2, to: 4, progress: 0.1, speed: 0.006, color: 'violet' },
      { from: 3, to: 5, progress: 0.4, speed: 0.005, color: 'cyan' },
      { from: 3, to: 6, progress: 0.7, speed: 0.006, color: 'cyan' },
      { from: 4, to: 7, progress: 0.2, speed: 0.005, color: 'cyan' },
    ]

    const tick = () => {
      const rect = svg.getBoundingClientRect()
      const W = rect.width || 400
      const H = rect.height || 500
      time += 1

      // Update connection progress
      for (const c of connections) {
        c.progress = (c.progress + c.speed) % 1
      }

      // Draw all connection paths
      const pathEls = svg.querySelectorAll('.conn-line')
      const dotEls = svg.querySelectorAll('.conn-dot')
      const nodeEls = svg.querySelectorAll('.node-circle')
      const glowEls = svg.querySelectorAll('.node-glow')

      connections.forEach((conn, i) => {
        const fromNode = nodes[conn.from]
        const toNode = nodes[conn.to]
        const x1 = fromNode.x * W
        const y1 = fromNode.y * H
        const x2 = toNode.x * W
        const y2 = toNode.y * H

        const pathEl = pathEls[i] as SVGPathElement
        if (pathEl) {
          // Midpoint control for curved line
          const mx = (x1 + x2) / 2 + (Math.random() - 0.5) * 0
          const my = (y1 + y2) / 2
          pathEl.setAttribute('d', `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`)
        }

        const dotEl = dotEls[i] as SVGCircleElement
        if (dotEl) {
          const px = x1 + (x2 - x1) * conn.progress
          const py = y1 + (y2 - y1) * conn.progress
          dotEl.setAttribute('cx', String(px))
          dotEl.setAttribute('cy', String(py))
        }
      })

      nodes.forEach((node, i) => {
        const nx = node.x * W
        const ny = node.y * H
        const phase = (node.pulse + time * node.pulseSpeed) % (Math.PI * 2)
        const pulseScale = 1 + Math.sin(phase) * 0.15

        const nodeEl = nodeEls[i] as SVGCircleElement
        if (nodeEl) {
          nodeEl.setAttribute('cx', String(nx))
          nodeEl.setAttribute('cy', String(ny))
          nodeEl.setAttribute('r', String(node.size * pulseScale))
        }

        const glowEl = glowEls[i] as SVGCircleElement
        if (glowEl) {
          glowEl.setAttribute('cx', String(nx))
          glowEl.setAttribute('cy', String(ny))
          glowEl.setAttribute('r', String(node.size * pulseScale * 2.4))
          glowEl.setAttribute('opacity', String(0.08 + Math.sin(phase) * 0.04))
        }
      })

      animRef.current = requestAnimationFrame(tick)
    }

    tick()
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  const initialNodes: Node[] = [
    { x: 0.5, y: 0.07, label: 'Developer', size: 22, color: 'cyan', pulse: 0, pulseSpeed: 0.04 },
    { x: 0.5, y: 0.22, label: 'Cloud Build', size: 18, color: 'cyan', pulse: 1.2, pulseSpeed: 0.035 },
    { x: 0.5, y: 0.37, label: '.aib Bundle', size: 24, color: 'violet', pulse: 2.4, pulseSpeed: 0.05 },
    { x: 0.2, y: 0.6, label: 'AirBridge', size: 28, color: 'cyan', pulse: 0.8, pulseSpeed: 0.03 },
    { x: 0.8, y: 0.6, label: 'Registry', size: 18, color: 'cyan', pulse: 3.0, pulseSpeed: 0.04 },
    { x: 0.2, y: 0.82, label: 'K8s Cluster A', size: 16, color: 'violet', pulse: 1.6, pulseSpeed: 0.045 },
    { x: 0.5, y: 0.82, label: 'K8s Cluster B', size: 16, color: 'violet', pulse: 0.4, pulseSpeed: 0.04 },
    { x: 0.8, y: 0.82, label: 'K8s Cluster C', size: 16, color: 'violet', pulse: 2.0, pulseSpeed: 0.038 },
  ]

  const initialConns = [
    { from: 0, to: 1, color: 'cyan' as const },
    { from: 1, to: 2, color: 'cyan' as const },
    { from: 2, to: 3, color: 'violet' as const },
    { from: 2, to: 4, color: 'violet' as const },
    { from: 3, to: 5, color: 'cyan' as const },
    { from: 3, to: 6, color: 'cyan' as const },
    { from: 4, to: 7, color: 'cyan' as const },
  ]

  return (
    <svg
      ref={svgRef}
      className={className}
      viewBox="0 0 400 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="glow-violet" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Connection lines */}
      {initialConns.map((conn, i) => {
        const c = COLORS[conn.color]
        return (
          <path
            key={i}
            className="conn-line"
            d={`M 200 ${initialNodes[conn.from].y * 500} L 200 ${initialNodes[conn.to].y * 500}`}
            stroke={`rgb(${c.r},${c.g},${c.b})`}
            strokeWidth="1"
            strokeOpacity="0.25"
            strokeDasharray="4 6"
          />
        )
      })}

      {/* Traveling dots */}
      {initialConns.map((conn, i) => {
        const c = COLORS[conn.color]
        return (
          <circle
            key={i}
            className="conn-dot"
            r="3"
            fill={`rgb(${c.r},${c.g},${c.b})`}
            filter={`url(#glow-${conn.color})`}
          />
        )
      })}

      {/* Node glows */}
      {initialNodes.map((node, i) => {
        const c = COLORS[node.color]
        return (
          <circle
            key={i}
            className="node-glow"
            cx={node.x * 400}
            cy={node.y * 500}
            r={node.size * 2.4}
            fill={`rgb(${c.r},${c.g},${c.b})`}
            opacity="0.08"
          />
        )
      })}

      {/* Nodes */}
      {initialNodes.map((node, i) => {
        const c = COLORS[node.color]
        return (
          <circle
            key={i}
            className="node-circle"
            cx={node.x * 400}
            cy={node.y * 500}
            r={node.size}
            fill={`rgba(${c.r},${c.g},${c.b},0.15)`}
            stroke={`rgba(${c.r},${c.g},${c.b},0.6)`}
            strokeWidth="1.5"
            filter={`url(#glow-${node.color})`}
          />
        )
      })}

      {/* Labels */}
      {initialNodes.map((node, i) => (
        <text
          key={i}
          x={node.x * 400}
          y={node.y * 500 + node.size + 14}
          textAnchor="middle"
          fontSize="10"
          fontFamily="monospace"
          fill="rgba(255,255,255,0.5)"
        >
          {node.label}
        </text>
      ))}
    </svg>
  )
}
