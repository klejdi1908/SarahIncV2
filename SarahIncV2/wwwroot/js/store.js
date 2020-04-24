import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

export const STORAGE_KEY = 'all-vuejs';

export const state = { // initial state object which works at app level
    alertingOffice: false,
    compositeOptions: [],
    compositeOptionsChecked: [],
    concludingText:
        'For additional recommendations and community resources that may benefit you and your family, ' +
        'please call Child Development Infoline at 800-505-7000, 2-1-1, or the KIDSTEPS office. If you ' +
        'have any questions regarding this report and the recommendations listed above, please contact us ' +
        'at the KIDSTEPS office at (203) 453-7592, ext. 100.'
    ,
    curForm: [],
    currentEvaluators: [],
    eligibilityBasis: [
        'Eligible',
        'Eligibility Using Clinical Opinion to Substantiate Developmental Delay',
        'Eligible based on diagnosed condition',
        'Eligible based on expressive communication delay',
        'Eligibility Using Medical Records to Substantiate Developmental Delay',
        'Not Eligible',
        'Annual Evaluation',
        'Annual Evaluation: Parents Satisfied with Development',
        'Other'
    ],
    evaluationTypes: [],
    evaluationTypesLoaded: 0,
    evaluators: [],
    evaluatorsLoaded: 0,
    finalFormUpdated: false,
    formAreas: [{
            name: 'divFarEligBas1',
            value:
                'Children under the age of three who live in Connecticut are eligible for the Connecticut Birth to Three System because they are either experiencing a significant ' +
                'developmental delay, or they have a diagnosed physical or mental condition with a high probability of resulting in a developmental delay.<br /><br /> The eligibility criteria ' +
                'for a developmental delay is defined in Connecticut as being 2 SD(standard deviations) below the mean in one of the following developmental areas or 1.5 SD below the mean ' +
                'in two or more of the following areas: cognitive development, physical development including vision, hearing, motor and health development, communication development, social or ' +
                'emotional development, and adaptive skills development(also known as self - help or daily living skills).<br /><br />A child whose delay in the area of expressive communication ' +
                'is at least 2 SD below the mean, but whose combined score in the communication domain is not at least 2 SD below the mean, is eligible if a risk factor(s)(as determined by a ' +
                'speech pathologist) is also present.<br /><br /><span data-frm-calc="frmChildAlias"></span> is an engaging<span data-frm-calc="frmAgeEval"></span> old child who was assessed ' +
                'to determine eligibility for Early Intervention Services from the Connecticut Birth-to-Three System. Based upon the results of this comprehensive evaluation, ' +
                '<span data-frm-calc="frmChildAlias"></span> is eligible to receive services due to delayed development in the following skill area(s): ' +
                '<span class="optional frmVarComposite" data-frm-comp="tplElgBas1Adp1.tplElgBas1Per1.tplElgBas1Com1.tplElgBas1Mot1.tplElgBas1Cog1">[Eligibility Basis 1 Composite 1]</span >.<br />' +
                '<br />The following recommendations for <span data-frm-calc="frmChildAlias"></span> and <span data-frm-calc="frmHisHer"></span> family include:' +
                '<ul>' +
                '<li>' +
                'A current audiological evaluation.  It is essential to make every attempt to rule out a hearing impairment that may interfere with health, development, communication, ' +
                'and/or education. We encourage you to discuss this with your pediatrician and insurance company prior to the start of early intervention services. If there will be difficulty ' +
                'in payment, please inform your Service Coordinator at your IFSP meeting. KIDSTEPS will act as the payer of last resort only when the audiological evaluation is listed on your IFSP service page.' +
                '</li>' +
                '<li>' +
                'Development of an Individualized Family Service Plan (IFSP) through the Connecticut Birth to Three (B23) System to identify your goals and to discuss service options.' +
                'Your child’s Service Coordinator will contact you to schedule this.' +
                '</li><li>' +
                'To discuss the results of this evaluation with your child’s pediatrician.' +
                '</li><li>' +
                'Your child is to be enrolled in a comprehensive early intervention program which facilitates skill development in the area(s) of concern and fosters development in all areas. ' +
                'Unless requested, services will be provided by Sarah, Inc. KIDSTEPS.' +
                '</li><li>' +
                'Therapist(s) will provide family with information, suggestions, and techniques which support the child’s development.' +
                '</li>' +
                '</ul>'
        }, {
            name: 'divFarEligBas2',
            value:
                'Children under the age of three who live in Connecticut are eligible for the Connecticut Birth to Three System because they are either experiencing a significant developmental delay, ' +
                'or they have a diagnosed physical or mental condition with a high probability of resulting in a developmental delay.<br />' +
                '<br />The eligibility criteria for a developmental delay is defined in Connecticut as being 2 SD(standard deviations) below the mean in one of the following developmental areas or 1.5 SD below the mean ' +
                'in two or more of the following areas: cognitive development, physical development including vision, hearing, motor and health development, communication development, social or emotional development, ' +
                'and adaptive skills development(also known as self-help or daily living skills).<br />' +
                '<br />The evaluation team determined that standardized testing instruments could not be used to assess <span data-frm-calc="frmChildAlias"></span> abilities because ' +
                '<span class= "optional frmVarDdl" data-frm-var="frmWhyStdTstInapp"></span>. ' +
                'Therefore, informed clinical opinion was used to substantiate the equivalent delay of 2 SD below the mean in one area of development or 1.5 SD below the mean in two areas of development. ' +
                '<br /><br />' +
                'Based upon the results of this comprehensive evaluation, <span data-frm-calc="frmChildAlias"></span> is eligible to receive services due to informed clinical opinion ' +
                'delay in development in the area(s) of: ' +
                '<span class="optional frmVarComposite" data-frm-comp="tplElgBas2Adp1.tplElgBas2Per1.tplElgBas2Com1.tplElgBas2Mot1.tplElgBas2Cog1">[Eligibility Basis 2 Composite 1]</span><br /><br /> ' +
                'The following recommendations for<span data-frm-calc="frmChildAlias"></span> and <span data-frm-calc="frmHisHer"></span> family include: ' +
                '<ul>' +
                '<li>' +
                'When eligibility determination is made through use of clinical opinion, <span data-frm-calc="frmChildAlias"></span> must be re-evaluated within 6 months using a ' +
                'standardized testing instruments and exhibit delay meeting eligibility criteria to remain in program.  If eligibility criteria is not met during that ' +
                'time. <span data-frm-calc="frmChildAlias"></span> will be exited from the Connecticut Birth to Three System due to no longer meets eligibility criteria. ' +
                '</li>' +
                '<li>' +
                'A current audiological evaluation.  It is essential to make every attempt to rule out a hearing impairment that may interfere with health, development, communication, and/or education. ' +
                'We encourage you to discuss this with your pediatrician and insurance company prior to the start of early intervention services. ' +
                'If there will be difficulty in payment, please inform your Service Coordinator at your IFSP meeting. ' +
                'KIDSTEPS will act as the payer of last resort only when the audiological evaluation is listed on your IFSP service page. ' +
                '</li>' +
                '<li>' +
                'Development of an Individualized Family Service Plan (IFSP) through the Connecticut Birth to Three (B23) System to identify your goals and to discuss service options. ' +
                'Your child’s Service Coordinator will contact you to schedule this. ' +
                '</li>' +
                '<li>' +
                'To discuss the results of this evaluation with your child’s pediatrician.' +
                '</li>' +
                '<li>' +
                'Your child is to be enrolled in a comprehensive early intervention program which facilitates skill development in the area(s) of concern and fosters development in all areas. ' +
                'Unless requested, services will be provided by Sarah, Inc. KIDSTEPS. ' +
                '</li>' +
                '<li>' +
                'Therapist(s) will provide family with information, suggestions, and techniques which support the child’s development. ' +
                '</li>' +
                '</ul>'
        }, {
            name: 'divFarEligBas3',
            value:
                'Children under the age of three who live in Connecticut are eligible for the Connecticut Birth to Three System because they are either experiencing a significant developmental delay,' +
                    '                    or they have a diagnosed physical or mental condition with a high probability of resulting in a developmental delay.' +
                    '                    <br />' +
                    '            <br />' +
                    '            <span data-frm-calc="frmChildAlias"></span> is an engaging' +
                    '            <span data-frm-calc="frmAgeEval"></span> old child who was assessed to determine eligibility for Early Intervention' +
                    '                    Services from the Connecticut Birth-to-Three System.Based upon the results of this comprehensive evaluation, <span data-frm-calc="frmChildAlias"></span> is' +
                    'automatically eligible to receive services due to the diagnosis of the established condition of' +
                    '    <span class="optional frmVarTxt" data-frm-var="frmDiagCond"></span>.' +
                    '                    <br />' +
                    '        <br />' +
                    'The following recommendations for <span data-frm-calc="frmChildAlias"></span> and' +
                    '    <span data-frm-calc="frmHisHer"></span> family include:' +
                    '<ul>' +
                    '    <li>' +
                    '        A current audiological evaluation.  It is essential to make every attempt to rule out a hearing impairment that may interfere with health, development, communication, and/or education.' +
                    '        We encourage you to discuss this with your pediatrician and insurance company prior to the start of early intervention services.  If there will be difficulty in payment,' +
                    '        please inform your Service Coordinator at your IFSP meeting.  KIDSTEPS will act as the payer of last resort only when the audiological evaluation is listed on your IFSP service page.' +
                    '                        </li>' +
                    '    <li>' +
                    '        Development of an Individualized Family Service Plan (IFSP) through the Connecticut Birth to Three (B23) System to identify your goals and to discuss service options.' +
                    '        Your child’s Service Coordinator will contact you to schedule this.' +
                    '                        </li>' +
                    '    <li>' +
                    '        To discuss the results of this evaluation with your child’s pediatrician.' +
                    '                        </li>' +
                    '    <li>' +
                '        Your child is to be enrolled in a comprehensive early intervention program which facilitates skill development in the area(s) of concern and fosters development in all areas. ' +
                        'Unless requested, services will be provided by Sarah, Inc. KIDSTEPS.' +
                    '                        </li>' +
                    '    <li>' +
                    '        Therapist(s) will provide family with information, suggestions, and techniques which support the child’s development.' +
                    '                        </li>' +
                    '</ul>'
        }, {
            name: 'divFarEligBas4',
            value:
                'Children under the age of three who live in Connecticut are eligible for the Connecticut Birth to Three System because they are either experiencing a significant developmental delay, ' +
                'or they have a diagnosed physical or mental condition with a high probability of resulting in a developmental delay.' +
                '<br />' +
                '<br />' +
                'The eligibility criteria for a developmental delay is defined in Connecticut as being 2 SD(standard deviations) below the mean in one of the following developmental areas or ' +
                '1.5 SD below the mean in two or more of the following areas: cognitive development, physical development including vision, hearing, motor and health development, communication development, ' +
                'social or emotional development, and adaptive skills development(also known as self-help or daily living skills).' +
                '<br />' +
                '<br />' +
                'A child whose delay in the area of expressive communication is at least 2 SD below the mean, but whose combined score in the communication domain is not at least 2 SD below the mean, ' +
                'is eligible if a risk factor(s)(as determined by a speech pathologist) is also present.' +
                '<br />' +
                '<br />' +
                '<span data-frm-calc="frmChildAlias"></span> is an engaging ' +
                '<span data-frm-calc="frmAgeEval"></span> old child who was assessed to determine eligibility for Early Intervention ' +
                'Services from the Connecticut Birth-to-Three System.Based upon the results of this comprehensive evaluation, <span data-frm-calc="frmChildAlias"></span> is eligible ' +
                'to receive services due to a delay in expressive communication with the factor(s) of: ' +
                '<span class="spnTarPar">' +
                '<span class="exclude printNo eligBasOpt spnTarInner"> Risk factor(s) of </span>' +
                '<span class="exclude printNo eligBasOpt">Oral motor disorders</span> ' +
                '<span class="exclude printNo eligBasOpt">Moderate to severe phonological impairment</span> ' +
                '<span class="exclude printNo eligBasOpt">Chronic otitis media for duration of six months or longer</span> ' +
                '<span class="exclude printNo eligBasOpt">Family history of language impairment or developmental delay</span> ' +
                '<br />' +
                '</span>' +
                '<span class="exclude printNo eligBasOpt">Ongoing concerns by the family or the evaluator about the child’s qualitative performance in the areas of: ' +
                'social/emotional, interpersonal skills, play interest, sensory concerns' +
                '<br /></span> ' +
                '<span class="exclude printNo eligBasOpt">Significant birth history of: <span class="optional frmVarDdl" data-frm-var="frmSigBirthHist">[Significant Birth History]</span><br /></span>' +
                '<br />' +
                '<br />' +
                'The following recommendations for <span data-frm-calc="frmChildAlias"></span> and <span data-frm-calc="frmHisHer"></span> family include:' +
                '<ul>' +
                '<li>' +
                'A current audiological evaluation.  It is essential to make every attempt to rule out a hearing impairment that may interfere with health, development, communication, and/or education. ' +
                'We encourage you to discuss this with your pediatrician and insurance company prior to the start of early intervention services. ' +
                'If there will be difficulty in payment, please inform your Service Coordinator at your IFSP meeting. ' +
                'KIDSTEPS will act as the payer of last resort only when the audiological evaluation is listed on your IFSP service page.' +
                '</li>' +
                '<li>' +
                'Development of an Individualized Family Service Plan (IFSP) through the Connecticut Birth to Three (B23) System to identify your goals and to discuss service options. ' +
                'Your child’s Service Coordinator will contact you to schedule this.' +
                '</li>' +
                '<li>' +
                'To discuss the results of this evaluation with your child’s pediatrician.' +
                '</li>' +
                '<li>' +
                'Your child is to be enrolled in a comprehensive early intervention program which facilitates skill development in the area(s) of concern and fosters development in all areas. ' +
                'Unless requested, services will be provided by Sarah, Inc. KIDSTEPS.' +
                '</li>' +
                '<li>' +
                'Therapist(s) will provide family with information, suggestions, and techniques which support the child’s development.' +
                '</li>' +
                '</ul>'
        }, {
            name: 'divFarEligBas5',
            value:
                'Children under the age of three who live in Connecticut are eligible for the Connecticut Birth to Three System because they are either experiencing a significant developmental delay, ' +
                    'or they have a diagnosed physical or mental condition with a high probability of resulting in a developmental delay.' +
                    '                    <br />' +
                    '    <br />' +
                    'The eligibility criteria for a developmental delay is defined in Connecticut as being 2 SD(standard deviations) below the mean in one of the following developmental areas or 1.5 SD below the mean in two or' +
                    'more of the following areas: cognitive development, physical development including vision, hearing, motor and health development, communication development, social or emotional development,' +
                    '    and adaptive skills development(also known as self-help or daily living skills).' +
                    '                    <br />' +
                    '        <br />' +
                    '        <span data-frm-calc="frmChildAlias"></span> is an engaging' +
                    '            <span data-frm-calc="frmAgeEval"></span> child who was assessed to determine eligibility for Early Intervention' +
                    '                    Services from the Connecticut Birth-to-Three System.Based upon the results of this comprehensive evaluation,' +
                    '    <span data-frm-calc="frmChildAlias"></span> is eligible to receive services due the approval of the evaluation’s team which reviewed the medical records provided by' +
                    '        <span class="optional frmVarTxt" data-frm-var="frmRecProvider"></span> which verified' +
                    'that a standardized, norm referenced instrument was used and confirmed scores meeting Connecticut’s eligibility criteria of a delay in the area(s) of' +
                    '    <span class="optional frmVarComposite" data-frm-comp="tplElgBas5Adp1.tplElgBas5Per1.tplElgBas5Com1.tplElgBas5Mot1.tplElgBas5Cog1"> [Eligibility Basis 5 Composite 1]</span>.' +
                    '                    <br />' +
                    '        <br />' +
                    'The following recommendations for <span data-frm-calc="frmChildAlias"></span> and' +
                    '    <span data-frm-calc="frmHisHer"></span> family include:' +
                    '<ul>' +
                    '    <li>' +
                    '        A current audiological evaluation.  It is essential to make every attempt to rule out a hearing impairment that may interfere with health, development, communication, and/or education.' +
                    '        We encourage you to discuss this with your pediatrician and insurance company prior to the start of early intervention services.' +
                    '        If there will be difficulty in payment, please inform your Service Coordinator at your IFSP meeting.' +
                    '        KIDSTEPS will act as the payer of last resort only when the audiological evaluation is listed on your IFSP service page.' +
                    '                        </li>' +
                    '    <li>' +
                    '        Development of an Individualized Family Service Plan (IFSP) through the Connecticut Birth to Three (B23) System to identify your goals and to discuss service options.' +
                    '        Your child’s Service Coordinator will contact you to schedule this.' +
                    '                        </li>' +
                    '    <li>' +
                    '        To discuss the results of this evaluation with your child’s pediatrician.' +
                    '                        </li>' +
                    '    <li>' +
                '        Your child is to be enrolled in a comprehensive early intervention program which facilitates skill development in the area(s) of concern and fosters development in all areas. ' +
                    'Unless requested, services will be provided by Sarah, Inc. KIDSTEPS.' +
                    '                        </li>' +
                    '    <li>' +
                    '        Therapist(s) will provide family with information, suggestions, and techniques which support the child’s development.' +
                    '                        </li>' +
                    '</ul>'
        }, {
            name: 'divFarEligBas6',
            value:
                'Children under the age of three who live in Connecticut are eligible for the Connecticut Birth to Three System because they are either experiencing a significant developmental delay,' +
                    'or they have a diagnosed physical or mental condition with a high probability of resulting in a developmental delay.' +
                    '                    <br />' +
                    '    <br />' +
                    'The eligibility criteria for a developmental delay is defined in Connecticut as being 2 SD(standard deviations) below the mean in one of the following developmental areas or 1.5 SD below the mean in two' +
                    'or more of the following areas: cognitive development, physical development including vision, hearing, motor and health development, communication development, social or emotional development,' +
                    '    and adaptive skills development(also known as self-help or daily living skills).' +
                    '                    <br />' +
                    '        <br />' +
                    'A child whose delay in the area of expressive communication is at least 2 SD below the mean, but whose combined score in the communication domain is not at least 2 SD below the mean,' +
                    '    is eligible if a risk factor(s)(as determined by a speech pathologist) is also present.' +
                    '                    <br />' +
                    '        <br />' +
                    'Based upon the results of this multi-disciplinary evaluation,' +
                    '    <span data-frm-calc="frmChildAlias"></span> was not found eligible to receive services as a significant delay in any of the developmental domains was not demonstrated.' +
                    '                    <br />' +
                    '        <br />' +
                    'The following recommendations for <span data-frm-calc="frmChildAlias"></span> and' +
                    '    <span data-frm-calc="frmHisHer"></span> family include:' +
                    '<ul>' +
                    '    <li>' +
                    '        To discuss the results of this evaluation with your child’s pediatrician.' +
                    '                        </li>' +
                    '    <li>' +
                    '        Enroll your child in the Connecticut Birth to Three <i>Ages and Stages (ASQ) Child-Monitoring Program</i>.  This program is offered to families who would like assistance monitoring their child’s development.' +
                    '                        </li>' +
                    '    <li>' +
                    '        You may re-refer your child for another evaluation through the Connecticut Birth to Three system for future concerns about your child’s development' +
                    '        and if your child has not turned 3 years old and it has been at least 3 months since the date of this evaluation report.' +
                    '                        </li>' +
                    '</ul>'
        }, {
            name: 'divFarEligBas7',
            value: '<span data-frm-calc="frmChildAlias"></span> is an engaging' +
                '    <span data-frm-calc="frmAgeEval"></span> old child who was re-assessed as part of' +
                '        <span data-frm-calc="frmHisHer"></span> annual review.' +
                '                    <span data-frm-calc="frmChildAlias"></span> and' +
                '    <span data-frm-calc="frmHisHer"></span> family have been working on the following goals' +
                '        <span class="optional frmVarTxt" data-frm-var="frmGoalsWorked7"></span>.The progress made on the goals has been' +
                '            <span class="optional frmVarTxt" data-frm-var="frmGoalProg7"></span>.' +
                'The early intervention team has determined that <span data-frm-calc="frmHeShe"> [he / she]</span> would continue to benefit from early intervention services due to a' +
                'delay in <span class="optional frmVarComposite" data-frm-comp="tplElgBas7Adp1.tplElgBas7Per1.tplElgBas7Com1.tplElgBas7Mot1.tplElgBas7Cog1">[Eligibility Basis 7 Composite 1]</span> area(s).' +
                '                    <br />' +
                '    <br />' +
                'The following recommendations for <span data-frm-calc="frmChildAlias"></span> and' +
                '    <span data-frm-calc="frmHisHer"></span> family include:' +
                '<ul>' +
                '    <li>' +
                '        A current audiological evaluation.  It is essential to make every attempt to rule out a hearing impairment that may interfere with health, development, communication, and/or education.' +
                '        We encourage you to discuss this with your pediatrician and insurance company prior to the start of early intervention services.' +
                '        If there will be difficulty in payment, please inform your Service Coordinator at your IFSP meeting.' +
                '        KIDSTEPS will act as the payer of last resort only when the audiological evaluation is listed on your IFSP service page.' +
                '                        </li>' +
                '    <li>' +
                '        To discuss the results of this evaluation with your child’s pediatrician.' +
                '                        </li>' +
                '    <li>' +
                '        Therapist(s) will provide family with information, suggestions, and techniques which support the child’s development.' +
                '                        </li>' +
                '    <li>' +
                '        Development of an Annual Individualized Family Service Plan (IFSP) to identify the family’s objectives and discuss service options.' +
                '                        </li>' +
                '</ul>'
        }, {
            name: 'divFarEligBas8',
            value: '<span data-frm-calc="frmChildAlias"></span> is an engaging' +
                '    <span data-frm-calc="frmAgeEval"></span> old child who was re-assessed as part of' +
                '        <span data-frm-calc="frmHisHer"></span> annual review.' +
                '                    <span data-frm-calc="frmChildAlias"></span> and' +
                '    <span data-frm-calc="frmHisHer"></span> family have been working on the following goals' +
                '        <span class="optional frmVarTxt" data-frm-var="frmGoalsWorked7"></span>.The progress made on the goals has been' +
                '            <span class="optional frmVarTxt" data-frm-var="frmGoalProg7"></span>.' +
                'The early intervention team, including <span data-frm-calc="frmChildAlias"></span>\'s parents has determined that ' +
                '    <span data-frm-calc="frmHeShe"> [he / she]</span> is developing appropriately, has met all of <span data-frm-calc="frmHisHer"></span> IFSP goals, and' +
                '        <span data-frm-calc="frmHisHer"></span> parents no longer have concerns about <span data-frm-calc="frmHisHer"></span> development.The family chooses to discontinue early intervention services at this time. ' +
                '                    <br />' +
                '            <br />' +
                'The following recommendations for <span data-frm-calc="frmChildAlias"></span> and' +
                '    <span data-frm-calc="frmHisHer"></span> family include:' +
                '<ul>' +
                '    <li>' +
                '        To discuss the results of this evaluation with your child’s pediatrician.' +
                '                        </li>' +
                '    <li>' +
                '        Enroll your child in the Connecticut Birth to Three Ages and Stages (ASQ) Child-Monitoring Program. This program is offered to families who would like assistance monitoring their child\'s development.' +
                '                        </li>' +
                '    <li>' +
                '        If concerns arise regarding your child’s development, you may re-refer your child to the Connecticut Birth to Three system through Infoline (1-800-505-7000).  You may request the SARAH, Inc. KIDSTEPS program.' +
                '                        </li>' +
                '</ul>'
        }, {
            name: 'divFarEligBas9',
            value: '<span data-frm-calc="frmChildAlias"></span> is an engaging ' +
                '<span data-frm-calc="frmAgeEval"></span> old child who was re-assessed as requested by ' +
                '<span data-frm-calc="frmHisHer"></span> team to ' +
                '<span class="optional frmVarTxt" data-frm-var="frmEvalReason"></span> ' +
                '<span data-frm-calc="frmChildAlias"></span> and ' +
                '<span data-frm-calc="frmHisHer"></span> family have been working on the following goals ' +
                '<span class="optional frmVarTxt" data-frm-var="frmGoalsWorked8"></span>.The progress made on the goals has been ' +
                '<span class="optional frmVarTxt" data-frm-var="frmGoalProg8"></span>. ' +
                '<br />' +
                '<br />' +
                'The following recommendations for <span data-frm-calc="frmChildAlias"></span> and ' +
                '<span data-frm-calc="frmHisHer"></span> family include: ' +
                '<ul>' +
                '<li>' +
                'To discuss the results of this evaluation with your child’s pediatrician.' +
                '</li>' +
                '<li>' +
                'Therapist(s) will provide family with information, suggestions, and techniques which support the child’s development.' +
                '</li>' +
                '<li>' +
                'Possibly review <span data-frm-calc="frmChildAlias"></span> ' +
                'Individualized Family Service Plan (IFSP) to identify the family’s objectives and discuss service options.' +
                '</li>' +
                '</ul>'
        }, {
            name: 'divFarEvalProc',
            value:
                'The evaluation took place over <span data-frm-var="frmEvalHours" class="mandatory frmVarNumTxt"></span> ' +
                'hour(s) during <span data-frm-var="frmEvalVisits" class="mandatory frmVarNumTxt"></span> visit(s). It consisted of a review of screening tools, ' +
                'directed tasks with <span data-frm-calc="frmChildAlias"></span>, and a dialogue with ' +
                '<span data-frm-var="frmEvalProcParticipant" class="mandatory frmVarTxt"></span>, who was present at the evaluation. ' +
                '<span data-frm-var="frmEvalProcParticipant" class="mandatory frmVarTxt"></span> was also able to contribute to the process by validating ' +
                '<span data-frm-calc="frmChildAlias"></span>’s performance and providing input about their family’s strengths, ' +
                'concerns and daily routines. <span data-frm-var="frmEvalProcParticipant" class="mandatory frmVarTxt"></span> was provided the opportunity to share information ' +
                'from a variety of sources, such as other caregivers, medical and/or social providers. The evaluation took place in <span data-frm-calc="frmChildAlias"></span>’s ' +
                '<span data-frm-var="frmEvalProcLoc" class="mandatory frmVarTxt"></span> where <span data-frm-calc="frmHeShe"></span> ' +
                'spends significant time and is comfortable with <span data-frm-calc="frmHisHer"></span> surroundings.'
        }, {
            name: 'divFarAssProc',
            value:
                'The assessment consisted of a review of screening tools, directed tasks with <span data-frm-calc="frmChildAlias"></span>, and a dialogue with ' +
                '<span data-frm-var="frmEvalProcParticipant" class="mandatory frmVarTxt"></span>, who was present at the assessment. ' +
                '<span data-frm-var="frmEvalProcParticipant" class="mandatory frmVarTxt"></span> was also able to contribute to the process by validating ' +
                '<span data-frm-calc="frmChildAlias"></span>’s performance and providing input about their family’s strengths, ' +
                'concerns and daily routines. <span data-frm-var="frmEvalProcParticipant" class="mandatory frmVarTxt"></span> was provided the opportunity to share information ' +
                'from a variety of sources, such as other caregivers, medical and/or social providers.'
        }, {
            name: 'divFarNarrWake',
            value:
                '<span data-frm-calc="frmChildAlias"></span> goes to bed around <span data-frm-var="frmChildBedtime" class="mandatory frmVarTxt"></span>. ' +
                'Before <span data-frm-var="frmWhoPutsToBed" class="mandatory frmVarTxt"></span> puts <span data-frm-calc="frmHimHer"></span> to bed, ' +
                '<span data-frm-calc="frmChildAlias"></span> likes to ' +
                '<span data-frm-comp="tplNarWakeCog.tplNarWakePer" class="mandatory frmVarComposite">[Narrative Wake Up Composite 1]</span>. ' +
                '<span data-frm-calc="frmHeSheCap"></span> lets <span data-frm-var="frmWhoPutsToBed" class="mandatory frmVarTxt"></span> know ' +
                '<span data-frm-calc="frmHeShe"></span> is ready to sleep by ' +
                '<span data-frm-comp="tplNarWakeSen.tplNarWakeAdap" class="mandatory frmVarComposite"> [Narrative Wake Up Composite 2]</span>. ' +
                '<span data-frm-calc="frmChildAlias"></span> sleeps in a <span data-frm-var="frmSleepsIn" class="mandatory frmVarTxt"></span> in ' +
                '<span data-frm-var="frmSleepsWhere" class="mandatory frmVarTxt"></span>. <span data-frm-calc="frmHeSheCap"></span> ' +
                'wakes up in the morning typically from <span data-frm-var="frmWakesUpFrom" class="mandatory frmVarTxt"></span> and naps from ' +
                '<span data-frm-var="frmNaptimeIs" class="mandatory frmVarTxt"></span>.When <span data-frm-calc="frmChildAlias"></span> gets up from ' +
                '<span data-frm-calc="frmHisHer"></span> nap or in the morning <span data-frm-calc="frmHeShe"></span> ' +
                '<span data-frm-comp="tplNarWakeCom.tplNarWakeFm.tplNarWakeGm" class="mandatory frmVarComposite">[Narrative Wake Up Composite 3]</span>. When ' +
                '<span data-frm-calc="frmChildAlias"></span> is up, <span data-frm-calc="frmHeShe"></span> ' +
                '<span data-frm-comp="tplNarWakeCog.tplNarWakePer" class="mandatory frmVarComposite">[Narrative Wake Up Composite 4]</span>. ' +
                'Additionally, Caregiver providing information to the report states that <span data-frm-calc="frmChildAlias"></span> ' +
                '<span data-frm-comp="tplNarWakeSen" class="mandatory frmVarComposite">[Narrative Wake Up Composite 5]</span> ' +
                '<span data-frm-var="frmCareConWake" class="mandatory frmVarEdt"></span>'
        }, {
            name: 'divFarNarrDres',
            value:
                '<span class="mandatory frmVarTxt" data-frm-var="frmWhoAssists"></span> assists ' +
                '<span data-frm-calc="frmChildAlias"></span> in getting dressed each morning. ' +
                '<span data-frm-calc="frmChildAlias"></span> gets dressed by ' +
                '<span class="mandatory frmVarComposite" data-frm-comp="tplNarDresAdap">[Narrative Dressing/Toileting Composite 1]</span>. ' +
                '<span data-frm-calc="frmHeSheCap"></span> ' +
                '<span class="mandatory frmVarComposite" data-frm-comp="tplNarDresGm.tplNarDresFm">[Narrative Dressing/Toileting Composite 2]</span>. During dressing, ' +
                '<span data-frm-calc="frmChildAlias"></span> ' +
                '<span class="mandatory frmVarComposite" data-frm-comp="tplNarDresPer.tplNarDresCom.tplNarDresCog">[Narrative Dressing/Toileting Composite 3]</span>. ' +
                '<span data-frm-calc="frmHeSheCap"></span> ' +
                '<span class="mandatory frmVarComposite" data-frm-comp="tplNarDresAdap.tplNarDresGm.tplNarDresFm">[Narrative Dressing/Toileting Composite 4]</span>.During toileting, ' +
                '<span data-frm-calc="frmHeShe"></span> ' +
                '<span class="mandatory frmVarComposite" data-frm-comp="tplNarDresPer.tplNarDresCom.tplNarDresCog">[Narrative Dressing/Toileting Composite 5]</span>. ' +
                'Additionally, caregiver providing information to the report states that ' +
                '<span data-frm-calc="frmChildAlias"></span> is ' +
                '<span class="mandatory frmVarComposite" data-frm-comp="tplNarDresSen"> [Narrative Dressing / Toileting Composite 6]</span>. ' +
                '<span class="mandatory frmVarEdt" data-frm-var="frmCareConDres"></span>'
        }, {
            name: 'divFarNarrMeal',
            value:
                'When <span data-frm-calc="frmChildAlias"></span> is hungry ' +
                '<span data-frm-calc="frmHeShe"></span> lets <span class="mandatory frmVarTxt" data-frm-var="frmEvalProcParticipant"></span> know by ' +
                '<span class="mandatory frmVarComposite" data-frm-comp="tplNarMealCom.tplNarMealPer"> [Narrative Mealtime Composite 1]</span>. ' +
                '<span data-frm-calc="frmHeSheCap"></span> is <span class="mandatory frmVarTxt" data-frm-var="frmHowFed"></span> and eats by ' +
                '<span class="mandatory frmVarComposite" data-frm-comp="tplNarMealAdp.tplNarMealGm.tplNarMealFm"> [Narrative Mealtime Composite 2]</span>.While ' +
                '<span data-frm-calc="frmChildAlias"></span> is eating, <span data-frm-calc="frmHeShe"></span> ' +
                '<span class="mandatory frmVarComposite" data-frm-comp="tplNarMealCog.tplNarMealCom">[Narrative Mealtime Composite 3]</span>. ' +
                'Additionally, Caregiver providing information to report states that <span data-frm-calc="frmChildAlias"></span> ' +
                '<span class="mandatory frmVarComposite" data-frm-comp="tplNarMealSen">[Narrative Mealtime Composite 4]</span>. ' +
                '<span class="mandatory frmVarEdt" data-frm-var="frmCareConMeal"></span>'
        }, {
            name: 'divFarNarrOuts',
            value:
                'Typically, <span data-frm-calc="frmChildAlias"></span>\'s family goes to <span class="mandatory frmVarTxt" data-frm-var="frmTypOutings"></span>.During this time, ' +
                '<span data-frm-calc="frmChildAlias"></span> ' +
                '<span class="mandatory frmVarComposite" data-frm-comp="tplNarOutsGm.tplNarOutsFm">[Narrative Outing Composite 1]</span>.While ' +
                '<span data-frm-calc="frmHisHer"></span> family is there, <span data-frm-calc="frmChildAlias"></span> ' +
                '<span class="mandatory frmVarComposite" data-frm-comp="tplNarOutsFm.tplNarOutsAdp.tplNarOutsPer.tplNarOutsCom.tplNarOutsCog">[Narrative Outing Composite 2]</span>. ' +
                'Additionally, Caregiver providing information to report states that <span data-frm-calc="frmChildAlias"></span> ' +
                '<span class="mandatory frmVarComposite" data-frm-comp="tplNarOutsSen">[Narrative Outing Composite 3]</span>. ' +
                '<span class="mandatory frmVarEdt" data-frm-var="frmCareConOuts"></span>'
        }, {
            name: 'divFarNarrPlay',
            value:
                '<span data-frm-calc="frmChildAlias"></span>’s favorite toy(s) include ' +
                '<span class="mandatory frmVarTxt" data-frm-var="frmFavToys"> [Favorite toys]</span>. <span data-frm-calc="frmHeSheCap"></span> ' +
                '<span class="mandatory frmVarComposite" data-frm-comp="tplNarPlayPer">[Narrative Play Composite 1]</span>.While playing, ' +
                '<span data-frm-calc="frmChildAlias"></span> <span class="mandatory frmVarComposite" data-frm-comp="tplNarPlayGm">[Narrative Play Composite 2]</span>. ' +
                '<span data-frm-calc="frmChildAlias"></span> <span class="mandatory frmVarComposite" data-frm-comp="tplNarPlayFm.tplNarPlayAdp">[Narrative Play Composite 3]</span>. ' +
                '<span data-frm-calc="frmHeSheCap"></span> communicates while playing by ' +
                '<span class="mandatory frmVarComposite" data-frm-comp="tplNarPlayCom">[Narrative Play Composite 4]</span>. ' +
                '<span data-frm-calc="frmChildAlias"></span> plays by ' +
                '<span class="mandatory frmVarComposite" data-frm-comp="tplNarPlayCog.tplNarPlayAdp">[Narrative Play Composite 5]</span>. ' +
                'Additionally, Caregiver providing information to report states that <span data-frm-calc="frmChildAlias"></span> ' +
                '<span class="mandatory frmVarComposite" data-frm-comp="tplNarPlaySen">[Narrative Play Composite 6]</span>. ' +
                '<span class="mandatory frmVarEdt" data-frm-var="frmCareConPlay"></span>'
        }, {
            name: 'divFarNarrBath',
            value:
                'Most often, bath time is given by <span class="mandatory frmVarTxt" data-frm-var="frmWhoBathes"></span>. ' +
                '<span data-frm-calc="frmChildAlias"></span> bathes in <span class="mandatory frmVarTxt" data-frm-var="frmWhereBathes"></span> during ' +
                '<span class="mandatory frmVarTxt" data-frm-var="frmWhenBathes"></span>. <span data-frm-calc="frmHeSheCap"></span> helps with bathing by ' +
                '<span class="mandatory frmVarComposite" data-frm-comp="tplNarBathGm.tplNarBathFm"> [Narrative Bathtime Composite 1]</span> and ' +
                '<span data-frm-calc="frmHeShe"></span> <span class="mandatory frmVarComposite" data-frm-comp="tplNarBathAdp.tplNarBathPer">[Narrative Bathtime Composite 2]</span>. ' +
                'While bathing, <span data-frm-calc="frmChildAlias"></span> ' +
                '<span class="mandatory frmVarComposite" data-frm-comp="tplNarBathCom.tplNarBathCog">[Narrative Bathtime Composite 3]</span>.Additionally, ' +
                'Caregiver providing information to report states that <span data-frm-calc="frmChildAlias"></span> ' +
                '<span class="mandatory frmVarComposite" data-frm-comp="tplNarBathSen">[Narrative Bathtime Composite 4]</span>. ' +
                '<span class="mandatory frmVarEdt" data-frm-var="frmCareConBath"></span>'
        }, {
            name: 'divFarObsTesting', value: ''
        }],
    formAreasStaging: [],
    formLoaded: 0,
    forms: [],
    formSelOptionsUpdated: false,
    formsLoaded: 0,
    formVariables: [],
    hasSaved: false,
    inapplicableTests: [
        'standardized tests were not applicable due to the child’s age',
        'standardized tests were not applicable due to significant illness',
        'standardized tests were not applicable because it would require significant adaptation for a child to perform the items, thereby invalidating the results'
    ],
    nextSteps: [
        [
            'Allow some wait time for <span data-frm-calc="frmChildAlias"></span> to play when <span data-frm-calc="frmHeShe"></span> wakes up in the crib or bed. ' +
            'Give <span data-frm-calc="frmChildAlias"></span> time to explore <span data-frm-calc="frmHisHer"></span> hands and feet or to play with making sounds.',
            'Allow time for <span data-frm-calc="frmChildAlias"></span> to look at a book.',
            'Provide a predictable routine; change <span data-frm-calc="frmChildAlias"></span>\'s diaper or clothes before leaving the bedroom.',
            'Have <span data-frm-calc="frmChildAlias"></span> use the potty upon waking as a natural routine before changing <span data-frm-calc="frmHisHer"></span> clothes.',
            'Avoid television or computer time (screen time) at least 2 hours before bedtime to allow  <span data-frm-calc="frmChildAlias"></span> to be relaxed and ready for sleep.',
            'Allow <span data-frm-calc="frmChildAlias"></span> to have plenty of opportunities for movement during the day, but switch to quiet play at least one hour before bedtime.',
            'Try to establish a pre-bedtime routine. Ideas to include may be a warm bath, rocking, story time, hugs, quiet songs, etc.',
            'After <span data-frm-calc="frmChildAlias"></span> is three months old, try to establish a consistent daily schedule so <span data-frm-calc="frmChildAlias"></span> ' +
            'feels in control of <span data-frm-calc="frmHisHer"></span> world. Try to keep track of when <span data-frm-calc="frmChildAlias"></span> seems hungry and tired. ' +
            'Use this information to build a schedule around <span data-frm-calc="frmHisHer"></span > biological clock.',
            'Place <span data-frm-calc="frmChildAlias"></span > in the crib while still awake, but drowsy, to help <span data-frm-calc="frmHimHer"></span> learn to fall asleep on ' +
            '<span data-frm-calc="frmHisHer"></span> own.'
        ], [
            'Talk to <span data-frm-calc="frmChildAlias"></span> before lifting<span data-frm-calc="frmHimHer"></span> from the crib/bed – share eye contact, smiling, ' +
            'or a game of peek a boo.',
            'Give a short wait time for <span data-frm-calc="frmChildAlias"></span> to raise arms to be picked up. Reach out with your hands to model the action.',
            'Hold <span data-frm-calc="frmChildAlias"></span> and allow <span data-frm-calc="frmHimHer"></span>to explore your face with <span data-frm-calc="frmHisHer"></span> hands.',
            'Sit and look at a book together before transitioning to changing, toileting.',
            'Have a predictable routine to ease <span data-frm-calc="frmChildAlias"></span> into the day.',
            'Speak quietly or sing soothing songs to encourage <span data-frm-calc="frmChildAlias"></span> to relax. Wait for <span data-frm-calc="frmHimHer"></span> ' +
            'to look to you and indicate that <span data-frm-calc="frmHeShe"></span> wants more songs.',
            'Encourage exploration of facial features when being held, talk about “your nose, “Mommy or Daddy’s nose,” etc.',
            'Use statements such as “It’s time to go to sleep,” rather than asking “Do you want to go to sleep?”',
            'To help develop self-soothing, pick<span data-frm-calc="frmChildAlias"></span> up to comfort <span data-frm-calc="frmHimHer"></span> when ' +
            '<span data-frm-calc="frmHeShe"></span> cries. You cannot spoil an infant.',
            'Offer a “lovey” object.',
            'Use a consistent bedtime routine when possible, such as a warm bath followed by rocking and singing or story time.',
            'Identify a comfortable philosophy for bedtime/sleeping to use consistently.',
            'Under the age of 3 months, promptly pick up <span data-frm-calc="frmChildAlias"></span> when <span data-frm-calc="frmHeShe"></span> cries. ' +
            'At this stage the only lesson a baby learns when <span data-frm-calc="frmHisHer"></span> cries are ignored is that the adults in ' +
            '<span data-frm-calc="frmHisHer"></span> world cannot be trusted to take care of <span data-frm-calc="frmHimHer"></span>.'
        ], [
			'When you are standing at the bedroom door, call <span data-frm-calc="frmChildAlias"></span>’s name then pause for a few seconds to give<span data-frm-calc="frmHimHer"></span> a chance to look at you. Once <span data-frm-calc="frmChildAlias"></span> looks at you, smile, talk and go to <span data-frm-calc="frmHimHer"></span>.',
			'Help <span data-frm-calc="frmChildAlias"></span> touch different items around the room such as <span data-frm-calc="frmHisHer"></span> blanket, bed, stuffed toy while you name what they are.',
			'Use simple, 1-2 repetitive words to talk about what you are doing. For example, if you are picking <span data-frm-calc="frmChildAlias"></span> up, say “up, up, up.”',
			'Ask questions such as “Where is blankie?” or “Where is your bear?” Help <span data-frm-calc="frmChildAlias"></span> find the item by pointing to it or taking<span data-frm-calc="frmHimHer"></span> to it. Name the object one more time.',
			'Hold up two items such as a blanket and a bear and ask <span data-frm-calc="frmChildAlias"></span> to point to or show you the one you named.',
			'Model words that describe position, such as out and on, during wake up time (e.g., saying “out” when lifting <span data-frm-calc="frmChildAlias"></span> out of the crib or “on” when turning the light on).',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to follow simple directions such as “Give me your blanket.” ',
			'Use words such as “sleepy” or “awake” when <span data-frm-calc="frmChildAlias"></span> is going to sleep, waking up or reaching to you when ready to get up.',
			'Use simple, 1-2 repetitive words to label people, objects, and actions. For example, if you are putting<span data-frm-calc="frmChildAlias"></span> down onto the bed, say “down, down, down.” ',
			'Point to familiar items around the room to encourage<span data-frm-calc="frmChildAlias"></span> to look at what you are pointing to.',
			'Ask <span data-frm-calc="frmChildAlias"></span> to follow simple directions related to <span data-frm-calc="frmHisHer"></span> wake up or sleep routine. Use gestures such as pointing to objects. For example, ask <span data-frm-calc="frmChildAlias"></span> to “Give mommy a kiss” or “Go get your blankie.”Help <span data-frm-calc="frmChildAlias"></span> to be successful when needed. ',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to follow simple directions such as “Find a book,” or “Turn off the light.”',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to follow 2-step directions such as “Get your bear and put it under the blanket.”',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to follow 2-step unrelated directions such as “Put your book in the basket and then turn off the light.”'
		], [
			'Allow <span data-frm-calc="frmChildAlias"></span> a few minutes to babble and play with <span data-frm-calc="frmHisHer"></span> own voice before entering the room.',
			'Spend time making silly sounds together (e.g.; “uh oh,” “vroom,” “boing,” “boom,” “crash,” “whoa,” “wee,” “yay,” “boop,” “smash.”) Animal sounds are fun too (e.g.; “moo,” “ba,” “ma,” “meow,” “woof,” “oink,” “neigh.”)',
			'Repeat sounds/words <span data-frm-calc="frmChildAlias"></span> says. Take turns repeating the sounds and words.',
			'Give <span data-frm-calc="frmChildAlias"></span> plenty of wait time (silence) to think about the sounds and words you are saying so <span data-frm-calc="frmHeShe"></span> can try to say them.',
			'Point to your mouth when making sounds to help <span data-frm-calc="frmChildAlias"></span> notice how lips, jaw, and tongue move to make sounds.',
			'Make silly faces or sounds to encourage <span data-frm-calc="frmChildAlias"></span> to experiment with moving <span data-frm-calc="frmHisHer"></span> mouth in different ways to try new sounds and words.',
			'Hold objects such as a blanket, stuffed animal or binky next to your mouth as you say the name of the object to encourage <span data-frm-calc="frmChildAlias"></span> to watch your mouth while you speak.',
			'Introduce simple gestures and signs (such as holding arms up for “up”) to show <span data-frm-calc="frmChildAlias"></span> ways to communicate before <span data-frm-calc="frmHeShe"></span> has the words.',
			'Instead of asking yes/no questions (e.g., “Do you want up?”) encourage <span data-frm-calc="frmChildAlias"></span> to use words that describe what <span data-frm-calc="frmHeShe"></span> wants (e.g.,“Say up” or “Tell me up”).',
			'Model words <span data-frm-calc="frmChildAlias"></span> has difficulty saying by using the correct productions of sounds. For example, if <span data-frm-calc="frmChildAlias"></span> says “ee” for “please,” point to your own lips and repeat back “P-L-EE-Z” in an exaggerated, slow manner. ',
			'Use simple, 1-2 repetitive words/phrases when talking to <span data-frm-calc="frmChildAlias"></span> so it is easier for<span data-frm-calc="frmHimHer"></span> to attempt to repeat what you are saying. For example, if you are going to pick <span data-frm-calc="frmChildAlias"></span> up, say “up, up, up.”',
			'Model 1 word at a time to acknowledge any communication attempts <span data-frm-calc="frmChildAlias"></span> makes, ' +
			'such as looking at you, leading you, reaching, pointing, or saying a sound. For example, if <span data-frm-calc="frmChildAlias"></span> ' +
			'pulls you towards something, model the word you would want<span data-frm-calc="frmHimHer"></span> to say such as “come,” “help,” “mama,” or “dada.” ' +
			'If <span data-frm-calc="frmChildAlias"></span> is reaching towards you because<span data-frm-calc="frmHeShe"></span> wants to get out of bed, ' +
			'verbally model “up” or “out.”',
			'When <span data-frm-calc="frmChildAlias"></span> points to something<span data-frm-calc="frmHeShe"></span> wants, give<span data-frm-calc="frmHimHer"></span> a simple word to say to ask for what<span data-frm-calc="frmHeShe"></span> wants. Repeat the word before giving <span data-frm-calc="frmChildAlias"></span> the item.',
			'Give <span data-frm-calc="frmChildAlias"></span> a choice of two items by holding them up in front of <span data-frm-calc="frmHimHer"></span>. ' +
			'Wait for <span data-frm-calc="frmHimHer"></span> to point, reach, use a sound, or word. Once<span data-frm-calc="frmHeShe"></span> tries to communicate, ' +
			'model the word you would like <span data-frm-calc="frmHimHer"></span> to say. For example, hold up a blanket and a bear and wait for ' +
			'<span data-frm-calc="frmChildAlias"></span> to choose one. If <span data-frm-calc="frmHeShe"></span> points to or reaches for the bear, say “bear.” ',
			'Expand <span data-frm-calc="frmChildAlias"></span>’s words and phrases by adding 1 word at a time to what <span data-frm-calc="frmHeShe"></span> says. ' +
			'For example, if <span data-frm-calc="frmChildAlias"></span> says, “binky,” repeat back “Your binky,” “My binky” or “Want binky.”If <span data-frm-calc="frmHeShe"></span> ' +
			'attempts those two words, add another by saying “Want my binky” or “I want binky.”',
			'Combining 3+ words together:Model words <span data-frm-calc="frmChildAlias"></span> already says in 3 and 4-word phrases such as “Mommy please help me,” “I want up," and “My blue blanket.” ',
			'Ask<span data-frm-calc="frmChildAlias"></span> silly yes/no questions to encourage<span data-frm-calc="frmHimHer"></span> to respond “yes” and “no” such as, “Is your blanket on your head?” or “Is there an elephant in the room?”Humorhelps to make communication fun.',
			'Model correct pronunciations of words. For example, if<span data-frm-calc="frmChildAlias"></span> says “nigh nigh,” repeat back “night night.” ',
			'Use simple, 1-2 repetitive words/phrases when talking to<span data-frm-calc="frmChildAlias"></span> to encourage <span data-frm-calc="frmHimHer"></span> to repeat what you are saying (e.g., “night-night”).',
			'Model words/phrases such as “I’m mad,” “stop” or “all done” for<span data-frm-calc="frmChildAlias"></span> to use instead of frustrated actions/behaviors.',
			'When you begin to recognize <span data-frm-calc="frmChildAlias"></span>\'s different cries (around three months old), hunger and pain cries shouldbe met right away. ' +
			'If it is an “I’m bored” or "want a new toy" cry, it is ok to let <span data-frm-calc="frmHimHer"></span> fuss for 2 to 3 minutes at most. Eventually, ' +
			'<span data-frm-calc="frmChildAlias"></span>will learn how to self-sooth when every need is not immediately met.'
		], [
			'Approach and talk to <span data-frm-calc="frmChildAlias"></span> from different sides of the crib to encourage<span data-frm-calc="frmHimHer"></span> to lift <span data-frm-calc="frmHisHer"></span> head and look toward the right and left sides.',
			'When <span data-frm-calc="frmChildAlias"></span> is in <span data-frm-calc="frmHisHer"></span> crib, try shaking rattles or toys on one side and then other so that<span data-frm-calc="frmHeShe"></span> turns and looks to both sides',
			'When <span data-frm-calc="frmChildAlias"></span> is on<span data-frm-calc="frmHisHer"></span> tummy, try shaking rattles or toys above<span data-frm-calc="frmHimHer"></span> to encourage<span data-frm-calc="frmHimHer"></span> to lift <span data-frm-calc="frmHisHer"></span> head. ',
			'If <span data-frm-calc="frmChildAlias"></span> is comfortable spending a few minutes alone, allow time to play with moving between positions, such as rolling, sitting, standing.',
			'Give brief wait time for <span data-frm-calc="frmChildAlias"></span> to raise <span data-frm-calc="frmHisHer"></span> arms to be picked up.',
			'Give brief wait time for <span data-frm-calc="frmChildAlias"></span> to move into sitting or standing when <span data-frm-calc="frmHeShe"></span> wants to be picked up.',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to stand and hold onto the crib while you are talking, opening the curtain, or turning on the light.',
			'Offer a toy at one end of the crib to encourage <span data-frm-calc="frmChildAlias"></span> to crawl over the mattress to reach it.',
			'Offer a toy at one end of the crib to encourage <span data-frm-calc="frmChildAlias"></span> to step sideways while holding onto crib. ',
			'Place a toy on the crib mattress while <span data-frm-calc="frmChildAlias"></span> is standing to encourage moving from standing to sitting.',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to walk into <span data-frm-calc="frmHisHer"></span> room for bedtime. ',
			'Offer different positions to relax in while reading bedtime stories (lying on tummy, sitting on your lap, sitting on the floor).',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to climb into <span data-frm-calc="frmHisHer"></span> toddler bed, offering help when needed.',
			'When putting <span data-frm-calc="frmChildAlias"></span>into the crib for naps and bedtime, alternate the side that you place <span data-frm-calc="frmHisHer"></span>head to encourage turning the head in different directions when waking up and looking around.'
		], [
			'Provide (child safe) visually appealing items near <span data-frm-calc="frmChildAlias"></span>’s crib for<span data-frm-calc="frmHimHer"></span> to look at.',
			'If <span data-frm-calc="frmChildAlias"></span> is comfortable spending a few minutes alone, allow time for<span data-frm-calc="frmHimHer"></span> to play, visually explore <span data-frm-calc="frmHisHer"></span> hands,roll over, and push up on <span data-frm-calc="frmHisHer"></span> arms and hands.',
			'Offer <span data-frm-calc="frmChildAlias"></span> a rattle to explore.',
			'Offer <span data-frm-calc="frmChildAlias"></span> a book to turn pages and look at.',
			'Give <span data-frm-calc="frmChildAlias"></span> toys to reach for when lying on <span data-frm-calc="frmHisHer"></span> back.',
			'During supervised times, give <span data-frm-calc="frmChildAlias"></span> toys to reach for when lying on <span data-frm-calc="frmHisHer"></span> tummy.',
			'Give <span data-frm-calc="frmChildAlias"></span> toys to reach for when <span data-frm-calc="frmHeShe"></span> is sitting.',
			'Show <span data-frm-calc="frmChildAlias"></span> how to grasp and hold the side of crib when pulling to stand.',
			'Offer <span data-frm-calc="frmChildAlias"></span> a toy to reach for with one hand while holding onto crib with other hand for balance.',
			'Have <span data-frm-calc="frmChildAlias"></span> turn the wall light switch on/off when leaving room.',
			'While reading, point to pictures so<span data-frm-calc="frmChildAlias"></span> can observe you using your hand to touch the book.',
			'While reading, encourage<span data-frm-calc="frmChildAlias"></span> to point to pictures named.'
		], [
			'When <span data-frm-calc="frmChildAlias"></span> wakes up, show<span data-frm-calc="frmHimHer"></span> a rattle, shaker, colorful toy, ' +
			'or objects to encourage<span data-frm-calc="frmHimHer"></span> to follow the object and sound with <span data-frm-calc="frmHisHer"></span> head and eyes. ' +
			'Move the motivating item in different places for <span data-frm-calc="frmChildAlias"></span> to look in front of, behind, and to the side of ' +
			'<span data-frm-calc="frmHimHer"></span>.',
			'Give <span data-frm-calc="frmChildAlias"></span> opportunities to be around new sounds and toys (such as new stuffed animals) to feel and explore different objects in <span data-frm-calc="frmHisHer"></span> crib or room.',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to find you when <span data-frm-calc="frmHeShe"></span> hears your voice by slowly approaching <span data-frm-calc="frmHisHer"></span> crib after <span data-frm-calc="frmHeShe"></span> wakes up.',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to increase awareness of new situations by rotating <span data-frm-calc="frmHisHer"></span> blankets or stuffed animals from time to time. Take the “new ones” out and put the others away to increase <span data-frm-calc="frmChildAlias"></span>’s interest in <span data-frm-calc="frmHisHer"></span> things.',
			'Play peek-a-boo games with <span data-frm-calc="frmChildAlias"></span>. Hide behind your hands or a blanket and encourage <span data-frm-calc="frmChildAlias"></span> to start the game and imitate your actions. Go back and forth with <span data-frm-calc="frmChildAlias"></span> as long as you can while <span data-frm-calc="frmHeShe"></span> is still interested.',
			'Make silly faces like opening your mouth wide, exaggerated smiling, or sticking out your tongue to encourage <span data-frm-calc="frmChildAlias"></span> to imitate your facial gestures.',
			'Hide objects that you know <span data-frm-calc="frmChildAlias"></span> likes, such as a pacifier or favorite stuffed animal, and encourage <span data-frm-calc="frmHimHer"></span> to find them. Keep it easy at first by covering only a portion of the object and then gradually completely hide it from sight, still making it easy to find.',
			'Play “Where did it go?” by encouraging <span data-frm-calc="frmChildAlias"></span> to uncover an object hidden under a blanket or pillow. Model this for<span data-frm-calc="frmHimHer"></span> to see if <span data-frm-calc="frmHeShe"></span> will imitate the action of moving the blanket or pillow.',
			'If <span data-frm-calc="frmChildAlias"></span> likes to play in <span data-frm-calc="frmHisHer"></span> bed for awhile before getting up, provide books or photo albums with pictures of things <span data-frm-calc="frmHeShe"></span> likes to motivate<span data-frm-calc="frmHimHer"></span> to look at, point to, and touch the pictures while you name them.',
			'Talk about colors when <span data-frm-calc="frmChildAlias"></span> is in <span data-frm-calc="frmHisHer"></span> crib or bed (blue blanket, yellow light, brown teddy bear).',
			'Ask <span data-frm-calc="frmChildAlias"></span> to give you the big or little object like “Give me the big animal.”',
			'At bedtime, use a soothing voice to calm <span data-frm-calc="frmChildAlias"></span> to sleep. Soft singing and humming may be especially relaxing. Try playing a music box or another source of quiet music when you leave the room. <span data-frm-calc="frmChildAlias"></span> may begin to associate this music with feeling sleepy.',
			'Try establishing a routine of reading books before bedtime. If you sit in the same spot and spend about the same amount of time reading each day, <span data-frm-calc="frmChildAlias"></span> will begin to associate this with getting ready for sleep.',
			'Try rocking <span data-frm-calc="frmChildAlias"></span> and singing specific songs prior to bedtime. If you do this consistently, <span data-frm-calc="frmChildAlias"></span> will begin to associate this experience with getting ready for sleep.',
			'Try telling ‘made up’ stories during bedtime. Make up stories about <span data-frm-calc="frmChildAlias"></span>, using <span data-frm-calc="frmHisHer"></span> name. Incorporate things that <span data-frm-calc="frmHeShe"></span> likes to do and the people in <span data-frm-calc="frmHisHer"></span> life.'
        ], [
			'For children who need time to move out of their crib/bed (enjoy a slow start):',
			'Slowly add stimuli to bedroom (lights, voice, toys).',
			'Give <span data-frm-calc="frmChildAlias"></span> time to respond (wait time) to being lifted from crib/bed. While <span data-frm-calc="frmChildAlias"></span> is sitting or lying down, talk, sing favorite songs, or just keep<span data-frm-calc="frmHimHer"></span> company while <span data-frm-calc="frmHeShe"></span> plays.',
			'Wrap <span data-frm-calc="frmChildAlias"></span> in a blanket for several minutes to help<span data-frm-calc="frmHimHer"></span> get comfortable before diapering/dressing or moving to another room.',
			'Give <span data-frm-calc="frmChildAlias"></span> a familiar/preferred item when <span data-frm-calc="frmHeShe"></span> wakes (stuffed animal, blanket, toy).',
			'For children that may benefit from “alerting” to improve their attention, social or motor skills.',
			'Provide massage to <span data-frm-calc="frmChildAlias"></span>’s back, arms, hands, legs and feet before lifting or moving<span data-frm-calc="frmHimHer"></span> from the crib/bed.',
			'Give plenty of wait time for <span data-frm-calc="frmChildAlias"></span> to sit or stand up to be picked up.',
			'Sing favorite song or provide favorite toy to gain <span data-frm-calc="frmHisHer"></span> visual attention.',
			'Provide gentle bouncing while holding and walking with <span data-frm-calc="frmChildAlias"></span> while in <span data-frm-calc="frmHisHer"></span> room or walking from the room.',
			'Prior to sleep/bedtime:',
			'Avoid television or computer time (screen time) at least 2 hours before bedtime to allow <span data-frm-calc="frmChildAlias"></span> to relax and be ready for sleep.',
			'Turn down the lights and close the curtains/blinds before bringing <span data-frm-calc="frmChildAlias"></span> into <span data-frm-calc="frmHisHer"></span> bedroom.',
			'Try giving <span data-frm-calc="frmChildAlias"></span> a massage before bedtime.',
			'Try a night light with a warm glow and/or room darkening shades.',
			'Try running a fan in the room to reduce excess background noise while <span data-frm-calc="frmChildAlias"></span> is sleeping.'
		], [
			'Encourage <span data-frm-calc="frmChildAlias"></span> to help with undressing, such as pulling arms through shirt sleeves and legs through pants.',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to work on independent undressing skills with simple steps to manage clothing ' +
			'(e.g.; removing pajama bottoms or socks). Start the action for <span data-frm-calc="frmChildAlias"></span> so that <span data-frm-calc="frmHeShe"></span> ' +
			'only has to complete it (for example: pull arm ½ way from sleeve, pull shirt to head, pull sock over heel).',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to help with dressing when possible (for example, pushing arms through shirt sleeves and legs through pants).',
			'Encourage independence with dressing when possible. Have <span data-frm-calc="frmChildAlias"></span> complete a portion of dressing ' +
			'that you have started (for example, place <span data-frm-calc="frmHisHer"></span> shirt on head to pull down, pull <span data-frm-calc="frmHisHer"></span> ' +
			'sock over heel, arrange pants on floor so <span data-frm-calc="frmChildAlias"></span> can place <span data-frm-calc="frmHisHer"></span> feet/legs into pant legs.',
			'To help <span data-frm-calc="frmChildAlias"></span> put on <span data-frm-calc="frmHisHer"></span> pants, try having <span data-frm-calc="frmHimHer"></span> ' +
			'stand up and step into the pants as you hold them low to the floor. Encourage <span data-frm-calc="frmChildAlias"></span> to hold onto you with both hands at first. ' +
			'When this gets easier, encourage <span data-frm-calc="frmChildAlias"></span> to use <span data-frm-calc="frmHisHer"></span> hands to help pull the pants up.',
			'Give <span data-frm-calc="frmChildAlias"></span> opportunities to become familiar with going to the bathroom by showing<span data-frm-calc="frmHimHer"></span> your routine of using the toilet, flushing the toilet, and washing and drying your hands.',
			'Be aware of readiness signs <span data-frm-calc="frmChildAlias"></span> may be showing.(staying dry for 2-3 hours at a time, waking up dry, ' +
			'going in a corner to use diaper, using gestures or words to tell you<span data-frm-calc="frmHeShe"></span> has soiled <span data-frm-calc="frmHisHer"></span> ' +
			'diaper, and participating in diaper changing or toileting routines).',
			'Borrow books or videos from the library that encourage using the potty.',
			'Provide stable position for toileting/toilet training (separate potty seat or ring for toilet), if using ring for toilet, use a step stool to provide support under <span data-frm-calc="frmHisHer"></span> feet while sitting.',
			'Engage in “pre-potty training” activities:<br />a.teach concept of wet/dry during bathing, hand washing,<br />b.change ' +
			'<span data-frm-calc="frmChildAlias"></span>\'s diaper in bathroom to pair changing with toileting,<br />c.encourage <span data-frm-calc="frmChildAlias"></span> ' +
			'to help with changing <span data-frm-calc="frmHisHer"></span> diaper or clothing,<br />c.practice sitting on potty seat/ring to develop comfort in new posture,' +
			'<br />d.identify schedule/patterns so that use of the toilet can be used at time that will increase chance of success',
			'While toilet training, provide a box of books near the potty to help entertain <span data-frm-calc="frmChildAlias"></span> while <span data-frm-calc="frmHeShe"></span> is sitting on the potty.'
		], [
			'Smile and talk to <span data-frm-calc="frmChildAlias"></span> when changing <span data-frm-calc="frmHisHer"></span> diaper. See if <span data-frm-calc="frmHeShe"></span> will take turns making sounds with you.',
			'Label body parts that are being dressed such as: “Push your hand into your sleeve,” “Pull the shirt over your head.”',
			'Play peek-a-boo while pulling shirt over <span data-frm-calc="frmChildAlias"></span> \'s head.',
			'Look in the mirror and say “there’s <span data-frm-calc="frmChildAlias"></span>,” to helpstart to recognize <span data-frm-calc="frmHimselfHerself"></span>.',
			'Have a structured routine for dressing/diapering so <span data-frm-calc="frmChildAlias"></span> knows what to expect and how long it will last. Sing the same song each time to help <span data-frm-calc="frmChildAlias"></span> know when the activity is finished.',
			'Help <span data-frm-calc="frmChildAlias"></span> touch the clothes that <span data-frm-calc="frmHeShe"></span> will be putting on (e.g., diaper, socks, shoes, shirt, pants, lotion, etc.).',
			'Label the different pieces of clothing before putting on or taking off (“<span data-frm-calc="frmChildAlias"></span>’s shirt” or “Your shirt”).',
			'Ask questions such as: “Where is your nose? Where is my nose?” to help <span data-frm-calc="frmChildAlias"></span> understand mine and yours.'
		], [
			'Help <span data-frm-calc="frmChildAlias"></span> touch different items that <span data-frm-calc="frmHeShe"></span> will be putting on while you name them (e.g., diaper, socks, shoes, shirt, pants, lotion, etc.).',
			'Ask questions such as “Where is your shirt?” or “Where is your diaper?” Help <span data-frm-calc="frmChildAlias"></span> find the item by pointing to it or taking<span data-frm-calc="frmHimHer"></span> to it if needed. Name the object again.',
			'Hold up two items such as a sock and a shirt and ask <span data-frm-calc="frmChildAlias"></span> to point to or show you the one named.',
			'Ask <span data-frm-calc="frmChildAlias"></span> to follow simple directions related to <span data-frm-calc="frmHisHer"></span> daily routine. ' +
			'Help <span data-frm-calc="frmChildAlias"></span> find the item by using gestures such as pointing to objects. For example, ' +
			'if you are going to change <span data-frm-calc="frmHisHer"></span> diaper, ask <span data-frm-calc="frmChildAlias"></span> to “Go get diaper” or “Go to the bathroom. ' +
			'”Help <span data-frm-calc="frmChildAlias"></span> when needed so <span data-frm-calc="frmHeShe"></span> can be successful.',
			'Use words that describe position, such as out and on, during dressing or changing <span data-frm-calc="frmChildAlias"></span> (e.g., repeating “out” when taking wipes out of the container or “on” when putting <span data-frm-calc="frmHisHer"></span> shirt on).',
			'Encourage my versus your activities when pointing to body parts or clothing items to help <span data-frm-calc="frmChildAlias"></span> understand pronouns (e.g., “Where is your nose? Where is my nose?”).',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to follow simple directions such as “Get your pants,” or “Put your diaper in the pail.”',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to follow 2-step directions such as “Get your shoes and then put them on your feet.”',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to follow 2-step unrelated directions such as“Put your jammies on the chair and then give me your shoes.”'
		], [
			'Repeat sounds/words <span data-frm-calc="frmChildAlias"></span> says. Take turns repeating the sounds and words.',
			'Give <span data-frm-calc="frmChildAlias"></span> plenty of wait time (silence) to think about sounds and words you are saying so <span data-frm-calc="frmHeShe"></span> can try to say them.',
			'Hold objects such as a shirt, sock, or shoe next to your mouth as you say the name of the object to encourage <span data-frm-calc="frmChildAlias"></span> to watch your mouth while you speak.',
			'Point to your mouth when making sounds to help <span data-frm-calc="frmChildAlias"></span> notice how lips, jaw, and tongue move to make sounds.',
			'Make silly faces or sounds while changing <span data-frm-calc="frmHimHer"></span> to encourage <span data-frm-calc="frmChildAlias"></span> to experiment with moving <span data-frm-calc="frmHisHer"></span> mouth in different ways to try new sounds and words.',
			'Instead of asking yes/no questions (e.g., “Do you have to use the potty?”), encourage <span data-frm-calc="frmChildAlias"></span> to use words that describe what <span data-frm-calc="frmHeShe"></span> is doing (say “pee pee” or “tell me potty”).',
			'Model words <span data-frm-calc="frmChildAlias"></span> has difficulty saying by using correct productions of sounds. For example, if <span data-frm-calc="frmChildAlias"></span> says “ee” for “please,” point to your own lips and repeat back “P-L-EE-Z” in a slow exaggerated manner.',
			'Model correct pronunciations of words. For example, if <span data-frm-calc="frmChildAlias"></span> says “a a,” repeat back “potty.”',
			'Model 1 word at a time to acknowledge any communication attempts <span data-frm-calc="frmChildAlias"></span> makes, such as looking at you, ' +
			'leading you, reaching, pointing, or saying a sound. For example, if <span data-frm-calc="frmChildAlias"></span> pulls you towards something, ' +
			'model the word you would want <span data-frm-calc="frmHimHer"></span> to say such as “come,” “help,” “mama,” or “dada.” ' +
			'If <span data-frm-calc="frmChildAlias"></span> becomes frustrated while putting <span data-frm-calc="frmHisHer"></span> shirt on, model “help.”',
			'When <span data-frm-calc="frmChildAlias"></span> points to something <span data-frm-calc="frmHeShe"></span> wants, give <span data-frm-calc="frmHimHer"></span> a simple word to say to ask for what <span data-frm-calc="frmHeShe"></span> wants. Repeat the word before giving <span data-frm-calc="frmChildAlias"></span> the item.',
			'Give <span data-frm-calc="frmChildAlias"></span> a choice of two items by holding them up in front of <span data-frm-calc="frmHimHer"></span> ' +
			'and waiting for <span data-frm-calc="frmHimHer"></span> to communicate with a point, reach, sound, or word. Once <span data-frm-calc="frmHeShe"></span> ' +
			'tries to communicate, model the word you would like <span data-frm-calc="frmHimHer"></span> to say. For example, hold up a shirt and pants and wait for ' +
			'<span data-frm-calc="frmChildAlias"></span> to choose one. If <span data-frm-calc="frmHeShe"></span> points to or reaches for the pants, say “pants.”',
			'Create communication opportunities (pointing, speaking bringing you the item) by putting items <span data-frm-calc="frmChildAlias"></span> wants out of reach. For example, place shoes on a shelf.',
			'Expand <span data-frm-calc="frmChildAlias"></span>’s words and phrases by adding one word at a time to what <span data-frm-calc="frmHeShe"></span> says. ' +
			'For example, if <span data-frm-calc="frmChildAlias"></span> says, “Socks”, repeat back “Your socks,” “My socks” or “Want socks.” ' +
			'If <span data-frm-calc="frmHeShe"></span> attempts those two words, add another by saying “Want my socks” or “I want socks.”',
			'Combining 3+ words together:Model words <span data-frm-calc="frmChildAlias"></span> already says in 3 and 4-word phrases, such as “Mommy please help me,” “I want potty” and “My blue pants.”',
			'Expand phrases <span data-frm-calc="frmChildAlias"></span> says by adding one word at a time. Model describing words, prepositions, and opposites, such as colors, shapes, in, out, on, off, under, above, behind, below, big/little, cold/hot, wet/dry, tall/short, and hard/soft (“Green shirt,” “The book is hard, your blanket is soft,” “The doll is under the bed.”)',
			'Ask <span data-frm-calc="frmChildAlias"></span> silly yes/no questions to encourage <span data-frm-calc="frmHimHer"></span> to respond “yes” and “no.”For example, “Is your shoe on your head?”, “Are you in the bathtub?”, “Are you sitting in a chair?”, “Is there an elephant in this room?” Humor helps to make communication fun.'
		], [
			'Encourage <span data-frm-calc="frmChildAlias"></span> to touch, hold and explore <span data-frm-calc="frmHisHer"></span> toes while lying on <span data-frm-calc="frmHisHer"></span> back.',
			'While <span data-frm-calc="frmChildAlias"></span> is on <span data-frm-calc="frmHisHer"></span> back being changed, encourage <span data-frm-calc="frmHimHer"></span> to lift <span data-frm-calc="frmHisHer"></span> hips up to help with pulling up pants.',
			'Offer <span data-frm-calc="frmChildAlias"></span> a clothing item or clean diaper to hold with both hands when <span data-frm-calc="frmHeShe"></span> is on <span data-frm-calc="frmHisHer"></span> back being changed.',
			'After changing <span data-frm-calc="frmChildAlias"></span>’s diaper, help <span data-frm-calc="frmHimHer"></span> come to a sitting position by holding <span data-frm-calc="frmHisHer"></span> hands and gently encouraging <span data-frm-calc="frmHimHer"></span> to lift <span data-frm-calc="frmHisHer"></span> head, shoulders and back.',
			'After changing, support <span data-frm-calc="frmChildAlias"></span> at <span data-frm-calc="frmHisHer"></span> hips and let <span data-frm-calc="frmHimHer"></span> practice sitting for a brief period of time.',
			'Try placing a sock or clothing item just out of reach to encourage <span data-frm-calc="frmChildAlias"></span> to pull to standing to get it.',
			'Encourage balance skills by having <span data-frm-calc="frmChildAlias"></span> hold onto you or furniture while lifting one leg to place in pant leg.',
			'Provide a stable surface for toileting by offering a step stool to rest feet when sitting.'
		], [
			'Give time for <span data-frm-calc="frmChildAlias"></span> to turn <span data-frm-calc="frmHisHer"></span> head towards you while changing. Occasionally change direction of where <span data-frm-calc="frmHeShe"></span> is positioned to encourage head turning to the right and left.',
			'Have <span data-frm-calc="frmChildAlias"></span> help hold a sock or clean diaper while lying on <span data-frm-calc="frmHisHer"></span> back. Encourage <span data-frm-calc="frmChildAlias"></span> to reach with both handsto touch and hold the item.',
			'Use words such as “squeeze” to encourage <span data-frm-calc="frmChildAlias"></span> to hold onto the sleeves of <span data-frm-calc="frmHisHer"></span> shirt and/or waistband of <span data-frm-calc="frmHisHer"></span> pants while putting them on and taking them off.',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to release clothing or items into your hand or into a hamper.',
			'Begin pulling Velcro so <span data-frm-calc="frmChildAlias"></span> can lift with ease, position Velcro so <span data-frm-calc="frmHeShe"></span> can push to secure it.',
			'During dressing tasks, encourage <span data-frm-calc="frmChildAlias"></span> to practice putting pull ups/clothes/socks on and off a favorite stuffed animal or doll.',
			'While playing dress up activities with stuffed animals, have <span data-frm-calc="frmChildAlias"></span> practice fastening Velcro and opening/closing large buttons.',
			'Place soap and towels within <span data-frm-calc="frmChildAlias"></span> reach to encourage independence with hygiene activities.',
			'Provide a stable surface/step-stool so that <span data-frm-calc="frmChildAlias"></span> can reach the sink and faucet easily.',
			'When helping <span data-frm-calc="frmChildAlias"></span> wash <span data-frm-calc="frmHisHer"></span> hands, support <span data-frm-calc="frmHimHer"></span> ' +
			'at the elbows to help bring <span data-frm-calc="frmHisHer"></span> hands together. Try counting or singing a song for the amount of time needed to finish. ' +
			'This will help <span data-frm-calc="frmChildAlias"></span> identify the beginning and end of the task.',
			'Talk about wet and dry to encourage <span data-frm-calc="frmChildAlias"></span> to wipe both sides of hands after washing.'
		], [
			'While changing <span data-frm-calc="frmChildAlias"></span>’s clothes, make repeated actions (such as lifting <span data-frm-calc="frmChildAlias"></span>’s arms up while saying arms up!)to help <span data-frm-calc="frmChildAlias"></span> anticipate what is coming next.',
			'Play ‘Pat-a-cake” with <span data-frm-calc="frmChildAlias"></span>’s hands or feet after a diaper change.',
			'While <span data-frm-calc="frmChildAlias"></span> is on <span data-frm-calc="frmHisHer"></span> back after getting a diaper changed, play peek-a-boo games with <span data-frm-calc="frmChildAlias"></span>.',
			'Hide behind your hands or an object, such as a diaper, and encourage <span data-frm-calc="frmChildAlias"></span> to initiate and imitate your actions. Go back and forth with <span data-frm-calc="frmChildAlias"></span> as long as you can while <span data-frm-calc="frmHeShe"></span> is still interested.',
			'When <span data-frm-calc="frmChildAlias"></span> is on <span data-frm-calc="frmHisHer"></span> back after a diaper change, play a “How Does the Animal Walk?” game. ' +
			'Make up playful rhythmic movements for different animals with <span data-frm-calc="frmHisHer"></span> feet. For example: ' +
			'Elephant- move feet up and down in big strides, Horse-move feet in galloping pattern, Rabbit- hold both of feet together to make hops.',
			'Play ‘This Little Piggy’ with <span data-frm-calc="frmChildAlias"></span>’s fingers and toes during dressing. Give each finger and toe a little kiss.',
			'Make silly faces like opening your mouth wide, exaggerated smiling, or sticking out your tongue to encourage <span data-frm-calc="frmChildAlias"></span> to imitate your facial gestures.',
			'To encourage longer spans of attention, sing songs with <span data-frm-calc="frmChildAlias"></span> during diaper changes or potty time with definite endings (e.g., Head, Shoulders, Knees & Toes; Five Little Monkeys; or Wheels on the Bus.”',
			'During dressing, name <span data-frm-calc="frmChildAlias"></span>’s body parts while using a playful voice.',
			'Play games such as “hide-and-seek” to encourage <span data-frm-calc="frmChildAlias"></span> to search for removed objects such as socks or shoes.',
			'Have <span data-frm-calc="frmChildAlias"></span> clean up <span data-frm-calc="frmHisHer"></span> clothes or diaper before moving on to the next activity. Making a clear end to an activity will help <span data-frm-calc="frmChildAlias"></span> understand “all done”.',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to solve problems that arise such as pulling <span data-frm-calc="frmHisHer"></span> shirt when it issticking out of the drawer or using a tool/toy to get something that is out of reach (under the dresser or bed).',
			'Encourage number/counting activities. Ask <span data-frm-calc="frmChildAlias"></span> to give you one and one more. Use items that have many to pick from like a pile of diapers or clothes.',
			'Talk about colors when getting <span data-frm-calc="frmChildAlias"></span> dressed (red shirt, green socks, blue pants).',
			'Have <span data-frm-calc="frmChildAlias"></span> identify items by their use rather than their name such as “you wear a …shirt”.',
			'Incorporate sorting activities while changing <span data-frm-calc="frmHimHer"></span> such as sorting socks by color.',
			'Talk about big versus little such as “That’s a big shirt, here’s the little shirt”, “Daddy has big shoes” and “<span data-frm-calc="frmChildAlias"></span> has little shoes.”Talk about sizes of clothes when getting dressed.',
			'Ask <span data-frm-calc="frmChildAlias"></span> to give you the big or little object such as “Give me the big shoe".',
			'Ask <span data-frm-calc="frmChildAlias"></span> questions which require <span data-frm-calc="frmHimHer"></span> to identify common actions or familiar objects by their use. For example, “What do you put on your head?", "What do you wear on your feet?”, or “What do you wear to keep warm?”'
		], [
			'Try massaging <span data-frm-calc="frmChildAlias"></span>’s arms, legs, back, hands and feet before dressing to help make them comfortable and prepared to begin.',
			'Dress in a consistent part of the home to allow <span data-frm-calc="frmChildAlias"></span> to become familiar and comfortable with the routine (dress on floor in front of dresser).',
			'Use counting or sing a familiar song to identify beginning and ending of dressing activities.',
			'To build interest in helping with dressing, offer <span data-frm-calc="frmChildAlias"></span> a choice of two clothing items to wear.',
			'Identify <span data-frm-calc="frmChildAlias"></span>’s clothing preferences (style, texture of fabric) and respect choices of clothing when you are able.',
			'Allow for toilet training to take place in a consistent bathroom make the routine more predictable.',
			'Place footstool under <span data-frm-calc="frmChildAlias"></span> feet to allow <span data-frm-calc="frmHimHer"></span> to feel more secure when sitting on the potty.',
			'Sing songs or read a book to increase comfort with sitting on the potty.',
			'If <span data-frm-calc="frmChildAlias"></span> is frightened by flushing, allow <span data-frm-calc="frmChildAlias"></span> ' +
			'to step from the bathroom and observe you flushing the toilet. Encourage <span data-frm-calc="frmChildAlias"></span> to approach thetoilet one step at a time until ' +
			'<span data-frm-calc="frmHeShe"></span> isready to flush the toilet by <span data-frm-calc="frmHimselfHerself"></span>.',
			'Use counting or sing a familiar song to identify beginning and ending of hand washing.'
		], [
			'Encourage <span data-frm-calc="frmChildAlias"></span> to bring both hands to the bottle by supporting <span data-frm-calc="frmHisHer"></span> arms.',
			'Consider using a spoon with a “flatter” bowl, rather than a deep one. This will allow <span data-frm-calc="frmChildAlias"></span> to bring <span data-frm-calc="frmHisHer"></span> lips down on the spoon more efficiently to remove the food.',
			'When placing the spoon into <span data-frm-calc="frmChildAlias"></span>’s mouth, give <span data-frm-calc="frmHimHer"></span> extra wait time to bring <span data-frm-calc="frmHisHer"></span> lips around the spoon so eating is more active.',
			'A “yucky” face response is often a response to something new, not a dislike of a new food.',
			'Continue to offer new foods consistently and often.',
			'Respect when <span data-frm-calc="frmChildAlias"></span> is finished eating. Turning from the spoon or closing <span data-frm-calc="frmHisHer"></span> mouth is communicating <span data-frm-calc="frmHisHer"></span> preference.',
			'Play with teething toys to help <span data-frm-calc="frmChildAlias"></span> get ready for chewing and biting food.',
			'Offer a variety of tastes to develop food enjoyment and ability to accept new foods.',
			'Offer a variety of different (age appropriate) food textures to help <span data-frm-calc="frmChildAlias"></span> learn how to chew food.',
			'Cut food items like toast or sandwiches into long strips so <span data-frm-calc="frmChildAlias"></span> can practice biting on the side (using molars). Encourage <span data-frm-calc="frmChildAlias"></span> to take a bite then put food down to chew before taking another bite.',
			'To help prepare <span data-frm-calc="frmChildAlias"></span> to drink from a “grown-up” cup, try giving <span data-frm-calc="frmHimHer"></span> a cup with an inset lid rather than a bottle or sippy cup with plastic spout.',
			'Help <span data-frm-calc="frmChildAlias"></span> strengthen <span data-frm-calc="frmHisHer"></span> mouth muscles by offering thicker drinks through a straw (e.g., fruit smoothies, pudding or melted ice-cream).',
			'Help <span data-frm-calc="frmChildAlias"></span> drink from an open cup at mealtime. Use Dixie cups or small plastic caps with an ounce or ' +
			'two of water to decrease spilling. Help <span data-frm-calc="frmChildAlias"></span> hold the cup and put it up to <span data-frm-calc="frmHisHer"></span> ' +
			'mouth. Encourage <span data-frm-calc="frmChildAlias"></span> to close <span data-frm-calc="frmHisHer"></span> lips around the lip of the cup and take single sips at a time.',
			'Give <span data-frm-calc="frmChildAlias"></span> opportunities to drink from an open cup at mealtime. Start with single sips of liquid in small cups and gradually work up to larger amounts of liquid in bigger cups. Sippy cups that have tops like plastic coffee-to-go containers are helpful as well since the lip of the cup is thicker.',
			'Provide <span data-frm-calc="frmChildAlias"></span> with a variety of (age appropriate) table foods, allowing <span data-frm-calc="frmHimHer"></span> to eat independently with a fork/spoon.',
			'Try reading to <span data-frm-calc="frmChildAlias"></span> while <span data-frm-calc="frmHeShe"></span> is sitting in high chair eating a snack.',
            'If both breastfeeding and bottle feeding <span data-frm-calc="frmChildAlias"></span>, consider using the approach of “paced bottle feeding.” Look for ' +
            '<span data-frm-calc="frmChildAlias"></span>\'s hunger cues to indicate it is time to feed rather than feeding on a schedule. ' +
            'Present the bottle at <span data-frm-calc="frmChildAlias"></span>\'s cheek and allow <span data-frm-calc="frmHimHer"></span> to root, or turn ' +
            '<span data-frm-calc="frmHisHer"></span> head, towards the nipple. Present the bottle in a more horizontal position to keep the flow slower and ' +
            'build in pauses to prevent guzzling. Switch sides midway through the feed, after about 10 to 20 minutes. This overall approach can help to support ' +
            'continued simultaneous breastfeeding by making the bottle feeding experience more similar to it.',
			'At 3 months, you should begin to recognize <span data-frm-calc="frmChildAlias"></span>\'s different cries. Hunger and pain cries should still be met right away. If it is an “I’m bored” or want a new toy cry, it is ok to let them fuss for 2 to 3 minutes at most. Eventually <span data-frm-calc="frmChildAlias"></span> will learn how to self-soothe when every need is not immediately met.'
		], [
			'Hold <span data-frm-calc="frmChildAlias"></span> so that <span data-frm-calc="frmHisHer"></span> face is about 12 inches away from your face when giving <span data-frm-calc="frmHimHer"></span> a bottle. This is the best focusing distance for young infants.',
			'When possible, include <span data-frm-calc="frmChildAlias"></span> in family meals. Eating with family member(s) helps teach kids to talk, share ideas and develop social connections. Sharing meals is a nice way to learn that mealtime can be fun and relaxing.',
			'Have <span data-frm-calc="frmChildAlias"></span> help with mealtime by handing you <span data-frm-calc="frmHisHer"></span> plate when finished.',
			'Offer some structure around meals by setting a desired amount of time <span data-frm-calc="frmChildAlias"></span> is asked to sit.',
			'To help with a phase of throwing at mealtime, place food/utensils/cup out of reach, distract <span data-frm-calc="frmChildAlias"></span> briefly, then reintroduce. Offering a bowl may encourage <span data-frm-calc="frmChildAlias"></span> to place food or utensils in it rather than throw.',
			'Talk about kitchen safety issues, such as avoiding a hot stove, sharp items, etc.',
			'When introducing table food, pay attention to <span data-frm-calc="frmChildAlias"></span>\'s cues. Turning <span data-frm-calc="frmHisHer"></span> ' +
			'head away or pushing spoon away indicates that <span data-frm-calc="frmHeShe"></span> has had enough to eat. Honoring <span data-frm-calc="frmHisHer"></span> ' +
			'cues at this young age teaches <span data-frm-calc="frmChildAlias"></span> to honor <span data-frm-calc="frmHisHer"></span> body when older.'
		], [
			'Help <span data-frm-calc="frmChildAlias"></span> touch different items on the table such as a cup, spoon, bowl and food items while you name what they are.',
			'Use simple, 1-2 repetitive words to talk about what you are doing. For example, if you are pouring a drink, say “pour, pour, pour.”',
			'Point to familiar items around the room to encourage <span data-frm-calc="frmChildAlias"></span> to look at what you are pointing to.',
			'Ask questions such as “Where is cup?” or “Where is your spoon?”Help <span data-frm-calc="frmChildAlias"></span> find the item by pointing to it or taking <span data-frm-calc="frmHimHer"></span> to it. When you give <span data-frm-calc="frmChildAlias"></span> the object, name it again.',
			'Hold up two items such as a cup and a spoon and ask <span data-frm-calc="frmChildAlias"></span> to point to or show you the one named.',
			'Use words that describe position, such as out and on, during meal or snack time (e.g., repeating “out” when taking snacks out of the box or “on” when putting a cup on the table).',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to follow simple directions such as “Give me the cup,” or “Go get your bowl.”',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to follow 2-step directions such as “Get your bowl and then put it on the table.”',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to follow 2-step unrelated directions such as “Get your bowl then bring me your cup.”',
			'Talk to <span data-frm-calc="frmChildAlias"></span> while feeding <span data-frm-calc="frmHimHer"></span>. Talk about what <span data-frm-calc="frmHeShe"></span> is eating, or use simple words to comment on the meal, i.e. "yummy peas!"It\'s never too early to start introducing words for your baby to hear and begin to understand.'
		], [
			'Repeat sounds/words <span data-frm-calc="frmChildAlias"></span> says. Take turns repeating the sounds and words.',
			'Give <span data-frm-calc="frmChildAlias"></span> plenty of wait time (silence) to think about the sounds and words you are saying so <span data-frm-calc="frmHeShe"></span> can try to say them.',
			'Hold objects such as a cup, spoon, or milk next to your mouth as you say the name of the object to encourage <span data-frm-calc="frmChildAlias"></span> to watch your mouth while you speak.',
			'Point to your mouth when making sounds to help <span data-frm-calc="frmChildAlias"></span> notice how lips, jaw, and tongue move to make sounds.',
			'Make silly faces or sounds to encourage <span data-frm-calc="frmChildAlias"></span> to experiment with moving <span data-frm-calc="frmHisHer"></span> mouth in different ways to try new sounds and words.',
			'Instead of asking yes/no questions (e.g., “Do you want milk?”) encourage <span data-frm-calc="frmChildAlias"></span> to use words that describe what <span data-frm-calc="frmHeShe"></span> wants (“Say milk” or “Tell me milk”).',
			'Model words <span data-frm-calc="frmChildAlias"></span> has difficulty saying by using correct productions of sounds. For example, if <span data-frm-calc="frmChildAlias"></span> says “ee” for “please”, point to your own lips and repeat back “P-L-EE-Z” in a slow exaggerated manner.',
			'Model correct pronunciations of words. For example, if <span data-frm-calc="frmChildAlias"></span> says “I ah oo”, repeat back “You want juice.”',
			'Introduce simple gestures and signs (e.g., squeezing hand open and closed for “milk”) to show <span data-frm-calc="frmChildAlias"></span> ways to communicate before <span data-frm-calc="frmHeShe"></span> has the words.',
			'Use simple, 1-2 repetitive words/phrases when talking to <span data-frm-calc="frmChildAlias"></span> to encourage <span data-frm-calc="frmHimHer"></span> to repeat what you are saying. For example, if you are going to pick <span data-frm-calc="frmChildAlias"></span> up fromthe highchair, say “up, up, up.”',
			'Model 1 word at a time to acknowledge any communication attempt <span data-frm-calc="frmChildAlias"></span> makes, such as looking at you, leading you, ' +
			'reaching, pointing, or saying a sound. For example, if <span data-frm-calc="frmChildAlias"></span> pulls you towards something, model the word you would want ' +
			'<span data-frm-calc="frmHimHer"></span> to say such as “come,” “help," “mama,” or “dada.”If <span data-frm-calc="frmChildAlias"></span> is crying because ' +
			'<span data-frm-calc="frmHisHer"></span> milk is finished, model “milk.”',
			'When <span data-frm-calc="frmChildAlias"></span> points to something <span data-frm-calc="frmHeShe"></span> wants, give <span data-frm-calc="frmHimHer"></span> a simple word to say to ask for what <span data-frm-calc="frmHeShe"></span> wants. Repeat the word before giving <span data-frm-calc="frmChildAlias"></span> the item.',
			'Give <span data-frm-calc="frmChildAlias"></span> a choice of two items by holding them up in front of <span data-frm-calc="frmHimHer"></span>. ' +
			'Wait for <span data-frm-calc="frmHimHer"></span> to communicate with a point, reach, sound, or word. Once <span data-frm-calc="frmHeShe"></span> ' +
			'tries to communicate, model the word you would like <span data-frm-calc="frmHimHer"></span> to say. For example, hold up a cup and a snack and wait for ' +
			'<span data-frm-calc="frmChildAlias"></span> to choose one. If <span data-frm-calc="frmHeShe"></span> points to or reaches towards the cup, say the word “cup.”',
			'Create communication opportunities (pointing, speaking, bringing you an item) by putting items in a container <span data-frm-calc="frmHeShe"></span> needs help opening. For example, place cereal in a container with a lid.',
			'Expand <span data-frm-calc="frmChildAlias"></span>’s words and phrases by adding 1 word at a time to what <span data-frm-calc="frmHeShe"></span> says. For example, if <span data-frm-calc="frmChildAlias"></span> says, “Milk”, repeat back “Want milk” or “My milk.”If <span data-frm-calc="frmHeShe"></span> attempts those two words, add another by saying “Want my milk” or “I want milk.”',
			'Combining 3+ words together:Model words <span data-frm-calc="frmChildAlias"></span> already says in 3 and 4-word phrases such as “Mommy please help me,” “I want juice” and “My blue cup.”',
			'Expand phrases <span data-frm-calc="frmChildAlias"></span> says by adding one word at a time. Model describing words, prepositions, and opposites for ' +
			'<span data-frm-calc="frmChildAlias"></span> to imitate such as colors, shapes, in, out, on, off, under, above, behind, below, big/little, cold/hot, wet/dry, tall/short, ' +
			'and hard/soft (“Light is above you,” “The dog is under the table,” “My cereal is hot, yours is cold.”)',
			'Model words/phrases such as “I’m mad,” “Stop,” or “All done” for <span data-frm-calc="frmChildAlias"></span> to use instead of frustrated actions/behaviors.',
			'Ask<span data-frm-calc="frmChildAlias"></span> silly yes/no questions to encourage <span data-frm-calc="frmHimHer"></span> to respond “yes” and “no” such as “Is your cup on your head?”, “Are you in the bathtub?”, “Are you laying in a chair?”, “Is there an elephant in this room?” Humor helps to make communication fun.'
		], [
			'Provide high chair or booster chair that allows <span data-frm-calc="frmChildAlias"></span> to sit upright.',
			'To help <span data-frm-calc="frmChildAlias"></span> with sitting, provide a chair that has foot rests so that <span data-frm-calc="frmHeShe"></span> can use <span data-frm-calc="frmHisHer"></span> feet to support <span data-frm-calc="frmHimselfHerself"></span>.',
			'Provide <span data-frm-calc="frmChildAlias"></span> with a tray or booster seat that moves up to table to allow <span data-frm-calc="frmHimHer"></span> to use <span data-frm-calc="frmHisHer"></span> arms for support when sitting.',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to carry <span data-frm-calc="frmHisHer"></span> cup to the table to allow <span data-frm-calc="frmHimHer"></span> to practice walking while holding an object.',
			'Encourage to <span data-frm-calc="frmChildAlias"></span> to bring a cup/bowl/plate/napkin or food item to the table to practice carrying items while walking.',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to get into toddler chair all by <span data-frm-calc="frmHimselfHerself"></span>, or with a little help.'
		], [
			'Provide <span data-frm-calc="frmChildAlias"></span> with support behind back/shoulders so that <span data-frm-calc="frmHisHer"></span> hands can come together naturally in order to place them on bottle/breast.',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to support bottle/cup by placing a hand on either side of the bottle/cup when drinking.',
			'Provide <span data-frm-calc="frmChildAlias"></span> with a tray or booster seat that moves up to a table surface to provide stable surface to eat finger foods or use utensils.',
			'Offer small finger foods to help <span data-frm-calc="frmChildAlias"></span> learn how to use <span data-frm-calc="frmHisHer"></span> fingertips to pick up the pieces.',
			'Offer a bowl on table or tray so that <span data-frm-calc="frmChildAlias"></span> can play with taking out and putting in small finger foods into a container.',
			'Offer <span data-frm-calc="frmChildAlias"></span> two foods and encourage <span data-frm-calc="frmHimHer"></span> to point to what <span data-frm-calc="frmHeShe"></span> prefers.',
			'If <span data-frm-calc="frmChildAlias"></span> is having difficulty tilting <span data-frm-calc="frmHisHer"></span> cup for drinking, try using a cup with a straw.',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to hold the cup with two hands.',
			'Offer foods in (easy to hold and bite) strip shapes.',
			'Give <span data-frm-calc="frmChildAlias"></span> consistent opportunities to practice using a spoon/fork during mealtime.',
			'Help <span data-frm-calc="frmChildAlias"></span> scoop or pierce food using your hand over <span data-frm-calc="frmHisHer"></span> hand.',
			'Use sticky food items like pudding, yogurt, macaroni and cheese, cottage cheese or ice-cream to create more success for spoon use rather than items with different consistencies like cereal in milk.'
		], [
			'Play “Where did it go?” by encouraging <span data-frm-calc="frmChildAlias"></span> to uncover a food item hidden under a napkin.',
			'Model this activity for <span data-frm-calc="frmHimHer"></span> to see if <span data-frm-calc="frmHeShe"></span> will imitate the action of moving the napkin.',
			'While you are preparing a meal, provide books or photo albums with pictures of things <span data-frm-calc="frmChildAlias"></span> likes to motivate <span data-frm-calc="frmHimHer"></span> to look at, point to, and touch the pictures.',
			'Read/show <span data-frm-calc="frmChildAlias"></span> books while <span data-frm-calc="frmHeShe"></span> is eating.',
			'Ask <span data-frm-calc="frmChildAlias"></span> to clean up <span data-frm-calc="frmHisHer"></span> tray/food items before moving on to the next activity. Making a clear end to an activity will help <span data-frm-calc="frmChildAlias"></span> understand “all done”.',
			'Play memory games by hiding an object/piece of food under one of two cups or hiding an object/food item in one of your hands. Encourage <span data-frm-calc="frmChildAlias"></span> to pick the right cup or hand to find the hidden object/food item.',
			'Talk about colors when <span data-frm-calc="frmChildAlias"></span> is eating (red apple, green broccoli, yellow banana, orange cup, red bowl).',
			'Use snack items in different colors to help <span data-frm-calc="frmChildAlias"></span> match colors. Make different piles of the same color to teach <span data-frm-calc="frmChildAlias"></span> how to match and sort.',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to find colors while eating, such as “Give me the blue cup.”Show <span data-frm-calc="frmChildAlias"></span> the correct one if <span data-frm-calc="frmHeShe"></span> doesn’t choose correctly.',
			'Introduce number concepts. Ask<span data-frm-calc="frmChildAlias"></span> to give you one and one more. Use items that have many to pick from such as a pile of Cheerios, Goldfish crackers and fruit snacks.',
			'Have <span data-frm-calc="frmChildAlias"></span> identify items by their use rather than their name such as “you drink out of a …cup” and “you eat with a…spoon”.',
			'Talk about big versus little such as “That’s a big bite, here’s a little bite,” “Daddy has big pizza” and “<span data-frm-calc="frmChildAlias"></span> has little pizza.” Talk about sizes of bowls/plates/utensils at meal time.',
			'Ask <span data-frm-calc="frmChildAlias"></span> to give you the big or little object such as “Give me the big cup."'
		], [
			'Consider nursing or bottle feeding in a quiet environment if <span data-frm-calc="frmChildAlias"></span> has difficulty ‘settling in’ for feedings.',
			'Include <span data-frm-calc="frmChildAlias"></span> in family meals so that <span data-frm-calc="frmHeShe"></span> is able to look at, smell and interact with a variety of different foods. Watching others enjoy a meal is a great way to begin the introduction of new foods.',
			'Provide a consistent place to enjoy mealtime.',
			'For picky eaters, limit food choices to 2 (limiting choices will help <span data-frm-calc="frmChildAlias"></span> feel as though <span data-frm-calc="frmHeShe"></span> has more control over eating).',
			'Provide opportunities for <span data-frm-calc="frmChildAlias"></span> to touch, smell, and interact with foods (through handling, helping prepare, and serving food).',
			'Offer new foods many times, an initial grimace or refusal does not mean <span data-frm-calc="frmChildAlias"></span> will not eventually accept the food (it is typically a response to something new in the mouth).',
			'Decrease distractions during mealtime so that the focus can be on eating/feeding self (TV, toys).',
			'Try offering a straw or open cup as a ‘next step’ from a bottle or sippy cup.',
			'Help <span data-frm-calc="frmChildAlias"></span> practice drinking from a small open cup by placing a small amount of liquid in the cup.'
		], [
			'Prepare <span data-frm-calc="frmChildAlias"></span> beforehand by explaining the rules (e.g., “Hold my hand when we get out of the car").',
			'Have clear and consistent expectations every time you are in a situation where <span data-frm-calc="frmChildAlias"></span> needs to follow safety rules (e.g., in the parking lot).',
			'Try counting or singing a familiar song while in parking lots, or other areas requiring safety, to help <span data-frm-calc="frmChildAlias"></span> remember to hold your hand.',
			'Give <span data-frm-calc="frmChildAlias"></span> opportunities to be around new sounds, toys, and places.',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to put on and take off <span data-frm-calc="frmHisHer"></span> shoes prior to going out. Start with easier shoes like flip flops, sandals, or slippers. Untie laces and loosen the shoe to help make the task easier.',
            'Encourage <span data-frm-calc="frmChildAlias"></span> to help put on <span data-frm-calc="frmHisHer"></span> coat prior to going out. Consider designating an area of the home where <span data-frm-calc="frmChildAlias"></span> can independently hang <span data-frm-calc="frmHisHer"></span> coat back up when <span data-frm-calc="frmHeShe"></span> returns.'
        ], [
			'When exposing <span data-frm-calc="frmChildAlias"></span> to new situations, talk to <span data-frm-calc="frmHimHer"></span> about what <span data-frm-calc="frmHeShe"></span> is seeing, hearing or touching.',
			'Expose <span data-frm-calc="frmChildAlias"></span> to other children <span data-frm-calc="frmHisHer"></span> age through activities like going to the grocery store, mall, shops, church, park/playground, local library, beach, neighborhood activities, family events, and play dates.',
			'When <span data-frm-calc="frmChildAlias"></span> is around other children, sit with <span data-frm-calc="frmHimHer"></span> so you can help start and keep theplay going. Show <span data-frm-calc="frmHimHer"></span> how to interact and play with other children. It’s easier for children to learn this skill with one child then gradually play with a larger group of children.',
			'Create play activities for <span data-frm-calc="frmChildAlias"></span> to interact with peers/siblings by encouraging <span data-frm-calc="frmHimHer"></span> to build towers for all to knock down, fill containers up with blocks to dump out, or hold a book to look at together.',
			'Model words for <span data-frm-calc="frmChildAlias"></span> to hear and repeat when another child is in distress like “uh oh,” “oh no,” “the baby is crying,” “the baby is sad,” or “the baby is ok.”',
			'Encourage sharing by playing with toys such as a tub of blocks. <span data-frm-calc="frmChildAlias"></span> can offer "one for you, one for me."',
			'Encourage safety on outings by modeling a gentle touch with animals or delicate objects.',
			'Talk about holding hands in the parking lot before you get out of the car.',
			'<span data-frm-calc="frmChildAlias"></span> should stay buckled in the car seat at all times. Use a consistent plan for a consequence if <span data-frm-calc="frmChildAlias"></span> should unbuckle.',
			'If your child is anxious around unfamiliar adults, ask the adult to wait for your child to approach them. Do not force <span data-frm-calc="frmChildAlias"></span> to interact with anyone <span data-frm-calc="frmHeShe"></span> does not feel comfortable with.',
			'Communicate your love for <span data-frm-calc="frmChildAlias"></span> right from the start. Children who feel good about their relationship with their parents want to adopt behaviors to please them.'
		], [
			'Help <span data-frm-calc="frmChildAlias"></span> touch different items such as a tree or sand at the park or food items at the store while you name what they are.',
			'Use simple, 1-2 repetitive words to label people, objects, and actions to encourage <span data-frm-calc="frmChildAlias"></span> to attend to the word(s) used around <span data-frm-calc="frmHimHer"></span>. For example, if you are picking <span data-frm-calc="frmChildAlias"></span> up out of the car seat, say “up, up, up”.',
			'Point to familiar items during your outings to encourage <span data-frm-calc="frmChildAlias"></span> to look at what you are pointing to.',
			'Give <span data-frm-calc="frmChildAlias"></span> opportunities to “give” and “go get…” (e.g. “Give me the bucket,” or “Go get the book”).',
			'Use gestures to help <span data-frm-calc="frmChildAlias"></span> understand, such as pointing, holding out your hand, pointing to items or waving your arm in for “come here.”Help <span data-frm-calc="frmChildAlias"></span> be successful when needed.',
			'Ask questions such as “Where is the tree?” or “Where is the car?” Help <span data-frm-calc="frmChildAlias"></span> find the item by pointing to it or taking <span data-frm-calc="frmHimHer"></span> to it. Label the object again.',
			'Hold up two items such as a flower and a piece of grass and ask <span data-frm-calc="frmChildAlias"></span> to point to or show you the object named.',
			'Use words that describe position, such as out and on, during outings (e.g., repeating “out” when taking <span data-frm-calc="frmChildAlias"></span> out of the cart or “on” when putting a jacket on).',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to follow simple directions such as “Get your coat,” or “Find your shoes.”',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to follow 2-step directions such as “Get your shoes and put them by the door.”',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to follow 2-step unrelated directions such as “Get your coat then put your shoes on.”'
		], [
			'Repeat sounds/words <span data-frm-calc="frmChildAlias"></span> says. Take turns repeating the sounds and words.',
			'Give <span data-frm-calc="frmChildAlias"></span> plenty of wait time (silence) to think about the sounds and words you are saying so <span data-frm-calc="frmHeShe"></span> can try to say them.',
			'Wave bye-bye to people when leaving to encourage <span data-frm-calc="frmChildAlias"></span> to wave.',
			'Hold objects such as a flower, toy, or <span data-frm-calc="frmChildAlias"></span>’s cup next to your mouth as you say the name of the object to encourage <span data-frm-calc="frmChildAlias"></span> to watch your mouth while you speak.',
			'Point to your mouth when making sounds to help <span data-frm-calc="frmChildAlias"></span> notice how lips, jaw, and tongue move to make sounds.',
			'Instead of asking yes/no questions (e.g., “Do you want up?”) encourage <span data-frm-calc="frmChildAlias"></span> to use words that describe what <span data-frm-calc="frmHeShe"></span> is doing (“Tell me up”).',
			'Make silly faces or sounds during play to encourage <span data-frm-calc="frmChildAlias"></span> to experiment with moving <span data-frm-calc="frmHisHer"></span> mouth in different ways to try new sounds and words.',
			'Model words <span data-frm-calc="frmChildAlias"></span> has difficulty saying by using correct productions of sounds. For example, if <span data-frm-calc="frmChildAlias"></span> says “ee” for “please”, point to your own lips and repeat back “P-L-EE-Z” in a slow exaggerated manner.',
			'Model correct pronunciations of words. For example, if <span data-frm-calc="frmChildAlias"></span> says “I ah uh,” repeat back “You want up.”',
			'Introduce simple gestures and signs (such as holding arms up for “up”) to show <span data-frm-calc="frmChildAlias"></span> ways to communicate before <span data-frm-calc="frmHeShe"></span> has the words.',
			'Use simple, 1-2 repetitive words/phrases when talking to <span data-frm-calc="frmChildAlias"></span> to encourage <span data-frm-calc="frmHimHer"></span> to repeat what you are saying. For example, if you are going to pick <span data-frm-calc="frmChildAlias"></span> up, say “up, up, up.”',
			'Model 1 word at a time to acknowledge any communication attempt <span data-frm-calc="frmChildAlias"></span> makes, such as looking at you, ' +
			'leading you, reaching, pointing, or saying a sound. For example, if <span data-frm-calc="frmChildAlias"></span> pulls you towards something, ' +
			'model the word you would want <span data-frm-calc="frmHimHer"></span> to say such as “come," “help,” “mama,” or “dada.”',
			'When <span data-frm-calc="frmChildAlias"></span> points to something <span data-frm-calc="frmHeShe"></span> wants, give <span data-frm-calc="frmHimHer"></span> a simple word to say to ask for what <span data-frm-calc="frmHeShe"></span> wants. Repeat the word before giving <span data-frm-calc="frmChildAlias"></span> the item.',
			'Give <span data-frm-calc="frmChildAlias"></span> a choice of two items by holding them up in front of <span data-frm-calc="frmHimHer"></span>. ' +
			'Wait for <span data-frm-calc="frmHimHer"></span> to communicate with a point, reach, sound, or word. Once <span data-frm-calc="frmHeShe"></span> ' +
			'tries to communicate, model the word you would like <span data-frm-calc="frmHimHer"></span> to say. For example, hold up shoes and a jacket and wait for ' +
			'<span data-frm-calc="frmChildAlias"></span> to choose one. If <span data-frm-calc="frmHeShe"></span> points to or reaches towards the shoes, say “shoes.”',
			'Expand <span data-frm-calc="frmChildAlias"></span>’s words and phrases by adding 1 word at a time to what <span data-frm-calc="frmHeShe"></span> says. ' +
			'For example, if <span data-frm-calc="frmChildAlias"></span> says, “Doggy,” repeat back “Hi doggy,” “Big doggy” or “See doggy.” ' +
			'If <span data-frm-calc="frmHeShe"></span> attempts those two words, add another by saying “Want my binky” or “I want binky.”',
			'Combining 3+ words together:Model words <span data-frm-calc="frmChildAlias"></span> already says in 3 and 4-word phrases such as “Mommy please help me,” “I want up” and “My blue truck.”',
			'Expand phrases <span data-frm-calc="frmChildAlias"></span> says by adding one word at a time. Model describing words, prepositions and opposites for <span data-frm-calc="frmChildAlias"></span> to imitate such as colors, shapes, in, out, on, off, under, above, behind.',
			'Expand phrases <span data-frm-calc="frmChildAlias"></span> says by adding one word at a time. Model describing words, prepositions, and opposites for <span data-frm-calc="frmChildAlias"></span> to imitate such as colors, shapes, in, out, on, off, under, above, behind, below, big/little, cold/hot, wet/dry, tall/short, and hard/soft (“The book is behind you,” “Walk under the tree.”)',
			'Model words/phrases like “I’m mad,” “stop,” or “all done” for <span data-frm-calc="frmChildAlias"></span> to use instead of frustrated actions/behaviors.'
		], [
			'Encourage <span data-frm-calc="frmChildAlias"></span> to walk to the car while holding your hand.',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to climb into car seat.',
			'Provide <span data-frm-calc="frmChildAlias"></span> with extra support when sitting in grocery cart by placing large grocery items on either side of <span data-frm-calc="frmHisHer"></span> body (for example, bottled water).',
			'Provide <span data-frm-calc="frmChildAlias"></span> the opportunity to walk on a variety of surfaces to help develop balance (grass, driveway, and sand, up and down hills).',
			'Play copying games like “Follow the Leader.”Encourage <span data-frm-calc="frmChildAlias"></span> to imitate your movements by stepping up on curbs, jumping from a step, walking around a tree, walking backwards, and walking sideways.',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to bend down or squat while picking sticks and leaves off the ground and putting them into a bucket.',
			'Take “nature walks” at parks, playground, beach, etc. Stop to bend, pick up, and look at sticks, rocks, shells, etc.',
			'While out in the community, hold <span data-frm-calc="frmChildAlias"></span>’s hand and encourage <span data-frm-calc="frmHimHer"></span> to walk up/down steps to buildings.',
			'Visit local playgrounds to encourage new skills such as climbing, jumping, swinging, experiencing equipment that moves.',
			'While walking outside, help <span data-frm-calc="frmChildAlias"></span> jump over small puddles, cracks in the sidewalk, a garden hose, or a line drawn in the dirt or sand.'
		], [
			'Point to objects of interest to encourage <span data-frm-calc="frmChildAlias"></span> to look at and follow with <span data-frm-calc="frmHisHer"></span> eyes.',
			'While outside, encourage <span data-frm-calc="frmChildAlias"></span> to point to interesting things. Show <span data-frm-calc="frmHimHer"></span> how to do this, beginning with things that are closer to you.',
			'Bring along a bag or bucket to collect interesting things on a walk.',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to carry a bucket while walking. Show <span data-frm-calc="frmHimHer"></span> how to bend down to pick up interesting collection items and place them into the bucket.',
			'At the playground, offer toys that allow <span data-frm-calc="frmChildAlias"></span> to scoop in the sandbox (shovels, cups).',
			'Try bringing small ‘play bins’ in the car to help <span data-frm-calc="frmChildAlias"></span> stay entertained while traveling. Include coloring supplies and books to look at.',
			'Try placing toys suspended overhead in the carseat/infant carrier/stroller to give <span data-frm-calc="frmChildAlias"></span> an opportunity to explore items that are easy to see/touch.'
		], [
			'While <span data-frm-calc="frmChildAlias"></span> is in a shopping cart, stroller, or car seat, make silly faces or play games such as “Peek a Boo” with ' +
			'<span data-frm-calc="frmHimHer"></span>. Hide your face behind your hands or an object and encourage <span data-frm-calc="frmChildAlias"></span> ' +
			'to initiate and imitate your actions. Go back and forth with <span data-frm-calc="frmChildAlias"></span> as long as you can while ' +
			'<span data-frm-calc="frmHeShe"></span> is still interested.',
			'While traveling in the car, provide books or photo albums with pictures of things <span data-frm-calc="frmChildAlias"></span> likes for <span data-frm-calc="frmHimHer"></span> to look at while driving.',
			'While traveling in the car, talk to <span data-frm-calc="frmChildAlias"></span> about the things that you are passing to encourage <span data-frm-calc="frmHimHer"></span> to look around and watch.',
			'While traveling in the car, sing songs with <span data-frm-calc="frmChildAlias"></span>.',
			'While out shopping, pause in front of store mirrors to make silly faces with <span data-frm-calc="frmChildAlias"></span> and let <span data-frm-calc="frmHimHer"></span> watch <span data-frm-calc="frmHimselfHerself"></span>.',
			'Name and talk about animals that you see while out on a walk or running errands. Make the sounds of different animals and see if <span data-frm-calc="frmChildAlias"></span> will copy you.',
			'Provide <span data-frm-calc="frmChildAlias"></span> with opportunities to participate in small groups with other children. ' +
			'(e.g., playgroups, library story hour, parks and recreation programs, circle time activities with others, and other local playgroups listed at ' +
			'www.211ct.org or when dialing 2-1-1). This will allow <span data-frm-calc="frmChildAlias"></span> to practice listening skills and following directions.',
			'While walking around, label the color of things.“Look at the yellow flower,” “Look at the red trunk.”',
			'Ask <span data-frm-calc="frmChildAlias"></span> to label colors <span data-frm-calc="frmHeShe"></span> is familiar with.“What color is that truck?”',
			'Ask <span data-frm-calc="frmChildAlias"></span> questions that require <span data-frm-calc="frmHimHer"></span> to identify common actions or familiar objects by their use. For example, “What flies?”, “What barks?”, “What sleeps?”, “What do you wear on your feet?”, “What do you use to drink?”, or “What do you throw/kick?”',
			'Expose <span data-frm-calc="frmChildAlias"></span> to new situations when appropriate (playground, library hour, play dates with same age peers, new toys) to help <span data-frm-calc="frmHimHer"></span> adjust to and explore new situations and environments.',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to play with a variety of different toys when at a playgroup setting so that <span data-frm-calc="frmHeShe"></span> has the opportunity to learn how to play with new things.',
			'Talk about big versus little like “That’s a big box, here’s a little box”, “Daddy has big shoes” and “<span data-frm-calc="frmChildAlias"></span> has little shoes”. Talk about sizes of objects outside or sizes of boxes or cans while shopping.'
		], [
			'Explain the schedule you will be following (e.g. first grocery store, then the park) to help <span data-frm-calc="frmChildAlias"></span> move between events more easily.',
			'Try shopping at “off” hours when the stores are less crowded to help <span data-frm-calc="frmChildAlias"></span> feel more comfortable when <span data-frm-calc="frmHeShe"></span> accompanies you.',
			'Try getting to a party or play date early so that <span data-frm-calc="frmChildAlias"></span> has time to become comfortable with the surroundings before people arrive.',
			'Try providing <span data-frm-calc="frmChildAlias"></span> with a “job” to help <span data-frm-calc="frmHimHer"></span> participate more easily during outings (for example, holding a bag to gather/carry items, look for certain colored items in a store, ask <span data-frm-calc="frmHimHer"></span> to “find something red”).',
			'Try bringing a small preferred toy to help increase <span data-frm-calc="frmChildAlias"></span>’s comfort in new surroundings.',
			'Try bringing toy(s) that <span data-frm-calc="frmChildAlias"></span> is familiar with to allow for fuller participation during play in less familiar settings. Consider bringing one to share with peers.',
			'Consider arriving early to a play situation or classes to allow <span data-frm-calc="frmChildAlias"></span> to explore the environment before joining in with others or beginning new activities.',
			'Allow <span data-frm-calc="frmChildAlias"></span> the opportunity to walk barefoot on a variety of surfaces (grass, sand, driveway).',
			'Try placing a thin blanket over the infant carrier/carseat/stroller to help <span data-frm-calc="frmChildAlias"></span> from feeling overhelmed in new environments.'
		], [
			'Try having only a few toys available during play to help <span data-frm-calc="frmChildAlias"></span> spend more time with each activity.',
			'Consider identifying objects around house that are hot (e.g.; food, oven/stove, candles, fire, radiators, hot water) by saying “hot” or blowing to help<span data-frm-calc="frmChildAlias"></span> understand the concept of “hot.”Use the word “ouch” or “danger.”',
			'Encourage<span data-frm-calc="frmChildAlias"></span> to point to body parts to be able to identify what hurts or let you know if <span data-frm-calc="frmHeShe"></span> does not feel well.',
			'Provide opportunities for <span data-frm-calc="frmChildAlias"></span>to help clean up after playing. Let <span data-frm-calc="frmHimHer"></span> practice putting blocks into a bucket or puzzle pieces into a bin or bag.'
		], [
			'If <span data-frm-calc="frmChildAlias"></span> cries, pick <span data-frm-calc="frmHimHer"></span> up to help teach self-soothing.',
			'Talk or sing to <span data-frm-calc="frmChildAlias"></span>, giving wait time for <span data-frm-calc="frmHimHer"></span> to look at you and indicate that <span data-frm-calc="frmHeShe"></span> wants you to sing more songs.',
			'Play peek-a-boo games with <span data-frm-calc="frmChildAlias"></span>. Hide behind your hands or a blanket and encourage <span data-frm-calc="frmChildAlias"></span> to start the game and imitate actions.',
			'Praise <span data-frm-calc="frmChildAlias"></span>’s effort when <span data-frm-calc="frmHeShe"></span> attempts a new task, is successful or tries hard with an activity, or helps clean up after play',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to show pride in <span data-frm-calc="frmHisHer"></span> accomplishments by modeling positive actions and words like clapping or saying “You did it!” after <span data-frm-calc="frmChildAlias"></span> has completed an activity (e.g.; building a block tower).',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to engage in pretend play by modeling games such as taking care of a stuffed animal (covering with a blanket, feeding or otherwise including them in play).',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to put away a toy before moving on to the next one by saying and showing “all done”.',
			'When <span data-frm-calc="frmChildAlias"></span> is playing, sit with <span data-frm-calc="frmHimHer"></span> and play with the same toys together to encourage <span data-frm-calc="frmChildAlias"></span> to play for longer periods of time with one toy or activity.',
			'To help practice rules, use positive directions like “gentle hands,” “feet on floor” or “roll the ball” instead of “no hitting,” “no kicking” or “don’t throw the ball.”',
			'Show <span data-frm-calc="frmChildAlias"></span> different ways to be gentle with others and when touching delicate things by saying “gentle” and using smooth patting gestures and touches.',
			'Create play activities for <span data-frm-calc="frmChildAlias"></span> to interact with peers/siblings:helping to build towers for all to knock down, filling containers up with blocks to dump out, or holding a book to look at together.',
			'Have <span data-frm-calc="frmChildAlias"></span> practice sharing toys with you, siblings, and other children when there’s enough for everyone (e.g.; blocks, cars, crayons). Model phrases such as “Some for me,” “Some for you,” and “Can I have one?”',
			'Read books about being an older sibling and having a younger sibling to help<span data-frm-calc="frmChildAlias"></span> understand how to interact with ' +
			'<span data-frm-calc="frmHisHer"></span> siblings(e.g., The New Baby by Mercer Mayer, Babies Don\'t Eat Pizza: A Big Kids\' Book About Baby Brothers and ' +
			'Baby Sisters by Dianne Danzig, The Berenstein Bears\' New Baby by Stan Berenstain,My New Baby by Rachel Fuller, and What Baby Needs ' +
			'(Sears Children’s Library) by Martha Sears and Christie Watts Kelly).',
			'Praise <span data-frm-calc="frmChildAlias"></span>\'s accomplishments. Reward <span data-frm-calc="frmHimHer"></span> with a smile or a clap when <span data-frm-calc="frmHeShe"></span> smiles, makes a cooing sound, or kicks <span data-frm-calc="frmHisHer"></span> legs.<span data-frm-calc="frmHeSheCap">[He/She]</span> will feel valued and this is the beginning of developing self-esteem.',
			'Play with <span data-frm-calc="frmChildAlias"></span>. In the first few months of life, infants enjoy games like peek-a-boo and songs. This creates a bond that encourages attachment.',
            'Put disciplining <span data-frm-calc="frmChildAlias"></span>aside for the first 6 months of <span data-frm-calc="frmHisHer"></span> life. Do not use the word “no” with a baby until they are at least 7 or 8 months old.'
            ], [
			'To gain <span data-frm-calc="frmChildAlias"></span>’s attention, call <span data-frm-calc="frmHisHer"></span> name and pause a few seconds. Once <span data-frm-calc="frmChildAlias"></span> looks at you, smile and start talking.',
			'Help <span data-frm-calc="frmChildAlias"></span> touch different toy items around the room while you name what they are.',
			'Use simple, 1-2 repetitive words to label people, objects, and actions. For example, if you are throwing a ball, narrate, “ball, ball, ball.”',
			'Point to familiar items around the room to encourage <span data-frm-calc="frmChildAlias"></span> to look at what you are pointing to.',
			'Point to and label pictures in books. My First Words/100 First Words books offer a variety of familiar toys, food, and drink items.',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to identify a common theme in a book. For example, if there is a mouse on every page, say “Show me the mouse” or “Point to the mouse” before turning each page. Help <span data-frm-calc="frmHimHer"></span>point to or touch the picture if needed then name it again.',
			'Ask <span data-frm-calc="frmChildAlias"></span> wh-questions when reading. For example: “What happened?”, “Where is the …?”, and “What is <span data-frm-calc="frmHeShe"></span> doing?”Give <span data-frm-calc="frmChildAlias"></span> the answer if needed. Try asking the same question again.',
			'Ask “who,” “what,” “where,” and “why” questions when reading books.',
			'Ask questions such as “Where is dollie?” or “Where’s your ball?” Help <span data-frm-calc="frmChildAlias"></span> find the item by pointing to it or taking <span data-frm-calc="frmHimHer"></span> to it. Name the object one more time.',
			'Hold up two items such as a ball and a car and ask <span data-frm-calc="frmChildAlias"></span> to point to or show you the one named.',
			'Ask <span data-frm-calc="frmChildAlias"></span> to follow simple directions related to <span data-frm-calc="frmHisHer"></span> daily routine. Use gestures such as pointing to objects. For example, when cleaning up toys, ask <span data-frm-calc="frmChildAlias"></span> to “Put block in” or “Put babies away.”Help <span data-frm-calc="frmChildAlias"></span> to be successful when needed.',
			'Use words that describe position, such as out and on, during playtime (e.g., repeating “out” when taking blocks out of the toy box or “on” when putting blocks on top of each other).',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to follow simple directions such as “Give me the ball,” or “Put the doll on the couch.”',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to follow 2-step directions such as “Get the ball and put it in the basket.”',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to follow 2-step unrelated directions such as “Pick up your car then find your book.”',
			'Limit “screen time” to 2 hours per day (including TV, iPad, computers, TV on in the background).'
		], [
			'Repeat sounds/words <span data-frm-calc="frmChildAlias"></span> says. Take turns repeating the sounds and words.',
			'Give <span data-frm-calc="frmChildAlias"></span> plenty of wait time (silence) to think about the sounds and words you are saying so <span data-frm-calc="frmHeShe"></span> can try to say them.',
			'Make silly sounds together while playing (e.g.; “uh oh,” “vroom,” “boing,” “boom,” “crash,” “whoa,” “wee,” “yay,” “boop,” “smash.”)Animal noises are fun too (e.g.; “moo,” “ba,” “ma,” “meow,” “woof,” “oink,” “neigh.”)',
			'Hold toys next to your mouth as you say the name of the object to encourage <span data-frm-calc="frmChildAlias"></span> to watch your mouth while you speak.',
			'Point to your mouth when making sounds to help <span data-frm-calc="frmChildAlias"></span> notice how lips, jaw, and tongue move to make sounds.',
			'Make silly faces or sounds to encourage <span data-frm-calc="frmChildAlias"></span> to experiment with moving <span data-frm-calc="frmHisHer"></span> mouth in different ways to try new sounds and words.',
			'Instead of asking yes/no questions (e.g., “Do you want ball?”) encourage <span data-frm-calc="frmChildAlias"></span> to use words to describe what <span data-frm-calc="frmHeShe"></span> wants (“Say ball” or “Tell me ball.”)',
			'Model words <span data-frm-calc="frmChildAlias"></span> has difficulty saying by using correct productions of sounds. For example, if <span data-frm-calc="frmChildAlias"></span> says “ee” for “please,” point to your own lips and repeat back “P-L-EE-Z” in a slow exaggerated, slow manner.',
			'Model correct pronunciations of words. For example, if <span data-frm-calc="frmChildAlias"></span> says “I ah uh,” repeat back “You want up.”',
			'Introduce simple gestures and signs (such as holding arms out to play “catch”) to show <span data-frm-calc="frmChildAlias"></span> ways to communicate before <span data-frm-calc="frmHeShe"></span> has the words.',
			'Use simple, 1-2 repetitive words/phrases when talking to <span data-frm-calc="frmChildAlias"></span> to encourage <span data-frm-calc="frmHimHer"></span> to repeat what you are saying. For example, if you are going to pick <span data-frm-calc="frmChildAlias"></span> up, say “up, up, up.”',
			'Model 1 word at a time to acknowledge any communication attempt <span data-frm-calc="frmChildAlias"></span> ' +
			'makes, such as looking at you, leading you, reaching, pointing, or saying a sound. For example, if <span data-frm-calc="frmChildAlias"></span> ' +
			'pulls you towards something, model the word you would want <span data-frm-calc="frmHimHer"></span> to say such as “come,” “help,” “mama,” or “dada.” ' +
			'If <span data-frm-calc="frmChildAlias"></span> is crying because <span data-frm-calc="frmHisHer"></span> book is out of reach, model “book.”',
			'When <span data-frm-calc="frmChildAlias"></span> points to something <span data-frm-calc="frmHeShe"></span> wants, give <span data-frm-calc="frmHimHer"></span> a simple word to say to ask for what <span data-frm-calc="frmHeShe"></span> wants. Repeat the word before giving <span data-frm-calc="frmChildAlias"></span> the item.',
			'Sing songs with hand/finger movements that accompany the songs. Pause during predictable/familiar parts of the song to encourage <span data-frm-calc="frmChildAlias"></span> to fill in the blank,such as when singing “Wheels on the Bus,” (e.g., “The horn on the bus goes beep, beep, ____” as you pair it with the action).',
			'Read predictable pattern books such as Brown Bear, Brown Bear. Read a line and leave off the last word. Encourage<span data-frm-calc="frmChildAlias"></span> ' +
			'to fill in the missing word. For example, “I see a yellow duck looking at ____.”Silently wait a few seconds for<span data-frm-calc="frmChildAlias"></span> ' +
			'to fill in “me.” If<span data-frm-calc="frmHeShe"></span> does not, then say it with emphasis. ' +
			'Use this strategy for each of the familiar lines and similar books like I Went Walking or Good night Moon.',
			'Give <span data-frm-calc="frmChildAlias"></span> a choice of two items by holding them up in front of <span data-frm-calc="frmHimHer"></span>. ' +
			'Wait for <span data-frm-calc="frmHimHer"></span> to communicate with a point, reach, sound, or word. Once <span data-frm-calc="frmHeShe"></span> ' +
			'tries to communicate, model the word you would like <span data-frm-calc="frmHimHer"></span> to say. ' +
			'For example, hold up a ball and a car and wait for <span data-frm-calc="frmChildAlias"></span> to choose one. If <span data-frm-calc="frmHeShe"></span> ' +
			'points to or reaches towards the ball, say “ball.”',
			'Create communication opportunities (pointing, speaking, bringing you an item) by putting items <span data-frm-calc="frmChildAlias"></span> wants out of reach or in a container <span data-frm-calc="frmHeShe"></span> cannot open without your help. For example, put <span data-frm-calc="frmChildAlias"></span>’s blocks in a container or cars out of reach.',
			'Expand <span data-frm-calc="frmChildAlias"></span>’s words and phrases by adding 1 word at a time to what <span data-frm-calc="frmHeShe"></span> says. ' +
			'For example, if <span data-frm-calc="frmChildAlias"></span> says, “Ball,” repeat back “Your ball,” “My ball” or “Want ball.”If ' +
			'<span data-frm-calc="frmHeShe"></span> attempts those two words, add another by saying “Want my ball” or “I want ball.”',
			'Combining 3+ words together: Model words <span data-frm-calc="frmChildAlias"></span> already says in 3 and 4-word phrases like “Mommy please help me,” “I want up,” and “My blue ball.”',
			'Expand phrases <span data-frm-calc="frmChildAlias"></span> says by adding one word at a time. Model describing words, prepositions, and opposites for ' +
			'<span data-frm-calc="frmChildAlias"></span> to imitate such as colors, shapes, in, out, on, off, under, above, behind, below, big/little, cold/hot, ' +
			'wet/dry, tall/short, and hard/soft (“The block is hard, the teddy bear is soft”, “Your ball is behind you”).',
			'Model words and phrases such as “I’m mad,” “stop,” or “all done” for <span data-frm-calc="frmChildAlias"></span> to use instead of frustrated actions/behaviors.',
			'Ask<span data-frm-calc="frmChildAlias"></span> silly yes/no questions to encourage <span data-frm-calc="frmHimHer"></span> to respond “yes” and “no,” such as “Is your blanket on your head?”, “Are you in the bathtub,” “Is there an elephant in this room?” Humor helps to make communication fun.'
		], [
			'Place <span data-frm-calc="frmChildAlias"></span> on<span data-frm-calc="frmHisHer"></span> side when playing with toys to develop muscles needed for rolling.',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to roll by placing<span data-frm-calc="frmHimHer"></span> on the floor on <span data-frm-calc="frmHisHer"></span> side and move toys from one side to another. Gently help<span data-frm-calc="frmChildAlias"></span> to roll onto <span data-frm-calc="frmHisHer"></span> back and then onto other side in order to get the toy.',
			'Encourage “tummy time” by placing<span data-frm-calc="frmChildAlias"></span> on<span data-frm-calc="frmHisHer"></span> stomach and putting favorite toys directly in front of and around<span data-frm-calc="frmHimHer"></span> to look and tuch.',
			'Put <span data-frm-calc="frmChildAlias"></span> on<span data-frm-calc="frmHisHer"></span> tummy on the floor for play time and place favorite toys in front of and surrounding<span data-frm-calc="frmChildAlias"></span>, just out of reach, to encourage<span data-frm-calc="frmChildAlias"></span> to move/crawl towards them to get them.',
			'Sing songs with movements to help<span data-frm-calc="frmChildAlias"></span> learn to copy sounds and actions like “Wheels on the Bus,” “Old McDonald,” “Pat-A-Cake” and“If You’re Happy and You Know it, Clap your Hands.”',
			'Encourage social games and interactive songs with the family like “Simon Says” and “If You’re Happy and You Know It.”',
			'Expose <span data-frm-calc="frmChildAlias"></span> to frolic play like bouncing<span data-frm-calc="frmHimHer"></span> on your knee, lifting<span data-frm-calc="frmHimHer"></span> up and down, and swinging<span data-frm-calc="frmHimHer"></span> in your arms.',
			'Allow opportunities to practice sitting while playing on the floor. Support <span data-frm-calc="frmChildAlias"></span> as needed by keeping <span data-frm-calc="frmHimHer"></span> on a solid surface with adequate back support using furniture, pillows, or a rolled towel.',
			'Play ball games while sitting on the floor. Roll the ball to <span data-frm-calc="frmChildAlias"></span> towards <span data-frm-calc="frmHisHer"></span> right side and the next time to <span data-frm-calc="frmHisHer"></span> left side. With each turn encourage <span data-frm-calc="frmChildAlias"></span> to catch it using both hands together.',
			'Encourage play in standing position by putting <span data-frm-calc="frmChildAlias"></span>’s favorite toys up on a sofa or coffee table for<span data-frm-calc="frmHimHer"></span> to play with.',
			'When <span data-frm-calc="frmChildAlias"></span> is playing in standing position with support,move motivating items to different places ' +
			'to encourage cruising (stepping sideways). For example, while<span data-frm-calc="frmChildAlias"></span> ' +
			'is holding onto the couch, place fun toys at different ends to encourage<span data-frm-calc="frmHimHer"></span> to cruise along the furniture to get the items.',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to squat up and down to practice moving between standing and standing and sitting.<span data-frm-calc="frmHeShe"></span> can do this during activities like bending down to pick up blocks off the floor and put them in a bin or bucket.',
			'Encourage <span data-frm-calc="frmChildAlias"></span>\'s movement and balance skills by making an indoor obstacle course—go around a table,under a chair, jump over a small pillow, etc.',
			'Practice kicking activities by using a light weight ball at firs(e.g beach ball) and gradually working your way up to a heavier ball (e.g soccer ball).',
			'Practice throwing a ball into a large box or laundry basket.',
			'Play rhythmic music and show <span data-frm-calc="frmChildAlias"></span> how to bounce up and down. See if <span data-frm-calc="frmHeShe"></span> will lift both feet off of the ground and jump.',
			'Blow bubbles and encourage <span data-frm-calc="frmChildAlias"></span> to pop bubbles that land on the floor by jumping on them.',
			'During tummy time, try helping <span data-frm-calc="frmChildAlias"></span> first roll from belly to back, and then help <span data-frm-calc="frmChildAlias"></span> pull-to-sit before picking <span data-frm-calc="frmHimHer"></span> up. This will help <span data-frm-calc="frmChildAlias"></span> learn how to get out of the position independently.',
			'Place a small pillow in <span data-frm-calc="frmChildAlias"></span>\'s lap while sitting, giving <span data-frm-calc="frmHimHer"></span> something to lean forward on for balance while learning to sit.',
			'If you notice <span data-frm-calc="frmChildAlias"></span> sitting in a “W” position while playing, physically bring <span data-frm-calc="frmHisHer"></span> ' +
			'legs forward one at a time and pair it with a phrase such as “fix your legs” or “legs in front”. Better sitting positions include legs straight in front, ' +
			'legs in front in a “V” position, ring sitting (knees out/feet together), and “criss cross applesauce.”',
			'If <span data-frm-calc="frmChildAlias"></span> is having difficulty tolerating “tummy time” and is not able to lift <span data-frm-calc="frmHisHer"></span> ' +
			'head up well, you can try placing a small rolled up receiving blanket under <span data-frm-calc="frmChildAlias"></span>’s chest/armpits to help ' +
			'<span data-frm-calc="frmHimHer"></span> lift up easier and be more comfortable while on <span data-frm-calc="frmHisHer"></span> tummy.',
			'During tummy time, place a mirror in front of <span data-frm-calc="frmChildAlias"></span>to encourage <span data-frm-calc="frmHimHer"></span> to lift <span data-frm-calc="frmHisHer"></span> head higher or press up higher on their arms to see self in mirror.'
 ], [
			'If <span data-frm-calc="frmChildAlias"></span> tends to put many toys into <span data-frm-calc="frmHisHer"></span> mouth, offer toys that are safe to suck, bite and chew.',
			'Let <span data-frm-calc="frmChildAlias"></span> touch and feel toys that have different qualities to them (heavy, bumpy, soft, crinkly) while playing.',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to use<span data-frm-calc="frmHisHer"></span> hands for movements such as clapping, patting, lifting hands up, shaking/wiggling hands and fingers, banging.',
			'Consider providing opportunities for <span data-frm-calc="frmChildAlias"></span> to engage in messy play (play dough, finger paints, sand)',
			'Blow bubbles and encourage <span data-frm-calc="frmChildAlias"></span> to pop them by clapping <span data-frm-calc="frmHisHer"></span> hands together.',
			'Try playing finger games such as Itsy Bitsy Spider and Where is Thumbkin. See if <span data-frm-calc="frmChildAlias"></span> tries to copy some of your movements.',
			'Show <span data-frm-calc="frmChildAlias"></span> how to stack items while playing. Items to try include blocks, books, cups, and rings.',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to use <span data-frm-calc="frmHisHer"></span> pointer finger to point to pictures in a book. Fun pointing books include “Touch and Feel” books, Ten Little Ladybugs by Melanie Gerth, as well as books with musical buttons to push.',
			'Try introducing simple, one-piece puzzles to <span data-frm-calc="frmChildAlias"></span>, such as those with knobs for easy handling.',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to spend time coloring. Draw and color with <span data-frm-calc="frmChildAlias"></span>. Make lines that go from the top down and side to side. Draw circles for happy faces.',
			'Try showing <span data-frm-calc="frmChildAlias"></span> how to play with stickers on paper.',
			'Try showing <span data-frm-calc="frmChildAlias"></span> how to place stickers on a sheet of paper. Try drawing lines with a crayon from one sticker to another.',
			'Try taping a large sheet of paper to the front of the refrigerator or to an easel. Show <span data-frm-calc="frmChildAlias"></span> how to scribble or draw lines or shapes.',
			'When coloring with <span data-frm-calc="frmChildAlias"></span>, try using markers, crayons, pencils, paintbrushes, chalk, finger and paints.',
			'Try stringing ‘beads’ with <span data-frm-calc="frmChildAlias"></span>. You can wrap the end of a piece of yarn or string with tape, or use a shoestring, to make bead stringing easier. Have fun stringing beads, large pasta or Cheerios.',
			'When <span data-frm-calc="frmChildAlias"></span> is playing on <span data-frm-calc="frmHisHer"></span> back, hold small light weight toys, such as little plastic rings, above <span data-frm-calc="frmHimHer"></span> in a variety of positions and encourage <span data-frm-calc="frmChildAlias"></span> to reach for and grasp them.'
		], [
			'Use rattles, shakers, colorful toys, and objects to show <span data-frm-calc="frmChildAlias"></span> to encourage <span data-frm-calc="frmHimHer"></span> ' +
			'to follow the object and sound with <span data-frm-calc="frmHisHer"></span> head and eyes. Move the motivating item in different places for ' +
			'<span data-frm-calc="frmChildAlias"></span> to look in front of, behind, and to the side of <span data-frm-calc="frmHimHer"></span>.',
			'Play peek-a-boo games with <span data-frm-calc="frmChildAlias"></span>. Hide behind your hands or a blanket and encourage <span data-frm-calc="frmChildAlias"></span> to initiate and imitate your actions. Go back and forth with <span data-frm-calc="frmChildAlias"></span> as long as you can while <span data-frm-calc="frmHeShe"></span> is still interested.',
			'Play simple repetitive games to help <span data-frm-calc="frmChildAlias"></span> anticipate a familiar sound or movement. Use a special facial expression or sound, such as “I’m going to kiss you!”before kissing <span data-frm-calc="frmHimHer"></span>, or “Jiggle jiggle!” before bouncing <span data-frm-calc="frmHimHer"></span> on your knee.)',
			'Help <span data-frm-calc="frmChildAlias"></span> learn that <span data-frm-calc="frmHeShe"></span> can let you know when ' +
			'<span data-frm-calc="frmHeShe"></span> wants to keep a game going. For example, when playing games like dancing, ‘horsy’ rides, ' +
			'or ‘Peek a Boo’, pause and wait for <span data-frm-calc="frmChildAlias"></span> to indicate by moving or making a sound that ' +
			'<span data-frm-calc="frmHeShe"></span> wants to continue. Say- ‘Oh…you want more of that!’ and resume what you were doing.',
			'Play “Where did it go?” by encouraging <span data-frm-calc="frmChildAlias"></span> to uncover a toy hidden under a blanket. Model this activity for <span data-frm-calc="frmHimHer"></span> to see if <span data-frm-calc="frmHeShe"></span> will imitate the action of moving the blanket.',
			'Join in <span data-frm-calc="frmChildAlias"></span>’s play when you notice <span data-frm-calc="frmHimHer"></span> doing the same thing over and over. Talk to <span data-frm-calc="frmChildAlias"></span>, imitate <span data-frm-calc="frmHisHer"></span> play, or show <span data-frm-calc="frmHimHer"></span> different ways <span data-frm-calc="frmHeShe"></span> can play with the materials.',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to do different activities with the same toy. For example, when playing with blocks try stacking them and knocking them down, connecting them together and making them into a train, individually driving them like a car, or pretending they are food or drink for feeding a doll or stuffed animal.',
			'If <span data-frm-calc="frmChildAlias"></span> is not interested in sitting and looking at or listening to books, try more motivating books to capture <span data-frm-calc="frmHisHer"></span> attention such as books with buttons, music, tabs/flaps to lift, or textures to touch and feel.',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to stick with one activity for at least 3-10 minutes by limiting the number of toys available to <span data-frm-calc="frmChildAlias"></span> at one time.',
			'Have <span data-frm-calc="frmChildAlias"></span> clean up <span data-frm-calc="frmHisHer"></span> toy(s) before moving on to the next activity, even if <span data-frm-calc="frmHeShe"></span> has only played briefly. Making a clear end to an activity will help <span data-frm-calc="frmChildAlias"></span> understand “all done.”',
			'To encourage longer spans of attention, play simple games and/or sing songs with <span data-frm-calc="frmChildAlias"></span> with definite endings (e.g., Head, Shoulders, Knees & Toes; Five Little Monkeys; or Wheels on the Bus).',
			'Introduce ‘finger play’ songs that have simple repetitive movements. Encourage <span data-frm-calc="frmChildAlias"></span> to copy your movements in any way. Examples of common songs include: "Pat a Cake," "Row, Row, Row Your Boat," "Twinkle, Twinkle, Little Star," and "The Wheels On The Bus."',
			'Look at pictures in books with <span data-frm-calc="frmChildAlias"></span>. Rather than reading all of the words,point to the pictures as you tell <span data-frm-calc="frmHimHer"></span> what the picture is. Try books with only one picture per page.',
			'Give <span data-frm-calc="frmChildAlias"></span> nesting cups or a set of containers that fit inside one another to teach <span data-frm-calc="frmHimHer"></span> how things fit together or to solve a problem by changing the cup if done out of order.',
			'Use puzzles, arts and craft activities, crayons, or other toys in various colors to help <span data-frm-calc="frmChildAlias"></span> match colors. Make different piles of the same color to teach <span data-frm-calc="frmChildAlias"></span> how to match and sort.',
			'Introduce simple, one-piece puzzles to <span data-frm-calc="frmChildAlias"></span>, such as those with knobs for easy handling. These puzzles can be found at your local library in the children’s room.',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to try simple non-interlocking puzzles (board puzzles without the picture behind the puzzle piece).',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to match and sort different shapes by using toys, puzzles, and books with circles, squares, andtriangles.'
		], [
			'<span data-frm-calc="frmChildAlias"></span> may find books that have buttons, music, tabs/flaps to lift, or textures to touch and feel more interesting.',
			'If <span data-frm-calc="frmChildAlias"></span> is not fully comfortable messy play, offer a q-tip, paintbrush or popsicle stick to use as a tool in the messy material.',
			'Rotating <span data-frm-calc="frmChildAlias"></span>’s toys from time to time may make play more interesting. Try putting familiar toys away and then re-introducing them in a few weeks.'
		], [
			'Encourage <span data-frm-calc="frmChildAlias"></span> to help get bath items ready to help with routine of bath time (washcloth, toys).',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to help with or use independent skills with undressing.',
			'Talk about safety in bath tub. Use words such as “slippery.”Talk about stepping into bath “slowly.”',
			'Have fun splashing to allow <span data-frm-calc="frmChildAlias"></span> to get used to water on <span data-frm-calc="frmHisHer"></span> face or the sound of moving water.',
			'Have a mesh bag or plastic container ready to encourage clean-up of bath toys.',
			'Have clothes or pajamas in bathroom ready for dressing after bath. Encourage <span data-frm-calc="frmChildAlias"></span> to help or show independent skills with dressing.',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to place clothes in hamper.'
		], [
			'Look for <span data-frm-calc="frmChildAlias"></span> to move <span data-frm-calc="frmHisHer"></span> face, arms or legs after rubbing with a washcloth.',
			'<span>Talk about body parts when washing <span data-frm-calc="frmChildAlias"></span>. Use simple words or phrases, “hands,” or these are your “hands,”“face,” or“I’m washing your face.”',
			'Use this close contact time to play with making faces or simple hand actions to imitate.',
			'Take turns with simple bath games such as pouring water from cup to cup, squeezing a sponge, wiggling fingers under running water.',
			'Offer 2 bath toys to see what <span data-frm-calc="frmChildAlias"></span>\'s preferences may be and play with choice making.',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to help with bathing (hold washcloth, wash body).',
			'Try giving <span data-frm-calc="frmChildAlias"></span> a massage, with or without lotion, after <span data-frm-calc="frmHisHer"></span> bath. This is a nice time to talk or sing quietly to <span data-frm-calc="frmHimHer"></span>.',
			'Bath time is a great time to make eye contact and sing silly songs with <span data-frm-calc="frmChildAlias"></span>. Even if <span data-frm-calc="frmHeShe"></span> doesn’t understand what you are saying, <span data-frm-calc="frmHeShe"></span> will enjoy this quality time with you.'
		], [
			'Help <span data-frm-calc="frmChildAlias"></span> touch different items around the bathroom such as sink, water, towel, bubbles, and soap while you name what they are.',
			'Point to familiar items around the bathroom to encourage <span data-frm-calc="frmChildAlias"></span> to look at what you are pointing to.',
			'Use simple, 1-2 repetitive words to label objects and actions. For example, if you are popping bath bubbles, say “pop, pop, pop.”',
			'Ask questions such as “Where is the soap?” or “Where is your foot?” Help <span data-frm-calc="frmChildAlias"></span> find the item by pointing to it. Name the object one more time.',
			'Hold up two items such as a towel and a cup and ask <span data-frm-calc="frmChildAlias"></span> to point to or show you the one named.',
			'Ask <span data-frm-calc="frmChildAlias"></span> to follow simple directions related to <span data-frm-calc="frmHisHer"></span> daily routine. Use gestures such as pointing to objects. For example, ask <span data-frm-calc="frmChildAlias"></span> to “Go get your jammies” or “Go to your room.”',
			'Help <span data-frm-calc="frmChildAlias"></span> to be successful when needed.',
			'Use words that describe position, such as out and on, during bath time (e.g., repeating “out” when taking <span data-frm-calc="frmChildAlias"></span> out of the tub or “on” when putting lotion on). Point to familiar items around the bathroom to encourage <span data-frm-calc="frmChildAlias"></span> to look at what you are pointing to.',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to follow simple directions such as “Squeeze the washcloth,” or “Find your boat.”',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to follow 2-step directions such as “Take your cup and put it in the tub.”',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to follow 2-step unrelated directions such as “Pour water out of the cup then find your boat.”'
		], [
			'Repeat sounds/words <span data-frm-calc="frmChildAlias"></span> says. Take turns repeating the sounds and words.',
			'Point to your mouth when making sounds to help <span data-frm-calc="frmChildAlias"></span> notice how lips, jaw, and tongue move to make sounds.',
			'Make silly faces or sounds while playing in the bathtub to encourage <span data-frm-calc="frmChildAlias"></span> to experiment with moving <span data-frm-calc="frmHisHer"></span> mouth in different ways to try new sounds and words.',
			'Instead of asking yes/no questions (e.g., “Do you want up?”) encourage <span data-frm-calc="frmChildAlias"></span> to use words to describe what <span data-frm-calc="frmHeShe"></span> wants (“Say up” or “Tell me up”)',
			'Model words <span data-frm-calc="frmChildAlias"></span> has difficulty saying by using correct productions of sounds. For example, if <span data-frm-calc="frmChildAlias"></span> says “ee” for “please,” point to your own lips and repeat back “P-L-EE-Z” in a slow exaggerated, slow manner.',
			'Model correct pronunciations of words. For example, if <span data-frm-calc="frmChildAlias"></span> says “I ah uh”, repeat back “You want up.”',
			'Give <span data-frm-calc="frmChildAlias"></span> plenty of wait time (silence) to think about the sounds and words you are saying so <span data-frm-calc="frmHeShe"></span> can try to say them.',
			'Make silly sounds with <span data-frm-calc="frmChildAlias"></span> while looking in the mirror together (e.g.; “uh oh,” “vroom,” “boing,” “boom,” “crash,” “whoa,” “wee,” “yay,” “boop,” “smash.”)Animal noises are fun too (e.g.; “moo,” “ba,” “ma,” “meow,” “woof,” “oink,” “neigh.”)',
			'Hold objects such as a towel, soap, or comb next to your mouth as you say the name of the object to encourage <span data-frm-calc="frmChildAlias"></span> to watch your mouth while you speak.',
			'Introduce simple gestures and signs (such as holding arms up for “up”) to show <span data-frm-calc="frmChildAlias"></span> ways to communicate before <span data-frm-calc="frmHeShe"></span> has the words.',
			'Use simple, 1-2 repetitive words/phrases when talking to <span data-frm-calc="frmChildAlias"></span> to encourage <span data-frm-calc="frmHimHer"></span> to repeat what you are saying. For example, if you are going to pick <span data-frm-calc="frmChildAlias"></span> up, narrate “up, up, up.”',
			'When <span data-frm-calc="frmChildAlias"></span> points to something <span data-frm-calc="frmHeShe"></span> wants, give <span data-frm-calc="frmHimHer"></span> a simple word to say to ask for what <span data-frm-calc="frmHeShe"></span> wants. Repeat the word before giving <span data-frm-calc="frmChildAlias"></span> the item.',
			'Give <span data-frm-calc="frmChildAlias"></span> a choice of two items by holding them up in front of <span data-frm-calc="frmHimHer"></span>. ' +
			'Wait for <span data-frm-calc="frmHimHer"></span> to communicate with a point, reach, sound, or word. Once <span data-frm-calc="frmHeShe"></span> ' +
			'tries to communicate, model the word you would like <span data-frm-calc="frmHimHer"></span> to say. For example, hold up the bubbles and a cup and ' +
			'wait for <span data-frm-calc="frmChildAlias"></span> to choose one. If <span data-frm-calc="frmHeShe"></span> points to or reaches towards the bubbles, say “bubbles.”',
			'Expand <span data-frm-calc="frmChildAlias"></span>’s words and phrases by adding 1 word at a time to what <span data-frm-calc="frmHeShe"></span> says. ' +
			'For example, if <span data-frm-calc="frmChildAlias"></span> says, “Bubbles,” repeat back “Bubbles pop,” “My bubbles” or “Want bubbles.” ' +
			'If <span data-frm-calc="frmHeShe"></span> attempts those two words, add another by saying “Want some bubbles” or “I want bubbles.”',
			'Combining 3+ words together: Model words <span data-frm-calc="frmChildAlias"></span> already says in 3 and 4-word phrases such as “Mommy help me,” “I want up,” and “Want some bubbles.”',
			'Expand phrases <span data-frm-calc="frmChildAlias"></span> says by adding one word at a time. Model describing words, prepositions, and opposites for ' +
			'<span data-frm-calc="frmChildAlias"></span> to imitate like colors, shapes, in, out, on, off, under, above, behind, below, big/little, cold/hot, wet/dry, tall/short, ' +
			'and hard/soft (“You are wet, now you are dry,” “The water is on now the water is off.”)',
			'Model words/phrases such as “I’m mad,” “Stop,” or “All done” for <span data-frm-calc="frmChildAlias"></span> to use instead of frustrated actions/behaviors.',
			'Ask <span data-frm-calc="frmChildAlias"></span> silly yes/no questions to encourage <span data-frm-calc="frmHimHer"></span> to respond “yes” and “no” such as “Is your towel on your head?”, “Are you in the sink?”, “Is there an elephant in this room?” Humor helps to make communication fun.'
		], [
			'Provide stable bath seat to help <span data-frm-calc="frmChildAlias"></span> sit more securely while bathing.',
			'Have fun with gently splashing water in the tub together.',
			'Place a towel in bath tub to prevent <span data-frm-calc="frmChildAlias"></span> from sliding forward and to help <span data-frm-calc="frmHimHer"></span> sit more securely.'
		], [
			'Encourage <span data-frm-calc="frmChildAlias"></span> to help wash while in the tub. Try using “baby” washcloths as they are easier for small hands to hold.',
			'Consider bringing toys that float into the bathtub. Let <span data-frm-calc="frmChildAlias"></span> try to grab them and let them go.',
			'Try hiding bath toys in bubbles while in the tub. Let<span data-frm-calc="frmChildAlias"></span> try to find them and pull them out.',
			'Try providing empty containers in the bathtub that <span data-frm-calc="frmChildAlias"></span> can fill and pour water from.',
			'While in the bathtub, let <span data-frm-calc="frmChildAlias"></span> play with sponges that have been cut into fun shapes. Show <span data-frm-calc="frmHimHer"></span> how to hold and squeeze them.',
			'Consider letting <span data-frm-calc="frmChildAlias"></span> play with squirt toys in the bathtub. Show <span data-frm-calc="frmHimHer"></span> how to fill them with water and squeeze them.',
			'Try using bathtub paints in the tub. Show <span data-frm-calc="frmChildAlias"></span> how to draw scribbles, lines and circles on the bathtub wall. When finished, show <span data-frm-calc="frmHimHer"></span> how to use a washcloth to “wash off” the bathtub paints.'
		], [
			'Show <span data-frm-calc="frmChildAlias"></span> <span data-frm-calc="frmHisHer"></span> hands when you wash and pat them with a soft washcloth. Try gently massaging them and bring them to your mouth to give them a kiss.',
			'Try singing a special bath time song, such as ‘This Is the Way We Wash Our Hands’ while washing <span data-frm-calc="frmChildAlias"></span>. Add the name of each body part as you are washing it.',
			'Try massaging <span data-frm-calc="frmChildAlias"></span>’s feet with lotion warmed in your hands after <span data-frm-calc="frmHisHer"></span> bath. Help <span data-frm-calc="frmHimHer"></span> feel and rub <span data-frm-calc="frmHisHer"></span> feet.',
			'Play games such as “hide-a-toy-in-the-bubbles” to encourage <span data-frm-calc="frmChildAlias"></span> to search for removed objects.',
			'Provide waterproof books or photo albums with pictures of things <span data-frm-calc="frmChildAlias"></span> likes to motivate <span data-frm-calc="frmHimHer"></span> to look at, point to, and touch the pictures while you name them.',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to help clean up <span data-frm-calc="frmHisHer"></span> toys before getting out of the bathtub. Making a clear end to an activity will help <span data-frm-calc="frmHimHer"></span> understand “all done.”',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to play with a variety of toys while taking a bath. Join in on <span data-frm-calc="frmHisHer"></span> play to show different ways to play with the toys.',
			'Give <span data-frm-calc="frmChildAlias"></span> nesting cups or a set of containers that fit inside one another to teach <span data-frm-calc="frmHimHer"></span> how they fit together. Let <span data-frm-calc="frmHimHer"></span> practice filling the cups with water and pouring the water out.',
			'Use foam letters, books about colors, bathtub crayons, or the same toy (e.g., blocks or balls) in different colors to help <span data-frm-calc="frmChildAlias"></span> match colors. Try making different piles of the same color to teach <span data-frm-calc="frmChildAlias"></span> how to match and sort.',
			'Bath time is a good opportunity to participate in ‘messy’ play without getting messy.',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to play with a variety of different textured materials such as foam soap and bathtub paints/ crayons while in the tub.',
			'Allow <span data-frm-calc="frmChildAlias"></span> to play with different sized sponges in the bath tub. Show <span data-frm-calc="frmHimHer"></span> how to fill the sponges with water and squeeze them out.',
			'After <span data-frm-calc="frmChildAlias"></span> gets out of the tub, try playing in front of a mirror. Let <span data-frm-calc="frmHimHer"></span> watch <span data-frm-calc="frmHisHer"></span> reflection and encourage <span data-frm-calc="frmHimHer"></span> to make silly faces.',
			'Encourage sorting activities for big versus little like having <span data-frm-calc="frmChildAlias"></span> put big toys in one pile and little toys in another pile when cleaning up from bathtub time.'
		], [
			'Make sure that <span data-frm-calc="frmChildAlias"></span> is positioned well in an infant tub. Try placing a towel under <span data-frm-calc="frmHimHer"></span> and a wet washcloth on <span data-frm-calc="frmHisHer"></span> stomach to help <span data-frm-calc="frmHimHer"></span> feel more secure.',
			'Add water slowly to the bath tub to allow time to adjust to water – engage in play with water from spout to help make <span data-frm-calc="frmChildAlias"></span> more comfortable.',
			'Use a visor to decrease water on <span data-frm-calc="frmChildAlias"></span>\'s face during hair washing',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to hold a washcloth over <span data-frm-calc="frmHisHer"></span> eyes when you are rinsing <span data-frm-calc="frmHisHer"></span> hair.',
			'Encourage <span data-frm-calc="frmChildAlias"></span> to hold a cup of water and rinse <span data-frm-calc="frmHisHer"></span> own hair.',
			'While rinsing hair, try counting or singing a song to let <span data-frm-calc="frmChildAlias"></span> know when you are going to begin and end (e.g. 1..2..3..4…all done!)'
        ]
    ],
    nutritionScreening: ['Completed with no concerns', 'Completed with noted concerns'],
    pageBreaks: [],
    pageBreaksLoaded: [],
    pageBreakText: 'THE REMAINDER OF THIS PAGE INTENTIONALLY LEFT BLANK',
    poIdx: -1,
    routineHeaders: ['WAKE UP/SLEEP', 'DRESSING/TOILETING', 'MEALTIME', 'OUTINGS', 'PLAY', 'BATH TIME'],
    sectionHeaders: ['Family Information', 'Medical History', 'Evaluation Process', 'Family and Child Routines', 'Observations during Testing', 'Results',
        'Glossary of Terms', 'Summary and Recommendations', 'Assessment Process', 'Family Assessment'],
    significantBirthHistory: [
        'congenital infection',
        'craniofacial anomalies including cleft lip',
        'birth weight less than 1500 grams',
        'hyperbilirubinemia at a level requiring exchange transfusion',
        'ototoxic medications',
        'bacterial meningitis',
        'Apgar scores of 0-4 at one minute and 0-6 at five minutes',
        'mechanical ventilation lasting more than five days',
        'head trauma associated with loss of consciousness or skull fracture'
    ],
    sMean: ['Typical', 'Some Problems', 'Definite Dysfunction'],
    spTest: [
        'Much Less Than Others',
        'Less Than Others',
        'Just Like the Majority of Others',
        'More than Others',
        'Much More Than Others'
    ],
    tests: [
        { name: 'Aims', fullname: 'Alberta Infant Motor Scale (AIMS)', set: 0 },
        { name: 'Bdi', fullname: 'Battelle Developmental Inventory-2nd Edition (BDI-2)', set: 0 },
        { name: 'Bitsea', fullname: 'Brief Infant /Toddler Social-Emotional Assessment (BITSEA)', set: 0 },
        { name: 'Deca', fullname: 'Devereux Early Childhood Assessment for Toddlers (DECA-T)', set: 0 },
        { name: 'Esdm', fullname: 'Early Start Denver Model (ESDM)', set: 0 },
        { name: 'Gfta', fullname: 'Goldman- Fristoe Test of Articulation-3rd Edition (GFTA-3)', set: 0 },
        { name: 'Help', fullname: 'Hawaii Early Learning Profile (HELP)', set: 0 },
        { name: 'Isp', fullname: 'Infant Sensory Profile-2 Infant (ISP-2)', set: 0 },
        { name: 'Itsea', fullname: 'Infant-Toddler Social Emotional Assessment (ITSEA)', set: 0 },
        { name: 'Klpa', fullname: 'Khan-Lewis Phonological Analysis-3rd Edition (KLPA-3)', set: 0 },
        { name: 'Kspt', fullname: 'Kaufman Speech Praxis Test for Children (KSPT)', set: 0 },
        { name: 'Sel', fullname: 'Mullen Scales of Early Learning (MSEL)', set: 0 },
        { name: 'Mchat', fullname: 'Modified Checklist for Autism in Toddlers-Revised (M-CHAT-R)', set: 0 },
        { name: 'Pls', fullname: 'Preschool Language Scale-5 (PLS-5)', set: 0 },
        { name: 'Pdms', fullname: 'Peabody Developmental Motor Scales – 2nd Edition (PDMS-2)', set: 0 },
        { name: 'Spm', fullname: 'Sensory Processing Measure – Preschool', set: 0 },
        { name: 'Time', fullname: 'Toddler and Infant Motor Evaluation (T.I.M.E)', set: 0 },
        { name: 'Tsp', fullname: 'Toddler Sensory Profile-2 (TSP-2)', set: 0 }
    ],
    users: [],
    usersLoaded: 0,
    userUpdateFailed: 0,
    visionHearing: ['Evaluation completed within the past year with normal results', 'Evaluation completed within the past year with inconclusive results',
        'Evaluation completed within the past year with noted concerns', 'Evaluation has not been completed within the past year',
        'Evaluation appointment is pending'],
    visionScreening: ['Completed with no concerns', 'Completed with noted concerns']
}

// Mutations
export const mutations = {
    clearSaved(state) {
        state.hasSaved = false;
    },
    delForm(state, tempId) {
        var len = state.forms.length;
        for (var x = 0; x < len; ++x) {
            if (state.forms[x].tempId === tempId) {
                state.forms.splice(x, 1);
                break;
            }
        }
    },
    delUser(state, userId) {
        var len = state.users.length;
        for (var x = 0; x < len; ++x) {
            if (state.users[x].userId === userId) {
                state.users.splice(x, 1);
                break;
            }
        }
    },
    updateAlertedOffice(state) {
        state.alertingOffice = true;
    },
    updateFormAreas(state, payload) {
        var len = state.formAreas.length;

        for (var f = 0; f < len; ++f) {
            if (state.formAreas[f].name === payload.name) {
                state.formAreas[f].value = payload.value;
            }
        }
    },
    updateFrmSelOptions(state, updatedOptions) {
        state.curForm.frmSelOptions = updatedOptions; 
        var len = state.formVariables.length;

        for (var x = 0; x < len; ++x) {
            if (state.formVariables[x][0] === 'frmSelOptions') {
                var temp = state.formVariables[x];
                state.formVariables.splice(x, 1, [temp[0], updatedOptions, temp[2]]);
                state.formSelOptionsUpdated = true;
                break;
            }
        }
    },
    updateFrmSelTests(state, updatedOptions) {
        state.curForm.frmSelTests = updatedOptions;
        var len = state.formVariables.length;

        for (var x = 0; x < len; ++x) {
            if (state.formVariables[x][0] === 'frmSelTests') {
                var temp = state.formVariables[x];
                state.formVariables.splice(x, 1, [temp[0], updatedOptions, temp[2]]);
            }
        }
    }
}

export const actions = {
    alertOffice: ({ commit, state }, payload) => {
        state.alertingOffice = false;
        axios.post('/Admin/AlertOffice', payload,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            .then(function (response) {
                //commit('updateAlertedOffice');
                state.alertingOffice = true;
                console.log('office alerted...');
                console.log(response.data);
            })
            .catch(function (error) {
                state.alertingOffice = false;
                console.log('catch response...');
                console.log(error);
            });
    },
    changePassword: ({ commit, state }, payload) => {
        axios.post('/Admin/ChangePassword', payload,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function (response) {
                console.log('then response...');
                console.log(response);
            })
            .catch(function (error) {
                console.log('catch response...');
                console.log(error);
            });
    },
    deleteForm: ({ commit, state }, tempId) => {
        console.log('id is ' + tempId);
        axios.post('/Admin/DeleteForm', tempId,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            .then(function (response) {
                console.log('then response...');
                commit('delForm', tempId);
                console.log(response);
            })
            .catch(function (error) {
                console.log('catch response...');
                console.log(error);
            });
    },
    deleteUser: ({ commit, state }, userId) => {
        console.log(userId);
        axios.post('/Admin/DeleteUser', userId,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function (response) {
                console.log('then response...');
                commit('delUser', userId);
                console.log(response);
            })
            .catch(function (error) {
                console.log('catch response...');
                console.log(error);
            });
    },
    emailReport: ({ commit, state }, payload) => {
        axios.post('/Form/EmailReport', payload,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            .then(function (response) {
                console.log('then response...');
                console.log(response);
            })
            .catch(function (error) {
                console.log('catch response...');
                console.log(error);
            });
    },
    fillForms: ({ state }) => {
        axios.get('/Admin/GetFormsBase')
            .then(function (response) {
                state.forms = response.data;
                state.formsLoaded = 1;
            })
            .catch(function (error) {
                console.log('error');
                console.log(error);
            });
    },
    fillUsers: ({ state }) => {
        axios.get('/Admin/GetUsersBase')
            .then(function (response) {
                state.users = response.data;
                state.usersLoaded = 1;
            })
            .catch(function (error) {
                console.log('error');
                console.log(error);
            });
    },
    getEvaluationTypes: ({ state }) => {
        axios.get('/Form/GetEvaluationTypes')
            .then(function (response) {
                var len = response.data.length;

                for (var ev = 0; ev < len; ++ev) {
                    state.evaluationTypes.push({
                        typeId: response.data[ev].evalTypeId,
                        type: response.data[ev].evaluationType
                    });
                }

                state.evaluationTypesLoaded = 1;
            })
            .catch(function (error) {
                console.log('error');
                console.log(error);
            });
    },
    getEvaluators: ({ state }) => {
        axios.get('/Form/GetEvaluators')
            .then(function (response) {
                var len = response.data.length;

                for (var ev = 0; ev < len; ++ev) {
                    state.evaluators.push({
                        userId: response.data[ev].userId,
                        firstname: response.data[ev].firstname,
                        lastname: response.data[ev].lastname,
                        title: response.data[ev].title
                    });
                }

                state.evaluatorsLoaded = 1;
            })
            .catch(function (error) {
                console.log('error');
                console.log(error);
            });
    },
    loadForm: ({ state, dispatch }, tempId) => {
        var request = {
            params: {
                tempId: tempId
            }
        }

        axios.get('/Form/LoadForm',
                request,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            .then(function (response) {
                if (!response.data.formData.status) {
                    dispatch('getEvaluationTypes');
                    state.curForm = response.data.formData;
                    state.curForm.tempId = tempId;
                    var len = response.data.formData.formVariableModels.length > 0 ? response.data.formData.formVariableModels.length : 0;

                    for (var f = 0; f < len; ++f) {
                        state.formVariables.push([response.data.formData.formVariableModels[f].name, response.data.formData.formVariableModels[f].value, response.data.formData.formVariableModels[f].description]);
                        if (response.data.formData.formVariableModels[f].name === 'frmEvalList') {
                            var listArr = response.data.formData.formVariableModels[f].value.split('<br>');
                            var lArrLen = listArr.length - 1;

                            for (var l = 0; l < lArrLen; ++l) {
                                var idArr = listArr[l].split('"');
                                var id = idArr[1].substr(2);
                                var nameTitleArr = listArr[l].split('>');
                                var nameArr = nameTitleArr[1].split(' ');
                                var firstname = nameArr[0];
                                var lastname = nameArr[1].substr(0, nameArr[1].length - 1);
                                var nameArrLen = nameArr.length;
                                var title = '';

                                for (var n = 2; n < nameArrLen; ++n) {
                                    title += nameArr[n] + ' ';
                                }

                                title = title.substr(0, title.length - 7);
                                state.currentEvaluators.push([id, firstname, lastname, title]);
                            }
                        }

                        if (response.data.formData.formVariableModels[f].name === 'frmSelTests' && response.data.formData.formVariableModels[f].value !== null) {
                            var frmSelTestList = response.data.formData.formVariableModels[f].value.split(';');
                            var tLen = frmSelTestList.length;

                            for (var tl = 0; tl < tLen; ++tl) {
                                console.log('tests line ' + tl);
                                if (frmSelTestList[tl] !== '') state.tests[frmSelTestList[tl]].set = 1;
                            }
                        }

                        state.curForm[response.data.formData.formVariableModels[f].name] = response.data.formData.formVariableModels[f].value;
                    }

                    var aLen = response.data.formData.formAreaModels !== null && response.data.formData.formAreaModels.length > 0 ? response.data.formData.formAreaModels.length : 0;
                    var faLen = state.formAreas.length;

                    if (aLen > 0) {
                        for (var fa = 0; fa < faLen; ++fa) {
                            state.formAreas.pop();
                        }
                    } else {
                        for (var fb = 0; fb < faLen; ++fb) {
                            state.curForm[state.formAreas[fb].name] = state.formAreas[fb].value;
                        }
                    }

                    for (var a = 0; a < aLen; ++a) {
                        switch (response.data.formData.formAreaModels[a].name) {
                            case 'divFarEligBas1':
                                state.formAreasStaging[0] = { name: response.data.formData.formAreaModels[a].name, value: response.data.formData.formAreaModels[a].value };
                                break;
                            case 'divFarEligBas2':
                                state.formAreasStaging[1] = { name: response.data.formData.formAreaModels[a].name, value: response.data.formData.formAreaModels[a].value };
                                break;
                            case 'divFarEligBas3':
                                state.formAreasStaging[2] = { name: response.data.formData.formAreaModels[a].name, value: response.data.formData.formAreaModels[a].value };
                                break;
                            case 'divFarEligBas4':
                                state.formAreasStaging[3] = { name: response.data.formData.formAreaModels[a].name, value: response.data.formData.formAreaModels[a].value };
                                break;
                            case 'divFarEligBas5':
                                state.formAreasStaging[4] = { name: response.data.formData.formAreaModels[a].name, value: response.data.formData.formAreaModels[a].value };
                                break;
                            case 'divFarEligBas6':
                                state.formAreasStaging[5] = { name: response.data.formData.formAreaModels[a].name, value: response.data.formData.formAreaModels[a].value };
                                break;
                            case 'divFarEligBas7':
                                state.formAreasStaging[6] = { name: response.data.formData.formAreaModels[a].name, value: response.data.formData.formAreaModels[a].value };
                                break;
                            case 'divFarEligBas8':
                                state.formAreasStaging[7] = { name: response.data.formData.formAreaModels[a].name, value: response.data.formData.formAreaModels[a].value };
                                break;
                            case 'divFarEligBas9':
                                state.formAreasStaging[8] = { name: response.data.formData.formAreaModels[a].name, value: response.data.formData.formAreaModels[a].value };
                                break;
                            case 'divFarEvalProc':
                                state.formAreasStaging[9] = { name: response.data.formData.formAreaModels[a].name, value: response.data.formData.formAreaModels[a].value };
                                break;
                            case 'divFarAssProc':
                                state.formAreasStaging[10] = { name: response.data.formData.formAreaModels[a].name, value: response.data.formData.formAreaModels[a].value };
                                break;
                            case 'divFarNarrWake':
                                state.formAreasStaging[11] = { name: response.data.formData.formAreaModels[a].name, value: response.data.formData.formAreaModels[a].value };
                                break;
                            case 'divFarNarrDres':
                                state.formAreasStaging[12] = { name: response.data.formData.formAreaModels[a].name, value: response.data.formData.formAreaModels[a].value };
                                break;
                            case 'divFarNarrMeal':
                                state.formAreasStaging[13] = { name: response.data.formData.formAreaModels[a].name, value: response.data.formData.formAreaModels[a].value };
                                break;
                            case 'divFarNarrOuts':
                                state.formAreasStaging[14] = { name: response.data.formData.formAreaModels[a].name, value: response.data.formData.formAreaModels[a].value };
                                break;
                            case 'divFarNarrPlay':
                                state.formAreasStaging[15] = { name: response.data.formData.formAreaModels[a].name, value: response.data.formData.formAreaModels[a].value };
                                break;
                            case 'divFarNarrBath':
                                state.formAreasStaging[16] = { name: response.data.formData.formAreaModels[a].name, value: response.data.formData.formAreaModels[a].value };
                                break;
                            case 'divFarObsTesting':
                                state.formAreasStaging[17] = { name: response.data.formData.formAreaModels[a].name, value: response.data.formData.formAreaModels[a].value };
                                break;
                            default:
                                break;
                        }
                    }

                    if (aLen > 0) {
                        for (var al = 0; al < aLen; ++al) {
                            state.formAreas.push(state.formAreasStaging[al]);
                            state.curForm[state.formAreasStaging[al].name] = state.formAreasStaging[al].value;
                        }
                    }

                    var tvLen = response.data.formData.templateVariableModels.length;

                    for (var t = 0; t < tvLen; ++t) {
                        state.compositeOptions.push(response.data.formData.templateVariableModels[t]);
                        state.compositeOptionsChecked.push(0);
                    }

                    if (response.data.formData.printVariableModels !== undefined && response.data.formData.printVariableModels[0] !== undefined && response.data.formData.printVariableModels[0].pageBreaks !== undefined) {
                        state.pageBreaks = response.data.formData.printVariableModels[0].pageBreaks.split(';');
                        state.pageBreaksLoaded = response.data.formData.printVariableModels[0].pageBreaks.split(';');
                    }

                    state.formSelOptionsUpdated = true;
                    state.formLoaded = 1;
                } else {
                    state.curForm.status = true;
                    state.curForm.tempId = tempId;
                    state.curForm.finalForm = response.data.formData.finalForm;
                    state.formLoaded = 1;
                    console.log('store load ' + state.curForm.status);
                    state.formVariables = { final: 'form' };
                }
            })
            .catch(function (error) {
                console.log('error');
                console.log(error);
            });
    },
    upsertFinalForm: ({ commit, state }, payload) => {
        state.
              false;
        axios.post('/Form/UpsertFinalForm', payload,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function (response) {
                state.finalFormUpdated = true;
                console.log('form updated...');
                console.log(response.data);
                window.location.href = '/Admin/Index';
            })
            .catch(function (error) {
                state.finalFormUpdated = false;
                console.log('catch response...');
                console.log(error);
            });
    },
    upsertForm: ({ dispatch, commit, state }, payload) => {
        var len = state.forms.length;
        var form = {};
        var formIdx = -1;

        /*for (let x = 0; x < len; ++x) {
            if (state.forms[x].tempId === payload.tempId) {
                form = state.forms[x];
                formIdx = x;
                break;
            }
        }*/

        switch (payload.type) {
            case 0:
                form.MagicNo = payload.newVal;
                break;
            case 1:
                form.Firstname = payload.newVal;
                break;
            case 2:
                form.Lastname = payload.newVal;
                break;
            case 3:
                form.Dob = payload.newVal;
                break;
            case 4:
                form.EvalDate = payload.newVal;
                break;
            case 5:
                form.StatusStr = payload.newVal;
                break;
            case 6:
                form.ReportReady = payload.newVal;
                break;
            case 7:
                form.ReportPrinted = payload.newVal;
                break;
            case 50:  // Full save
                form = {};
                $.each(payload, function (key, val) {
                    if (key !== 'FormAreaModels' && key !== 'FormVariableModels') {
                        form[key] = val;
                    }

                    if (key === 'FormVariableModelsTemp') {
                        form.FormVariableModels = [];
                        var fvLen = val.length;

                        for (var x = 0; x < fvLen; ++x) {
                            var FormVariable = {};
                            FormVariable.FormId = payload.TempId;
                            FormVariable.Name = val[x][0];
                            FormVariable.Value = val[x][1];
                            FormVariable.Description = val[x][2];
                            form.FormVariableModels.push(FormVariable);
                        }
                    }
                });

                form.FormAreaModels = state.formAreas;
                form.PrintVariableModels = [{ FormId: payload.TempId, PageBreaks: state.pageBreaks.join(';')}];
                break;
            case 100:  // Final save
                form = payload;
                break;
            default:
                form = payload;
                break;
        }

        /*form.TempId = 1;
        form.MagicNo = 'Test';
        form.Firstname = 'Test';
        form.Lastname = 'Test';
        form.Dob = new Date();
        form.EvalDate = new Date();
        form.NeedsUpdate = true;
        form.Status = false;
        form.LastSaved = new Date();
        form.LastUserId = 1;
        form.LastUser = 'Test';
        form.CreatedOn = new Date();
        form.ReportPrinted = new Date();
        form.ReportReady = false;*/

        //console.log('starting form save');
        //console.log(form);
        axios.post('/Form/UpsertForm', form,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function (response) {
                console.log('form updated...');
                console.log(response.data);
                if (response.data !== 0) {
                    if (payload.action === 1) {
                        window.location.href = '/Admin/Index';
                    }

                    if (payload.type === 100) {
                        window.location.href = '/Form/Index/' + state.tempId;
                    }

                    if (payload.Status) {
                        state.curForm.status = true;
                    }

                    state.forms.splice(formIdx, 1, form);
                    state.hasSaved = true;

                    if (payload.type === 6) {
                        dispatch('alertOffice', { formId: form.tempId, childName: form.Firstname + ' ' + form.Lastname });
                    }
                } else {
                    console.log('failed to update');
                }

            })
            .catch(function (error) {
                console.log('catch response...');
                console.log(error);
            });
    },
    upsertUser: ({ commit, state }, payload) => {
        var len = state.users.length;
        var user = {};
        var userIdx = -1;

        if (payload.type !== 22) {
            for (let x = 0; x < len; ++x) {
                if (state.users[x].userId === payload.userId) {
                    user = state.users[x];
                    userIdx = x;
                    break;
                }
            }
        }

        switch (payload.type) {
            case 0:
                user.RoleName = payload.newVal;
                break;
            case 1:
                user.Username = payload.newVal;
                break;
            case 2:
                user.Firstname = payload.newVal;
                break;
            case 3:
                user.Lastname = payload.newVal;
                break;
            case 4:
                user.Email = payload.newVal;
                break;
            case 5:
                user.Title = payload.newVal;
                break;
            case 6:
                user.LockedoutStr = payload.newVal;
                break;
            case 22:
                user.UserId = userIdx;
                user.RoleName = payload.newUser.roleName;
                user.Username = payload.newUser.username;
                user.Firstname = payload.newUser.firstname;
                user.Lastname = payload.newUser.lastname;
                user.Email = payload.newUser.email;
                user.Title = payload.newUser.title;
                user.NewPass = payload.newUser.password;
                user.LockedoutStr = payload.newUser.lockedoutStr;
                break;
        }

        axios.post('/Admin/UpsertUser', user,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function (response) {
                console.log('user updated...');
                console.log(response.data);
                if (response.data !== 0) {
                    if (payload.type !== 22) {
                        state.users.splice(userIdx, 1, user);
                    } else {
                        user.userId = response.data;
                        user.roleName = user.RoleName;
                        user.username = user.Username;
                        user.firstname = user.Firstname;
                        user.lastname = user.Lastname;
                        user.email = user.Email;
                        user.title = user.Title;
                        user.lockedout = user.Lockedout;
                        state.users.push(user);
                    }
                } else {
                    state.userUpdateFailed = 1;
                    console.log('failed to update');
                }
            })
            .catch(function (error) {
                console.log('catch response...');
                console.log(error);
            });
    }
}

Vue.use(Vuex);

// Initialize both the state and the mutations and export - best practice
export default new Vuex.Store({
    state,
    mutations,
    actions
})