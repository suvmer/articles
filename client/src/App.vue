<template>
  <v-app>
    <v-app-bar color="primary" class="flex-grow-0" hide-xl-only :elevation="1" app>
      <v-app-bar-nav-icon v-if="mdAndDown" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>{{ this.$route.name }}</v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer absolute class="pa-2" :permanent="!mdAndDown" v-model="drawer">
    <v-list-item>
        <v-list-item-title class="text-h5"><a href="#">#ВСтатье</a></v-list-item-title>
        <v-list-item-subtitle>Статьи и многое другое</v-list-item-subtitle>
    </v-list-item>
    <v-divider/>
    <v-list>
        <router-link class="text-decoration-none on-surface" v-slot="{isActive}" to="/">
          <v-list-item :active="isActive" title="Список статей" prepend-icon="mdi-view-dashboard" link/>
        </router-link>
        <router-link class="text-decoration-none on-surface" v-slot="{isActive}" to="/comments">
          <v-list-item :active="isActive" title="Комментарии" prepend-icon="mdi-comment-multiple-outline" link/>
        </router-link>
        <v-btn block class="mx-1 mt-2" min-width="auto" href="https://github.com/suvmer/articles" target="_BLANK" prepend-icon="mdi-github">
            GitHub
        </v-btn>
    </v-list>
    
    </v-navigation-drawer>
    <v-main>
        <v-list v-if="showBackArrow" max-width="700" height="auto" class="py-3 mx-auto overflow-visible">
          <v-icon @click="this.$router.back()" size="x-large">mdi-arrow-left</v-icon>
        </v-list>
        <RouterView/>
    </v-main>
  </v-app>
</template>

<script>
import { useDisplay } from "vuetify";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
export default {
  name: 'App',
  components: {
    PostForm, PostList
  },
  computed: {
    showBackArrow() {
      return ['/', '/comments'].findIndex(el => el == this.$router.currentRoute.value.path) == -1;
    }
  },
  data: () => ({
    drawer: window.innerWidth >= 1280
  }),
  setup() {
    const {mdAndDown} = useDisplay();
    return {mdAndDown};
  }
}
</script>