$(document).ready(function () {
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
});