<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Offer extends Model
{

        use HasFactory;

    protected $fillable = ['title', 'description', 'message', 'price', 'appointment_id', 'user_id', "category_id"];

    /*public function category():HasOne{
        return $this->hasOne(Category::class);
    }*/

    public function category():BelongsTo{
        return $this->belongsTo(Category::class);
    }


    public function appointments():HasMany{
        return $this->hasMany(Appointment::class);
    }

    public function user():BelongsTo{
        return $this->belongsTo(User::class);
    }



}
