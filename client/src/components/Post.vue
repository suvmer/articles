<template>
    <div>
        <v-card
            class="mx-auto my-2"
            :key="post.id"
            :to='showLink ? "" : "/post/"+post.id'
        >
            <template v-slot:title>
                <v-card-title :class="expanded ? 'text-wrap' : ''">{{ !isEditing ? newPost.title : "" }}</v-card-title>
                <v-text-field
                    v-if="isEditing"
                    v-model="newPost.title"
                    label="Название статьи"
                    required
                />
            </template>
            <template v-slot:prepend>
                <v-icon size="x-large">mdi-post-outline</v-icon>
            </template>
            <template v-slot:append>
                <v-icon v-if="!isEditing" @click="$event.preventDefault(); isEditing = true">mdi-pencil</v-icon>
                <v-icon v-else @click="isEditing = false; editPost()">mdi-check-bold</v-icon>
                <DeleteIcon class="ms-2" @onDelete="deletePost"/>
            </template>

            <v-card-text style="line-height: 1.7rem;" class="text-h5 py-2 ">
                <v-list-item-title class="text-wrap">{{ !isEditing ? newPost.body : "" }}</v-list-item-title>
                <v-textarea
                    v-if="isEditing"
                    v-model="newPost.body"
                    label="Текст статьи"
                />
            </v-card-text>

            <v-card-actions>
                <v-list-item class="w-100">
                    <v-icon class="me-2" icon="mdi-comment-multiple-outline"/>
                    <span class="subheading me-2">{{post.comments.length}}</span>
                    <template v-slot:append>
                        <div class="justify-self-end">
                            <v-list-item-subtitle>{{getTimeCreated(newPost)}}</v-list-item-subtitle>
                        </div>
                    </template>
                </v-list-item>
            </v-card-actions>
        </v-card>
        <CommentForm class="mt-10" v-if="commentFormShowing" v-bind:post_id="post.id"/>
        <CommentsList class="mt-2" v-if="expanded" :noCommentTitle="noCommentTitle" v-bind:comments="post.comments"/>
    </div>
</template>

<script>
import DeleteIcon from './DeleteIcon'
import CommentForm from './CommentForm'
const {toDMY} = require('../utils');
export default {
    components: {
        DeleteIcon, CommentForm
    },
    beforeCreate() { //HACK to avoid circular dependency
       this.$options.components.CommentsList = require('./CommentsList').default
    },
    computed: {
        showLink() {
            return (this.isEditing || this.commentFormShowing);
        },
        commentFormShowing() {
            return (this.expanded && this.showCommentsForm);
        }
    },
    props: {
        post: {
            type: Object,
            required: true
        },
        expanded: {
            type: Boolean,
            default: false
        },
        showCommentsForm: {
            type: Boolean,
            default: true
        },
        noCommentTitle: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        this.newPost = this.post;
    },
    data: () => ({
        newPost: {},
        isEditing: false
    }),
    methods: {
        toDMY: (timestamp) => toDMY(timestamp),
        editPost() {
            this.newPost = {...this.newPost, updatedAt: Date.now().valueOf()}
            this.$store.dispatch('editPost', this.newPost)
        },
        deletePost() {
            this.$store.dispatch('deletePost', this.newPost);
            if(this.showLink)
                this.$router.back();
        },
        getTimeCreated(post) {
            return `${toDMY(post.createdAt)}${post.createdAt != post.updatedAt ? ` (Изменён: ${toDMY(post.updatedAt)})` : ``}`;
        }
    }
}
</script>