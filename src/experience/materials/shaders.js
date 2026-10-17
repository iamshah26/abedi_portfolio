import {
  AdditiveBlending, Color, DoubleSide, ShaderMaterial, UniformsLib, UniformsUtils, Vector2, Vector3
} from 'three'
import { palette } from '../palette.js'

const noiseGLSL = /* glsl */`
float hash12(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float vnoise(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f*f*(3.-2.*f);
  return mix(mix(hash12(i), hash12(i+vec2(1,0)), u.x), mix(hash12(i+vec2(0,1)), hash12(i+vec2(1,1)), u.x), u.y); }
`

/**
 * Crease seams of the Fold. aS is the global position along the band (0..1), so pulses travel around
 * the whole Möbius loop continuously even though each seam is a separate mesh on its own plate.
 */
export function seamMaterial() {
  return new ShaderMaterial({
    name: 'seam',
    uniforms: {
      uTime: { value: 0 },
      uGlow: { value: 0.6 },
      uBase: { value: new Color(palette.lavender) },
      uPulse: { value: new Color(palette.persimmon) }
    },
    vertexShader: /* glsl */`
      attribute float aS; varying float vS;
      void main(){ vS = aS; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }`,
    fragmentShader: /* glsl */`
      uniform float uTime, uGlow; uniform vec3 uBase, uPulse; varying float vS;
      void main(){
        float a = fract(vS - uTime * 0.045);
        float b = fract(vS * 2. + uTime * 0.03 + .37);
        float pulse = pow(smoothstep(0.0, 0.08, a) * smoothstep(0.16, 0.08, a), 2.) + 0.6 * pow(smoothstep(0.0,0.03,b)*smoothstep(0.06,0.03,b),2.);
        vec3 col = uBase * 0.22 + uPulse * pulse * 2.4;
        gl_FragColor = vec4(col * uGlow, 1.);
        #include <colorspace_fragment>
      }`,
    toneMapped: false
  })
}

/** Soft, view-dependent light cone (fake volumetric beam). */
export function coneMaterial(color = palette.porcelain) {
  return new ShaderMaterial({
    name: 'light-cone',
    uniforms: { uIntensity: { value: 0 }, uColor: { value: new Color(color) }, uTime: { value: 0 } },
    vertexShader: /* glsl */`
      varying vec3 vN; varying vec3 vV; varying float vH; varying vec3 vW;
      void main(){ vec4 wp = modelMatrix * vec4(position,1.); vW = wp.xyz; vN = normalize(mat3(modelMatrix) * normal);
        vV = normalize(cameraPosition - wp.xyz); vH = uv.y; gl_Position = projectionMatrix * viewMatrix * wp; }`,
    fragmentShader: /* glsl */`
      uniform float uIntensity, uTime; uniform vec3 uColor; varying vec3 vN; varying vec3 vV; varying float vH; varying vec3 vW;
      ${noiseGLSL}
      void main(){
        float edge = pow(abs(dot(normalize(vN), normalize(vV))), 3.0);
        float fall = pow(vH, 1.6) * smoothstep(0.0, 0.25, vH);
        float motes = 0.85 + 0.15 * vnoise(vW.xz * 2.0 + vec2(0., uTime * 0.2) + vW.y);
        float a = edge * fall * motes * uIntensity * 0.16;
        gl_FragColor = vec4(uColor * a, 1.);
        #include <colorspace_fragment>
      }`,
    transparent: true,
    blending: AdditiveBlending,
    depthWrite: false,
    side: DoubleSide,
    toneMapped: false
  })
}

/** Shader for three/examples Reflector: blurred, fresnel-weighted reflection over a tinted base. */
export const FloorReflectorShader = {
  name: 'ObsidianFloor',
  uniforms: UniformsUtils.merge([
    UniformsLib.fog,
    {
      color: { value: null },
      tDiffuse: { value: null },
      textureMatrix: { value: null },
      uBase: { value: new Color(palette.obsidian) },
      uStrength: { value: 1 },
      uBlur: { value: 2.5 },
      uTexel: { value: new Vector2(1 / 1024, 1 / 1024) },
      uGlowPos: { value: new Vector3() },
      uGlowColor: { value: new Color(palette.persimmon) },
      uGlow: { value: 0.0 },
      uTime: { value: 0 }
    }
  ]),
  vertexShader: /* glsl */`
    uniform mat4 textureMatrix; varying vec4 vUvR; varying vec3 vWorld;
    #include <common>
    #include <fog_pars_vertex>
    void main(){ vUvR = textureMatrix * vec4(position, 1.0); vec4 wp = modelMatrix * vec4(position, 1.0); vWorld = wp.xyz;
      vec4 mvPosition = viewMatrix * wp; gl_Position = projectionMatrix * mvPosition;
      #include <fog_vertex>
    }`,
  fragmentShader: /* glsl */`
    uniform sampler2D tDiffuse; uniform vec3 uBase; uniform float uStrength, uBlur, uGlow, uTime; uniform vec2 uTexel;
    uniform vec3 uGlowPos, uGlowColor; varying vec4 vUvR; varying vec3 vWorld;
    #include <common>
    #include <fog_pars_fragment>
    ${noiseGLSL}
    void main(){
      vec2 uv = vUvR.xy / vUvR.w;
      float n = vnoise(vWorld.xz * 0.9) - 0.5; float n2 = vnoise(vWorld.xz * 6.0) - 0.5;
      uv += vec2(n, n2) * 0.0035;
      vec3 V = normalize(cameraPosition - vWorld);
      float dist = length(cameraPosition - vWorld);
      float r = uBlur * (1.0 + clamp(dist * 0.06, 0.0, 2.5));
      vec3 refl = texture2D(tDiffuse, uv).rgb * 0.2;
      refl += texture2D(tDiffuse, uv + vec2( 1.0, 0.3) * r * uTexel).rgb * 0.1;
      refl += texture2D(tDiffuse, uv + vec2(-0.9, 0.5) * r * uTexel).rgb * 0.1;
      refl += texture2D(tDiffuse, uv + vec2( 0.4,-1.0) * r * uTexel).rgb * 0.1;
      refl += texture2D(tDiffuse, uv + vec2(-0.5,-0.8) * r * uTexel).rgb * 0.1;
      refl += texture2D(tDiffuse, uv + vec2( 2.0, 0.6) * r * uTexel).rgb * 0.1;
      refl += texture2D(tDiffuse, uv + vec2(-1.8, 1.0) * r * uTexel).rgb * 0.1;
      refl += texture2D(tDiffuse, uv + vec2( 0.8,-2.1) * r * uTexel).rgb * 0.1;
      refl += texture2D(tDiffuse, uv + vec2(-1.0,-1.9) * r * uTexel).rgb * 0.1;
      float fres = 0.05 + 0.95 * pow(1.0 - clamp(V.y, 0.0, 1.0), 4.0);
      float k = mix(0.32, 0.95, fres) * uStrength * (0.9 + n2 * 0.25);
      vec3 col = uBase * (0.85 + n * 0.3) + refl * k;
      float d = length(vWorld.xz - uGlowPos.xz);
      col += uGlowColor * uGlow * exp(-d * d * 0.09) * 0.35;
      gl_FragColor = vec4(col, 1.0);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
      #include <fog_fragment>
    }`
}

/** Vertical gradient sky dome. */
export function skyMaterial() {
  return new ShaderMaterial({
    name: 'sky',
    uniforms: {
      uTop: { value: new Color('#09090c') },
      uHorizon: { value: new Color('#17141d') },
      uBottom: { value: new Color('#060608') },
      uGlow: { value: new Color('#1a1722') },
      uGlowDir: { value: new Vector3(0, 0.1, -1).normalize() }
    },
    vertexShader: /* glsl */`varying vec3 vDir; void main(){ vDir = normalize(position); vec4 p = projectionMatrix * modelViewMatrix * vec4(position,1.); gl_Position = p.xyww; }`,
    fragmentShader: /* glsl */`
      uniform vec3 uTop, uHorizon, uBottom, uGlow, uGlowDir; varying vec3 vDir;
      ${noiseGLSL}
      void main(){
        float y = vDir.y;
        vec3 col = y > 0. ? mix(uHorizon, uTop, pow(clamp(y,0.,1.), 0.55)) : mix(uHorizon, uBottom, pow(clamp(-y,0.,1.),0.4));
        col += uGlow * pow(max(dot(vDir, uGlowDir), 0.), 6.) * 0.6;
        col += (hash12(gl_FragCoord.xy) - 0.5) / 255.0;
        gl_FragColor = vec4(col, 1.);
        #include <colorspace_fragment>
      }`,
    depthWrite: false,
    side: 1,
    toneMapped: false
  })
}

export function dustMaterial(pixelRatio = 1) {
  return new ShaderMaterial({
    name: 'dust',
    uniforms: { uTime: { value: 0 }, uOpacity: { value: 0.6 }, uScale: { value: 22 * pixelRatio }, uColor: { value: new Color('#e9e1d6') } },
    vertexShader: /* glsl */`
      attribute float aSeed; uniform float uTime, uScale; varying float vA;
      void main(){ vec3 p = position;
        p.y += sin(uTime * 0.13 + aSeed * 40.) * 0.35; p.x += sin(uTime * 0.07 + aSeed * 13.) * 0.4; p.z += cos(uTime * 0.05 + aSeed * 7.) * 0.3;
        vec4 mv = modelViewMatrix * vec4(p,1.); gl_Position = projectionMatrix * mv;
        gl_PointSize = min(uScale * (0.4 + aSeed) / -mv.z, 3.5 * uScale / 22.0); vA = 0.35 + 0.65 * fract(aSeed * 91.7); }`,
    fragmentShader: /* glsl */`
      uniform float uOpacity; uniform vec3 uColor; varying float vA;
      void main(){ float d = length(gl_PointCoord - .5); float a = smoothstep(.5, .0, d) * vA * uOpacity; gl_FragColor = vec4(uColor * a, 1.);
        #include <colorspace_fragment>
      }`,
    transparent: true,
    blending: AdditiveBlending,
    depthWrite: false,
    toneMapped: false
  })
}

/** Floor guide lines that draw themselves into the hall. aLen is normalised distance along the line. */
export function guideMaterial(color = palette.porcelain) {
  return new ShaderMaterial({
    name: 'guide',
    uniforms: { uDraw: { value: 0 }, uTime: { value: 0 }, uColor: { value: new Color(color) }, uIntensity: { value: 1 } },
    vertexShader: /* glsl */`attribute float aLen; varying float vL; varying vec2 vUv; void main(){ vL = aLen; vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }`,
    fragmentShader: /* glsl */`
      uniform float uDraw, uTime, uIntensity; uniform vec3 uColor; varying float vL; varying vec2 vUv;
      void main(){
        float head = smoothstep(uDraw, uDraw - 0.02, vL);
        float flow = 0.55 + 0.45 * pow(0.5 + 0.5 * sin(vL * 160. - uTime * 2.4), 6.);
        float across = smoothstep(0., .35, vUv.y) * smoothstep(1., .65, vUv.y);
        gl_FragColor = vec4(uColor * head * flow * across * uIntensity * 0.9, 1.);
        #include <colorspace_fragment>
      }`,
    transparent: true,
    blending: AdditiveBlending,
    depthWrite: false,
    toneMapped: false
  })
}

/**
 * Exhibit image: reveal wipe from bottom with a persimmon scan edge, desaturated until in focus,
 * pointer ripple and slight chromatic split on hover.
 */
export function exhibitImageMaterial(map) {
  return new ShaderMaterial({
    name: 'exhibit-image',
    uniforms: {
      map: { value: map },
      uReveal: { value: 0 },
      uFocus: { value: 0 },
      uHover: { value: 0 },
      uPointer: { value: new Vector2(0.5, 0.5) },
      uTime: { value: 0 },
      uEdge: { value: new Color(palette.persimmon) },
      uPorcelain: { value: 0 }
    },
    vertexShader: /* glsl */`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }`,
    fragmentShader: /* glsl */`
      uniform sampler2D map; uniform float uReveal, uFocus, uHover, uTime; uniform vec2 uPointer; uniform vec3 uEdge; varying vec2 vUv;
      void main(){
        vec2 uv = vUv;
        float d = distance(uv, uPointer);
        uv += (uv - uPointer) * sin(d * 28. - uTime * 3.) * 0.006 * uHover * smoothstep(0.45, 0., d);
        uv = (uv - .5) * (1. - 0.035 * uFocus) + .5;
        float ca = 0.0025 * uHover;
        vec3 col = vec3(texture2D(map, uv + vec2(ca,0.)).r, texture2D(map, uv).g, texture2D(map, uv - vec2(ca,0.)).b);
        float lum = dot(col, vec3(.299,.587,.114));
        col = mix(vec3(lum) * vec3(.92,.9,1.0), col, 0.35 + 0.65 * uFocus);
        col *= 0.55 + 0.45 * uFocus;
        float wipe = uReveal * 1.15 - 0.075;
        float shown = smoothstep(wipe, wipe - 0.06, vUv.y);
        float edge = smoothstep(0.035, 0., abs(vUv.y - wipe)) * step(0.01, uReveal) * step(uReveal, 0.99);
        col = col * shown + uEdge * edge * 1.6;
        float vig = smoothstep(1.2, 0.35, length((vUv - .5) * vec2(1.3, 1.0)));
        col *= mix(0.82, 1.0, vig);
        gl_FragColor = vec4(col, 1.);
        #include <colorspace_fragment>
      }`,
    toneMapped: false
  })
}

/** Reactive streams in the Engineer atrium: marbles travelling along routed paths. */
export function streamMaterial(color = palette.persimmon) {
  return new ShaderMaterial({
    name: 'stream',
    uniforms: { uTime: { value: 0 }, uDraw: { value: 0 }, uColor: { value: new Color(color) }, uBase: { value: new Color(palette.lavender) } },
    vertexShader: /* glsl */`attribute float aLen; attribute float aSeed; varying float vL; varying float vSeed; varying vec2 vUv;
      void main(){ vL = aLen; vSeed = aSeed; vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }`,
    fragmentShader: /* glsl */`
      uniform float uTime, uDraw; uniform vec3 uColor, uBase; varying float vL; varying float vSeed; varying vec2 vUv;
      void main(){
        float drawn = step(vL, uDraw);
        float t = fract(vL * 3.0 - uTime * (0.18 + vSeed * 0.12) + vSeed);
        float marble = smoothstep(0.035, 0.0, abs(t - 0.5));
        float across = smoothstep(0., .4, vUv.y) * smoothstep(1., .6, vUv.y);
        vec3 col = uBase * 0.16 + uColor * marble * 2.2;
        gl_FragColor = vec4(col * across * drawn, 1.);
        #include <colorspace_fragment>
      }`,
    transparent: true,
    blending: AdditiveBlending,
    depthWrite: false,
    toneMapped: false
  })
}

/** Final display-referred grade: vignette, film grain, subtle lateral chromatic aberration, fade to porcelain. */
export const GradeShader = {
  name: 'Grade',
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uVignette: { value: 0.32 },
    uGrain: { value: 0.045 },
    uAberration: { value: 0.0012 },
    uLift: { value: new Color('#24202D') },
    uLiftAmount: { value: 0.06 },
    uFlash: { value: 0 }
  },
  vertexShader: /* glsl */`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }`,
  fragmentShader: /* glsl */`
    uniform sampler2D tDiffuse; uniform float uTime, uVignette, uGrain, uAberration, uLiftAmount, uFlash; uniform vec3 uLift; varying vec2 vUv;
    ${noiseGLSL}
    void main(){
      vec2 c = vUv - .5; float r2 = dot(c,c);
      vec2 off = c * r2 * uAberration * 8.;
      vec3 col = vec3(texture2D(tDiffuse, vUv + off).r, texture2D(tDiffuse, vUv).g, texture2D(tDiffuse, vUv - off).b);
      col = col + uLift * uLiftAmount * (1. - col);
      col *= 1. - uVignette * smoothstep(0.08, 0.6, r2);
      float g = hash12(vUv * 1000. + fract(uTime) * 100.) - 0.5;
      col += g * uGrain * (0.6 + 0.4 * (1. - dot(col, vec3(.333))));
      col = mix(col, vec3(1.), uFlash);
      gl_FragColor = vec4(col, 1.);
    }`
}
