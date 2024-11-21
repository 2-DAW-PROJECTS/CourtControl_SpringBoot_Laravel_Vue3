<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSportRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'sport_name' => 'required|string|max:255',
            'popularity_level' => 'required|string|max:255',
            'required_equipment' => 'required|string|max:255',
            'max_players' => 'required|integer|min:1',
            'min_players' => 'required|integer|min:1',
            'match_duration' => 'required|integer|min:1',
            'physical_intensity' => 'required|string|max:255',
            'rules' => 'required|string',
            'isActive' => 'required|integer|min:0|max:1',
            'icon' => 'required|string|max:255',
            'description' => 'required|string',
        ];
    }
}
