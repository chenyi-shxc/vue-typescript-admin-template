import getId from '@/util/key';
class ColumnConf{
    feId:string=''//前端id
    tbcfId:string='' //表格ID
    modelId: string = '' //模型ID
    resultTableId: string = ''  //结果表英文名称
    modelNo: number|string = ''  //模型编号
    cnName: string = ''  //展示表中文名称
    enName: string = ''  //展示表英文名称
    columnNum: string|number = ''  //列编号
    columnTitle: string = ''  //图标标题
    templateType: string = ''  // 模板类型
    columnType: string = ''  //展示图形类型
    columnJson: string = ''  //配置列的json信息
    linkage: string = ''  //是否联动查询
    version: string = ''  //版本号

    static emptyFactory(columnNum:number,templateType:string){
        let instance = new ColumnConf();
        instance.columnNum = columnNum;
        instance.feId = getId();
        instance.templateType = templateType;
        return instance;
    }

    clone(){
        let instance = new ColumnConf();
        instance.feId = getId();
        instance.tbcfId = this.tbcfId;
        instance.modelId = this.modelId;
        instance.resultTableId = this.resultTableId;
        instance.modelNo = this.modelNo;
        instance.cnName = this.cnName;
        instance.enName = this.enName;
        instance.columnNum = this.columnNum;
        instance.columnTitle = this.columnTitle;
        instance.templateType = this.templateType;
        instance.columnType = this.columnType;
        instance.columnJson = this.columnJson;
        instance.linkage = this.linkage;
        instance.version = this.version;
        return instance;
    }
}

export default ColumnConf;