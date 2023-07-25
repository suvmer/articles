<template>
    <v-main>
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
                ></v-progress-circular>
            </v-overlay>
        </v-list>
    </v-main>
  </template>
  
  <script>
  import axios from "axios";
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
            if(this.$store.state.article.postToShow?.id == this.id) {
                console.log(this.$store.state.article.kek);
                return this.$store.state.article.postToShow;
            }
            return null;
        }
    },
    methods: {
      
    },
    mounted() {
        this.$store.dispatch('fetchPost', this.id);
    }
  }
  </script>