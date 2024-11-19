<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SportResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'sport_name' => $this->sport_name,
            'popularity_level' => $this->popularity_level,
            'required_equipment' => $this->required_equipment,
            'max_players' => $this->max_players,
            'min_players' => $this->min_players,
            'match_duration' => $this->match_duration,
            'physical_intensity' => $this->physical_intensity,
            'rules' => $this->rules,
            'isActive' => $this->isActive,
            'icon' => $this->icon,
            'description' => $this->description,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}