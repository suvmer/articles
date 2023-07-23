import { createRouter, createWebHistory } from "vue-router"
import Articles from "../pages/Articles"
import Comments from "../pages/Comments"
const routes = [
    {
        name: "Список статей",
        path: '/',
        component:  Articles,
        meta: { title: 'Список статей - Articles by Suvmer' }
    },
    {
        name: "Комментарии",
        path: '/comments',
        component:  Comments,
        meta: { title: 'Комментарии - Articles by Suvmer' }
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
})
router.beforeEach((to, from, next) => {
    document.title = to.name + " - Articles by Suvmer";
    next();
});

export default router;