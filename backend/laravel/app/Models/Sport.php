<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sport extends Model
{
    use HasFactory;

    protected $fillable = [
        'sport_name',
        'popularity_level',
        'required_equipment',
        'max_players',
        'min_players',
        'match_duration',
        'physical_intensity',
        'rules',
        'isActive',
        'icon',
        'description',
    ];
}