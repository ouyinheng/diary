import axios from 'axios'
export default {
    name: '88',
    data() {
        return {
            bbSourth: [],
            url: 'http://www.88zyw.net/index.php'
        }
    },
    methods: {
        async get88List(title) {
            await axios({
                url: 'http://www.88zyw.net/index.php?m=vod-search',
                method: 'post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                params: {
                    wd: '将夜',
                    submit: 'search'
                }
            }).then(async res => {
                const item = await document.createElement('div');
                item.innerHTML = await res.data.split('<body>')[1].split('</body>')[0];
                let sourth = await item.querySelectorAll('.xing_vb ul:not(:first-child)');
                await sourth.forEach(async (item, index) => {
                    if(index+1==sourth.length)return;
                    let list = [];
                    const movieInfo = {
                        name: item.querySelector('.xing_vb4').innerText,
                        href: item.querySelector('.xing_vb4 a').getAttribute('href'),
                        type: item.querySelector('.xing_vb5').innerText,
                        updateTime: item.querySelector('.xing_vb6').innerText,
                        list
                    }
                    await axios({
                        url: `http://www.88zyw.net${movieInfo.href}`,
                        method: 'get'
                    }).then(async resp => {
                        const itemChild = await document.createElement('div');
                        itemChild.innerHTML = await resp.data.split('<body>')[1].split('</body>')[0];
                        let sourthList = await itemChild.querySelectorAll('.vodplayinfo ul');
                        await sourthList.forEach(async ele => {
                            let childList = [];
                            await ele.querySelectorAll('li').forEach(li => {
                                childList.push({
                                    url: 'http' + li.innerText.split('http')[1],
                                    name: li.innerText.split('http')[0]
                                })
                            })
                            await list.push(childList)
                        })
                    })
                    await this.bbSourth.push(movieInfo)
                })
                await console.log('bbSourth', this.bbSourth)
            })
        }
    }
}