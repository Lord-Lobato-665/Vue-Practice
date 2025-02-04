// Importacion de pinia
import { defineStore } from "pinia";

// Creacion del store global a la que podran acceder los componentes que la implementen
// useCounterStore es el nombre de la funcion y "counter" es el nombre que se le asigna al store para acceder a el
export const useCounterStore = defineStore( "counter",{
  // State define los valores reactivos del store
  state: () => ({
    count: 0,
  }),
  // Action define los metodos que modifican el state del store
  actions: {
    increment () {
      this.count++;
    },
    decrement () {
      this.count--;
    },
    reset () {
      this.count = 0;
    }
  },
});
