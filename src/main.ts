import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css'

import ElementUI from 'element-ui'

import '@/styles/element-variables.scss'
import '@/styles/index.scss'

import '@/assets/styles/index.scss' // global css
import '@/assets/styles/ruoyi.scss' // ruoyi css

import App from '@/App.vue'
import store from '@/store'
import router from '@/router'

import permission from '@/directive/permission'

import './assets/icons' // icon

import '@/permission'

import { getDicts } from "@/api/system/dict/data";
import { getConfigKey } from "@/api/system/config";
import { parseTime, resetForm, addDateRange, selectDictLabel, selectDictLabels, download, handleTree } from "@/utils/ruoyi";
import Pagination from "@/components/Pagination";
// 自定义表格工具扩展
import 'ant-design-vue/dist/antd.css';

import './plugins/axios' // this.axios 进行网络api请求
import './plugins/element'

// 按需引入
import {
  ConfigProvider,
  Layout,
  Table,
  Button,
  Form,
  Input,
  Row,
  Col,
  Select,
  Radio,
  Modal,
  DatePicker,
  Icon,
  Card,
  Tabs,
  Breadcrumb,
  Menu,
  Spin,
  Tree,
  Empty,
  Tooltip,
  Message

} from 'ant-design-vue'
Vue.component(Tree.name, Tree);
Vue.component(Icon.name, Icon);
Vue.component(ConfigProvider.name, ConfigProvider);
Vue.component(Table.name, Table);
Vue.component(Layout.name, Layout);
Vue.component(Button.name, Button);
Vue.component(Form.name, Form);
Vue.component(Input.name, Input);
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(Select.name, Select);
Vue.component(Radio.name, Radio);
Vue.component(Modal.name, Modal);
Vue.component(DatePicker.name, DatePicker);
Vue.component(Card.name, Card);
Vue.component(Tooltip.name, Tooltip);
import RightToolbar from "@/components/RightToolbar"
// echarts
import * as echarts from "echarts";
import 'echarts/map/js/china.js';
// 全局方法挂载
Vue.prototype.getDicts = getDicts
Vue.prototype.getConfigKey = getConfigKey
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.selectDictLabels = selectDictLabels
Vue.prototype.download = download
Vue.prototype.handleTree = handleTree
Vue.prototype.$echarts = echarts

Vue.prototype.msgSuccess = function (msg: String) {
  this.$message({ showClose: true, message: msg, type: "success" });
}

Vue.prototype.msgError = function (msg: String) {
  this.$message({ showClose: true, message: msg, type: "error" });
}

Vue.prototype.msgInfo = function (msg: String) {
  this.$message.info(msg);
}

// 全局组件挂载
Vue.component('Pagination', Pagination)
Vue.component('RightToolbar', RightToolbar)

Vue.use(permission)

Vue.use(ElementUI, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
