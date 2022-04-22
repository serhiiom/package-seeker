<script setup>
import { useEventListener } from '../../composables/event'

const emit = defineEmits({
  close: null
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
  <teleport to="body">
    <div class="modal-backdrop" @click="$emit('close')"></div>

    <div class="modal">
      <slot></slot>
    </div>
  </teleport>
</template>
