import { get } from 'axios'

const convertEndTimeToDate = lot => Object.assign(lot, { endTime: new Date(lot.endTime) })

/**
 * @returns Promise<Lot>
 */
export const getLotById = lotId =>
      get(`/api/lots/${lotId}`)
      .then(({ data }) => convertEndTimeToDate(data))
