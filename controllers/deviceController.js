import { v4 } from 'uuid'
import path from 'path'

import { Device, DeviceInfo } from '../models/models.js'
import { ApiError } from '../error/ApiError.js'
import { __dirname } from '../consts/__driname.js'


class DeviceController {
  async create(req, res, next) {
    try {
      const { name, price, brandId, typeId, info } = req.body
      const { img } = req.files
  
      let filename = v4() + '.jpg'
      img.mv(path.resolve(__dirname, '..', 'static', filename))
      
      const device = await Device.create({ name, price, brandId, typeId, img: filename })

      if (info) {
        info = JSON.parse(info)
        info.forEach(i => {
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id
          })
        })
      }

      return res.json(device)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
    
  }

  async getAll(req, res) {
    const { brandId, typeId, limit = 10, page = 1 } = req.query
    const offset = page * limit - limit
    let devices = null

    if (!brandId && !typeId) {
      devices = await Device.findAndCountAll({ limit, offset })
    }

    if (brandId && !typeId) {
      devices = await Device.findAndCountAll({ where: { brandId }, limit, offset })
    }

    if (!brandId && typeId) {
      devices = await Device.findAndCountAll({ where: { typeId }, limit, offset })
    }

    if (brandId && typeId) {
      devices = await Device.findAndCountAll({ where: { brandId, typeId }, limit, offset })
    }

    return res.json(devices)
  }

  async getOne(req, res) {
    const { id } = req.params
    
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: 'info' }]
    })

    return res.json(device)
  }
}

export default new DeviceController()