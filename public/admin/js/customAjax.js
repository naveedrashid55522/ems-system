$(document).ready(function () {

    // add Role Request

    $('#addRoleForm').submit(function (e) {
        e.preventDefault();
        const roleName = $('#add_role').val().trim();
        if (roleName === '') {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Role name cannot be empty.',
            });
            return;
        }

        const formData = new FormData(this);
        const url = $(this).attr('action');
        const token = $('meta[name="csrf-token"]').attr('content');
        $.ajax({
            url: url,
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            headers: {
                'X-CSRF-TOKEN': token
            }
        })
            .then(function (response) {
                console.log(response);
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: response.message,
                });
                $('#addRoleForm')[0].reset();
                $('#add_role').val('');
            })
            .catch(function (xhr) {
                console.error(xhr);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to create role.',
                });
            });
    });

    // Add Department

    $('#departmentData').submit(function (e) {
        e.preventDefault();
        const dp_name = $('input[name="department_name"]').val().trim();
        const dp_status = $('select[name="status"]').val().trim();
        if (dp_name === '' || dp_status === '') {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Name or status cannot be empty.',
            });
            return;
        }

        const formData = new FormData(this);
        const url = $(this).attr('action');
        const token = $('meta[name="csrf-token"]').attr('content');
        $.ajax({
            url: url,
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            headers: {
                'X-CSRF-TOKEN': token
            }
        })
            .then(function (response) {
                console.log(response);
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: response.message,
                });
                $('#departmentData')[0].reset();
                $('#dp_name').val('');
            })
            .catch(function (xhr) {
                console.error(xhr);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to create Department.',
                });
            });
    });

    // Update Department

    $('#departmentDataUpdate').submit(function (e) {
        e.preventDefault();

        const dp_name = $('input[name="department_name"]').val().trim();
        const dp_status = $('select[name="status"]').val().trim();
        if (dp_name === '' || dp_status === '') {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Name or status cannot be empty.',
            });
            return;
        }

        const formData = new FormData(this);
        formData.append('_method', 'PUT');
        const url = $(this).attr('action');
        const token = $('meta[name="csrf-token"]').attr('content');
        $.ajax({
            url: url,
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            headers: {
                'X-CSRF-TOKEN': token
            }
        })
            .then(function (response) {
                console.log(response);
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: response.message,
                });
                // window.location.reload();
            })
            .catch(function (xhr) {
                console.error(xhr);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to update Department.',
                });
            });
    });

    // Destroy Department

    $('.delete-department').on('click', function (e) {
        e.preventDefault();
        const departmentId = $(this).data('department-id');
        const deleteRoute = $(this).data('delete-route').replace(':id', departmentId);

        // Store reference to clicked element
        const $clickedElement = $(this);

        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this department!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                const token = $('meta[name="csrf-token"]').attr('content');

                $.ajax({
                    type: "DELETE",
                    url: deleteRoute,
                    headers: {
                        'X-CSRF-TOKEN': token
                    }
                }).then(function (response) {
                    console.log(response);
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: response.message,
                    });
                    // Use the reference to the clicked element to remove its closest 'tr'
                    $clickedElement.closest('tr').remove();
                }).catch(function (xhr) {
                    console.error(xhr);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Failed to delete Department.',
                    });
                });
            }
        });
    });


    // post check in request

    $('#checkin').submit(function (e) {
        e.preventDefault();
        const url = $(this).attr('action');
        const token = $('meta[name="csrf-token"]').attr('content');
        $.ajax({
            url: url,
            method: 'POST',
            data: {
                _token: token,
                user_id: '{{ Auth::id() }}',
            },
            headers: {
                'X-CSRF-TOKEN': token
            },
            success: function (response) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "Check in successfully"
                });
                $('.checkinBtn').addClass('checkinActive');
                setTimeout(function () {
                    window.location.reload();
                }, 2500);
            },
            error: function (xhr) {
                console.error(xhr);
            }
        });
    });

    // post check out request

    $('#checkOut').submit(function (e) {
        e.preventDefault();
        const url = $(this).attr('action');
        const token = $('meta[name="csrf-token"]').attr('content');
        const alreadyCheckedOut = $(this).data('already-checked-out');

        if (confirm("Are you sure you want to check out?")) {
            if (alreadyCheckedOut === 'true') {
                Swal.fire({
                    icon: 'error',
                    title: 'Already Checked Out',
                    text: 'You have already checked out.',
                });
                return;
            }

            const now = new Date();
            const hours = 17 - now.getHours();
            const minutes = 60 - now.getMinutes();
            const remainingTime = hours + " hours and " + minutes + " minutes";

            if (hours <= 0 && minutes <= 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Already Past Office Closing Time',
                    text: 'It\'s already past office closing time. You cannot check out early.',
                });
                return;
            }

            $.ajax({
                url: url,
                method: 'POST',
                data: {
                    _token: token,
                    user_id: userId,
                },
                headers: {
                    'X-CSRF-TOKEN': token
                },
                success: function (response) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        icon: "success",
                        title: "Check out successfully"
                    });
                    setTimeout(function () {
                        window.location.reload();
                    }, 2500);
                },
                error: function (xhr) {
                    console.error(xhr);
                }
            });
        }
    });

    // Create Designation

    $('#designationSoter').submit(function (e) {
        e.preventDefault();

        const departmentId = $('select[name="department_id"]').val().trim();
        const designationName = $('input[name="designation_name"]').val().trim();
        const status = $('select[name="status"]').val().trim();
        if (departmentId === '' || designationName === '' || status === '') {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Department ID, Designation Name, or Status cannot be empty.',
            });
            return;
        }

        const formData = new FormData(this);
        const url = $(this).attr('action');
        const token = $('meta[name="csrf-token"]').attr('content');
        $.ajax({
            url: url,
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            headers: {
                'X-CSRF-TOKEN': token
            }
        })
            .then(function (response) {
                console.log(response);
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: response.message,
                });
                $('#designationSoter')[0].reset();
                $('#department_id').val('');
                $('#designation_name').val('');
                $('#status').val('');
                // window.location.reload(); // or redirect to a different page
            })
            .catch(function (xhr) {
                console.error(xhr);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to create Designation.',
                });
            });
    });

    // Update Designation

    $('#designationUpdate').submit(function (e) {
        e.preventDefault();

        const departmentId = $('select[name="department_id"]').val().trim();
        const designationName = $('input[name="designation_name"]').val().trim();
        const status = $('select[name="status"]').val().trim();
        if (departmentId === '' || designationName === '' || status === '') {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Department ID, Designation Name, or Status cannot be empty.',
            });
            return;
        }

        const formData = new FormData(this);
        formData.append('_method', 'PUT');
        const url = $(this).attr('action');
        const token = $('meta[name="csrf-token"]').attr('content');
        $.ajax({
            url: url,
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            headers: {
                'X-CSRF-TOKEN': token
            }
        })
            .then(function (response) {
                console.log(response);
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: response.message,
                });
            })
            .catch(function (xhr) {
                console.error(xhr);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to create Designation.',
                });
            });
    });

    // Destroy Designation

    $('.delete-designation').on('click', function (e) {
        e.preventDefault();
        const designationId = $(this).data('designation-id');
        const deleteRoute = $(this).data('delete-route').replace(':id', designationId);
        const $clickedElement = $(this);

        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this designation!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                const token = $('meta[name="csrf-token"]').attr('content');

                $.ajax({
                    type: "DELETE",
                    url: deleteRoute,
                    headers: {
                        'X-CSRF-TOKEN': token
                    }
                }).then(function (response) {
                    console.log(response);
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: response.message,
                    });
                    $clickedElement.closest('tr').fadeOut('slow', function () {
                        $(this).css('backgroundColor', 'red').remove();
                    });
                }).catch(function (xhr) {
                    console.error(xhr);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Failed to delete Department.',
                    });
                });
            }
        });
    });

    // Update Status Designation

    $('.status-toggle').click(function () {
        const button = $(this);
        const id = button.data('id');
        const status = button.data('status');
        const newStatus = status === 'active' ? 'deactive' : 'active';
        const statusIcon = status === 'active' ? 'down' : 'up';
        const btnClass = status === 'active' ? 'danger' : 'info';

        $.ajax({
            url: '/update-status/' + id,
            method: 'PUT',
            data: { status: newStatus },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function (response) {
                button.removeClass('btn-' + (status === 'active' ? 'info' : 'danger')).addClass('btn-' + btnClass);
                button.find('i').removeClass('fa-thumbs-' + (status === 'active' ? 'up' : 'down')).addClass('fa-thumbs-' + statusIcon);
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "Status " + newStatus.charAt(0).toUpperCase() + newStatus.slice(1) + " successfully"
                });
                button.data('status', newStatus);
            },
            error: function (xhr) {
                console.error(xhr);
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "error",
                    title: "Failed to update status"
                });
            }
        });
    });

    // Add Users

    $('#addUsers').submit(function (e) {
        e.preventDefault();

        const user_name = $('input[name="user_name"]').val().trim();
        const fater_name = $('input[name="fater_name"]').val().trim();
        const user_email = $('input[name="user_email"]').val().trim();
        const city = $('input[name="city"]').val().trim();
        const phone_number = $('input[name="phone_number"]').val().trim();
        const emergency_phone_number = $('input[name="emergency_phone_number"]').val().trim();
        const emergency_person_name = $('input[name="emergency_person_name"]').val().trim();
        const employee_img = $('input[name="employee_img"]').val().trim();
        const gender = $('select[name="gender"]').val().trim();
        const date_of_birth = $('input[name="date_of_birth"]').val().trim();
        const joining_date = $('input[name="joining_date"]').val().trim();
        const address = $('input[name="address"]').val().trim();
        const user_password = $('input[name="user_password"]').val().trim();
        const user_role = $('select[name="user_role"]').val().trim();
        const status = $('select[name="status"]').val().trim();

        emergency_person_name
        if (user_name == '' || fater_name == '' || user_email == '' || city == '' || phone_number == '' || emergency_phone_number == '' || emergency_person_name == '' || employee_img == '' || gender == '' || date_of_birth == '' || joining_date == '' || address == '' || user_password == '' || user_role == '' || status == '') {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All Fields cannot be empty.',
            });
            return;
        }

        const formData = new FormData(this);
        const url = $(this).attr('action');
        const token = $('meta[name="csrf-token"]').attr('content');
        $.ajax({
            url: url,
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            headers: {
                'X-CSRF-TOKEN': token
            }
        })
            .then(function (response) {
                console.log(response);
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: response.message,
                });
                $('#addUsers')[0].reset();
                $('#user_name').val('');
                $('#fater_name').val('');
                $('#user_email').val('');
                $('#city').val('');
                $('#phone_number').val('');
                $('#emergency_phone_number').val('');
                $('#emergency_person_name').val('');
                $('#employee_img').val('');
                $('#user_role').val('');
                $('#gender').val('');
                $('#date_of_birth').val('');
                $('#joining_date').val('');
                $('#address').val('');
                $('#user_password').val('');
                $('#status').val('');
                // window.location.reload(); // or redirect to a different page
            })
            .catch(function (xhr) {
                console.error(xhr);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to create Designation.',
                });
            });
    });

    // Update User

    $('#UpdateUser').submit(function (e) {
        e.preventDefault();

        const user_name = $('input[name="user_name"]').val().trim();
        const fater_name = $('input[name="fater_name"]').val().trim();
        const user_email = $('input[name="user_email"]').val().trim();
        const city = $('input[name="city"]').val().trim();
        const phone_number = $('input[name="phone_number"]').val().trim();
        const emergency_phone_number = $('input[name="emergency_phone_number"]').val().trim();
        const emergency_person_name = $('input[name="emergency_person_name"]').val().trim();
        const employee_img = $('input[name="employee_img"]').val().trim();
        const gender = $('select[name="gender"]').val().trim();
        const date_of_birth = $('input[name="date_of_birth"]').val().trim();
        const joining_date = $('input[name="joining_date"]').val().trim();
        const address = $('input[name="address"]').val().trim();
        const user_password = $('input[name="user_password"]').val().trim();
        const user_role = $('select[name="user_role"]').val().trim();
        const status = $('select[name="status"]').val().trim();

        emergency_person_name
        if (user_name == '' || fater_name == '' || user_email == '' || city == '' || phone_number == '' || emergency_phone_number == '' || emergency_person_name == '' || gender == '' || date_of_birth == '' || joining_date == '' || address == '' || user_password == '' || user_role == '' || status == '') {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All Fields cannot be empty.',
            });
            return;
        }

        let fileExtension = '';
        if (employee_img) {
            fileExtension = employee_img.split('.').pop().toLowerCase();
        }
        const allowedExtensions = ['jpeg', 'jpg', 'png'];
        if (fileExtension && !allowedExtensions.includes(fileExtension)) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Invalid image format. Please select a JPEG, JPG, PNG or file.',
            });
            return;
        }

        const formData = new FormData(this);
        formData.append('_method', 'PUT');
        const url = $(this).attr('action');
        const token = $('meta[name="csrf-token"]').attr('content');
        $.ajax({
            url: url,
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            headers: {
                'X-CSRF-TOKEN': token
            }
        })
            .then(function (response) {
                console.log(response);
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: response.message,
                });
                // $('#addUsers')[0].reset();
            })
            .catch(function (xhr) {
                console.error(xhr);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to create Designation.',
                });
            });
    });

    // user status update

    $('.status-toggle').click(function () {
        const button = $(this);
        const id = button.data('id');
        const status = button.data('status');
        const newStatus = status === 'active' ? 'deactive' : 'active';
        const statusIcon = status === 'active' ? 'down' : 'up';
        const btnClass = status === 'active' ? 'danger' : 'info';

        $.ajax({
            url: '/user-status/' + id,
            method: 'PUT',
            data: { status: newStatus },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function (response) {
                button.removeClass('btn-' + (status === 'active' ? 'info' : 'danger')).addClass('btn-' + btnClass);
                button.find('i').removeClass('fa-thumbs-' + (status === 'active' ? 'up' : 'down')).addClass('fa-thumbs-' + statusIcon);
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "Status " + newStatus.charAt(0).toUpperCase() + newStatus.slice(1) + " successfully"
                });
                button.data('status', newStatus);
            },
            error: function (xhr) {
                console.error(xhr);
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "error",
                    title: "Failed to update status"
                });
            }
        });
    });
});