<script setup>
import AppModal from '@/components/app/AppModal.vue'
import AppPagination from '@/components/app/AppPagination.vue'
import usePackages from '@/composables/packages'
import usePaginationVisible from '@/composables/pagination-visible'
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const { packages, filters, totalPages } = usePackages()
const { visible } = usePaginationVisible(10)

let currentPackage = ref({})
const modalIsOpen = ref(false)

function openModal(packageName) {
  currentPackage.value = store.getters['packages/package'](packageName)
  modalIsOpen.value = true
}
</script>

<template>
  <div class="container">
    <div class="packages">
      <h1 class="packages__title">Find the package you need</h1>
      <div class="packages__search">
        <input
          v-model="filters.text"
          type="search"
          class="input packages__input"
          placeholder="Type for searching..."
        />
      </div>

      <div class="packages__table">
        <table class="table-packages">
          <thead class="table-packages__head">
            <tr class="table-packages__head-row">
              <th class="table-packages__head-item table-packages__name">
                Name
              </th>
              <th class="table-packages__head-item table-packages__description">
                Description
              </th>
              <th class="table-packages__head-item table-packages__version">
                Version
              </th>
              <th class="table-packages__head-item table-packages__author">
                Author
              </th>
            </tr>
          </thead>

          <tbody class="table-packages__body">
            <template v-if="packages.length">
              <tr
                v-for="{ package: pack } in packages"
                :key="pack.name"
                class="table-packages__body-row"
                @click="openModal(pack.name)"
              >
                <td class="table-packages__body-item table-packages__name">
                  {{ pack.name }}
                </td>
                <td
                  class="table-packages__body-item table-packages__description"
                >
                  {{ pack.description }}
                </td>
                <td class="table-packages__body-item table-packages__version">
                  {{ pack.version }}
                </td>
                <td class="table-packages__body-item table-packages__author">
                  {{ pack.author?.name }}
                </td>
              </tr>
            </template>
            <tr v-else class="table-packages__body-row">
              <td
                colspan="5"
                class="table-packages__body-item table-packages__empty"
              >
                Packages not found
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <AppPagination
        v-model="filters.page"
        :total="totalPages"
        :visible="visible"
      />
    </div>

    <AppModal v-if="modalIsOpen" @close="modalIsOpen = false">
      <pre>{{ currentPackage }}</pre>
    </AppModal>
  </div>
</template>
