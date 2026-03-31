import { createWebHistory, createRouter } from "vue-router";
import Home from "@/Home";
import Statistique from "@/Statistique/Statistique.vue";
import PageDeJeu from "@/PageJeu/PageDeJeu.vue";
import PageDeDefaite from "@/PageDefaite/PageDeDefaite.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/statistique",
        name: "Statistique",
        component: Statistique,
    },
    {
        path: "/pagedejeu",
        name: "PageDeJeu",
        component: PageDeJeu,
    },
    {
        path: "/pagedefaite",
        name: "PageDeDefaite",
        component: PageDeDefaite,
        props: route => ({
            mot: route.params.mot,
            nbTentatives: Number(route.params.nbTentatives),//revenir à la ligne du dernier essai
            temps: Number(route.params.temps)
        })
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
