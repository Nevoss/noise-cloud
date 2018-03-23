<?php

use App\Models\User;
use Illuminate\Database\Seeder;

class BaseUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $str = 'BASE_USER';
        
        User::create([
            'name' => env("{$str}_NAME", 'User'),
            'email' => env("{$str}_EMAIL", 'user@example.com'),
            'password' => bcrypt(env("{$str}_PASSWORD", 'secret')),
        ]);
    }
}