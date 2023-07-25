<template>
    <v-main>
        <v-list max-width="700" class="pa-1 mx-auto">
          <PostForm/>
          <PostList v-bind:posts="this.$store.state.article.posts"/>
          <v-overlay
              :model-value="this.$store.state.ui.isLoading"
              class="align-center justify-center"
          >
              <v-progress-circular
                color="primary"
                indeterminate
                size="64"
              />
          </v-overlay>
        </v-list>
    </v-main>
  </template>
  
  <script>
  import PostForm from "../components/PostForm";
  import PostList from "../components/PostList";
  export default {
    name: 'App',
    components: {
      PostForm, PostList
    },
    mounted() {
      this.$store.dispatch('fetchPosts');
    }
  }
  </script>