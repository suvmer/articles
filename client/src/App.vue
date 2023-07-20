<template>
  <v-app>
    <v-app-bar color="primary" class="flex-grow-0" hide-xl-only :elevation="1" app>
      <v-app-bar-nav-icon v-if="isMobile()" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Articles Project</v-app-bar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-navigation-drawer disable-resize-watcher :permanent="!isMobile()" v-model="drawer" app>
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
        <v-list class="pa-2" lines="three">
          <v-list-item
            v-for="post in posts"
            :key="post.id"
            :title="post.title"
            :subtitle="post.body"
          />
        </v-list>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  name: 'App',

  components: {
  },

  data: () => ({
    drawer: window.innerWidth >= 1200,
    posts: [
      {
        id: 1,
        title: "Nicer",
        body: "Something happened"
      },
      {
        id: 2,
        title: "Dicer",
        body: "Is amogus alive?"
      }
    ]
  }),
  methods: {
    isMobile() {
      return window.innerWidth < 1200;
    },
    async fetchPosts() {
      try {
        const response = await axios.get('http://localhost:8000/articles')
        this.posts = response.data.posts;
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