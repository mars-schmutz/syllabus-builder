<template>
    <div class="large-header-text">
        <i class="delete" @click="deleteItem(id)">&#9587;</i>
        <template v-if="!editMode">
            <i class="handle">&equiv;</i>
            <span @click="edit">Edit</span>
            <h1>{{ details.header }}</h1>
            <p>{{ details.text }}</p>
        </template>
        <template v-else>
            <input type="text" v-model="newHeader" />
            <textarea @keyup.alt.enter="update" rows="5" cols="40" v-model="newText"></textarea>
            <button @click="update">Update</button>
        </template>
    </div>
</template>

<script>
    import { useLayoutStore } from "@/store/layout";

    export default {
        name: 'LargeHeaderText',
        props: {
            details: Object,
            id: Number,
            deleteItem: Function
        },
        setup() {
            const store = useLayoutStore();
            return { store, updateLargeHeaderText: store.updateLargeHeaderText };
        },
        data() {
            return {
                editMode: true,
                newHeader: this.details.header,
                newText: this.details.text
            }
        },
        methods: {
            update() {
                this.updateLargeHeaderText(this.id, this.newHeader, this.newText);
                this.editMode = false;
                this.newHeader = this.details.header;
                this.newText = this.details.text;
            },
            edit() {
                this.newHeader = this.details.header;
                this.newText = this.details.text;
                this.editMode = true;
            }
        }
    }
</script>

<style scoped>
div {
    border: 1px solid black;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    margin: 0 auto;
    width: 50%;
}

div input, div textarea, div button {
    margin-top: 0.125rem;
    margin-bottom: 0.125rem;
}
</style>