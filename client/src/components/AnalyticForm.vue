<template>
    <v-card title="Анализ комментариев" class="pa-2 overflow-visible" style="z-index: 10;">
        <VueDatePicker
            locale="ru"
            :enable-time-picker="false"
            :auto-apply="true"
            :close-on-auto-apply="false"
            placeholder="Выберите отрезок времени"
            select-text="Выбрать"
            cancel-text="Отмена"
            v-model="newDates"
            range
            week-start="1"
            format="dd/MM/yyyy"
            @update:model-value="handleDate"
        />
    </v-card>
</template>

<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default {
    components: {
        VueDatePicker
    },
    props: {
        dates: {
            default: [new Date(Date.now().valueOf() - 30*24*60*60*1000), Date.now()]
        }
    },
    data: () => ({
        newDates: []
    }),
    mounted() {
        this.newDates = this.dates
    },
    methods: {
        handleDate(newValue) {
            this.newDates = newValue;
            this.$emit('selectDates', newValue);
        }
    }
}
</script>