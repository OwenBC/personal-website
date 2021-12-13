import { useState, useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'
import { LoadingSpinner, ThreeDSceneContainer } from './3d-scene-loader'
import { loadBackground } from '../lib/background'
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect'

const ThreeDScene = () => {
  const refContainer = useRef()
  const [loading, setLoading] = useState(true)
  const [renderer, setRenderer] = useState()
  const [_camera, setCamera] = useState()
  const [initialCameraPosition] = useState(new THREE.Vector3(-20, 0, 30))
  const [scene] = useState(new THREE.Scene())
  const [speed] = useState(0.05)

  const handleWindowResize = useCallback(() => {
    const { current: container } = refContainer
    if (container && renderer) {
      const scW = container.clientWidth
      const scH = container.clientHeight

      renderer.setSize(scW, scH)
    }
  }, [renderer])

  const addStar = () => {
    const geometry = new THREE.SphereGeometry(0.5, 24, 24)
    const material = new THREE.MeshStandardMaterial({
      color: 0xdb3535,
      opacity: 0.5,
      emissive: 0xe07575
    })
    const star = new THREE.Mesh(geometry, material)

    const [x, y, z] = Array(3)
      .fill()
      .map(() => THREE.MathUtils.randFloatSpread(1000))
    star.position.set(x, y, z)
    scene.add(star)
  }

  useEffect(() => {
    const { current: container } = refContainer
    if (container && !renderer) {
      const scW = container.clientWidth
      const scH = container.clientHeight

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(scW, scH)
      renderer.outputEncoding = THREE.sRGBEncoding
      // container.appendChild(renderer.domElement)
      setRenderer(renderer)

      const camera = new THREE.PerspectiveCamera(75, scW / scH, 0.1, 3000)
      camera.position.copy(initialCameraPosition)
      setCamera(camera)

      const pointLight = new THREE.PointLight(0xffffff)
      pointLight.position.set(0, 0, 0)
      scene.add(pointLight)

      const torusGeometry = new THREE.TorusKnotGeometry(10, 3, 512, 64)
      const goldMaterial = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        roughness: 0.25,
        metalness: 0.9
      })
      const torus = new THREE.Mesh(torusGeometry, goldMaterial)
      scene.add(torus)

      Array(1000).fill().forEach(addStar)

      loadBackground(scene, '/images/space.png').then(() => {
        animate()
        setLoading(false)
      })

      document.body.onscroll = () => {
        const t = document.body.getBoundingClientRect().top
        camera.position.z = 30 + t * -0.01
        camera.position.x = -20 + 20 * -Math.sin(t * -0.001)
        camera.position.y = 20 * Math.sin(t * -0.002)
      }

      const effect = new AsciiEffect(renderer, ' .:-+*=%@#', { invert: true })
      effect.setSize(window.innerWidth, window.innerHeight)
      effect.domElement.style.color = 'white'
      effect.domElement.style.backgroundColor = 'black'

      container.appendChild(effect.domElement)

      let req = null
      //let frame = 0
      const animate = () => {
        req = requestAnimationFrame(animate)

        torus.rotation.x += speed * Math.sin(torus.rotation.z + 0.1)
        torus.rotation.y += speed * Math.sin(torus.rotation.x + 0.2)
        torus.rotation.z += speed * Math.sin(torus.rotation.y + 0.3)

        effect.render(scene, camera)
      }

      return () => {
        console.log('unmount')
        cancelAnimationFrame(req)
        renderer.dispose()
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize, false)
    return () => {
      window.removeEventListener('resize', handleWindowResize, false)
    }
  }, [renderer, handleWindowResize])

  return (
    <ThreeDSceneContainer ref={refContainer}>
      {loading && <LoadingSpinner />}
    </ThreeDSceneContainer>
  )
}

export default ThreeDScene
