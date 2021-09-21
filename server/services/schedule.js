const schedule = require('../models/schedule')
const db = require('./db/schedule')

// Create Schedule Resource [create]
exports.createSchedule = async (body) => {
  const attr = {
    designer_id: body.designer_id,
    matching_id: body.matching_id ? body.matching_id : null,
    schedule_type: body.schedule_type,
    time: body.time,
  }
  const schedule = await db.createSchedule(attr)
  if (schedule) {
    return schedule.dataValues
  } else {
    return null
  }
}

// Read Schedule Resource [findOne, findAll]
exports.findAllSchedule = async () => {
  let scheduleList = await db.findAllSchedule()
  if (scheduleList && scheduleList.length > 0) {
    return scheduleList
  } else {
    return null
  }
}
exports.findAllScheduleByDesignerId = async (id) => {
  let scheduleList = await db.findAllScheduleByDesignerId(id)
  if (scheduleList && scheduleList.length > 0) {
    return scheduleInfoList
  } else {
    return null
  }
}

// Update Schedule Resource [update]
exports.updateSchedule = async (id, body) => {
  const attr = body
  const schedule = await db.updateSchedule(id, attr)
  if (schedule) {
    return schedule
  } else {
    return null
  }
}

// Delete Schedule Resoure [destroy]
exports.destroySchedule = async (id) => {
  const schedule = await db.destroySchedule(id)
  if (schedule) {
    return schedule
  } else {
    return null
  }
}
