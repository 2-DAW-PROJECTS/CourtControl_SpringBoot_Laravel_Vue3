<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSportRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'sport_name' => 'sometimes|required|string|max:255',
            'popularity_level' => 'sometimes|required|string|max:255',
            'required_equipment' => 'sometimes|required|string|max:255',
            'max_players' => 'sometimes|required|integer|min:1',
            'min_players' => 'sometimes|required|integer|min:1',
            'match_duration' => 'sometimes|required|integer|min:1',
            'physical_intensity' => 'sometimes|required|string|max:255',
            'rules' => 'sometimes|required|string',
            'isActive' => 'sometimes|required|boolean',
            'icon' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
        ];
    }
}