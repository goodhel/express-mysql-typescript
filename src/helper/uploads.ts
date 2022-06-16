import multer from 'multer'
import path from 'path'

const upload = (dest: string, name: string) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(`${__dirname}`, `/../public/${dest}`))
    },
    filename: (req, file, cb) => {
      const mime = file.mimetype.split('/')
      const extenstion = mime[mime.length - 1]
      const filename = `${name}_${Date.now()}-${Math.round(Math.random() * 1e9)}.${extenstion}`

      cb(null, filename)
    }
  })

  return storage
}

export default upload
