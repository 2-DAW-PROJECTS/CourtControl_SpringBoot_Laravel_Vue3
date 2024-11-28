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
                <strong>{{ suggestion.tagCourt }}</strong><br>
                {{ suggestion.namePista }}
                </li>
            </ul>
        </div>
    </template>

    <script>
        import axios from 'axios';
        export default {
            data() {
                return {
                    searchQuery: "",
                    suggestions: [],
                    allCourts: [] // Almacena todas las pistas
                };
            },
            methods: {
                handleSearch() {
                    this.$emit('search', this.searchQuery);
                },
                async fetchAllCourts() {
                    try {
                        const response = await axios.get(`http://localhost:8085/api/courts`);
                        this.allCourts = response.data; // Almacena todas las pistas
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
                this.fetchAllCourts(); // Obtiene todas las pistas cuando el componente se monta
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

        .autocomplete-suggestions {
            list-style: none;
            padding: 0;
            margin: 0;
            background: rgba(35, 35, 47, 0.95);
            border: 2px solid #92d8be;
            border-radius: 15px;
            max-height: 200px;
            overflow-y: auto;
            box-shadow: 0 5px 15px rgba(146, 216, 190, 0.2);
            backdrop-filter: blur(10px);
        }
        .autocomplete-suggestions li {
            padding: 12px 15px;
            cursor: pointer;
            color: #f6f1de;
            border-bottom: 1px solid rgba(146, 216, 190, 0.2);
            transition: all 0.3s ease;
            font-family: 'Russo One', sans-serif;
        }
        .autocomplete-suggestions li:hover {
            background: rgba(146, 216, 190, 0.15);
            color: #f5ce8d;
            transform: translateX(5px);
            box-shadow: inset 0 0 10px rgba(146, 216, 190, 0.1);
        }    </style>