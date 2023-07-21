<template>
  <v-app>
    <v-app-bar color="primary" class="flex-grow-0" hide-xl-only :elevation="1" app>
      <v-app-bar-nav-icon v-if="mdAndDown" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Список статей</v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer absolute class="pa-2" :permanent="!mdAndDown" v-model="drawer">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h5">#ВСтатье</v-list-item-title>
          <v-list-item-subtitle>Статьи и многое другое</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list>
        <v-list-item title="Список статей" prepend-icon="mdi-view-dashboard" link/>
        <v-list-item title="Комментарии" prepend-icon="mdi-account-box" link/>
        <v-btn block class="mx-1 mt-2" min-width="auto" href="https://github.com/suvmer/articles" target="_BLANK" prepend-icon="mdi-github">
            GitHub
        </v-btn>
      </v-list>
      
    </v-navigation-drawer>
    <v-main>
        <v-list max-width="700" class="pa-1 mx-auto">
          <PostForm @createArticle="createArticle"/>
          <v-card
            class="mx-auto my-2"
            v-for="post in posts"
            :key="post.id"
            :title="post.title"
          >
            <template v-slot:prepend>
              <v-icon size="x-large">mdi-post-outline</v-icon>
            </template>

            <v-card-text class="text-h5 py-2">
              {{ post.body }}
            </v-card-text>

            <v-card-actions>
              <v-list-item class="w-100">
                <v-icon class="me-2" icon="mdi-comment-multiple-outline"/>
                <span class="subheading me-2">{{post.comments.length}}</span>
                <template v-slot:append>
                  <div class="justify-self-end">
                    <v-list-item-subtitle>{{toDMY(post.createdAt)}}</v-list-item-subtitle>
                  </div>
                </template>
              </v-list-item>
            </v-card-actions>
          </v-card>
          <v-card
            class="mx-auto my-2"
            max-width="700"
            v-if="posts.length == 0 && !isLoading"
            title="Нет статей"
          />
          <v-card
            class="mx-auto my-2"
            max-width="700"
            v-if="posts.length == 0 && isLoading"
            title="Загрузка..."
          />
          <v-overlay
            :model-value="isLoading"
            class="align-center justify-center"
          >
            <v-progress-circular
              color="primary"
              indeterminate
              size="64"
            ></v-progress-circular>
          </v-overlay>
        </v-list>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import { getCurrentInstance } from "vue";
import { useDisplay } from "vuetify";
import PostForm from "./components/PostForm";
const vuetify = require('./plugins/vuetify')
const {toDMY} = require('./utils');
export default {
  name: 'App',
  components: {
    PostForm
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
    toDMY: (timestamp) => toDMY(timestamp),
    async fetchPosts() {
      try {
        this.isLoading = true;
        const response = await axios.get('http://192.168.1.134:8000/articles')
        this.posts = response.data.posts.map(el => ({...el, comments: []}));
      } catch(e) {
        console.log(e);
      } finally {
        this.isLoading = false;
      }
      this.fetchAllComments()
    },
    async fetchAllComments() {
      try {
        this.posts.forEach(async post => this.fetchComments(post));
      } catch(e) {
        console.log(e);
      }
    },
    async fetchComments(post) {
      const response = await axios.get(`http://192.168.1.134:8000/article/${post.id}/comments`);
      if(response.status == 200)
        this.posts = this.posts.map(newpost => newpost.id === post.id ? ({...newpost, comments: [...response.data.comments]}) : newpost)
    },
    async createArticle(post) {
      try {
        this.isLoading = true;
        const response = await axios.post('http://192.168.1.134:8000/article', {...post})
        this.posts = [...this.posts, ({...response.data.post, comments: []})];
        this.fetchComments(response.data.post);
      } catch(e) {
        console.log(e);
      } finally {
        this.isLoading = false;
      }
    }
  },
  mounted() {
    this.fetchPosts();
  }
}
</script>