<?php

namespace Api\Models;

use Illuminate\Database\Eloquent\SoftDeletes;

class Userrole extends BaseModel
{
    protected $table = 'wms_userrole';

    use SoftDeletes;

    public function rolemenu()
    {
        return $this->hasMany('Api\Models\RoleMenu','roleid','roleid');
    }
    
    public function roleuser()
    {
        return $this->hasMany('Api\Models\User','id','userid');
    }

}
