<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
$api = app('Dingo\Api\Routing\Router');
Route::get('/', function () {
    return view('welcome');
});
Route::get('/category', 'Home\CategoryController@index');
Route::get('/api/category', 'Home\CategoryController@get');
Route::get('/goods', 'Home\GoodsController@index');
Route::get('/api/goods', 'Home\GoodsController@post');
Route::post('/api/addcart', 'Home\CartController@add');
Route::get('/api/cartlist', 'Home\CartController@index');
Route::post('/api/cartdelete', 'Home\CartController@delete');
Route::post('/api/cartupdate', 'Home\CartController@update');
Route::get('user/{id}', 'UserController@show');

$api->version('v1', ['namespace' => 'App\Http\Controllers\Api'], function ($api) {
    //Route::get('api/captcha/{tmp}', 'KitController@captcha');
    $api->get('captcha/{tmp}', [
        'as' => 'auth.captcha',
        'uses' => 'KitController@captcha',
    ]);
    # Auth
    // signin
    $api->post('auth/login', [
        'as' => 'auth.login',
        'uses' => 'LoginController@login',
    ]);
    // register
    $api->post('auth/register', [
        'as' => 'auth.register',
        'uses' => 'LoginController@register',
    ]);
    // refresh jwt token
    $api->post('auth/token/refresh', [
        'as' => 'auth.token.refresh',
        'uses' => 'AuthController@refreshToken',
    ]);
});