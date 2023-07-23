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
    <v-divider></v-divider>
    <v-list>
        <router-link class="text-decoration-none on-surface" v-slot="{isActive}" to="/"><v-list-item :active="isActive" title="Список статей" prepend-icon="mdi-view-dashboard"/></router-link>
        <router-link class="text-decoration-none on-surface" v-slot="{isActive}" to="/comments"><v-list-item :active="isActive" title="Комментарии" prepend-icon="mdi-comment-multiple-outline" link/></router-link>
        <v-btn block class="mx-1 mt-2" min-width="auto" href="https://github.com/suvmer/articles" target="_BLANK" prepend-icon="mdi-github">
            GitHub
        </v-btn>
    </v-list>
    
    </v-navigation-drawer>
    <RouterView/>
  </v-app>
</template>

<script>
import axios from "axios";
import { useDisplay } from "vuetify";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
export default {
  name: 'App',
  components: {
    PostForm, PostList
  },

  data: () => ({
    drawer: window.innerWidth >= 1280,
    isLoading: false,
    posts: []
  }),
  setup() {
    const {mdAndDown} = useDisplay();
    return {mdAndDown};
  },
  methods: {
    async fetchPosts() {
      try {
        this.isLoading = true;
        const response = await axios.get('http://192.168.1.134:8000/articles')
        this.posts = response.data.posts;
      } catch(e) {
        console.log(e);
      } finally {
        this.isLoading = false;
      }
    },
    async createArticle(post) {
      try {
        this.isLoading = true;
        const response = await axios.post('http://192.168.1.134:8000/article', {...post})
        this.posts = [...this.posts, response.data.post];
      } catch(e) {
        console.log(e);
        if(e.response.data?.message)
          alert(e.response.data?.message)
      } finally {
        this.isLoading = false;
      }
    },
    async editComment(comment) {
      try {
          const response = await axios.patch(`http://192.168.1.134:8000/article/${comment.post_id}/comment/${comment.id}`, {...comment})
          console.log(response);
      } catch(e) {
          console.log(e);
          if(e.response?.data?.message)
              alert(e.response.data.message)
      }
    }
  },
  mounted() {
    this.fetchPosts();
  }
}
</script>