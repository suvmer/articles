import { createRouter, createWebHistory } from "vue-router"
import Articles from "../pages/Articles"
import Comments from "../pages/Comments"
import PostInfo from "../pages/PostInfo"

const routes = [
    {
        name: "Список статей",
        path: '/',
        component:  Articles,
    },
    {
        name: "Комментарии",
        path: '/comments',
        component:  Comments,
    },
    {
        name: "Статья",
        path: '/post/:id',
        component: PostInfo,
        props: (route) => ({id: +route.params.id})
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