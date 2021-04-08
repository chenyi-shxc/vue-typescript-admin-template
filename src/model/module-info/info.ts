
class ModuleInfo {
    ascription:string = ''
    auditBasis:string = '' //审计依据
    businessType: string = ''//模型类型
    content:string = '' //
    createDate:string = ''
    createName: string = ''
    creator:string = ''
    currentPage:string = ''
    detailIdea: string = '' //模型思路
    label:string = '' 
    modelFunc:string = ''// 模型功能
    modelId:string = ''
    modelLevel:string = ''
    modelName: string = ''//模型名称
    modelNo:string = ''//模型编号
    modelParentId:string = ''
    modelType: string = ''
    orgCode:string = ''
    pageSize:string = ''
    parameter:string = ''
    pdName:string = ''
    resultDict:string = ''
    status:string = ''
    termIdList:string = ''
    version:string = ''
    wholeIdea: string = ''//注意事项
    themeType:string="" //专题类型，
    modelCategory: string = ""//模型大类
    partition: string = ""//细分分类

    static copy(other: ModuleInfo){
        let instance = new ModuleInfo();
        instance.ascription = other.ascription;
        instance.auditBasis = other.auditBasis;
        instance.businessType = other.businessType;
        instance.content = other.content;
        instance.createDate = other.createDate;
        instance.createName = other.createName;
        instance.creator = other.creator;
        instance.currentPage = other.currentPage;
        instance.detailIdea = other.detailIdea;
        instance.label = other.label;
        instance.modelFunc = other.modelFunc;
        instance.modelId = other.modelId;
        instance.modelLevel = other.modelLevel;
        instance.modelName = other.modelName;
        instance.modelNo = other.modelNo;
        instance.modelParentId = other.modelParentId;
        instance.modelType = other.modelType;
        instance.orgCode = other.orgCode;
        instance.pageSize = other.pageSize;
        instance.parameter = other.parameter;
        instance.pdName = other.pdName;
        instance.resultDict = other.resultDict;
        instance.status = other.status;
        instance.termIdList = other.termIdList;
        instance.version = other.version;
        instance.wholeIdea = other.wholeIdea;
        instance.themeType = other.themeType;
        instance.modelCategory = other.modelCategory;
        instance.partition = other.partition;

        return instance;
    }
}

export default ModuleInfo;