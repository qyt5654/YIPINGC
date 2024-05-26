
import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
    state () {
        return {
            count: 0,
            user: '',
        }
    },
    mutations: {
        increment (state) {
            state.count++
        },
        getUser(state, n){
            state.user = n
        }
    }
})

export default store