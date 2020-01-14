function jsonParse (str) {
    str = str.replace(/\s+/g, '');
    str = str.replace(/\"+/g, '');
    str = str.replace(/\'+/g, '');
    str = str.substr(1, str.length -1);
    var arr = str.split(',');
    var result = {}, temp;
    for (var i = 0, len = arr.length; i < len; i++) {
        temp = arr[i].split(':');
        result[temp[0]] = temp[1];
    }
    return result;
}
function formatParams (para) {
    var result = [];
    var vi = para && para.vl && para.vl.vi || [];
    for (var i = 0, len = vi.length; i < len; i ++) {
        var fileName = vi[i].fn;
        var fvkey = vi[i].fvkey;
        var ui = vi[i].ul.ui;
        for (var j = 0; j < ui.length; j++) {
            result.push(ui[j].url + fileName + '?vkey=' + fvkey + '&sdtfrom=v1103');
        }
    }
    return result;
} 
let body = fs.readFileSync('./log/html/qq.html').toString();
// await oxios.default.get(`https://v.qq.com/x/cover/mzc00200bqxuhqe.html`).then(res=>{
var videoInfoReg = /VIDEO_INFO = ({[^}]*})/;
var listInfoReg = /LIST_INFO = ({[^}]*})/;
var videoMatch = body.match(videoInfoReg) && body.match(videoInfoReg)[1] || '{}';
var listMatch = body.match(listInfoReg) && body.match(listInfoReg)[1] || '{}';
var videoInfo = JSON.parse(videoMatch.trim()) || {};
var listInfo = JSON.parse(listMatch+'}'.trim()) || {};
var params = {
    'isHLS': false,
    'charge': 0,
    'vid': videoInfo.vid,
    'defaultfmt': 'auto',
    'defn': 'shd',
    'defnpayver': 1,
    'otype': 'json',
    'platform': 11001,
    'sdtfrom': 'v1103',
    'host': 'v.qq.com'
};
var baseUrl = 'http://h5vv.video.qq.com/getinfo?callback=formatParams&';
var paramsArr = [];
for (var key in params) {
    paramsArr.push('' + key + '=' + params[key]);
}
var paramsStr = paramsArr.join('&');
await oxios.default.get(baseUrl + paramsStr).then(res=>{
// request.get(baseUrl + paramsStr, {contentType: 'json'}, function (error, response, body) {
    var urlList = eval(res);
    // callback(null, urlList);
    ctx.body = {
        res: 0, 
        result: urlList,
        message: '请求成功' 
    }
    // 
});
