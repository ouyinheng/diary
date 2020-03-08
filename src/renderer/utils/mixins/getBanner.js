const {ipcRenderer: ipc} = require('electron');
export default {
	name: 'banner',
	data() {
		return {

		}
	},
	methods: {
		getBanner() {
			this.$http.get('https://v.qq.com/').then(res => {
				ipc.send('saveFile', 'keyword', res.data);
				this.parseHtml(res.data)
			})
		},
		parseHtml(html) {
			let div = document.createElement('div');
            div.innerHTML = html;
			let list =  div.querySelectorAll('.slider_nav._quicklink a');
			let bannerList = []
			Array.from(list).forEach(div => {
				let item = document.createElement('div');
                item.appendChild(div)
				let info = {};
				if(item.firstChild.getAttribute('class').trim().split(' ').length==1) {
					info = {
						href: item.firstChild.getAttribute('href'),
						title: item.firstChild.querySelector('.title_text').innerText,
						picUrl: item.firstChild.getAttribute('data-bgimage')
					}
					bannerList.push(info)
				}
			})
			this.banner = bannerList
		}
	},
	created() {
		this.getBanner();
	}
}
