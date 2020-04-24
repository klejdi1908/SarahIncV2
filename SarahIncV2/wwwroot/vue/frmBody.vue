<template>
    <div :id="'divSection' + secNum" class="marginTop25">
        <div style="width:100%;">
            <div class="fontBold text-center borderStd fontSize22 padding5">{{ sectionHeaders[parseInt(secNum) - 1] }}</div>
        </div>
        <div v-if="!hasRoutine" v-for="(frmAreaBody, f) in frmAreaBodies">
            <div :class="['marginTop10', 'frmArea']" :data-frm-area="frmAreaBodies[f].name" v-html="frmAreaBodies[f].value"></div>
            <span @click="editFrmArea" class="cursorPointer frmAreaEdit optional printNo">[Edit Section]</span>
            <page-break :defaultPageBreak="defaultPageBreakSet[0]"></page-break>
        </div>
        <div v-if="hasRoutine" v-for="(frmAreaRoutine, f) in frmAreaRoutines">
            <div class="fontBold text-center borderStd padding5" style="width:80%;margin:20px auto;">{{ routineHeaders[f] }}</div>
            <div :class="['marginTop10', 'frmArea']" :data-frm-area="frmAreaRoutines[f].name" v-html="frmAreaRoutines[f].value"></div>
            <span @click="editFrmArea" class="cursorPointer frmAreaEdit optional printNo">[Edit Section]</span>
            <further-developments :toggle-exclude="toggleExclude" :start="8*f"></further-developments>
            <page-break :defaultPageBreak="defaultPageBreakSet[f+3]"></page-break>
        </div>
    </div>
</template>
<script>
    import { mapMutations, mapActions, mapState } from 'vuex'
    import furtherDevelopments from './furtherDevelopments.vue'
    import pageBreak from './pageBreak.vue'

    export default {
        components: {
            furtherDevelopments, pageBreak  
        },
        computed: {
            ...mapState(['nextSteps', 'pageBreaks', 'routineHeaders', 'sectionHeaders', 'formAreas']),
            frmAreaBodies: function () {
                return this.formAreas.filter((e) => {
                    return e.name === this.secName;
                })
            },
            frmAreaRoutines: function () {
                return this.formAreas.filter((e) => {
                    return e.name.substr(6, 4) === 'Narr';
                })
            }
        },
        methods: {
        },
        mounted() {

        },
        props: ['defaultPageBreakSet', 'editFrmArea', 'hasRoutine', 'secNum', 'secName', 'toggleExclude']
    }
</script>
<style>

</style>