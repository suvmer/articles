import axios from "axios";

export const commentsModule = {
    state: () => ({
        
    }),
    getters: {
        
    },
    mutations: {
        
    },
    actions: {
        async editComment({state, commit}, comment) {
          try {
              await axios.patch(`http://192.168.1.134:8000/article/${comment.post_id}/comment/${comment.id}`, {...comment})
          } catch(e) {
              console.log(e);
              if(e.response?.data?.message)
                  alert(e.response.data.message)
          }
        },
        async deleteComment({state, commit}, comment) {
            try {
                await axios.delete(`http://192.168.1.134:8000/article/${comment.post_id}/comment/${comment.id}/`)
                commit('removeComment', comment.id)
            } catch(e) {
                console.log(e);
                if(e.response?.data?.message)
                    alert(e.response.data.message)
            }
          },
    }
}