    <template>
        <div class="search-bar">
            <input
                type="text"
                class="search-input"
                v-model="searchQuery"
                @input="fetchAutocompleteSuggestions"
                @keyup.enter="handleSearch"
                placeholder="Buscar..."
            />
            <ul v-if="suggestions.length" class="autocomplete-suggestions">
                <li v-for="suggestion in suggestions" :key="suggestion.namePista" @click="selectSuggestion(suggestion)">
                <strong class="tag-text">{{ suggestion.tagCourt }}</strong>
                <span class="court-name">{{ suggestion.namePista }}</span>
                </li>
            </ul>
        </div>
    </template>

    <script>
        import { mapState, mapActions } from 'vuex';

        export default {
            data() {
                return {
                    searchQuery: "",
                    suggestions: [],
                    allCourts: []
                };
            },
            computed: {
                ...mapState('courts', ['courts'])
            },
            methods: {
                ...mapActions('courts', ['INITIALIZE_COURTS', 'updateFilters']),
                
                handleSearch() {
                    this.updateFilters({ search: this.searchQuery });
                    this.$emit('search', this.searchQuery);
                },

                async fetchAllCourts() {
                    try {
                        await this.INITIALIZE_COURTS();
                        this.allCourts = this.courts;
                    } catch (error) {
                        console.error('Error fetching all courts:', error);
                    }
                },

                fetchAutocompleteSuggestions() {
                    if (this.searchQuery.trim() === "") {
                        this.suggestions = [];
                        return;
                    }

                    const uniqueSuggestions = new Map();
                    this.allCourts
                        .filter(court =>
                            (court.namePista && court.namePista.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
                            (court.tagCourt && court.tagCourt.toLowerCase().includes(this.searchQuery.toLowerCase()))
                        )
                        .forEach(court => {
                            if (!uniqueSuggestions.has(court.namePista)) {
                                uniqueSuggestions.set(court.namePista, court);
                            }
                        });
                    this.suggestions = Array.from(uniqueSuggestions.values());
                },

                selectSuggestion(suggestion) {
                    this.searchQuery = suggestion.namePista;
                    this.suggestions = [];
                    this.handleSearch();
                }
            },
            mounted() {
                this.fetchAllCourts();
            }
        };
    </script>

    <style scoped>
        .search-bar {
            position: relative;
            width: 100%;
            max-width: 800px;
            margin: 2rem auto;
        }

        .search-input {
            padding: 1rem 2rem;
            font-size: 1.5rem;
            border: 3px solid transparent;
            border-radius: 40px;
            outline: none;
            width: 100%;
            background: rgba(146, 216, 190, 0.18);
            color: #fff;
            backdrop-filter: blur(20px);
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            animation: inputPulse 2.5s infinite, glow 4s infinite;
            box-shadow: 0 0 30px rgba(146, 216, 190, 0.4),
            inset 0 0 15px rgba(146, 216, 190, 0.2);
            letter-spacing: 1px;
            font-family: 'Russo One', sans-serif;
            text-transform: uppercase;
        }
        
        .search-input::placeholder {
            color: rgba(255, 255, 255, 0.7);
            font-weight: 300;
            font-size: 1.3rem;
        }
        
        .search-input:focus {
            background: rgba(146, 216, 190, 0.28);
            transform: translateY(-5px) scale(1.02);
            box-shadow: 0 0 50px rgba(146, 216, 190, 0.7),
            inset 0 0 20px rgba(146, 216, 190, 0.3);
            border: 3px solid rgba(146, 216, 190, 0.6);
        }
        
        .search-input:hover {
            background: rgba(146, 216, 190, 0.25);
            transform: translateY(-3px);
            box-shadow: 0 0 40px rgba(146, 216, 190, 0.5);
        }

        .autocomplete-suggestions {
            list-style: none;
            padding: 0.5rem;
            margin-top: 1rem;
            background: rgba(35, 35, 47, 0.95);
            border: 3px solid #92d8be;
            border-radius: 25px;
            max-height: 400px;
            overflow-y: auto;
            box-shadow: 0 10px 30px rgba(146, 216, 190, 0.3),
            inset 0 0 20px rgba(146, 216, 190, 0.1);
            backdrop-filter: blur(15px);
            animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .autocomplete-suggestions li {
            padding: 1rem 1.5rem;
            margin: 0.5rem;
            cursor: pointer;
            color: #f6f1de;
            border-radius: 15px;
            border: 1px solid rgba(146, 216, 190, 0.2);
            transition: all 0.4s ease;
            font-family: 'Russo One', sans-serif;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .autocomplete-suggestions li:hover {
            background: rgba(146, 216, 190, 0.2);
            color: #f5ce8d;
            transform: translateX(10px) scale(1.02);
            box-shadow: 0 0 20px rgba(146, 216, 190, 0.2);
            border-color: rgba(146, 216, 190, 0.4);
        }

        .tag-text {
            font-size: 1.2rem;
            color: #92d8be;
            text-shadow: 0 0 10px rgba(146, 216, 190, 0.5);
        }

        .court-name {
            font-size: 1.1rem;
            opacity: 0.9;
        }

        @keyframes inputPulse {
            0% {
                box-shadow: 0 0 30px rgba(146, 216, 190, 0.4);
            }
            50% {
                box-shadow: 0 0 40px rgba(146, 216, 190, 0.6);
            }
            100% {
                box-shadow: 0 0 30px rgba(146, 216, 190, 0.4);
            }
        }

        @keyframes glow {
            0% {
                border-color: rgba(146, 216, 190, 0.3);
            }
            50% {
                border-color: rgba(146, 216, 190, 0.6);
            }
            100% {
                border-color: rgba(146, 216, 190, 0.3);
            }
        }

        /* Estilo para la barra de desplazamiento */
        .autocomplete-suggestions::-webkit-scrollbar {
            width: 10px;
        }

        .autocomplete-suggestions::-webkit-scrollbar-track {
            background: rgba(146, 216, 190, 0.1);
            border-radius: 10px;
        }

        .autocomplete-suggestions::-webkit-scrollbar-thumb {
            background: rgba(146, 216, 190, 0.3);
            border-radius: 10px;
        }

        .autocomplete-suggestions::-webkit-scrollbar-thumb:hover {
            background: rgba(146, 216, 190, 0.5);
        }
    </style>