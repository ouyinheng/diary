import * as actions from './home/actions'
import * as mutations from './home/mutation'
import * as getters from './home/getters'


export default {
    state: {
        bannerList: [],
        recommList: [],
        loading: false,
        sites: ['sites'],
        TypeList: [],
        playMovieUrl: '',
        teleplayList: [], // 电视剧
    },
    actions,
    mutations,
    getters
}