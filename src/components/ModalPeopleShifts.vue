<script setup>
import ShiftCard from './ShiftCard.vue';
import { usePeopleStore } from '@/stores/people.store.js';
import { storeToRefs } from 'pinia';
import { format } from 'date-fns';
import { computed } from 'vue';

const peopleDataStore = usePeopleStore();
const {selectedShiftPerson, selectedShiftData} = storeToRefs(peopleDataStore);
const {resetSelectedShiftsData} = peopleDataStore;

const formatDate = computed(() => (date) => format(date, 'dd/MM/yyyy - HH:mm'));

</script>

<template>
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Upcoming shifts</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
         <div class="d-flex flex-row align-items-center mb-3">
           <h5 class="mb-0">{{ selectedShiftPerson?.name }}</h5> <span v-if="!selectedShiftPerson?.active" class="badge bg-danger ms-3">
        Inactive
      </span>
         </div>

          <ShiftCard :class="[{'bg-dark-stripes': !selectedShiftPerson?.active}]" v-for="shift in selectedShiftData" :key="shift.id">
            <dl class="stats small mt-4 mb-0">
              <div class="stats__item">
                <dt class="stats__item--title small">Start</dt>
                <dd>{{ formatDate(shift?.Start) ?? 'N/A' }}</dd>
              </div>
              <div class="stats__item">
                <dt class="stats__item--title small">End</dt>
                <dd>{{ formatDate(shift?.End) ?? 'N/A' }}</dd>
              </div>
              <div class="stats__item">
                <dt class="stats__item--title small">Role</dt>
                <dd>{{ shift?.Role ?? 'N/A' }}</dd>
              </div>
              <div class="stats__item">
                <dt class="stats__item--title small">Location</dt>
                <dd>{{ shift?.Location ?? 'N/A' }}</dd>
                <dd></dd>
              </div>
              <div class="stats__item">
                <dt class="stats__item--title small">Id</dt>
                <dd>{{shift?.PersonId ?? 'N/A'}}</dd>
                <dd></dd>
              </div>
            </dl>
          </ShiftCard>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="resetSelectedShiftsData">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stats {
  $stats-gap: 1rem 3rem;

  display: grid;
  line-height: 1;
  grid-template: repeat(1, 1fr) / repeat(2, 1fr);
  gap: $stats-gap;

  @media only screen and (max-width: 576px) {
    grid-template: repeat(1, 1fr) / repeat(2, 1fr);
  }

  .stats__item {
    display: flex;
    flex-direction: column;

    &--title {
      font-weight: 300;
    }

    &:last-child {
      .stats__item--valu {
        max-width: 200px;
        text-wrap: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}

.bg-dark-stripes {
  background: rgba(0, 0, 0, 5%) repeating-linear-gradient(45deg, transparent, transparent 2rem, rgba(0, 0, 0, 3%) 2rem, rgba(0, 0, 0, 3%) 4rem);
}
</style>
