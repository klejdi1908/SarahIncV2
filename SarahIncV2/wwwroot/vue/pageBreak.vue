<template>
    <div class="text-center divPageBreak marginTop10 marginBottom10">
        <button @click="toggleBreak" type="button" class="btn btn-info printNo btnPageBreak" :data-frm-po="poIdxLocal">
            <fai :icon="['fas', activePageBreak ? 'cut' : 'th-large' ]"></fai> {{ activePageBreak ? 'Remove' : 'Add' }} Page Break
        </button>
        <div :class="['marginTop50', 'fontBold', (activePageBreak ? '' : 'displayNone'), (activePageBreak ? 'addPageBreak' : '')]">{{ pageBreakText }}</div>
    </div>
</template>
<script>
    import { mapState } from 'vuex'

    export default {
        components: {
        },
        computed: {
            ...mapState(['pageBreaks', 'pageBreaksLoaded', 'pageBreakText', 'poIdx']),
        },
        data() {
            return {
                activePageBreak: 0,
                poIdxLocal: 0
            }
        },
        methods: {
            toggleBreak(evt) {
                this.activePageBreak = !this.activePageBreak;
                this.pageBreaks[this.poIdxLocal] = this.activePageBreak ? 1 : 0;
            }
        },
        mounted() {
            ++this.$store.state.poIdx;
            this.poIdxLocal = this.poIdx;
        },
        props: ['defaultPageBreak', 'deferredIdx'],
        watch: {
            pageBreaks: function () {
                if (this.pageBreaks[this.poIdxLocal] !== undefined) {
                    this.activePageBreak = parseInt(this.pageBreaks[this.poIdxLocal]);
                } else {
                    this.activePageBreak = this.defaultPageBreak ? 1 : 0;
                    this.pageBreaks[this.poIdxLocal] = this.activePageBreak;
                }
            }
        }
    }
</script>
<style>

</style>