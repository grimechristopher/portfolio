<template>
    <div class="modal-overlay" @click="hideModal()">
        <div class="buttons-container">
            <div class="resume-menu" @click="event => event.stopPropagation()"
                :class="{ 'hide-buttons': !showButtonMenu }">
            </div>
            <button @click="printResume('resume-print')">Print</button>
            <button @click="hideModal()">Back</button>
        </div>
        <div id="modal-resume" class="modal" :class="{ 'close': modalHidden }" @click="event => event.stopPropagation()">
            <ResumeContent />
        </div>
    </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import ResumeContent from './ResumeContent.vue';

const emit = defineEmits(['closeResumeModal',]);
const showButtonMenu = ref(false);
const modalHidden = ref(false);

onMounted(() => {
    document.body.style.overflow = 'hidden';
});

onUnmounted(() => {
    document.body.style.overflow = '';
});

function printResume(resumeDivId) {
    const resumeDiv = document.getElementById(resumeDivId);
    const printWindow = window.open('', '', 'height=500,width=800');

    // Write the document for the print window
    // Date of now in yyyymmdd_hhmmss format
    const now = new Date();
    const date = now.toISOString().replace("T","_").substring(0, 19);
    printWindow.document.write(`<html><head><title>Resume_Chris_Grime_${date}</title>`);

    // Get all stylesheets from the current document and apply them to the print window
    const styles = document.querySelectorAll('style, link[rel="stylesheet"]');
    for (let i = 0; i < styles.length; i++) {
        printWindow.document.write(styles[i].outerHTML);
    }

    printWindow.document.write('</head><body>');
    printWindow.document.write(resumeDiv.outerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();

    printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    };
}

function hideModal() {
    modalHidden.value = true;
    // wait 0.5s
    setTimeout(() => {
        emit('closeResumeModal');
    }, 500);
}
</script>
<style scoped>
@keyframes slideInFromTop {
    0% {
        transform: translateY(-100%);
    }

    100% {
        transform: translateY(0);
    }
}

@keyframes slideOutToTop {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(-100%);
    }
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    max-width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: background-color 0.5s ease-in-out;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    overflow-y: scroll;
    padding-bottom: 1.33in;
    z-index: 2;
}

.modal {
    margin-top: 0.5in;
    margin-bottom: 0.5in;
    animation: slideInFromTop 0.5s ease-in-out;
}

.modal.close {
    animation: slideOutToTop 0.5s ease-in-out;
}

.resume-menu {
    display: flex;
    flex-direction: column;
}

.modal {
    width: 100vw;
    min-height: fit-content;
    /* height: 11in; */
    /* min-height: 11in; */
    background-color: #FFFFFF;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0), 0 6px 20px 0 rgba(0, 0, 0);
}

.buttons-container {
    position: fixed;
    bottom: 0;
    right: 0;
    padding: 0.33em;
    margin: 0.5em;
    display: flex;
    flex-direction: column;
    justify-content: right;
    z-index: 2;
}

.hide-buttons {
    display: none;

}

button {
    margin: 0.33em;
    padding: 15px 20px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    background-color: var(--cg-blue);
    border: none;
    border-radius: 15px;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    cursor: pointer;
}

button:hover {
    background-color: var(--cg-blue-hover);
    box-shadow: 0 15px 20px rgba(0, 0, 0, 0.3);
    /* transform: translateY(-7px); */
}

/* Media style for screens wider than 8.5in */
@media screen and (min-width: 11.5in) {
    .modal {
        margin: 0.5in;
    }

}

@media screen and (min-width: 10.5in) {
    .modal-overlay {
        padding: 1in 0;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .modal {
        width: 8.5in;
        min-height: 11in;
    }

    .buttons-container {
        top: 0;
        padding-top: 1in;
        margin-top: 0;
        /* margin-right: 1in; */
    }

    .hide-buttons {
        display: flex;
    }

    .hovering-button {
        display: none;
    }
}

@media print {
    .container-fullscreen {
        display: none !important;
        /* height: 0; */
    }

    .resume-print {
        display: block;
        /* position: relative; */
    }

    .modal-overlay {
        padding: 0;
        margin: 0;
        background-color: rgba(0, 0, 0, 0);
        position: static;
    }

    .modal {
        width: 8.5in;
        min-height: 11in;
        display: block;
    }

    .buttons-container {
        display: none;
    }

    .hovering-button {
        display: none;
    }
}
</style>