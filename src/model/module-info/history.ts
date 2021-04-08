class HistoryItem{
    modelId: string = ''//修订版本号
    createUser: string = ''//修订人
    createDate: string = ''//修订日期
    version: string = ''//修订版本号
    content: string = ''//更新内容

    constructor(modelId: string, createUser: string, createDate: string, version: string, content: string){
        this.modelId = modelId;
        this.createUser = createUser;
        this.createDate = createDate;
        this.version = version;
        this.content = content;
    }
}


export default HistoryItem;