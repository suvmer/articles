<template>
    <v-card title="Анализ комментариев" class="pa-2 overflow-visible" style="z-index: 10;">
        <VueDatePicker
            locale="ru"
            :enable-time-picker="false"
            placeholder="Выберите отрезок времени"
            select-text="Выбрать"
            cancel-text="Отмена"
            v-model="dates"
            range week-start="1"
            :on-click-outside="onClickOutside"
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
        onClickOutside() { //HACK to save selected date on click outside :)
            var element = document.querySelectorAll(".dp__action_buttons > .dp__action_button");
            element[1].click();
            element[0].click();
            console.log(this.dates)
        }
    }
}
</script>