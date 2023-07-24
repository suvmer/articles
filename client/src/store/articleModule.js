import axios from "axios";

export const articleModule = {
    state: () => ({
        isLoading: false,
        postToShow: null
    }),
    getters: {
        
    },
    mutations: {
        setPostToShow(state, post) {
            state.postToShow = post;
        },
        setLoading(state, value) {
            state.isLoading = value;
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
    }
}