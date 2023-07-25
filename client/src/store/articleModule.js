import axios from "axios";

export const articleModule = {
    state: () => ({
        postToShow: null,
        posts: []
    }),
    getters: {
        
    },
    mutations: {
        setPostToShow(state, post) {
            state.postToShow = post;
        },
        setPosts(state, posts) {
            state.posts = posts;
            console.log(state.posts)
        },
        addComment(state, comment) {
            if(state.postToShow !== null)
                state.postToShow = {...state.postToShow, comments: [{...comment, createdAt: Date.now(), updatedAt: Date.now()}, ...state.postToShow.comments]};
        },
        removePost(state, id) {
            state.posts = state.posts.filter(post => post.id != id);
        },
        removeComment(state, id) {
            if(state.postToShow !== null)
                state.postToShow = {...state.postToShow, comments: state.postToShow.comments.filter(comment => comment.id != id)};
        }
    },
    actions: {
        async fetchPost({state, commit}, id) {
            try {
                commit("setLoading", true);
                const response = await axios.get(`http://192.168.1.134:8000/article/${id}`)
                commit("setPostToShow", response.data.post);
            } catch(e) {
                console.log(e);
            } finally {
                commit("setLoading", false);
            }
        },
        async fetchPosts({state, commit}) {
            try {
                commit('setLoading', true);
                const response = await axios.get('http://192.168.1.134:8000/articles')
                commit('setPosts', response.data.posts);
            } catch(e) {
                console.log(e);
            } finally {
                commit('setLoading', false);
            }
        },
        async editPost({state, commit}, post) {
          try {
              await axios.patch(`http://192.168.1.134:8000/article/${post.id}/`, {...post})
          } catch(e) {
              console.log(e);
              if(e.response?.data?.message)
                  alert(e.response.data.message)
          }
        },
        async deletePost({state, commit}, post) {
          try {
              await axios.delete(`http://192.168.1.134:8000/article/${post.id}/`)
              commit('removePost', post.id)
          } catch(e) {
              console.log(e);
              if(e.response?.data?.message)
                  alert(e.response.data.message)
          }
        },
        async createPost({state, commit}, post) {
            try {
                commit('setLoading', true);
                const response = await axios.post('http://192.168.1.134:8000/article', {...post})
                commit('setPosts',  [response.data.post, ...state.posts]);
            } catch(e) {
                console.log(e);
                if(e.response.data?.message)
                    alert(e.response.data?.message)
            } finally {
                commit('setLoading', false);
            }
        }
    }
}