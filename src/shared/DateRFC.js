const data = new Date()
const formatData = data.toISOString().split('')
formatData.splice(22, 1)
const dataRFC = formatData.join('')

const oneDay = new Date()
const dia1 = oneDay.getDate() - 1
oneDay.setDate(dia1)
const oldDay = oneDay.toISOString().split('')
oldDay.splice(22, 1)
const beforeDay = oldDay.join('')

module.exports = { beforeDay, dataRFC }
