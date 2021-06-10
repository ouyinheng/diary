export default {
    name: 'rrParse',
    data() {
        return {
            playRRListInfo: null
        }
    },
    methods: {
        getList(id) {
            // https://content.json.rr.tv/morpheus/detail/14428?6-8-10xx
            this.$http.get(`https://content.json.rr.tv/morpheus/detail/${id}`).then(res => {
                if(res.data.error === 'ok') {
                    this.playRRListInfo = res.data.result
                }
            })
        },
        parseUrl(url) {
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