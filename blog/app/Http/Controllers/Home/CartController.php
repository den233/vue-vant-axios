<?php

namespace App\Http\Controllers\Home;

use App\Home\Cart;
use App\Home\Goods;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CartController extends Controller
{   

    function index(){
        $students = DB::table('carts')->take(100)->get();
        return json_encode($students);
    }
    function add(Request $request){
        $data = $request->only('ppsId','quantity','orderType');
       
        // $students = DB::table('carts')->take(100)->get();
        // return json_encode($students);
       
       $ppsId=$request->get('ppsId');
    //     $number=$request->get('quantity');
   
      $attributes = DB::table('goods')
        ->where('ppsId',$ppsId)->get();
    // $item = Cart::create($data);
    var_dump($attributes);
    // $quantity=$data['quantity'];
    // $orderType=$data['orderType'];
    // $price=$attributes['price'];
    // $bool = DB::table('carts')->insert(
    //      ['name'=>'imooc','ppsId'=>$ppsId]
    //      );
    //    // $attributes['attributes']['number'] = '13';
    //      $arrar= $attributes['attributes'];
    //     $cart = new Cart;
    //      $cart->name =  $arrar["name"];
    //      $cart->category_id =  $arrar['category_id'];
    //      $cart->price =$arrar['price'];
    //      $cart->pv = $arrar['pv'];
    //      $cart->number = $number;
    //      $cart->save();
    }
    function delete(Request $request){
        $id=$request->get('ids');
       // Cart::firstOrCreate(['username'=>'asfsds']);
       //Cart::destroy($id);
       for ($i=0; $i<count($id); $i++) {
        $res = Cart::where('id', $id[$i])->delete();   // 遍历删除
      
        }
        if ($res) {
        
            $data = [
                'status' => 0,
                'msg' => '删除成功'
            ];
        } else {
        
            $data = [
                'status' => 1,
                'msg' => '删除失败'
            ];
        }
        return $data;

    }
    function update(Request $request){
        $id= $id=$request->get('id');
        $number = $request->get('number');
        $res = Cart::where('id',$id)->update(['number'=>$number]);
       dd($res);
    }

}
