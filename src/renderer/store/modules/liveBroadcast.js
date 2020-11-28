import * as actions from './liveBroadcast/actions'
import * as mutations from './liveBroadcast/mutation'
import * as getters from './liveBroadcast/getters'
import Iptv from '../../lib/Iptv.json'
export default {
  state: {
    Iptv: Iptv
  },
  actions,
  mutations,
  getters
}