<template>
    <div id="app" @mousemove="resetIdleTime" @keyup="resetIdleTime">
        <!-- Navigation Bar -->
        <nav class="navbar printNo fixed-top bgColorOffWhite navbar-expand-lg">
            <div class="container">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#responsiveMenu" aria-controls="responsiveMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon">
                        <fai :icon="['fas', 'bars']" class="colorBlue" style="font-size:30px;"></fai>
                    </span>
                </button>
                <div class="collapse navbar-collapse text-center" id="responsiveMenu">
                    <ul class="navbar-nav">
                        <li class="nav-item" style="margin-left:8px;margin-right:8px;">
                            <a class="nav-link bold colorBlue text-center" style="padding-top:14px;" href="/Admin/Index">Admin</a>
                        </li>
                        <li class="nav-item" @click="save(2)" style="margin-left:8px;margin-right:8px;">
                            <a class="nav-link bold colorBlue text-center saveExit" style="padding-top:14px;" href="#">{{ !status ? 'Save and Exit' : (!hasEditedAll ? 'Exit' : 'Update and Exit') }}</a>
                        </li>
                        <li v-if="!status" class="nav-item" @click="save" style="margin-left:8px;margin-right:8px;">
                            <a class="nav-link bold colorBlue text-center" style="padding-top:14px;" href="#">Save</a>
                        </li>
                        <li class="nav-item" @click="printReport" style="margin-left:8px;margin-right:8px;">
                            <a class="nav-link bold colorBlue text-center" style="padding-top:14px;" href="#">Print</a>
                        </li>
                        <li v-if="!status" class="nav-item" @click="save(1)" style="margin-left:8px;margin-right:8px;">
                            <a class="nav-link bold colorBlue text-center" style="padding-top:14px;" href="#">Complete</a>
                        </li>
                        <li v-if="status" class="nav-item" @click="alertOffice" style="margin-left:8px;margin-right:8px;">
                            <a class="nav-link bold colorBlue text-center" style="padding-top:14px;" href="#">Alert Office</a>
                        </li>
                        <li v-if="status" class="nav-item" style="margin-left:8px;margin-right:8px;">
                            <input id="emailReportList" class="" placeholder="Recipient list (use ; for multiple)" />
                            <a @click="emailReport" class="nav-link bold colorBlue text-center displayInlineBlock" style="padding-top:14px;" href="#">Email Report</a>
                        </li>
                        <li v-if="status" class="nav-item" @click="editAll" style="margin-left:8px;margin-right:8px;">
                            <a class="nav-link bold colorBlue text-center" style="padding-top:14px;" href="#">Edit Entire Document</a>
                        </li>
                        <li class="nav-item" style="margin-left:8px;margin-right:8px;">
                            <a class="nav-link bold colorBlue text-center" style="padding-top:14px;" href="/Home/Logout">Log Out</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <form id="frmForm" method="post" @submit="validateSubmit" class="frmForm marginTop75" enctype="multipart/form-data" novalidate>
            <div class="container-fluid">
                <div id="divSectionHeader">
                    <div class="row">
                        <div class="col-sm-12 col-md-4">
                            <p class="text-center fontBold marginTop10">
                                41 Marne St. Suite B<br />
                                Hamden, CT 06514<br />
                                Phone 203-453-7592<br />
                                Fax 203-453-7538 
                            </p>
                        </div>
                        <div class="col-sm-12 col-md-4">
                            <img alt="KidSteps Logo" src="/images/KidSteps.png" width="240" height="120" class="centerImage" />
                        </div>
                        <div class="col-sm-12 col-md-4">
                            <img alt="Birth To Three Logo" src="/images/BirthToThree.png" width="80" height="73" class="centerImage marginTop30" />
                        </div>
                    </div>
                    <div class="row lineBlue">
                        &nbsp;
                    </div>
                </div>
                <div id="divSectionMain">
                    <div class="row marginTop25 printNo">
                        <div class="col-sm-6 col-md-3 fontBold">Case Number:</div>
                        <div class="col-sm-6 col-md-3 fontBold mandatory frmVarTxt" data-frm-var="frmCaseNo"></div>
                    </div>
                    <div class="row marginTop10">
                        <h1 class="text-center marginAuto fontSize22 fontBold">
                            <span class="mandatory frmVarDdl" data-frm-var="frmEvalType"></span> 
                        </h1>
                    </div>
                    <div class="row marginTop25">
                        <div class="col-sm-6 col-md-3 fontBold">Child's first name:</div>
                        <div class="col-sm-6 col-md-3 mandatory frmVarTxt" data-frm-var="frmChildFirstname"></div>
                        <div class="col-sm-6 col-md-3 fontBold">Date of Birth:</div>
                        <div class="col-sm-6 col-md-3 mandatory frmVarDt" data-frm-var="frmDob"></div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6 col-md-3 fontBold">Child's last name:</div>
                        <div class="col-sm-6 col-md-3 mandatory frmVarTxt" data-frm-var="frmChildLastname"></div>
                        <div class="col-sm-6 col-md-3 fontBold">Date of {{ isAssessment ? 'Assessment' : 'Evaluation' }}:</div>
                        <div class="col-sm-6 col-md-3 mandatory frmVarDt" data-frm-var="frmDtEval"></div>
                    </div>
                    <div class="row">
                        <div id="divLblChildNickname" class="col-sm-6 col-md-3 fontBold">Child's nickname:</div>
                        <div id="divChildNickname" class="col-sm-6 col-md-3 optional frmVarTxt" data-frm-var="frmChildNickname"></div>
                        <div class="col-sm-6 col-md-3 fontBold">Age at {{ isAssessment ? 'Assessment' : 'Evaluation' }}:</div>
                        <div class="col-sm-6 col-md-3 frmVarCalc" data-frm-calc="frmAgeEval"></div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 col-md-6 fontBold">{{ isAssessment ? 'Assessor(s)' : 'Evaluator(s)' }}:</div>
                        <div class="col-sm-6 col-md-3 fontBold">Gender:</div>
                        <div class="col-sm-6 col-md-3 mandatory frmVarRad" data-frm-var="frmGender"></div>
                    </div>
                    <div class="row">
                        <div class="col-md-1">&nbsp;</div>
                        <div class="col-sm-12 col-md-6 mandatory frmVarList" data-frm-var="frmEvalList"></div>
                    </div>
                </div>
                <div id="divSection1" class="marginTop25">
                    <div style="width:100%;">
                        <div class="fontBold text-center borderStd fontSize22 padding5">{{ sectionHeaders[0] }}</div>
                    </div>
                    <div class="divFam1 marginTop10">
                        <div class="row">
                            <div class="col-sm-6 col-md-3 fontBold">Name(s):</div>
                            <div class="col-sm-6 col-md-3 mandatory frmVarTxt" data-frm-var="frmFamilyName1"></div>
                            <div class="col-sm-6 col-md-3 fontBold">Relationship:</div>
                            <div class="col-sm-6 col-md-3 mandatory frmVarTxt" data-frm-var="frmFamilyRelationship1"></div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6 col-md-3 fontBold">Address:</div>
                            <div class="col-sm-6 col-md-3 mandatory frmVarTxt" data-frm-var="frmFamilyAddress1"></div>
                            <div class="col-sm-6 col-md-3 fontBold">Phone:</div>
                            <div class="col-sm-6 col-md-3 mandatory frmVarTxt" data-frm-var="frmFamilyPhone1"></div>
                        </div>
                        <div class="row justify-content-end">
                            <div class="col-sm-6 col-md-3 fontBold">Email:</div>
                            <div class="col-sm-6 col-md-3 mandatory frmVarTxt" data-frm-var="frmFamilyEmail1"></div>
                        </div>
                    </div>
                    <div class="text-center famButtons marginTop10">
                        <button type="button" v-show="canAddFam" @click="addFam" class="btn btn-info printNo"><fai :icon="['fas', 'plus']"></fai> Add Family Member</button>
                        <button type="button" v-show="canRemFam" @click="remFam" class="btn btn-info printNo"><fai :icon="['fas', 'minus']"></fai> Remove Family Member</button>
                    </div>
                    <div v-show="showFam2" class="divFam2 marginTop20">
                        <div class="row">
                            <div class="col-sm-6 col-md-3 fontBold">Name(s):</div>
                            <div class="col-sm-6 col-md-3 optional frmVarTxt" data-frm-var="frmFamilyName2"></div>
                            <div class="col-sm-6 col-md-3 fontBold">Relationship:</div>
                            <div class="col-sm-6 col-md-3 optional frmVarTxt" data-frm-var="frmFamilyRelationship2"></div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6 col-md-3 fontBold">Address:</div>
                            <div class="col-sm-6 col-md-3 optional frmVarTxt" data-frm-var="frmFamilyAddress2"></div>
                            <div class="col-sm-6 col-md-3 fontBold">Phone:</div>
                            <div class="col-sm-6 col-md-3 optional frmVarTxt" data-frm-var="frmFamilyPhone2"></div>
                        </div>
                        <div class="row justify-content-end">
                            <div class="col-sm-6 col-md-3 fontBold">Email:</div>
                            <div class="col-sm-6 col-md-3 optional frmVarTxt" data-frm-var="frmFamilyEmail2"></div>
                        </div>
                    </div>
                    <div v-show="showFam3" class="divFam3 marginTop30">
                        <div class="row">
                            <div class="col-sm-6 col-md-3 fontBold">Name(s):</div>
                            <div class="col-sm-6 col-md-3 optional frmVarTxt" data-frm-var="frmFamilyName3"></div>
                            <div class="col-sm-6 col-md-3 fontBold">Relationship:</div>
                            <div class="col-sm-6 col-md-3 optional frmVarTxt" data-frm-var="frmFamilyRelationship3"></div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6 col-md-3 fontBold">Address:</div>
                            <div class="col-sm-6 col-md-3 optional frmVarTxt" data-frm-var="frmFamilyAddress3"></div>
                            <div class="col-sm-6 col-md-3 fontBold">Phone:</div>
                            <div class="col-sm-6 col-md-3 optional frmVarTxt" data-frm-var="frmFamilyPhone3"></div>
                        </div>
                        <div class="row justify-content-end">
                            <div class="col-sm-6 col-md-3 fontBold">Email:</div>
                            <div class="col-sm-6 col-md-3 optional frmVarTxt" data-frm-var="frmFamilyEmail3"></div>
                        </div>
                    </div>
                </div>
                <div v-if="!isAssessment" id="divSection2" class="marginTop25">
                    <div style="width:100%;">
                        <div class="fontBold text-center borderStd fontSize22 padding5">{{ sectionHeaders[1] }}</div>
                    </div>
                    <div v-if="!isAnnual">
                        <div class="row marginTop10">
                            <div class="col-sm-6 col-md-3 fontBold">Pregnancy Term:</div>
                            <div class="col-sm-6 col-md-3 mandatory frmVarNumTxt" data-frm-var="frmPregTerm"></div>
                            <div class="col-sm-6 col-md-3 fontBold">Birth Weight:</div>
                            <div class="col-sm-6 col-md-3">
                                <span class="mandatory frmVarNumTxt" data-frm-var="frmBirthLbs"></span> 
                                <span class="mandatory frmVarNumTxt" data-frm-var="frmBirthOz"></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12 col-md-3 fontBold">Vision:</div>
                            <div class="col-sm-12 col-md-9 mandatory frmVarDdl" data-frm-var="frmVision"></div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12 col-md-3 fontBold">Hearing:</div>
                            <div class="col-sm-12 col-md-9 mandatory frmVarDdl" data-frm-var="frmHearing"></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 col-md-3 fontBold">Birth or Past History:</div>
                        <div class="col-sm-12 col-md-9 mandatory frmVarEdt" data-frm-var="frmBirthPastHist"></div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 col-md-3 fontBold">Current Health:</div>
                        <div class="col-sm-12 col-md-9 mandatory frmVarEdt" data-frm-var="frmCurrHealth"></div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 col-md-3 fontBold">Related Family Medical History:</div>
                        <div class="col-sm-12 col-md-9 mandatory frmVarEdt" data-frm-var="frmRelFamHist"></div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 col-md-3 fontBold">Current Diagnosed or Established Condition:</div>
                        <div class="col-sm-12 col-md-9 mandatory frmVarEdt" data-frm-var="frmCurrCond"></div>
                    </div>
                </div>
                <page-break></page-break>
                <frm-body :secNum="!isAssessment ? 3 : 9" :secName="!isAssessment ? 'divFarEvalProc' : 'divFarAssProc'" :defaultPageBreakSet="[true]" :editFrmArea="editFrmArea"></frm-body>
                <frm-body v-if="!isAssessment" :secNum="4" :hasRoutine="true" :toggle-exclude="toggleExclude" :defaultPageBreakSet="[false,false,true,false,false,true]" :editFrmArea="editFrmArea"></frm-body>
                <frm-body v-if="!isStandard" :secNum="!isAssessment ? 5 : 4" secName="divFarObsTesting" :defaultPageBreakSet="[false]" :editFrmArea="editFrmArea"></frm-body>
                <div id="divSection6" class="marginTop25">
                    <div style="width:100%;">
                        <div class="fontBold text-center borderStd fontSize22 padding5">{{ !isAssessment ? sectionHeaders[5] : sectionHeaders[9] }}</div>
                    </div>
                    <div v-if="isAssessment" class="marginTop10">
                        <span data-frm-var="frmEvalProcParticipant" class="mandatory frmVarTxt"></span> was given the opportunity to complete a Family Needs Survey to 
                            identify topics to discuss further.
                        <div @click="toggleBasicExclude" class="exclude printNo">
                            <span data-frm-var="frmEvalProcParticipant" class="mandatory frmVarTxt"></span> declined to complete this assessment at this time.
                        </div>
                        <div @click="toggleBasicExclude" class="exclude printNo">
                            Topics the family would like to discuss further during the development of an Individualized Family Service Plan include 
                            <span @click="toggleBasicExclude" class="include">information about <span data-frm-calc="frmChildAlias"></span>’s behavior and development</span> 
                            <span @click="toggleBasicExclude" class="include">family and social supports</span> 
                            <span @click="toggleBasicExclude" class="include">financial resources</span> 
                            <span @click="toggleBasicExclude" class="include">communicating with others about <span data-frm-calc="frmChildAlias"></span>’s 
                            strengths and needs </span> <span @click="toggleBasicExclude" class="include">child care</span> 
                            <span @click="toggleBasicExclude" class="include"> professional support</span> 
                            <span @click="toggleBasicExclude" class="include"> community services.</span> 
                        </div>
                        <div>
                            The <b><u>Family Needs Survey</u></b> is a family-directed assessment tool that identifies areas you would like to learn more about and discuss further.
                        </div>
                    </div>
                    <div v-if="isStandard && !isAssessment" class="marginTop10">
                        <div class="row">
                            <div class="col-sm-12 col-md-6 fontBold">Connecticut Birth to Three System Vision Screening:</div>
                            <div class="col-sm-12 col-md-6 mandatory frmVarDdl" data-frm-var="frmVisScreening"></div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">&nbsp;</div>
                            <div class="col-sm-12 col-md-6 optional frmVarEdt" data-frm-var="frmVisScreenConcerns"></div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12 col-md-6 fontBold">Connecticut Birth to Three System Nutrition Screening:</div>
                            <div class="col-sm-12 col-md-6 mandatory frmVarDdl" data-frm-var="frmNutScreening"></div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">&nbsp;</div>
                            <div class="col-sm-12 col-md-6 optional frmVarEdt" data-frm-var="frmNutScreenConcerns"></div>
                        </div>
                    </div>
                    <div class="text-center">
                        <button @click="toggleInfoTbl" type="button" :class="['btn', hidingScoringKey ? 'btn-warning' : 'btn-info', 'printNo', 'btnScoringKey']" data-frm-po="2">
                            <fai :icon="['fas', hidingScoringKey ? 'eye' : 'eye-slash']"></fai> {{ hidingScoringKey ? 'Show' : 'Hide' }} Scoring Key
                        </button>
                    </div>
                    <div v-if="!hidingScoringKey" id="divScoringKey">
                        <p class="text-center fontBold">Key</p>
                        <table class="customTable">
                            <tr>
                                <th>Standard Score</th>
                                <th>T-Score</th>
                                <th>Standard Deviation</th>
                                <th>Description</th>
                            </tr>
                            <tr>
                                <td>123 or more</td>
                                <td>65 - 70 or more</td>
                                <td>+1.50 or more</td>
                                <td>much more than other children the same age</td>
                            </tr>
                            <tr class="alt">
                                <td>113 - 120</td>
                                <td>58 - 63</td>
                                <td>+0.75 - +1.33</td>
                                <td>more than other children the same age</td>
                            </tr>
                            <tr>
                                <td>90 - 110</td>
                                <td>43 - 57</td>
                                <td>-.067 - +.067</td>
                                <td>the same as most children the same age</td>
                            </tr>
                            <tr class="alt">
                                <td>80 - 88</td>
                                <td>37 - 42</td>
                                <td>-0.75 - -1.33</td>
                                <td>less than other children the same age</td>
                            </tr>
                            <tr>
                                <td>78 - 73</td>
                                <td>32 - 35</td>
                                <td>-1.75 - -1.50</td>
                                <td>much less than other children the same age</td>
                            </tr>
                            <tr class="alt">
                                <td>70 or less</td>
                                <td>30 or below</td>
                                <td>-2.00 or below</td>
                                <td>significantly less than other children the same age</td>
                            </tr>
                        </table>
                        <page-break :defaultPageBreak="true" :deferredIdx="poIdx+1"></page-break>
                    </div>
                    <div>
                        <table id="tblMchatKey" class="customTable displayNone marginTop10">
                            <tr>
                                <th>M-CHAT-R Score</th>
                                <th>Level of Risk</th>
                            </tr>
                            <tr>
                                <td>0 - 2</td>
                                <td>low</td>
                            </tr>
                            <tr class="alt">
                                <td>3 - 7</td>
                                <td>medium</td>
                            </tr>
                            <tr>
                                <td>8 - 20</td>
                                <td>high</td>
                            </tr>
                        </table>
                        <page-break :deferredIdx="poIdx+2"></page-break>
                        <div class="printNo">
                            <h3 class="text-center fontBold marginTop10">Tests</h3>
                            <div class="row marginAuto" v-for="(test, i) in tests">
                                <div class="marginTop5 col-4 mx-auto">
                                    <input :id="'cbx' + test.name" @click="toggleDisplayTest" class="custom-control-input cbxTest" type="checkbox" :checked="test.set ? 'checked': ''" />
                                    <label class="custom-control-label" :for="'cbx' + test.name">{{ test.fullname }}</label>
                                </div>
                            </div>
                        </div>
                        <div class="marginTop10">
                            <div v-if="tests[0].set">
                                The <span class="fontBold underline">Alberta Infant Motor Scale (AIMS)</span> is a standardized, norm-referenced test used to assess the gross motor function of young children.
                                <hr />
                                <table id="tblAims" class="customTable">
                                    <tr>
                                        <th>Raw Score</th>
                                        <th>Standard Deviation</th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmAimsNum1"></span>
                                        </td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmAimsSd1"></span>
                                        </td>
                                    </tr>
                                </table>
                                <page-break :deferredIdx="poIdx+3"></page-break>
                            </div>
                            <div v-if="tests[1].set" class="marginTop10">
                                <span class="fontBold underline">The Battelle Developmental Inventory-2nd Edition (BDI-2)</span> is a standardized, norm-referenced, 
                                    assessment tool that assesses your child’s performance in five developmental areas.
                                <hr />
                                <table id="tblBdi" class="customTable">
                                    <tr>
                                        <th colspan="2">Developmental Area</th>
                                        <th>Standard Score</th>
                                        <th>Standard Deviation</th>
                                    </tr>
                                    <tr>
                                        <td class="alt" colspan="2"><span class="fontBold">Self-Help/Adaptive</span> (eating, sleeping, dressing, toileting, and personal responsibility)</td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmBdiNum1"></span>
                                        </td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmBdiSd1"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="alt" colspan="2"><span class="fontBold">Personal/Social</span> 
                                            (social interactions between your child and adults and peers, expression of feelings, and coping behaviors)</td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmBdiNum2"></span>
                                        </td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmBdiSd2"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="alt" rowspan="2"><span class="fontBold">Communication</span> (the exchange of information)</td>
                                        <td class="alt"><span class="fontBold">Receptive</span> (what your child understands)</td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmBdiNum3"></span>
                                        </td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmBdiSd3"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="alt"><span class="fontBold">Expressive</span> (what your child says, and how they say it)</td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmBdiNum4"></span>
                                        </td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmBdiSd4"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="alt" rowspan="2"><span class="fontBold">Motor</span> (quality and manner in which your child moves)</td>
                                        <td class="alt"><span class="fontBold">Gross</span> (quality and manner in which your child moves; like walking, running, jumping)</td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmBdiNum5"></span>
                                        </td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmBdiSd5"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="alt"><span class="fontBold">Fine</span> (use of hands and eyes; and how your child processes information from the environment around them)</td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmBdiNum6"></span>
                                        </td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmBdiSd6"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="alt" colspan="2"><span class="fontBold">Cognitive</span> (how your child responds and interacts with the environment, as in attention span, memory, and ability to solve problems)</td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmBdiNum7"></span>
                                        </td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmBdiSd7"></span>
                                        </td>
                                    </tr>
                                </table>
                                <page-break :deferredIdx="poIdx+4"></page-break>
                            </div>
                            <div v-if="tests[2].set" class="marginTop10">
                                The <span class="fontBold underline">Brief Infant /Toddler Social-Emotional Assessment (BITSEA)</span> is a standardized, norm-referenced screening tool used to assess your child’s social
					            emotional development.
                                <hr />
                                <table id="tblBitsea" class="customTable">
                                    <tr>
                                        <th colspan="2">Area</th>
                                        <th>Of Concern</th>
                                    </tr>
                                    <tr>
                                        <td class="alt" colspan="2"><span class="fontBold">Problem Score</span> (aggression, sadness, fear, odd hand movements, hurting one's self) 
                                        </td>
                                        <td>
                                            <span class="optional frmVarTxt" data-frm-var="frmBitseaTxt1"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="alt" colspan="2"><span class="fontBold">Competence Score</span> (following rules, showing affection, paying attention, playing well with other children) 
                                        </td>
                                        <td>
                                            <span class="optional frmVarTxt" data-frm-var="frmBitseaTxt2"></span>
                                        </td>
                                    </tr>
                                </table>
                                <page-break :deferredIdx="poIdx+5"></page-break>
                            </div>
                            <div v-if="tests[3].set" class="marginTop10">
                                The <span class="fontBold underline">Devereux Early Childhood Assessment for Toddlers (DECA-T)</span> is a standardized, norm referenced tool used to assess a child’s social and emotional
                                development.
                                <hr />
                                <input id="cbxDevAge" type="checkbox" class="frmDisOpt printNo" data-frm-po="0" /><span class="printNo">Child is under 18 months in age</span>
                                <br />
                                <table id="tblDeca" class="customTable">
                                    <tr>
                                        <th colspan="2">Area</th>
                                        <th>Standard Score</th>
                                        <th>Standard Deviation</th>
                                    </tr>
                                    <tr>
                                        <td class="alt" colspan="2"><span class="fontBold">Attachment/Relationships</span></td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmDecaNum1"></span>
                                        </td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmDecaSd1"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="alt" colspan="2"><span class="fontBold">Initiative</span> (act or take charge before others)</td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmDecaNum2"></span>
                                        </td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmDecaSd2"></span>
                                        </td>
                                    </tr>
                                    <tr id="trDevAge">
                                        <td class="alt" colspan="2">
                                            <span class="fontBold">Self-Regulation</span> (refers to the capacity to control one’s impulses, both to stop doing something, if needed and to start
                                            doing something, if needed)
                                        </td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmDecaNum3"></span>
                                        </td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmDecaSd3"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" class="alt"><span class="fontBold">Total Protective Factors</span></td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmDecaNum4"></span>
                                        </td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmDecaSd4"></span>
                                        </td>
                                    </tr>
                                </table>
                                <page-break :deferredIdx="poIdx+6"></page-break>
                            </div>
                            <div v-if="tests[4].set" class="marginTop10">
                                The <span class="fontBold underline">Early Start Denver Model (ESDM)</span> Curriculum is a checklist used to assess the developmental skills of toddlers and preschoolers with autism spectrum
                                disorder. The results are embedded in the previous written descriptions of your child’s daily routines.
                                <page-break :deferredIdx="poIdx+7"></page-break>
                            </div>
                            <div v-if="tests[5].set" class="marginTop10">
                                The <span class="fontBold underline">Goldman-Fristoe Test of Articulation-3rd Edition (GFTA-3)</span> is a standardized, norm referenced test that provides information about a child’s use of speech
                                sounds in single words in imitation and spontaneously.
                                <hr />
                                <table id="tblGfta" class="customTable">
                                    <tr>
                                        <th>Standard Score</th>
                                        <th>Standard Deviation</th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmGftaNum1"></span>
                                        </td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmGftaSd1"></span>
                                        </td>
                                    </tr>
                                </table>
                                <page-break :deferredIdx="poIdx+8"></page-break>
                            </div>
                            <div v-if="tests[6].set" class="marginTop10">
                                The <span class="fontBold underline">Hawaii Early Learning Profile (HELP)</span> is a developmental checklist used for children between the ages of newborn to 3 years old. It is an on-going
                                tracking tool that looks at the skills your child has mastered in five areas: self-help, social, communication, motor, and cognitive skills. Your child's abilities are described in the routines above. No formal scores are obtained using this measure.
                                <page-break :deferredIdx="poIdx+9"></page-break>
                            </div>
                            <div v-if="tests[7].set" class="marginTop10">
                                The <span class="fontBold underline">Infant Sensory Profile-2 Infant (ISP-2)</span> is a caregiver questionnaire used to provide information about the child’s response to sensory stimuli
                                (vision, hearing, smelling, touching, tasting, body movements) that occurs throughout the day.
                                <hr />
                                <table id="tblIsp" class="customTable">
                                    <tr>
                                        <th colspan="2">Area</th>
                                        <th>Raw Score</th>
                                        <th>Meaning</th>
                                    </tr>
                                    <tr>
                                        <td class="alt" colspan="2"><span class="fontBold">General Processing</span> (how a child takes in and makes sense of various forms of sensory information)</td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmIspNum1"></span>
                                        </td>
                                        <td>
                                             <span class="optional frmVarDdl" data-frm-var="frmIspTxt1"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="alt" colspan="2"><span class="fontBold">Auditory Processing</span> (how a child takes in and makes sense of information that he or she hears)</td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmIspNum2"></span>
                                       </td>
                                        <td>
                                             <span class="optional frmVarDdl" data-frm-var="frmIspTxt2"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="alt" colspan="2"><span class="fontBold">Visual Procesing</span> (how a child takes in and makes sense of information he or she sees)</td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmIspNum3"></span>
                                        </td>
                                        <td>
                                            <span class="optional frmVarDdl" data-frm-var="frmIspTxt3"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="alt" colspan="2"><span class="fontBold">Touch Processing</span> (how a child takes in and makes sense of touch information)</td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmIspNum4"></span>
                                        </td>                             
                                        <td>
                                            <span class="optional frmVarDdl" data-frm-var="frmIspTxt4"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="alt" colspan="2"><span class="fontBold">Movement Processing</span> (how a child takes in and makes sense of how his or her body is moving)</td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmIspNum5"></span>
                                        </td>                             
                                        <td>
                                            <span class="optional frmVarDdl" data-frm-var="frmIspTxt5"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" class="alt"><span class="fontBold">Oral Sensory</span> (how a child takes in and makes sense of information in his or her mouth)</td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmIspNum6"></span>
                                        </td>                             
                                        <td>
                                            <span class="optional frmVarDdl" data-frm-var="frmIspTxt6"></span>
                                        </td>
                                    </tr>
                                     <tr>
                                        <td colspan="2" class="alt"><span class="fontBold">Total Score</span> (an overall measure of how a child takes in and makes sense of sensory information)</td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmIspNum7"></span>
                                        </td>                             
                                        <td>
                                            <span class="optional frmVarDdl" data-frm-var="frmIspTxt7"></span>
                                        </td>
                                    </tr>
                               </table>
                            <page-break :deferredIdx="poIdx+10"></page-break>
                            </div>
                            <div v-if="tests[8].set" class="marginTop10">
                                The <span class="fontBold underline">Infant-Toddler Social Emotional Assessment (ITSEA)</span> is a standardized and norm-referenced assessment tool used to measure strengths and
                                weaknesses in social-emotional development.
                                <hr />
                                <table id="tblItsea" class="customTable">
                                    <tr>
                                        <th colspan="2">Areas</th>
                                        <th>T-Score</th>
                                        <th>Standard Deviation</th>
                                    </tr>
                                    <tr>
                                        <td class="alt" colspan="2"><span class="fontBold">Externalizing (describes if a child is overactive, aggressive,or fails to follow rules)</span></td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmItseaNum1"></span>
                                        </td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmItseaSd1"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="alt" colspan="2"><span class="fontBold">Internalizing (describes if a child is showing sadness, lack of energy, a lack of pleasure or fun in activities)</span></td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmItseaNum2"></span>
                                        </td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmItseaSd2"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="alt" colspan="2"><span class="fontBold">Dysregulation (describes a child's emotional responses and how he or she responds to sensory information) </span></td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmItseaNum3"></span>
                                        </td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmItseaSd3"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" class="alt"><span class="fontBold">Competence (describes a child's ability to follow rules, pay attention, his or her play skills, and how he or she gets along with other children)</span></td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmItseaNum4"></span>
                                        </td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmItseaSd4"></span>
                                        </td>
                                    </tr>
                                </table>
                                <page-break :deferredIdx="poIdx+11"></page-break>
                            </div>
                            <div v-if="tests[9].set" class="marginTop10">
                                The <span class="fontBold underline">Khan-Lewis Phonological Analysis-3rd Edition (KLPA-3)</span> is used as a secondary testing tool with the GFTA to look at speech production errors and how
                                frequently they occur compared to that of other children the same age and gender.
                                <hr />
                                <table id="tblKlpa" class="customTable">
                                    <tr>
                                        <th>Standard Score</th>
                                        <th>Standard Deviation</th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmKlpaNum1"></span>
                                        </td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmKlpaSd1"></span>
                                        </td>
                                    </tr>
                                </table>
                                <page-break :deferredIdx="poIdx+12"></page-break>
                            </div>
                            <div v-if="tests[10].set" class="marginTop10">
                                The <span class="fontBold underline">Kaufman Speech Praxis Test for Children (KSPT)</span> is a standardized, norm-referenced test that provides information about a child’s ability to imitate specific mouth movements and sounds, 
                                which is used to assist in the diagnosis and treatment of developmental apraxia of speech.
                                <hr />
                                <table id="tblKspt" class="customTable">
                                    <tr>
                                        <th>Standard Score</th>
                                        <th>Standard Deviation</th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmKsptNum1"></span>
                                        </td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmKsptSd1"></span>
                                        </td>
                                    </tr>
                                </table>
                                <page-break :deferredIdx="poIdx+13"></page-break>
                            </div>
                            <div v-if="tests[11].set" class="marginTop10">
                                <span class="fontBold underline">Mullen Scales of Early Learning (MSEL)</span> is a standardized, norm-referenced evaluation tool that measures the learning abilities and learning style for
                                young children.
                                <hr />
                                <table id="tblSel" class="customTable">
                                    <tr>
                                        <th colspan="2">Developmental Area</th>
                                        <th>T-Score</th>
                                        <th>Standard Deviation</th>
                                    </tr>
                                    <tr>
                                        <td class="alt" colspan="2"><span class="fontBold">Gross Motor</span> (quality and manner in which your child moves; like walking, running, jumping)</td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmSelNum1"></span>
                                        </td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmSelSd1"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="alt" colspan="2"><span class="fontBold">Visual Reception</span> (ability to process information using patterns, memory and sequencing)</td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmSelNum2"></span>
                                        </td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmSelSd2"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="alt" colspan="2"><span class="fontBold">Fine Motor</span> (use of hands and eyes; and how your child processes information from the environment around them)</td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmSelNum3"></span>
                                        </td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmSelSd3"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" class="alt"><span class="fontBold">Receptive Language</span> (what your child understands)</td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmSelNum4"></span>
                                        </td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmSelSd4"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="alt" colspan="2"><span class="fontBold">Expressive Language</span> (what your child says, and how they say it)</td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmSelNum5"></span>
                                        </td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmSelSd5"></span>
                                        </td>
                                    </tr>
                                </table>
                                <page-break :deferredIdx="poIdx+14"></page-break>
                            </div>
                            <div v-if="tests[12].set" class="marginTop10">
                                The <span class="fontBold underline">Modified Checklist for Autism in Toddlers-Revised (M-CHAT-R)</span> is a scientifically validated screening tool designed to assess the risk for autism
                                spectrum disorder. It does not diagnose a child with autism spectrum disorder.
                                <hr />
                                <table id="tblMchat" class="customTable">
                                    <tr>
                                        <th>Score</th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmMchatNum1"></span>
                                        </td>
                                    </tr>
                                </table>
                                <page-break :deferredIdx="poIdx+15"></page-break>
                            </div>
                            <div v-if="tests[13].set" class="marginTop10">
                                The <span class="fontBold underline">Preschool Language Scale-5 (PLS-5)</span> is a standardized, norm referenced screening tool used to identify language disorders or delays in young children.
                                <hr />
                                <table id="tblPls" class="customTable">
                                    <tr>
                                        <th colspan="2">Developmental Area</th>
                                        <th>Standard Score</th>
                                        <th>Standard Deviation</th>
                                    </tr>
                                    <tr>
                                        <td class="alt" colspan="2"><span class="fontBold">Auditory Comprehension</span> (understanding of language)</td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmPlsNum1"></span>
                                        </td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmPlsSd1"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="alt" colspan="2"><span class="fontBold">Expressive Communication</span> (what your child says, and how they say it)</td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmPlsNum2"></span>
                                        </td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmPlsSd2"></span>
                                        </td>
                                    </tr>
                                </table>
                                <page-break :deferredIdx="poIdx+16"></page-break>
                            </div>
                            <div v-if="tests[14].set" class="marginTop10">
                                The <span class="fontBold underline">Peabody Developmental Motor Scales – 2nd Edition (PDMS-2)</span> is a standardized, norm-referenced evaluation tool used to measure a child’s gross and
                                fine motor abilities.
                                <hr />
                                <table id="tblPdms" class="customTable">
                                    <tr>
                                        <th colspan="2">Developmental Area</th>
                                        <th>Standard Score</th>
                                        <th>Standard Deviation</th>
                                    </tr>
                                    <tr>
                                        <td class="alt" colspan="2"><span class="fontBold">Gross Motor</span> (quality and manner in which your child moves; like walking, running, jumping)</td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmPdmsNum1"></span>
                                        </td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmPdmsSd1"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="alt" colspan="2"><span class="fontBold">Fine Motor</span> (use of hands and eyes; and how your child processes information from the environment around them)</td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmPdmsNum2"></span>
                                        </td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmPdmsSd2"></span>
                                        </td>
                                    </tr>
                                </table>
                                <page-break :deferredIdx="poIdx+17"></page-break>
                            </div>
                            <div v-if="tests[15].set" class="marginTop10">
                                <span class="fontBold underline">Sensory Processing Measure – Preschool</span>  is a caregiver questionnaire used to provide information about the child’s response to sensory stimuli
                                (vision, hearing, smelling, touching, tasting, body movements) that occurs throughout the day.
                                <hr />
                                <table id="tblSpm" class="customTable">
                                    <tr>
                                        <th colspan="2">Areas</th>
                                        <th>T-Score</th>
                                        <th>Meaning</th>
                                    </tr>
                                    <tr>
                                        <td class="alt" colspan="2"><span class="fontBold">Social Participation</span></td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmSpmNum1"></span>
                                        </td>
                                        <td>
                                            <span class="optional frmVarDdl" data-frm-var="frmSpmMean1"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="alt" colspan="2"><span class="fontBold">Vision</span></td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmSpmNum2"></span>
                                        </td>
                                        <td>
                                            <span class="optional frmVarDdl" data-frm-var="frmSpmMean2"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="alt" colspan="2"><span class="fontBold">Hearing</span></td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmSpmNum3"></span>
                                        </td>
                                        <td>
                                            <span class="optional frmVarDdl" data-frm-var="frmSpmMean3"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" class="alt"><span class="fontBold">Touch</span></td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmSpmNum4"></span>
                                        </td>
                                        <td>
                                            <span class="optional frmVarDdl" data-frm-var="frmSpmMean4"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="alt" colspan="2"><span class="fontBold">Body Awareness</span></td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmSpmNum5"></span>
                                        </td>
                                        <td>
                                            <span class="optional frmVarDdl" data-frm-var="frmSpmMean5"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" class="alt"><span class="fontBold">Balance and Motion</span></td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmSpmNum6"></span>
                                        </td>
                                        <td>
                                            <span class="optional frmVarDdl" data-frm-var="frmSpmMean6"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="alt" colspan="2"><span class="fontBold">Planning and Ideas</span></td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmSpmNum7"></span>
                                        </td>
                                        <td>
                                            <span class="optional frmVarDdl" data-frm-var="frmSpmMean7"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="alt" colspan="2"><span class="fontBold">Total Sensory Systems</span></td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmSpmNum8"></span>
                                        </td>
                                        <td>
                                            <span class="optional frmVarDdl" data-frm-var="frmSpmMean8"></span>
                                        </td>
                                    </tr>
                                </table>
                                <page-break :deferredIdx="poIdx+18"></page-break>
                            </div>
                            <div v-if="tests[16].set" class="marginTop10">
                                The <span class="fontBold underline">Toddler and Infant Motor Evaluation (T.I.M.E)</span> is a standardized, norm-referenced evaluation tool that measures the strengths and challenges your
                                child has using the small and large muscles in their body.
                                <hr />
                                <table id="tblTime" class="customTable">
                                    <tr>
                                        <th colspan="2">Developmental Area</th>
                                        <th>Raw Score</th>
                                        <th>Standard Deviation</th>
                                    </tr>
                                    <tr>
                                        <td class="alt" colspan="2"><span class="fontBold">Mobility</span> (ability to move from one place to another)</td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmTimeNum1"></span>
                                        </td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmTimeSd1"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="alt" colspan="2"><span class="fontBold">Motor Organization</span> (ability to move from one place to another in an organized way)</td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmTimeNum2"></span>
                                        </td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmTimeSd2"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="alt" colspan="2"><span class="fontBold">Stability</span> (ability to stay in position)</td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmTimeNum3"></span>
                                        </td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmTimeSd3"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" class="alt"><span class="fontBold">Functional Performance</span> (how you do in everyday movement)</td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmTimeNum4"></span>
                                        </td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmTimeSd4"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="alt" colspan="2"><span class="fontBold">Social/Emotional Ability</span> (child’s experience, expression, and management of emotions and the ability to establish positive and rewarding relationships with others )</td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmTimeNum5"></span>
                                        </td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmTimeSd5"></span>
                                        </td>
                                    </tr>
                                </table>
                                <page-break :deferredIdx="poIdx+19"></page-break>
                            </div>
                            <div v-if="tests[17].set" class="marginTop10">
                                The <span class="fontBold underline">Toddler Sensory Profile-2 (TSP-2)</span> is a caregiver questionnaire used to provide information about the child’s response to sensory stimuli
                                (vision, hearing, smelling, touching, tasting, body movements) that occurs throughout the day.
                                <hr />
                                <table id="tblTsp" class="customTable">
                                    <tr>
                                        <th colspan="2">Area</th>
                                        <th>Raw Score</th>
                                        <th>Meaning</th>
                                    </tr>
                                    <tr>
                                        <td class="alt" colspan="2"><span class="fontBold">Seeking/Seeker (how much a child seeks out sensory experiences)</span></td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmTspNum1"></span>
                                        </td>
                                        <td>
                                            <span class="optional frmVarDdl" data-frm-var="frmTspTxt1"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="alt" colspan="2"><span class="fontBold">Avoiding/Avoider (how much a child tends to avoid sensory experiences)</span></td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmTspNum2"></span>
                                        </td>                             
                                        <td>
                                            <span class="optional frmVarDdl" data-frm-var="frmTspTxt2"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="alt" colspan="2"><span class="fontBold">Sensitivity/Sensor (how much a child notices or does not notice sensory information)</span></td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmTspNum3"></span>
                                        </td>                             
                                        <td>
                                            <span class="optional frmVarDdl" data-frm-var="frmTspTxt3"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" class="alt"><span class="fontBold">Registration/Bystander (how aware a child is of sensory information)</span></td>
                                        <td>
                                            <span class="text-center optional frmVarNumTxt" data-frm-var="frmTspNum4"></span>
                                        </td>                             
                                        <td>
                                            <span class="optional frmVarDdl" data-frm-var="frmTspTxt4"></span>
                                        </td>
                                    </tr>
                                </table>
                                <page-break :deferredIdx="poIdx+20"></page-break>
                            </div>
                        </div>
                    </div>
                </div>
                <page-break></page-break>
                <div class="text-center marginTop10 marginBottom10">
                    <button @click="toggleInfoTbl" type="button" :class="['btn', hidingGlossary ? 'btn-warning' : 'btn-info', 'printNo']" data-frm-po="1">
                        <fai :icon="['fas', hidingGlossary ? 'eye' : 'eye-slash']"></fai> {{ hidingGlossary ? 'Show' : 'Hide' }} Glossary of Terms
                    </button>
                </div>
                <div v-if="!hidingGlossary" id="divSection7" class="marginTop25">
                    <div style="width:100%;">
                        <div class="fontBold text-center borderStd fontSize22 padding5">{{ sectionHeaders[6] }}</div>
                    </div>
                    <div class="marginTop10">
                        <p class="hangingIndent">
                            <span class="fontBold underline">Norm-Referenced</span> tests are used to determine eligibility in birth to three. Norm-referenced tests are reliable because they have been given to large
                            groups of children in all different age ranges.   When tests use the term “norm-referenced” they are referring to the fact that when the test was given, most of the children scored in the
                            average range and less children scored above average or below average; the average range is the “norm.”
                        </p>
                        <p class="hangingIndent">
                            <span class="fontBold underline">Standard Deviation</span> is a way to measure how spread out scores are from the average.  A low standard deviation (e.g., 1) means the scores are closer to
                            the average, and a high standard deviation (e.g., 2) means the scores are spread out farther away from the average.  It is important to note that most norm referenced tests follow a standard
                            deviation of 1, because these are the most reliable.
                        </p>
                        <p class="hangingIndent">
                            <span class="fontBold underline">Standard Scores</span> are generated by raw scores (i.e., the number of items right). 
                        </p>
                        <p class="hangingIndent">
                            <span class="fontBold underline">Standardized</span> tests are used to ensure that all children taking the test are given the same experience by completing the same tasks with the same
                            materials, as well as with the same amount of help from the examiners.  This ensures that all children are given the same opportunities to complete the test in the same way.
                        </p>
                        <p class="hangingIndent">
                            <span class="fontBold underline">Subscale Scores</span> are used to help determine percentile ranks, standard scores and age-equivalence.
                        </p>
                        <p class="hangingIndent">
                            <span class="fontBold underline">T-scores</span> compare your child’s score to the average score of children the same age taking the same test.  A T-score of 50 is average, and the standard
                            deviation of these scores is 10.
                        </p>
                    </div>
                </div>
                <page-break :defaultPageBreak="true"></page-break>
                <frm-body v-if="isAssessment" :secNum="5" :hasRoutine="true" :toggle-exclude="toggleExclude" :defaultPageBreakSet="[false,false,true,false,false,true]" :editFrmArea="editFrmArea"></frm-body>
                <eligibility-basis :toggleExclude="toggleExclude" :editFrmArea="editFrmArea"></eligibility-basis>
                <div id="footer" class="marginTop25">
                    {{ concludingText }}
                    <div v-for="(evaluator, index) in currentEvaluators" class="marginTop75">
                        <div class="row">
                            <div class="col-md-6">Electronically signed by {{ evaluator[1] }} {{ evaluator[2] }}</div>
                            <div class="col-md-3 marginLeft45"><span class="frmDtEvalSig"></span></div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 lineBlack"></div>
                            <div class="col-md-3 lineBlack marginLeft45"></div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">{{ evaluator[1] + ' ' + evaluator[2] + ', ' + evaluator[3] }}</div><div class="col-md-3 marginLeft45">Date</div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <div id="formMsg" class="alert alert-fixed" role="alert">
            <span class="alert-msg"></span>
        </div>
        <div id="divModalEditFormVariables" class="modal" tabindex="-1" role="dialog">
            <div id="movingModal" class="modal-dialog modal-lg" role="document">
                <div id="modalContent" class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Review Evaluation Fields</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <h5>{{ edtFrmVarTtl }}</h5>
                        <input id="txtFld" v-if="isTxtFld" class="form-control" type="text" @keyup.enter="commitEdit" v-model="frmVarTxtFldVal" />
                        <input id="txtFldInt" v-if="isTxtFldInt" class="form-control" type="number" min="0" step="1" @keyup.enter="commitEdit" v-model="edtFrmVarInt" />
                        <div id="divEdtWrapper" class="marginTop20" v-if="isEditable">
                            <div v-if="isCareCon">
                                <button @click="fillCareCon" type="button" class="btn btn-info"><fai :icon="['fas', 'fill']"></fai> Fill with No Concerns</button>
                            </div>
                            <div id="divEdt"></div>
                        </div>
                        <div id="divComp" v-if="isComp">
                            <div v-for="(compositeItem, i) in compositeItems" class="marginTop5" style="position:relative;left:25%;">
                                <input v-if="compositeItem.substr(compositeItem.length-1) !== ':'" :id="'cbx' + i" class="custom-control-input cbxComp" type="checkbox" /> 
                                <label v-if="compositeItem.substr(compositeItem.length-1) !== ':'" class="custom-control-label lblComp" :for="'cbx' + i">{{ compositeItem }}</label>
                                <div v-if="compositeItem.substr(compositeItem.length-1) === ':'" class="fontBold">{{ compositeItem }}</div>
                            </div>
                        </div>
                        <div id="divRad" v-if="isRad">
                            <div class="custom-control custom-radio custom-control-inline">
                              <input type="radio" id="edtRadChoice1" name="edtRadChoice" class="custom-control-input">
                              <label class="custom-control-label" for="edtRadChoice1">{{ radChoice1 }}</label>
                            </div>
                            <div class="custom-control custom-radio custom-control-inline">
                              <input type="radio" id="edtRadChoice2" name="edtRadChoice" class="custom-control-input">
                              <label class="custom-control-label" for="edtRadChoice2">{{ radChoice2 }}</label>
                            </div>
                        </div>
                        <select id="selDdlItems" v-if="isDdl" v-model="selEditOption" class="form-control">
                            <!--<option class="placeholderEditDdl" value="" disabled hidden selected></option>-->
                            <option v-for="(item, idx) in ddlItems" :value="idx">
                                {{ item }}
                            </option>
                        </select>
                        <select id="selMultiList" v-if="isList" class="chosen-select" multiple>
                            <option v-for="listItem in evaluators" :value="listItem.userId" :selected="listItem.selected">{{ listItem.firstname }} {{ listItem.lastname }}, {{ listItem.title }}</option>
                        </select>
                        <div id="divDate" v-if="isDate" class="calDt">
                            <input id="calInput" type="text" class="form-control" style="width:90% !important;float:left;" data-input />
                            <a class="input-button displayInlineBlock cursorPointer" title="toggle" data-toggle style="margin-top:7px;margin-left:7px !important;">
                                <fai :icon="['fas', 'calendar-alt']" class="icon-calendar" style="font-size:22px;"></fai>
                            </a>
                        </div>
                    </div>
                    <div class="container marginTop10">
                        <div class="text-center">
                            <button type="button" @click="nav(0)" class="btn btn-info marginLeft5 marginRight5" :disabled="canFirst !== true">
                                <fai :icon="['fas', 'fast-backward']"></fai> First
                            </button>
                            <button type="button" @click="nav(1)" class="btn btn-info marginLeft5 marginRight5" :disabled="canPrev !== true">
                                <fai :icon="['fas', 'step-backward']"></fai> Previous
                            </button>
                            <button type="button" @click="commitEdit" class="btn btn-info marginLeft5 marginRight5">
                                <fai :icon="['fas', 'arrow-down']"></fai> {{ commitNext ? 'Commit and Next' : 'Commit' }} 
                            </button>
                            <button type="button" @click="nav(2)" class="btn btn-info marginLeft5 marginRight5" :disabled="canNext !== true">
                                <fai :icon="['fas', 'step-forward']"></fai> Next
                            </button>
                            <button type="button" @click="nav(3)" class="btn btn-info marginLeft5 marginRight5" :disabled="canLast !== true">
                                <fai :icon="['fas', 'fast-forward']"></fai> Last
                            </button>
                        </div>
                        <div class="text-center marginTop25">
                            <input id="txtField" style="vertical-align:middle;" placeholder="Enter Field Name to Edit" />
                            <button type="button" @click="findFrmVar" style="vertical-align:middle;" class="btn btn-info marginLeft5"><fai :icon="['fas', 'search']"></fai> Find</button>
                        </div>
                        <div class="text-center marginTop5">
                            <input id="cbxNavOpt" @click="toggleOptional" class="custom-control-input" type="checkbox" /> 
                            <label class="custom-control-label" for="cbxNavOpt">Include optional fields</label>
                        </div>
                        <div class="text-center marginTop5">
                            <input id="cbxNavCompleted" @click="toggleEdited" class="custom-control-input" type="checkbox" /> 
                            <label class="custom-control-label" for="cbxNavCompleted">Include edited fields</label>
                        </div>
                        <div class="text-center marginTop5 marginBottom25">
                            <input id="cbxCommitNext" @click="commitNext = !commitNext" class="custom-control-input" type="checkbox" checked /> 
                            <label class="custom-control-label" for="cbxCommitNext">Commit moves to next field</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapMutations, mapActions, mapState } from 'vuex'
    import { setTimeout } from 'core-js'
    import pageBreak from './pageBreak.vue'
    import frmBody from './frmBody.vue'
    import eligibilityBasis from './eligibilityBasis.vue'
    import moment from 'moment'
    import chosen from 'chosen-js'

    export default {
        components: {
            pageBreak, frmBody, eligibilityBasis
        },
        computed: {
            ...mapState(['alertingOffice', 'compositeOptions', 'compositeOptionsChecked', 'concludingText', 'curForm', 'currentEvaluators', 'eligibilityBasis', 'evaluationTypes',
                'evaluators', 'finalFormUpdated', 'formAreas', 'formLoaded', 'formSelOptionsUpdated', 'forms', 'formVariables', 'hasSaved', 'inapplicableTests', 'nextSteps', 'nutritionScreening',
                'poIdx', 'routineHeaders', 'sectionHeaders', 'significantBirthHistory', 'sMean', 'spTest', 'tests', 'visionHearing', 'visionScreening']),
            findCompositeOptions(types, num) {
                var subTypes = types.split('.');
                var stLen = subTypes.length;
                var tLen = this.compositeOptions.length;
                var result = '';

                for (var st = 0; st < stLen; ++st) {
                    for (var t = 0; t < tLen; ++t) {
                        if (this.compositeOptions[t].name.substr(0, 10) === subTypes[st]) {  // Matched to base name level
                            result = this.compositeOptions[t].section + ' ' + this.compositeOptions[t].subSection + ' Composite ' + num;
                            
                            if (subTypes[st].substr(10) !== 3) {  // No issue
                                this.compositeItems[parseInt(this.compositeOptions[t].name.substr(subTypes[st].length))] =
                                    { description: this.compositeOptions[t].description, value: this.compositeOptions[t].value }
                            }
                        }
                    }
                }
            }
        },
        data() {
            return {
                cobj : { 'cobjkey': 'cobjval'},
                canAddFam: true,
                canFirst: true,
                canLast: true,
                canNext: true,
                canPrev: true,
                canRemFam: false,
                clickedToEdit: false,
                commit: false,
                commitNext: true,
                compListCnt: 0,
                compositeItems: [],
                compositeOptionsIdx: -1,
                curRef: { 'frmCaseNo' : 'first' },
                ddlItems: [],
                divFarEvalProcVars: [],
                editor: '',
                edtDoc: false,
                edtFrmVarInt: 0,
                edtFrmVarTtl: '',
                editedElement: '',
                editedElementIdx: -1,
                evalCommentIdx: -1,
                evaluationSignatureLines: [],
                firedToggle: 0,
                frmCalcs: [
                    ['frmAgeEval', '[Age at Evaluation]'],
                    ['frmChildAlias', '[Child\'s Nickname or Name]'],
                    ['frmHeShe', '[he/she]'],
                    ['frmHisHer', '[his/her]'],
                    ['frmHimHer', '[him/her]'],
                    ['frmHimselfHerself', '[himself/herself]'],
                    ['frmHeSheCap', '[He/She]'],
                    ['frmHisHerCap', '[His/Her]']
                ],
                hasEditedAll: false,
                hidingGlossary: false,
                hidingScoringKey: false,
                idleTime: 0,
                inclEdited: false,
                inclOptional: false,
                isAnnual: false,
                isAssessment: false,
                isCareCon: false,
                isCommitting: false,
                isComp: false,
                isCompleteForm: false,
                isDate: false,
                isDdl: false,
                isEditable: false,
                isEvalComment: false,
                isList: false,
                isNav: false,
                isRad: false,
                isStandard: true,
                isTxtFld: false,
                isTxtFldInt: false,
                multipleSuppress: false,
                radChoice1: '',
                radChoice2: '',
                selEditOption: '',
                showFam2: false,
                showFam3: false,
                skip: 0,
                status: false,
                suppress: false,
                tempId: -1,
                updatedElement: ''
            }
        },
        methods: {
            ...mapActions(['getEvaluators', 'getEvaluationTypes', 'upsertForm']),
            printReport() {
                var shouldPrint = $('.printNo').is(':visible');

                if (shouldPrint) {
                    console.log('activating printing');
                    if ($('#divChildNickname').text().substr(0, 1) === '[' || $('#divChildNickname').text().substr(0, 1) === '') {
                        $('#divLblChildNickname').addClass('printNo');
                        $('#divChildNickname').addClass('printNo');
                    } else {
                        $('#divLblChildNickname').removeClass('printNo');
                        $('#divChildNickname').removeClass('printNo');
                    }

                    $('.exclude').addClass('printNo');
                    $('.include').removeClass('printNo');
                    $('.printNo').hide();
                } else {
                    if (!this.curForm.status) {
                        $('.printNo').show();
                        $('.exclude').removeClass('printNo');
                    }

                    console.log('deactivating printing');

                    if ($('#divChildNickname').text().substr(0, 1) === '[' || $('#divChildNickname').text().substr(0, 1) === '') {
                        $('#divLblChildNickname').removeClass('printNo');
                        $('#divChildNickname').removeClass('printNo');
                    }
                }

                if (shouldPrint) {
                    window.print();
                    if (!this.curForm.status) this.upsertForm({ type: 7, newVal: new Date(), tempId: this.tempId });
                    if(this.curForm.status) $('.navbar').show();
                    this.printReport();
                }
            },
            addFam() {
                this.canRemFam = true;

                if (this.showFam2) {
                    this.showFam3 = true;
                    this.canAddFam = false;
                } else {
                    this.showFam2 = true;
                }
            },
            alertOffice() {
                var payload = { FormId: this.curForm.tempId, Childname: $('[data-frm-var="frmChildFirstname"]').text() + ' ' + $('[data-frm-var="frmChildLastname"]').text() }
                this.$store.dispatch('alertOffice', payload);
            },
            calcAgeEval() {
                var dob = $('.frmVarDt[data-frm-var="frmDob"]').text();
                var evalDt = $('.frmVarDt[data-frm-var="frmDtEval"]').text();

                if (dob.substr(0, 1) !== '[' && evalDt.substr(0, 1) !== '[') {
                    var dYr = moment(evalDt).diff(dob, 'years');
                    var dMo = moment(evalDt).subtract(dYr, 'years').diff(dob, 'months');
                    var dDay = moment(evalDt).subtract(dYr, 'years').subtract(dMo, 'months').diff(dob, 'days');
                    $('.frmVarCalc[data-frm-calc="frmAgeEval"]').text(dYr === 0 && dMo === 0 ? dDay + ' days' : (dYr * 12 + dMo) + ' months and ' + (dDay) + ' days')
                        .removeClass('mandatory').addClass('editedMandatory');                    
                }
            },
            centerPrintForm(action, data) {
                /*if (action === 'showBounds') {
                    if (!$('#boundBox').length) {
                        var boundBox =
                            '<div id="boundBox" class="printBounds" style="border: 5px solid black;position:absolute;top:0;width:' +
                                data.Width +
                                'px;height:' +
                                data.Height +
                                'px;"></div>';
                        $('body').append(boundBox);
                        var boundSettings =
                            '<div class="printBounds" style="position:absolute;top:15px;left:15px;"><span class="printBounds">Width:</span>' +
                                '<input id="printWidth" class="printBounds" type="text" value="' +
                                data.Width +
                                '"  /><br />' +
                                '<span class="printBounds">Height:</span><input id="printHeight" class="printBounds" type="text" value="' +
                                data.Height +
                                '" /><br />' +
                                '<input type="button" class="printBounds" value="Update Print Boundaries" /><br />' +
                                '<input id="printGlobal" class="printBounds" type="checkbox" />New Boundaries apply ONLY to this form</div>';
                        $('body').append(boundSettings);
                        $('body').scrollTop($('#boundBox').offset().top);
                    }
                }

                return this;*/
            },
            checkIdleTime() {
                this.idleTime += 2;
                if (this.idleTime > 9) window.location.href = '/Admin/Index';
            },
            clearEditFields(evt) {
                for (var l = 0; l < this.compListCnt; ++l) {
                    this.compositeItems.splice(0, 1);
                }

                this.isComp = false;
                this.compositeItems = [];
                this.isDate = false;
                this.isDdl = false;
                this.isEditable = false;
                this.isEvalComment = false;
                this.isList = false;
                $('#selMultiList_chosen').remove();
                this.isRad = false;
                this.isTxtFld = false;
                this.isTxtFldInt = false;
            },
            commitEdit() {
                if (!this.status) {
                    var newVal = '';
                    this.editedElement.removeClass('colorBlue');

                    if (this.isDdl) {
                        if (this.editedElement.data('frmVar') === undefined) this.editedElement.text($("#selDdlItems option:selected").text());
                        if (this.editedElement.data('frmVar') === 'frmEligBasis') {
                            $('.divEligBasis').hide();
                            $('.divEligBasis').eq(parseInt($("#selDdlItems option:selected").val())).show();
                        } else if (this.editedElement.data('frmVar') === 'frmEvalType') {
                            var trimmedEvalType = $("#selDdlItems option:selected").text().replace(/\s/g, '');
                            this.setEvalType(trimmedEvalType);
                            var self = this;
                            setTimeout(function () { self.updateFrmVars(true); }, 100);
                        }

                        newVal = $("#selDdlItems option:selected").text();

                        if ((this.editedElement.data('frmVar') === 'frmNutScreening' || this.editedElement.data('frmVar') === 'frmVisScreening') &&
                            parseInt($('#selDdlItems option:selected').val()) === 1) {
                            if (this.editedElement.data('frmVar') === 'frmNutScreening') {
                                setTimeout(function () { $('[data-frm-var="frmNutScreenConcerns"]').click(); }, 100);
                            }
                            if (this.editedElement.data('frmVar') === 'frmVisScreening') {
                                setTimeout(function () { $('[data-frm-var="frmVisScreenConcerns"]').click(); }, 100);
                            }
                        }

                        this.isCommitting = true;
                    } else if (this.isEditable) {
                        if (this.isEvalComment) {
                            var frmSelOptionsList = this.curForm.frmSelOptions.split('|');
                            var affectedIdx = this.evalCommentIdx;
                            var internalEditor = this.editor;

                            $.each(frmSelOptionsList, function (i, val) {
                                if (!isNaN(val) && parseInt(val) === affectedIdx) {
                                    frmSelOptionsList.splice(i + 1, frmSelOptionsList[i + 1] !== undefined && isNaN(frmSelOptionsList[i + 1]) ? 1 : 0, internalEditor.summernote('code'));
                                }
                            });

                            this.$store.commit('updateFrmSelOptions', frmSelOptionsList.join('|'));
                        } else {
                            newVal = this.editor.summernote('code');
                            this.isCommitting = true;
                        }
                    } else if (this.isList) {
                        var cEval = this.currentEvaluators.length;

                        for (var e = 0; e < cEval; ++e) {
                            this.currentEvaluators.pop();
                        }

                        var internal = this.currentEvaluators;
                        var baseList = this.evaluators;

                        $('#selMultiList option:selected').each(function () {
                            var lineBase = $(this).text().split(',');
                            var lineFirstLast = lineBase[0].split(' ');
                            var lineVal = $(this).val();
                            newVal += '<span id="ev' + lineVal + '">' + lineFirstLast[0] + ' ' + lineFirstLast[1] + ', ' + lineBase[1].substr(1) + '</span><br>';
                            internal.push([lineVal, lineFirstLast[0], lineFirstLast[1], lineBase[1].substr(1)]);
                            $.each(baseList, function (idx, val) {
                                if (val.userId == lineVal) {
                                    val.selected = true;
                                }
                            })
                        });

                        if (internal.length > 0) {
                            this.updateEvalSigs();
                        }

                        $('#selMultiList').chosen('destroy');
                        this.isCommitting = true;
                    } else if (this.isRad) {
                        if ($('#edtRadChoice1').prop('checked') === true) {
                            this.setGender(0);
                            newVal = 'Male';
                        } else {
                            this.setGender(1);
                            newVal = 'Female';
                        }

                        this.isCommitting = true;
                    } else if (this.isTxtFld || this.isTxtFldInt || this.isDate) {
                        if (this.isTxtFld) {
                            newVal = this.frmVarTxtFldVal;
                        } else if (this.isDate) {
                            newVal = moment($('#calInput').val()).format('MM/DD/YY')
                        } else if (this.isTxtFldInt) {
                            if (this.editedElement.data('frmVar') == 'frmPregTerm' && this.edtFrmVarInt !== 0) {
                                newVal = this.edtFrmVarInt + ' weeks';
                            } else if (this.editedElement.data('frmVar') == 'frmBirthLbs') {
                                if (this.edtFrmVarInt === 0) {
                                    newVal = 'Unknown';
                                } else {
                                    newVal = this.edtFrmVarInt + ' lbs,';
                                }
                            } else if (this.editedElement.data('frmVar') == 'frmBirthOz') {
                                if ($('[data-frm-var="frmBirthLbs"]').text().substr(0, 1) !== '[' && $('[data-frm-var="frmBirthLbs"]').text().substr(0, 1) !== 'U') {
                                    newVal = this.edtFrmVarInt + ' oz';
                                } else if ($('[data-frm-var="frmBirthLbs"]').text().substr(0, 1) === 'U') {
                                    newVal = '';
                                }
                            } else {
                                newVal = this.edtFrmVarInt;
                            }
                        }

                        this.isCommitting = true;
                    } else if (this.isComp) {
                        var cLen = $('.cbxComp').length;
                        console.log('cbxComp ' + cLen);
                        console.log($('.cbxComp'));
                        var lbl = [];
                        var lblStr = '';

                        for (var x = 0; x < cLen; ++x) {
                            if ($('.cbxComp').eq(x).prop('checked')) {
                                lbl.push($('.lblComp').eq(x).text());
                                console.log(lbl);
                            }
                        }

                        var lblCnt = lbl.length;

                        for (var y = 0; y < lblCnt; ++y) {
                            if (lblCnt > 2 && y > 0 && y != lblCnt - 1) {
                                lblStr += ', ';
                            } else if (lblCnt > 1 && y == lblCnt - 1) {
                                lblStr += ' and ';
                            }

                            lblStr += lbl[y];
                        }

                        if (lblStr === '') lblStr = '***';

                        $('.frmVarComposite').eq(this.compositeOptionsIdx).removeClass('mandatory').addClass('editedMandatory').text(lblStr);
                        var formArea = $('.frmVarComposite').eq(this.compositeOptionsIdx).parent();
                        var payload = { name: formArea.data('frmArea'), value: formArea.html() };
                        this.$store.commit('updateFormAreas', payload);
                        this.isComp = false;
                    }

                    if (this.editedElement.data('frmVar') !== undefined) {
                        var key = this.editedElement.data('frmVar');
                        var len = this.formVariables.length;

                        for (var fv = 0; fv < len; ++fv) {
                            if (this.formVariables[fv][0] === key) {
                                console.log(fv);
                                this.editedElementIdx = fv;
                                this.formVariables[fv].splice(0, 2, key, newVal);
                            }
                        }

                        this.updatedElement = this.editedElement;
                    } else if (this.editedElement.data('frmArea') !== undefined) {
                        this.isCommitting = true;
                        var key = this.editedElement.data('frmArea');
                        var len = this.formAreas.length;

                        for (var fa = 0; fa < len; ++fa) {
                            if (this.formAreas[fa].name === key) {
                                console.log(fa);
                                this.editedElementIdx = fa;
                                this.formAreas[fa].value = newVal;
                                break;
                            }
                        }
                    }

                    if (this.editedElement.hasClass('mandatory')) {
                        this.editedElement.removeClass('mandatory');
                        this.editedElement.addClass('editedMandatory');
                    }

                    if (this.editedElement.hasClass('optional')) {
                        this.editedElement.removeClass('optional');
                        this.editedElement.addClass('editedOptional');
                    }

                    if (this.commitNext) {
                        this.nav(2);
                    }
                } else {
                    $('#frmForm').html(this.editor.summernote('code'));
                    this.hasEditedAll = true;
                }
            },
            editAll() {
                this.edtFrmVarTtl = 'Edit Entire Document';
                this.isEditable = true;
                this.edtDoc = true;
                this.editedElement = $('#frmForm');
                this.nav(-1);

                setTimeout(() => {
                    var contents = $('#frmForm').html();
                    this.editor = $('#divEdt');
                    this.editor.summernote('code', contents);
                }, 1);

                this.openModal();
            },
            editFormVariable(evt) {
                console.log('evt');
                console.log(evt);
                var elem = evt.currentTarget !== undefined ? (!$(evt.currentTarget).hasClass('frmAreaEdit') ? $(evt.currentTarget) : $(evt.currentTarget).prev('div')) : evt;
                if (this.clickedToEdit) {
                    this.clickedToEdit = false;
                    if (this.editedElement !== '') {
                        console.log('clearing');
                        this.editedElement.removeClass('colorBlue');
                        this.clearEditFields();
                    }
                };
                this.editedElement = elem;
                this.nav(-1);
                this.setWindow();

                if (elem.is('div') && !$(evt.currentTarget).hasClass('frmAreaEdit')) {
                    this.edtFrmVarTtl = elem.prev().text();
                } else if (elem.is('span') || $(evt.currentTarget).hasClass('frmAreaEdit')) {
                    if (elem.parent().is('h1')) {
                        this.edtFrmVarTtl = 'Evaluation or Assessment';
                    } else if (elem.hasClass('frmVarNumTxt') || (elem.hasClass('frmVarTxt') && elem.parent().is('td'))) {
                        if (elem.parent().is('td')) {
                            var cell = elem.closest('td');
                            var colIdx = cell[0].cellIndex;
                            this.edtFrmVarTtl = elem.parent().closest('table').find('th').eq(colIdx).text();
                        } else if (elem.data('frmVar') === 'frmEvalHours' || elem.data('frmVar') === 'frmEvalVisits') {
                            this.edtFrmVarTtl = 'Evaluation Time:';
                        } else {
                            this.edtFrmVarTtl = elem.prev('div').html();
                        }
                    } else if(elem.hasClass('frmArea')) {
                        var ttlAdd = '';

                        if (elem.hasClass('divFarEvalProc')) {
                            var thisIdx = elem.index('.divFarEvalProc span');

                            if (elem.text().substr(0, 1) === '[') {
                                this.divFarEvalProcVars[thisIdx] = elem.text().substr(1, elem.text().length - 2);
                            } else {
                                ttlAdd = this.divFarEvalProcVars[thisIdx];
                            }
                        }

                        this.edtFrmVarTtl = 'Narrative Section Field: ' + (elem.text().substr(0, 1) === '[' ? elem.text().substr(1, elem.text().length - 2) : ttlAdd);
                    } else if (elem.data('frmEvalComment') === 'frmEvalComment') {
                        this.edtFrmVarTtl = 'Evaluator\'s Comment';
                    } else if (elem.data('frmVar') === 'frmBirthLbs') {
                        this.edtFrmVarTtl = 'Birth Weight in Lbs';
                    } else if (elem.data('frmVar') === 'frmBirthOz') {
                        this.edtFrmVarTtl = 'Birth Weight in Oz';
                    } else if (elem.data('frmVar') === 'frmEligBasis') {
                        this.edtFrmVarTtl = 'Eligibility Basis';
                    } else if (elem.parent().hasClass('frmArea')) {
                        this.edtFrmVarTtl = "Narrative Variable";
                    } 
                }

                if (elem.hasClass('frmVarTxt')) {
                    this.isTxtFld = true;
                    var key = elem.data('frmVar');
                    var len = this.formVariables.length;
                    for (var fv = 0; fv < len; ++fv) {
                        if (this.formVariables[fv][0] === key) {
                            this.frmVarTxtFldVal = this.formVariables[fv][1];
                            setTimeout(function () { $('#txtFld').select(); }, 1);
                            break;
                        }
                    }
                } else if (elem.hasClass('frmVarDdl')) {
                    this.isDdl = true;
                    this.ddlItems = [];
                    var ddlSet = [];
                    var ddlType = elem.data('frmVar').substr(3, 3);

                    switch (ddlType) {
                        case 'Eva':
                            ddlSet = this.evaluationTypes;
                            break;
                        case 'Vis':
                            if (elem.data('frmVar').substr(6, 3) !== 'Scr') {
                                ddlSet = this.visionHearing;
                            } else {
                                ddlSet = this.visionScreening;
                            }
                            break;
                        case 'Nut':
                            ddlSet = this.nutritionScreening;
                            break;
                        case 'Hea':
                            console.log('got here')
                            ddlSet = this.visionHearing;
                            break;
                        case 'Isp':
                        case 'Tsp':
                            ddlSet = this.spTest;
                            break;
                        case 'Spm':
                            ddlSet = this.sMean;
                            break;
                        case 'Eli':
                            ddlSet = this.eligibilityBasis;
                            break;
                        case 'Why':
                            ddlSet = this.inapplicableTests;
                            break;
                        case 'Sig':
                            ddlSet = this.significantBirthHistory;
                            break;
                    }

                    var curSel = this.curForm[elem.data('frmVar')];
                    var ddlLen = ddlSet.length;

                    for (var d = 0; d < ddlLen; ++d) {
                        if (ddlType === 'Eva') {
                            this.ddlItems.push(ddlSet[d].type);
                        } else {
                            this.ddlItems.push(ddlSet[d]);
                        }
                    }

                    setTimeout(() => {
                        var selItem = curSel.substr(0,1) !== '[' ? $.trim(curSel) : $.trim(this.ddlItems[0]);
                        $('#selDdlItems option').filter(function () {
                            return $.trim($(this).text()) === $.trim(selItem)
                        }).prop('selected', true);
                    }, 1);
                } else if (elem.hasClass('frmVarDt')) {
                    this.isDate = true;

                    $('#calInput').val(elem.text() instanceof Date && !isNaN(elem.text()) ? elem.text() : new Date());
                    setTimeout(function () {
                        flatpickr('.calDt', { wrap: true, allowInput: true });
                    }, 1);
                } else if (elem.hasClass('frmVarNumTxt')) {
                    this.isTxtFldInt = true;
                    var numStr = '';

                    if (elem.data('frmVar') === 'frmPregTerm') {
                        numStr = elem.text().substr(0, elem.text().length - 6);
                    } else if (elem.data('frmVar') === 'frmBirthLbs') {
                        numStr = elem.text().substr(0, elem.text().length - 5);
                    } else if (elem.data('frmVar') === 'frmBirthOz') {
                        numStr = elem.text().substr(0, elem.text().length - 3);
                    }

                    this.edtFrmVarInt = !isNaN(numStr) ? parseInt(numStr) : 0;
                    setTimeout(function () { $('#txtFldInt').select(); }, 1);
                } else if (elem.hasClass('frmVarRad')) {
                    this.isRad = true;

                    if (elem.data('frmVar') === 'frmGender') {
                        this.radChoice1 = 'Male';
                        this.radChoice2 = 'Female';
                        $('#edtRadChoice1').prop('checked', this.curForm.frmGender === 'Male');
                        $('#edtRadChoice2').prop('checked', this.curForm.frmGender === 'Female');
                    }
                } else if (elem.hasClass('frmVarList')) {
                    this.isList = true;
                    this.getEvaluators();
                    setTimeout(function() { $('#selMultiList').chosen(); }, 1000);
                } else if (elem.hasClass('frmVarEdt') || elem.hasClass('frmArea')) {
                    this.isEditable = true;

                    setTimeout(() => {
                        var contents;

                        if (elem.data('frmEvalComment') === 'frmEvalComment' && elem.text().length === 0) {
                            contents = 'Optional Text';
                        } else if (elem.hasClass('frmVarEdt') && (elem.data('frmVar') === 'frmBirthPastHist' || elem.data('frmVar') === 'frmCurrHealth' ||
                            elem.data('frmVar') === 'frmRelFamHist' || elem.data('frmVar') === 'frmCurrCond') && elem.text().substr(0,1) === '[') {
                            contents = 'No significant concerns';
                        } else {
                            contents = this.editedElement.html();
                        }

                        if (elem.data('frmVar') !== undefined && elem.data('frmVar').substr(3, 7) === 'CareCon') this.isCareCon = true;
                        this.editor = $('#divEdt');
                        this.editor.summernote('code', contents);

                        if (elem.data('frmEvalComment') === 'frmEvalComment') {
                            var idx = 0;
                            this.isEvalComment = true;
                            $(document).find('[data-frm-eval-comment="frmEvalComment"]').each(function () {
                                if ($(this)[0] === elem[0]) {
                                    this.evalCommentIdx = idx;
                                }
                                ++idx;
                            })
                        }
                    }, 1);
                } else if (elem.hasClass('frmVarComposite')) {
                    this.isComp = true;
                    var opts = this.editedElement.data('frmComp').split('.');
                    var tLen = opts.length;
                    var oLen = this.compositeOptions.length;
                    this.compositeOptionsIdx = this.editedElement.index('.frmVarComposite');
                    this.compListCnt = 0;
                    var isEdited = this.editedElement.hasClass('editedMandatory');

                    for (var c = 0; c < tLen; ++c) {
                        var setComp = 0;

                        for (var o = 0; o < oLen; ++o) {
                            if (this.compositeOptions[o].name.substr(0, opts[c].length) === opts[c]) {  // Load in this set
                                if (setComp === 0) {
                                    this.compositeItems.push(this.compositeOptions[o].description + 's:');
                                    this.edtFrmVarTtl = this.compositeOptions[o].section + ' ' + this.compositeOptions[o].subSection;
                                }

                                this.compositeItems.push(this.compositeOptions[o].value);
                                ++this.compListCnt;
                                ++setComp;
                            }
                        }
                    }

                    if (!isEdited) {
                        for (var c1 = 0; c1 < this.compListCnt; ++c1) {
                            $('#cbx' + c1).prop('checked', false);
                        }
                    } else {
                        setTimeout(() => {
                            for (var s = 0; s < this.compListCnt; ++s) {
                                console.log('checked already ');
                                console.log(this.compositeItems)
                                $('#cbx' + s).prop('checked', this.editedElement.html().indexOf(this.compositeItems[s]) > -1);
                            }
                        }, 1);
                    }
                }

                this.openModal();
                this.editedElement.addClass('colorBlue');
            },
            editFrmArea(evt) {
                this.editFormVariable(evt);
            },
            emailReport(evt) {
                var payload = { Targets: $(evt.currentTarget).prev().val() };
                this.$store.dispatch('emailReport', payload);
            },
            fillCareCon() {
                var epp = $('[data-frm-var="frmEvalProcParticipant"]').eq(0).text();
                //var ca = $('[data-frm-var="frmChildAlias"]').eq(0).text();
                this.editedElement.html('At this time, ' + epp + ' does not have any concerns or priorities related to this routine.');
                this.editor.summernote('code', this.editedElement.html());
                //this.editor.summernote('insertText', this.editedElement.html());
            },
            findFrmVar(evt) {
                console.log('findFrmVar');
                console.log($(evt.currentTarget).prev());
                console.log($(evt.currentTarget).prev().val());
                $(document).find('[data-frm-var*="frm' + $(evt.currentTarget).prev().val() + '"]').each(function () {
                    $(this).click();
                });
            },
            nav(step) {
                var hasOne = false;
                var hasTwo = false;
                var idxElem;
                var idxElemType = -1;
                var targetElem;

                if (step !== -1) {
                    this.clearEditFields();
                    this.isNav = true;
                } else {
                    this.isNav = false;
                }

                var totCnt = $("[class*='frmVar']").length;
                idxElem = this.editedElement.index("[class*='frmVar']");

                if (!this.inclOptional && !this.inclEdited) {  // Only mandatory incomplete
                    if (this.editedElement.index('.mandatory') > -1) {
                        idxElemType = this.editedElement.index('.mandatory');
                    }
                } else if (!this.inclOptional && this.inclEdited) {
                    if (this.editedElement.index('.mandatory') > -1) {
                        idxElemType = this.editedElement.index('.mandatory');
                    } else if (this.editedElement.index('.editedMandatory') > -1) {
                        idxElemType = this.editedElement.index('.editedMandatory');
                    }
                } else if (this.inclOptional && !this.inclEdited) {
                    if (this.editedElement.index('.mandatory') > -1) {
                        idxElemType = this.editedElement.index('.mandatory');
                    } else if (this.editedElement.index('.optional') > -1) {
                        idxElemType = this.editedElement.index('.optional');
                    }
                }

                switch (step) {
                    case -1:  // Calculated for both clicked and other navigation
                        var firstHit = false;
                        var prevHit = false;
                        var nextHit = false;
                        var lastHit = false;
                        for (var f = 0; f < totCnt; ++f) {
                            let item = $("[class*='frmVar']").eq(f);

                            if (!this.inclOptional && !this.inclEdited && item.hasClass('mandatory')) {
                                if (f < idxElem) {
                                    firstHit = true;
                                    prevHit = true;
                                } else if (f > idxElem) {
                                    nextHit = true;
                                    lastHit = true;
                                }
                            } else if (!this.inclOptional && this.inclEdited && (item.hasClass('mandatory') || item.hasClass('editedMandatory'))) {
                                if (f < idxElem) {
                                    firstHit = true;
                                    prevHit = true;
                                } else if (f > idxElem) {
                                    nextHit = true;
                                    lastHit = true;
                                }
                            } else if (this.inclOptional && !this.inclEdited && (item.hasClass('mandatory') || item.hasClass('optional'))) {
                                if (f < idxElem) {
                                    firstHit = true;
                                    prevHit = true;
                                } else if (f > idxElem) {
                                    nextHit = true;
                                    lastHit = true;
                                }
                            } else if (this.inclOptional && this.inclEdited) {
                                if (f < idxElem) {
                                    firstHit = true;
                                    prevHit = true;
                                } else if (f > idxElem) {
                                    nextHit = true;
                                    lastHit = true;
                                }
                            }
                        }

                        this.canFirst = firstHit;
                        this.canPrev = prevHit;
                        this.canNext = nextHit;
                        this.canLast = lastHit;
                        break;
                    case 0:  // First
                        for (var f = 0; f < totCnt; ++f) {
                            let item = $("[class*='frmVar']").eq(f);
                            console.log('nav item');
                            console.log(item);

                            if (!this.inclOptional && !this.inclEdited) {
                                if (item.hasClass('mandatory')) {
                                    targetElem = item;
                                    break;
                                }
                            } else if (!this.inclOptional && this.inclEdited) {
                                if (item.hasClass('mandatory') || item.hasClass('editedMandatory')) {
                                    targetElem = item;
                                    break;
                                }
                            } else if (this.inclOptional && !this.inclEdited) {
                                if (item.hasClass('mandatory') || item.hasClass('optional')) {
                                    targetElem = item;
                                    break;
                                }
                            } else if (this.inclOptional && this.inclEdited) {
                                targetElem = $("[class*='frmVar']").eq(0);
                            }
                        }
                        break;
                    case 1:
                        for (var f = idxElem - 1; f >= 0; --f) {
                            let item = $("[class*='frmVar']").eq(f);
                            console.log('nav item');
                            console.log(item);

                            if (!this.inclOptional && !this.inclEdited) {
                                if (item.hasClass('mandatory')) {                                   
                                    targetElem = item;
                                    break;
                                }
                            } else if (!this.inclOptional && this.inclEdited) {
                                if (item.hasClass('mandatory') || item.hasClass('editedMandatory')) {
                                    targetElem = item;
                                    break;
                                }
                            } else if (this.inclOptional && !this.inclEdited) {
                                if (item.hasClass('mandatory') || item.hasClass('optional')) {
                                    targetElem = item;
                                    break;
                                }
                            } else if (this.inclOptional && this.inclEdited) {
                                if (idxElem == 0) {
                                    targetElem = this.editedElement;
                                } else {
                                    targetElem = $("[class*='frmVar']").eq(idxElem - 1);
                                    break;
                                }
                            }
                        }
                        break;
                    case 2:
                        for (var f = idxElem + 1; f < totCnt; ++f) {
                            let item = $("[class*='frmVar']").eq(f);
                            console.log('nav item');
                            console.log(item);

                            if (!this.inclOptional && !this.inclEdited) {
                                if (item.hasClass('mandatory')) {                                   
                                    targetElem = item;
                                    break;
                                }
                            } else if (!this.inclOptional && this.inclEdited) {
                                if (item.hasClass('mandatory') || item.hasClass('editedMandatory')) {
                                    targetElem = item;
                                    break;
                                }
                            } else if (this.inclOptional && !this.inclEdited) {
                                if (item.hasClass('mandatory') || item.hasClass('optional')) {
                                    targetElem = item;
                                    break;
                                }
                            } else if (this.inclOptional && this.inclEdited) {
                                if (idxElem == totCnt - 1) {
                                    targetElem = this.editedElement;
                                } else {
                                    targetElem = $("[class*='frmVar']").eq(idxElem + 1);
                                    break;
                                }
                            }
                        }
                        break;
                    case 3:
                        for (var f = totCnt - 1; f >= 0; --f) {
                            let item = $("[class*='frmVar']").eq(f);
                            console.log('nav item');
                            console.log(item);

                            if (!this.inclOptional && !this.inclEdited) {
                                if (item.hasClass('mandatory')) {
                                    targetElem = item;
                                    break;
                                }
                            } else if (!this.inclOptional && this.inclEdited) {
                                if (item.hasClass('mandatory') || item.hasClass('editedMandatory')) {
                                    targetElem = item;
                                    break;
                                }
                            } else if (this.inclOptional && !this.inclEdited) {
                                if (item.hasClass('mandatory') || item.hasClass('optional')) {
                                    targetElem = item;
                                    break;
                                }
                            } else if (this.inclOptional && this.inclEdited) {
                                targetElem = $("[class*='frmVar']").eq(totCnt - 1);
                            }
                        }
                        break;
                }

                console.log('target elem step ' + step);
                if(step !== -1) this.editedElement.removeClass('colorBlue');
                console.log(targetElem);
                if (targetElem !== undefined) targetElem.trigger('click', [ 'nav' ]);
            },
            openModal() {
                $('#divModalEditFormVariables').modal();
                $('#modalContent').resizable({
                    minHeight: 300,
                    minWidth: 300
                });
                $('#movingModal').draggable({
                    handle: '.modal-header'
                });
                $('.modal-backdrop').hide();
                $('.modal-open').css('overflow', 'initial');
            },
            remFam() {
                this.canAddFam = true;

                if (this.showFam3) {
                    this.showFam3 = false;
                } else {
                    this.showFam2 = false;
                    this.canRemFam = false;
                }
            },
            resetIdleTime() {
                this.idleTime = 0;
            },
            save(opt) {
                if (!this.isCompleteForm && !this.status) {
                    var payload = {};

                    if (opt === 1) {  // Complete form
                        if ($('span').hasClass('mandatory')) {
                            this.showMsg('You have not yet provided all required fields', 'alert-warning', 5000);
                            return;
                        }

                        if (!confirm('Are you sure this Evaluation is complete and are you sure you have identified at least one concern or priority ' +
                            'that the family has shared about their daily routines?')) return;

                        if ($('#divChildNickname').text().substr(0, 1) === '[' || $('#divChildNickname').text().substr(0, 1) === '') {
                            $('#divLblChildNickname').hide();
                            $('#divChildNickname').hide();
                        }

                        this.isCompleteForm = true;
                    } else if (opt === 2) {  // Exit after save
                        if ($('.saveExit').text() === 'Save and Exit') {
                            payload.action = 1;
                        } else if ($('.saveExit').text() === 'Exit') {
                            window.location.href = '/Admin/Index';
                        } else if ($('.saveExit').text() === 'Update and Exit') {
                            payload.action = 1;
                        }
                    }

                    payload.TempId = this.curForm.tempId;
                    payload.MagicNo = $('[data-frm-var="frmCaseNo"]').text();
                    payload.Firstname = $('[data-frm-var="frmChildFirstname"]').text();
                    payload.Lastname = $('[data-frm-var="frmChildLastname"]').text();
                    payload.DOB = $('[data-frm-var="frmDob"]').text().substr(0,1) !== '[' ? $('[data-frm-var="frmDob"]').text() : null;
                    payload.FormVariableModelsTemp = this.formVariables;
                    payload.FormAreaModels = this.formAreas !== undefined ? this.formAreas : null;
                    payload.Evaluators = this.curForm.evaluators;
                    payload.PrintVariableModels = this.curForm.printVariableModels;
                    payload.CreatedOn = this.curForm.createdOn;
                    payload.EvalDate = $('.frmVarDt[data-frm-var="frmDtEval"]').text().substr(0, 1) !== '[' ? $('.frmVarDt[data-frm-var="frmDtEval"]').text() : null;
                    payload.Status = opt === 1 ? true : false;
                    payload.FinalForm = opt === 1 ? $('#frmForm').html() : '';
                    payload.type = 50;
                    this.$store.dispatch('upsertForm', payload);
                    setTimeout(()=>{ this.save() }, 120000);
                } else {
                    if (this.hasEditedAll) {
                        var payload = {};
                        payload.TempId = this.curForm.tempId;
                        payload.FinalForm = $('#frmForm').html();
                        this.$store.dispatch('upsertFinalForm', payload);
                    } else {
                        window.location.href = '/Admin/Index';
                    }
                }
            },
            setEvalType(trimmedEvalType) {
                if (trimmedEvalType === 'AnnualEvaluation' || trimmedEvalType === 'AnnualAssessment' ||
                    trimmedEvalType === 'EligibilityEvaluation' || trimmedEvalType === 'InitialAssessment') {
                    this.isStandard = true;

                    if (trimmedEvalType === 'AnnualEvaluation' || trimmedEvalType === 'AnnualAssessment') {
                        this.isAnnual = true;
                    } else {
                        this.isAnnual = false;
                    }

                    if (trimmedEvalType === 'InitialAssessment' || trimmedEvalType === 'AnnualAssessment') {
                        this.isAssessment = true;
                    } else {
                        this.isAssessment = false;
                    }
                } else {
                    this.isStandard = false;
                    this.isAnnual = false;
                    this.isAssessment = false;
                }

                if (this.isAssessment) {
                    if ($('[data-frm-var="frmEvalProcParticipant"]').html().substr(0, 2) === '[E') {
                        $('[data-frm-var="frmEvalProcParticipant"]').html('[Assessment Process Participant]');
                    }

                    if ($('[data-frm-calc="frmAgeEval"]').html().substr(0, 9) === '[Age at E') {
                        $('[data-frm-calc="frmAgeEval"]').html('[Age at Assessment]');
                    }

                    if ($('[data-frm-var="frmDtEval"]').html().substr(0, 2) === '[E') {
                        $('[data-frm-var="frmDtEval"]').html('[Assessment Date]');
                    }
                } else {
                    if ($('[data-frm-var="frmEvalProcParticipant"]').html().substr(0, 2) === '[A') {
                        $('[data-frm-var="frmEvalProcParticipant"]').html('[Evaluation Process Participant]');
                    }

                    if ($('[data-frm-calc="frmAgeEval"]').html().substr(0, 9) === '[Age at A') {
                        $('[data-frm-calc="frmAgeEval"]').html('[Age at Evaluation]');
                    }

                    if ($('[data-frm-var="frmDtEval"]').html().substr(0, 2) === '[A') {
                        $('[data-frm-var="frmDtEval"]').html('[Evaluation Date]');
                    }
                }
            },
            setFrmChildAlias() {
                this.frmChildAlias = $('[data-frm-var="frmChildNickname"').html().substr(0, 1) !== '[' ? $('[data-frm-var="frmChildNickname"').html() :
                    ($('[data-frm-var="frmChildFirstname"').html().substr(0, 1) !== '[' ? $('[data-frm-var="frmChildFirstname"').html() : '[Child\'s Nickname or Name]')
                $('[data-frm-calc="frmChildAlias"]').text(this.frmChildAlias);
            },
            setGender(val) {
                if (val !== -1) {
                    $('[data-frm-calc="frmHeShe"]').text(val === 0 ? 'he' : 'she');
                    $('[data-frm-calc="frmHeSheCap"]').text(val === 0 ? 'He' : 'She');
                    $('[data-frm-calc="frmHimHer"]').text(val === 0 ? 'him' : 'her');
                    $('[data-frm-calc="frmHimHerCap"]').text(val === 0 ? 'Him' : 'Her');
                    $('[data-frm-calc="frmHimselfHerself"]').text(val === 0 ? 'himself' : 'herself');
                    $('[data-frm-calc="frmHimselfHerselfCap"]').text(val === 0 ? 'Himself' : 'Herself');
                    $('[data-frm-calc="frmHisHer"]').text(val === 0 ? 'his' : 'her');
                    $('[data-frm-calc="frmHisHerCap"]').text(val === 0 ? 'His' : 'Her');
                }
            },
            setToggle(idx, val) {
                var internalFv = this.formVariables;
                var internalTests = this.tests[idx];
                var self = this;
                var set = this.tests[idx].set;

                if (this.tests[idx].set) {
                setTimeout(function () {
                    $(document).find('[data-frm-var*="frm' + internalTests.name + '"]').each(function () {
                        for (var fv = 0; fv < internalFv.length; ++fv) {
                            if (internalFv[fv][0] === $(this).data('frm-var')) {
                                if (self.tests[idx].set) {
                                    if ($(this).html(internalFv[fv][1]).hasClass('editedOptional')) $(this).html(internalFv[fv][1]).addClass('editedMandatory');
                                    if ($(this).html(internalFv[fv][1]).hasClass('optional')) $(this).html(internalFv[fv][1]).addClass('mandatory');
                                    $(this).html(internalFv[fv][1]).removeClass('optional editedOptional');
                                } else {
                                    if ($(this).html(internalFv[fv][1]).hasClass('editedMandatory')) $(this).html(internalFv[fv][1]).addClass('editedOptional');
                                    if ($(this).html(internalFv[fv][1]).hasClass('mandatory')) $(this).html(internalFv[fv][1]).addClass('optional');
                                    $(this).html(internalFv[fv][1]).removeClass('mandatory editedMandatory');
                                }
                            }
                        }
                    });
                }, 1);
                }

                if (!val) {
                    var inserted = false;
                    var frmSelTestsList = this.curForm.frmSelTests !== null ? this.curForm.frmSelTests.split(';') : [];
                    var len = frmSelTestsList.length;

                    for (var i = 0; i < len; ++i) {
                        console.log('parsing test array');
                        if (frmSelTestsList[i] !== '') {
                            if (!set && parseInt(frmSelTestsList[i]) === idx) {
                                frmSelTestsList.splice(i, 1);
                                --len;
                                --i;
                            } else if (idx < frmSelTestsList[i] && !inserted) {
                                frmSelTestsList.splice(i, 0, idx);
                                inserted = true;
                            }
                        } else {
                            frmSelTestsList.splice(i, 1);
                        }
                    }

                    if ((frmSelTestsList.length === 0 || !inserted) && set) {
                        console.log('adding an idx ' + idx);
                        frmSelTestsList.push(idx);
                    }

                    this.$store.commit('updateFrmSelTests', frmSelTestsList.length > 1 ? frmSelTestsList.join(';') : idx + ';');
                }
            },
            setWindow() {
                var curPos = this.editedElement.position();
                var testScore = false;

                if (curPos.top < 200) {
                    curPos = this.editedElement.parent().position();

                    if (curPos.top < 200) {
                        curPos = this.editedElement.parent().parent().position();

                        if (curPos.top < 200) {
                            curPos = this.editedElement.parent().parent().parent().position();
                            testScore = true;
                        }
                    }
                }

                var modalPos = $('#movingModal').offset();
                var docWidth = $(document).width();
                var elemStartLeft = curPos.left;
                var elemEndLeft = curPos.left + this.editedElement.width();
                var elemEndTop = curPos.top + this.editedElement.height();
                var modalTop = elemEndTop + 20;
                if (testScore) modalTop += 200;
                var modalLeft = (docWidth / 2 - this.editedElement.width()) / 2;
                var isQuad1 = false;

                if (elemStartLeft < docWidth / 2) isQuad1 = true;

                if (isQuad1) {
                    modalLeft = elemStartLeft - (($('#divModalEditFormVariables').width() - $('#movingModal').width()) / 2);
                } else {
                    modalLeft = elemEndLeft - $('#divModalEditFormVariables').width() + (($('#divModalEditFormVariables').width() - $('#movingModal').width()) / 2);
                }

                $('#divModalEditFormVariables').css({
                    position: 'absolute',
                    top: modalTop + 'px',
                    left: modalLeft > 0 ? modalLeft : 0 + 'px',
                    height: 'auto',
                    minHeight: '100% !important',
                    bottom: 'auto',
                    width: 'auto'
                });

                $('html, body').animate({
                    scrollTop: curPos.top < $(window).height() / 2 ? 0 : curPos.top - 220
                }, 20);
            },
            showMsg(msg, classAlert, duration) {
                if ($('#formMsg').css('display') === 'none') {
                    $('.alert-msg').text(msg);
                    $('#formMsg').addClass(classAlert);
                    $('#formMsg').fadeIn(1000).delay(duration).fadeOut(2000, function () {
                        $('#formMsg').removeClass(classAlert);
                    });
                }
            },
            toggleBasicExclude(evt, spec) {
                var elem = evt !== null ? $(evt.currentTarget) : spec;

                if (elem.hasClass('include')) {
                    elem.removeClass('include').addClass('exclude').addClass('printNo');
                } else {
                    elem.addClass('include').removeClass('exclude').removeClass('printNo');
                }
            },
            toggleDisplayTest(evt) {
                var elem = $(evt.currentTarget);
                var idx = elem.index('.cbxTest');
                this.tests[idx].set = !this.tests[idx].set;
                this.setToggle(idx);
            },
            toggleEdited(evt) {
                this.inclEdited = !this.inclEdited;
                this.nav(-1);
            },
            toggleExclude(evt) {
                var isIncluded = false;
                var affectedIdx = $(evt.currentTarget).index('.liDev');

                if ($(evt.currentTarget).hasClass('exclude')) {
                    isIncluded = true;
                }

                if ($(evt.currentTarget).children().eq(0).hasClass('frmVarEdt')) {
                    this.isEvalComment = true;
                    this.evalCommentIdx = $(evt.currentTarget).index('.liDev');
                }

                this.updateFormSelOptions(affectedIdx, isIncluded);
            },
            toggleInfoTbl(evt) {
                var targ = $(evt.currentTarget);

                if (targ.hasClass('btnScoringKey')) {
                    this.hidingScoringKey = !this.hidingScoringKey;
                } else {
                    this.hidingGlossary = !this.hidingGlossary;
                }
            },
            toggleOptional(evt) {
                this.inclOptional = !this.inclOptional;
                this.nav(-1);
            },
            updateEvalSigs() {
                setTimeout(function () {
                    if ($('[data-frm-var="frmDtEval"]').text().substr(0, 1) !== '[') {
                        $('.frmDtEvalSig').html($('[data-frm-var="frmDtEval"]').text());
                    }
                }, 1);
            },
            updateFormSelOptions(affectedIdx, isIncluded) {
                var frmSelOptionsList = this.curForm.frmSelOptions !== null ? this.curForm.frmSelOptions.split('|') : [];
                var hasHitVal = false;
                var internalIsEvalComment = this.isEvalComment;

                $.each(frmSelOptionsList, function (i, val) {
                    if (parseInt(val) === affectedIdx && !isIncluded) {
                        frmSelOptionsList.splice(i, !internalIsEvalComment ? 1 : 2);
                    } else if (val > affectedIdx && isIncluded && !hasHitVal) {
                        if (i === 0) {
                            frmSelOptionsList.unshift(affectedIdx);
                        } else {
                            frmSelOptionsList.splice(i - 1, 0, affectedIdx);
                        }

                        hasHitVal = true;
                    }
                });

                if (!hasHitVal && isIncluded) {  // Should come at end of list
                    frmSelOptionsList.push(affectedIdx);
                }

                this.$store.commit('updateFrmSelOptions', frmSelOptionsList.join('|'));
            },
            updateFrmVars(toggle) {
                var varLen = this.formVariables.length;
                var calcLen = this.frmCalcs.length;
                console.log('hit updateFrmVars with toggle ' + toggle);

                for (var v = 0; v < varLen; ++v) {
                    var self = this;

                    $('[data-frm-var="' + this.formVariables[v][0] + '"]').each(function () {
                        if (self.formVariables[v][0] == 'frmEvalProcParticipant') {
                            console.log('hit proc');
                        }

                        $(this).html(self.formVariables[v][1]);

                        if (!toggle && $(this).html().substr(0, 1) !== '[') {
                            if (self.formVariables[v][0] === 'frmEligBasis') {
                                var ebLen = self.eligibilityBasis.length;

                                for (var e = 0; e < ebLen; ++e) {
                                    if (self.eligibilityBasis[e].replace(/\s/g, '') === self.formVariables[v][1].replace(/\s/g, '')) {
                                        $('.divEligBasis').eq(e).show();
                                    }
                                }
                            }

                            if (self.formVariables[v][0] === 'frmEvalType') {
                                var trimmedEvalType = self.formVariables[v][1].replace(/\s/g, '');
                                self.setEvalType(trimmedEvalType);
                            }

                            if ($(this).hasClass('mandatory')) $(this).removeClass('mandatory').addClass('editedMandatory');
                            if ($(this).hasClass('optional')) $(this).removeClass('optional').addClass('editedOptional');
                        }
                    });
                }

                for (var c = 0; c < calcLen; ++c) {
                    var internal = this.frmCalcs[c][1];
                    $('[data-frm-calc="' + this.frmCalcs[c][0] + '"]').each(function () {
                        $(this).text(internal);
                    });
                }

                if (!toggle) {
                    var cnt = this.tests.length;

                    for (var t = 0; t < cnt; ++t) {
                        if (this.tests[t].set) {
                            this.setToggle(t, 1);
                        }
                    }

                    if ($('[data-frm-var="frmGender"]').html() === 'Male') {
                        this.setGender(0);
                    } else if ($('[data-frm-var="frmGender"]').html() === 'Female') {
                        this.setGender(1);
                    }

                    this.calcAgeEval();
                    this.updateEvalSigs();
                }

                this.setFrmChildAlias();
            },
            validateSubmit() {
                // DEV - Placeholder
            }
        },
        mounted() {
            var urlParts = window.location.href.split('/');
            this.tempId = parseInt(urlParts[urlParts.length - 1]);
            this.$store.dispatch('loadForm', this.tempId);

            $(document).on('click', '.mandatory, .optional, .spnFrmAreaEdit, .editedMandatory, .editedOptional', (evt, nav) => {
                if (!this.curForm.status) {
                    console.log('nav is ' + nav);
                    if(nav === undefined) this.clickedToEdit = true;
                    this.editFormVariable(evt);
                }
            });

            $('.eligBasOpt').on('click', (evt) => {
                if ($(evt.currentTarget).hasClass('spnTarInner')) {
                    if ($(evt.currentTarget).hasClass('include')) {
                        var self = this;
                        $('.eligBasOpt').each(function () {
                            if ($(this).parent().hasClass('spnTarPar') && $(this).hasClass('include') && !$(this).hasClass('spnTarInner')) {
                                self.toggleBasicExclude(null, $(this));
                            }
                        });
                    }
                }

                if ($(evt.currentTarget).parent().hasClass('spnTarPar') && !$('.spnTarInner').hasClass('include') && !$(evt.currentTarget).hasClass('spnTarInner')) {
                    this.toggleBasicExclude(null, $('.spnTarInner'));
                }

                this.toggleBasicExclude(evt);
            });

            $('#divModalEditFormVariables').on('hidden.bs.modal', () => {
                setTimeout(() => {
                    if (this.edtDoc) {
                        $('#frmForm').html(this.editor.summernote('code'));
                        this.hasEditedAll = true;
                        this.edtDoc = false;
                    }
                    this.editedElement.removeClass('colorBlue');
                    this.clearEditFields();
                }, 1);
            });

            setInterval(this.checkIdleTime, 120000);  // Every 2 minutes
        },
        watch: {
            alertingOffice() {
                if (this.alertingOffice) {
                    this.showMsg('The office has been alerted that the form is ready for printing.', 'alert-success', 5000);
                }
            },
            finalFormUpdated() {
                if (this.finalFormUpdated) {
                    this.showMsg('Edits of entire document saved.', 'alert-success', 5000);
                }
            },
            formAreas: function () {
                if (this.isCommitting) {
                    this.updatedElement.html(this.formAreas[this.editedElementIdx].value);
                    this.isCommitting = false;
                }
            },
            forms: function () {
                if (this.hasSaved) {
                    this.showMsg('Form updated at ' + moment().format('MMMM Do YYYY, h:mm:ss a'), 'alert-success', 5000);
                    this.$store.commit('clearSaved');
                } else {
                    this.showMsg('The Evaluation could not be saved. Please try again in a minute and then contact support if this save fails again.', 'alert-danger', 5000);
                }
            },
            formVariables: function() {
                if (this.isCommitting) {
                    this.updatedElement.html(this.formVariables[this.editedElementIdx][1]);

                    if (this.updatedElement.data('frmVar') === 'frmDob' || this.updatedElement.data('frmVar') === 'frmDtEval') {
                        this.calcAgeEval();

                        if (this.updatedElement.data('frmVar') === 'frmDtEval') {
                            this.updateEvalSigs(); 
                        }
                    }

                    if (this.updatedElement.data('frmVar') === 'frmChildFirstname' || this.updatedElement.data('frmVar') == 'frmChildNickname') {
                        this.setFrmChildAlias();
                    }

                    if (this.updatedElement.data('frmVar') === 'frmEvalProcParticipant') {
                        var self = this;
                        $('[data-frm-var="frmEvalProcParticipant"]').each(function () {
                            $(this).html(self.formVariables[self.editedElementIdx][1]);
                            if ($(this).hasClass('mandatory')) $(this).removeClass('mandatory').addClass('editedMandatory');
                            if ($(this).hasClass('optional')) $(this).removeClass('optional').addClass('editedOptional');
                        });
                    }

                    this.isCommitting = false;

                    if (this.isCareCon) {
                        this.isCommitting = true;
                        var key = this.updatedElement.parent().data('frmArea');
                        var len = this.formAreas.length;

                        for (var fa = 0; fa < len; ++fa) {
                            if (this.formAreas[fa].name === key) {
                                this.formAreas[fa].value = this.updatedElement.parent().html();
                                break;
                            }
                        }

                        this.setFrmChildAlias();
                        this.isCareCon = false;
                    }
                }

                if (this.formLoaded) {
                    if (!this.curForm.status) {
                        this.status = false;
                        this.showMsg('Form loaded at ' + moment().format('MMMM Do YYYY, h:mm:ss a'), 'alert-success', 1);
                        this.updateFrmVars(false);
                        setTimeout(() => { this.save() }, 120000);
                    } else {
                        this.status = true;
                        $('#frmForm').html(this.curForm.finalForm);
                        $('.printNo').hide();
                        $('.navbar').show();
                    }

                    this.$store.state.formLoaded = 0;
                }

            },
            formSelOptionsUpdated() {
                if (this.formSelOptionsUpdated && this.curForm.frmSelOptions !== null) {
                    $('.liDev').not('.nav-item').each(function () {
                        $(this).removeClass('include').addClass('exclude printNo');
                    });

                    var optArr = this.curForm.frmSelOptions.split('|');
                    var prior = -1;

                    $.each(optArr, function (i, val) {
                        if (!isNaN(val)) {
                            prior = parseInt(val);
                            $('li').not('.nav-item').eq(parseInt(val)).addClass('include').removeClass('exclude printNo');
                        } else if (val !== 'Optional Text' && val !== '') {
                            $('li').not('.nav-item').eq(prior).addClass('include').removeClass('exclude printNo').children().eq(0).text(val);
                        } 
                    }); 
                }

                if (this.curForm.frmSelOptions === null || this.formSelOptionsUpdated) {
                    $(document).find('[data-frm-eval-comment="frmEvalComment"]').each(function () {
                        if ($(this).text() === '') $(this).text('Optional Text');
                    });
                }
                

                this.$store.state.formSelOptionsUpdated = false;
            }
        }
    }
</script>
<style>
    .alert-fixed {
        position:fixed;
        display:none;
        top:0;
        left:50%;
        transform:translateX(-50%);
        text-align:center;
        width:50%;
        z-index:2000;
        border-radius:15px;
    }
</style>