const request = require('request-promise')
const cheerio = require('cheerio')
const fs = require('fs')
const json2csv = require('json2csv').Parser

const s_data_url = "https://en.m.wikipedia.org/wiki/S";

(async () => {
    let s_data = []
    const response = await request({
        uri: s_data_url,
        headers: {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9"
        },
        gzip: true
    })

    let $ = cheerio.load(response)
    let history_origin_1 = $("#mw-content-text > div.mw-parser-output > p:nth-child(21)").text()
    let history_origin_2 = $("#mw-content-text > div.mw-parser-output > p:nth-child(22)").text()
    let history_origin_3 = $("#mw-content-text > div.mw-parser-output > p:nth-child(23)").text()
    let history_origin_4 = $("#mw-content-text > div.mw-parser-output > p:nth-child(24)").text()
    let history_origin_5 = $("#mw-content-text > div.mw-parser-output > p:nth-child(25)").text()

    let longs_1 = $('#mw-content-text > div.mw-parser-output > p:nth-child(30)').text()
    let longs_2 = $('#mw-content-text > div.mw-parser-output > p:nth-child(31)').text()
    let longs_3 = $('#mw-content-text > div.mw-parser-output > p:nth-child(32)').text()

    let use_in_writing_system_1 = $('#mw-content-text > div.mw-parser-output > p:nth-child(34)').text()
    let use_in_writing_system_2 = $('#mw-content-text > div.mw-parser-output > p:nth-child(35)').text()
    let use_in_writing_system_3 = $('#mw-content-text > div.mw-parser-output > p:nth-child(36)').text()
    let use_in_writing_system_4 = $('#mw-content-text > div.mw-parser-output > p:nth-child(37)').text()

    s_data.push({
        history_origin_1,
        history_origin_2,
        history_origin_3,
        history_origin_4,
        history_origin_5,
        longs_1,
        longs_2,
        longs_3, use_in_writing_system_1,
        use_in_writing_system_2,
        use_in_writing_system_3,
        use_in_writing_system_4
    })
    const j2cp = new json2csv()
    const csv = j2cp.parse(s_data)

    fs.writeFileSync("./sdata.csv", csv, "utf-8")
})()

