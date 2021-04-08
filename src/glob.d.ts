// 公共的ts文件存储
declare module 'md5'{
    export default function md5(val:string):string
}

declare module 'vuedraggable'{
    const draggable:any;
    // export default draggable;
}

declare module 'echarts' {
    const echarts:any;
    export default echarts;
}

//结果表展示表
interface SRtable{
    tableId: string
    modelId: string
    modelNo: string
    cnName: string
    enName: string
    createDate: string
    memo: string
}
// 表的 表头属性描述信息
interface TableField{
    currentPage: number
    dictId: string
    fieldChineseName: string
    fieldDesc: string
    fieldEnglishName: string
    fieldId: string
    fieldOrder: number
    fieldPrecision: number
    fieldScale: number
    fieldType: string
    nullability: number
    pageSize: number
    tableChineseName: string
    tableEnglishName: string
}
// 表头  模型 设置表格中的表头信息
interface SetTableField extends TableField{
    showName:string// 显示名称
}

// 配置echarts 的pop form对象。
interface PopSettingChart{
    stEnName: string// 展示表的英文名字
    stCnName: string // 展示表的中文名字
    stId: string // 展示表的id
    rtCnName:string//结果表的中文名字
    rtEnName:string//结果表的英文名字
    rtId: string // 结果表的id
    chartType: string
    theme: string
    chartTitle: string
    primaryYTitle: string
    secondaryYTitle: string
    legendTitle: string
    chartNumType: string // 逗号分割， 代表line or bar这种混图
    nameCol: string // 名称数据列名称
    valueCol: string // 取值数据列名称
}

interface FePopSettingChart extends PopSettingChart{
    hotfix_nameCol:string//名称数据列名称
    hotfix_valueCol:string//取值数据列名称
    feNameCol:{
        feId:string,
        fieldChineseName: string,
        fieldEnglishName: string
    }[],
    feValueCol: {
        feId: string,
        fieldChineseName: string,
        fieldEnglishName: string
    }[]
    feLegendTitle: {
        feId: string,
        fieldChineseName: string,
        fieldEnglishName: string
    }[]
    secondaryYFields: {
        feId: string,
        fieldChineseName: string,
        fieldEnglishName: string
    }[]

}