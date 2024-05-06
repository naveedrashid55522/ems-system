@extends('masterLayout.app')
@section('main')
@section('page-title')
    create User
@endsection
@section('page-content')
    <div class="box box-primary">
        <div class="box-body">
            <div class="row justify-content-center">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                    <form method="POST" action="{{ route('post_user') }}">
                        @csrf
                        <div class="mb-3 form-group">
                            <label class="form-label">Name</label>
                            <input type="text" name="user_name" class="form-control">
                            @error('user_name')
                                <div class="alert alert-danger">{{ $message }}</div>
                            @enderror
                        </div>
                        <div class="mb-3 form-group">
                            <label class="form-label">Email address</label>
                            <input type="email" name="user_email" class="form-control">
                            @error('user_email')
                                <div class="alert alert-danger">{{ $message }}</div>
                            @enderror
                        </div>
                        <div class="mb-3 form-group">
                            <label class="form-label">Roll</label>
                            <select name="user_role" id="author_feature" class="form-control form-select select2" style="width: 100%;">
                                <option value="">Select Role</option>
                                @foreach ($roles as $roleId => $roleName)
                                    <option value="{{ $roleId }}">{{ $roleName }}</option>
                                @endforeach
                            </select>
                            @error('user_role')
                                <div class="alert alert-danger">{{ $message }}</div>
                            @enderror
                        </div>
                        <div class="mb-3 form-group">
                            <label class="form-label">Password</label>
                            <input type="password" name="user_password" class="form-control">
                            @error('user_password')
                                <div class="alert alert-danger">{{ $message }}</div>
                            @enderror
                        </div>
                        <div class="box-footer">
                            <button type="submit" class="btn btn-primary">Submit</button>
                            {{-- <button type="reset" class="btn btn-danger">Cancel</button> --}}
                          </div>
                    </form>

                </div>
                <div class="col-md-3"></div>
            </div>
        </div>
    </div>
@endsection
@endsection
