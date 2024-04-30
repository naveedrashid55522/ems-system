@extends('masterLayout.masterLayout')
@section('layout')
<div class="content-wrapper">
  <div class="row justify-content-center">
    <div class="col-md-6">

      <form id="addRoleForm"  action="{{ route('role_store') }}" method="POST">
        <div class="mb-3 form-group">
            <label class="form-label">Add Role</label>
            <input type="text" name="add_role" id="add_role" class="form-control">
        </div>
        <button type="submit" class="btn btn-primary btn-lg btn-block">Submit</button>
      </form>
    </div>
  </div>
</div>
@endsection