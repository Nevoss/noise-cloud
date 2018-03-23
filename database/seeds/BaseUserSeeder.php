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
        
        if (!env("{$str}_NAME") || !env("{$str}_EMAIL") || !env("{$str}_PASSWORD")) {
            return;
        }
        
        User::create([
            'name' => env("{$str}_NAME"),
            'email' => env("{$str}_EMAIL"),
            'password' => bcrypt(env("{$str}_PASSWORD")),
        ]);
    }
}