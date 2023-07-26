<template>
    <div>
        <v-card :title="!noCommentTitle ? 'Комментарии' : ''" variant="flat"/>
        <Comment
            v-if="!groupped"
            class="mx-auto my-2"
            v-for="comment in comments"
            :key="comment.id"
            v-bind:comment="comment"
            v-bind:expanded="expanded"
        />
        <Post
            v-if="groupped"
            v-for="comments in commentsGroups"
            v-bind:post="{...comments[0].Post, comments: comments}"
            :key="comments[0].Post.id"
            :expanded="true"
            :noCommentTitle="true"
            :showCommentsForm="showCommentsForm"
            class="mx-auto ma-2 mt-4"
        ></Post>
        <v-card
            class="mx-auto my-2"
            v-if="comments.length == 0"
            title="Нет комментариев"
            />
    </div>
</template>

<script>
import Post from './Post'
import Comment from './Comment';
export default {
    components: {
        Post, Comment
    },
    props: {
        comments: {
            type: Array,
            required: true
        },
        expanded: {
            default: false
        },
        groupped: {
            default: false
        },
        noCommentTitle: {
            default: false
        },
        showCommentsForm: {
            default: true
        }
    },
    computed: {
        commentsGroups() {
            return this.comments.reduce((acc, cur) => { //groupping by post: [[com1_1, com2_1], [com1_2], [com1_3, com2_3], ...]
                if(acc.prev != cur.post_id)
                    return {prev: cur.post_id, comments: [...acc.comments, [cur]]}
                return {prev: cur.post_id, comments: acc.comments.map((el, ind) => ind == acc.comments.length - 1 ? [...el, cur] : el)}
            }, {prev: null, comments: []}).comments;
        }
    }
}
</script>