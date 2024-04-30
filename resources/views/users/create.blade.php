@extends('masterLayout.masterLayout')
@section('layout')
<div class="content-wrapper">
  <div class="row justify-content-center">
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
            <select name="user_role" class="form-select">
                <option value="">Select Role</option>
                @foreach($roles as $roleId => $roleName)
                    <option value="{{$roleId}}">{{ $roleName }}</option>
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
        <button type="submit" class="btn btn-primary btn-lg btn-block">Submit</button>
    </form>
    
    </div>
  </div>
</div>
@endsection