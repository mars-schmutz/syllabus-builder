import { defineStore } from 'pinia'

export const usePrefsStore = defineStore('prefs', {
    state: () => ({
        usePageNumbers: true,
    }),

    actions: {
        togglePageNumbers() {
            this.usePageNumbers = !this.usePageNumbers;
        },
    }
})