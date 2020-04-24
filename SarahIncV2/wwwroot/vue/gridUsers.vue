<template>
    <div id="divGridUsers" class="container-fluid marginTop75">
        <h2 class="bold">Users</h2>
        <table id="tblUsers" class="table table-striped table-bordered" style="width:100%">
            <thead>
                <tr>
                    <th>Role</th>
                    <th>Username</th>
                    <th style="min-width:100px;">First Name</th>
                    <th style="min-width:92px;">Last Name</th>
                    <th>Email Address</th>
                    <th>Title</th>
                    <th>Password</th>
                    <th>Status</th>
                    <th>Commands</th>
                </tr>
            </thead>
            <tbody>
                <tr class="trUser" v-for="user in users">
                    <td @click="edtUser" class="cursorPointer role"><span class="spnRole">{{user.roleName}}</span></td>
                    <td @click="edtUser" class="cursorPointer username"><span class="spnUsername">{{user.username}}</span></td>
                    <td @click="edtUser" class="cursorPointer firstname"><span class="spnFirstname">{{user.firstname}}</span></td>
                    <td @click="edtUser" class="cursorPointer lastname"><span class="spnLastname">{{user.lastname}}</span></td>
                    <td @click="edtUser" class="tdEmail cursorPointer email"><span class="spnEmail">{{user.email}}</span></td>
                    <td @click="edtUser" class="cursorPointer title"><span class="spnTitle">{{user.title}}</span></td>
                    <td>
                        <button class="btn btn-default text-center btnChgPass" data-toggle="modal" @click="selectRow" data-target="#divChgPass">Change Password</button>
                        <span class="displayNone spnUserId">{{user.userId}}</span>
                    </td>
                    <td @click="edtUser" class="text-center cursorPointer lockedOut"><span class="spnLockedOut">{{ !user.lockedout ? 'OK' : 'Locked Out' }}</span></td>
                    <td style="min-width:90px;">
                        <button class="btn btn-default marginLeft10 btnDelUser" @click="delRow">
                            <fai :icon="['fas', 'eraser']"></fai>
                            <span class="spnDelete">Delete</span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div id="divChgPass" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Change Password</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body marginAuto">
                        <input id="txtChgPass" class="verticalAlignMiddle" type="text" />
                        <button type="button" class="btn btn-primary" @click="updatePassword">Update</button>
                    </div>
                </div>
            </div>
        </div>
        <div id="divAddNewUser" @click="addNewUser" class="col-sm-12 col-md-4">
            <button class="btn btn-primary" style="float:right;">
                <fai :icon="['fas', 'user-plus']"></fai> Add New User
            </button >
        </div>
        <table id="tblNewUser" class="displayNone">
            <tr id="trNewUser">
                <td><select id="selNewRole"><option value="User" selected>User</option><option value="Admin">Admin</option></select></td>
                <td><input id="txtNewUsername" style="max-width:140px;" placeholder="Enter Username" /></td>
                <td><input id="txtNewFirstname" style="max-width:140px;" placeholder="Enter Firstname" /></td>
                <td><input id="txtNewLastname" style="max-width:140px;" placeholder="Enter Lastname" /></td>
                <td><input id="txtNewEmail" placeholder="Enter Email" /></td>
                <td><input id="txtNewTitle" placeholder="Enter Title" /></td>
                <td><input id="txtNewPassword" style="max-width:140px;" placeholder="Enter Password" /></td>
                <td class="text-center">OK</td>
                <td style="min-width:90px;">
                    <button class="btn btn-default marginLeft10 btnAdd" @click="addUser">
                        <fai :icon="['fas', 'user-plus']"></fai>
                        <span class="spnAdd">Add</span>
                    </button>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
    import { mapMutations, mapActions, mapState } from 'vuex'

    export default {
        components: {
        },
        computed: {
            ...mapState(['users', 'usersLoaded', 'userUpdateFailed'])
        },
        data() {
            return {
                curRole: '',
                email: '',
                visibleRowIdx: -1,
                haveUsersLoaded: false,
                isAdding: 0,
                isDeleted: 0,
                isEmailUpdated: 0,
                isFirstnameUpdated: 0,
                isLastnameUpdated: 0,
                isLockedOutUpdated: 0,
                isRoleUpdated: 0,
                isTitleUPdated: 0,
                isUpdated: 0,
                isUpdating: 0,
                isUsernameUpdated: 0,
                tempTxtVal: '',
                userId: -1
            }
        },
        methods: {
            addNewUser(evt) {
                if (!this.isAdding) {
                    $('.trUser').eq(0).before($('#trNewUser'));
                    this.isAdding = 1;
                }
            },
            addUser(evt) {
                var newUser = {
                    userId: -1,
                    roleName: $('#selNewRole').find(':selected').text(),
                    username: $('#txtNewUsername').val(),
                    firstname: $('#txtNewFirstname').val(),
                    lastname: $('#txtNewLastname').val(),
                    email: $('#txtNewEmail').val(),
                    title: $('#txtNewTitle').val(),
                    password: $('#txtNewPassword').val(),
                    lockedoutStr: 'OK'
                };

                var alertMsg = '';
                var alertMsgBase = 'Please make sure you complete the following fields: ';

                if (newUser.username === '') {
                    alertMsg += 'Username';
                }

                if (newUser.firstname === '') {
                    if (alertMsg !== '') alertMsg += ', ';
                    alertMsg += 'Firstname';
                }

                if (newUser.lastname === '') {
                    if (alertMsg !== '') alertMsg += ', ';
                    alertMsg += 'Lastname';
                }

                if (newUser.email === '') {
                    if (alertMsg !== '') alertMsg += ', ';
                    alertMsg += 'Email';
                }

                if (newUser.title === '') {
                    if (alertMsg !== '') alertMsg += ', ';
                    alertMsg += 'Title';
                }

                if (newUser.password === '') {
                    if (alertMsg !== '') alertMsg += ', ';
                    alertMsg += 'Password';
                }

                if (alertMsg === '') {
                    this.upsertUser({ type: 22, newUser: newUser, userId: this.userId });
                } else {
                    alert(alertMsgBase + alertMsg);
                }
            },
            delRow(evt) {
                this.visibleRowIdx = $(evt.currentTarget).index('.btnDelUser');
                this.userId = parseInt($('.spnUserId').eq(this.visibleRowIdx).text());
                this.isDeleted = 1;
                this.deleteUser(this.userId);
            },
            edtUser(evt) {
                this.visibleRowIdx = $(evt.currentTarget).parent().index('.trUser');
                this.userId = parseInt($('.spnUserId').eq(this.visibleRowIdx).text());

                if ($(evt.currentTarget).hasClass('role')) {
                    var spnRole = $('.spnRole').eq(this.visibleRowIdx);

                    if (spnRole.is(':visible')) {
                        if (!this.updating) {
                            this.curRole = spnRole.html();
                            spnRole.hide();
                            var role = $('.role').eq(this.visibleRowIdx);
                            role.append(
                                '<select id="selRole">' +
                                '<option value="Admin">Admin</option>' +
                                '<option value="User">User</option>' +
                                '</select>'
                            );
                            $('#selRole option[value=' + $('.spnRole').eq(this.visibleRowIdx).text() + ']').attr('selected', 'selected');
                            this.isUpdating = 1;
                        }
                    } else {
                        if ($('#selRole').find(':selected').text() !== this.curRole) {
                            this.isUpdated = 1;
                            this.isRoleUpdated = 1;
                            this.upsertUser({ type: 0, newVal: $('#selRole').find(':selected').text(), userId: this.userId });
                        }
                    }
                } else if ($(evt.currentTarget).hasClass('username')) {
                    var spnUsername = $('.spnUsername').eq(this.visibleRowIdx);

                    if (spnUsername.is(':visible')) {
                        if (!this.updating) {
                            this.tempTxtVal = spnUsername.text();
                            spnUsername.hide();
                            var username = $('.username').eq(this.visibleRowIdx);
                            username.append(
                                '<input id="txtUser" value="' + this.tempTxtVal + '" />'
                            );
                            this.isUpdating = 1;
                        }
                    } else {
                        if ($('#txtUser').val() !== this.tempTxtVal) {
                            this.isUpdated = 1;
                            this.isUsernameUpdated = 1;
                            this.upsertUser({ type: 1, newVal: $('#txtUser').val(), userId: this.userId });
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
                                '<input id="txtUser" value="' + this.tempTxtVal + '" />'
                            );
                            this.isUpdating = 1;
                        }
                    } else {
                        if ($('#txtUser').val() !== this.tempTxtVal) {
                            this.isUpdated = 1;
                            this.isFirstnameUpdated = 1;
                            this.upsertUser({ type: 2, newVal: $('#txtUser').val(), userId: this.userId });
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
                                '<input id="txtUser" value="' + this.tempTxtVal + '" />'
                            );
                            this.isUpdating = 1;
                        }
                    } else {
                        if ($('#txtUser').val() !== this.tempTxtVal) {
                            this.isUpdated = 1;
                            this.isLastnameUpdated = 1;
                            this.upsertUser({ type: 3, newVal: $('#txtUser').val(), userId: this.userId });
                        }
                    }
                } else if ($(evt.currentTarget).hasClass('email')) {
                    var spnEmail = $('.spnEmail').eq(this.visibleRowIdx);

                    if (spnEmail.is(':visible')) {
                        if (!this.isUpdating) {
                            this.tempTxtVal = spnEmail.text();
                            spnEmail.hide();
                            var email = $('.email').eq(this.visibleRowIdx);
                            email.append(
                                '<input id="txtUser" value="' + this.tempTxtVal + '" />'
                            );
                            this.isUpdating = 1;
                        }
                    } else {
                        if ($('#txtUser').val() !== this.tempTxtVal) {
                            this.isUpdated = 1;
                            this.isEmailUpdated = 1;
                            this.upsertUser({ type: 4, newVal: $('#txtUser').val(), userId: this.userId });
                        }
                    }
                } else if ($(evt.currentTarget).hasClass('title')) {
                    var spnTitle = $('.spnTitle').eq(this.visibleRowIdx);

                    if (spnTitle.is(':visible')) {
                        if (!this.isUpdating) {
                            this.tempTxtVal = spnTitle.text();
                            spnTitle.hide();
                            var title = $('.title').eq(this.visibleRowIdx);
                            title.append(
                                '<input id="txtUser" value="' + this.tempTxtVal + '" />'
                            );
                            this.isUpdating = 1;
                        }
                    } else {
                        if ($('#txtUser').val() !== this.tempTxtVal) {
                            this.isUpdated = 1;
                            this.isTitleUpdated = 1;
                            this.upsertUser({ type: 5, newVal: $('#txtUser').val(), userId: this.userId });
                        }
                    }
                } else if ($(evt.currentTarget).hasClass('lockedOut')) {
                    this.isUpdated = 1;
                    this.isLockedOutUpdated = 1;
                    console.log($('.spnLockedOut').eq(this.visibleRowIdx).text());
                    this.upsertUser({ type: 6, newVal: $('.spnLockedOut').eq(this.visibleRowIdx).text() === 'OK' ? 'Locked Out' : 'OK', userId: this.userId });
                }
            },
            fillUsers() {
                this.$store.dispatch('fillUsers');
            },
            resetTbl() {
                $('#divGridUsers').append($('#divAddNewUser'));
                var table = $('#tblUsers').DataTable({ retrieve: true, paging: false });
                if (this.isAdding) table.row.add($('.trUser').eq($('.trUser').length - 1).clone()).draw(false);
                $('#tblUsers').DataTable({ destroy: true, paging: true });
                $('.sorting').eq(7).removeClass('sorting');
                $('.sorting').eq(5).removeClass('sorting');
                $('#tblUsers_wrapper').children().eq(0).children().eq(0)
                    .removeClass('col-md-6').addClass('col-md-4').css('paddingTop', '5px');
                $('#tblUsers_wrapper').children().eq(0).children().eq(1).removeClass('col-md-6')
                    .addClass('col-md-4').css('paddingTop', '5px');
                $('#tblUsers_wrapper').children().eq(0).children().eq(1)
                    .after($('#divAddNewUser'));
                $('#divGridUsers').on('order.dt', function () {
                    $('.sorting').eq(7).removeClass('sorting');  // Two grids on one page
                    $('.sorting').eq(5).removeClass('sorting');  // Two grids on one page
                });
            },
            selectRow(evt) {
                this.visibleRowIdx = $(evt.currentTarget).index('.btnChgPass');
                console.log('visibleRowIdx is ' + visibleRowIdx);
                this.email = $('.tdEmail').eq(visibleRowIdx).text();
                this.userId = $('.spnUserId').eq(visibleRowIdx).text();
            },
            updatePassword(evt) {
                if ($('#txtChgPass').val() !== '') this.changePassword({ newPass: $('#txtChgPass').val(), email: this.email, userId: this.userId });
            },
            upsertUserBase() {
                var table = $('#tblUsers').DataTable();
                var cell;
                var len = table.rows().data().length;

                for (var x = 0; x < len; ++x) {
                    if (parseInt($(table.cell(x, 6).node()).find('.spnUserId').text()) === this.userId) {
                        if (this.isRoleUpdated) {
                            var newRole = $('#selRole').find(':selected').text();
                            $('#selRole').remove();
                            if (!this.userUpdateFailed) {
                                cell = table.cell(x, 0);
                                cell.data('<span class="spnRole">' + newRole + '</span>');
                            }
                        } else if (this.isLockedOutUpdated) {
                            if (!this.userUpdateFailed) {
                                cell = table.cell(x, 7);
                                cell.data('<span class="spnLockedOut">' + $('.spnLockedOut').eq(this.visibleRowIdx).text() === 'OK' ? 'Locked Out' : 'OK' + '</span>');
                            }
                        } else {
                            var newUserVal = $('#txtUser').val();
                            $('#txtUser').remove();

                            if (this.isUsernameUpdated) {
                                if (!this.userUpdateFailed) {
                                    cell = table.cell(x, 1);
                                    cell.data('<span class="spnUsername">' + newUserVal + '</span>');
                                }
                            } else if (this.isFirstnameUpdated) {
                                if (!this.userUpdateFailed) {
                                    cell = table.cell(x, 2);
                                    cell.data('<span class="spnFirstname">' + newUserVal + '</span>');
                                }
                            } else if (this.isLastnameUpdated) {
                                if (!this.userUpdateFailed) {
                                    cell = table.cell(x, 3);
                                    cell.data('<span class="spnLastname">' + newUserVal + '</span>');
                                }
                            } else if (this.isEmailUpdated) {
                                if (!this.userUpdateFailed) {
                                    cell = table.cell(x, 4);
                                    cell.data('<span class="spnEmail">' + newUserVal + '</span>');
                                }
                            } else if (this.isTitleUpdated) {
                                if (!this.userUpdateFailed) {
                                    cell = table.cell(x, 5);
                                    cell.data('<span class="spnTitle">' + newUserVal + '</span>');
                                }
                            }
                        }

                        cell.invalidate().draw(false);
                        break;
                    }
                }

                table.rows().invalidate().draw(false);

                if (this.isRoleUpdated) {
                    $('.spnRole').eq(this.visibleRowIdx).show();
                    this.isRoleUpdated = 0;
                } else if (this.isUsernameUpdated) {
                    $('.spnUsername').eq(this.visibleRowIdx).show();
                    this.isUsernameUpdated = 0;
                } else if (this.isFirstnameUpdated) {
                    $('.spnFirstname').eq(this.visibleRowIdx).show();
                    this.isFirstnameUpdated = 0;
                } else if (this.isLastnameUpdated) {
                    $('.spnLastname').eq(this.visibleRowIdx).show();
                    this.isLastnameUpdated = 0;
                } else if (this.isEmailUpdated) {
                    $('.spnEmail').eq(this.visibleRowIdx).show();
                    this.isEmailUpdated = 0;
                } else if (this.isTitleUpdated) {
                    $('.spnTitle').eq(this.visibleRowIdx).show();
                    this.isTitleUpdated = 0;
                } else if (this.isLockedOutUpdated) {
                    this.isLockedOutUpdated = 0;
                }
            },
            ...mapActions([
                'changePassword',
                'deleteUser',
                'upsertUser'
            ])
        },
        mounted() {
            this.fillUsers();
        },
        watch: {
            users: function () {
                if (this.isDeleted) {
                    setTimeout(()=>{  // Required to work properly, for whatever reason
                        var table = $('#tblUsers').DataTable();
                        table.rows(table.rows().data().length - 1).remove();
                        table.rows().invalidate().draw(false);
                        this.isDeleted = 0;
                    }, 100);
                }

                if (this.isUpdated) {
                    setTimeout(() => {
                        this.upsertUserBase();
                    }, 1000);

                    this.isUpdated = 0;
                    this.isUpdating = 0;
                }

                if (this.isAdding) {
                    setTimeout(() => {  // Required to work properly, for whatever reason
                        $('#tblNewUser').append('#trNewUser');
                        this.resetTbl();
                        this.isAdding = 0;
                    }, 100);
                }
            },
            users: function () {
                if (!this.haveUsersLoaded && this.usersLoaded) {
                    setTimeout(()=>{
                        this.resetTbl();
                    }, 1000);

                    this.haveUsersLoaded = true;
                }
            },
            userUpdateFailed: function () {
                if (this.userUpdateFailed) {
                    this.upsertUserBase();

                    this.isUpdated = 0;
                    this.isUpdating = 0;
                    this.userUpdateFailed = 0;
                }
            }
        }
    }
</script>
<style>

</style>