<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'date', 'begin', 'end', 'isAvailable', 'offer_id'
    ];

    public function offer():BelongsTo{
        return $this->belongsTo(Offer::class);
    }

    public function user() : BelongsToMany{
        return $this->belongsToMany(User::class);
    }
}
