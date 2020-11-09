import * as Svc from './service'

export const getBanner = ({ commit }) => {
  return Svc.getBanner().then(resp => {
    return resp;
  })
}