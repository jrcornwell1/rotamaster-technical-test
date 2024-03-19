<script setup></script>

<template>
  <header id="header" ref="header" class="header bg-white py-2 d-flex align-items-center px-3 px-md-5 position-sticky sticky-top w-100 border-bottom border-dark">
    <div class="d-flex align-items-center bg-white">
      <div class="rotamaster__logo d-flex justify-content-center align-items-center me-3">Logo</div>

      <RouterLink :to="{ name: 'people-directory' }" class="me-3">Home</RouterLink>
      <RouterLink :to="{ name: 'people-directory' }" class="me-3">Shifts</RouterLink>
      <RouterLink :to="{ name: 'people-directory' }" class="me-3">Lorem ipsum</RouterLink>
      <RouterLink :to="{ name: 'people-directory' }" class="me-3">Lorem ipsum</RouterLink>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.rotamaster__logo {
  height: 45px;
  width: 45px;
  background-color: #afafaf;
  border-radius: 50%;
}
</style>
