<template>
    <v-list-item
        class="mx-auto my-2 px-3 pa-2"
        :key="comment.id"
        variant="outlined"
    >
        <template v-slot:title>
            {{ !isEdit ? comment.body : "" }}
            <v-textarea
                v-if="isEdit"
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
            <v-icon v-if="!isEdit" @click="isEdit = true">mdi-pencil</v-icon>
            <v-icon v-else @click="isEdit = false; editComment()">mdi-check-bold</v-icon>
        </template>
    </v-list-item>
    
</template>

<script>
const {toDMY} = require('../utils');
export default {
    props: {
        comment: {
            type: Object,
            required: true
        },
        isEdit: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        this.newComment = this.comment;
        this.isEditing = this.isEdit;
    },
    data: () => ({
        newComment: {},
        isEditing: false
    }),
    methods: {
        toDMY: (timestamp) => toDMY(timestamp),
        editComment() {
            console.log(this.newComment)
            this.newComment = {...this.newComment, updatedAt: Date.now().valueOf()}
            this.$parent.$parent.$parent.$emit('editComment', this.newComment)
        }
    }
}
</script>