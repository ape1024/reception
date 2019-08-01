const Test = window.Test

export const waitingRooms = (trainNumber) => {
  let str = trainNumber ? `?trainNumber=${trainNumber}` : ''
  return `${Test}/waitingRoom/waitingRoomList${str}`
}
export const waitingRoom = (trainNumber, riqi, lczName) => {
  return `${Test}/waitingRoom/findLczInfo?trainNumber=${trainNumber}&riqi=${riqi}&lczName=${lczName}`
}
export const findCurrentDayZdlkInfo = (riqi) => {
  return `${Test}/waitingRoom/findCurrentDayZdlkInfo?riqi=${riqi}`
}
export const findTrainInfo = (trainNumber, riqi) => {
  return `${Test}/waitingRoom/findTrainInfo?trainNumber=${trainNumber}&riqi=${riqi}`
}
export const findZtHistoryInfo = (runId, riqi) => {
  return `${Test}/waitingRoom/findZtHistoryInfo?runId=${runId}&riqi=${riqi}`
}

export const findzdlkInfo = (trainNumber, riqi) => {
  return `${Test}/waitingRoom/findzdlkInfo?trainNumber=${trainNumber}&riqi=${riqi}`
}
export const addZdlkInfo = (cheCi, riqi, danjia, lunyi, zhongdian) => {
  return `${Test}/waitingRoom/addZdlkInfo?cheCi=${cheCi}&riqi=${riqi}&danjia=${danjia}&lunyi=${lunyi}&zhongdian=${zhongdian}`
}

export const findHistoryLateTime = (trainNumber, planId) => {
  return `${Test}/waitingRoom/findHistoryLateTime?trainNumber=${trainNumber}&planId=${planId}`
}

export const findStopOverStations = (runid) => {
  return `${Test}/travelService/findStopOverStations?runId=${runid}`
}
