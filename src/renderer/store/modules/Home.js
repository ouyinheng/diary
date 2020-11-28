import * as actions from './home/actions'
import * as mutations from './home/mutation'
import * as getters from './home/getters'
import {sites} from '../../lib/sites'
export default {
  state: {
    recommList: [],
    loading: false,
    sites: ['sites']
  },
  actions,
  mutations,
  getters
}