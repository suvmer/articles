<template>
    <v-icon :class="$attrs.class" v-if="stage == 0" @click="$event.preventDefault();this.stage = 1">mdi-delete</v-icon>
    <v-icon :class="$attrs.class" v-if="stage == 1" @click="$event.preventDefault();this.stage = 2">mdi-delete-sweep</v-icon>
    <v-icon :class="$attrs.class" v-if="stage == 2" @click="$event.preventDefault();this.$emit('onDelete'); this.stage = 0">mdi-delete-alert</v-icon>
</template>

<script>
export default {
    data: () => ({
       stage: 0
    })
}
</script>