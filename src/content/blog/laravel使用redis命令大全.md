---
title: laravel使用redis命令大全
categories: Code
tags:
  - laravel
  - redis
id: laravel-redis
cover: /assets/images/blog1.JPG
date: 2026-07-17 22:51
---
## 标题

该文章系统性地梳理了在 Laravel 框架中使用 Redis 的各类原生命令，涵盖了字符串、哈希、列表、集合、有序集合及事务等核心数据结构的操作方法。以下是对其内容的逻辑重组与结构化整理，适用于导入 Obsidian 等知识管理工具。

## 一、连接与基础键操作

在 Laravel 中，可以通过 `Redis` Facade 获取 Redis 连接实例，进而执行所有原生命令。

``` PHP
// 返回 Redis 连接实例，可以操作所有 Redis 原生命令
$redis = Redis::connection();

// 判断指定键是否存在
Redis::exists('key'); // 返回布尔值 
```
## 二、字符串类型操作命令
``` PHP
//string类型储存
Redis::set('key','value');
//获取key的值
Redis::get('key');
//只有在 key 不存在时设置 key 的值。
Redis::setnx('key','value')
//将值 value 关联到 key ，并将 key 的过期时间设为 seconds (以秒为单位)。
Redis::setex('key',$seconds,$value);
//返回key中字符串值的子字符
Redis::getrange('key',start,end);
//列如：
//$value = 0123456789; //key 的值
//$res = Redis::getrange('key',0,3); //输出 0123
//将给定key的值设为value，并返回key的旧值
Redis::getset('key',value);
//对key所储存的字符串值，获取指定偏移量上的位
Redis::getbit('key',OFFSET);
//对key所是存储的字符串值，设置或清除指定偏移量上的位
Redis::setbit('key',OFFSET,VALUE);
//获取一个或者多个给定key的值返回数组
Redis::mget(['key1','key2']);
//返回 key 所储存的字符串值的长度
Redis::strlen('key');
//同时设置一个或多个 key-value 对，当且仅当所有给定 key 都不存在。
Redis::mset(['key1'=> 123,'key2'=>321]);
//这个命令和 SETEX 命令相似，但它以毫秒为单位设置 key 的生存时间，而不是像 SETEX 命令那样，以秒为单位。
Redis::petex('key',$milliseconds,$value);
//将 key 中储存的数字值增一。
Redis::incr('key');
//将 key 所储存的值加上给定的增量值（increment）
Redis::incrby('key',increment);
//将 key 所储存的值加上给定的浮点增量值（increment）
Redis::incrbyfloat('key',increment);
//将 key 中储存的数字值减一
Redis::decr('key');
//key 所储存的值减去给定的减量值（decrement）
Redis::decrby('key',decrement);
//如果 key 已经存在并且是一个字符串， APPEND 命令将 指定value 追加到改 key 原来的值（value）的末尾。
Redis::append('key',value);
```

## 哈希
``` PHP
//删除一个或多个哈希表字段
Redis::hdel('key',field1,field2);
//查看哈希表 key 中，指定的字段是否存在
Redis::hexists('key',field);
//将哈希表 key 中的字段 field 的值设为 value
Redis::hset('key','field','value');
//获取哈希类型key的值
Redis::hget('key');
//获取在哈希表中指定 key 的所有字段和值
Redis::hgetall('key');
//为哈希表 key 中的指定字段的整数值加上增量 increment 
Redis::hincrby(key,field,increment)
//为哈希表 key 中的指定字段的浮点数值加上增量 increment 
Redis::hincrbyfloat(key,field,increment)
//获取所有哈希表中的字段
Redis::hkeys('key');
//获取哈希表中字段的数量
Redis::hlen('key');
//获取所有给定字段的值
Redis::hmget('key',field1 ,field2)
//同时将多个 field-value (域-值)对设置到哈希表 key 中
Redis::hmset('key',field1 ,value1 ,field2,value2);
//只有在字段 field 不存在时，设置哈希表字段的值。
Redis::hsetnx('key',field ,value)
//获取哈希表中所有值
Redis::hvals('key');
//HSCAN 是 Redis 提供的用于迭代哈希（hash）类型中键值对的命令。它可以在哈希中进行游标式的迭代，以支持遍历大型哈希而无需阻塞服务器。
HSCAN key cursor [MATCH pattern] [COUNT count]
```

## 列表类型
``` PHP
//将一个或多个值插入到列表头部
Redis::lpush(key,value1 ,value2)
//将一个或多个值插入到列表尾部
Redis::rpush(key,value1 ,value2)
//移除并获取列表的第一个元素
Redis::lpop(key)
//移除并获取列表最后一个元素
Redis::rpop(key)
//获取列表长度
Redis::llen(key)
//通过索引获取列表中的元素
Redis::lindex(key,index)
//BLPOP 是 Redis 的一个列表操作命令，用于在列表的左侧阻塞式地弹出元素。
//移出并获取列表的第一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止
Redis::blpop( key1 [key2 ...] timeout)
//BLPOP 是 Redis 的一个列表操作命令，用于在列表的左侧阻塞式地弹出元素。
//移出并获取列表的最后一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。
Redis::brpop( key1 [key2 ...] timeout)
//从列表中弹出一个值，将弹出的元素插入到另外一个列表中并返回它； 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。
//语法  BRPOPLPUSH source destination timeout
//source 是源列表的键名。
//destination 是目标列表的键名。
//timeout 是一个表示阻塞超时时间的整数，单位为秒。如果源列表为空，客户端将被阻塞等待元素出现，直到超时时间到达。
Redis::brpoplpush( list1 ,list2, 10);
//移除列表的最后一个元素，并将该元素添加到另一个列表并返回
Redis::rpoplpush( list1 ,list2);
//LINSERT 是 Redis 的一个列表操作命令，用于在指定元素的前面或后面插入一个新元素如果 pivot 不存在于列表中，那么插入操作不会进行
//语法  LINSERT key BEFORE|AFTER pivot value
//key 是列表的键名。
//BEFORE|AFTER 是关键字，用于指定在哪个元素之前或之后插入新元素。
//pivot 是列表中的一个元素，作为插入位置的参考。
//value 是待插入的新元素。
Redis::linsert(key,BEFORE ,'World','Hello');
//将一个值插入到已存在的列表头部
Redis::lpushx(key,value)
//将一个值插入到已存在的列表尾部
Redis::rpushx(key,value)
//获取列表指定范围内的元素
Redis::lrange(key,start ,stop)
//LREM 是 Redis 的一个列表操作命令，用于从列表中移除指定数量的匹配元素
//语法  LREM key count value
//key 是列表的键名。
//count 是要删除的元素的数量，可以是正数、负数或零。
//当 count 为正数时，表示删除列表中从左到右的前 count 个与 value 匹配的元素。
//当 count 为负数时，表示删除列表中从右到左的前 count 个与 value 匹配的元素。
//当 count 为零时，表示删除列表中所有与 value 匹配的元素。
//value 是要匹配并删除的元素。
Redis::lrem(key,start ,stop)
//通过索引设置列表元素的值
Redis::lset(key,index ,value)
//对一个列表进行修剪(trim)，就是说，让列表只保留指定区间内的元素，不在指定区间之内的元素都将被删除。
Redis::ltrim(key,start ,stop)
```

## set类型
``` PHP
//向集合添加一个或多个成员
Redis::sadd('key',member1 ,member2);
//获取集合的成员数
Redis::scard('key');
//计算给定多个集合之间的差集，即返回存在于第一个集合中但不存在于其他集合中的元素
Redis::sdiff('key1',[key2]);
//返回给定所有集合的差集并存储在 destination 中
Redis::sdiffstore(destination ,key1 ,[key2]);
//返回给定所有集合的交集
Redis::sinter('key1',[key2]);
//返回给定所有集合的交集并存储在 destination 中
Redis::sinterstore(destination ,key1 ,[key2]);
//判断 member 元素是否是集合 key 的成员
Redis::sismember('key',member );
//返回集合中的所有成员
Redis::smembers('key');
//将 member 元素从 source 集合移动到 destination 集合
Redis::smove(source ,destination ,member );
//移除并返回集合中的一个随机元素
Redis::spop(key );
//返回集合中一个或多个随机数
Redis::srandmember(key ,[count]);
//移除集合中一个或多个成员
Redis::srem('key',member1 ,member2);
//返回所有给定集合的并集
Redis::sunion('key1',[key2]);
//所有给定集合的并集存储在 destination 集合中
Redis::sunionstore(destination ,key1 ,[key2]);
//SSCAN 是 Redis 的一个集合操作命令，用于迭代遍历集合中的元素。
//语法  SSCAN key cursor [MATCH pattern] [COUNT count]
//key 是集合的键名。
//cursor 是一个表示迭代游标的整数，用于指示迭代的起始位置。
//MATCH pattern 是一个可选参数，用于指定一个模式进行元素匹配。
//COUNT count 是一个可选参数，用于指定每次迭代返回的元素数量。
//SSCAN 命令的作用是，从集合中迭代遍历元素，返回满足条件的元素以及下一个迭代的游标，以便进行下一次迭代操作。
//示例用法
SSCAN myset 0 MATCH element* COUNT 10
```

## Zset 类型
``` PHP
//向有序集合添加一个或多个成员，或者更新已存在成员的分数
Redis::zadd('key',score1 ,member1 ,[score2 member2]);
//获取有序集合的成员数
Redis::zcard('key');
//计算在有序集合中指定区间分数的成员数
Redis::zcount('key',min,max);
//有序集合中对指定成员的分数加上增量 increment
Redis::zincrby('key',increment ,member);
//计算给定的一个或多个有序集的交集并将结果集存储在新的有序集合 key 中
Redis::zinterstore(destination ,numkeys ,'key',[key ...]);
//在有序集合中计算指定字典区间内成员数量
Redis::zlexcount('key',min,max);
//在有序集合中计算指定字典区间内成员数量 示例：Redis::zrange("my_sorted_set", 0, 2,true);
Redis::zrange('key',start ,end,[WITHSCORES]);
//通过字典区间返回有序集合的成员
Redis::zrangebylex('key',min ,max ,[LIMIT offset count]);
//通过分数返回有序集合指定区间内的成员
Redis::zrangebyscore('key',min ,max ,[WITHSCORES],[LIMIT]);
//返回有序集合中指定成员的索引
Redis::zrank('key',member);
//移除有序集合中的一个或多个成员
Redis::zrem('key',member1,member2...);
//用于根据字典序范围删除有序集合中的成员。 ZREMRANGEBYLEX myset [b [d
Redis::zremrangebylex('key',min ,max );
//根据排名范围删除有序集合中的成员。
Redis::zremrangebyrank('key',start  ,stop);
//根据分数范围删除有序集合中的成员
Redis::zremrangebyscore('key',min ,max );
//用于按照分数从高到低获取有序集合中的成员
Redis::zrevrange('key',start  ,stop,[WITHSCORES]);
//用于按照分数从高到低获取有序集合中指定分数范围内的成员
//示例用法：
//$arr = [
//        'WITHSCORES' => true,
//        'limit' => [0,2]    
//    ];
//    $res = Redis::zrevrangebyscore("my_sorted_set", 4, 1,$arr);
Redis::zrevrangebyscore('key',max,min ,[WITHSCORES],[LIMIT] );
//用于获取有序集合中指定成员的逆序排名
Redis::zrank('key',member);
//返回有序集中，成员的分数值
Redis::zscore('key',member);
//用于计算多个有序集合的并集，并将结果存储在一个新的有序集合中
Redis::zunionstore(destination ,numkeys ,key [key ...], [WEIGHTS weight [weight ...]] ,[AGGREGATE SUM|MIN|MAX]);
//示例用法：
$destination = 'unionset'; // 存储结果的新有序集合的键名
$keys = ['my_sorted_set', 'my_sorted_set1']; // 参与计算的有序集合的键名
// 执行 ZUNIONSTORE 命令
$res = Redis::zunionstore($destination, $keys, [
    'WEIGHTS' => [2, 3], // 设置权重
    'AGGREGATE' => 'SUM' // 设置聚合方式为求和
]);
//用于迭代有序集合的命令。它可以帮助你在不阻塞主线程的情况下，按照指定的游标批量地获取有序集合的成员
//key：要进行迭代的有序集合的键名。
//cursor：迭代的起始游标，初始值可以为 0。
//MATCH pattern：可选参数，用于指定模式匹配，仅返回与模式匹配的成员。默认不进行匹配。
//COUNT count：可选参数，指定每次迭代返回的最大元素数量。
Redis::zscan(key cursor [MATCH pattern] [COUNT count])
//示例用法：
$key = 'myset'; // 要进行迭代的有序集合的键名
$cursor = 0; // 迭代的起始游标
$count = 3; // 每次迭代返回的最大元素数量

// 执行 ZSCAN 命令
$result = Redis::zscan($key, $cursor, [
    'COUNT' => $count,
]);

```

## 事务
``` PHP
//取消事务，放弃执行事务块内的所有命令
Redis::discard();
//执行所有事务块内的命令
Redis::exec();
//标记一个事务块的开始
Redis::multi();
//示例用法：
Redis::multi(); // 开始事务
Redis::set('key1', 'value1'); // 执行事务命令
Redis::set('key2', 'value2'); // 执行事务命令
Redis::exec();//执行
//
Redis::discard(); // 取消事务
```
