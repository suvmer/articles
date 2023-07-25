import { createStore } from "vuex";
import {articleModule} from "./articleModule"
import { commentsModule } from "./commentsModule";
import { UIModule } from "./UIModule";

export default createStore({
    modules: {
        article: articleModule,
        comment: commentsModule,
        ui: UIModule
    }
})