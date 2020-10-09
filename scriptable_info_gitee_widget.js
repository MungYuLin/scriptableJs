// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: red; icon-glyph: address-card;

const userName = '' // 称呼
const gitAccount = '' // Gitee地址

// 天气 https://wx.jdcloud.com/market/datas/26/11065 三选一 
const jdAppKey = '' // 打开网站申请获得
const city = '' // 城市
const cityid = '' // 城市ID
const citycode = '' // 城市编码

const family = config.widgetFamily

let widgetHello = new ListWidget(); 
var today = new Date();

// 是否开启了夜间模式 该字段属性有延迟
let mode = Device.isUsingDarkAppearance()

// 如果需要更改语言显示，请修改下面英语文字，或直接修改源码
// 这里是展示的星期和月份
var days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
var months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

// 这里是提示语
var greetingInfos = [
    '真相只有一个。'
];

// 可以在如下json中增加节假日，widget会自动匹配进行显示
var holidaysByKey = {
	// 月份,第几周,第几天: "显示文案"
	"5,2,7": "今天是母亲节哦，记得问候妈妈！",
	"6,3,7": "今天是父亲节哦，记得问候爸爸！",
	"11,4,4": "感恩节快乐！"
}

//可以在如下json中增加节假日，widget会自动匹配进行显示
var holidaysByDate = {
	// month,date: greeting
	// 月份,日期: "显示文案"
	"1,1": "Happy " + (today.getFullYear()).toString() + "!",
	"2,14": "情人节快乐！",
	"3,5": "今天是中国青年志愿者服务日！",
	"3,8": "今天是国际劳动妇女节！",
	"3,12": "今天是中国植树节！",
	"3,15": "今天是国际消费者权益日！",
	"5,1": "劳动节快乐！",
	"5,4": "青年节快乐！",
	"6,1": "儿童节到了，今天高兴嘛！😘",
	"6,25": "今天是全国土地日！",
	"7,1": "今天是中国共产党诞生！也是香港回归" + (today.getFullYear() - 1999).toString() + "纪念日！😎",
	"7,7": "今天是中国人民抗日战争纪念日！",
	"8,1": "中国人民解放军建军节！",
	"9,3": "今天是中国抗日战争胜利纪念！",
	"9,10": "今天是中国教师节！",
	"9,18": "1931年的今天日本突袭了沈阳，开始了侵华战争！😒",
	"10,1": "国庆节快乐！有出去玩吗？记得多多拍照哦~😜",
	"10,10": "1911年的今天武昌起义爆发并且在1912年初成功的推翻清朝统治，解放了中华民族思想，推动了中国社会变革！🙂",
	"10,31": "万圣节快乐！",
	"11,10": "今天是世界青年节！",
	"12,12": "1936年的今天，张学良、杨虎城在西安发动兵谏，逼迫蒋介石停止内战、一致抗日！😄",
	"12,13": "南京大屠杀死难者国家公祭日",
	"12,20": "1999年12月20日零时澳门回归，距今" + (today.getFullYear() - 1999).toString() + "周年啦！😎",
	"12,24": "今天晚上是平安夜，准备好迎接圣诞节了嘛！！！🤣",
	"12,25": "Merry Christmas! 圣诞快乐！"
}

var holidayKey = (today.getMonth() + 1).toString() + "," +  (Math.ceil(today.getDate() / 7)).toString() + "," + (today.getDay()).toString();

var holidayKeyDate = (today.getMonth() + 1).toString() + "," + (today.getDate()).toString();

// Date Calculations
var weekday = days[today.getDay()];
var month = months[today.getMonth()];
var year = today.getFullYear();
var day = today.getDate();
var hour = today.getHours();

// Support for multiple greetings per time period
function randomGreeting(greetingArray) {
	return Math.floor(Math.random() * greetingArray.length);
}

var howdy = ''
if (hour < 5 && hour >= 0) { // 0am - 5am
    howdy = '好了，离秃头更进一步了~~~我要疯了！'
} else if (hour < 12) { // 5am - 12pm 早上好
    howdy = '早上好'
} else if (hour >= 12 && hour <= 17) { // 12pm - 5pm 下午好
    howdy = '下午好'
} else if (hour > 17 && hour < 21) { // 5pm - 10pm 晚上好
    howdy = '晚上好'
} else if (hour >= 21 || hour < 0) { // 10pm - 0am
    howdy = '到点了，给我滚去睡觉啊~~~🐷头要秃啦！'
}
var greeting = greetingInfos[randomGreeting(greetingInfos)]

// Overwrite greeting if calculated holiday
if (holidaysByKey[holidayKey]) {
	greeting = holidaysByKey[holidayKey];
}

// Overwrite all greetings if specific holiday
if (holidaysByDate[holidayKeyDate]) {
	greeting = holidaysByDate[holidayKeyDate];
}

/* --------------- */
/* Assemble Widget */
/* --------------- */
widgetHello.setPadding(15, 20, 20, 15)
widgetHello.spacing = 8

const header = widgetHello.addText(greeting)
header.textColor = new Color("#723fd2")
header.font = new Font('Menlo', 14)

const line1 = widgetHello.addText(`[👩‍💻] ${userName}，${howdy}`)
line1.textColor = new Color("#3f56d2")
line1.font = new Font('Menlo', 11)

const lunarData = await getLunarData()
const line2 = widgetHello.addText(`[📆] ${year}年，${month}月${day}日，${weekday}，${lunarData}`)
line2.textColor = new Color("#3f87d2")
line2.font = new Font('Menlo', 11)

const weatherData = await getWeatherJindong()
const line3 = widgetHello.addText(`[⛅️] ${weatherData}`)
line3.textColor = new Color("#3fb8d2")
line3.font = new Font('Menlo', 11)

const line4 = widgetHello.addText(`[⚡️] ${renderBattery()} ${Device.isCharging() ? '充电中' : '电量'}`)
line4.textColor = new Color("#3fd272")
line4.font = new Font('Menlo', 11)

const line5 = widgetHello.addText(`[⏳] ${renderYearProgress()} 今年进度`)
line5.textColor = new Color('#d2723f')
line5.font = new Font('Menlo', 11)

// Gitee
if (family == 'large') {
    const line6 = widgetHello.addText('[💻] Working')
    line6.textColor = new Color('#d2413f')
    line6.font = new Font('Menlo', 11)

    const bg_color = {
        'less': '#ebedf0',
        'little': '#9be9a8',
        'some': '#40c463',
        'many': '#30a14e',
        'much': '#216e39',
    }

    const gitData = await getGiteeData()
    const rect = "■ "
    let l1 = widgetHello.addStack()
    let l2 = widgetHello.addStack()
    let l3 = widgetHello.addStack()
    let l4 = widgetHello.addStack()
    let l5 = widgetHello.addStack()
    let l6 = widgetHello.addStack()
    let l7 = widgetHello.addStack()
    let ls = [l1, l2, l3, l4, l5, l6, l7]

    for (let [i, l] of ls.entries()) {
        // 设置水平放置
        l.layoutHorizontally()
        let t = l.addText(" " + days[i] + "   ")
        t.font = Font.regularSystemFont(12)
        t.textColor = new Color('#b3b3b3')
    }

    // 填充每一个小绿块
    for (let [i, day] of gitData.entries()) {
        let color = day[1]
        let date = new Date(gitData[i][3])
        let t = ls[date.getDay()].addText(rect)
        t.textColor = new Color(bg_color[color], 1)
        t.font = Font.regularSystemFont(12)
    }
    for (let index = today.getDay() + 1; index < 7; index++) {
        let t = ls[index].addText(rect)
        t.font = Font.regularSystemFont(12)
        if (mode) t.textColor = Color.black()
        else t.textColor = Color.white()
    }

    // 设置小组件尾部
    const footer = widgetHello.addText(formatDate(new Date(), "更新于 yyyy-MM-dd HH:mm"))
    footer.rightAlignText()
    footer.font = Font.mediumSystemFont(8)
    footer.textColor = new Color('#cccccc')
}

if (!config.runsInWidget) {
    if (family == 'large') await widgetHello.presentLarge()
    else await widgetHello.presentMedium()
} else {
    if (mode) widgetHello.backgroundColor = Color.black()
    else widgetHello.backgroundColor = Color.white()
    Script.setWidget(widgetHello)
    Script.complete()
}

// 农历
async function getLunarData() {
    const url = 'https://api.xlongwei.com/service/datetime/convert.json'
    const request = new Request(url)
    const res = await request.loadJSON()
    return `${res.ganzhi}年（${res.shengxiao}）${res.chinese.replace(/.*年/, '')}`
}

// 天气
async function getWeatherJindong(){
    const request = new Request(`https://way.jd.com/jisuapi/weather?city=${city}&cityid=${cityid}&citycode=${citycode}&appkey=${jdAppKey}`)
    const res = await request.loadJSON()
    const result = res.result.result
    return `${result.city}，${result.weather}，温度:${result.temp}°，${result.winddirect}，${result.windpower}`
}

// Gitee
async function getGiteeData() {
    const regex = /<div class=\\'box (less|little|some|many|much)\\' data-content=\\'(\d{0,3})个贡献：(\d{4}-\d{2}-\d{2})\\' date=\\'(\d{4}\d{2}\d{2})\\'>/g
    let url = 'https://gitee.com/' + gitAccount + '/contribution_calendar?year=';
    let url1 = 'https://gitee.com/' + gitAccount + '/contributions'
    let request = new Request(url)
    let res = await request.loadString()
    if (res === "Not Found") {
        request = new Request(url1)
        res = await request.loadString()
    }
    let array = [...res.matchAll(regex)].slice(-140 + 6 - today.getDay())
    return array
}

// 进度条
function renderProgress(progress) {
    const used = '▓'.repeat(Math.floor(progress * 24))
    const left = '░'.repeat(24 - used.length)
    return `${used}${left} ${Math.floor(progress * 100)}%`
}

// 电池
function renderBattery() {
    const batteryLevel = Device.batteryLevel()
    return renderProgress(batteryLevel)
}

// 今年
function renderYearProgress() {
    const now = new Date()
    const start = new Date(now.getFullYear(), 0, 1) // Start of this year
    const end = new Date(now.getFullYear() + 1, 0, 1) // End of this year
    const progress = (now - start) / (end - start)
    return renderProgress(progress)
}

// 日期转换
function formatDate(date, formatStr) {
    let formatter = new DateFormatter()
    formatter.dateFormat = formatStr
    let forDate = formatter.string(date)
    return forDate
}
