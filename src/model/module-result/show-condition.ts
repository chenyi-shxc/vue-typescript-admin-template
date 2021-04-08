import getId from '@/util/key';
import Condition from './condition';
class ShowCondition extends Condition {
  // id: string = ""; //后端的id
  // feId:string = '';
  // label: string="";
  // operation: string="";
  // tableFieldId: string = "";
  // value: string="";
  // type: string = "";
  value: string = "";
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
    englishTableName: string,
    value: string
  ) {
    super(
      id,
      operaFun,
      modelNo,
      columnType,
      chineseFieldName,
      aliasName,
      columnName,
      columnCnName,
      chineseTableName,
      englishTableName
    );

    this.value = value;
    // this.id = id;
    // this.feId = getId();
    // this.label = label;
    // this.operation = operation;
    // this.tableFieldId = tableFieldId;
    // this.value = value;
    // this.type = type;
  }

  static getNewShowCon(data: Condition): ShowCondition {
    let instance = new ShowCondition(
      data.id,
      data.operaFun,
      data.modelNo,
      data.columnType,
      data.chineseFieldName,
      data.aliasName,
      data.columnName,
      data.columnCnName,
      data.chineseTableName,
      data.englishTableName,
      ''
    );
    return instance;
  }
}
// 展示结果
export default ShowCondition;