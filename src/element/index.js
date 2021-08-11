import {
    Row,
    Col,
    Card,
    Input,
    Dropdown,
    Button,
    Divider,
    CollapseItem,
    Collapse
  } from 'element-ui'
const element = {
  install: function(Vue) {
    Vue.use(Button)
    Vue.use(Card)
    Vue.use(Input)
    Vue.use(Dropdown)
    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Divider)
    Vue.use(CollapseItem)
    Vue.use(Collapse)
  }
}
export default element