let xlsx = require('node-xlsx');
// let fs = require('fs');
const exportXlsx = async (ctx, next) => {

    let data = ctx.request.body; // { series, categories }

    // invalid json
    if (Object.keys(data).length === 0) {
        ctx.body = {
            err: 1,
            message: 'invalid json'
        };
        ctx.type = 'application/json;charset=utf-8';
        return;
    }

    // generate file
    let filename = `${data.title}.xlsx` || '表格.xlsx';
    let arr = [];
    arr[0] = JSON.parse(data.categories);
    for (const row of JSON.parse(data.series)) {
        arr.push([row.name].concat(row.data));
    }
    let buffer = xlsx.build([{ name: 'sheet', data: arr }]);
    ctx.body = buffer;
    ctx.response.attachment(filename);
    ctx.type = 'xlsx';
};

module.exports = {
    'POST /exportXlsx': exportXlsx,
};