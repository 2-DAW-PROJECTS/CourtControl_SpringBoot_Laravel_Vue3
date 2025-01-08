    <template>
        <div class="logout">
        <p>Logging out...</p>
        </div>
    </template>
    
    <script>
    import { useStore } from 'vuex';
    import { computed, onMounted } from 'vue';
    import { useRouter } from 'vue-router';

    export default {
        name: 'UserLogout',
        setup() {
        const store = useStore();
        const router = useRouter();
        const isLoggedIn = computed(() => store.getters['auth/isLoggedIn']);
    
        const logout = () => {
            store.commit('auth/LOGOUT');
            store.dispatch('auth/logout').then(() => {
                router.push('/auth');
            });
        };
    
        onMounted(() => {
            logout();
        });
    
        return {
            isLoggedIn,
            logout,
        };
        },
    };
    </script>
    