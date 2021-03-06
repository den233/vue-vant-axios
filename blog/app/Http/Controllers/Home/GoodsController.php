<?php

namespace App\Http\Controllers\Home;

use App\Home\Goods;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class GoodsController extends Controller
{
    public function index()
    {
       
        //$bool = DB::insert('insert into ls_categories(name,price,pv,number) values(?,?,?,?)',['imooc',19,30,1]);
        $data= [
            ['name'=>'健康排毒营奢华套餐','price'=>600,'pv'=>500,'number'=>1,'category_id'=>11,'ppsId'=>545588],
            ['name'=>'节日有礼组合','price'=>600,'pv'=>500,'number'=>1,'category_id'=>11,'ppsId'=>545581],
            ['name'=>'固定1000SV小分子蛋白肽...','price'=>600,'pv'=>500,'number'=>1,'category_id'=>11,'ppsId'=>545582],
            ['name'=>'董事长推荐13000元套餐三','price'=>600,'pv'=>500,'number'=>1,'category_id'=>11,'ppsId'=>545583],
            ['name'=>'董事长推荐13000元套餐一','price'=>600,'pv'=>500,'number'=>1,'category_id'=>11,'ppsId'=>54558400],
            ['name'=>'董事长推荐13000元套餐二','price'=>600,'pv'=>500,'number'=>1,'category_id'=>11,'ppsId'=>54558422],
            ['name'=>'董事长推荐13000元套餐四','price'=>600,'pv'=>500,'number'=>1,'category_id'=>11,'ppsId'=>54558412],
            ['name'=>'小分子蛋白肽钜惠套餐','price'=>600,'pv'=>500,'number'=>1,'category_id'=>11,'ppsId'=>54558421211],
            ['name'=>'天天有礼组合','price'=>600,'pv'=>500,'number'=>1,'category_id'=>11,'ppsId'=>54558454],
            ['name'=>'圣萝蔓驻颜肤水面膜','price'=>600,'pv'=>500,'number'=>1,'category_id'=>11,'ppsId'=>54558465],
            ['name'=>'雅璨诗肽兰美丽三宝3件套','price'=>600,'pv'=>500,'number'=>1,'category_id'=>11,'ppsId'=>5455898],
            ['name'=>'雅璨双重滋养白金系列套装（七件套）','price'=>600,'pv'=>500,'number'=>1,'category_id'=>11,'ppsId'=>54558098],
            ['name'=>'雅璨诗肽兰安肤平衡调理霜','price'=>600,'pv'=>500,'number'=>1,'category_id'=>11,'ppsId'=>545584123],
            ['name'=>'雅璨50g男士净爽紧肤霜','price'=>600,'pv'=>500,'number'=>1,'category_id'=>11,'ppsId'=>545584321],
            ['name'=>'雅璨璀璨嫩肤滋润乳液','price'=>600,'pv'=>500,'number'=>1,'category_id'=>11,'ppsId'=>545584234],
            ['name'=>'榭丽舍昂庄园漫步干红葡萄酒','price'=>600,'pv'=>500,'number'=>1,'category_id'=>11,'ppsId'=>545584344],
            ['name'=>'榭丽舍昂庄园漫步桃红葡萄酒','price'=>600,'pv'=>500,'number'=>1,'category_id'=>11,'ppsId'=>54558334],
            ['name'=>'清欣“九层双芯”超薄卫生巾组合装','price'=>600,'pv'=>500,'number'=>1,'category_id'=>11,'ppsId'=>545332584],
            ['name'=>'运动鞋','price'=>600,'pv'=>500,'number'=>1,'category_id'=>1,'ppsId'=>545584554],
            ['name'=>'牙膏','price'=>600,'pv'=>500,'number'=>1,'category_id'=>2,'ppsId'=>545584555],
            ['name'=>'保健品','price'=>600,'pv'=>500,'number'=>1,'category_id'=>3,'ppsId'=>545584777],
            ['name'=>'魔力鞋','price'=>600,'pv'=>500,'number'=>1,'category_id'=>4,'ppsId'=>545584666],
            ['name'=>'美的','price'=>600,'pv'=>500,'number'=>1,'category_id'=>5,'ppsId'=>54558476],
            ['name'=>'格力','price'=>600,'pv'=>500,'number'=>1,'category_id'=>6,'ppsId'=>545584788],
            ['name'=>'眼睛','price'=>600,'pv'=>500,'number'=>1,'category_id'=>7,'ppsId'=>545584999],
            ['name'=>'毛绒玩具','price'=>600,'pv'=>500,'number'=>1,'category_id'=>8,'ppsId'=>545584222],
            ['name'=>'学习用品','price'=>600,'pv'=>500,'number'=>1,'category_id'=>9,'ppsId'=>545584111],
            ['name'=>'手机数码','price'=>600,'pv'=>500,'number'=>1,'category_id'=>10,'ppsId'=>5455841122],
            ['name'=>'lv宝宝','price'=>600,'pv'=>500,'number'=>1,'category_id'=>11,'ppsId'=>5455841221],
            ['name'=>'电视剧','price'=>600,'pv'=>500,'number'=>1,'category_id'=>12,'ppsId'=>5455841212],
            ['name'=>'空调家电','price'=>600,'pv'=>500,'number'=>1,'category_id'=>13,'ppsId'=>5455841313],
            ['name'=>'办公家具','price'=>600,'pv'=>500,'number'=>1,'category_id'=>14,'ppsId'=>5455841414],
          ];
        $bool = DB::table('goods')->insert(
            $data
         );
         return json_encode($data);
    }
    public function post(Request $request)
    { 
        $id = $request->get('category');
        $pagenum = $request->get('currentpage_num');
        $perpage = $request->get('perpage');
        $name = $request->get('name');
        if($id==null){
            //$msg= $users = Goods::where('name','like','%'.$name.'%')->paginate($perPage = $perpage, $columns = ['*'], $pageName = 'page', $page = $pagenum)->toArray();
            $msg= $users = Goods::where('name','like','%'.$name.'%')->paginate($perPage = $perpage, $columns = ['*'], $pageName = 'page', $page = $pagenum);
            $array=array();
            foreach($msg as $key=>$value){
                $array[$key]['id']=$value['id'];
                $array[$key]['productName']=$value['name'];
                $array[$key]['price']=$value['price'];
                $array[$key]['pv']=$value['pv'];
                $array[$key]['quantity']=$value['number'];
                $array[$key]['ppsId']=$value['ppsId'];
            }
            $god=array('productsale_list_response'=>array('content'=> $array));
            return json_encode($god);
        }
        else{
            $goods = Goods::where('category_id', $id)->paginate($perPage = $perpage, $columns = ['*'], $pageName = 'page', $page = $pagenum);
            $array=array();
            foreach($goods as $key => $value){
                $array[$key]['id']=$value['id'];
                $array[$key]['productName']=$value['name'];
                $array[$key]['price']=$value['price'];
                $array[$key]['pv']=$value['pv'];
                $array[$key]['quantity']=$value['number'];
                $array[$key]['ppsId']=$value['ppsId'];
            }
            $god=array('productsale_list_response'=>array('content'=> $array));
            return json_encode($god);
        }  
        //$students = DB::select('select * from ls_categories limit 10');
       
        //$students = DB::table('categories')->take(20)->get();
       
    }
}
