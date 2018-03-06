<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SongFileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'original_name' => $this->original_name,
            'public_path' => $this->public_path,
            'song' => new SongResource($this->whenLoaded('song')),
        ];
    }
}
