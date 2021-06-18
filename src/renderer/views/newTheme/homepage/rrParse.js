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
        getMoreList() {
            this.$http.get(`https://s.video.qq.com/get_playsource?id=${this.playListInfo.id}&plat=2&type=4&range=0-1&data_type=2&video_type=2&plname=qq&otype=json&callback=getMoreList&_t=${new Date().getTime()}`).then(res => {
				let result = JSON.parse(res.data.substring(12, res.data.length-1));
				// console.log(item, result)
				this.playListInfo.episodes = result.PlaylistItem.videoPlayList.map(row => {
					return {
						title: row.title,
						url: row.playUrl,
						type: row.type
					}
				})
                this.playListInfo.episodes.splice(0, 0)
			})
        },
        parseUrl(url, name='') {
            if(this.playListInfo.laiyuan === '爱奇艺') {
                let src = url;
                if(src && !src.includes('https:')) {
                    src = 'http:' + url
                }
                this.setPlayMovieUrl(src);
                this.setVideoType('webview')
                this.setClosePlay(false);
                this.setShowTheMovieBox(true)
            } else if(this.playListInfo.laiyuan === '腾讯') {
                console.log('this.playListInfo', this.playListInfo)
                if(name === '...') {
                    this.getMoreList()
                } else {
                    let src = url;
                    if(src && !src.includes('https:')) {
                        src = 'http:' + url
                    }
                    this.setPlayMovieUrl(src);
                    this.setVideoType('webview')
                    this.setClosePlay(false);
                    this.setShowTheMovieBox(true)
                }
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