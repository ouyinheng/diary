<template>
    <div class="apply">
        <section class="section">
            <div class="apply-left">

            </div>
            <div class="apply-right"></div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'apply',
    data() {
        return {
            reqUrlList: [
                'https://v.qq.com/'
            ]
        }
    },
    methods: {
        getVideoPageSourth() {
            this.$http({
                method: 'get',
                url: 'https://v.qq.com/',
                cookie: 'RK=vfYlEHF2ko; ptcz=1398ef06a3ad5d73dad70a44cd13aa337e748f1b7b03b074095cc06197f4ece2; pgv_pvid=1742593842; eas_sid=w1D6B0Z133j4x7T1m1k653d3D8; pgv_pvi=8001440768; LW_uid=v126N0L2O5f62216T8O610j6T4; LW_sid=j1j6b093X188y352I8S4q6t0a7; tvfe_boss_uuid=669044180f9b4594; o_cookie=2675379992; ts_uid=6105085975; tvfe_search_uid=a4b6f9d5-06f1-4fc8-9826-2f3d0abe1b0c; pac_uid=1_2675379992; video_guid=595e975b695eb83e; video_platform=2; login_remember=qq; main_login=qq; vqq_openid=0EFCB85F3ADE893B99CBE5F632850F1C; vqq_vuserid=182319303; vqq_appid=101483052; txv_boss_uuid=a38b36bf-fb9a-b21c-06be-8fafa1c94849; qq_head=http://thirdqq.qlogo.cn/g?b=oidb&k=SvJWyibiaa8SOQPrtajlibP0w&s=640&t=1556996338; qq_nick=%E9%AA%91%E9%A9%AC%E5%80%9A%E6%96%9C%E6%A1%A5; vqq_access_token=8F337E292F7908BB6BDD28A8CB3382FF; bucket_id=9231008; ied_qq=o2675379992; ts_refer=www.yy8844.cn/; uin=o2675379992; skey=@YgffqTbu8; uid=91614016; pgv_info=ssid=s9808652168; vqq_vusession=kST3avEG7RcQ0575fvpJpQ..; ptag=; ts_last=v.qq.com/; qv_als=iSObzAz9Z7rs19e6A11618906655VgqUOQ==; ad_play_index=32sec-ch-ua: "Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"'
            }).then(res => {
                console.log(res)
                const htmlData = res.data;
            })
        }
    },
    created() {
        this.getVideoPageSourth();
    }
}
</script>

<style lang="scss" scoped>
.apply {
    width: 100vw;
    height: 100vh;
    padding-top: 6vh;
    color: black;
    .section {
        width: 100%;
        height: 100%;
        display: flex;
    }
    &-left {
        width: 20vw;
        height: 100%;
        overflow: auto;
        background-color: #ccc;
    }
    &-right {
        width: 80vw;
        height: 100%;
    }
}
</style>