<template>
    <div class="infinite-scroll">
      <div class="courts-container">
        <div v-for="court in uniqueCourts" :key="court.id" class="court-card">
          <div class="court-image">
            <img
            v-if="court.img"
            :src="require('@/assets/img_courts/' + court.typePista + '.jpg')"
            :alt="court.namePista"
            class="court-img"
          />          </div>
          <div class="court-content">
            <h3>{{ court.namePista }}</h3>
            <p>{{ court.description }}</p>
            <div class="court-details">
              <span class="tag">{{ court.tagCourt }}</span>
              <span class="size">{{ court.ancho }}m²</span>
              <span class="material">{{ court.material }}</span>
            </div>
          </div>
        </div>
      </div>
  
      <div v-if="loading" class="loading">
        <div class="loading-spinner"></div>
        <span>Cargando más pistas...</span>
      </div>
      <div v-if="noMoreCourts" class="no-more">
        No hay más pistas disponibles
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'InfiniteScroll',
    data() {
      return {
        courts: [],
        page: 1,
        loading: false,
        limit: 3,
        noMoreCourts: false
      };
    },
    computed: {
      uniqueCourts() {
        return [...new Map(this.courts.map(court => [court.id, court])).values()];
      }
    },
    methods: {
      async loadMoreCourts() {
        try {
          this.loading = true;
          const response = await axios.get(`http://localhost:8085/api/courts?page=${this.page}&limit=${this.limit}`);
  
          if (response.data && response.data.length > 0) {
            const newCourts = response.data.filter(newCourt => 
              !this.courts.some(existingCourt => existingCourt.id === newCourt.id)
            );
            
            if (newCourts.length > 0) {
              this.courts = [...this.courts, ...newCourts];
              this.page++;
            } else {
              this.noMoreCourts = true;
            }
          } else {
            this.noMoreCourts = true;
          }
        } catch (error) {
          console.error('Error loading courts:', error);
        } finally {
          this.loading = false;
        }
      },
    },
  
    mounted() {
      this.loadMoreCourts();
      window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 && !this.loading && !this.noMoreCourts) {
          this.loadMoreCourts();
        }
      });
    },
    
    unmounted() {
      window.removeEventListener('scroll', this.loadMoreCourts);
    }
  };
  </script>
  
  <style scoped>
  .infinite-scroll {
    padding: 2rem;
    background-color: rgb(26, 26, 26);
  }
  
  .courts-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }
  
  .court-card {
    background: linear-gradient(145deg, #1f1f1f, #2a2a2a);
    border-radius: 15px;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }
  
  .court-card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
  }
  
  .court-image {
    position: relative;
    padding-top: 66.67%;
    overflow: hidden;
  }
  
  .court-image img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }
  
  .court-card:hover .court-image img {
    transform: scale(1.1);
  }
  
  .court-content {
    padding: 1.75rem;
  }
  
  .court-card h3 {
    color: #ffffff;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    font-weight: 700;
    letter-spacing: 0.5px;
  }
  
  .court-card p {
    color: #b0b0b0;
    margin-bottom: 1.5rem;
    line-height: 1.7;
    font-size: 0.95rem;
  }
  
  .court-details {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .court-details span {
    padding: 0.6rem 1.2rem;
    border-radius: 50px;
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    transition: all 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .tag {
    background: linear-gradient(135deg, #ff6b6b, #ff8787);
    color: white;
  }
  
  .size {
    background: linear-gradient(135deg, #4facfe, #00f2fe);
    color: white;
  }
  
  .material {
    background: linear-gradient(135deg, #43e97b, #38f9d7);
    color: white;
  }
  
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2.5rem;
    color: #ffffff;
    gap: 1.2rem;
  }
  
  .loading-spinner {
    width: 35px;
    height: 35px;
    border: 3px solid #ffffff;
    border-top: 3px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  .no-more {
    text-align: center;
    padding: 2.5rem;
    color: #888;
    font-style: italic;
    font-size: 1.1rem;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @media (max-width: 1200px) {
    .courts-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 768px) {
    .courts-container {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .infinite-scroll {
      padding: 1rem;
    }
    
    .court-card h3 {
      font-size: 1.3rem;
    }
  }
  </style>
