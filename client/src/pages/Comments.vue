<template>
    <v-main>
        <AnalyticForm @selectDates="selectDates"/>
        <Comments :expanded="true" :groupped="true" v-bind:comments="this.comments"/>
        <v-list max-width="700" class="pa-1 mx-auto">
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
  </template>
  
  <script>
  import axios from "axios";
  import Comments from "../components/CommentsList";
  import AnalyticForm from "../components/AnalyticForm";
  
  export default {
    name: 'App',
    components: {
        Comments,
        AnalyticForm
    },
  
    data: () => ({
      drawer: window.innerWidth >= 1280,
      isLoading: false,
      comments: [],
      dates: [new Date(Date.now().valueOf() - 30*24*60*60*1000), Date.now()]
    }),
    methods: {
      async fetchAllComments(dateFrom = 0, dateTo = 9999999999999) {
        try {
            this.isLoading = true;
            const response = await axios.get('http://192.168.1.134:8000/analytic/comments', {params: {dateFrom, dateTo}});
            this.comments = response.data.comments;
        } catch(e) {
            console.log(e);
        } finally {
            this.isLoading = false;
        }
      },
      selectDates(dates) {
        this.fetchAllComments(dates[0].valueOf(), dates[1].valueOf());
      }
    },
    mounted() {
      this.fetchAllComments(this.dates[0].valueOf(), this.dates[1].valueOf());
    }
  }
  </script>