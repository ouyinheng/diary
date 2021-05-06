const {ipcRenderer: ipc} = require('electron');
import axios from 'axios';
export default {
    init(title) {
        this.getHtmlAndParse(title)
    },
    getHtmlAndParse(title) {
        axios({
            method: 'get',
            url: `https://v.qq.com/x/search/?q=${encodeURIComponent(title)}&stag=0&smartbox_ab=`,
            headers: {
                referer: `https://v.qq.com/x/search/?q=${encodeURIComponent(title)}&stag=0&smartbox_ab=`,
                accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
            }
            // 
        }).then(res => {
            console.log(res)
            ipc.send('saveFile', title, res.data);
        })
    }
}