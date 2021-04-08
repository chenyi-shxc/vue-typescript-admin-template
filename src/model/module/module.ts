import getId  from '@/util/key';
class ModuleForServer {
  //模块ID
  stepID: string = "";

  //模块类型
  moduleType: string = "";

  //模块序列号
  sequence: number = 0;

  //模块编号
  moduleNo: string = "";

  //源账本【复用：帐表追加、帐表比较、数据插入、数据修改、数据删除、新建帐表】
  resourceTable: string = "";

  //连接条件
  connCondition: string = "";

  //目标字段或表达式【复用：帐表追加、数据插入、新建帐表（手工建表字段定义）】
  funcField: string = "";

  //限制记录数
  dataSize: string = "";

  //操作条件【复用：帐表比较（比较关系）、数据插入、数据修改、数据删除、条件判断（条件内容）】
  condition: string = "";

  //分组字段
  groupField: string = "";

  //排序字段
  orderField: string = "";

  //操作选项【复用：数据插入、数据修改（修改方式）、新建帐表、删除帐表、循环中断(中断类型)】
  actionType: string = "";

  //目标帐表【复用：帐表追加、帐表比较（参照帐表）、数据插入、新建帐表、删除帐表】
  targetTable: string = "";

  //帐表比较交集表
  intersectionTable: string = "";

  //帐表比较差集表
  differenceTable: string = "";

  //源字段或表达式【数据插入】
  resourceField: string = "";

  //字段对应值【数据插入】
  fieldData: string = "";

  //定义内容【变量定义、条件判断】
  fieldDefined: string = "";

  //赋值内容【变量赋值】
  fieldOperate: string = "";

  //成立时运行范围【条件判断】
  trueRange: string = "";

  //不成立时运行范围【条件判断】
  falseRange: string = "";

  //循环条件【循环运行】
  cycleCondition: string = "";

  //循环步长【循环运行】
  cycleStepLength: string = "";

  //循环执行范围【循环运行】
  cycleRange: string = "";

  //调用模块列表【调用模块】
  moduleList: string = "";

  //传入变量【调用模块】
  variable: string = "";

  //模块描述
  desc: string = "";

  //feData
  feData: string = "";

  //模块调用 增加属性
  moduleIds: string = "";

  moduleNos: string = "";
}

type Tag = {
    id:string,
    title:string,
    args?:any // 存储其他类型
}
// 排序字段类型
type OrderField = {
    val:string //页面上展示好的
    list: OrderFieldItem[]
}

type ModuleCall = {
    feId:string
    val:string
    list: ModuleCallItem[]
};

type ModuleCallItem = {
    //路径问题 循环嵌套当前的对象
    modelId:string// 模块的id
    modelName:string
    modelType:string // dir or model
    modelParentId:string
    modelNo:string
};

type OrderFieldItem = {
    tableEnglishName: string //所属表的英文名字
    tableChineseName: string //所属表的中文名字
    fieldId: string //fieldId
    fieldChineseName: string // 字段中文名字
    fieldEnglishName: string // 字段英文名字
    isDesc: boolean // 是否是降序
}

class ModuleForFe {
  feId: string;

  collapse: boolean = true;

  //模块ID
  stepID: string = "";

  //模块类型
  moduleType: string = "";

  //模块序列号
  sequence: number = 0;

  //模块编号
  moduleNo: string = "";

  //源账本【复用：帐表追加、帐表比较、数据插入、数据修改、数据删除、新建帐表】
  resourceTable: Tag[] = [];

  //连接条件
  connCondition: string = "";

  //目标字段或表达式【复用：帐表追加、数据插入、新建帐表（手工建表字段定义）】
  funcField: string = "";

  //限制记录数
  dataSize: string = "";

  //操作条件【复用：帐表比较（比较关系）、数据插入、数据修改、数据删除、条件判断（条件内容）】
  condition: string = "";

  //分组字段
  groupField: string = "";

  //排序字段
  orderField: OrderField | null | undefined = { val: "", list: [] };

  //操作选项【复用：数据插入、数据修改（修改方式）、新建帐表、删除帐表、循环中断(中断类型)】
  actionType: string = "";

  //目标帐表【复用：帐表追加、帐表比较（参照帐表）、数据插入、新建帐表、删除帐表】
  targetTable: Tag[] = [];

  //帐表比较交集表
  intersectionTable: string = "";

  //帐表比较差集表
  differenceTable: string = "";

  //源字段或表达式【数据插入】
  resourceField: string = "";

  //字段对应值【数据插入】
  fieldData: string = "";

  //定义内容【变量定义、条件判断】
  fieldDefined: string = "";

  //赋值内容【变量赋值】
  fieldOperate: string = "";

  //成立时运行范围【条件判断】
  trueRange: string = "";

  //不成立时运行范围【条件判断】
  falseRange: string = "";

  //循环条件【循环运行】
  cycleCondition: string = "";

  //循环步长【循环运行】
  cycleStepLength: string = "";

  //循环执行范围【循环运行】
  cycleRange: string = "";

  //调用模块列表【调用模块】
  moduleList: ModuleCall[] = [];

  //传入变量【调用模块】
  variable: string = "";

  //模块描述
  desc: string = "";

  constructor() {
    this.feId = getId();
  }
}


export default ModuleForFe;
export { ModuleForServer, Tag, OrderField, OrderFieldItem, ModuleCall, ModuleCallItem};