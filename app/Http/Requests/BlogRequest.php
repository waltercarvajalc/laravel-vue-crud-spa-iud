<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BlogRequest extends FormRequest
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
            'titulo'=> 'required|min:4|max:100',
            'contenido'=> 'required|min:4|max:250',
            
        ];
    }
/*
    public function messages()
    {
        return [
            'titulo.*'=> 'Titulo debe tener minimo 4 caracteres y maximo 100',
            'contenido.*'=> 'Contenido debe tener minimo 4 caracteres y maximo 250',
            
        ];
    }
*/

}
