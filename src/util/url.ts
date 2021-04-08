//接口地址获取文件方法
// const host = 'http://192.168.2.10:8080';
// const host = 'http://49.232.41.237:8088';
// http://49.232.41.237:8080/auditM/schema/querySchemaList.cas auditM  后边这块可配置的 放上来。
// const host = 'http://49.232.41.237:8080';
const host = 'http://localhost:8082/auditModel';
// const host = 'http://49.232.41.237:8080/auditModel/'; 
const url: {
  [key: string]: string;
} = {
  "user": `${host}/system/user/login.cas`, //登陆接口
  "table-first-menu": `${host}/account/data/queryFirstMenu`, //查询一级账表菜单
  "table-sec-menus": `${host}/account/data/queryAccount`, //账表查询，目录和自子菜单都能查询
  "table-fields": `${host}/account/data/queryAccountField`, //账表 字段信息查询
  "schema": `${host}/schema/querySchemaList.cas`, //函数表达式接口
  "module-menu": `${host}/model/data/queryModelList.cas`, //模型菜单查询
  "get-model-param": `${host}/model/data/getModelParam.cas`, //模型变量表查询的接口
  "get-model-state": `${host}/model/run/getModelState.cas`, //模型运行信息接口
  "get-content-history": `${host}/model/show/queryContentHistory.cas`, //模型修订记录查
  "get-model-card": `${host}/model/data/modelMainPageData.cas`, //模型卡片接口
  "update-model-card": `${host}/model/operate/updateModelInfo.cas`, //更新模型卡片接口
  "query-model-result-table": `${host}/model/show/queryModelResultTable.cas`, //模型展示结果表 查询
  "get-model-result-conf": `${host}/model/show/getModelResultConfig.cas`, //布局模板&数据对应关系的查询接口
  "add-result-conf": `${host}/model/operate/addResultConfig.cas`,//提交配置信息
  "show-model-result": `${host}/model/show/showModelResult.cas`,//模型结果表的查询结果
  "get-model-params-opts": `${host}/dictionary/queryDictionary.cas`,//模型中options选项查询接口
  "save-model-params": `${host}/model/operate/updateModelParams.cas`,//保存模型接口中顶部的参数数据
  "del-model-params": `${host}/model/operate/deleteModelParams.cas`,//删除模型接口中的顶部参数数据。 单条的
  "save-model-content": `${host}/model/operate/updateModelContent.cas`,//模型更改内容
  'run-model': `${host}/model/run/runModel.cas`,//模型运行
  'download-model': `${host}`,//模型下载
  'stop-model': `${host}/model/run/stopModel.cas`,//模型停止
  'update-model-info-tag': `${host}/model/operate/updateModelLabel.cas`,//修改模型标签的接口
};

export default function getUrl(name:string):string{
    if(!url[name]){
        throw new Error(`url map中没有找到${name}对应的值，请检查拼写`)
    }

    return url[name];
}