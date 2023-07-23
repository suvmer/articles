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
            v-model="dates"
            range week-start="1"
            preview-format="dd/mm/yyyy"
            format="dd/mm/yyyy"
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
    data: () => ({
        dates: [new Date(Date.now().valueOf() - 30*24*60*60*1000), Date.now()]
    }),
    methods: {
    }
}
</script>