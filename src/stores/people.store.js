import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { format, parseISO } from 'date-fns';

export const usePeopleStore = defineStore('people', () => {
  const isLoading = ref(false);
  const peopleData = ref();
  const shiftsData = ref();

  const selectedShiftData = ref();
  const selectedShiftPerson = ref();


  async function getPeopleData() {
    isLoading.value = true;
    try {
      const { data } = await axios.get('https://run.mocky.io/v3/0c0c684d-f6cb-4832-b5f4-16c6796f950f');
      peopleData.value = data;
    } catch (e) {
      console.error('Error retrieving people data:', e);
    } finally {
      isLoading.value = false;
    }
  }

  async function getShiftsData() {
    isLoading.value = true;
    try {
      const { data } = await axios.get('https://run.mocky.io/v3/91a019a1-318a-45a9-a251-d1df1712a647');
      shiftsData.value = data;
    } catch (e) {
      console.error('Error retrieving people data:', e);
    } finally {
      isLoading.value = false;
    }
  }

  const resetSelectedShiftsData = () => {
    selectedShiftPerson.value = null;
    selectedShiftData.value = null;
  }


  const getSelectedShifts = (person) => {
    resetSelectedShiftsData();
    selectedShiftPerson.value = person;
    selectedShiftData.value = shiftsData.value.filter((shift) => shift.PersonId === person.id);
  }

  return {
    peopleData,
    getPeopleData,
    shiftsData,
    getShiftsData,
    isLoading,
    getSelectedShifts,
    selectedShiftPerson,
    selectedShiftData,
    resetSelectedShiftsData
  };
});
