<script setup>
import { watchEffect } from 'vue'
import { useEventListener } from '@/composables/event'

const props = defineProps({
  open: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits({
  close: null
})

const overflowHiddenClass = 'overflow-hidden'
watchEffect(() => {
  props.open
    ? document.body.classList.add(overflowHiddenClass)
    : document.body.classList.remove(overflowHiddenClass)
})

useEventListener(document, 'keydown', handleKeydown)

const ESCAPE_KEY = 'Escape'
function handleKeydown(event) {
  if (event.key === ESCAPE_KEY) {
    emit('close')
  }
}
</script>

<template>
  <Teleport v-if="open" to="body">
    <div class="modal-backdrop" @click="$emit('close')"></div>

    <div class="modal">
      <slot></slot>
    </div>
  </Teleport>
</template>
