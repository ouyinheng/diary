import * as Svc from './service'

export const getBanner = ({ commit }) => {
  return Svc.getBanner().then(resp => {
    return resp;
  })
}

export const getHomePageResourth = ({commit}) => {
  return Svc.getHomePageResourth().then(resp => {
    return resp;
  })
}