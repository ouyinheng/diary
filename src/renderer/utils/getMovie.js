const {ipcRenderer: ipc} = require('electron');
import axios from 'axios'
export default {
    name: 'qq',
    data() {
        return {
            list: [],
        }
    },
    computed: {
        
    },
    methods: {
        getList(keyword) {
            // https://v.qq.com/x/search/?q=%E5%BA%86%E4%BD%99%E5%B9%B4&stag=0&smartbox_ab=
            // https://so.iqiyi.com/so/q_%25E5%25BA%2586%25E4%25BD%2599%25E5%25B9%25B4?
            axios({
                method: 'get',
                url: `https://v.qq.com/x/search/?q=${keyword}`,
            }).then(res => {
                ipc.send('saveFile', keyword+'.html', res.data);
                console.log(res.data)
            })
        }
    },
    created() {
        // this.getInfo()
    }
}
