<template>
    <v-list max-width="700" class="pa-1 mx-auto">
        <Post v-if="getPost != null" :expanded="true" v-bind:post="getPost"/>
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
</template>
  
  <script>
  import Post from "../components/Post";
  
  export default {
    name: 'App',
    components: {
        Post
    },
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    computed: {
        getPost() {
            return this.$store.state?.article?.postToShow?.id === this.id
              ? this.$store.state?.article?.postToShow : null;
        }
    },
    methods: {
      
    },
    mounted() {
        this.$store.dispatch('fetchPost', this.id);
    }
  }
  </script>