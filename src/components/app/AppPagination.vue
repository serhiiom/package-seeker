<script setup>
import usePagination from '@/composables/pagination'

const props = defineProps({
  modelValue: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  visible: {
    type: Number,
    default: 5
  }
})

const emit = defineEmits({
  'update:modelValue': null
})

const { pages, isFirst, isLast, isActive, changePage } = usePagination(
  props,
  emit
)
</script>

<template>
  <ul v-if="props.total" class="pagination">
    <li class="pagination__item">
      <button
        :disabled="isFirst"
        class="pagination__btn"
        @click="changePage(1)"
      >
        &lt;&lt;
      </button>
    </li>
    <li class="pagination__item">
      <button
        :disabled="isFirst"
        class="pagination__btn"
        @click="changePage(modelValue - 1)"
      >
        &lt;
      </button>
    </li>

    <li v-for="page in pages" :key="page" class="pagination__item">
      <button
        :class="['pagination__btn', { active: isActive(page) }]"
        @click="changePage(page)"
      >
        {{ page }}
      </button>
    </li>
    <li class="pagination__item">
      <button
        :disabled="isLast"
        class="pagination__btn"
        @click="changePage(modelValue + 1)"
      >
        &gt;
      </button>
    </li>
    <li class="pagination__item">
      <button
        :disabled="isLast"
        class="pagination__btn"
        @click="changePage(total)"
      >
        &gt;&gt;
      </button>
    </li>
  </ul>
</template>
