import { ShaderChunk } from 'three'

/**
 * Khronos PBR Neutral without its toe offset. The stock Neutral operator subtracts up to 0.04 from dark
 * values per channel, which crushes obsidian blacks and shifts them toward purple. This variant keeps
 * the highlight compression and desaturation but leaves the darks untouched.
 * Installed as THREE.CustomToneMapping so both direct rendering and OutputPass use it.
 */
const fn = /* glsl */`
vec3 CustomToneMapping( vec3 color ) {
  const float StartCompression = 0.76;
  const float Desaturation = 0.15;
  color *= toneMappingExposure;
  float peak = max( color.r, max( color.g, color.b ) );
  if ( peak < StartCompression ) return color;
  float d = 1. - StartCompression;
  float newPeak = 1. - d * d / ( peak + d - StartCompression );
  color *= newPeak / peak;
  float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
  return mix( color, vec3( newPeak ), g );
}`

let installed = false
export function installToneMapping() {
  if (installed) return
  installed = true
  ShaderChunk.tonemapping_pars_fragment = ShaderChunk.tonemapping_pars_fragment.replace(
    /vec3 CustomToneMapping\( vec3 color \) \{[^}]*\}/,
    fn
  )
}
