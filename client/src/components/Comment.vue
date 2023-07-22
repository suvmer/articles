<template>
    <v-list-item
        class="mx-auto my-2 px-3 pa-2"
        :key="comment.id"
        :text="comment.body"
        :title="comment.body"
        append-icon="mdi-pencil"
        variant="outlined"
    >
        <template v-slot:subtitle>
            {{toDMY(comment.createdAt)}}{{comment.createdAt != comment.updatedAt ? ` (Изменён: ${toDMY(comment.createdAt)})` : ''}}
        </template>
        <template v-slot:prepend>
            <v-icon size="x-large">mdi-account-circle</v-icon>
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
        toEdit: {
            type: Object,
            default: {
                body: ""
            }
        }
    },
    mounted() {
        this.newComment = this.toEdit;
    },
    newComment: {
        body: ""
    },
    methods: {
        toDMY: (timestamp) => toDMY(timestamp)
    }
}
</script>