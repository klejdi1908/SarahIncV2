<template>
    <div id="divGridForms" class="container-fluid marginTop75">
        <h2 class="bold">Evaluations, Reviews and Forms</h2>
        <table id="tblForms" class="table table-striped table-bordered" style="width:100%">
            <thead>
                <tr>
                    <th></th>
                    <th style="min-width:110px;">Case Number</th>
                    <th style="min-width:100px;">First Name</th>
                    <th style="min-width:92px;">Last Name</th>
                    <th>DOB</th>
                    <th style="min-width:82px;">Eval Date</th>
                    <th>Status</th>
                    <th style="min-width:95px;">Created On</th>
                    <th style="min-width:110px;">Last Saved</th>
                    <th style="min-width:95px;">Last User</th>
                    <th>Print?</th>
                    <th>Printed</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr class="trForm" v-for="form in forms">
                    <td class="tdLaunch text-center">
                        <button class="btn btn-default btnLaunch" @click="launchForm">
                            <fai :icon="['fas', 'rocket']"></fai>
                            <span class="spnLaunch">Launch</span>
                        </button>
                        <span class="displayNone spnTempId">{{form.tempId}}</span>
                    </td>
                    <td @click="edtForm" class="cursorPointer magicNo"><span class="spnMagicNo">{{form.magicNo}}</span></td>
                    <td @click="edtForm" class="cursorPointer firstname"><span class="spnFirstname">{{form.firstname}}</span></td>
                    <td @click="edtForm" class="cursorPointer lastname"><span class="spnLastname">{{form.lastname}}</span></td>
                    <td @click="edtForm" class="cursorPointer text-center dob"><span class="spnDob">{{form.dob !== null ? $moment(form.dob).format('l') : '' }}</span></td>
                    <td @click="edtForm" class="cursorPointer evalDate"><span class="spnEvalDate">{{form.evalDate !== null ? $moment(form.evalDate).format('l') : ''}}</span></td>
                    <td @click="edtForm" class="cursorPointer text-center status"><span class="spnStatus">{{ !form.status ? 'Open' : 'Done' }}</span></td>
                    <td class="createdOn" :data-order="$moment(form.createdOn).format('YYYY-MM-DD HH:mm:ss')">
                        <span class="spnCreatedOn">{{$moment(form.createdOn).format('l LTS')}}</span>
                    </td>
                    <td class="lastSaved" :data-order="$moment(form.lastSaved).format('YYYY-MM-DD HH:mm:ss')">
                        <span class="spnLastSaved">{{ form.lastSaved !== undefined ? $moment(form.lastSaved).format('l LTS') : ''}}</span>
                    </td>
                    <td class="lastUser"><span class="spnCheckedOutBy">{{form.lastUser}}</span></td>
                    <td @click="edtForm" class="cursorPointer text-center reportReady"><span class="spnReportReady">{{ !form.reportReady ? 'No' : 'Yes' }}</span></td>
                    <td class="reportPrinted"><span class="spnReportPrinted">{{ form.reportPrinted !== undefined ? form.reportPrinted : 'Never' }}</span></td>
                    <td class="text-center" style="min-width:90px;">
                        <button class="btn btn-default btnDelForm" @click="delRow">
                            <fai :icon="['fas', 'eraser']"></fai>
                            <span class="spnDelete">Delete</span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div id="divAddNewForm" @click="launchForm" class="col-sm-12 col-md-4 addNewForm">
            <button class="btn btn-primary" style="float:right;">
                <fai :icon="['fas', 'rocket']"></fai> Create and Launch New Form
            </button >
        </div>
    </div>
</template>
<script>
    import { mapMutations, mapActions, mapState } from 'vuex'

    export default {
        components: {
        },
        computed: {
            ...mapState(['forms', 'formsLoaded', 'formUpdateFailed'])
        },
        data() {
            return {
                curStatus: '',
                haveFormsLoaded: false,
                isDeleted: 0,
                isDobUpdated: 0,
                isEvalDateUpdated: 0,
                isFirstnameUpdated: 0,
                isLastnameUpdated: 0,
                isMagicNoUpdated: 0,
                isReportReady: 0,
                isStatusUpdated: 0,
                isUpdated: 0,
                isUpdating: 0,
                tempId: -1,
                tempTxtVal: '',
                visibleRowIdx: -1
            }
        },
        methods: {
            delRow(evt) {
                this.visibleRowIdx = $(evt.currentTarget).index('.btnDelForm');
                this.tempId = parseInt($('.spnTempId').eq(this.visibleRowIdx).text());
                if (!confirm('Are you sure this Report should be deleted?')) return;
                this.isDeleted = 1;
                this.deleteForm(this.tempId);
            },
            edtForm(evt) {
                this.visibleRowIdx = $(evt.currentTarget).parent().index('.trForm');
                this.tempId = parseInt($('.spnTempId').eq(this.visibleRowIdx).text());

                if ($(evt.currentTarget).hasClass('magicNo')) {
                    var spnMagicNo = $('.spnMagicNo').eq(this.visibleRowIdx);

                    if (spnMagicNo.is(':visible')) {
                        if (!this.isUpdating) {
                            this.tempTxtVal = spnMagicNo.text();
                            spnMagicNo.hide();
                            var magicNo = $('.magicNo').eq(this.visibleRowIdx);
                            magicNo.append(
                                '<input id="txtForm" value="' + this.tempTxtVal + '" />'
                            );
                            this.isUpdating = 1;
                        }
                    } else {
                        if ($('#txtForm').val() !== this.tempTxtVal) {
                            this.isUpdated = 1;
                            this.isFormnameUpdated = 1;
                            this.upsertForm({ type: 0, newVal: $('#txtForm').val(), tempId: this.tempId });
                        }
                    }
                } else if ($(evt.currentTarget).hasClass('firstname')) {
                    var spnFirstname = $('.spnFirstname').eq(this.visibleRowIdx);

                    if (spnFirstname.is(':visible')) {
                        if (!this.updating) {
                            this.tempTxtVal = spnFirstname.text();
                            spnFirstname.hide();
                            var firstname = $('.firstname').eq(this.visibleRowIdx);
                            firstname.append(
                                '<input id="txtForm" value="' + this.tempTxtVal + '" />'
                            );
                            this.isUpdating = 1;
                        }
                    } else {
                        if ($('#txtForm').val() !== this.tempTxtVal) {
                            this.isUpdated = 1;
                            this.isFirstnameUpdated = 1;
                            this.upsertForm({ type: 1, newVal: $('#txtForm').val(), tempId: this.tempId });
                        }
                    }
                } else if ($(evt.currentTarget).hasClass('lastname')) {
                    var spnLastname = $('.spnLastname').eq(this.visibleRowIdx);

                    if (spnLastname.is(':visible')) {
                        if (!this.updating) {
                            this.tempTxtVal = spnLastname.text();
                            spnLastname.hide();
                            var lastname = $('.lastname').eq(this.visibleRowIdx);
                            lastname.append(
                                '<input id="txtForm" value="' + this.tempTxtVal + '" />'
                            );
                            this.isUpdating = 1;
                        }
                    } else {
                        if ($('#txtForm').val() !== this.tempTxtVal) {
                            this.isUpdated = 1;
                            this.isLastnameUpdated = 1;
                            this.upsertForm({ type: 2, newVal: $('#txtForm').val(), tempId: this.tempId });
                        }
                    }
                } else if ($(evt.currentTarget).hasClass('dob')) {
                    var spnDob = $('.spnDob').eq(this.visibleRowIdx);

                    if (spnDob.is(':visible')) {
                        if (!this.isUpdating) {
                            this.tempTxtVal = spnDob.text();
                            spnDob.hide();
                            var dob = $('.dob').eq(this.visibleRowIdx);
                            dob.append(
                                '<input id="txtForm" value="' + this.tempTxtVal + '" />'
                            );
                            this.isUpdating = 1;
                        }
                    } else {
                        if ($('#txtForm').val() !== this.tempTxtVal) {
                            this.isUpdated = 1;
                            this.isDobUpdated = 1;
                            this.upsertForm({ type: 3, newVal: $('#txtForm').val(), tempId: this.tempId });
                        }
                    }
                } else if ($(evt.currentTarget).hasClass('evalDate')) {
                    var spnEvalDate = $('.spnEvalDate').eq(this.visibleRowIdx);

                    if (spnEvalDate.is(':visible')) {
                        if (!this.isUpdating) {
                            this.tempTxtVal = spnEvalDate.text();
                            spnEvalDate.hide();
                            var evalDate = $('.evalDate').eq(this.visibleRowIdx);
                            evalDate.append(
                                '<input id="txtForm" value="' + this.tempTxtVal + '" />'
                            );
                            this.isUpdating = 1;
                        }
                    } else {
                        if ($('#txtForm').val() !== this.tempTxtVal) {
                            this.isUpdated = 1;
                            this.isEvalDateUpdated = 1;
                            this.upsertForm({ type: 4, newVal: $('#txtForm').val(), tempId: this.tempId });
                        }
                    }
                } else if ($(evt.currentTarget).hasClass('status')) {
                    this.isUpdated = 1;
                    this.isstatusUpdated = 1;
                    console.log($('.spnStatus').eq(this.visibleRowIdx).text());
                    this.upsertForm({ type: 5, newVal: $('.spnStatus').eq(this.visibleRowIdx).text() === 'OK' ? 'Locked Out' : 'OK', tempId: this.tempId });
                } else if ($(evt.currentTarget).hasClass('reportReady')) {
                    this.isUpdated = 1;
                    this.isReportReadyUpdated = 1;
                    console.log($('.spnReportReady').eq(this.visibleRowIdx).text());
                    this.upsertForm({ type: 6, newVal: $('.spnReportReady').eq(this.visibleRowIdx).text() === 'Yes' ? 0 : 1, tempId: this.tempId });
                }
            },
            fillForms() {
                this.$store.dispatch('fillForms');
            },
            launchForm(evt) {
                var idx = -1;

                if (!$(evt.currentTarget).hasClass('addNewForm')) {
                    var rowIdx = $(evt.currentTarget).index('.btnLaunch');
                    idx = parseInt($('.tdLaunch').eq(rowIdx).find('.spnTempId').text()); 
                }

                window.open('/Form/Index/' + idx);
            },
            resetTbl() {
                $('#divGridForms').append($('#divAddNewForm'));
                var table = $('#tblForms').DataTable({ retrieve: true, paging: false });
                table = $('#tblForms').DataTable({ destroy: true, paging: true });
                table.column(7).order('desc').draw();
                $('.sorting').eq(11).removeClass('sorting');  // Two grids on one page
                $('.sorting').eq(0).removeClass('sorting');  // Two grids on one page
                $('#tblForms_wrapper').children().eq(0).children().eq(0)
                    .removeClass('col-md-6').addClass('col-md-4').css('paddingTop', '5px');
                $('#tblForms_wrapper').children().eq(0).children().eq(1).removeClass('col-md-6')
                    .addClass('col-md-4').css('paddingTop', '5px');
                $('#tblForms_wrapper').children().eq(0).children().eq(1)
                    .after($('#divAddNewForm'));
                $('#divGridForms').on('order.dt', function () {
                    $('.sorting').eq(17).removeClass('sorting');  // Two grids on one page
                    $('.sorting').eq(6).removeClass('sorting');  // Two grids on one page
                });
            },
            upsertFormBase() {
                var table = $('#tblForms').DataTable();
                var cell;
                var len = table.rows().data().length;

                for (var x = 0; x < len; ++x) {
                    if (parseInt($(table.cell(x, 0).node()).find('.spnTempId').text()) === this.tempId) {
                        if (this.isStatusUpdated) {
                            if (!this.formUpdateFailed) {
                                cell = table.cell(x, 6);
                                cell.data('<span class="spnStatus">' + $('.spnStatus').eq(this.visibleRowIdx).text() === 'Open' ? 'Done' : 'Open' + '</span>');
                            }
                        } else if (this.isReportReadyUpdated) {
                            if (!this.formUpdateFailed) {
                                cell = table.cell(x, 10);
                                cell.data('<span class="spnReportReady">' + $('.spnReportReady').eq(this.visibleRowIdx).text() === 'Yes' ? 'No' : 'Yes' + '</span>');
                            }
                        } else {
                            var newFormVal = $('#txtForm').val();
                            $('#txtForm').remove();

                            if (this.isMagicNoUpdated) {
                                if (!this.formUpdateFailed) {
                                    cell = table.cell(x, 1);
                                    cell.data('<span class="spnMagicNo">' + newFormVal + '</span>');
                                }
                            } else if (this.isFirstnameUpdated) {
                                if (!this.formUpdateFailed) {
                                    cell = table.cell(x, 2);
                                    cell.data('<span class="spnFirstname">' + newFormVal + '</span>');
                                }
                            } else if (this.isLastnameUpdated) {
                                if (!this.formUpdateFailed) {
                                    cell = table.cell(x, 3);
                                    cell.data('<span class="spnLastname">' + newFormVal + '</span>');
                                }
                            } else if (this.isDobUpdated) {
                                if (!this.formUpdateFailed) {
                                    cell = table.cell(x, 4);
                                    cell.data('<span class="spnDob">' + newFormVal + '</span>');
                                }
                            } else if (this.isEvalDateUpdated) {
                                if (!this.formUpdateFailed) {
                                    cell = table.cell(x, 5);
                                    cell.data('<span class="spnEvalDate">' + newFormVal + '</span>');
                                }
                            }
                        }

                        cell.invalidate().draw(false);
                        break;
                    }
                }

                table.rows().invalidate().draw(false);

                if (this.isMagicNoUpdated) {
                    $('.spnMagicNo').eq(this.visibleRowIdx).show();
                    this.isMagicNoUpdated = 0;
                } else if (this.isFirstnameUpdated) {
                    $('.spnFirstname').eq(this.visibleRowIdx).show();
                    this.isFirstnameUpdated = 0;
                } else if (this.isLastnameUpdated) {
                    $('.spnLastname').eq(this.visibleRowIdx).show();
                    this.isLastnameUpdated = 0;
                } else if (this.isDobUpdated) {
                    $('.spnDob').eq(this.visibleRowIdx).show();
                    this.isDobUpdated = 0;
                } else if (this.isEvalDateUpdated) {
                    $('.spnEvalDate').eq(this.visibleRowIdx).show();
                    this.isEvalDateUpdated = 0;
                } else if (this.isStatusUpdated) {
                    this.isStatusUpdated = 0;
                } else if (this.isReportReadyUpdated) {
                    this.isReportReadyUpdated = 0;
                }
            },
            ...mapActions([
                'deleteForm',
                'upsertForm'
            ])
        },
        mounted() {
            this.fillForms();
        },
        watch: {
            forms: function () {
                if (!this.haveFormsLoaded) {
                    setTimeout(()=>{
                        this.resetTbl();
                        this.haveFormsLoaded = true;
                    }, 100);
                }

                if (this.isUpdated) {
                    setTimeout(() => {
                        this.upsertFormsBase();
                    }, 1000);

                    this.isUpdated = 0;
                    this.isUpdating = 0;
                }

                if (this.isDeleted) {
                    setTimeout(()=>{  // Required to work properly, for whatever reason
                        var table = $('#tblForms').DataTable();
                        table.rows(table.rows().data().length - 1).remove();
                        table.rows().invalidate().draw(false);
                        this.isDeleted = 0;
                    }, 100);
                }
            },
            users: function () {
                if (this.isUpdated) {
                    setTimeout(() => {
                        this.upsertFormBase();
                    }, 1000);

                    this.isUpdated = 0;
                    this.isUpdating = 0;
                }
            },
            formUpdateFailed: function () {
                if (this.formUpdateFailed) {
                    this.upsertFormBase();

                    this.isUpdated = 0;
                    this.isUpdating = 0;
                    this.formUpdateFailed = 0;
                }
            }
        }
    }
</script>
<style>
</style>