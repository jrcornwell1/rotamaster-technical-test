import { ref, computed } from 'vue';

export default () => {
  const pageSize = ref(10);
  const currentPage = ref(1);
  const paginationLengthValue = ref();

  const indexStart = computed(() => {
    return (currentPage.value - 1) * pageSize.value;
  });

  const indexEnd = computed(() => indexStart.value + pageSize.value);

  const paginated = computed(() => (data) => data?.slice(indexStart.value, indexEnd.value));

  const paginationLength = (length) => {
    paginationLengthValue.value = length;
  }

  const scrollToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const previousPage = () => {
    currentPage.value--;
    scrollToTop();
  };

  const nextPage = () => {
    currentPage.value++;
    scrollToTop();
  };

  const isDisabledPrevious = computed(() => indexStart.value === 0);

  const isDisabledNext = computed(() => indexEnd.value === paginationLengthValue.value || paginationLengthValue.value <= pageSize.value);

  return {
    paginationLength,
    paginated,
    previousPage,
    nextPage,
    isDisabledPrevious,
    isDisabledNext,
  };
};
