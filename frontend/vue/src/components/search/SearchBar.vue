    <!-- <template>
        <form @submit.prevent="handleSearch" class="hero-search">
        <input
            type="text"
            class="search-input"
            placeholder="Buscar pista..."
            v-model="searchQuery"
        />
        </form>
    </template> -->
    <template>
        <div class="search-bar">
            <input
                type="text"
                class="search-input"
                v-model="searchQuery"
                @keyup.enter="handleSearch"
                placeholder="Buscar..."
            />
        </div>
    </template>
    
    <script>
    export default {
        data() {
        return {
            searchQuery: ""
        };
        },
        methods: {
            handleSearch() {
                this.$emit('search', this.searchQuery);
            }
        }
    };
    </script>
    
    <style scoped>
    .search-input {
        padding: 0.5rem 1.2rem;
        font-size: 1.2rem;
        border: 2px solid transparent;
        border-radius: 30px;
        outline: none;
        width: 400px;
        background: rgba(146, 216, 190, 0.15);
        color: #fff;
        backdrop-filter: blur(15px);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        animation: inputPulse 2s infinite, glow 3s infinite;
        box-shadow: 0 0 20px rgba(146, 216, 190, 0.3);
        letter-spacing: 0.6px;
        font-family: 'Russo One', sans-serif;
    }
    
    .search-input::placeholder {
        color: rgba(255, 255, 255, 0.8);
        font-weight: 300;
    }
    
    .search-input:focus {
        background: rgba(146, 216, 190, 0.25);
        width: 460px;
        box-shadow: 0 0 30px rgba(146, 216, 190, 0.6);
        border: 2px solid rgba(146, 216, 190, 0.5);
        transform: translateY(-3px);
    }
    
    .search-input:hover {
        background: rgba(146, 216, 190, 0.2);
    }
    </style>