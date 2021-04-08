import Vue from 'vue'
import Element from 'element-ui'
import '../scss/element-variables.scss'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
Vue.component(CollapseTransition.name, CollapseTransition);
Vue.use(Element)
