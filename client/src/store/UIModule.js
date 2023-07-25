export const UIModule = {
    state: () => ({
        isLoading: false
    }),
    getters: {},
    mutations: {
        setLoading(state, value) {
            state.isLoading = value;
        }
    },
    actions: {}
}