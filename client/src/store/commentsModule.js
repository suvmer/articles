import { normalizeDate } from "@/utils";
import axios from "axios";

export const commentsModule = {
    state: () => ({
        commentStats: []
    }),
    getters: {
        
    },
    mutations: {
        setCommentStats(state, comments) {
            state.commentStats = comments;
        },
        deleteCommentPost(state, post) {
            state.commentStats = state.commentStats.filter(comment => comment.post_id != post.id);
        }
    },
    actions: {
        async editComment({state, commit}, comment) {
          try {
              await axios.patch(`${process.env.VUE_APP_API_URL}/article/${comment.post_id}/comment/${comment.id}`, {...comment})
          } catch(e) {
              console.log(e);
              if(e.response?.data?.message)
                  alert(e.response.data.message)
          }
        },
        async deleteComment({state, commit}, comment) {
            try {
                await axios.delete(`${process.env.VUE_APP_API_URL}/article/${comment.post_id}/comment/${comment.id}/`)
                commit('removeComment', comment.id)
            } catch(e) {
                console.log(e);
                if(e.response?.data?.message)
                    alert(e.response.data.message)
            }
        },
          
        async createComment({state, commit}, comment) {
            try {
                const response = await axios.post(`${process.env.VUE_APP_API_URL}/article/${comment.post_id}/comment`, {...comment})
                commit('addComment', response.data.comment);
            } catch(e) {
                console.log(e);
                if(e.response.data?.message)
                    alert(e.response.data?.message)
            }
        },

        async fetchCommentsAnalytics({state, commit}, {dateFrom, dateTo}) {
            try {
                if(!state.commentStats.length) commit('setLoading', true);
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/analytic/comments`, {params: {dateFrom: normalizeDate(new Date(dateFrom)).valueOf(), dateTo: normalizeDate(new Date(dateTo + 1000*60*60*24)).valueOf()}});
                commit('setCommentStats', response.data.comments);
            } catch(e) {
                console.log(e);
            } finally {
                commit('setLoading', false);
            }
          },
    }
}