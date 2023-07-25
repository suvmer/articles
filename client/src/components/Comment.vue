<template>
    <v-list-item
        class="mx-auto my-2 px-3 pa-2"
        variant="outlined"
    >
        <template v-slot:title>
            <v-list-item-title class="text-wrap">{{ !isEditing ? newComment.body : "" }}</v-list-item-title>
            <v-textarea
                v-if="isEditing"
                v-model="newComment.body"
                label="Текст комментария"
            />
        </template>

        <template v-slot:subtitle>
            {{toDMY(comment.createdAt)}}{{newComment.createdAt != newComment.updatedAt ? ` (Изменён: ${toDMY(newComment.updatedAt)})` : ''}}
        </template>
        <template v-slot:prepend>
            <v-icon size="x-large">mdi-account-circle</v-icon>
        </template>
        <template v-slot:append>
            <v-icon v-if="!isEditing" @click="isEditing = true">mdi-pencil</v-icon>
            <v-icon v-else @click="isEditing = false; editComment()">mdi-check-bold</v-icon>
            <DeleteIcon class="ms-2" @onDelete="this.$store.dispatch('deleteComment', newComment); /*this.$router.back();*/"/>
        </template>
    </v-list-item>
</template>

<script>
const {toDMY} = require('../utils');
import DeleteIcon from './DeleteIcon';
export default {
    components: {
        DeleteIcon
    },
    props: {
        comment: {
            type: Object,
            required: true
        }
    },
    mounted() {
        this.newComment = this.comment;
    },
    data: () => ({
        newComment: {},
        isEditing: false
    }),
    methods: {
        toDMY: (timestamp) => toDMY(timestamp),
        editComment() {
            this.newComment = {...this.newComment, updatedAt: Date.now().valueOf()}
            this.$store.dispatch('editComment', this.newComment)
        }
    }
}
</script>