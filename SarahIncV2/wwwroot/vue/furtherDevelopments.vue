<template>
    <div>
        <div class="marginTop10">
            To further <span data-frm-calc="frmChildAlias"></span>'s development, you might try:
            <h3 class="fontBold marginTop5 printNo">Adaptive:</h3>
            <ul>
                <li @click="toggleExclude" class="printNo cursorPointer liDev exclude" v-for="(ns, i) in nextSteps[parseInt(start)]">
                    <span class="spnNextStep" v-html="ns"></span>
                </li>
            </ul>
            <h3 class="fontBold marginTop5 printNo">Personal Social:</h3>
            <ul>
                <li @click="toggleExclude" class="printNo cursorPointer liDev exclude" v-for="(ns, i) in nextSteps[parseInt(start) + 1]">
                    <span class="spnNextStep" v-html="ns"></span>
                </li>
            </ul>
            <h3 class="fontBold marginTop5 printNo">Receptive Communication:</h3>
            <ul>
                <li @click="toggleExclude" class="printNo cursorPointer liDev exclude" v-for="(ns, i) in nextSteps[parseInt(start) + 2]">
                    <span class="spnNextStep" v-html="ns"></span>
                </li>
            </ul>
            <h3 class="fontBold marginTop5 printNo">Expressive Communication:</h3>
            <ul>
                <li @click="toggleExclude" class="printNo cursorPointer liDev exclude" v-for="(ns, i) in nextSteps[parseInt(start) + 3]">
                    <span class="spnNextStep" v-html="ns"></span>
                </li>
            </ul>
            <h3 class="fontBold marginTop5 printNo">Gross Motor:</h3>
            <ul>
                <li @click="toggleExclude" class="printNo cursorPointer liDev exclude" v-for="(ns, i) in nextSteps[parseInt(start) + 4]">
                    <span class="spnNextStep" v-html="ns"></span>
                </li>
            </ul>
            <h3 class="fontBold marginTop5 printNo">Fine Motor:</h3>
            <ul>
                <li @click="toggleExclude" class="printNo cursorPointer liDev exclude" v-for="(ns, i) in nextSteps[parseInt(start) + 5]">
                    <span class="spnNextStep" v-html="ns"></span>
                </li>
            </ul>
            <h3 class="fontBold marginTop5 printNo">Cognitive:</h3>
            <ul>
                <li @click="toggleExclude" class="printNo cursorPointer liDev exclude" v-for="(ns, i) in nextSteps[parseInt(start) + 6]">
                    <span class="spnNextStep" v-html="ns"></span>
                </li>
            </ul>
            <h3 class="fontBold marginTop5 printNo">Sensory:</h3>
            <ul>
                <li @click="toggleExclude" class="printNo cursorPointer liDev exclude" v-for="(ns, i) in nextSteps[parseInt(start) + 7]">
                    <span class="spnNextStep" v-html="ns"></span>
                </li>
            </ul>
            <h3 class="fontBold marginTop5 printNo">Evaluator's Comment:</h3>
            <ul>
                <li @click="toggleExclude" class="printNo cursorPointer liDev exclude">
                    <span class="frmVarEdt optional" data-frm-eval-comment="frmEvalComment"></span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import { mapMutations, mapActions, mapState } from 'vuex'
    import pageBreak from './pageBreak.vue'

    export default {
        components: {
            pageBreak
        },
        computed: {
            ...mapState(['nextSteps']),
        },
        data() {
            return { selectedOption: '' }
        },
        methods: {
        },
        mounted() {

        },
        props: ['start', 'toggleExclude']
    }
</script>
<style>

</style>