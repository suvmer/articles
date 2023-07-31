import { createStore } from "vuex";
import {articleModule} from "./articleModule"
import { commentsModule } from "./commentsModule";
import { UIModule } from "./UIModule";

// TODO: по возможности поместить commentsModule, articleModule в отдельные дирреторий в store
// TODO: modules -> comments -> внутри дирректории файлы (так же по аналогии article):
//  actions.js (запросы на бэк),
//  mutations.js (операции над state),
//  state.js (описание свойств),
//  getters.js (преобразование свойств state)
//  index.js (подключения actions, mutations, state, getters)

// TODO: если быстро сделать не получиться, то делать не нужно
// TODO: пример реализации https://itnan.ru/post.php?c=1&p=509904

export default createStore({
    modules: {
        article: articleModule,
        comment: commentsModule,
        ui: UIModule
    }
})