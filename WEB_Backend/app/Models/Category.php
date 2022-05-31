<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
       'title', 'description', 'picture'
    ];

    public function offer(): HasOne{
        return $this->hasOne(Offer::class);
    }
}
