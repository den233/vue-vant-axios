<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 20)->unique()->index();  //用户名
            $table->string('password'); //密码
            $table->string('mobile', 20)->nullable(); //手机号
            $table->string('email', 50)->nullable(); //email
            $table->integer('roleid')->index()->default(0);  //角色ID
            $table->dateTime('registered_at'); //注册时间
            $table->string('warehouse_code', 10)->nullable(); //仓库编码
            $table->string('warehouse_name', 30)->nullable(); //仓库名称
            $table->boolean('actived')->default(false); //是否激活
            $table->string('extra', 255)->nullable(); //其他属性
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
