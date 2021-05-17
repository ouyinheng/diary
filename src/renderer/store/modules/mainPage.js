import * as actions from './mainPage/actions'
import * as mutations from './mainPage/mutation'
import * as getters from './mainPage/getters'


export default {
    state: {
        playMovieUrl: '',
        closePlay: true, 
        qqList: [], // 腾讯
        ykList: [], // 优酷
        searchKeyWord: '',
        selectSourch: '腾讯', // 选择的搜索源
        videoType: 'webview'
    },
    actions,
    mutations,
    getters
}