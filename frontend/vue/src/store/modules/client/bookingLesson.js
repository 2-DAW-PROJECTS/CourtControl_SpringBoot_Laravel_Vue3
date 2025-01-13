import Constant from '@/Constant';
import { bookingLessonService } from '@/services/client/bookingLessonService';
import { createToaster } from '@meforma/vue-toaster';

const toaster = createToaster({ position: 'top-right', duration: 2300 });

export const bookingLesson = {
  namespaced: true,
  state: {
    loading: false,
    error: null,
  },
  mutations: {
    [Constant.SET_LOADING](state, status) {
      state.loading = status;
    },
    [Constant.SET_ERROR](state, error) {
      state.error = error;
    },
  },
  actions: {
    async bookLesson({ commit }, bookingData) {
      commit(Constant.SET_LOADING, true);
      try {
        // Hacemos la reserva a través del servicio
        const response = await bookingLessonService.bookLesson(bookingData);
        
        if (response) {
          // Si la respuesta es exitosa, mostramos un mensaje de éxito
          toaster.success('Reserva realizada con éxito');
          return response;
        } else {
          throw new Error('Error en la reserva');
        }
      } catch (error) {
        // Si ocurre un error, lo manejamos aquí
        commit(Constant.SET_ERROR, error.message);
        toaster.error('Error al hacer la reserva');
        console.error('Error al hacer la reserva:', error);

        // Si el error es un 403, se muestra un mensaje de acceso denegado
        if (error.message.includes('403')) {
          toaster.error('No tienes permisos para realizar esta acción');
        }
      } finally {
        commit(Constant.SET_LOADING, false);
      }
    },
  },
  getters: {
    isLoading: (state) => state.loading,
    getError: (state) => state.error,
  },
};
