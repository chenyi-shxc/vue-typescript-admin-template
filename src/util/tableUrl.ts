//接口地址获取文件方法
// const host = 'http://49.232.41.237:8080';
const host = 'http://localhost:8082';
const url: {
  [key: string]: string;
} = {
  "user": `${host}/auditModel/system/user/login.cas`, //登陆接口
  "table-first-menu": `${host}/auditModel/account/data/queryFirstMenu.cas`, //当前用户权限下全部一级账表目录
  "table-sec-menus": `${host}/auditModel/account/data/queryAccount`, //账表查询，目录和自子菜单都能查询
  "table-data": `${host}/auditModel/account/data/queryAccountData`, //账表数据查询
  "table-menu-new": `${host}/auditModel/account/manage/addAccountMenu`, //新建账表目录
  "table-fields": `${host}/auditModel/account/data/queryAccountField`, //账表 字段信息查询

  "table-filter": `${host}/auditModel/account/data/accDataSelect`, //账表筛选
  "table-export": `${host}/auditModel/file/getAccDictFile`, //账表字典导出
  "table-download": `${host}/auditModel/file/getAccDataFile`, //账表数据导出
  "table-analyse": `${host}/auditModel/account/data/accDataPivot`, //账表透视
  "table-sort": `${host}/auditModel/account/data/accDataOrder`, //账表排序
  "table-dict-save": `${host}/auditModel/account/manage/modifyAccountFields`, //账表字段信息修改
  "table-prop": `${host}/auditModel/account/data/queryAccountProperty`, //账表信息及字段信息
};



export default function getUrl(name:string):string{
    if(!url[name]){
        throw new Error(`url map中没有找到${name}对应的值，请检查拼写`)
    }

    return url[name];
}