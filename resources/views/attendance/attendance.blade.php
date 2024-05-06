@extends('masterLayout.masterLayout')
@section('layout')
    <div class="content-wrapper">
        <div class="row">
            <div class="col-12 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                        <div class="tableBtnGroup d-flex justify-content-between">
                            <h4 class="card-title">Employee Attendance</h4>
                            @if (in_array(auth()->user()->role_id, [1, 2]))
                                <a href="{{ route('user_create') }}" class="btn btn-primary">Add User</a>
                            @endif
                        </div>
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Date</th>
                                        <th>Check In</th>
                                        <th>Check Out</th>
                                        <th>Total Hours</th>
                                        <th>Over Time</th>
                                        <th>status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @if (auth()->user()->id == 1 || auth()->user()->id == 2)
                                        @foreach ($attendance as $result)
                                            <tr>
                                                <td>#{{ $result->id }}</td>
                                                <td>
                                                    @foreach ($users as $user)
                                                        @if ($result->user_id == $user->id)
                                                            {{ $user->name }}
                                                        @endif
                                                    @endforeach
                                                </td>
                                                <td>{{ $result->attendance_date }}</td>
                                                <td>{{ $result->check_in }}</td>
                                                <td>{{ $result->check_out }}</td>
                                                <td>
                                                    @if ($result->check_out !== null)
                                                        {{ showEmployeeTime($result->check_in, $result->check_out) }}
                                                    @endif
                                                </td>
                                                <td>{{$result->total_overtime}}</td>
                                                <td>{{ textFormating($result->status) }}</td>
                                            </tr>
                                        @endforeach
                                    @else
                                        @foreach ($attendance as $result)
                                            @if ($result->user_id == auth()->user()->id)
                                                <tr>
                                                    <td>{{ $result->id }}</td>
                                                    <td>
                                                        @foreach ($users as $user)
                                                            @if ($user->id == auth()->user()->id)
                                                                {{ $user->name }}
                                                            @endif
                                                        @endforeach
                                                    </td>
                                                    <td>{{ $result->attendance_date }}</td>
                                                    <td>{{ $result->check_in }}</td>
                                                    <td>{{ $result->check_out }}</td>
                                                    <td>
                                                        @if ($result->check_out !== null)
                                                            {{ showEmployeeTime($result->check_in, $result->check_out) }}
                                                        @endif
                                                    </td>
                                                    <td>{{$result->total_overtime}}</td>
                                                    <td>{{ textFormating($result->status) }}</td>
                                                </tr>
                                            @endif
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
