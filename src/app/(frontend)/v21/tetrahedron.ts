const SVG_NS = 'http://www.w3.org/2000/svg'

export function initTetrahedron(): () => void {
  // See v22/tetrahedron.ts for the rationale on this pattern.
  const _hero = document.querySelector('.v21-hero') as HTMLElement | null
  const _stage = document.getElementById('v21Stage') as HTMLElement | null
  const _edgesG = document.getElementById('v21Edges')
  const _glowEl = document.getElementById('v21Glow')
  const _stop0 = document.getElementById('v21GlowStop0')
  const _stop1 = document.getElementById('v21GlowStop1')
  const cursorAura = document.getElementById('v21CursorAura')
  const plasmaLayer = document.getElementById('v21PlasmaLayer')
  const _pulsesG = document.getElementById('v21Pulses')
  const pulseOverlay = document.getElementById('v21PulseOverlay')
  const spacer = document.querySelector('.v21-scroll-spacer') as HTMLElement | null

  if (!_hero || !_stage || !_edgesG || !_glowEl || !_stop0 || !_stop1 || !_pulsesG) return () => {}

  const hero: HTMLElement = _hero
  const stage: HTMLElement = _stage
  const edgesG = _edgesG as unknown as SVGGElement
  const glowEl = _glowEl as unknown as SVGCircleElement
  const stop0 = _stop0 as unknown as SVGStopElement
  const stop1 = _stop1 as unknown as SVGStopElement
  const pulsesG = _pulsesG as unknown as SVGGElement

  const cursorAuraEnabled =
    !!cursorAura &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const plasmaEnabled = cursorAuraEnabled && !!plasmaLayer

  const SIZE = 70
  const ROT_SPEED_Y = 0.006
  const ROT_SPEED_X = 0.0015
  const FOCAL = 320
  const SPEED_BOOST = 18.0
  const SPEED_EASE = 0.05
  const GLOW_EASE = 0.06
  const GLOW_BASE_R = 28
  const GLOW_MAX_R = 50
  const GLOW_BASE_A = 0.35
  const GLOW_MAX_A = 0.85
  const PROXIMITY_R = 1.8
  const HOVER_HOLD_MS = 1800
  const HOVER_ENTER_PROX = 0.35
  const AUTO_LOCK_MS = 10000
  const IDLE_SPEED_MAX = 14.0
  const LOCK_EASE = 0.12
  const LOCK_SETTLE_EASE = 0.14
  const LOCK_SETTLE_MS = 140
  const LOCK_SETTLE_ERR = 0.055
  const LOCK_SNAP_ERR = 0.0002
  const PULSE_INTERVAL_MS = 2200
  const PULSE_DURATION_MS = 1800
  const PULSE_MAX_R = 520
  const PLASMA_MIN_INTERVAL_MS = 210
  const PLASMA_MAX_INTERVAL_MS = 620
  const PLASMA_DURATION_MS = 780
  const FIRST_PULSE_DELAY_MS = 90
  const PAGE_PULSE_DURATION_MS = 4200
  const PAGE_PULSE_MAX_SIZE = 6000
  const TAU = Math.PI * 2
  const STROKE_FRONT = 3.4
  const STROKE_BACK = 0.9

  const k = SIZE / Math.sqrt(3)
  const vertices = [
    { x: k, y: k, z: k },
    { x: -k, y: -k, z: k },
    { x: -k, y: k, z: -k },
    { x: k, y: -k, z: -k },
  ]

  const edges = [
    { a: 0, b: 1 },
    { a: 0, b: 2 },
    { a: 0, b: 3 },
    { a: 1, b: 2 },
    { a: 1, b: 3 },
    { a: 2, b: 3 },
  ]

  const faces = [
    [0, 1, 2],
    [0, 3, 1],
    [0, 2, 3],
    [1, 3, 2],
  ]

  const faceEdges = [
    [0, 1, 3],
    [0, 2, 4],
    [1, 2, 5],
    [3, 4, 5],
  ]

  const edgeLines = edges.map((edge, i) => {
    const line = document.createElementNS(SVG_NS, 'line')
    line.setAttribute('stroke-linecap', 'round')
    line.dataset.edgeIndex = String(i)
    line.dataset.edge = `${edge.a}-${edge.b}`
    edgesG.appendChild(line)
    return line
  })

  function rotate(
    v: { x: number; y: number; z: number },
    ax: number,
    ay: number,
    az?: number,
  ) {
    const cosX = Math.cos(ax),
      sinX = Math.sin(ax)
    const y1 = v.y * cosX - v.z * sinX
    const z1 = v.y * sinX + v.z * cosX
    const cosY = Math.cos(ay),
      sinY = Math.sin(ay)
    const x2 = v.x * cosY + z1 * sinY
    const z2 = -v.x * sinY + z1 * cosY
    const cosZ = Math.cos(az || 0),
      sinZ = Math.sin(az || 0)
    const x3 = x2 * cosZ - y1 * sinZ
    const y3 = x2 * sinZ + y1 * cosZ
    return { x: x3, y: y3, z: z2 }
  }

  function project(v: { x: number; y: number; z: number }) {
    const scale = FOCAL / (FOCAL + v.z)
    return { x: v.x * scale, y: v.y * scale, z: v.z }
  }

  let pointerGlow = 0
  let scrollGlow = 0
  let interactionComplete = false
  let targetGlow = 0
  let glowAmount = 0
  let speedBoost = 1
  let cursorActive = false
  let cursorX = 0
  let cursorY = 0
  let glowClientX = 0
  let glowClientY = 0
  let nextPlasmaAt = 0

  function updateCursorAura(clientX: number, clientY: number, proximity: number) {
    if (!cursorAuraEnabled || !cursorAura) return
    const intensity = Math.max(0, Math.min(1, proximity))
    cursorActive = true
    cursorX = clientX
    cursorY = clientY
    cursorAura.style.setProperty('--cursor-x', `${clientX}px`)
    cursorAura.style.setProperty('--cursor-y', `${clientY}px`)
    cursorAura.style.setProperty('--cursor-aura-scale', (0.74 + intensity * 0.46).toFixed(3))
    cursorAura.style.opacity = (0.22 + intensity * 0.52).toFixed(3)
  }

  function hideCursorAura() {
    cursorActive = false
    if (cursorAuraEnabled && cursorAura) cursorAura.style.opacity = '0'
  }

  function smoothstep(t: number) {
    const x = Math.max(0, Math.min(1, t))
    return x * x * (3 - 2 * x)
  }

  function updateScrollGlow() {
    if (interactionComplete) {
      scrollGlow = 1
      return
    }
    if (!spacer || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      scrollGlow = 0
      return
    }
    const maxScroll = Math.max(1, spacer.offsetHeight - window.innerHeight)
    const progress = Math.min(1, window.scrollY / maxScroll)
    scrollGlow = smoothstep((progress - 0.08) / 0.78)
  }

  function completeInteraction() {
    if (interactionComplete) return
    interactionComplete = true
    scrollGlow = 1
    targetGlow = 1
    window.scrollTo(0, 0)
    window.dispatchEvent(new CustomEvent('v21:complete'))
  }

  function scheduleNextPlasma(now: number, proximity: number) {
    const interval =
      PLASMA_MAX_INTERVAL_MS -
      (PLASMA_MAX_INTERVAL_MS - PLASMA_MIN_INTERVAL_MS) * Math.max(0, Math.min(1, proximity))
    nextPlasmaAt = now + interval * (0.65 + Math.random() * 0.45)
  }

  function pointOnPlasmaArc(
    sx: number, sy: number, c1x: number, c1y: number,
    c2x: number, c2y: number, ex: number, ey: number, t: number,
  ) {
    const inv = 1 - t
    return {
      x: inv * inv * inv * sx + 3 * inv * inv * t * c1x + 3 * inv * t * t * c2x + t * t * t * ex,
      y: inv * inv * inv * sy + 3 * inv * inv * t * c1y + 3 * inv * t * t * c2y + t * t * t * ey,
    }
  }

  function spawnPlasmaBlob() {
    if (!plasmaEnabled || !cursorActive || !Number.isFinite(glowClientX) || !plasmaLayer) return
    const heroRect = hero!.getBoundingClientRect()
    const targetVisible =
      glowClientX >= heroRect.left - 80 &&
      glowClientX <= heroRect.right + 80 &&
      glowClientY >= heroRect.top - 80 &&
      glowClientY <= heroRect.bottom + 80
    if (!targetVisible) return

    const blob = document.createElement('div')
    blob.className = 'v21-plasma-blob'
    const size = 82 + Math.random() * 58
    blob.style.setProperty('--plasma-size', `${size.toFixed(1)}px`)
    plasmaLayer.appendChild(blob)

    const sx = cursorX + (Math.random() - 0.5) * 72
    const sy = cursorY + (Math.random() - 0.5) * 72
    const ex = glowClientX + (Math.random() - 0.5) * 26
    const ey = glowClientY + (Math.random() - 0.5) * 26
    const dx = ex - sx
    const dy = ey - sy
    const dist = Math.hypot(dx, dy) || 1
    const normalX = -dy / dist
    const normalY = dx / dist
    const arc = (Math.random() > 0.5 ? 1 : -1) * Math.min(320, Math.max(92, dist * 0.42))
    const c1Arc = arc * (0.82 + Math.random() * 0.22)
    const c2Arc = arc * (0.98 + Math.random() * 0.22)
    const c1x = sx + dx * (0.22 + Math.random() * 0.12) + normalX * c1Arc
    const c1y = sy + dy * (0.22 + Math.random() * 0.12) + normalY * c1Arc
    const c2x = sx + dx * (0.66 + Math.random() * 0.16) + normalX * c2Arc
    const c2y = sy + dy * (0.66 + Math.random() * 0.16) + normalY * c2Arc
    const start = performance.now()

    function tick(now: number) {
      const rawT = Math.min(1, (now - start) / PLASMA_DURATION_MS)
      const t = Math.pow(rawT, 1.75)
      const p = pointOnPlasmaArc(sx, sy, c1x, c1y, c2x, c2y, ex, ey, t)
      const opacity =
        rawT < 0.18 ? rawT / 0.18 : Math.max(0, 1 - Math.pow((rawT - 0.18) / 0.82, 1.55))
      const scale = 0.78 + Math.sin(rawT * Math.PI) * 0.32
      blob.style.opacity = (opacity * 0.55).toFixed(3)
      blob.style.transform = `translate3d(${(p.x - size / 2).toFixed(1)}px, ${(p.y - size / 2).toFixed(1)}px, 0) scale(${scale.toFixed(3)})`
      if (rawT >= 1) {
        blob.remove()
        return
      }
      requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }

  function maybeSpawnPlasma(now: number) {
    if (!plasmaEnabled || !cursorActive || lockState === 'locked') return
    if (nextPlasmaAt === 0) scheduleNextPlasma(now, targetGlow)
    if (now < nextPlasmaAt) return
    spawnPlasmaBlob()
    if (targetGlow > 0.45 && Math.random() > 0.55) spawnPlasmaBlob()
    scheduleNextPlasma(now, targetGlow)
  }

  function onMove(clientX: number, clientY: number) {
    const rect = stage!.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (clientX - cx) / (rect.width / 2)
    const dy = (clientY - cy) / (rect.height / 2)
    const dist = Math.hypot(dx, dy)
    pointerGlow = Math.max(0, 1 - dist / PROXIMITY_R)
    updateCursorAura(clientX, clientY, pointerGlow)
  }

  const onMouseMove = (e: MouseEvent) => onMove(e.clientX, e.clientY)
  const onMouseLeave = () => {
    pointerGlow = 0
    hideCursorAura()
  }
  const onTouchMove = (e: TouchEvent) => {
    if (e.touches[0]) onMove(e.touches[0].clientX, e.touches[0].clientY)
  }
  const onTouchEnd = () => {
    pointerGlow = 0
    hideCursorAura()
  }

  window.addEventListener('mousemove', onMouseMove, { passive: true })
  window.addEventListener('mouseleave', onMouseLeave)
  window.addEventListener('touchmove', onTouchMove, { passive: true })
  window.addEventListener('touchend', onTouchEnd)

  let angleX = -0.3,
    angleY = 0,
    angleZ = 0
  let lockState: 'free' | 'locking' | 'settling' | 'locked' | 'unlocking' = 'free'
  let hoverStartTime = 0
  let lockTargetX = 0,
    lockTargetY = 0,
    lockTargetZ = 0
  let activeFaceIdx = -1
  let lockProgress = 0
  let pulseStartTime = 0
  let lockSettleStartTime = 0
  let firstPulseTimer = 0
  let rafId = 0
  let animStartTime = 0
  let autoLockTriggered = false

  const wireFrontRGB = { r: 255, g: 255, b: 255 }
  const wireBackRGB = { r: 140, g: 185, b: 220 }

  function mixColor(t: number) {
    const r = Math.round(wireFrontRGB.r + (wireBackRGB.r - wireFrontRGB.r) * t)
    const g = Math.round(wireFrontRGB.g + (wireBackRGB.g - wireFrontRGB.g) * t)
    const b = Math.round(wireFrontRGB.b + (wireBackRGB.b - wireFrontRGB.b) * t)
    return `rgb(${r}, ${g}, ${b})`
  }

  function setLockedVisuals(isLocked: boolean) {
    stage!.classList.toggle('is-locked', isLocked)
    if (!isLocked) clearFirstPulseTimer()
  }

  function clearFirstPulseTimer() {
    if (!firstPulseTimer) return
    window.clearTimeout(firstPulseTimer)
    firstPulseTimer = 0
  }

  function spawnPulse() {
    const ring = document.createElementNS(SVG_NS, 'circle')
    ring.setAttribute('cx', '0')
    ring.setAttribute('cy', '0')
    ring.setAttribute('r', '40')
    ring.setAttribute('fill', 'url(#v21PulseGrad)')
    ring.setAttribute('filter', 'url(#v21PulseBlur)')
    ring.setAttribute('opacity', '0')
    pulsesG.appendChild(ring)
    const start = performance.now()
    const startR = 40
    function tick(now: number) {
      const t = Math.min(1, (now - start) / PULSE_DURATION_MS)
      const eased = 1 - Math.pow(1 - t, 2)
      const r = startR + (PULSE_MAX_R - startR) * eased
      const opacity = t < 0.15 ? (t / 0.15) * 0.95 : 0.95 * (1 - (t - 0.15) / 0.85)
      ring.setAttribute('r', r.toFixed(1))
      ring.setAttribute('opacity', opacity.toFixed(3))
      if (t >= 1) {
        ring.remove()
        return
      }
      requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }

  function spawnPagePulse() {
    if (!pulseOverlay || !stage) return
    const stageRect = stage.getBoundingClientRect()
    const originX = stageRect.left + stageRect.width / 2
    const originY = stageRect.top + stageRect.height / 2
    const el = document.createElement('div')
    el.className = 'v21-page-pulse'
    pulseOverlay.appendChild(el)
    const start = performance.now()
    function tick(now: number) {
      const t = Math.min(1, (now - start) / PAGE_PULSE_DURATION_MS)
      const eased = 1 - Math.pow(1 - t, 2.5)
      const size = 80 + (PAGE_PULSE_MAX_SIZE - 80) * eased
      const opacity = t < 0.1 ? t / 0.1 : Math.max(0, 1 - Math.pow((t - 0.1) / 0.9, 1.4))
      el.style.width = size.toFixed(0) + 'px'
      el.style.height = size.toFixed(0) + 'px'
      el.style.left = (originX - size / 2).toFixed(0) + 'px'
      el.style.top = (originY - size / 2).toFixed(0) + 'px'
      el.style.opacity = opacity.toFixed(3)
      if (t >= 1) { el.remove(); return }
      requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }

  function revealBrandThenPulse(now: number) {
    setLockedVisuals(true)
    completeInteraction()
    clearFirstPulseTimer()
    firstPulseTimer = window.setTimeout(() => {
      spawnPulse()
      spawnPagePulse()
      firstPulseTimer = 0
    }, FIRST_PULSE_DELAY_MS)
    pulseStartTime = now + FIRST_PULSE_DELAY_MS
  }

  function computeLockAngles(faceIdx: number) {
    const face = faces[faceIdx]
    const v0 = vertices[face[0]],
      v1 = vertices[face[1]],
      v2 = vertices[face[2]]
    const cx = (v0.x + v1.x + v2.x) / 3
    const cy = (v0.y + v1.y + v2.y) / 3
    const cz = (v0.z + v1.z + v2.z) / 3
    const ax = Math.atan2(cy, cz)
    const sinX = Math.sin(ax),
      cosX = Math.cos(ax)
    const z1 = cy * sinX + cz * cosX
    let ay = Math.atan2(-cx, z1)
    const cosY = Math.cos(ay),
      sinY = Math.sin(ay)
    const z2 = -cx * sinY + z1 * cosY
    if (z2 > 0) ay += Math.PI
    const projected = face.map((idx) => rotate(vertices[idx], ax, ay, 0))
    let apexI = 0
    for (let i = 1; i < 3; i++) {
      if (projected[i].y < projected[apexI].y) apexI = i
    }
    const apex = projected[apexI]
    const currentAngle = Math.atan2(apex.y, apex.x)
    const az = -Math.PI / 2 - currentAngle
    return { ax, ay, az }
  }

  function shortestAngle(from: number, to: number) {
    let d = (to - from) % TAU
    if (d > Math.PI) d -= Math.PI * 2
    if (d < -Math.PI) d += Math.PI * 2
    return d
  }

  function directedAngle(from: number, to: number, direction: number) {
    let d = (to - from) % TAU
    if (direction >= 0) {
      if (d < 0) d += TAU
      return d
    }
    if (d > 0) d -= TAU
    return d
  }

  function faceCentroidZ(faceIdx: number, ax: number, ay: number) {
    const f = faces[faceIdx]
    const cx = (vertices[f[0]].x + vertices[f[1]].x + vertices[f[2]].x) / 3
    const cy = (vertices[f[0]].y + vertices[f[1]].y + vertices[f[2]].y) / 3
    const cz = (vertices[f[0]].z + vertices[f[1]].z + vertices[f[2]].z) / 3
    return rotate({ x: cx, y: cy, z: cz }, ax, ay, 0).z
  }

  function pickDirectionalLockTarget(ax: number, ay: number, az: number) {
    const yawDirection = Math.sign(ROT_SPEED_Y) || 1
    const bestFacingZ = Math.min(...faces.map((_, i) => faceCentroidZ(i, ax, ay)))
    let best: { faceIdx: number; dx: number; dy: number; dz: number; cost: number } | null = null

    faces.forEach((_, faceIdx) => {
      const target = computeLockAngles(faceIdx)
      const dx = shortestAngle(ax, target.ax)
      const dy = directedAngle(ay, target.ay, yawDirection)
      const dz = shortestAngle(az, target.az)
      const facingPenalty = Math.max(0, (faceCentroidZ(faceIdx, ax, ay) - bestFacingZ) / SIZE)
      const cost = dy + Math.abs(dx) * 0.45 + Math.abs(dz) * 0.2 + facingPenalty * 0.75
      if (!best || cost < best.cost) {
        best = { faceIdx, dx, dy, dz, cost }
      }
    })

    return best!
  }

  function render() {
    const now = performance.now()
    updateScrollGlow()
    targetGlow = Math.max(pointerGlow, scrollGlow)
    if (animStartTime === 0) animStartTime = now
    const elapsed = now - animStartTime
    const autoProgress = Math.min(1, elapsed / AUTO_LOCK_MS)
    const idleBoost = 1 + (IDLE_SPEED_MAX - 1) * Math.pow(autoProgress, 2)
    glowAmount += (targetGlow - glowAmount) * GLOW_EASE

    const cursorNear = targetGlow >= HOVER_ENTER_PROX
    const scrollLockReady = scrollGlow >= 0.98

    if (lockState === 'free') {
      setLockedVisuals(false)
      if (cursorNear) {
        if (hoverStartTime === 0) hoverStartTime = now
        if (scrollLockReady || now - hoverStartTime >= HOVER_HOLD_MS) {
          const target = pickDirectionalLockTarget(angleX, angleY, angleZ)
          activeFaceIdx = target.faceIdx
          lockTargetX = angleX + target.dx
          lockTargetY = angleY + target.dy
          lockTargetZ = angleZ + target.dz
          lockState = 'locking'
          pulseStartTime = now
        }
      } else {
        hoverStartTime = 0
      }
      if (lockState === 'free' && autoProgress >= 1) {
        autoLockTriggered = true
        const target = pickDirectionalLockTarget(angleX, angleY, angleZ)
        activeFaceIdx = target.faceIdx
        lockTargetX = angleX + target.dx
        lockTargetY = angleY + target.dy
        lockTargetZ = angleZ + target.dz
        lockState = 'locking'
        pulseStartTime = now
      }
      if (lockState === 'free') {
        lockProgress += (0 - lockProgress) * LOCK_EASE
        if (lockProgress < 0.01) {
          lockProgress = 0
          activeFaceIdx = -1
        }
      }
    } else if (lockState === 'locking') {
      setLockedVisuals(false)
      const preErr =
        Math.abs(lockTargetX - angleX) +
        Math.abs(lockTargetY - angleY) +
        Math.abs(lockTargetZ - angleZ)
      const easeScale = 0.35 + 0.65 * Math.min(1, preErr / 0.35)
      const lockEase = LOCK_EASE * easeScale
      angleX += (lockTargetX - angleX) * lockEase
      angleY += (lockTargetY - angleY) * lockEase
      angleZ += (lockTargetZ - angleZ) * lockEase
      const totalErr =
        Math.abs(lockTargetX - angleX) +
        Math.abs(lockTargetY - angleY) +
        Math.abs(lockTargetZ - angleZ)
      const targetProgress = Math.max(0, Math.min(1, 1 - totalErr / 0.6))
      lockProgress += (targetProgress - lockProgress) * lockEase
      if (totalErr < LOCK_SETTLE_ERR) {
        lockState = 'settling'
        lockSettleStartTime = now
      }
      if (!cursorNear && !autoLockTriggered) {
        lockState = 'unlocking'
        hoverStartTime = 0
      }
    } else if (lockState === 'settling') {
      setLockedVisuals(false)
      angleX += (lockTargetX - angleX) * LOCK_SETTLE_EASE
      angleY += (lockTargetY - angleY) * LOCK_SETTLE_EASE
      angleZ += (lockTargetZ - angleZ) * LOCK_SETTLE_EASE
      lockProgress += (1 - lockProgress) * LOCK_EASE
      if (lockProgress > 0.998) lockProgress = 1
      const totalErr =
        Math.abs(lockTargetX - angleX) +
        Math.abs(lockTargetY - angleY) +
        Math.abs(lockTargetZ - angleZ)
      if (
        (now - lockSettleStartTime >= LOCK_SETTLE_MS && totalErr < 0.012) ||
        totalErr < LOCK_SNAP_ERR
      ) {
        angleX = lockTargetX
        angleY = lockTargetY
        angleZ = lockTargetZ
        lockProgress = 1
        lockState = 'locked'
        revealBrandThenPulse(now)
      }
      if (!cursorNear && !autoLockTriggered) {
        lockState = 'unlocking'
        hoverStartTime = 0
      }
    } else if (lockState === 'locked') {
      setLockedVisuals(true)
      const totalErr =
        Math.abs(lockTargetX - angleX) +
        Math.abs(lockTargetY - angleY) +
        Math.abs(lockTargetZ - angleZ)
      if (totalErr > LOCK_SNAP_ERR) {
        angleX += (lockTargetX - angleX) * LOCK_SETTLE_EASE
        angleY += (lockTargetY - angleY) * LOCK_SETTLE_EASE
        angleZ += (lockTargetZ - angleZ) * LOCK_SETTLE_EASE
      } else {
        angleX = lockTargetX
        angleY = lockTargetY
        angleZ = lockTargetZ
      }
      lockProgress = 1
      if (now - pulseStartTime >= PULSE_INTERVAL_MS) {
        spawnPulse()
        spawnPagePulse()
        pulseStartTime = now
      }
    } else if (lockState === 'unlocking') {
      setLockedVisuals(false)
      lockState = 'free'
    }

    if (lockState === 'free') {
      const cursorTarget = 1 + (SPEED_BOOST - 1) * targetGlow
      speedBoost += (cursorTarget - speedBoost) * SPEED_EASE
      const effectiveSpeed = Math.max(speedBoost, idleBoost)
      angleY += ROT_SPEED_Y * effectiveSpeed
      angleX += ROT_SPEED_X * effectiveSpeed
      angleZ += (0 - angleZ) * LOCK_EASE
    } else {
      speedBoost += (1 - speedBoost) * SPEED_EASE
    }

    const transformed = vertices.map((v) => rotate(v, angleX, angleY, angleZ))
    const projected = transformed.map((v) => {
      const persp = project(v)
      if (lockProgress <= 0) return persp
      const t = lockProgress
      return {
        x: persp.x * (1 - t) + v.x * t,
        y: persp.y * (1 - t) + v.y * t,
        z: v.z,
      }
    })

    const edgeMidZ = edges.map((e) => (transformed[e.a].z + transformed[e.b].z) / 2)
    const minZ = Math.min(...edgeMidZ)
    const maxZ = Math.max(...edgeMidZ)
    const zRange = maxZ - minZ || 1

    const frontEdgeSet = activeFaceIdx >= 0 ? new Set(faceEdges[activeFaceIdx]) : null
    const edgeOrder = edges.map((_, i) => i).sort((a, b) => edgeMidZ[b] - edgeMidZ[a])

    edgeOrder.forEach((i) => {
      const edge = edges[i]
      const line = edgeLines[i]
      const p0 = projected[edge.a]
      const p1 = projected[edge.b]
      line.setAttribute('x1', p0.x.toFixed(2))
      line.setAttribute('y1', p0.y.toFixed(2))
      line.setAttribute('x2', p1.x.toFixed(2))
      line.setAttribute('y2', p1.y.toFixed(2))

      const depth = (edgeMidZ[i] - minZ) / zRange
      const freeStrokeWidth = STROKE_FRONT + (STROKE_BACK - STROKE_FRONT) * depth
      const freeOpacity = 1 - depth * 0.75
      const freeColorT = depth

      const isFrontEdge = frontEdgeSet ? frontEdgeSet.has(i) : true
      const t = lockProgress
      let strokeWidth: number, opacity: number, colorT: number

      if (isFrontEdge) {
        strokeWidth = freeStrokeWidth * (1 - t) + STROKE_FRONT * t
        opacity = freeOpacity * (1 - t) + 1 * t
        colorT = freeColorT * (1 - t)
      } else {
        const fade = Math.max(0, 1 - t * 2)
        strokeWidth = freeStrokeWidth
        opacity = freeOpacity * fade
        colorT = freeColorT
      }

      const display = !isFrontEdge && t > 0.5 ? 'none' : 'inline'
      line.setAttribute('display', display)
      line.setAttribute('stroke-width', strokeWidth.toFixed(2))
      line.setAttribute('opacity', opacity.toFixed(3))
      line.setAttribute('stroke', mixColor(colorT))
      edgesG.appendChild(line)
    })

    const cx = (projected[0].x + projected[1].x + projected[2].x + projected[3].x) / 4
    const cy = (projected[0].y + projected[1].y + projected[2].y + projected[3].y) / 4
    glowEl.setAttribute('cx', cx.toFixed(2))
    glowEl.setAttribute('cy', cy.toFixed(2))
    const stageRect = stage!.getBoundingClientRect()
    glowClientX = stageRect.left + ((cx + 110) / 220) * stageRect.width
    glowClientY = stageRect.top + ((cy + 110) / 220) * stageRect.height

    const t = now / 1000
    const breathe = Math.sin(t * 0.8) * 0.04 + Math.sin(t * 1.9) * 0.03 + Math.sin(t * 3.1) * 0.015
    const flicker = Math.sin(t * 4.3) * 0.02 + Math.sin(t * 7.1) * 0.012 + Math.sin(t * 11.3) * 0.006
    const r = (GLOW_BASE_R + (GLOW_MAX_R - GLOW_BASE_R) * glowAmount) * (1 + breathe)
    const a0 = (GLOW_BASE_A + (GLOW_MAX_A - GLOW_BASE_A) * glowAmount) * (1 + flicker)
    const a1 = a0 * 0.35
    glowEl.setAttribute('r', r.toFixed(2))
    stop0.setAttribute('stop-opacity', a0.toFixed(3))
    stop1.setAttribute('stop-opacity', a1.toFixed(3))
    maybeSpawnPlasma(now)

    rafId = requestAnimationFrame(render)
  }

  rafId = requestAnimationFrame(render)

  return () => {
    cancelAnimationFrame(rafId)
    clearFirstPulseTimer()
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseleave', onMouseLeave)
    window.removeEventListener('touchmove', onTouchMove)
    window.removeEventListener('touchend', onTouchEnd)
  }
}
