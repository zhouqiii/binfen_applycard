import Vue from "vue"
export default function createDom(component, props = {}, { title = "", content = ""} = {}) {
    // Vue.extend创建的是一个组件构造器，而不是一个具体的组件实例
    const Ctro = Vue.extend(component);
    // 创建一个组件实例并挂载，传入属性必须是propsData
    const comp = new Ctro({ propsData: props });
    comp.$mount();
    // 添加dom节点
    document.body.appendChild(comp.$el);
    // 当传入的组件为弹框组件时的逻辑
    if (arguments[2]) {
        let dialogArgs = arguments[2];
        Object.keys(dialogArgs).forEach(item => {
            comp[item] = dialogArgs[item]
        })
    }
    comp.remove = () => {
        document.body.removeChild(comp.$el);
        comp.$destroy()
    }
    return comp
}