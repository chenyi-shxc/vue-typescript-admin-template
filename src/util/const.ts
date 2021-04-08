//cookie 的key值
const cookieKey = {
    'login_uid':'login_uid'
};
// 模型类型的定义
const moduleDefine = {
    TABLE_QUERY: 'tableQuery', // 帐表查询
    TABLE_CREATE: "tableCreate", //新建帐表
    TABLE_DROP: "tableDrop", //删除帐表
    TABLE_APPEND: "tableAppend",//帐表追加
    TABLE_COMPARE: "tableCompare",//帐表比较
    DATA_INSERT: "dataInsert",//数据插入
    DATA_UPDATE: "dataUpdate",//数据修改
    DATA_DELETE: "dataDelete",//数据删除
    VARIABLE_DEFINE: "variableDefine",//变量定义
    VARIABLE_ASSIGNMENT: "variableAssignment",//变量赋值
    CONDITION_JUDGE: "conditionJudge",//条件判断
    CYCLE_RUN: "cycleRun",//循环运行
    CYCLE_BREAK: "cycleBreak",//循环中断
    MODULE_CALL: "moduleCall"//模块调用
};


const tempModelResult = {
    'NONE':'none',//无图
    'ONE':'one',//单图
    'TWO_H': 'two_horizontal',//两图横向
    'TWO_V': 'two_vertical',//两图纵向
    'THREE_H': 'three_horizontal',//三图横向
    'THREE_V': 'three_vertical',//三图纵向
    'THREE_TWO_P_O': 'three_two_plus_one',//三图2+1
    'THREE_ONE_P_T': 'three_one_plus_two'//三图1+2
}
//操作函数
const operFun = [
  {
    key: "eq",
    name: "等于"
  },
  {
    key: "neq",
    name: "不等于"
  },
  {
    key: "lk",
    name: "相似于"
  },
  {
    key: "nlk",
    name: " 不相似于"
  },
  {
    key: "et",
    name: "存在于"
  },
  {
    key: "net",
    name: "不存在于"
  },
  {
    key: "bg",
    name: "大于"
  },
  {
    key: "sm",
    name: "小于"
  },
  {
    key: "bgeq",
    name: "大于等于"
  },
  {
    key: "smeq",
    name: "小于等于"
  }
];

export { cookieKey, moduleDefine, tempModelResult, operFun };