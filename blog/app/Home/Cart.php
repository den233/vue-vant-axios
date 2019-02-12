<?php

namespace App\Home;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $table = 'carts';
    protected $fillable=['name','price','pv','pps_id','number','category_id']; 
    public $timestamps = false;
}
