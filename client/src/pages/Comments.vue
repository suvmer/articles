<template>
  <v-list max-width="700" class="pa-1 mx-auto overflow-visible">
    <AnalyticForm v-bind:dates="[dateFrom, dateTo]" @selectDates="selectDates"/>
    <CommentsList :showCommentsForm="false" :expanded="true" :groupped="true" v-bind:comments="this.$store.state.comment.commentStats"/>
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
  </template>
  
  <script>
  import CommentsList from "../components/CommentsList";
  import AnalyticForm from "../components/AnalyticForm";
  
  export default {
    name: 'App',
    components: {
        CommentsList,
        AnalyticForm
    },
    props: {
      dateFrom: {
        default: Date.now() - 1000*60*60*24*30
      },
      dateTo: {
        default: Date.now()
      }
    },
    data: () => ({
      drawer: window.innerWidth >= 1280
    }),
    methods: {
      selectDates(dates) {
        this.$store.dispatch('fetchCommentsAnalytics', {dateFrom: dates[0].valueOf(), dateTo: dates[1].valueOf()})
        this.$router.push({ path: 'comments', query: { dateFrom: dates[0].valueOf(), dateTo: dates[1].valueOf() }})
      }
    },
    mounted() {
      this.$store.dispatch('fetchCommentsAnalytics', {dateFrom: this.dateFrom, dateTo: this.dateTo})
    }
  }
  </script>