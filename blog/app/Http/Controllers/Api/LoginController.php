<?php
namespace App\Http\Controllers\Api;

use Illuminate\Auth\AuthManager;
use Illuminate\Http\Request;
use Api\Models\User;

class LoginController extends BaseController
{
    protected $auth;

    public function __construct(AuthManager $auth) {
        $this->auth = $auth;
    }
    /**
     * @api {post} /auth/login 登录(login)
     * @apiDescription 登录(login)
     * @apiGroup Auth
     * @apiPermission none
     * @apiParam {Name} name     用户名
     * @apiParam {String} password  密码
     * @apiVersion 0.1.0
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cL21vYmlsZS5kZWZhcmEuY29tXC9hdXRoXC90b2tlbiIsImlhdCI6IjE0NDU0MjY0MTAiLCJleHAiOiIxNDQ1NjQyNDIxIiwibmJmIjoiMTQ0NTQyNjQyMSIsImp0aSI6Ijk3OTRjMTljYTk1NTdkNDQyYzBiMzk0ZjI2N2QzMTMxIn0.9UPMTxo3_PudxTWldsf4ag0PHq1rK8yO9e5vqdwRZLY
     *     }
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "UserNotFound"
     *     }
     */
    public function login(Request $request) {
       
        //return $this->respondWithToken($token);
        $validator = \Validator::make($request->all(), [
            'name' => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            //return $this->errorBadRequest($validator->messages());
           //return $this->response->errorForbidden(trans('auth.failed'));
           return $this->errorBadRequest($validator->messages());
        }

        $credentials = $request->only('name', 'password');

        // 验证失败返回403
        if (!$token = $this->auth->guard('api')->attempt($credentials)) {
            $this->response->errorForbidden(trans('auth.failed'));
        }

        $user = User::where('name', $credentials['name'])->firstOrFail();


        if ($user->actived) {
             
            return $this->response->array(compact('token', 'user'));
        } else {
            $this->response->errorForbidden('该账户未激活,请联系平台管理员');
        }
    }
    public function register(Request $request) {
        $validator = \Validator::make($request->input(), [
            'name' => 'required|min:5|unique:users',
            'password' => 'required|min:5',
        ]);

        if ($validator->fails()) {
            return $this->errorBadRequest($validator->messages());
        }

        $name = $request->get('name');
        $password = $request->get('password');

        $attributes = [
            'name' => $name,
            'password' => app('hash')->make($password),
            'registered_at' => date("Y-m-d H:i:s")
        ];

        $user = User::create($attributes);
        // 用户注册事件
        //$token = $this->auth->guard('api')->fromUser($user);

        //return $this->response->array(compact('token'));
        return $this->response->noContent();
    }
    public function refreshToken() {
        $token = $this->auth->guard('api')->parseToken()->refresh();

        return $this->response->array(compact('token'));
    }
    public function key($length){
        $str = null;
        $strPol = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
        $max = strlen($strPol)-1;

        for($i=0;$i<$length;$i++){
            $str.=$strPol[rand(0,$max)];//rand($min,$max)生成介于min和max两个数之间的一个随机整数
        }
        return $str;
    }
}