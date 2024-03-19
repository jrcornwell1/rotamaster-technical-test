<script setup>
import ContainerFixed from '@/components/ContainerFixed.vue';
import IconArrowUp from '@/components/icons/IconArrowUp.vue';
import IconArrowDown from '@/components/icons/IconArrowDown.vue';
import IconFilter from '@/components/icons/IconFilter.vue';
import { usePeopleStore } from '../stores/people.store.js';
import { computed, ref, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import ModalPeopleShifts from '@/components/ModalPeopleShifts.vue';
import AppNoResults from '@/components/AppNoResults.vue';
import IconAction from '@/components/icons/IconAction.vue';
import usePagination from '../composables/pagination.js';

const peopleDataStore = usePeopleStore();
const {peopleData, isLoading} = storeToRefs(peopleDataStore);
const {getPeopleData, getShiftsData, getSelectedShifts} = peopleDataStore;

const {paginated, previousPage, nextPage, isDisabledNext, isDisabledPrevious, paginationLength} = usePagination();

// Calls data on load
getPeopleData();
getShiftsData();

const TABLE_KEYS = {
  NAME: 'name',
  DOB: 'DateOfBirth',
  START_DATE: 'StartDate',
  STATUS: 'active',
}

const isAscendingName = ref(false);
const isDescendingName = ref(false);
const isAscendingStartDate = ref(false);
const isDescendingStartDate = ref(false);
const isAscendingDob = ref(false);
const isDescendingDob = ref(false);
const isAscendingStatus = ref(false);
const isDescendingStatus = ref(false);

const resetFilters = () => {
  isAscendingName.value = false;
  isDescendingName.value = false;
  isAscendingStartDate.value = false;
  isDescendingStartDate.value = false;
  isAscendingDob.value = false;
  isDescendingDob.value = false;
  isAscendingStatus.value = false;
  isDescendingStatus.value = false;
}

const isActive = computed(() => (active) => (active ? 'Active' : 'Inactive'));

const searchQuery = ref();
const searchData = computed(() => peopleData.value?.filter((item) => item.name?.toLowerCase()?.includes(searchQuery.value?.toLowerCase())));

// Checks to see if search query and displays data
const tableData = computed(() => {
  return searchQuery.value?.length >= 3 ? searchData.value : peopleData.value;
});

// Init pagination length
paginationLength(tableData.value?.length);

watchEffect(() => {
  if(searchQuery.value?.length >= 3){
    paginationLength(tableData.value?.length);
  } else {
    paginationLength(tableData.value?.length)
  }
});



const noResults = computed(() => searchQuery.value?.length >=3 && searchData.value.length === 0)

// Sorts by ascending and descending
const sortByAscending = (value) => {
  resetFilters();
  if(value === TABLE_KEYS.NAME){
    peopleData.value?.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    isAscendingName.value = true;
  }
  if(value === TABLE_KEYS.DOB){
    peopleData.value?.sort((a,b) => (a.DateOfBirth > b.DateOfBirth) ? 1 : ((b.DateOfBirth > a.DateOfBirth) ? -1 : 0));
    isAscendingDob.value = true;
  }

  if(value === TABLE_KEYS.START_DATE){
    peopleData.value?.sort((a,b) => (a.StartDate > b.StartDate) ? 1 : ((b.StartDate > a.StartDate) ? -1 : 0));
    isAscendingStartDate.value = true;
  }

  if(value === TABLE_KEYS.STATUS){
    peopleData.value?.sort((a,b) => (a.active > b.active) ? 1 : ((b.active > a.active) ? -1 : 0)).reverse();
    isAscendingStatus.value = true;
  }
}

const sortByDescending = (value) => {
  resetFilters()
  if(value === TABLE_KEYS.NAME){
    peopleData.value?.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).reverse();
    isDescendingName.value = true;
  }

  if(value === TABLE_KEYS.DOB){
    peopleData.value?.sort((a,b) => (a.DateOfBirth > b.DateOfBirth) ? 1 : ((b.DateOfBirth > a.DateOfBirth) ? -1 : 0)).reverse();
    isDescendingDob.value = true;
  }

  if(value === TABLE_KEYS.START_DATE){
    peopleData.value?.sort((a,b) => (a.StartDate > b.StartDate) ? 1 : ((b.StartDate > a.StartDate) ? -1 : 0)).reverse();
    isDescendingStartDate.value = true;
  }

  if(value === TABLE_KEYS.STATUS){
    peopleData.value?.sort((a,b) => (a.active > b.active) ? 1 : ((b.active > a.active) ? -1 : 0));
    isDescendingStatus.value = true;
  }
}

</script>

<template>
  <template v-if="isLoading"> loading... </template>
  <template v-else>
    <ContainerFixed>
      <nav class="navbar navbar-light bg-light">
          <form class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Type to search name..." aria-label="Search" v-model="searchQuery">
          </form>
      </nav>
      <template v-if="noResults">
        <div class="d-flex justify-content-center">
          <AppNoResults />
        </div>
      </template>
      <table v-else class="table table-striped table-bordered table-responsive">
        <thead>
          <tr>
            <th scope="col">
              <div class="d-flex align-items-center">
                <span class="me-2">Name <IconArrowUp v-if="isAscendingName" /> <IconArrowDown v-else-if="isDescendingName" /></span>
                <button class="btn btn-outline-none dropdown-toggle" type="button" data-toggle="dropdown" data-bs-toggle="dropdown" aria-expanded="false">:</button>
                <ul class="dropdown-menu">
                  <li>
                    <button class="dropdown-item" @click="sortByAscending(TABLE_KEYS.NAME)"><IconArrowUp />Ascending</button>
                  </li>
                  <li>
                    <button class="dropdown-item" @click="sortByDescending(TABLE_KEYS.NAME)"> <IconArrowDown />Descending</button>
                  </li>
                </ul>
              </div>
            </th>
            <th scope="col">
              <div class="d-flex align-items-center">
                <span class="me-2">Date of birth <IconArrowUp v-if="isAscendingDob" /> <IconArrowDown v-else-if="isDescendingDob" /></span>
                <button class="btn btn-outline-none dropdown-toggle" type="button" data-toggle="dropdown" data-bs-toggle="dropdown" aria-expanded="false">:</button>
                <ul class="dropdown-menu">
                  <li>
                    <button class="dropdown-item" @click="sortByAscending(TABLE_KEYS.DOB)"><IconArrowUp />Ascending</button>
                  </li>
                  <li>
                    <button class="dropdown-item" @click="sortByDescending(TABLE_KEYS.DOB)"> <IconArrowDown /> Descending</button>
                  </li>
                </ul>
              </div>
            </th>
            <th scope="col">
              <div class="d-flex align-items-center">
                <span class="me-2">Start date <IconArrowUp v-if="isAscendingStartDate" /> <IconArrowDown v-else-if="isDescendingStartDate" /></span>
                <button class="btn btn-outline-none dropdown-toggle" type="button" data-toggle="dropdown" data-bs-toggle="dropdown" aria-expanded="false">:</button>
                <ul class="dropdown-menu">
                  <li>
                    <button class="dropdown-item" @click="sortByAscending(TABLE_KEYS.START_DATE)"><IconArrowUp />Ascending</button>
                  </li>
                  <li>
                    <button class="dropdown-item" @click="sortByDescending(TABLE_KEYS.START_DATE)"> <IconArrowDown /> Descending</button>
                  </li>
                </ul>
              </div>
            </th>
            <th scope="col">
              <div class="d-flex align-items-center">
                <span class="me-2">Status <IconArrowUp v-if="isAscendingStatus" /> <IconArrowDown v-else-if="isDescendingStatus" /></span>
                <button class="btn btn-outline-none dropdown-toggle" type="button" data-toggle="dropdown" data-bs-toggle="dropdown" aria-expanded="false">:</button>
                <ul class="dropdown-menu">
                  <li>
                    <button class="dropdown-item" @click="sortByAscending(TABLE_KEYS.STATUS)"><IconArrowUp />Ascending</button>
                  </li>
                  <li>
                    <button class="dropdown-item" @click="sortByDescending(TABLE_KEYS.STATUS)"> <IconArrowDown /> Descending</button>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#"><IconFilter /> Filter</a>
                  </li>
                </ul>
              </div>
            </th>
            <th scope="col">
              <div class="d-flex align-items-center">
                <span class="me-2">Action <IconArrowUp v-if="isAscendingStatus" /> <IconArrowDown v-else-if="isDescendingStatus" /></span>
                <div class="action-icon">
                  <IconAction class=""/>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="fw-normal" v-for="person in paginated(tableData)" :key="person?.id">
            <td>{{ person?.name ?? 'N/A' }}</td>
            <td>{{ person?.DateOfBirth ?? 'N/A' }}</td>
            <td>{{ person?.StartDate ?? 'N/A' }}</td>
            <td class="fw-semibold" :class="[{ 'text-success': person?.active }, { 'text-danger': !person?.active }]">{{ isActive(person?.active) ?? 'N/A' }}</td>
            <td><ModalPeopleShifts :person="person" /> <button type="button" class="btn btn-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="getSelectedShifts(person)">View shifts</button></td>
          </tr>
        </tbody>
      </table>
      <nav v-if="!noResults" class="d-flex justify-content-center py-3">
        <ul class="pagination">
          <li class="page-item">
            <button class="page-link" @click="previousPage"  :class="[{'disabled': isDisabledPrevious}]">Previous</button>
          </li>
          <li class="page-item" :class="[{'disabled': isDisabledNext}]">
            <button class="page-link" @click="nextPage">Next</button>
          </li>
        </ul>
      </nav>
    </ContainerFixed>
  </template>
</template>

<style lang="scss">
.action-icon {
  padding: 0.375rem 0.75rem;
}
</style>
