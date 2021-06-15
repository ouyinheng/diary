export default {
    name: 'rrParse',
    data() {
        return {
        }
    },
    methods: {
        getList(id) {
            // https://content.json.rr.tv/morpheus/detail/14428?6-8-10xx
            console.log('...')
            this.$http.get(`https://content.json.rr.tv/morpheus/detail/${id}`).then(res => {
                if(res.data.error === 'ok') {
                    this.obj = {
                        name: 'episodeNo',
                        hrefKey: 'key'
                    }
                    this.playListInfo = res.data.result
                }
            })
        },
        parseUrl(url) {
            if(this.playListInfo.laiyuan === '爱奇艺') {
                let src = url;
                if(src && !src.includes('https:')) {
                    src = 'http:' + url
                }
                this.setPlayMovieUrl(src);
                this.setVideoType('webview')
                this.setClosePlay(false);
                this.setShowTheMovieBox(true)
            } else if(!this.playListInfo.laiyuan) {
                // https://web-api.rr.tv/watch/morpheus/v1/cdn/parser?6-8-10xx
                this.$http.post(`https://web-api.rr.tv/watch/morpheus/v1/cdn/parser`, {
                    keyNames: [url]
                }).then(res => {
                    console.log('res', res)
                    
                    if(res.data.error === 'ok') {
                        this.setPlayMovieUrl(res.data.result.parserUrls[0]);
                        this.setVideoType('html')
                        this.setClosePlay(false);
                        this.setShowTheMovieBox(true)
                    }
                })
            }
            
            
        }
    }
}