import { TextureLoader } from 'three'

export function loadBackground(scene, imagePath) {
  return new Promise((resolve, reject) => {
    const loader = new TextureLoader()

    loader.load(
      imagePath,
      texture => {
        scene.background = texture
        resolve(texture)
      },
      undefined,
      function (error) {
        reject(error)
      }
    )
  })
}
