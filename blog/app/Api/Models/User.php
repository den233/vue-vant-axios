<?php

namespace Api\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Auth\Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends BaseModel implements AuthenticatableContract, JWTSubject {
    // 软删除和用户验证attempt
    use SoftDeletes, Authenticatable;

    protected $table = 'users';
    // 查询用户的时候，不暴露密码
    protected $hidden = ['password'];


    // jwt 需要实现的方法
    public function getJWTIdentifier() {
        return $this->id;
    }

    // jwt 需要实现的方法
    public function getJWTCustomClaims() {
        return [];
    }

    public function log()
    {
        return $this->hasMany('Api\Models\OrderLog');
    }
    public function role()
    {
        return $this->belongsTo('Api\Models\RoleInfo', 'roleid', 'id');

    }
}
