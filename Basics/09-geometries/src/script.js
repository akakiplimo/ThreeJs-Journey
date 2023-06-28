import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// We then add this buffer attribute to our buffer geometry, with setAttribute
const geometry = new THREE.BufferGeometry()

const count = 5000

const positionsArr = new Float32Array(count * 3 * 3)

for(let i = 0; i < count * 3 * 3; i++) {
    positionsArr[i] = (Math.random() - 0.5) * 4
}

const positionsAttribute = new THREE.BufferAttribute(positionsArr, 3)
geometry.setAttribute('position', positionsAttribute)

// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2 , 2)

// const positionsArray = new Float32Array([
//     0, 0, 0,
//     0, 1, 0,
//     1, 0, 0
// ])

// Explicitly defining the array values using positions (have to give a length in array def) above we define using a sort of matrix
// First Vertex
// positionsArr[0] = 0
// positionsArr[1] = 0
// positionsArr[2] = 0

// 2nd Vertex
// positionsArr[3] = 0
// positionsArr[4] = 1
// positionsArr[5] = 0

// 3rd Vertex
// positionsArr[6] = 1
// positionsArr[7] = 0
// positionsArr[8] = 0

// We then convert the Float32Array to a BufferAttribute, 3 corresponds to how many values compose one vertex
// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)

// position is the name used in the shaders, won't work if we use any other value
// geometry.setAttribute('position', positionsAttribute)

const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true
 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()