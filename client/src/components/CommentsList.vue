<template>
    <v-card title="Комментарии" variant="flat"/>
    <Comment
        class="mx-auto my-2"
        v-for="comment in comments"
        v-bind:comment="comment"
    />
    <v-card
        class="mx-auto my-2"
        v-if="comments.length == 0"
        title="Нет комментариев"
        />
</template>

<script>
const {toDMY} = require('../utils');
import Comment from './Comment'
export default {
    components: {
        Comment
    },
    props: {
        comments: {
            type: Array,
            required: true
        }
    },
    methods: {
        toDMY: (timestamp) => toDMY(timestamp),
    }
}
</script>