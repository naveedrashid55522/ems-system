@extends('masterLayout.masterLayout')
@section('layout')
    <div class="content-wrapper">
      <div class="row">
        <div class="col-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <div class="tableBtnGroup d-flex justify-content-between">
                <h4 class="card-title">Users Dashboard</h4>
                <a href="{{ route('user_create') }}" class="btn btn-primary">Add User</a>
              </div>
              <div class="table-responsive">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    @if (count($users) > 0)
                      @foreach ($users as $user)
                      {{-- {{dd($user)}} --}}
                      <tr>
                        <td>#{{$user->id}}</td>
                        <td>{{$user->name}}</td>
                        <td class="text-danger">{{$user->email}}</td>
                        <td>
                          @if ($user->role_id ==0)
                              {{'Super Admin'}}  
                            @else
                            {{$user->role->name}}
                          @endif
                        </td>
                        <td>{!! $user->role_id != 0 ? '<label class="badge badge-danger">Pending</label>' : '' !!}</td>
                        <td>{!! $user->role_id != 0 ? '<a href="#" class="badge badge-danger">Pending</a>' : '' !!}</td>
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