# docker

#### 将本地文件复制到 docker 容器中

```sh
docker cp ./config.php a502ee0875c4:/var/www/html/config/config.php
```

#### 将容器中的文件复制到本地

```sh
docker cp a502ee0875c4:/var/www/html/config/config.php /home/user/config.php
```

#### 复制整个目录

```sh
docker cp a502ee0875c4:/var/www/html/config /home/user/
```
