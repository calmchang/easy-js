
#### 查找nginx
1、可以查看运行文件目录: `whereis nginx`   
2、查看相关进程 后的配置文件路径: `ps  -ef | grep nginx`  
3、可以看到conf文件位置: `nginx -t` 

#### 重启
nginx -s reload

#### 关闭nginx
1、查看master的nginx进程: `ps -ef|grep ngin`  
2、强制杀进程: `kill -QUIT 进程号`  

#### 日志
默认位置: `/var/log/nginx`


#### rewrite
匹配正则后，进行url替换，并做301或302重定向，会发现`浏览器里地址会发生变化跳转到重定向后的地址`

```nginx
// 举例
location /testrw/ {
  rewrite /testrw/(.*) https://b.com/printRequest?request=$1 break;
}
```
访问 http://a.com/testrw/123 会跳转到 https://b.com/printRequest?request=123

#### proxy_pass 反向代理

```nginx
location /testrw/ {
  proxy_pass https://b.com/printRequest?request=;
}
```
访问 http://a.com/testrw/?a=1&b=2 实际访问的内容为 https://b.com/printRequest?request=?a=1&b=2  
特征：不会影响浏览器地址栏的url，只是内容通过代理获得


#### 负载均衡
```nginx
# ndapp 下自动定向到 127.0.0.1:3000 这台服务器
upstream ndapp{
    server 127.0.0.1:3000
}
```

#### 判断是否有某个文件并跳转
```nginx



// 当访问a.com/a/b/时，判断如果目录下/usr/share/nginx/www-test/下面没有upgrade.html这个文件，则返回505
location /a/b/ {
  if (!-f /usr/share/nginx/www-test/upgrade.html) {
    return 505;
  }
}

// 访问任何a.com内容时判断没有upgrade.html则505
if (!-f /usr/share/nginx/www-test/upgrade.html) {
  return 505;
}

```

#### 资源缓存策略

为了避免index.html被浏览器缓存，在nginx中增加如下配置  

```nginx
location ~*.(html)$ {
    expires 0;
    add_header Cache-Control "max-age=0";
    add_header Cache-Control "private";
    add_header Cache-Control "no-store";
    add_header Cache-Control "no-cache";
    add_header Cache-Control "must-revalidate";
    add_header Cache-Control "proxy-revalidate";
}
```