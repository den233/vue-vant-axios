<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class GoodsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('goods')->insert( 
            ['name'=>'健康排毒营奢华套餐','price'=>600,'pv'=>500,'number'=>1,'category_id'=>11],
            ['name'=>'节日有礼组合','price'=>600,'pv'=>500,'number'=>1,'category_id'=>11],
            ['name'=>'固定1000SV小分子蛋白肽...','price'=>600,'pv'=>500,'number'=>1,'category_id'=>11],
            ['name'=>'董事长推荐13000元套餐三','price'=>600,'pv'=>500,'number'=>1,'category_id'=>11],
            ['name'=>'董事长推荐13000元套餐一','price'=>600,'pv'=>500,'number'=>1,'category_id'=>11],
            ['name'=>'董事长推荐13000元套餐二','price'=>600,'pv'=>500,'number'=>1,'category_id'=>11],
            ['name'=>'董事长推荐13000元套餐四','price'=>600,'pv'=>500,'number'=>1,'category_id'=>11],
            ['name'=>'小分子蛋白肽钜惠套餐','price'=>600,'pv'=>500,'number'=>1,'category_id'=>11],
            ['name'=>'天天有礼组合','price'=>600,'pv'=>500,'number'=>1,'category_id'=>11],
            ['name'=>'圣萝蔓驻颜肤水面膜','price'=>600,'pv'=>500,'number'=>1,'category_id'=>11],
            ['name'=>'雅璨诗肽兰美丽三宝3件套','price'=>600,'pv'=>500,'number'=>1,'category_id'=>11],
            ['name'=>'雅璨双重滋养白金系列套装（七件套）','price'=>600,'pv'=>500,'number'=>1,'category_id'=>11],
            ['name'=>'雅璨诗肽兰安肤平衡调理霜','price'=>600,'pv'=>500,'number'=>1,'category_id'=>11],
            ['name'=>'雅璨50g男士净爽紧肤霜','price'=>600,'pv'=>500,'number'=>1,'category_id'=>11],
            ['name'=>'雅璨璀璨嫩肤滋润乳液','price'=>600,'pv'=>500,'number'=>1,'category_id'=>11],
            ['name'=>'榭丽舍昂庄园漫步干红葡萄酒','price'=>600,'pv'=>500,'number'=>1,'category_id'=>11],
            ['name'=>'榭丽舍昂庄园漫步桃红葡萄酒','price'=>600,'pv'=>500,'number'=>1,'category_id'=>11],
            ['name'=>'清欣“九层双芯”超薄卫生巾组合装','price'=>600,'pv'=>500,'number'=>1,'category_id'=>11],
            ['name'=>'运动鞋','price'=>600,'pv'=>500,'number'=>1,'category_id'=>1],
            ['name'=>'牙膏','price'=>600,'pv'=>500,'number'=>1,'category_id'=>2],
            ['name'=>'保健品','price'=>600,'pv'=>500,'number'=>1,'category_id'=>3],
            ['name'=>'魔力鞋','price'=>600,'pv'=>500,'number'=>1,'category_id'=>4],
            ['name'=>'美的','price'=>600,'pv'=>500,'number'=>1,'category_id'=>5],
            ['name'=>'格力','price'=>600,'pv'=>500,'number'=>1,'category_id'=>6],
            ['name'=>'眼睛','price'=>600,'pv'=>500,'number'=>1,'category_id'=>7],
            ['name'=>'毛绒玩具','price'=>600,'pv'=>500,'number'=>1,'category_id'=>8],
            ['name'=>'学习用品','price'=>600,'pv'=>500,'number'=>1,'category_id'=>9],
            ['name'=>'手机数码','price'=>600,'pv'=>500,'number'=>1,'category_id'=>10],
            ['name'=>'lv宝宝','price'=>600,'pv'=>500,'number'=>1,'category_id'=>11],
            ['name'=>'电视剧','price'=>600,'pv'=>500,'number'=>1,'category_id'=>12],
            ['name'=>'空调家电','price'=>600,'pv'=>500,'number'=>1,'category_id'=>13],
            ['name'=>'办公家具','price'=>600,'pv'=>500,'number'=>1,'category_id'=>14],
            ['name'=>'运动鞋','price'=>600,'pv'=>500,'number'=>1,'category_id'=>1],
            ['name'=>'牙膏','price'=>600,'pv'=>500,'number'=>1,'category_id'=>2],
            ['name'=>'保健品','price'=>600,'pv'=>500,'number'=>1,'category_id'=>3],
            ['name'=>'魔力鞋','price'=>600,'pv'=>500,'number'=>1,'category_id'=>4],
            ['name'=>'美的','price'=>600,'pv'=>500,'number'=>1,'category_id'=>5],
            ['name'=>'格力','price'=>600,'pv'=>500,'number'=>1,'category_id'=>6],
            ['name'=>'眼睛','price'=>600,'pv'=>500,'number'=>1,'category_id'=>7],
            ['name'=>'毛绒玩具','price'=>600,'pv'=>500,'number'=>1,'category_id'=>8],
            ['name'=>'学习用品','price'=>600,'pv'=>500,'number'=>1,'category_id'=>9],
            ['name'=>'手机数码','price'=>600,'pv'=>500,'number'=>1,'category_id'=>10],
            ['name'=>'lv宝宝','price'=>600,'pv'=>500,'number'=>1,'category_id'=>11],
            ['name'=>'电视剧','price'=>600,'pv'=>500,'number'=>1,'category_id'=>12],
            ['name'=>'空调家电','price'=>600,'pv'=>500,'number'=>1,'category_id'=>13],
            ['name'=>'办公家具','price'=>600,'pv'=>500,'number'=>1,'category_id'=>14]
        );
    }
}
