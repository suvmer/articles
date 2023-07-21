<template>
  <v-app>
    <v-app-bar color="primary" class="flex-grow-0" hide-xl-only :elevation="1" app>
      <v-app-bar-nav-icon v-if="isMobile()" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Список статей</v-app-bar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-navigation-drawer class="pa-2" disable-resize-watcher :permanent="!isMobile()" v-model="drawer" app>
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
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container class="pa-0" fluid>
        <v-card
          class="mx-auto my-2"
          max-width="700"
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
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
const {toDMY} = require('./utils');
export default {
  name: 'App',

  components: {
  },

  data: () => ({
    drawer: window.innerWidth >= 1200,
    isLoading: false,
    posts: []
  }),
  methods: {
    toDMY: (timestamp) => toDMY(timestamp),
    isMobile() {
      return window.innerWidth < 1200;
    },
    async fetchPosts() {
      try {
        this.isLoading = true;
        const response = await axios.get('http://localhost:8000/articles')
        this.posts = response.data.posts.map(el => ({...el, comments: []}));
      } catch(e) {
        console.log(e);
      } finally {
        this.isLoading = false;
      }
      this.fetchComments()
    },
    async fetchComments() {
      try {
        this.posts.forEach(async post => {
          const response = await axios.get(`http://localhost:8000/article/${post.id}/comments`);
          if(response.status == 200)
            this.posts = this.posts.map(newpost => newpost.id === post.id ? ({...newpost, comments: [...response.data.comments]}) : newpost)
        });
      } catch(e) {
        console.log(e);
      }
    }
  },
  mounted() {
    this.fetchPosts();
  }
}
</script>