<?php

namespace App\Jobs\Music;

use App\Models\SongFile;
use Illuminate\Support\Facades\Storage;

class MoveFileToPermanentPath
{
    /**
     * @var SongFile
     */
    protected $songFile;
    
    /**
     * MoveFileToPermanentPath constructor.
     * @param SongFile $songFile
     */
    public function __construct(SongFile $songFile)
    {
        $this->songFile = $songFile;
    }
    
    /**
     * handle the job
     */
    public function handle()
    {
        $this->songFile->changeStatus(SongFile::PROCESS_STATUS_MOVING_FILE);
        
        $newPath = $this->moveTheFileToPermanentPath();
    
        $this->songFile->fill([
            'process_status' => SongFile::PROCESS_STATUS_DONE,
            'path' => $newPath,
        ]);
    
        $this->songFile->save();
    }
    
    /**
     * move the file to permanent path and return the path
     *
     * @return string
     */
    protected function moveTheFileToPermanentPath()
    {
        $permanentPath = SongFile::generatePath($this->songFile->user, $this->songFile->file_name);
        
        Storage::disk('songs')->move(
            $this->songFile->path,
            $permanentPath
        );
        
        return $permanentPath;
    }
}