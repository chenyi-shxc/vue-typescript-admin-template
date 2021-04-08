let idMark = 0;
//id生成器， 有些内容是纯文本的 用该方法 生成id 给vue的元素方便后期的排序 删除等操作！ 当作key传递
export default function getId():string{
    return `self_id_${++idMark}`;
}