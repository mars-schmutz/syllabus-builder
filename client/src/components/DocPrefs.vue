<template>
    <div id="settings">
        <h1>Settings</h1>
        <div>
            <label>Page numbers</label>
            <input type="checkbox" v-model="usePageNumbers">
        </div>
        <button @click="downloadPdf">Download PDF</button>
    </div>
</template>

<script>
import { usePrefsStore } from "@/store/prefs";
import { storeToRefs } from "pinia";

export default {
    name: 'DocsPrefs',

    setup() {
        const store = usePrefsStore();
        const { usePageNumbers } = storeToRefs(store);

        return {
            store,
            usePageNumbers,
        }
    },

    methods: {
        downloadPdf() {
            var data = "name=" + encodeURIComponent("mersh");

            fetch("http://localhost:3000/download", {
                method: "POST",
                body: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function(response) {
                return response.blob()
            }).then(function(blob) {
                const url = window.URL.createObjectURL(blob);
                window.open(url);
                // S.O. said to revoke url otherwise it points to same Blob, but apparently it still updates pdf blob when commented out
                // window.URL.revokeObjectURL(url);
            })
        },
    }
}
</script>
