<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class AppReset extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:reset';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Reset app - migrate and seed base user';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        if (!$this->confirm('Are you sure?')) {
            return;
        }
        
        File::cleanDirectory(Storage::disk('songs')->path(''));
        
        $this->info('songs disk was cleared');
        
        File::cleanDirectory(Storage::disk('media')->path(''));
    
        $this->info('media disk was cleared');
        
        $this->call('migrate:fresh');
        
        $this->call('db:seed', [
            '--class' => 'BaseUserSeeder'
        ]);
    }
}
