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
                                        <th>Date</th>
                                        <th>Check In</th>
                                        <th>Check Out</th>
                                        <th>Total Hours</th>
                                        <th>status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @if (count($attendance) > 0)
                                        @foreach ($attendance as $result)
                                            {{-- {{}} --}}
                                            {{-- {{dd($result)}} --}}
                                            <tr>
                                                <td>{{ $result->id }}</td>
                                                <td>
                                                    @if (Auth::user()->id == $result->user_id)
                                                        {{ Auth::user()->name }}
                                                    @endif
                                                </td>
                                                <td>{{ $result->attendance_date }}</td>
                                                <td>{{ $result->check_in }}</td>
                                                <td>{{ $result->check_out }}</td>
                                                <td>
                                                    <td>
                                                        @if ($result->check_out && $result->check_in)
                                                            <?php
                                                                $checkIn = strtotime($result->check_in);
                                                                $checkOut = strtotime($result->check_out);
                                                                $totalHours = ($checkOut - $checkIn) / (60 * 60);
                                                                echo number_format($totalHours, 2);
                                                            ?>
                                                        @endif
                                                    </td>
                                                    
                                                </td>
                                                <td>{{ $result->status }}</td>
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
