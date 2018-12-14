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

Route::get('/', function () {
    return view('welcome');
});
Route::get('/category', 'Home\CategoryController@index');
Route::get('/api/category', 'Home\CategoryController@get');
Route::get('/goods', 'Home\GoodsController@index');
Route::post('/api/goods', 'Home\GoodsController@post');
Route::get('user/{id}', 'UserController@show');