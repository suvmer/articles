<template>
    <v-card title="Оставить комментарий" class="pa-2">
        <v-form @submit.prevent class="pa-2">
          // TODO: comment.body заменить на :value="comment"
            <v-textarea
                v-model="comment.body"
                label="Текст комментария"
                rows="2"
            />
            <v-btn
                color="success"
                class="mt-1"
                block
                @click="addComment"
            >
                Прокомментировать
            </v-btn>
        </v-form>
    </v-card>
</template>

<script>
export default {
    data: () => ({
      // TODO: просто comment
        comment: {
            body: ""
        }
    }),
    props: {
        post_id: {
            type: Number,
          // TODO: default: null,
            required: true
        },
        isEditing: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        addComment() {
            this.$store.dispatch('createComment', {...this.comment, post_id: this.post_id});
            this.comment = {
                body: ""
            };
        }
    }
}
</script>