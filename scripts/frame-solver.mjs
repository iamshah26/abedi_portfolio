// Projects storyboard landmarks for candidate camera poses (screen coords 0..1). Used to author keyframes.
import { PerspectiveCamera, Vector3 } from 'three'
const cands = JSON.parse(process.argv[2])
const pts = JSON.parse(process.argv[3])
for (const [pos, tgt, fov, aspect = 1.6] of cands) {
  const cam = new PerspectiveCamera(fov, aspect, 0.1, 500)
  cam.position.set(...pos); cam.lookAt(new Vector3(...tgt)); cam.updateMatrixWorld(); cam.updateProjectionMatrix()
  const out = Object.entries(pts).map(([k, p]) => { const v = new Vector3(...p).project(cam); return `${k}:(${((v.x + 1) / 2).toFixed(2)},${((1 - v.y) / 2).toFixed(2)})` })
  console.log(JSON.stringify(pos), JSON.stringify(tgt), fov, '→', out.join(' '))
}
