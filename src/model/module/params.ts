import getId from "@/util/key";

//模型变量接口
class ModuleParams {
  id: string = "";
  modelId: string = "";
  name: string = "";
  code: string = "";
  type: string = "";
  paramType: string = "";
  paramValue: string = "";
  paramNum: string = "";
  paramDesc: string = "";
  feId: string = "";
  constructor(
    id: string,
    modelId: string,
    name: string,
    code: string,
    type: string,//参数类型
    paramType: string,//参数类别 
    paramValue: string,
    paramDesc: string
  ) {
    this.id = id;
    this.modelId = modelId;
    this.name = name;
    this.code = code;
    this.type = type;
    this.paramType = paramType;
    this.paramValue = paramValue;
    this.paramDesc = paramDesc;
    this.feId = getId();
  }
  static emptyInstance(){
    return new ModuleParams('','','','','','','','');
  }
}

export default ModuleParams;