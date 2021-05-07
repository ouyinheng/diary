import * as actions from './liveBroadcast/actions'
import * as mutations from './liveBroadcast/mutation'
import * as getters from './liveBroadcast/getters'
const path = require('path');
// import Iptv from '../../lib/Iptv.json'

if (process.env.NODE_ENV === "production") {
    global.__lib = path.join(__dirname, "./static");
}

const Iptv =
    process.env.NODE_ENV === "development"
        ? "static/lib/Iptv.json"
        : `${global.__lib}/lib/Iptv.json`;

export default {
  state: {
    Iptv: Iptv
  },
  actions,
  mutations,
  getters
}