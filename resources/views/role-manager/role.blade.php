@extends('masterLayout.masterLayout')
@section('layout')
    <div class="content-wrapper">
      <div class="row">
        <div class="col-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <div class="tableBtnGroup d-flex justify-content-between">
                <h4 class="card-title">Users Dashboard</h4>
                <a href="{{ route('role_create') }}" class="btn btn-primary">Add Role</a>
              </div>
              <div class="table-responsive">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Role Name</th>
                      <th>Status</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    @if (count($roles) > 0)
                      @foreach ($roles as $role)
                      <tr>
                        <td>#{{$role->id}}</td>
                        <td>{{$role->name}}</td>
                        <td><label class="badge badge-danger">{{$role->status}}</label></td>
                      </tr>
                      @endforeach
                    @endif
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
@endsection