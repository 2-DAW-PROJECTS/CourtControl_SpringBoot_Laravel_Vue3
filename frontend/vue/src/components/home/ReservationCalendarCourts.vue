<template>
    <div class="calendar-container">
        <div class="calendar-header">
            <h2>Calendario de Concurrencia (Courts)</h2>
            <div class="month-navigation">
                <button @click="changeMonth(-1)" class="nav-btn">&lt;</button>
                <span class="current-month">{{ monthNames[currentMonth] }} {{ currentYear }}</span>
                <button @click="changeMonth(1)" class="nav-btn">&gt;</button>
            </div>
        </div>

        <div v-if="isLoading" class="loading">Cargando...</div>
        <div v-else class="calendar-grid">
            <div class="weekdays-header">
                <div v-for="day in weekDays" :key="day" class="weekday">{{ day }}</div>
            </div>
            
            <div class="days-grid">
                <div v-for="(day, index) in calendarDays" 
                    :key="index"
                    class="day-cell"
                    :class="{ 'inactive': !day.isCurrentMonth, 'today': day.isToday, 'pulse-effect': day.isToday }"
                    :style="{ backgroundColor: getConcurrencyColor(day.dayNumber) }">
                    <div class="day-content">
                        <span class="day-number">{{ day.dayNumber }}</span>
                        <span v-if="day.isCurrentMonth" class="concurrency-count">
                            {{ getConcurrencyCount(day.dayNumber) }} reservas
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div class="concurrency-legend">
            <div class="legend-title">Nivel de Concurrencia</div>
            <div class="legend-items">
                <div class="legend-item">
                    <div class="color-box" style="background-color: #92d8be"></div>
                    <span>Baja</span>
                </div>
                <div class="legend-item">
                    <div class="color-box" style="background-color: #f5ce8d"></div>
                    <span>Media</span>
                </div>
                <div class="legend-item">
                    <div class="color-box" style="background-color: #eb6a65"></div>
                    <span>Alta</span>
                </div>
                <div class="legend-item">
                    <div class="color-box pulse-box"></div>
                    <span>Hoy</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, onMounted, toRaw } from 'vue';
import { useStore } from 'vuex';

export default {
    name: 'ReservationCalendarCourts',
    
    setup() {
        const store = useStore();
        const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

        const currentMonth = computed(() => store.getters['reservations/getCurrentMonth']);
        const currentYear = computed(() => store.getters['reservations/getCurrentYear']);
        const allReservations = computed(() => store.getters['reservations/getAllReservations']);
        const isLoading = computed(() => store.getters['reservations/isLoading']);

        const isToday = (day) => {
            const today = new Date();
            return day.dayNumber === today.getDate() && 
                currentMonth.value === today.getMonth() && 
                currentYear.value === today.getFullYear();
        };

        const calendarDays = computed(() => {
            const firstDay = new Date(currentYear.value, currentMonth.value, 1);
            const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0);
            const days = [];
            
            const firstDayOfWeek = firstDay.getDay();
            for (let i = firstDayOfWeek - 1; i >= 0; i--) {
                const date = new Date(currentYear.value, currentMonth.value, -i);
                days.push({
                    dayNumber: date.getDate(),
                    isCurrentMonth: false,
                    isToday: isToday({ dayNumber: date.getDate() })
                });
            }
            
            for (let i = 1; i <= lastDay.getDate(); i++) {
                days.push({
                    dayNumber: i,
                    isCurrentMonth: true,
                    isToday: isToday({ dayNumber: i })
                });
            }
            
            const remainingDays = 42 - days.length;
            for (let i = 1; i <= remainingDays; i++) {
                days.push({
                    dayNumber: i,
                    isCurrentMonth: false,
                    isToday: isToday({ dayNumber: i })
                });
            }
            
            return days;
        });

        onMounted(() => {
            store.dispatch('reservations/fetchReservations');
        });

        const getConcurrencyCount = (day) => {
            const rawReservations = toRaw(allReservations.value);
            return rawReservations.filter(reservation => {
                return reservation.idDay === day && reservation.idMonth === currentMonth.value + 1 && new Date(reservation.createdAt).getFullYear() === currentYear.value;
            }).length;
        };

        const getConcurrencyColor = (day) => {
            const count = getConcurrencyCount(day);
            const rawReservations = toRaw(allReservations.value);
            const maxConcurrency = Math.max(...rawReservations.map(reservation => {
                return reservation.idMonth === currentMonth.value + 1 && new Date(reservation.createdAt).getFullYear() === currentYear.value ? 1 : 0;
            }), 0);
            
            if (count === 0) return '#f6f1de';
            
            const ratio = count / maxConcurrency;
            if (ratio < 3) return '#92d8be';
            if (ratio < 7) return '#f5ce8d';
            return '#eb6a65';
        };

        const changeMonth = (delta) => {
            let newMonth = currentMonth.value + delta;
            let newYear = currentYear.value;

            if (newMonth > 11) {
                newMonth = 0;
                newYear++;
            } else if (newMonth < 0) {
                newMonth = 11;
                newYear--;
            }

            store.dispatch('reservations/setMonth', newMonth);
            store.dispatch('reservations/setYear', newYear);
            store.dispatch('reservations/fetchReservations');
        };

        return {
            weekDays,
            monthNames,
            currentMonth,
            currentYear,
            calendarDays,
            getConcurrencyCount,
            getConcurrencyColor,
            changeMonth,
            isLoading,
            isToday
        };
    }
};
</script>

<style scoped>
.calendar-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background: #f6f1de;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(35, 35, 47, 0.15);
}

.calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.calendar-header h2 {
    color: #23232f;
    font-weight: 600;
}

.month-navigation {
    display: flex;
    align-items: center;
    gap: 15px;
}

.nav-btn {
    padding: 8px 16px;
    border: none;
    background: #9bada1;
    color: #23232f;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.nav-btn:hover {
    background: #92d8be;
    transform: scale(1.05);
}

.current-month {
    font-size: 1.2em;
    font-weight: 600;
    color: #23232f;
}

.weekdays-header {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    font-weight: 600;
    background: #23232f;
    color: #f6f1de;
    padding: 12px 0;
    border-radius: 8px 8px 0 0;
}

.days-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
    background: #525055;
    padding: 2px;
    border-radius: 0 0 8px 8px;
}

.day-cell {
    aspect-ratio: 2.5;
    padding: 10px;
    background: #f6f1de;
    transition: all 0.3s ease;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
}

.day-cell:hover {
    transform: scale(1.02);
    box-shadow: 0 2px 4px rgba(35, 35, 47, 0.1);
}

.day-content {
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    z-index: 1;
}

.day-number {
    font-weight: 600;
    color: #23232f;
}

.concurrency-count {
    font-size: 0.85em;
    color: #525055;
}

.inactive {
    opacity: 0.4;
}

.loading {
    text-align: center;
    padding: 20px;
    color: #23232f;
    font-weight: 500;
}

.concurrency-legend {
    padding: 15px;
    border-top: 2px solid #525055;
}

.legend-title {
    font-weight: 600;
    margin-bottom: 12px;
    color: #23232f;
    text-align: center;
}

.legend-items {
    display: flex;
    gap: 30px;
    justify-content: center;
}

.legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
}

.color-box {
    width: 24px;
    height: 24px;
    border: 2px solid #525055;
    border-radius: 6px;
    transition: transform 0.3s ease;
}

.color-box:hover {
    transform: scale(1.1);
}

.legend-item span {
    color: #23232f;
    font-weight: 500;
}

@keyframes pulse {
    0% {
        box-shadow: 0 0 0 0 rgba(92, 98, 211, 0.7);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(92, 98, 211, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(92, 98, 211, 0);
    }
}

.pulse-effect::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: radial-gradient(circle, rgba(92, 98, 211, 0.2) 0%, rgba(92, 98, 211, 0) 70%);
    animation: pulse 2s infinite;
}

.pulse-box {
    background: linear-gradient(45deg, #5c62d3, #8186e0);
    animation: pulse 2s infinite;
}
</style>
