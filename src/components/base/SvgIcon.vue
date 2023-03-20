<template>
  <svg class="svg-icon" :class="className" :style="iconStyle" v-bind="$attrs" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
  name: {
    type: String,
    default: null
  },
  color: {
    type: String,
    default: null
  },
  size: {
    type: String,
    default: '16px'
  },
  className: {
    type: String,
    default: null
  }
})

const symbolId = computed(() => {
  return `#icon-${props.name}`
})

const iconStyle = computed(() => {
  return {
    fontSize: props.size,
    fill: props.color
  }
})
</script>

<style scoped lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}
</style>
