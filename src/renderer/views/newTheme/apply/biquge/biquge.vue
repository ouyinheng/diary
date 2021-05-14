<template>
    <div class="biquge-box">
        <header class="biquge-header">
            <h2 style="text-align: center">微信读书</h2>
            <input v-model="searchValue" id="biquge-input" :class="{'focus-input': showSearch}" maxlength="40" @focus="showSearchHandler" @input="getComplete" @keyup.enter="toSearchHandler"/>
            <i class="biquge-close el-icon-circle-close" v-if="showSearch" @click="showSearch=false"></i>
            <div class="biquge-suggest" v-if="showSearch&&suggestList.length>0">
                <ul>
                    <li v-for="(item, index) in suggestList" :key="index" @click="searchHandler(item)">{{item.word}}</li>
                </ul>
            </div>
            <div class="biquge-suggest" v-if="showSearch&&bookList.length > 0">
                <ul>
                    <li v-for="(item, index) in bookList" :key="index" @click="setSectionContet(item)">{{item.title}}---{{item.author}}</li>
                </ul>
            </div>
        </header>
        <section class="biquge-section" @click="disposeChild">

        </section>
        <div class="modal" v-if="showSearch">

        </div>
        <el-backtop target=".biquge-box"></el-backtop>
    </div>
</template>

<script>
import { mapGetters , mapActions, mapMutations } from 'vuex'
const {ipcRenderer: ipc} = require('electron');

export default {
    name: 'biquge',
    data: () => ({
        searchValue: '',
        showSearch: false,
        suggestList: [],
        bookList: []
    }),
    computed: {
        ...mapGetters([
            'getTest', 'getChapterList', 'getBookId'
        ])
    },
    methods: {
        ...mapActions([
            
        ]),
        ...mapMutations([
            'setChapterList', 'setBookId'
        ]),
        showSearchHandler() {
            this.showSearch = true;
        },
        searchHandler(item) {
            this.searchValue = item.word;
            this.suggestList = [];
            this.toSearchHandler();
        },
        // 获取补全提示
        // https://weread.qq.com/web/search/search_suggest?keyword=%E5%89%91&count=40
        getComplete() {
            this.$http.get(`https://weread.qq.com/web/search/search_suggest?keyword=${this.searchValue}&count=8`).then(res => {
                console.log(res)
                this.suggestList = res.data.records
            })
        },
        // 获取搜索内容
        toSearchHandler() {
            this.$http.post(`http://www.shuquge.com/search.php?searchkey=${this.searchValue}`, {
                searchkey: this.searchValue
            }).then(res => {
                console.log(res)
                this.parseHtml(res.data)
            })
        },
        parseHtml(html) {
			let div = document.createElement('div');
            div.innerHTML = html;
			let list =  div.querySelectorAll('.bookbox .bookinfo');
			let bookList = []
			Array.from(list).forEach(div => {
				let item = document.createElement('div');
                item.appendChild(div)
				let info = {};
				// if(item.firstChild.getAttribute('class').trim().split(' ').length==1) {
                info = {
                    title: item.firstChild.firstChild.innerText,
                    author: item.querySelector('.author').innerText,
                    cat: item.querySelector('.cat').innerText,
                    update: item.querySelector('.update a').innerText,
                    link: item.querySelector('.bookinfo .bookname a').getAttribute('href')
                }
                bookList.push(info)
				// }
			})
			this.bookList = bookList
		},
        setSectionContet(item) {
            
            this.showSearch = false;
            this.setBookId(item.link.split('/txt/')[1].split('/index.html')[0]);
            this.$http.get('http://www.shuquge.com/'+item.link).then(res => {
                // console.log(res)
                let htmlText = res.data.split('<body>')[1].split('</body>')[0];
                // ipc.send('saveFile', 'keyword.html', res.data);
                let ele = document.createElement('div');
                ele.innerHTML = htmlText;
                console.log(ele.querySelector('.listmain'))
                const contentBody = ele.querySelector('.listmain');
                this.setChapterList(contentBody)
                this.appendChapter();
            })
        },
        appendChapter() {
            let chapterBox = document.querySelector('.biquge-section');
            if(this.getChapterList) {
                try {
                    chapterBox.appendChild(this.getChapterList)
                } catch (error) {
                    
                }
            }
            
        },
        disposeChild(e) {
            e.stopPropagation();
            e.preventDefault();
            console.log(e.target);
            const a_ele = e.target;
            const url = 'http://www.shuquge.com/' + this.getBookId + '/' + a_ele.getAttribute('href');
            this.$router.push({
                path: '/readBook',
                query: {
                    url: this.getBookId + '/' + a_ele.getAttribute('href')
                }
            })
            // this.getContent(url)
        }
    },
    mounted() {
        // console.log('getChapterList', this.getChapterList)
        this.appendChapter();
    }
}
</script>
<style lang="scss">
.listmain {
    dl {
        display: flex;
        flex-wrap: wrap;
        dd {
            padding: 5px 10px;
            width: 200px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
        dt {
            width: 100%;
            margin: 5px 0;
            font-weight: 500;
            font-size: 18px;
        }
    }
}
.el-backtop {
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.5) !important;
}
</style>
<style lang="scss" scoped>
.biquge-box {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: auto;
    .biquge-header {
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        padding: 50px 0;
        #biquge-input {
            width: 60%;
            height: 30px;
            padding: 10px 20px;
            box-sizing: content-box;
            border: 1px solid gainsboro;
            border-radius: 30px;
            outline: none;
            margin: 0 auto;
        }
        .focus-input {
            position: absolute;
            top: 120px;
            left: 50%;
            right: 50%;
            transform: translate(-50%, 0);
            z-index: 11;
        }
        .biquge-close {
            position: absolute;
            right: 20px;
            top: 20px;
            color: white;
            font-size: 20px;
            cursor: pointer;
            z-index: 11;
            &:hover {
                color: #409EFF;
            }
        }
        .biquge-suggest {
            position: absolute;
            top: 180px;
            left: 50%;
            right: 50%;
            transform: translate(-50%, 0);
            width: 60%;
            min-height: 100px;
            border-radius: 10px;
            background-color: white;
            z-index: 11;
            ul {
                padding-left: 0;
                padding-right: 0;
            }
            li {
                cursor: pointer;
                height: 40px;
                line-height: 40px;
                padding: 0 24px;
                font-size: 15px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                word-break: break-all;
                word-wrap: normal;
                &:hover {
                    background: linear-gradient(90deg, #ff8882, transparent);
                    color: #eef0f4;
                }
            }
        }
    }
    .modal {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, .6);
        z-index: 10;
    }
}
</style>