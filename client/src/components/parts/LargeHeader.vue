<template>
    <div class="large-header">
        <i @click="deleteItem(id)" class="delete">&#9587;</i>
        <template v-if="!editMode">
            <i class="handle">&equiv;</i>
            <span class="edit" @click="edit">Edit</span>
            <h1>{{ details.header }}</h1>
        </template>
        <template v-else>
            <input @keyup.enter="update" type="text" v-model="newHeader"/>
            <button @click="update">Update</button>
        </template>
    </div>
</template>

<script>
import { useLayoutStore } from "@/store/layout";

export default {
    name: "LargeHeader",
    props: {
        details: Object,
        id: Number,
        deleteItem: Function
    },
    setup() {
        const store = useLayoutStore();
        return { store, updateLargeHeader: store.updateLargeHeader };
    },
    data() {
        return {
            editMode: true,
            newHeader: this.details.header
        }
    },
    methods: {
        update() {
            this.updateLargeHeader(this.id, this.newHeader);
            this.editMode = false;
            this.newHeader = this.details.header;
        },
        edit() {
            this.newHeader = this.details.header;
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
    border-bottom: 5px solid #124b99;
    width: 90%;
    padding: 0;
    text-transform: uppercase;
    color: var(--it-blue);
}
</style>