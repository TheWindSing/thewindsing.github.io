# 个人博客更新步骤

## 1. git clone

```shell
git clone git@github.com:TheWindSing/thewindsing.github.io.git
```

## 2. check上一个未部署版本

将除了`.git`文件夹外全部文件移出主文件夹

或者，将该文件夹中`.git`删除，主文件夹改名

## 3. 再次git clone

## 4. 将除了`.git`文件全部彻底删除

## 5. 移入文件即可修改和更新

**修改更新**

```
git add .
git commit -m "deploy"
git pull origin master
```

**本地预览**

```
hexo generate
hexo server
```

**准备部署**

```
git push origin master
```

## 6. 等 Github Action deploy 完成

## 7. 不能直接生成Page则另外clone仓库删除`jekyll-gh-pages.yml`

> Action报错问题：
>
> 自动部署前，`Create jekyll-gh-pages.yml`报错是正常的，需要确保完成`deploy`流程；
>
> 自动部署后，`deploy`会报错，删除记录即可。重点在更新`Create jekyll-gh-pages.yml`。
