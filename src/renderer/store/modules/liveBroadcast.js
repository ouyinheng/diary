import * as actions from './liveBroadcast/actions'
import * as mutations from './liveBroadcast/mutation'
import * as getters from './liveBroadcast/getters'
const path = require('path');
// import Iptv from '../../lib/Iptv.json'

if (process.env.NODE_ENV === "production") {
    global.__lib = path.join(__dirname, "./static");
}
import dbOption from "../../../main/src/sql/getAllOption.js";
const Iptv =
    process.env.NODE_ENV === "development"
        ? "Iptv.json"
        : `${global.__lib}/lib/Iptv.json`;
    dbOption.init(Iptv)
    let Iptvs = [];
    dbOption.getData((db) => {
        Iptvs = db.get("posts").value()
    });

export default {
  state: {
    Iptv: Iptvs
  },
  actions,
  mutations,
  getters
}