<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Auth\AuthManager;
use Api\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Auth;

class UsersController extends BaseController
{

    protected $auth;

    public function __construct(AuthManager $auth) {
        $this->auth = $auth;
    }

    /**
     * 获取token
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function token(Request $request)
    {
        $credentials=[
            'name' => $request->name,
            'password'  => $request->password
        ];

        try {
            if (!$token = $this->auth->guard('api')->attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        return response()->json(compact('token'));
    }

    /**
     * @return mixed
     */
    public function refershToken()
    {
        $token = Auth::guard($this->guard)->refresh();

        return $this->response->array(compact('token'));
    }

    /**
     * 个人信息
     *
     * @return User|null
     */
    public function me()
    {
        return Auth::guard('api')->user();
    }

    /**
     * 退出
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        Auth::guard($this->guard)->logout();
        return response()->json(['status' => 'ok']);
    }
}