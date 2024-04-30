<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = [
            [
                'name' => 'admin',
                'email' => 'test@gmail.com',
                'password' => bcrypt('admin12345'),
                'status' => 'active',
                'role_id' => 0
            ]
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
