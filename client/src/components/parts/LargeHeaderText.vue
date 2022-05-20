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
    padding: 0.5rem;
    margin: 0 auto;
}

h1 {
    border-bottom: 5px solid var(--it-blue);
    color: var(--it-blue);
    width: 90%;
    padding: 0;
    text-transform: uppercase;
}

p {
    width: 90%;
    padding: 0;
    margin: 0 auto;
    margin-top: 1rem;
}

div input, div textarea, div button {
    margin-top: 0.125rem;
    margin-bottom: 0.125rem;
    display: block;
}
</style>