import getId from '@/util/key';
// 模型结果中的条件相关

class Condition {
  id: string = ""; //后端的id
  // 前端id
  feId: string = "";
  //字段信息
  // tableFieldId: string = "";
  modelNo: string = "";
  //操作符
  operaFun: string = "";
  // operation: string = "";
  //类型
  columnType: string = "";
  // type: string = "";
  //显示名称
  chineseFieldName: string = "";
  // value: string = "";
  //别名
  aliasName: string = "";

  columnName: string = "";
  // fieldEnglishName: string = "";
  columnCnName: string = "";
  //fieldChineseName: string = "";

  chineseTableName: string = "";

  englishTableName: string = "";

  version: string ="";

  constructor(
    id: string,
    operaFun: string,
    modelNo: string,
    columnType: string,
    chineseFieldName: string,
    aliasName: string,
    columnName: string,
    columnCnName: string,
    chineseTableName: string,
    englishTableName: string
  ) {
    this.id = id;
    this.operaFun = operaFun;
    this.modelNo = modelNo;
    this.columnType = columnType;
    this.chineseFieldName = chineseFieldName;
    this.aliasName = aliasName;
    this.columnName = columnName;
    this.columnCnName = columnCnName;
    this.chineseTableName = chineseTableName;
    this.englishTableName = englishTableName;
    
    this.feId = getId();
  }

  static emptyFactory() {
    let instance = new Condition("", "", "", "", "", "", "", "", '','');
    instance.feId = getId();
    return instance;
  }

  isEmpty(): boolean {
    return this.columnName === "";
  }
}

export default Condition;