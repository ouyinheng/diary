<template>
    <div class="biquge-box">
        <section class="book_content"></section>
        <footer class="footer_page_chapter" @click="disposeChild"></footer>
    </div>
</template>

<script>
import { mapGetters , mapActions, mapMutations } from 'vuex'
export default {
    name: 'readBook',
    data() {
        return {
            url: ''
        }
    },
    computed: {
        ...mapGetters([
            'getTest', 'getChapterList', 'getBookId'
        ])
    },
    methods: {
        getContent(url) {
            this.$http.get('http://www.shuquge.com/txt/'+ url).then(res => {
                let div = document.createElement('div');
                div.innerHTML = res.data;
                const content_ele = div.querySelector('#content');
                document.querySelector('.book_content').innerHTML = '';
                document.querySelector('.book_content').append(content_ele)
                document.querySelector('.footer_page_chapter').innerHTML = '';
                const page_chapter = div.querySelector('.page_chapter');
                document.querySelector('.footer_page_chapter').append(page_chapter)
            })
        },
        disposeChild(e) {
            e.stopPropagation();
            e.preventDefault();
            const a_ele = e.target;
            if(a_ele.innerText === '返回目录') {
                this.$router.back();
            } else {
                const url = this.getBookId + '/' + a_ele.getAttribute('href');
                this.getContent(url)
            }
        }
    },
    created() {
        this.url = this.$route.query.url;
        this.getContent(this.url);
    }
}
</script>

<style lang="scss">
.biquge-box {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    .book_content {
        width: 100%;
        height: calc(100% - 50px);
        overflow: auto;
    }
    
    .footer_page_chapter {
        ul {
            display: flex;
            align-items: center;
            justify-content: space-around;
            li {
                margin: 0 10px;
            }
        }
    }
}
</style>