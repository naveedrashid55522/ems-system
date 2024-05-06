@extends('masterLayout.app')
@section('main')
@section('page-title')
    create Role
@endsection
@section('page-content')
    <div class="box box-primary"> 
        <div class="box-body">
            <div class="row justify-content-center">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                  <form id="addRoleForm"  action="{{ route('role_store') }}" method="POST">
                    <div class="mb-3 form-group">
                        <label class="form-label">Add Role</label>
                        <input type="text" name="add_role" id="add_role" class="form-control">
                    </div>
                    <button type="submit" class="btn btn-primary btn-lg btn-block">Submit</button>
                  </form>
                </div>
                <div class="col-md-3"></div>
            </div>
        </div>
    </div>
@endsection
@endsection