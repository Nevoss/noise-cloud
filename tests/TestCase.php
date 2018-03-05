<?php

namespace Tests;

use App\Models\SongFile;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Facades\Storage;
use Tymon\JWTAuth\Facades\JWTAuth;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication, RefreshDatabase;
    
    /**
     * send get request as user
     *
     * @param $url
     * @param null $user
     * @return \Illuminate\Foundation\Testing\TestResponse
     */
    protected function getAsUser($url, $user = null)
    {
        return $this->getJson($url, [
            'Authorization' => "Bearer {$this->getUserJwtToken($user)}",
        ]);
    }
    
    /**
     * send delete request as user
     *
     * @param $url
     * @param array $data
     * @param null $user
     * @return \Illuminate\Foundation\Testing\TestResponse
     */
    protected function deleteAsUser($url, array $data = [], $user = null)
    {
        return $this->deleteJson($url, $data, [
            'Authorization' => "Bearer {$this->getUserJwtToken($user)}",
        ]);
    }
    
    /**
     * send post request as a user
     *
     * @param $url
     * @param array $data
     * @param null $user
     * @return \Illuminate\Foundation\Testing\TestResponse
     */
    protected function postAsUser($url, array $data = [], $user = null)
    {
        return $this->postJson($url, $data, [
            'Authorization' => "Bearer {$this->getUserJwtToken($user)}",
        ]);
    }
    
    /**
     * send put request as a user
     *
     * @param $url
     * @param array $data
     * @param null $user
     * @return \Illuminate\Foundation\Testing\TestResponse
     */
    protected function putAsUser($url, array $data = [], $user = null)
    {
        return $this->putJson($url, $data, [
            'Authorization' => "Bearer {$this->getUserJwtToken($user)}",
        ]);
    }
    
    /**
     * get jwt token
     *
     * @param User|null $user
     * @return string
     */
    protected function getUserJwtToken(User $user = null)
    {
        return JWTAuth::fromUser($user ?: create(User::class));
    }
    
    /**
     * take a existing song and create a SongFile model from it
     *
     * @param User|null $user
     * @param array $overwriteParams
     * @return SongFile
     */
    protected function createFakeSongFile(User $user = null, array $overwriteParams = [])
    {
        $user = $user ?: create(User::class);
        
        Storage::fake('songs');
    
        $path = SongFile::generateTempPath($user, 'somehash.m4a');
    
        Storage::disk('songs')->put(
            $path,
            Storage::disk('tests')->get('songs/one_of_us-eatliz.m4a')
        );
    
        return create(SongFile::class, array_merge([
            'path' => $path,
            'original_name' => 'one_of_us-eatliz.m4a',
            'user_id' => $user->id
        ], $overwriteParams));
    }
}
